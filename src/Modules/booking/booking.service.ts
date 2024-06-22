import mongoose from "mongoose";
import Booking, { IBooking } from "./booking.model";

class BookingService {
  async getUserBookings(userId: mongoose.Types.ObjectId): Promise<IBooking[]> {
    try {
      const bookings = await Booking.find({ user: userId })
        .populate("user", "_id name email role phone address")
        .populate(
          "car",
          "_id name description color isElectric features pricePerHour status isDeleted createdAt updatedAt"
        )
        .exec();
      return bookings;
    } catch (error) {
      throw new Error(`Could not fetch user bookings: ${error.message}`);
    }
  }

  async getAllBookings(
    carId: mongoose.Types.ObjectId,
    date: string
  ): Promise<IBooking[]> {
    try {
      const bookings = await Booking.find({ car: carId, date })
        .populate("user", "_id name email role phone address")
        .populate(
          "car",
          "_id name description color isElectric features pricePerHour status isDeleted createdAt updatedAt"
        )
        .exec();
      return bookings;
    } catch (error) {
      throw new Error(`Could not fetch bookings: ${error.message}`);
    }
  }

  async bookCar(
    userId: mongoose.Types.ObjectId,
    carId: mongoose.Types.ObjectId,
    date: string,
    startTime: string
  ): Promise<IBooking> {
    try {
      const newBooking = new Booking({
        user: userId,
        car: carId,
        date,
        startTime,
        endTime: null,
        totalCost: 0, // Assume totalCost is calculated later
      });
      await newBooking.save();
      return newBooking;
    } catch (error) {
      throw new Error(`Could not book car: ${error.message}`);
    }
  }

  async returnCar(
    bookingId: mongoose.Types.ObjectId,
    endTime: string
  ): Promise<IBooking | null> {
    try {
      const updatedBooking = await Booking.findByIdAndUpdate(
        bookingId,
        { endTime },
        { new: true }
      ).exec();

      if (!updatedBooking) {
        throw new Error("Booking not found");
      }

      return updatedBooking;
    } catch (error) {
      throw new Error(`Could not return car: ${error.message}`);
    }
  }
}

export default new BookingService();
