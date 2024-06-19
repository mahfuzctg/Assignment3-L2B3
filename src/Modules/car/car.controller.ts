/* eslint-disable @typescript-eslint/no-explicit-any */

import httpStatus from "http-status";
import { handleNoDataResponse } from "../../errors/handleNoData";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { Car } from "./car.model";
import { carServices } from "./car.service";

const createCar = catchAsync(async (req, res) => {
  const CarData = req.body;
  const result = await carServices.createCarIntoDb(CarData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Car created successfully!",
    data: result,
  });
});

const getSingleCar = catchAsync(async (req, res) => {
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

const getAllCars = catchAsync(async (req, res) => {
  // const result = await Car.find()
  const result = await Car.aggregate([{ $match: { isDeleted: false } }]);

  if (result?.length === 0) {
    return handleNoDataResponse(res);
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Car is retrieved successfully",
    data: result,
  });
});

const updateCar = catchAsync(async (req, res) => {
  const { id } = req.params;
  const car = req.body;
  const result = await carServices.updateCarIntoDB(id, car);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Car is updated successfully",
    data: result,
  });
});

const deleteCar = catchAsync(async (req, res) => {
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
