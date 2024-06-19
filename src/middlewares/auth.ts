// src/middlewares/auth.ts
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { User } from "../Modules/user/user.model";
import config from "../config";

const authMiddleware = (...requiredRoles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;
      const token = authHeader && authHeader.split(" ")[1];

      if (!token) {
        return res.status(httpStatus.UNAUTHORIZED).json({
          success: false,
          message: "No token provided",
        });
      }

      const decoded = jwt.verify(
        token,
        config.jwt_access_secret as Secret
      ) as JwtPayload;

      const user = await User.findById(decoded._id);
      if (!user) {
        return res.status(httpStatus.UNAUTHORIZED).json({
          success: false,
          message: "User not found",
        });
      }

      if (requiredRoles.length && !requiredRoles.includes(user.role)) {
        return res.status(httpStatus.FORBIDDEN).json({
          success: false,
          message: "Insufficient role",
        });
      }

      req.user = user;
      next();
    } catch (error) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        message: "Unauthorized",
      });
    }
  };
};

export default authMiddleware;
