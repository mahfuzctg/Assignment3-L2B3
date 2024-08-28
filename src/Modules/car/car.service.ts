import httpStatus from 'http-status';

import mongoose from 'mongoose';
import AppError from '../../errors/appError';
import { convertTimeToHours } from '../../utils/TimeHoursConverted';
import { Booking } from '../booking/booking.model';
import { TCar, TReturnCar } from './car.interface';
import { Car } from './car.model';

const createCarIntoDB = async (data: TCar) => {
  const result = await Car.create(data);
  return result;
};
const getAllCarFromDB = async () => {
  const result = await Car.find({
    isDeleted: false,
  });
  return result;
};

const getSingleCarFromDB = async (id: string) => {
  const isCarExists = await Car.findById(id);
  if (!isCarExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Car is not found !');
  }
  const result = isCarExists;
  return result;
};

const updateCarIntoDB = async (id: string, payload: Partial<TCar>) => {
  const isCarExists = await Car.findById(id);
  if (!isCarExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Car is not found !');
  }
  const result = await Car.findByIdAndUpdate(id, payload, { new: true });
  return result;
};
const deleteCarIntoDB = async (id: string) => {
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
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const isBookingExists = await Booking.findById(payload.bookingId).session(
      session,
    );
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
        session,
      },
    );
    if (!isCarExists) {
      throw new AppError(httpStatus.NOT_FOUND, 'Car is not found !');
    }

    const startHours = convertTimeToHours(isBookingExists.startTime);
    const endHours = convertTimeToHours(payload.endTime);

    let durationHours = endHours - startHours;

    // If endTime is less than startTime, it means endTime is on the next day
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
        session,
      },
    ).populate('user car');

    await session.commitTransaction();
    await session.endSession();

    return updatedBooking;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, `Failed to return bookings`);
  }
};

export const CarServices = {
  createCarIntoDB,
  getAllCarFromDB,
  getSingleCarFromDB,
  updateCarIntoDB,
  deleteCarIntoDB,
  returnCarFromDB,
};
