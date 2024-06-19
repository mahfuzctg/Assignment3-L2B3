import httpStatus from "http-status";

import catchAsync from "../../utils/catchAsync";

import { handleNoDataResponse } from "../../errors/handleNoData";
import { getUserInfoFromToken } from "../../utils/getUserInfoFromToken";
import sendResponse from "../../utils/sendResponse";

import { Booking } from "./booking.model";
import { bookingCars } from "./booking.service";

const createBooking = catchAsync(async (req, res) => {
  const token = req.headers.authorization;
  const bookingData = req.body;

  const { email } = getUserInfoFromToken(token as string);

  const result = await bookingCars.createBookingIntoDB(email, bookingData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Slot created successfully!",
    data: result,
  });
});

const getAllBookings = catchAsync(async (req, res) => {
  // const result = await Car.find()
  const result = await Booking.find()
    .populate("customer", "_id name email phone address")
    .populate("car", "_id name description price duration isDeleted");

  if (result?.length === 0) {
    return handleNoDataResponse(res);
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Car is retrieved successfully",
    data: result,
  });
});

export const bookingController = {
  createBooking,
  getAllBookings,
};
