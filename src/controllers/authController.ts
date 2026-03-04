// src/controllers/authController.ts
import { Request, Response, NextFunction } from "express";
import { User } from "../models/User";
import { generateToken } from "../utils/jwt";

export class AuthController {
  //
  // REGISTER
  //
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, role } = req.body;

      // Check if user exists
      const existing = await User.findOne({ email });
      if (existing) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Create user (password hashing handled by User model)
      const user = await User.create({
        email,
        password,
        role, // optional: will default to 'user' if not provided
      });
      console.log("Registered user:", user);

      // Generate JWT with userId and role
      const token = generateToken(user._id.toString(), user.role);

      res.status(201).json({
        userId: user._id,
        role: user.role,
        token,
      });
    } catch (error) {
      next(error);
    }
  }

  //
  // LOGIN
  //
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      // Find user and explicitly select password
      const user = await User.findOne({ email }).select("+password");
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Compare password
      const isValid = await user.comparePassword(password);
      if (!isValid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Generate JWT with userId and role
      const token = generateToken(user._id.toString(), user.role);

      res.json({
        userId: user._id,
        role: user.role,
        token,
      });
    } catch (error) {
      next(error);
    }
  }
}