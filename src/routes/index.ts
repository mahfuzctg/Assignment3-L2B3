// src/routes/index.ts
import { Router } from "express";

import { AuthRoutes } from "../modules/auth/auth.route";

import { BookingRoutes } from "../modules/booking/booking.route";
import { CarRoutes } from "../modules/car/car.route";
import { UserRoutes } from "../modules/user/user.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/cars",
    route: CarRoutes,
  },
  {
    path: "/bookings",
    route: BookingRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
