"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkout = checkout;
// src/services/checkoutService.ts
const Order_1 = require("../models/Order");
const Reservation_1 = require("../models/Reservation");
const Product_1 = require("../models/Product");
async function checkout(reservationId, userId) {
    // Find reservation
    const reservation = await Reservation_1.Reservation.findById(reservationId);
    if (!reservation)
        throw new Error("Reservation not found");
    if (reservation.userId.toString() !== userId) {
        throw new Error("Unauthorized checkout");
    }
    // Find product
    const product = await Product_1.Product.findById(reservation.productId);
    if (!product)
        throw new Error("Product not found");
    // Deduct stock
    if (product.stock < reservation.quantity) {
        throw new Error("Not enough stock for checkout");
    }
    product.stock -= reservation.quantity;
    product.reservedStock -= reservation.quantity;
    await product.save();
    // Create order
    const order = await Order_1.Order.create({
        userId,
        reservationId: reservation._id,
        quantity: reservation.quantity,
    });
    // Delete reservation after checkout (optional)
    await Reservation_1.Reservation.findByIdAndDelete(reservation._id);
    return order;
}
