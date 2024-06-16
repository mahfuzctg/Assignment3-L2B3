// src/modules/car/car.controller.ts

import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import Car from "./car.model";

export const createCar = catchAsync(async (req: Request, res: Response) => {
  const { name, description, color, isElectric, features, pricePerHour } =
    req.body;

  const newCar = new Car({
    name,
    description,
    color,
    isElectric,
    features,
    pricePerHour,
  });

  const savedCar = await newCar.save();

  res.status(201).json({
    success: true,
    statusCode: 201,
    message: "Car created successfully",
    data: savedCar.toJSON(),
  });
});
