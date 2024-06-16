import { Router } from "express";
import { AuthRoutes } from "../Modules/auth/auth.route";
import carRoutes from "../Modules/car/car.route";
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
    route: carRoutes,
  },

  // {
  //   path: "/bookings",
  //   route: BookingsRoutes,
  // },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
