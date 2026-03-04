"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservationController = void 0;
const reservationService_1 = require("../services/reservationService");
const Reservation_1 = require("../models/Reservation");
class ReservationController {
    //  Create a reservation
    static async reserve(req, res, next) {
        try {
            if (!req.user)
                return res.status(401).json({ message: "Unauthorized" });
            const { productId, quantity } = req.body;
            const reservation = await (0, reservationService_1.reserveProduct)(req.user.userId, productId, quantity);
            res.status(201).json({
                message: "Reservation created",
                reservationId: reservation._id,
                expiresAt: reservation.expiresAt,
            });
        }
        catch (error) {
            next(error);
        }
    }
    //  Get reservations of the logged-in user
    static async getUserReservations(req, res, next) {
        try {
            if (!req.user)
                return res.status(401).json({ message: "Unauthorized" });
            const reservations = await Reservation_1.Reservation.find({ userId: req.user.userId })
                .sort({ createdAt: -1 })
                .populate("productId", "name price stock"); // optional: show product info
            res.json(reservations);
        }
        catch (error) {
            next(error);
        }
    }
    //  Get all reservations (admin only)
    static async getAllReservations(req, res, next) {
        try {
            if (!req.user || req.user.role !== "ADMIN") {
                return res.status(403).json({ message: "Forbidden" });
            }
            const reservations = await Reservation_1.Reservation.find()
                .sort({ createdAt: -1 })
                .populate("productId", "name price stock")
                .populate("userId", "email role"); // show user info
            res.json(reservations);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.ReservationController = ReservationController;
