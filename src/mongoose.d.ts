import { JwtPayload } from "jsonwebtoken";
import "mongoose";

declare module "mongoose" {
  interface ConnectOptions {
    useNewUrlParser?: boolean;
    useUnifiedTopology?: boolean;
  }
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}
