import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export function model<T, U>(arg0: string, userSchema: any) {
  throw new Error("Function not implemented.");
}

export function connect(arg0: string) {
  throw new Error("Function not implemented.");
}
