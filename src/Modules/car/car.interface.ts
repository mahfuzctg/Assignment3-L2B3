import mongoose from "mongoose";

export interface TCar {
  _id: mongoose.Types.ObjectId;
  name: string;
  description: string;
  color: string;
  isElectric: boolean;
  status: string;
  features: string[];
  pricePerHour: number;
  isDeleted?: boolean;
}
