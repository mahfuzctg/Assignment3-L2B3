import express from "express";
import validateRequest from "../../middlewares/validateRequest";

import { userControllers } from "../../modules/user/user.controller";
import { UserValidations } from "../../modules/user/user.validation";
import { AuthControllers } from "./auth.controller";
import { AuthValidation } from "./auth.validation";

export const router = express.Router();

router.post(
  "/login",
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.loginUser
);
router.post(
  "/signup",
  validateRequest(UserValidations.createUserValidationSchema),
  userControllers.createUser
);

export const AuthRoutes = router;
