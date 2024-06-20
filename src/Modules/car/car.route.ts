import { Router } from "express";
import { auth } from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { USER_ROLES } from "../user/user.constant";
import { CarController } from "./car.controller";
import { CarValidations } from "./car.validation";

const router = Router();

router.post(
  "/",
  auth(USER_ROLES.admin),
  validateRequest(CarValidations.createCarValidationSchema),
  CarController.createCar
);

router.get("/", CarController.getAllCar);

router.get("/:id", CarController.getSingleCar);

router.put(
  "/return",
  auth(USER_ROLES.admin),
  validateRequest(CarValidations.returnCarValidationSchema),
  CarController.returnAndUpdate
);

router.put(
  "/:id",
  auth(USER_ROLES.admin),
  validateRequest(CarValidations.updateCarValidationSchema),
  CarController.returnAndUpdate
);
router.delete("/:id", CarController.deleteCar);

export const CarRoutes = router;
