"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMetrics = getMetrics;
const Reservation_1 = require("../models/Reservation");
const Order_1 = require("../models/Order");
const Product_1 = require("../models/Product");
async function getMetrics() {
    const [activeReservations, completedOrders, totalProducts] = await Promise.all([
        Reservation_1.Reservation.countDocuments({
            status: "ACTIVE"
        }),
        Order_1.Order.countDocuments(),
        Product_1.Product.countDocuments()
    ]);
    return {
        activeReservations,
        completedOrders,
        totalProducts,
        timestamp: new Date()
    };
}
