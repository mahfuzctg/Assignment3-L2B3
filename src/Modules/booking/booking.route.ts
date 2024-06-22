import express from "express";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../../modules/user/user.constant";
import BookingController from "./booking.controller";

const router = express.Router();

router.get("/", auth([USER_ROLE.admin]), BookingController.getAllBookings);
router.post("/", auth([USER_ROLE.user]), BookingController.bookCar);
router.get(
  "/my-bookings",
  auth([USER_ROLE.user]),
  BookingController.getUserBookings
);
router.post("/return-car", auth([USER_ROLE.user]), BookingController.returnCar);

export const BookingRoutes = router;
