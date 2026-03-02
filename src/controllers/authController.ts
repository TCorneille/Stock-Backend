import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/User";
import { generateToken } from "../utils/jwt";

export class AuthController {

  static async register(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {

      const { email, password } = req.body;

      const existing = await User.findOne({ email });

      if (existing)
        return res.status(400).json({
          message: "User already exists"
        });

      const passwordHash =
        await bcrypt.hash(password, 10);

      const user = await User.create({
        email,
        passwordHash
      });

      const token =
        generateToken(user._id.toString());

      res.status(201).json({
        userId: user._id,
        token
      });

    } catch (error) {
      next(error);
    }
  }

  static async login(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {

      const { email, password } = req.body;

      const user =
        await User.findOne({ email });

      if (!user)
        return res.status(404).json({
          message: "User not found"
        });

      const valid =
        await bcrypt.compare(
          password,
          user.passwordHash
        );

      if (!valid)
        return res.status(401).json({
          message: "Invalid credentials"
        });

      const token =
        generateToken(user._id.toString());

      res.json({
        token
      });

    } catch (error) {
      next(error);
    }
  }

}