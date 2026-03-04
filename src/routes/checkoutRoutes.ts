// src/routes/orderRoutes.ts
import { Router } from "express";
import { CheckoutController } from "../controllers/checkoutController";
import { authenticate } from "../middlewares/authMiddleware";

const router = Router();

// Checkout a reservation
router.post("/checkout", authenticate, CheckoutController.checkout);

// Get logged-in user's orders
router.get("/my-orders", authenticate, CheckoutController.getUserOrders);

// Admin-only: get all orders
router.get("/all", authenticate, CheckoutController.getAllOrders);

export default router;