// src/modules/booking/booking.controller.ts

import { Request, Response } from "express";
import httpStatus from "http-status";
import { z } from "zod";
import { Car } from "../car/car.model";
import { User } from "../user/user.model";
import { Booking } from "./booking.model";

// Define a schema for validating the request body when booking a car
const createBookingSchema = z.object({
  carId: z.string(),
  date: z.string(), // Should be validated to be a valid date string
  startTime: z.string(), // Should be validated to be a valid time string
});

// Controller function to handle booking a car
export const createBooking = async (req: Request, res: Response) => {
  try {
    // Parse and validate request body against schema
    const { carId, date, startTime } = createBookingSchema.parse(req.body);

    // Get user ID from authenticated user (assumed to be set by auth middleware)
    const userId = req.user._id;

    // Find car and user
    const car = await Car.findById(carId);
    if (!car) {
      console.error(`Car not found for ID: ${carId}`);
      return res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: "Car not found",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      console.error(`User not found for ID: ${userId}`);
      return res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: "User not found",
      });
    }

    // Create a new booking instance
    const booking = new Booking({
      car: carId,
      date,
      startTime,
      user: userId,
    });

    // Save the booking to the database
    await booking.save();

    // Prepare the response data
    const responseData = {
      _id: booking._id,
      date: booking.date,
      startTime: booking.startTime,
      endTime: booking.endTime,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        address: user.address,
      },
      car: {
        _id: car._id,
        name: car.name,
        description: car.description,
        color: car.color,
        isElectric: car.isElectric,
        features: car.features,
        pricePerHour: car.pricePerHour,
        status: car.status,
        isDeleted: car.isDeleted,
        createdAt: car.createdAt,
        updatedAt: car.updatedAt,
      },
      totalCost: booking.totalCost,
      createdAt: booking.createdAt,
      updatedAt: booking.updatedAt,
    };

    // Respond with success message and booking data
    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "Car booked successfully",
      data: responseData,
    });
  } catch (error) {
    // Handle validation errors or other internal errors
    if (error instanceof z.ZodError) {
      const errorMessages = error.errors.map((err) => ({
        path: err.path.join("."),
        message: err.message,
      }));

      res.status(httpStatus.BAD_REQUEST).json({
        success: false,
        message: "Validation Error",
        errorMessages,
      });
    } else {
      console.error("Error creating booking:", error);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  }
};

// Controller function to handle retrieving all bookings for a specific car on a given date
export const getAllBookings = async (req: Request, res: Response) => {
  try {
    // Extract query parameters
    const { carId, date } = req.query;

    // Validate query parameters
    if (!carId || !date) {
      return res.status(httpStatus.BAD_REQUEST).json({
        success: false,
        message: "carId and date are required query parameters",
      });
    }

    // Find bookings based on carId and date
    const bookings = await Booking.find({ car: carId, date })
      .populate("user", "name email role phone address")
      .populate(
        "car",
        "name description color isElectric features pricePerHour status createdAt updatedAt"
      )
      .exec();

    if (!bookings || bookings.length === 0) {
      return res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: "No bookings found for the provided carId and date",
      });
    }

    // Respond with success message and booking data
    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "Bookings retrieved successfully",
      data: bookings,
    });
  } catch (error) {
    console.error("Error retrieving bookings:", error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
