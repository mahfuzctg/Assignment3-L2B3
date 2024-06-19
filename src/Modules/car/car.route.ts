import express from "express";

import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { USER_ROLE } from "../user/user.constant";
import { carControllers } from "./car.controller";
import { CarValidations } from "./car.validation";

const router = express.Router();

// car creating route
router.post(
  "/",
  auth(USER_ROLE.admin),
  validateRequest(CarValidations.createCarValidationSchema),
  carControllers.createCar
);
router.get("/:id", carControllers.getSingleCar);
router.put(
  "/:id",
  auth(USER_ROLE.admin),
  validateRequest(CarValidations.updateCarValidationSchema),
  carControllers.updateCar
);
router.delete("/:id", auth(USER_ROLE.admin), carControllers.deleteCar);
router.get("/", carControllers.getAllCars);

export const CarRoutes = router;
