// carRoutes.ts

import express from "express";

import { protect, restrictTo } from "../middlewares/authMiddleware";

const router = express.Router();

// POST /api/cars - Create a new car (admin access only)
router.post("/", protect, restrictTo("admin"), createCar);

export default router;
