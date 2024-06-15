// authMiddleware.ts

import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config";

const JWT_SECRET = config.jwt_secret;

interface JwtPayload {
  id: string;
  role: "user" | "admin";
}

export const protect = (req: Request, res: Response, next: NextFunction) => {
  // 1. Check if the Authorization header exists
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized - Missing or invalid token",
    });
  }

  // 2. Extract the token from the Authorization header
  const token = authHeader.split(" ")[1];

  // 3. Verify the token
  jwt.verify(token, JWT_SECRET!, (err, decoded: JwtPayload | undefined) => {
    if (err) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - Invalid token",
      });
    }

    // Attach the decoded payload to the request object
    req.user = decoded!;
    next();
  });
};

export const restrictTo = (...roles: ("user" | "admin")[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Check if the current user's role is included in the roles array
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message:
          "Forbidden - You do not have permission to access this resource",
      });
    }
    next();
  };
};
