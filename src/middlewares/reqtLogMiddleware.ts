import { NextFunction, Request, Response } from "express";

const requestLoggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
};

export default requestLoggerMiddleware;
