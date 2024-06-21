import { TCar } from "./car.interface";
import { Car } from "./car.model";

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
): Promise<Document | null> => {
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

const deleteCarFromDB = async (id: string): Promise<Document | null> => {
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

const getAllCars = async (): Promise<Document[]> => {
  try {
    const cars = await Car.find({ isDeleted: false }); // Ensure Car is correctly imported and initialized
    return cars;
  } catch (error) {
    throw new Error(`Could not fetch all cars from database: ${error.message}`);
  }
};

export const carServices = {
  createCarIntoDb,
  getSingleCarFromDB,
  updateCarIntoDB,
  deleteCarFromDB,
  getAllCars,
};
