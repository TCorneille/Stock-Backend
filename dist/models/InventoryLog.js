"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryLog = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const InventoryLogSchema = new mongoose_1.default.Schema({
    productId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: "Product",
    },
    change: {
        type: Number,
        required: true,
    },
    reason: {
        type: String,
        required: true,
    },
}, { timestamps: true });
exports.InventoryLog = mongoose_1.default.model("InventoryLog", InventoryLogSchema);
