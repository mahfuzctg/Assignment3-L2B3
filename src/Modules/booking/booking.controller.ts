import httpStatus from "http-status";

import catchAsync from "../../utils/catchAsync";

import { handleNoDataResponse } from "../../errors/handleNotFound";
import { getUserInfoFromToken } from "../../utils/getUserInfoFromToken";
import sendResponse from "../../utils/sendResponse";
import { Booking } from "./booking.model";
import { bookingServices } from "./booking.service";

const createBooking = catchAsync(async (req, res) => {
  const token = req.headers.authorization;
  const bookingData = req.body;

  const { email } = getUserInfoFromToken(token as string);

  const result = await bookingServices.createBookingIntoDB(email, bookingData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Slot created successfully!",
    data: result,
  });
});

const getAllBookings = catchAsync(async (req, res) => {
  // const result = await Service.find()
  const result = await Booking.find()
    .populate("customer", "_id name email phone address")
    .populate("service", "_id name description price duration isDeleted")
    .populate("slot", "_id service date startTime endTime isBooked")
    .lean();

  if (result?.length === 0) {
    return handleNoDataResponse(res);
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Service is retrieved successfully",
    data: result,
  });
});

export const bookingController = {
  createBooking,
  getAllBookings,
};
