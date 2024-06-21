import mongoose from "mongoose";
import { TCar } from "../car/car.interface";
import { Car } from "../car/car.model";
import { IBooking } from "./booking.interface";
import BookingModel from "./booking.model";

class BookingService {
  async getAllBookings(query: any): Promise<IBooking[]> {
    return BookingModel.find(query).populate("user").populate("car").exec();
  }

  async getUserBookings(userId: mongoose.Types.ObjectId): Promise<IBooking[]> {
    return BookingModel.find({ user: userId }).populate("car").exec();
  }

  async getCarById(carId: mongoose.Types.ObjectId): Promise<TCar | null> {
    // Assuming you have a Car model and service to get car details
    return Car.findById(carId).exec();
  }

  async bookCar(
    userId: mongoose.Types.ObjectId,
    carId: mongoose.Types.ObjectId,
    date: string,
    startTime: string
  ): Promise<IBooking> {
    const newBooking = new BookingModel({
      user: userId,
      car: carId,
      date,
      startTime,
    });
    return newBooking.save();
  }

  async returnCar(
    bookingId: mongoose.Types.ObjectId,
    endTime: string
  ): Promise<IBooking | null> {
    return BookingModel.findByIdAndUpdate(
      bookingId,
      { endTime },
      { new: true }
    ).exec();
  }

  async updateBooking(
    bookingId: mongoose.Types.ObjectId,
    updateData: Partial<IBooking>
  ): Promise<IBooking | null> {
    return BookingModel.findByIdAndUpdate(bookingId, updateData, {
      new: true,
    }).exec();
  }
}

export default new BookingService();
