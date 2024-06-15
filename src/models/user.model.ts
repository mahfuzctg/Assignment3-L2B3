// models/user.model.ts
import { Document, Schema, model } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  phone: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      required: true,
      enum: ["admin", "user"],
      default: "user",
    },
    phone: { type: String, required: true },
    address: { type: String, required: true },
  },
  { timestamps: true }
);

userSchema.statics.findAdmin = function () {
  return this.findOne({ role: "admin" });
};

const UserModel = model<IUser>("User", userSchema);
export default UserModel;
