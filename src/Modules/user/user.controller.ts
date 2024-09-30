import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

import { UserServices } from './user.service';

// Fetch all users
const getAllUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.getAllUserFromDB();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Users retrieved successfully',
    data: result,
  });
});

// Fetch a user by email
const getUser = catchAsync(async (req: Request, res: Response) => {
  const email = req.params.email;

  if (!email) {
    return sendResponse(res, {
      success: false,
      statusCode: httpStatus.BAD_REQUEST,
      message: 'Email is required',
      data: null,
    });
  }

  const result = await UserServices.getUserFromDB(email);

  if (!result) {
    return sendResponse(res, {
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: 'User not found',
      data: null,
    });
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User retrieved successfully',
    data: result,
  });
});

// Create a new user
const createUser = catchAsync(async (req: Request, res: Response) => {
  const newUser = req.body;

  const result = await UserServices.createUserInDB(newUser);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'User created successfully',
    data: result,
  });
});

// Update a user's information
const updateUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedInfo = req.body;

  const result = await UserServices.updateUserInDB(id, updatedInfo);

  if (!result) {
    return sendResponse(res, {
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: 'User not found or no changes made',
      data: null,
    });
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User updated successfully',
    data: result,
  });
});

// Update a user's role
const updateUserRole = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const role = req.body.role;

  const result = await UserServices.updateUserRoleInDB(id, role);

  if (!result) {
    return sendResponse(res, {
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: 'User not found or role not updated',
      data: null,
    });
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User role updated successfully',
    data: result,
  });
});

// Update a user's status
const updateUserStatus = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const { isActive } = req.body; // Expecting isActive in the request body

  const result = await UserServices.updateUserInDB(id, isActive);

  if (!result) {
    return sendResponse(res, {
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: 'User not found or status not updated',
      data: null,
    });
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User status updated successfully',
    data: result,
  });
});

// Activate or block a user
const toggleUserStatus = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const user = await UserServices.getUserFromDB(id);

  if (!user) {
    return sendResponse(res, {
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: 'User not found',
      data: null,
    });
  }

  const updatedUser = await UserServices.toggleUserStatusInDB(
    id,
    user.isActive,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User status updated successfully',
    data: updatedUser,
  });
});

// Fetch all active users
const getActiveUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.getActiveUsersFromDB();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Active users retrieved successfully',
    data: result,
  });
});

// Fetch all blocked users
const getBlockedUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.getBlockedUsersFromDB();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Blocked users retrieved successfully',
    data: result,
  });
});

// Delete a user (soft delete)
const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await UserServices.deleteUserFromDB(id);

  if (!result) {
    return sendResponse(res, {
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: 'User not found or not deleted',
      data: null,
    });
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User deleted successfully',
    data: null,
  });
});

// Fetch bookings for the authenticated user
const getMyBookings = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.id; // Assuming req.user is populated by auth middleware
  const bookings = await UserServices.getBookingsByUserId(userId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Bookings retrieved successfully',
    data: bookings,
  });
});

// Fetch user information based on authenticated user email
const getUserByEmail = catchAsync(async (req: Request, res: Response) => {
  const email = req.user.email; // Assuming req.user is populated by auth middleware

  if (!email) {
    return sendResponse(res, {
      success: false,
      statusCode: httpStatus.UNAUTHORIZED,
      message: 'Unauthorized to access this user',
      data: null,
    });
  }

  const user = await UserServices.getUserFromDB(email);

  if (!user) {
    return sendResponse(res, {
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: 'User not found',
      data: null,
    });
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User retrieved successfully',
    data: user,
  });
});

export const UserController = {
  getAllUser,
  getUser,
  createUser,
  updateUser,
  updateUserRole,
  updateUserStatus, // Added update user status
  toggleUserStatus,
  getActiveUsers,
  getBlockedUsers,
  deleteUser,
  getMyBookings,
  getUserByEmail,
};
