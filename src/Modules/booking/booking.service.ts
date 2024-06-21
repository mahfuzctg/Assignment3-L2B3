import mongoose from "mongoose";
import Booking from "./booking.model";

const bookCar = async (
  userId: mongoose.Types.ObjectId,
  carId: mongoose.Types.ObjectId,
  date: string,
  startTime: string
) => {
  try {
    console.log("Creating booking:", { userId, carId, date, startTime });
    const booking = new Booking({
      user: userId,
      car: carId,
      date,
      startTime,
      endTime: null, // default to null
      totalCost: 0, // default to 0
    });
    const result = await booking.save();
    console.log("Booking created:", result);
    return result;
  } catch (error) {
    console.error("Error booking car:", error);
    throw new Error(`Could not book car: ${error.message}`);
  }
};

const getAllBookings = async (carId: mongoose.Types.ObjectId, date: string) => {
  try {
    console.log("Fetching bookings for:", { carId, date });
    const bookings = await Booking.find({ car: carId, date }).populate(
      "user car"
    );
    console.log("Bookings fetched:", bookings);
    return bookings;
  } catch (error) {
    console.error("Error fetching bookings:", error);
    throw new Error(`Could not get bookings: ${error.message}`);
  }
};

export default {
  bookCar,
  getAllBookings,
};
