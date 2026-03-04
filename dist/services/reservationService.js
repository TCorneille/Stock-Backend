"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reserveProduct = reserveProduct;
// src/services/reservationService.ts
const Reservation_1 = require("../models/Reservation");
const Product_1 = require("../models/Product");
async function reserveProduct(userId, productId, quantity) {
    // Find product
    const product = await Product_1.Product.findById(productId);
    if (!product)
        throw new Error("Product not found");
    if (product.stock - product.reservedStock < quantity) {
        throw new Error("Not enough stock available");
    }
    // Increment reserved stock
    product.reservedStock += quantity;
    await product.save(); // save immediately
    // Create reservation
    const reservation = await Reservation_1.Reservation.create({
        userId,
        productId,
        quantity,
        expiresAt: new Date(Date.now() + 15 * 60 * 1000), // e.g., 15 min expiry
    });
    return reservation;
}
