// src/@types/express/index.d.ts
import { UserDocument } from "../../modules/user/user.model";

declare global {
  namespace Express {
    interface Request {
      user?: UserDocument;
    }
  }
}
