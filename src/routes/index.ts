// src/routes/index.ts
import { Router } from "express";
import { AuthRoutes } from "../Modules/auth/auth.route";

import { BookingRoutes } from "../Modules/booking/booking.route";
import { CarRoutes } from "../Modules/car/car.route";
import { UserRoutes } from "../Modules/user/user.route";

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
