import express from 'express';
import { auth } from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLES } from './user.constant';
import { UserController } from './user.controller';
import { UserValidations } from './user.validation';

const router = express.Router();

// User routes

// Get all users (admin only)
router.get('/', auth(USER_ROLES.admin), UserController.getAllUser);

// Get a user's bookings (user only)
router.get('/my-bookings', auth(USER_ROLES.user), UserController.getMyBookings);

// Get user info by email (admin or user)
router.get('/user-info/:email', auth(USER_ROLES.user), UserController.getUserByEmail); // Updated route

// Create a new user (admin only)
router.post(
  '/',
  auth(USER_ROLES.admin),
  validateRequest(UserValidations.createUserValidationSchema),
  UserController.createUser,
);

// Update a user by ID 
router.put(
  '/:id',
  auth(USER_ROLES.user), // Ensure this is correct based on your logic
  validateRequest(UserValidations.updateUserValidationSchema),
  UserController.updateUser,
);

// Update user role by ID (admin only)
router.patch(
  '/:id/role',
  auth(USER_ROLES.admin),
  UserController.updateUserRole,
);

// Update user status by ID (admin only)
router.patch(
  '/:id/status',
  auth(USER_ROLES.admin),
  UserController.updateUserStatus,
);

// Delete a user by ID (admin only)
router.delete('/:id', auth(USER_ROLES.admin), UserController.deleteUser);

// Get user by email (admin only)
router.get('/:email', auth(USER_ROLES.admin), UserController.getUser);

export const UserRoutes = router;
