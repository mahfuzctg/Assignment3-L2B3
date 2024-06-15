import "mongoose";
import { IUser } from "./models/user.model";

// Augment the existing ConnectOptions interface to include useNewUrlParser and other options
declare module "mongoose" {
  interface ConnectOptions {
    useNewUrlParser?: boolean;
    useUnifiedTopology?: boolean;
    user?: IUser;
  }
}
