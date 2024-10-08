import { NextFunction, Request, Response } from 'express';

import catchAsync from '../utils/catchAsync';

import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import AppError from '../errors/appError';
import { AuthError } from '../errors/authError';
import { USER_ROLES } from '../modules/user/user.constant';
import { User } from '../modules/user/user.model';

export const auth = (...requiredRoles: (keyof typeof USER_ROLES)[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req?.headers?.authorization?.split(' ')[1];
    if (!token) {
      return AuthError(req, res);
    }

    const decoded = jwt.verify(
      token,
      config.JWT_ACCESS_SECRET as string,
    ) as JwtPayload;

    if (!decoded) {
      return AuthError(req, res);
    }

    const { email, role } = decoded;

    const user = await User.findOne({ email });

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'User is not found !');
    }

    if (!requiredRoles.includes(role)) {
      return AuthError(req, res);
    }
    req.user = user;
    next();
  });
};
