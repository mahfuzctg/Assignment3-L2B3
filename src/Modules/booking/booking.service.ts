import { Car } from "../car/car.model";

import { User } from "../user/user.model";

import { TBooking } from "./booking.interface";
import { Booking } from "./booking.model";

const createBookingIntoDB = async (email: string, bookingData: TBooking) => {
  //   console.log(bookingData)
  const userInfo = await User.findOne({ email });
  if (!userInfo) {
    throw new Error("User not found");
  }
  const carInfo = await Car.findById({ _id: bookingData?.carId });
  if (!carInfo) {
    throw new Error("Car not found");
  }

  const newBookingData: Partial<TBooking> = {
    customer: userInfo._id,
    car: carInfo._id,
  };

  const newBooking = await Booking.create(newBookingData);

  const populatedBooking = await Booking.findById(newBooking._id)
    .populate("customer", "_id name email phone address")
    .populate("car", "_id name description price duration isDeleted")

    .lean();

  return populatedBooking;
};

export const bookingCars = {
  createBookingIntoDB,
};
