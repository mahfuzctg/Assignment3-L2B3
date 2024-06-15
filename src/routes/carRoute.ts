import express from "express";
import createCar from "../controllers/carController";
import auth from "../middlewares/authMiddleware";

const router = express.Router();

// Route protected by auth middleware with required roles
router.post("/cars", auth("admin"), createCar);

export default router;
