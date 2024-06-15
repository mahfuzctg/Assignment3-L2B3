import { Schema, model } from "mongoose";

export interface ICar {
  name: string;
  description: string;
  color: string;
  isElectric: boolean;
  status: "available" | "unavailable";
  features: string[];
  pricePerHour: number;
  isDeleted: boolean;
}

const carSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  color: { type: String, required: true },
  isElectric: { type: Boolean, default: false },
  status: {
    type: String,
    enum: ["available", "unavailable"],
    default: "available",
  },
  features: [{ type: String }],
  pricePerHour: { type: Number, required: true },
  isDeleted: { type: Boolean, default: false },
});

export default model<ICar>("Car", carSchema);
