import bcrypt from "bcrypt";
import { Document, Model, Schema, model } from "mongoose";
import config from "../../config";
import { TUser, UserModel } from "./user.interface";

// Define user schema
const userSchema = new Schema<TUser, UserModel>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    address: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

// Middleware to hash password before saving
userSchema.pre("save", async function (next) {
  const user = this as TUser & Document;
  if (!user.isModified("password")) {
    return next();
  }
  try {
    const hashedPassword = await bcrypt.hash(
      user.password,
      Number(config.bcrypt_salt_rounds)
    );
    user.password = hashedPassword;
    return next();
  } catch (error) {
    return next(error);
  }
});

// Middleware to remove password field from returned JSON
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

// Static method to find user by email
userSchema.statics.isUserExistsByEmail = async function (email: string) {
  return await this.findOne({ email });
};

// Static method to compare passwords
userSchema.statics.isPasswordMatched = async function (
  plainTextPassword: string,
  hashedPassword: string
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

// Export User model
export const User: Model<TUser & Document> = model<TUser & Document, UserModel>(
  "User",
  userSchema
);
