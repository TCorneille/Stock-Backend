// src/routes/reservationRoutes.ts
import { Router } from "express";
import { ReservationController } from "../controllers/reservationController";
import { authenticate, authorize } from "../middlewares/authMiddleware";

const router = Router();

// 🔹 Users can create a reservation (authenticated only)
router.post("/reserve", authenticate, ReservationController.reserve);

// 🔹 Users can view their own reservations
router.get("/my-reservations", authenticate, ReservationController.getUserReservations);

// 🔹 Admin can view all reservations
router.get("/all", authenticate, authorize("ADMIN"), ReservationController.getAllReservations);

export default router;