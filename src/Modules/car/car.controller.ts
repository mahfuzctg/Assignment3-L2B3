import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CarServices } from './car.service';

// ======== CreateCar controller =======
const createCar = catchAsync(async (req: Request, res: Response) => {
  const result = await CarServices.createCarIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Car created successfully',
    data: result,
  });
});
//  ========= getAllCar Controller ==========
const getAllCar = catchAsync(async (req: Request, res: Response) => {
  const result = await CarServices.getAllCarFromDB();

  if (!result) {
    res.status(httpStatus.NOT_FOUND).json({
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: ' Data not Found',
      data: [],
    });
  }
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Cars retrieved successfully',
    data: result,
  });
});
// ========= getSingleCar Controller ==========
const getSingleCar = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await CarServices.getSingleCarFromDB(id);
  if (!result) {
    res.status(httpStatus.NOT_FOUND).json({
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: ' Data not Found',
      data: [],
    });
  }
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'A Car retrieved successfully',
    data: result,
  });
});

// ====== deleteCar  controller ========
const deleteCar = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CarServices.deleteCarFromDB(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Car deleted successfully',
    data: result,
  });
});
//  ======  returnAndUpdate Controller ========
const returnAndUpdate = catchAsync(async (req: Request, res: Response) => {
  const path = req.path == '/return';
  if (path) {
    const bookingData = req.body;
    const result = await CarServices.returnCarFromDB(bookingData);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Car returned successfully',
      data: result,
    });
  } else {
    const id = req.params.id;
    const result = await CarServices.updateCarIntoDB(id, req.body);

    if (!result) {
      res.status(httpStatus.NOT_FOUND).json({
        success: false,
        statusCode: httpStatus.NOT_FOUND,
        message: ' Data not Found',
        data: [],
      });
    }
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Car updated successfully',
      data: result,
    });
  }
});
//====== export car controllers ======
export const CarController = {
  createCar,
  getAllCar,
  getSingleCar,
  deleteCar,
  returnAndUpdate: returnAndUpdate,
};
