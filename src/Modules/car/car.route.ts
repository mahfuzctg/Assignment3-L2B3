import express from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { USER_ROLE } from "../user/user.constant";
import { carControllers } from "./car.controller";
import { CarValidations } from "./car.validation";

const router = express.Router();

// car creating route
// Create a car
router.post(
  "/",
  auth(USER_ROLE.admin),
  validateRequest(CarValidations.createCarValidationSchema),
  carControllers.createCar
);
// Get a car
router.get("/:id", carControllers.getSingleCar);
// Update a car
router.put(
  "/:id",
  auth(USER_ROLE.admin),
  validateRequest(CarValidations.updateCarValidationSchema),
  carControllers.updateCar
);
// Delete a car
router.delete("/:id", auth(USER_ROLE.admin), carControllers.deleteCar);
// Get all cars
router.get("/", carControllers.getAllCars);

export const CarRoutes = router;
