import { Service } from "../car/car.model";

import { User } from "../user/user.model";
import { TBooking, TBookingRequest } from "./booking.interface";
import { Booking } from "./booking.model";

const createBookingIntoDB = async (
  email: string,
  bookingData: TBookingRequest
) => {
  //   console.log(bookingData)
  const userInfo = await User.findOne({ email });
  if (!userInfo) {
    throw new Error("User not found");
  }
  const serviceInfo = await Service.findById({ _id: bookingData?.serviceId });
  if (!serviceInfo) {
    throw new Error("Service not found");
  }
  const slotInfo = await Slot.findById({ _id: bookingData?.slotId });
  if (!slotInfo) {
    throw new Error("Slot not found");
  }

  slotInfo.isBooked = "booked";
  await slotInfo.save();

  const newBookingData: Partial<TBooking> = {
    customer: userInfo._id,
    service: serviceInfo._id,
    slot: slotInfo._id,
    vehicleType: bookingData.vehicleType,
    vehicleBrand: bookingData.vehicleBrand,
    vehicleModel: bookingData.vehicleModel,
    manufacturingYear: bookingData.manufacturingYear,
    registrationPlate: bookingData.registrationPlate,
  };

  const newBooking = await Booking.create(newBookingData);

  const populatedBooking = await Booking.findById(newBooking._id)
    .populate("customer", "_id name email phone address")
    .populate("service", "_id name description price duration isDeleted")
    .populate("slot", "_id service date startTime endTime isBooked")
    .lean();

  return populatedBooking;
};

export const bookingServices = {
  createBookingIntoDB,
};
