import { Request, Response } from "express";
import httpStatus from "http-status";
import { handleNoDataResponse } from "../../errors/handleNotFound";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

import * as carServices from "./car.service";

export const createCar = catchAsync(async (req: Request, res: Response) => {
  const carData = req.body;
  const result = await carServices.createCar(carData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Car created successfully!",
    data: result,
  });
});

export const getAllCars = catchAsync(async (req: Request, res: Response) => {
  const result = await carServices.getAllCars();
  if (result?.length === 0) {
    return handleNoDataResponse(res);
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cars retrieved successfully",
    data: result,
  });
});

export const getCarById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await carServices.getCarById(id);
  if (!result) {
    return handleNoDataResponse(res);
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Car retrieved successfully",
    data: result,
  });
});

export const updateCarById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const carData = req.body;
  const result = await carServices.updateCarById(id, carData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Car updated successfully",
    data: result,
  });
});

export const deleteCarById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await carServices.deleteCarById(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Car deleted successfully",
    data: result,
  });
});

export const carControllers = {
  createCar,
  getAllCars,
  getCarById,
  updateCarById,
  deleteCarById,
};
