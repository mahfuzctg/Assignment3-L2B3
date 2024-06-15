import { Request, Response } from "express";
import CarModel, { ICar } from "../models/car.model";

export const createCar = async (req: Request, res: Response) => {
  const { name, description, color, isElectric, features, pricePerHour } =
    req.body;

  try {
    // Create a new car instance
    const newCar: ICar = new CarModel({
      name,
      description,
      color,
      isElectric,
      features,
      pricePerHour,
      status: "available",
      isDeleted: false,
    });

    // Save the car to the database
    await newCar.save();

    // Prepare and send response
    res.status(201).json({
      success: true,
      statusCode: 201,
      message: "Car created successfully",
      data: newCar,
    });
  } catch (error) {
    console.error("Error creating car:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
