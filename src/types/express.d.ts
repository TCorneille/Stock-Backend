import "express";
import { IUser } from "../../models/User"; // adjust path

declare module "express-serve-static-core" {
  interface Request {
    user?: IUser; // matches what you assign in middleware
  }
}

export {};