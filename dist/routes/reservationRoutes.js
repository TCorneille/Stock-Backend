"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/reservationRoutes.ts
const express_1 = require("express");
const reservationController_1 = require("../controllers/reservationController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
// 🔹 Users can create a reservation (authenticated only)
router.post("/reserve", authMiddleware_1.authenticate, reservationController_1.ReservationController.reserve);
// 🔹 Users can view their own reservations
router.get("/my-reservations", authMiddleware_1.authenticate, reservationController_1.ReservationController.getUserReservations);
// 🔹 Admin can view all reservations
router.get("/all", authMiddleware_1.authenticate, (0, authMiddleware_1.authorize)("ADMIN"), reservationController_1.ReservationController.getAllReservations);
exports.default = router;
