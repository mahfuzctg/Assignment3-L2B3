import express from "express";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "./user.constant";

const router = express.Router();
// user routes
router.get("/", auth(USER_ROLE.user));

export const UserRoutes = router;
