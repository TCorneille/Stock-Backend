import { Request, Response, NextFunction } from "express";
import { reserveProduct } from "../services/reservationService";

export class ReservationController {

  static async reserve(
    req: any,
    res: Response,
    next: NextFunction
  ) {
    try {

      const { productId, quantity } = req.body;

      const reservation =
        await reserveProduct(
          req.user.userId,
          productId,
          quantity
        );

      res.status(201).json({

        message: "Reservation created",

        reservationId: reservation._id,

        expiresAt: reservation.expiresAt

      });

    } catch (error) {
      next(error);
    }
  }

  static async getUserReservations(
    req: any,
    res: Response,
    next: NextFunction
  ) {
    try {

      const reservations =
        await Reservation.find({
          userId: req.user.userId
        })
        .sort({ createdAt: -1 });

      res.json(reservations);

    } catch (error) {
      next(error);
    }
  }

}