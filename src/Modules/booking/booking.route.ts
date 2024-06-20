import { Router } from "express";
import { auth } from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { USER_ROLES } from "../user/user.constant";
import { BookingController } from "./booking.controller";
import { BookingValidation } from "./booking.validation";

const router = Router();

router.post(
  "/",
  auth(USER_ROLES.user),
  validateRequest(BookingValidation.createBookingValidationSchema),
  BookingController.createBooking
);
router.get(
  "/my-bookings",
  auth(USER_ROLES.user),
  BookingController.getUsersBooking
);
router.get("/", auth(USER_ROLES.admin), BookingController.getAllBookings);

export const BookingRoutes = router;
