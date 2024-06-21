import express from "express";

import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant"; // Adjust the import path as per your actual structure
import BookingController from "./booking.controller";

const router = express.Router();

router.get("/", auth(USER_ROLE.admin), BookingController.getAllBookings);
router.post("/", auth(USER_ROLE.user), BookingController.bookCar);

export const BookingRoutes = router;
