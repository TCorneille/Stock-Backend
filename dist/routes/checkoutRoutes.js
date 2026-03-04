"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/orderRoutes.ts
const express_1 = require("express");
const checkoutController_1 = require("../controllers/checkoutController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
// Checkout a reservation
router.post("/checkout", authMiddleware_1.authenticate, checkoutController_1.CheckoutController.checkout);
// Get logged-in user's orders
router.get("/my-orders", authMiddleware_1.authenticate, checkoutController_1.CheckoutController.getUserOrders);
// Admin-only: get all orders
router.get("/all", authMiddleware_1.authenticate, checkoutController_1.CheckoutController.getAllOrders);
exports.default = router;
