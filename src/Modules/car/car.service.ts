import { TCar } from "./car.interface";
import { Car } from "./car.model";

const createCarIntoDb = async (serviceData: TCar) => {
  const result = await Car.create(serviceData);
  return result;
};

const getSingleCarFromDB = async (id: string) => {
  const result = await Car.findById(id);
  return result;
};

const updateCarIntoDB = async (id: string, payload: Partial<TCar>) => {
  const result = await Car.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteCarFromDB = async (id: string) => {
  const deletedFaculty = await Car.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );

  return deletedFaculty;
};

export const carServices = {
  createCarIntoDb,
  getSingleCarFromDB,
  updateCarIntoDB,
  deleteCarFromDB,
};
