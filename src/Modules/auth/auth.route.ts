import express from "express";

import validateRequest from "../../middlewares/validatationRequest";
import { userControllers } from "../user/user.controller";
import { UserValidations } from "../user/user.validation";
import { AuthControllers } from "./auth.controller";
import { AuthValidation } from "./auth.validation";

const router = express.Router();

router.post(
  "/signin",
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.loginUser
);
router.post(
  "/signup",
  validateRequest(UserValidations.createUserValidationSchema),
  userControllers.createUser
);

export const AuthRoutes = router;
