import { Request, Response } from "express";
import mongoose from "mongoose";
import { TUser } from "../user/user.interface";
import BookingService from "./booking.service";

class BookingController {
  async getAllBookings(req: Request, res: Response): Promise<void> {
    const { carId, date } = req.query;
    if (!carId || !date) {
      res.status(400).json({
        success: false,
        message: "carId and date are required in query parameters",
      });
      return;
    }
    try {
      const bookings = await BookingService.getAllBookings(
        new mongoose.Types.ObjectId(carId as string),
        date as string
      );
      res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Bookings retrieved successfully",
        data: bookings,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  async bookCar(req: Request, res: Response): Promise<void> {
    const userId = (req.user as TUser)._id; // Assuming user information is available in req.user after authentication
    const { carId, date, startTime } = req.body;
    if (!carId || !date || !startTime) {
      res.status(400).json({
        success: false,
        message: "carId, date, and startTime are required in the request body",
      });
      return;
    }
    try {
      const newBooking = await BookingService.bookCar(
        new mongoose.Types.ObjectId(userId),
        new mongoose.Types.ObjectId(carId),
        date,
        startTime
      );
      res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Car booked successfully",
        data: newBooking,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  async returnCar(req: Request, res: Response): Promise<void> {
    const { bookingId, endTime } = req.body;
    if (!bookingId || !endTime) {
      res.status(400).json({
        success: false,
        message: "bookingId and endTime are required in the request body",
      });
      return;
    }
    try {
      const updatedBooking = await BookingService.returnCar(
        new mongoose.Types.ObjectId(bookingId),
        endTime
      );
      res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Car returned successfully",
        data: updatedBooking,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }
}

export default new BookingController();
