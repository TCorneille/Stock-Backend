import { Router } from "express";
import { ReservationController }
  from "../controllers/reservationController";

import { authMiddleware }
  from "../middleware/authMiddleware";

const router = Router();

router.post(
  "/reserve",
  authMiddleware,
  ReservationController.reserve
);

router.get(
  "/my-reservations",
  authMiddleware,
  ReservationController.getUserReservations
);

export default router;