import { Booking } from "../../modules/booking/booking.model";

import { TUser } from "./user.interface";
import { User } from "./user.model";

const createUserIntoDb = async (userData: TUser) => {
  const result = await User.create(userData);
  return result;
};

const getMyBookingsFromDb = async (email: string) => {
  // const result = await Booking.find().populate('customer')
  const user = await User.findOne({ email });
  if (user) {
    const result = await Booking.find({ customer: user._id }).populate(
      "car",
      "_id name description price "
    );
    return result;
  }
};

export const userServices = {
  createUserIntoDb,
  getMyBookingsFromDb,
};
