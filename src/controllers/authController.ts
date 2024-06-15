// src/controllers/auth.controller.ts
import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import jwt from "jsonwebtoken";
import config from "../config";
import UserModel, { IUser } from "../models/user.model";

const JWT_ACCESS_SECRET = config.jwt_secret;

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, role, password, phone, address } = req.body;

  try {
    // Check if user with the same email already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(httpStatus.BAD_REQUEST).json({
        success: false,
        statusCode: httpStatus.BAD_REQUEST,
        message: "Email already exists. Please use a different email address.",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const newUser: IUser = new UserModel({
      name,
      email,
      role,
      password: hashedPassword,
      phone,
      address,
    });

    // Save the user to the database
    await newUser.save();

    // Prepare and send response
    res.status(httpStatus.CREATED).json({
      success: true,
      statusCode: httpStatus.CREATED,
      message: "User registered successfully",
      data: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        phone: newUser.phone,
        address: newUser.address,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt,
      },
    });
  } catch (error) {
    console.error("Error registering user:", error);
    next(error); // Pass the error to the error handling middleware
  }
};

export const signin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        statusCode: httpStatus.UNAUTHORIZED,
        message: "Invalid email or password.",
      });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        statusCode: httpStatus.UNAUTHORIZED,
        message: "Invalid email or password.",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      JWT_ACCESS_SECRET!,
      {
        expiresIn: "5h",
      }
    );

    // Prepare and send response
    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "User logged in successfully",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        address: user.address,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      token,
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    next(error); // Pass the error to the error handling middleware
  }
};
