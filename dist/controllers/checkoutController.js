"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckoutController = void 0;
const checkoutService_1 = require("../services/checkoutService");
const Order_1 = require("../models/Order");
class CheckoutController {
    // ✅ Checkout a reservation
    static async checkout(req, res, next) {
        try {
            if (!req.user)
                return res.status(401).json({ message: "Unauthorized" });
            const { reservationId } = req.body;
            const order = await (0, checkoutService_1.checkout)(reservationId, req.user.userId);
            res.json({
                message: "Checkout successful",
                order,
            });
        }
        catch (error) {
            next(error);
        }
    }
    // ✅ Get orders of logged-in user
    static async getUserOrders(req, res, next) {
        try {
            if (!req.user)
                return res.status(401).json({ message: "Unauthorized" });
            const orders = await Order_1.Order.find({ userId: req.user.userId })
                .sort({ createdAt: -1 })
                .populate("reservationId"); // optional: show reservation details
            res.json(orders);
        }
        catch (error) {
            next(error);
        }
    }
    // ✅ Get all orders (admin only)
    static async getAllOrders(req, res, next) {
        try {
            if (!req.user || req.user.role !== "ADMIN") {
                return res.status(403).json({ message: "Forbidden" });
            }
            const orders = await Order_1.Order.find()
                .sort({ createdAt: -1 })
                .populate("userId", "email role")
                .populate("reservationId");
            res.json(orders);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.CheckoutController = CheckoutController;
