import { Schema, Types, model } from "mongoose";
import { ICar } from "./car.model";
import { IUser } from "./user.model";

export interface IBooking {
  date: Date;
  user: Types.ObjectId | IUser;
  car: Types.ObjectId | ICar;
  startTime: string;
  endTime: string;
  totalCost: number;
}

const bookingSchema = new Schema({
  date: { type: Date, default: Date.now },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  car: { type: Schema.Types.ObjectId, ref: "Car", required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  totalCost: { type: Number, default: 0 },
});

// Calculate totalCost based on startTime, endTime, and pricePerHour
bookingSchema.pre<IBooking>("save", async function (next) {
  try {
    const carModel = await model<ICar>("Car").findById(this.car);
    if (!carModel) {
      throw new Error("Car not found");
    }

    const startTime = new Date(`2000-01-01T${this.startTime}:00Z`);
    const endTime = new Date(`2000-01-01T${this.endTime}:00Z`);
    const durationMs = endTime.getTime() - startTime.getTime();
    const durationHours = durationMs / (1000 * 60 * 60);
    this.totalCost = durationHours * carModel.pricePerHour;

    next();
  } catch (error) {
    next(error);
  }
});

export default model<IBooking>("Booking", bookingSchema);
