import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import CarModel, { ICar } from "../models/car.model";

const createCar = async (req: Request, res: Response, next: NextFunction) => {
  const { name, description, color, isElectric, features, pricePerHour } =
    req.body;

  try {
    // Create a new car
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

    // Save the new car to the database
    await newCar.save();

    // Prepare and send response
    res.status(httpStatus.CREATED).json({
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Car created successfully",
      data: {
        _id: newCar._id,
        name: newCar.name,
        description: newCar.description,
        color: newCar.color,
        isElectric: newCar.isElectric,
        features: newCar.features,
        pricePerHour: newCar.pricePerHour,
        status: newCar.status,
        isDeleted: newCar.isDeleted,
        createdAt: newCar.createdAt,
        updatedAt: newCar.updatedAt,
      },
    });
  } catch (error) {
    console.error("Error creating car:", error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      message: "Internal Server Error",
    });
  }
};

export default createCar;
