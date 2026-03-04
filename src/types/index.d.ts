import { IUser } from "../../models/User";

declare global {
  namespace Express {
    interface Request {
      user?: IUser; // optional user injected by auth middleware
    }
  }
}