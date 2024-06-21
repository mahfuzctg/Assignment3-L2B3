/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import httpStatus from "http-status";
import { handleNoDataResponse } from "../../errors/handleNoData";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

import { TCar } from "./car.interface";
import { carServices } from "./car.service";

const createCar = catchAsync(async (req: Request, res: Response) => {
  const carData: TCar = req.body;
  const result = await carServices.createCarIntoDb(carData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Car created successfully!",
    data: result,
  });
});

const getSingleCar = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await carServices.getSingleCarFromDB(id);
  if (!result) {
    return handleNoDataResponse(res);
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Car is retrieved successfully",
    data: result,
  });
});

const getAllCars = catchAsync(async (req: Request, res: Response) => {
  const result = await carServices.getAllCars();
  if (result.length === 0) {
    return handleNoDataResponse(res);
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cars are retrieved successfully",
    data: result,
  });
});

const updateCar = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const car: Partial<TCar> = req.body;
  const result = await carServices.updateCarIntoDB(id, car);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Car is updated successfully",
    data: result,
  });
});

const deleteCar = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await carServices.deleteCarFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Car is deleted successfully",
    data: result,
  });
});

export const carControllers = {
  createCar,
  getSingleCar,
  getAllCars,
  updateCar,
  deleteCar,
};
