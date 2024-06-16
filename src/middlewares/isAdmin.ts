// isAdmin.ts
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

export const isAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const user = req.user; // Assuming user information is available in req.user
  if (user && user.role === "admin") {
    next(); // Allow access to next middleware or route handler
  } else {
    res.status(httpStatus.FORBIDDEN).json({
      success: false,
      message: "Unauthorized access",
    });
  }
};
