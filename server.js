import express from "express";
import cors from 'cors';
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import tourRoutes from './routes/tourRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import errorHandler from './middleware/errorMiddleware.js';
import path from 'path'; 
import uploadRoutes from './routes/uploadRoutes.js';

// This is perfectly fine to leave here!
dotenv.config();

const app = express();

// 1. FIXED CORS: Allows both your local laptop and your live internet website
app.use(cors({
  origin: ['http://localhost:3000', 'https://bookingbuddy-one.vercel.app'], // <-- Double check this is your exact Vercel URL!
  credentials: true 
}));

// 2. FIXED PARSERS: Removed the duplicate express.json()
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Static folder for images
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Routes
app.use('/api/upload', uploadRoutes);
app.use("/api/users", userRoutes);
app.use('/api/tours', tourRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/reviews', reviewRoutes);

// THE ERROR HANDLER MUST BE THE VERY LAST APP.USE()!
app.use(errorHandler);

// 3. FIXED DATABASE URI: Matches the MONGO_URI variable in Render
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT || 5200, () => {
      console.log(`Server running on port ${process.env.PORT || 5200}`);
    });
  })
  .catch((error) => console.log(error));
