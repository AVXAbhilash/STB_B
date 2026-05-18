import express from 'express';
import { 
  createBooking, 
  getMyBookings, 
  getAllBookingsAdmin,
  updateBooking,
  processRefundAdmin,
  markBookingCompleteAdmin // <-- 1. Import the new function
} from '../controllers/bookingController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Require user to be logged in for ALL booking routes below this line
router.use(protect); 

// Root route handles both creating a booking and fetching the admin master list
router.route('/')
  .post(createBooking)                 // Any logged-in user can book
  .get(admin, getAllBookingsAdmin);    // ONLY logged-in admins can view all

router.route('/mybookings').get(getMyBookings);

// Target a specific booking by ID to update it
router.route('/:id')
  .put(updateBooking); 

// Process a refund
router.route('/:id/process-refund')
  .patch(admin, processRefundAdmin);

// --- NEW ROUTE: Mark tour as completed ---
router.route('/:id/complete')
  .patch(admin, markBookingCompleteAdmin); // <-- 2. Route it!

export default router;
