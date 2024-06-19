// src/modules/booking/booking.model.ts
import { Document, Schema, model } from "mongoose";

export interface BookingDocument extends Document {
  car: string;
  date: Date;
  startTime: string;
  endTime?: Date;
  user: string;
  totalCost: number;
  createdAt: Date;
  updatedAt: Date;
}

const bookingSchema = new Schema(
  {
    car: { type: Schema.Types.ObjectId, ref: "Car", required: true },
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: Date },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    totalCost: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Booking = model<BookingDocument>("Booking", bookingSchema);
