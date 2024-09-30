import { Router } from 'express';
import { auth } from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLES } from '../user/user.constant';
import { BookingController } from './booking.controller';
import { BookingValidations } from './booking.validation';

const router = Router();

// Create a new booking (User only)
router.post(
  '/',
  auth(USER_ROLES.user), // Ensure the user is authenticated as a normal user
  validateRequest(BookingValidations.createBookingValidationSchema), // Validate request data
  BookingController.createBooking,
);

// Retrieve all bookings (Admin only)
router.get(
  '/',
  auth(USER_ROLES.admin), // Ensure the user is authenticated as an admin
  BookingController.getAllBookings,
);

// Retrieve bookings for the logged-in user
router.get(
  '/my-bookings',
  auth(USER_ROLES.user), // Ensure the user is authenticated as a normal user
  BookingController.getUsersBooking,
);

// Retrieve a single booking by ID (User)
router.get(
  '/:bookingId', // Use URL parameter for booking ID
  auth(USER_ROLES.user), // User must be authenticated
  BookingController.getSingleBooking, // Controller method to handle the request
);

// Approve a booking by ID (Admin only)
router.patch(
  '/:bookingId/approve', // PATCH method to approve a booking
  auth(USER_ROLES.admin), // Ensure the user is authenticated as an admin
  BookingController.bookingApproval, // Controller method to handle the request
);

// Complete a booking by ID (Admin only)
router.patch(
  '/:bookingId/complete', // PATCH method to complete a booking
  auth(USER_ROLES.admin), // Ensure the user is authenticated as an admin
  BookingController.completeBooking, // Controller method to handle the request
);

// Cancel a booking by ID (Admin only)
router.patch(
  '/:bookingId/cancel', // PATCH method to cancel a booking
  auth(USER_ROLES.admin), // Ensure the user is authenticated as an admin
  BookingController.cancelBooking, // Controller method to handle cancellation
);

// Return a booking by ID (Admin only)
router.patch(
  '/:bookingId/return', // PATCH method to mark a booking as returned
  auth(USER_ROLES.admin), // Ensure the user is authenticated as an admin
  BookingController.returnBooking, // Controller method to handle returning
);

export const BookingRoutes = router;
