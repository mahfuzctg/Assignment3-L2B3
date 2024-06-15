import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { IUser } from "../models/user.model";

interface DecodedToken extends JwtPayload {
  id: string;
  role: string;
}

declare module "express-serve-static-core" {
  interface Request {
    user?: IUser;
  }
}

export const protect = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized - Missing or invalid token",
    });
  }

  const token = authHeader.split(" ")[1];
  const JWT_SECRET = config.jwt_secret;

  if (!JWT_SECRET) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error - Missing JWT secret",
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;
    req.user = {
      _id: decoded.id,
      role: decoded.role,
    } as IUser;
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(401).json({
      success: false,
      message: "Unauthorized - Missing or invalid token",
    });
  }
};

export const restrictTo = (role: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.user && req.user.role === role) {
      next();
    } else {
      return res.status(403).json({
        success: false,
        message:
          "Forbidden - You do not have permission to access this resource",
      });
    }
  };
};
