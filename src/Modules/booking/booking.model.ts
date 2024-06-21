import mongoose, { Schema } from "mongoose";
import { IBooking } from "./booking.interface";

const BookingSchema: Schema = new Schema(
  {
    date: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, default: null },
    user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    car: { type: mongoose.Types.ObjectId, ref: "Car", required: true },
    totalCost: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IBooking>("Booking", BookingSchema);
