import httpStatus from 'http-status';

import AppError from '../../errors/appError';
import { convertTimeToHour } from '../../utils/convertToHours';
import { Booking } from '../booking/booking.model';
import { TCar, TReturnCar } from './car.interface';
import { Car } from './car.model';

//======== create car service =========
const createCarIntoDB = async (carData: TCar) => {
  const result = await Car.create(carData);
  return result;
};
const getAllCarFromDB = async () => {
  const result = await Car.find();

  return result;
};
//======== get single car form database ==========
const getSingleCarFromDB = async (id: string) => {
  const isCarExists = await Car.findById(id);
  if (!isCarExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Car is not found');
  }
  const result = isCarExists;
  return result;
};

//====== update car into database =========
const updateCarIntoDB = async (id: string, payload: Partial<TCar>) => {
  const isCarExists = await Car.findById(id);
  if (!isCarExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Car is not found !');
  }
  const result = await Car.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deleteCarFromDB = async (id: string) => {
  const isCarExists = await Car.findById(id);
  if (!isCarExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Car is not found !');
  }
  const result = await Car.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};
const returnCarFromDB = async (payload: TReturnCar) => {
  const isBookingExists = await Booking.findById(payload.bookingId);

  if (!isBookingExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Booking is not found !');
  }
  const isCarExists = await Car.findByIdAndUpdate(
    isBookingExists.car,
    {
      status: 'available',
    },
    {
      new: true,
    },
  );
  if (!isCarExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Car is not found !');
  }
  const startHours = convertTimeToHour(isBookingExists.startTime);
  const endHours = convertTimeToHour(payload.endTime);
  let durationHours = endHours - startHours;
  if (durationHours < 0) {
    durationHours += 24;
  }
  const totalCost = Number(durationHours) * Number(isCarExists.pricePerHour);
  const updatedBooking = await Booking.findByIdAndUpdate(
    payload.bookingId,
    {
      endTime: payload.endTime,
      totalCost,
    },
    {
      new: true,
    },
  ).populate('user car');

  return updatedBooking;
};
// ===== export car services ========
export const CarServices = {
  createCarIntoDB,
  getAllCarFromDB,
  getSingleCarFromDB,
  updateCarIntoDB,
  deleteCarFromDB,
  returnCarFromDB,
};
