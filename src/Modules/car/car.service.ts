import { Booking } from "../booking/booking.model"; // Ensure Booking is correctly imported
import { TCar } from "./car.interface";
import { Car, CarDocument } from "./car.model";

const createCarIntoDb = async (carData: TCar): Promise<CarDocument> => {
  try {
    const result = await Car.create(carData);
    return result;
  } catch (error) {
    throw new Error(`Could not create car in database: ${error.message}`);
  }
};

const getSingleCarFromDB = async (id: string): Promise<CarDocument | null> => {
  try {
    const result = await Car.findById(id);
    return result;
  } catch (error) {
    throw new Error(`Could not find car in database: ${error.message}`);
  }
};

const updateCarIntoDB = async (
  id: string,
  payload: Partial<TCar>
): Promise<CarDocument | null> => {
  try {
    const result = await Car.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });
    if (!result) {
      throw new Error("Car not found");
    }
    return result;
  } catch (error) {
    throw new Error(`Could not update car in database: ${error.message}`);
  }
};

const deleteCarFromDB = async (id: string): Promise<CarDocument | null> => {
  try {
    const deletedCar = await Car.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true }
    );
    if (!deletedCar) {
      throw new Error("Car not found");
    }
    return deletedCar;
  } catch (error) {
    throw new Error(`Could not delete car from database: ${error.message}`);
  }
};

const getAllCars = async (): Promise<CarDocument[]> => {
  try {
    const cars = await Car.find({ isDeleted: false });
    return cars;
  } catch (error) {
    throw new Error(`Could not fetch all cars from database: ${error.message}`);
  }
};

const returnCar = async (bookingId: string, endTime: string): Promise<any> => {
  try {
    const booking = await Booking.findById(bookingId).populate("car");
    if (!booking) {
      throw new Error("Booking not found");
    }

    booking.endTime = endTime;
    const totalHours =
      (new Date(endTime).getTime() - new Date(booking.startTime).getTime()) /
      1000 /
      60 /
      60;
    booking.totalCost = totalHours * booking.car.pricePerHour;
    await booking.save();

    const updatedCar = await Car.findByIdAndUpdate(
      booking.car._id,
      { status: "available" },
      { new: true, runValidators: true }
    );

    if (!updatedCar) {
      throw new Error("Car not found");
    }

    return booking;
  } catch (error) {
    throw new Error(`Could not update car in database: ${error.message}`);
  }
};

export const CarService = {
  createCarIntoDb,
  getSingleCarFromDB,
  updateCarIntoDB,
  deleteCarFromDB,
  getAllCars,
  returnCar,
};
