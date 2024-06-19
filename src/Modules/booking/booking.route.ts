// src/modules/booking/booking.route.ts

import { Router } from "express";
import auth from "../../middlewares/auth"; // Ensure correct path to auth middleware
import { createBooking, getAllBookings } from "./booking.controller";

const router = Router();

router.post("/", auth("user"), createBooking);
router.get("/", auth("admin"), getAllBookings);

export default router;
