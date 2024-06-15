import { Schema, model } from "mongoose";
import BaseModel from "../utils/baseModel";

export interface IUser extends BaseModel {
  name: string;
  email: string;
  role: "user" | "admin";
  password: string;
  phone?: string;
  address?: string;
}

const userSchemaFields = {
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ["user", "admin"], required: true },
  password: { type: String, required: true },
  phone: { type: String },
  address: { type: String },
};

const userSchema = new Schema({
  ...baseSchemaFields,
  ...userSchemaFields,
});

export default model<IUser>("User", userSchema);
