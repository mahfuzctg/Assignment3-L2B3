import { Document, Schema, model } from "mongoose";
import { BaseModel } from "../utils/baseModel";

// Define interface extending from BaseModel and Document
export interface IUser extends BaseModel, Document {
  name: string;
  email: string;
  role: "user" | "admin";
  password: string;
  phone?: string;
  address?: string;
}

// Define user schema fields
const userSchemaFields = {
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ["user", "admin"], required: true },
  password: { type: String, required: true },
  phone: { type: String },
  address: { type: String },
};

// Create a new schema using the defined fields and enable timestamps
const userSchema = new Schema<IUser>(
  {
    ...userSchemaFields,
    // You can add more fields or extend here if needed
  },
  { timestamps: true } // Enable timestamps
);

// Export the model
export default model<IUser>("User", userSchema);
