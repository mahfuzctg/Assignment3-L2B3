import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { TUserRole } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";
import catchAsync from "../utils/catchAsync";

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    // checking if the token is missing
    if (!token) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        statusCode: httpStatus.UNAUTHORIZED,
        message: "You have no access to this route",
      });
    }

    try {
      // checking if the given token is valid
      const decoded = jwt.verify(
        token,
        config.jwt_access_secret as string
      ) as JwtPayload;
      const { role, email } = decoded as { role: TUserRole; email: string };

      // checking if the user exists
      const user = await User.isUserExistsByEmail(email);

      if (!user) {
        return res.status(httpStatus.UNAUTHORIZED).json({
          success: false,
          statusCode: httpStatus.UNAUTHORIZED,
          message: "You have no access to this route",
        });
      }

      // logging for debugging
      console.log("Required Roles:", requiredRoles);
      console.log("User Role:", role);

      // checking if the user's role is allowed
      if (requiredRoles.length && !requiredRoles.includes(role)) {
        return res.status(httpStatus.FORBIDDEN).json({
          success: false,
          statusCode: httpStatus.FORBIDDEN,
          message: "You do not have permission to access this route",
        });
      }

      req.user = decoded as JwtPayload;
      next();
    } catch (error) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        statusCode: httpStatus.UNAUTHORIZED,
        message: "Invalid token",
      });
    }
  });
};

export default auth;
