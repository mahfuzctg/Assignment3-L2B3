import { Request, Response } from "express";
import mongoose from "mongoose";

import { TUser } from "../user/user.interface";

import { CarService } from "../car/car.service";
import { userServices } from "../user/user.service";
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

      const bookingsResponse = await Promise.all(
        bookings.map(async (booking) => {
          const user = await userServices.getUserById(booking.user._id);
          const car = await CarService.getCarById(booking.car._id);

          return {
            _id: booking._id,
            date: booking.date,
            startTime: booking.startTime,
            endTime: booking.endTime,
            user: {
              _id: user?._id || "", // Accessing user properties safely
              name: user?.name || "",
              email: user?.email || "",
              role: user?.role || "",
              phone: user?.phone || "",
              address: user?.address || "",
            },
            car: {
              _id: car?._id || "", // Accessing car properties safely
              name: car?.name || "",
              description: car?.description || "",
              color: car?.color || "",
              isElectric: car?.isElectric || false,
              features: car?.features || [],
              pricePerHour: car?.pricePerHour || 0,
              status: car?.status || "",
              isDeleted: car?.isDeleted || false,
              createdAt: car?.createdAt || new Date(),
              updatedAt: car?.updatedAt || new Date(),
            },
            totalCost: booking.totalCost,
            createdAt: booking.createdAt,
            updatedAt: booking.updatedAt,
          };
        })
      );

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

  async bookCar(req: Request, res: Response): Promise<void> {
    const userId = (req.user as TUser)?._id;
    const { carId, date, startTime } = req.body;
    if (!userId || !carId || !date || !startTime) {
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
