import { Schema, model } from "mongoose";

export interface ICar {
  name: string;
  description: string;
  color: string;
  isElectric: boolean;
  status: string;
  features: string[];
  pricePerHour: number;
  isDeleted: boolean;
}

const carSchema = new Schema<ICar>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    color: { type: String, required: true },
    isElectric: { type: Boolean, default: false },
    status: { type: String, default: "available" },
    features: { type: [String], default: [] },
    pricePerHour: { type: Number, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Car = model<ICar>("Car", carSchema);
