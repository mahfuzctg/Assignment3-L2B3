import { Router } from "express";

import validateRequest from "../../middlewares/validateRequest";
import { UserValidations } from "../user/user.validation";
import { AuthController } from "./auth.controller";
import { AuthValidations } from "./auth.validation";

const router = Router();

router.post(
  "/signup",
  validateRequest(UserValidations.createUserValidationSchema),
  AuthController.register
);

router.post(
  "/signin",
  validateRequest(AuthValidations.signInUserValidationSchema),
  AuthController.signin
);

export const AuthRoutes = router;
