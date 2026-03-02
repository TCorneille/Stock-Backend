import { Request, Response, NextFunction } from "express";
import { checkout } from "../services/checkoutService";

export class CheckoutController {

  static async checkout(
    req: any,
    res: Response,
    next: NextFunction
  ) {
    try {

      const { reservationId } = req.body;

      const order =
        await checkout(
          reservationId,
          req.user.userId
        );

      res.json({

        message: "Checkout successful",

        order

      });

    } catch (error) {
      next(error);
    }
  }

}