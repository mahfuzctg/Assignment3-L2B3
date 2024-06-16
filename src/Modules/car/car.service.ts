import { Car, ICar } from "./car.model";

export const createCar = async (carData: ICar): Promise<ICar> => {
  try {
    const car = new Car(carData);
    return await car.save();
  } catch (error) {
    // Handle any potential errors here (e.g., validation errors, database errors)
    throw new Error(`Error creating car: ${error.message}`);
  }
};

export const getAllCars = async (): Promise<ICar[]> => {
  try {
    return await Car.find({ isDeleted: false });
  } catch (error) {
    throw new Error(`Error fetching cars: ${error.message}`);
  }
};

export const getCarById = async (id: string): Promise<ICar | null> => {
  try {
    return await Car.findById(id);
  } catch (error) {
    throw new Error(`Error fetching car by ID ${id}: ${error.message}`);
  }
};

export const updateCarById = async (
  id: string,
  carData: Partial<ICar>
): Promise<ICar | null> => {
  try {
    return await Car.findByIdAndUpdate(id, carData, { new: true });
  } catch (error) {
    throw new Error(`Error updating car with ID ${id}: ${error.message}`);
  }
};

export const deleteCarById = async (id: string): Promise<ICar | null> => {
  try {
    // Soft delete by updating isDeleted field
    return await Car.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
  } catch (error) {
    throw new Error(`Error deleting car with ID ${id}: ${error.message}`);
  }
};
