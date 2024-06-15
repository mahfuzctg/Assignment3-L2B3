import { Router } from "express";

const router = Router();

// POST /api/auth/signup - User sign up route
router.post("/signup", signup);

export default router;
