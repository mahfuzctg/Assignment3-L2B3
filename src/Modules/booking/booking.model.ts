// src/modules/booking/booking.model.ts

import { Schema, model } from "mongoose";
import { IBooking } from "./booking.interface";

const bookingSchema = new Schema<IBooking>(
  {
    date: { type: Date, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Assuming "User" is the name of the user model
    car: { type: Schema.Types.ObjectId, ref: "Car", required: true }, // Assuming "Car" is the name of the car model
    startTime: { type: String, required: true }, // Assuming time is in 24hr format (e.g., "14:30")
    endTime: { type: String, required: true }, // Assuming time is in 24hr format (e.g., "16:45")
    totalCost: { type: Number, default: 0 }, // Default total cost is 0
  },
  {
    timestamps: true,
  }
);

export const Booking = model<IBooking>("Booking", bookingSchema);
