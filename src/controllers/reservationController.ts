// src/controllers/reservationController.ts
import { Request, Response, NextFunction } from "express";
import { reserveProduct } from "../services/reservationService";
import { Reservation } from "../models/Reservation";

interface AuthRequest extends Request {
  user?: { userId: string; role: string };
}

export class ReservationController {

  //  Create a reservation
  static async reserve(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) return res.status(401).json({ message: "Unauthorized" });

      const { productId, quantity } = req.body;
      const reservation = await reserveProduct(req.user.userId, productId, quantity);

      res.status(201).json({
        message: "Reservation created",
        reservationId: reservation._id,
        expiresAt: reservation.expiresAt,
      });
    } catch (error) {
      next(error);
    }
  }

  //  Get reservations of the logged-in user
  static async getUserReservations(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) return res.status(401).json({ message: "Unauthorized" });

      const reservations = await Reservation.find({ userId: req.user.userId })
        .sort({ createdAt: -1 })
        .populate("productId", "name price stock"); // optional: show product info

      res.json(reservations);
    } catch (error) {
      next(error);
    }
  }

  //  Get all reservations (admin only)
  static async getAllReservations(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user || req.user.role !== "ADMIN") {
        return res.status(403).json({ message: "Forbidden" });
      }

      const reservations = await Reservation.find()
        .sort({ createdAt: -1 })
        .populate("productId", "name price stock")
        .populate("userId", "email role"); // show user info

      res.json(reservations);
    } catch (error) {
      next(error);
    }
  }
}