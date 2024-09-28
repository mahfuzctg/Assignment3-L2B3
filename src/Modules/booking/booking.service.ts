/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';

import AppError from '../../errors/appError';
import { Car } from '../Car/car.model';
import { TBooking } from './booking.interface';
import { Booking } from './booking.model';

// Retrieve all bookings based on the query
const getAllBookings = async (query: Record<string, unknown>) => {
  const result = await Booking.find(query).populate('user car');
  return result;
};

// Create a new booking in the database
const createBookingIntoDB = async (payload: TBooking) => {
  // Step 1: Check if the car exists
  const car = await Car.findById(payload.car);

  // Step 2: If car doesn't exist, throw an error
  if (!car) {
    throw new AppError(httpStatus.NOT_FOUND, 'Car is not found!');
  }

  // Step 3: Check if the car is available
  if (car.status === 'unavailable') {
    throw new AppError(httpStatus.BAD_REQUEST, 'Car is already booked!');
  }

  // Step 4: Check for existing bookings for the specified date and time
  const existingBooking = await Booking.findOne({
    car: payload.car,
    date: payload.date,
    $or: [
      {
        startTime: { $lte: payload.endTime },
        endTime: { $gte: payload.startTime },
      },
      { startTime: payload.startTime, endTime: null }, // Handle case where endTime is not specified
    ],
  });

  if (existingBooking) {
    throw new AppError(
      httpStatus.CONFLICT,
      'Car is already booked for the selected time.',
    );
  }

  // Step 5: Mark the car as 'unavailable'
  car.status = 'unavailable';
  await car.save();

  // Step 6: Create the booking
  const newBooking = new Booking({ ...payload, user: payload.user });
  const result = await newBooking.save(); // Save booking to the database

  // Step 7: Populate user and car details in the response
  const populatedResult = await Booking.findById(result._id).populate(
    'user car',
  );

  return populatedResult; // Return the populated booking result
};

// Retrieve bookings for a specific user
const getUsersBooking = async (userId: any) => {
  const result = await Booking.find({ user: userId }).populate('user car');
  return result;
};

// Get a single booking by bookingId
const getSingleBooking = async (bookingId: string) => {
  const result = await Booking.findById(bookingId).populate('user car');

  // Throw an error if the booking is not found
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Booking not found');
  }

  return result;
};

// Approve a booking by bookingId
const approveBooking = async (bookingId: string) => {
  const result = await Booking.findByIdAndUpdate(
    bookingId,
    { status: 'approved' }, // Update booking status to 'approved'
    { new: true }, // Return the updated document
  ).populate('user car');

  // Throw an error if the booking is not found
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Booking not found');
  }

  return result;
};

// Complete a booking by bookingId
const completeBooking = async (bookingId: string) => {
  const result = await Booking.findByIdAndUpdate(
    bookingId,
    { status: 'completed' }, // Update booking status to 'completed'
    { new: true }, // Return the updated document
  ).populate('user car');

  // Throw an error if the booking is not found
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Booking not found');
  }

  return result;
};

// Cancel a booking by bookingId (admin feature)
const cancelBooking = async (bookingId: string) => {
  // Find the booking and make the associated car available again
  const booking = await Booking.findByIdAndUpdate(
    bookingId,
    { status: 'canceled' }, // Update booking status to 'canceled'
    { new: true }, // Return the updated document
  ).populate('user car');

  if (!booking) {
    throw new AppError(httpStatus.NOT_FOUND, 'Booking not found');
  }

  // Make the car available again
  await Car.findByIdAndUpdate(booking.car._id, { status: 'available' });

  return booking;
};

// Return a car by bookingId (admin feature)
const returnBooking = async (bookingId: string) => {
  // Find the booking and mark the car as available again
  const booking = await Booking.findByIdAndUpdate(
    bookingId,
    { status: 'returned' }, // Update booking status to 'returned'
    { new: true }, // Return the updated document
  ).populate('user car');

  if (!booking) {
    throw new AppError(httpStatus.NOT_FOUND, 'Booking not found');
  }

  // Make the car available again
  await Car.findByIdAndUpdate(booking.car._id, { status: 'available' });

  return booking;
};

// Exporting the BookingServices methods as an object
export const BookingServices = {
  getAllBookings,
  createBookingIntoDB,
  getUsersBooking,
  getSingleBooking,
  approveBooking,
  completeBooking,
  cancelBooking, // Added cancel logic
  returnBooking, // Added return logic
};