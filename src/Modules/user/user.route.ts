import express from 'express';
import { auth } from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLES } from './user.constant';
import { userControllers } from './user.controller';
import { UserValidations } from './user.validation';

const router = express.Router();

// Get all users (Admin only)
router.get('/', auth(USER_ROLES.admin), userControllers.getAllUser);

// Get user info by email
router.get('/user-info', userControllers.getUserByEmail);

// Update user details (requires validation and authorization)
router.put(
  '/update-user/:id', // Correct route parameter for user ID
  validateRequest(UserValidations.updateUserValidationSchema),
  userControllers.updateUser,
);

// Get user bookings (for logged-in users)
router.get(
  '/my-bookings',
  auth(USER_ROLES.user), // Auth middleware for regular users
  userControllers.getMyBookings,
);

export const UserRoutes = router;
