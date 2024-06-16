import express from "express";
import { isAdmin } from "../../middlewares/isAdmin";
import { carControllers } from "./car.controller";

const router = express.Router();

router.post("/", isAdmin, carControllers.createCar);
router.get("/", carControllers.getAllCars);
router.get("/:id", carControllers.getCarById);
router.put("/:id", isAdmin, carControllers.updateCarById);
router.delete("/:id", isAdmin, carControllers.deleteCarById);

export default router;
