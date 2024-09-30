/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';

import { AuthError } from '../../errors/authError';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

import AppError from '../../errors/appError';
import { User } from '../user/user.model';
import { BookingServices } from './booking.service';

// Create a new booking
const createBooking = catchAsync(async (req: Request, res: Response) => {
  const { car, ...bookingData } = req.body;
  bookingData.car = car;

  const userToken = req.headers.authorization?.split(' ')[1];
  if (!userToken) {
    return AuthError(req, res);
  }

  const decoded = jwt.verify(
    userToken,
    config.JWT_ACCESS_SECRET as string,
  ) as JwtPayload;

  const user = await User.findOne({ email: decoded.email });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  const bookingObj = {
    ...bookingData,
    user: user?._id,
  };

  const result = await BookingServices.createBookingIntoDB(bookingObj);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Car booked successfully',
    data: result,
  });
});

// Get all bookings with optional filtering
const getAllBookings = catchAsync(async (req: Request, res: Response) => {
  const { carId, date } = req.query;
  const queryObj: any = {};

  if (carId) queryObj.car = carId;
  if (date) queryObj.date = date;

  const result = await BookingServices.getAllBookings(queryObj);

  if (!result || result.length === 0) {
    return sendResponse(res, {
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: 'No Data Found',
      data: [],
    });
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'All Bookings retrieved successfully',
    data: result,
  });
});

// Get bookings specific to the authenticated user
const getUsersBooking = catchAsync(async (req: Request, res: Response) => {
  const userToken = req.headers.authorization?.split(' ')[1];
  if (!userToken) {
    return AuthError(req, res);
  }

  const decoded = jwt.verify(
    userToken,
    config.JWT_ACCESS_SECRET as string,
  ) as JwtPayload;

  const user = await User.findOne({ email: decoded.email });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  const result = await BookingServices.getUsersBooking(user?._id);

  if (!result || result.length === 0) {
    return sendResponse(res, {
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: 'No Data Found',
      data: [],
    });
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'My Bookings retrieved successfully',
    data: result,
  });
});

// Get a single booking by bookingId
const getSingleBooking = catchAsync(async (req: Request, res: Response) => {
  const { bookingId } = req.params;

  const result = await BookingServices.getSingleBooking(bookingId);

  if (!result) {
    return sendResponse(res, {
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: 'Booking not found',
      data: null,
    });
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Booking retrieved successfully',
    data: result,
  });
});

// Approve a booking by bookingId
const bookingApproval = catchAsync(async (req: Request, res: Response) => {
  const { bookingId } = req.params;

  const result = await BookingServices.approveBooking(bookingId);

  if (!result) {
    return sendResponse(res, {
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: 'Booking not found or already approved',
      data: null,
    });
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Booking approved successfully',
    data: result,
  });
});

// Complete a booking by bookingId
const completeBooking = catchAsync(async (req: Request, res: Response) => {
  const { bookingId } = req.params;

  const result = await BookingServices.completeBooking(bookingId);

  if (!result) {
    return sendResponse(res, {
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: 'Booking not found or already completed',
      data: null,
    });
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Booking completed successfully',
    data: result,
  });
});

// Cancel a booking by bookingId
const cancelBooking = catchAsync(async (req: Request, res: Response) => {
  const { bookingId } = req.params;

  const result = await BookingServices.cancelBooking(bookingId);

  if (!result) {
    return sendResponse(res, {
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: 'Booking not found or already canceled',
      data: null,
    });
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Booking canceled successfully',
    data: result,
  });
});

// Return a booking by bookingId (for returning a car after use)
const returnBooking = catchAsync(async (req: Request, res: Response) => {
  const { bookingId } = req.params;

  const result = await BookingServices.returnBooking(bookingId);

  if (!result) {
    return sendResponse(res, {
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: 'Booking not found or already returned',
      data: null,
    });
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Booking returned successfully',
    data: result,
  });
});

// Exporting the BookingController methods as an object
export const BookingController = {
  getAllBookings,
  createBooking,
  getUsersBooking,
  getSingleBooking,
  bookingApproval,
  completeBooking,
  cancelBooking,
  returnBooking,
};
