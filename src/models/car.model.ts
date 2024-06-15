import { Document, Schema, model } from "mongoose";

export interface ICar extends Document {
  name: string;
  description: string;
  color: string;
  isElectric: boolean;
  features: string[];
  pricePerHour: number;
  status: string;
  isDeleted: boolean;
  createdAt?: Date; // Add createdAt property
  updatedAt?: Date; // Add updatedAt property
}

const carSchema = new Schema<ICar>(
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
    timestamps: true, // Enable timestamps
  }
);

const Car = model<ICar>("Car", carSchema);
export default Car;
