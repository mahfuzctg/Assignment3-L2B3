// src/interfaces/booking.interface.ts

import { Types } from "mongoose";

export interface IBooking {
  date: Date;
  user: Types.ObjectId | string; // Reference to user model
  car: Types.ObjectId | string; // Reference to car model
  startTime: string; // 24hr format, e.g., "14:30"
  endTime: string; // 24hr format, e.g., "16:45"
  totalCost: number; // Calculated using startTime, endTime, and possibly pricePerHour
}
