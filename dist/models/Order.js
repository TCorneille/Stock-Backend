"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const OrderSchema = new mongoose_1.default.Schema({
    userId: mongoose_1.default.Types.ObjectId,
    productId: mongoose_1.default.Types.ObjectId,
    reservationId: {
        type: mongoose_1.default.Types.ObjectId,
        unique: true
    },
    quantity: Number
}, { timestamps: true });
exports.Order = mongoose_1.default.model("Order", OrderSchema);
