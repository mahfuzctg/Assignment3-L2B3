import mongoose from "mongoose";
import Booking from "../booking/booking.model";
import { IBooking } from "./booking.interface";

class BookingService {
  async getAllBookings(query: any): Promise<IBooking[]> {
    return Booking.find(query).populate("car").populate("user").exec();
  }

  async getUserBookings(userId: mongoose.Types.ObjectId): Promise<IBooking[]> {
    return Booking.find({ user: userId }).populate("car").exec();
  }

  async bookCar(
    userId: mongoose.Types.ObjectId,
    carId: mongoose.Types.ObjectId,
    date: string,
    startTime: string
  ): Promise<IBooking> {
    const newBooking = new Booking({
      user: userId,
      car: carId,
      date,
      startTime,
      totalCost: 0, // Assuming cost calculation is done later
    });
    return newBooking.save();
  }

  async returnCar(
    bookingId: mongoose.Types.ObjectId,
    endTime: string
  ): Promise<IBooking | null> {
    const booking = await Booking.findById(bookingId).populate("car").exec();
    if (!booking) {
      throw new Error("Booking not found");
    }
    booking.endTime = endTime;
    booking.totalCost = this.calculateTotalCost(
      booking.startTime,
      endTime,
      booking.car.pricePerHour
    );
    return booking.save();
  }

  async updateBooking(
    bookingId: mongoose.Types.ObjectId,
    updateData: Partial<IBooking>
  ): Promise<IBooking | null> {
    return Booking.findByIdAndUpdate(bookingId, updateData, {
      new: true,
    }).exec();
  }

  async getCarById(carId: mongoose.Types.ObjectId) {
    return Booking.findById(carId).exec(); // Assuming the car information is stored in Booking model
  }

  calculateTotalCost(
    startTime: string,
    endTime: string,
    pricePerHour: number
  ): number {
    const start = new Date(`1970-01-01T${startTime}Z`).getTime();
    const end = new Date(`1970-01-01T${endTime}Z`).getTime();
    const hours = (end - start) / (1000 * 60 * 60);
    return hours * pricePerHour;
  }
}

export default new BookingService();
