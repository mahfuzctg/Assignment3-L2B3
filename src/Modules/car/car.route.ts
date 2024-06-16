import express from "express";
import { createCar } from "./car.controller"; // Import your controller method

const router = express.Router();

// POST /api/cars
router.post("/", createCar);

export default router;
