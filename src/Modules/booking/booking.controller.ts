import { Request, Response } from "express";
import mongoose from "mongoose";
import { TUser } from "../user/user.interface";
import { IBooking } from "./booking.interface";
import BookingService from "./booking.service";

class BookingController {
  async getUserBookings(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req.user as TUser)._id;
      if (!userId) {
        res.status(401).json({
          success: false,
          message: "Unauthorized: User not authenticated or invalid token",
        });
        return;
      }

      const bookings: IBooking[] = await BookingService.getUserBookings(
        new mongoose.Types.ObjectId(userId)
      );

      const bookingsResponse = bookings.map((booking) => ({
        _id: booking._id,
        date: booking.date,
        startTime: booking.startTime,
        endTime: booking.endTime,
        user: {
          _id: booking.user._id,
          name: booking.user.name,
          email: booking.user.email,
          role: booking.user.role,
          phone: booking.user.phone,
          address: booking.user.address,
        },
        car: {
          _id: booking.car._id,
          name: booking.car.name,
          description: booking.car.description,
          color: booking.car.color,
          isElectric: booking.car.isElectric,
          features: booking.car.features,
          pricePerHour: booking.car.pricePerHour,
          status: booking.car.status,
          isDeleted: booking.car.isDeleted,
          createdAt: booking.car.createdAt,
          updatedAt: booking.car.updatedAt,
        },
        totalCost: booking.totalCost,
        createdAt: booking.createdAt,
        updatedAt: booking.updatedAt,
      }));

      res.status(200).json({
        success: true,
        statusCode: 200,
        message: "My Bookings retrieved successfully",
        data: bookingsResponse,
      });
    } catch (error) {
      console.error("Error retrieving user bookings:", error);
      res.status(500).json({
        success: false,
        message: "Failed to retrieve user bookings",
        error: error.message,
      });
    }
  }

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
      const bookings: IBooking[] = await BookingService.getAllBookings(
        new mongoose.Types.ObjectId(carId as string),
        date as string
      );

      const bookingsResponse = bookings.map((booking) => ({
        _id: booking._id,
        date: booking.date,
        startTime: booking.startTime,
        endTime: booking.endTime,
        user: {
          _id: booking.user._id,
          name: booking.user.name,
          email: booking.user.email,
          role: booking.user.role,
          phone: booking.user.phone,
          address: booking.user.address,
        },
        car: {
          _id: booking.car._id,
          name: booking.car.name,
          description: booking.car.description,
          color: booking.car.color,
          isElectric: booking.car.isElectric,
          features: booking.car.features,
          pricePerHour: booking.car.pricePerHour,
          status: booking.car.status,
          isDeleted: booking.car.isDeleted,
          createdAt: booking.car.createdAt,
          updatedAt: booking.car.updatedAt,
        },
        totalCost: booking.totalCost,
        createdAt: booking.createdAt,
        updatedAt: booking.updatedAt,
      }));

      res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Bookings retrieved successfully",
        data: bookingsResponse,
      });
    } catch (error) {
      console.error("Error retrieving bookings:", error);
      res.status(500).json({
        success: false,
        message: "Failed to retrieve bookings",
        error: error.message,
      });
    }
  }

  async bookCar(req: Request, res: Response): Promise<void> {
    const userId = (req.user as TUser)?._id;
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
      console.error("Error booking car:", error);
      res.status(500).json({
        success: false,
        message: "Failed to book car",
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
      console.error("Error returning car:", error);
      res.status(500).json({
        success: false,
        message: "Failed to return car",
        error: error.message,
      });
    }
  }
}

export default new BookingController();
