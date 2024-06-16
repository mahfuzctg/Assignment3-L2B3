// src/middlewares/isAdmin.ts

import { NextFunction, Request, Response } from "express";
import { User } from "../Modules/user/user.model";
import AppError from "../errors/AppError";

const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Assuming you have stored the user role in the JWT payload during authentication
    const userId = req.user.userId; // Assuming userId is included in the decoded JWT payload

    // Fetch the user from the database
    const user = await User.findById(userId);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    // Check if the user is an admin
    if (user.role !== "admin") {
      throw new AppError("Only admins can access this resource", 403);
    }

    // If user is admin, pass control to the next middleware or route handler
    next();
  } catch (error) {
    next(error);
  }
};

export default isAdmin;
