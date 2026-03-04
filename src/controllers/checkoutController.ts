// src/controllers/checkoutController.ts
import { Request, Response, NextFunction } from "express";
import { checkout } from "../services/checkoutService";
import { Order } from "../models/Order";

interface AuthRequest extends Request {
  user?: { userId: string; role: string };
}

export class CheckoutController {

  // ✅ Checkout a reservation
  static async checkout(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) return res.status(401).json({ message: "Unauthorized" });

      const { reservationId } = req.body;
      const order = await checkout(reservationId, req.user.userId);

      res.json({
        message: "Checkout successful",
        order,
      });
    } catch (error) {
      next(error);
    }
  }

  // ✅ Get orders of logged-in user
  static async getUserOrders(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) return res.status(401).json({ message: "Unauthorized" });

      const orders = await Order.find({ userId: req.user.userId })
        .sort({ createdAt: -1 })
        .populate("reservationId"); // optional: show reservation details

      res.json(orders);
    } catch (error) {
      next(error);
    }
  }

  // ✅ Get all orders (admin only)
  static async getAllOrders(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user || req.user.role !== "ADMIN") {
        return res.status(403).json({ message: "Forbidden" });
      }

      const orders = await Order.find()
        .sort({ createdAt: -1 })
        .populate("userId", "email role")
        .populate("reservationId");

      res.json(orders);
    } catch (error) {
      next(error);
    }
  }
}