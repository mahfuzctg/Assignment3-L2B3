// src/modules/car/car.model.ts

import { Document, Schema, model } from "mongoose";

export interface CarDocument extends Document {
  name: string;
  description: string;
  color: string;
  isElectric: boolean;
  features: string[];
  pricePerHour: number;
  status: string;
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const carSchema = new Schema<CarDocument>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    color: { type: String, required: true },
    isElectric: { type: Boolean, required: true },
    features: { type: [String], required: true },
    pricePerHour: { type: Number, required: true },
    status: { type: String, default: "available" },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const Car = model<CarDocument>("Car", carSchema);
