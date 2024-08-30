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

const createBooking = catchAsync(async (req: Request, res: Response) => {
  const { carId, ...bookingData } = req.body;
  bookingData.car = carId;

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

const getAllBookings = catchAsync(async (req: Request, res: Response) => {
  const { carId, date } = req.query;
  const queryObj: any = {};

  if (req.query.carId) {
    queryObj.car = carId;
  }
  if (req.query.date) {
    queryObj.date = date;
  }
  if (req.query.carId && req.query.date) {
    queryObj.car = carId;
    queryObj.date = date;
  }

  const result = await BookingServices.getAllBookings(queryObj);

  if (!result || result.length === 0) {
    res.status(httpStatus.NOT_FOUND).json({
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: 'No Data Found',
      data: [],
    });
  }
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Bookings retrieved successfully',
    data: result,
  });
});

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
    res.status(httpStatus.NOT_FOUND).json({
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

export const BookingController = {
  getAllBookings,
  createBooking,
  getUsersBooking,
};
