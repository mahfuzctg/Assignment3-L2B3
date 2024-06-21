import { Document } from "mongoose";
import { TCar } from "../car/car.interface";
import { TUser } from "../user/user.interface";

export interface IBooking extends Document {
  date: string;
  startTime: string;
  endTime: string | null;
  user: TUser["_id"];
  car: TCar["_id"];
  totalCost: number;
  createdAt: Date;
  updatedAt: Date;
}
