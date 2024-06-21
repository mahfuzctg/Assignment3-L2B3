import express from "express";
import auth from "../../middlewares/auth";
import { userControllers } from "./user.controller";

const router = express.Router();

// Get user's bookings (accessible only to the user)
router.get("/my-bookings", auth, userControllers.getMyBookings);

// Export the router
export const UserRoutes = router;
