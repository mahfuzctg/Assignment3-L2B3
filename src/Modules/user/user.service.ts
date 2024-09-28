import { Booking } from '../booking/booking.model';
import { User } from './user.model';

// Fetch all users
const getAllUserFromDB = async () => {
  return await User.find({}); // Fetch all users without filtering by isDeleted
};

// Fetch a user by email
const getUserFromDB = async (email: string) => {
  return await User.findOne({ email });
};

// Create a new user
const createUserInDB = async (payload: Record<string, unknown>) => {
  const newUser = new User(payload); // Create a new user instance
  return await newUser.save(); // Save the user in the database
};

// Update a user
const updateUserInDB = async (
  userId: string,
  payload: Record<string, unknown>,
  requesterId: string, // ID of the user making the request
  requesterRole: string // Role of the user making the request
) => {
  // Check if the requester is an admin or the user themselves
  if (requesterRole === 'admin' || requesterId === userId) {
    return await User.findOneAndUpdate(
      { _id: userId }, // Removed isDeleted check
      payload,
      { new: true }
    );
  }
  throw new Error('Unauthorized: You can only update your own information.');
};

// Update a user's role
const updateUserRoleInDB = async (userId: string, role: string) => {
  return await User.updateOne(
    { _id: userId }, // Removed isDeleted check
    { role },
    { new: true }
  );
};

// Soft delete a user
const deleteUserFromDB = async (userId: string) => {
  return await User.updateOne(
    { _id: userId }, // Here, you might want to keep the logic for actual deletion or updating isDeleted to true
    { isDeleted: true }, // Mark user as deleted
    { new: true }
  );
};

// Activate or block a user
const toggleUserStatusInDB = async (userId: string, isActive: boolean) => {
  return await User.updateOne(
    { _id: userId }, // Find user by ID
    { isActive: !isActive }, // Toggle isActive status
    { new: true }
  );
};

// Fetch bookings for a user by ID
const getBookingsByUserId = async (userId: string) => {
  return await Booking.find({ userId }); // Assuming Booking model is related to User
};

// Fetch all active users
const getActiveUsersFromDB = async () => {
  return await User.find({ isActive: true }); // Fetch all users who are active
};

// Fetch all blocked users
const getBlockedUsersFromDB = async () => {
  return await User.find({ isActive: false }); // Fetch all users who are blocked
};

// Fetch user by ID for toggling status
const getUserById = async (userId: string) => {
  return await User.findById(userId);
};

export const UserServices = {
  getAllUserFromDB,
  getUserFromDB,
  createUserInDB,
  updateUserInDB,
  updateUserRoleInDB,
  deleteUserFromDB,
  toggleUserStatusInDB,
  getBookingsByUserId,
  getActiveUsersFromDB,
  getBlockedUsersFromDB,
  getUserById, // Export the method to fetch user by ID if needed
};
