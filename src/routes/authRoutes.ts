import { Router } from "express";
import { signin, signup } from "../controllers/authController";

const router = Router();

// POST /api/auth/signup - User sign up route
router.post("/signup", signup);
router.post("/signin", signin);

export default router;
