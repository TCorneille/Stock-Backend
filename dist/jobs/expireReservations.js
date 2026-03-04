"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cron_1 = __importDefault(require("node-cron"));
const Reservation_1 = require("../models/Reservation");
const Product_1 = require("../models/Product");
node_cron_1.default.schedule("* * * * *", async () => {
    const expired = await Reservation_1.Reservation.find({
        status: "ACTIVE",
        expiresAt: {
            $lt: new Date()
        }
    });
    for (const reservation of expired) {
        await Product_1.Product.updateOne({ _id: reservation.productId }, {
            $inc: {
                reservedStock: -reservation.quantity
            }
        });
        reservation.status = "EXPIRED";
        await reservation.save();
    }
});
