import { Types } from "mongoose";

export interface IBooking {
  date: string;
  startTime: string;
  endTime: string;
  user: Types.ObjectId;
  car: Types.ObjectId;
  totalCost: number;
}
