import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({

  userId: mongoose.Types.ObjectId,

  productId: mongoose.Types.ObjectId,

  reservationId: {
    type: mongoose.Types.ObjectId,
    unique: true
  },

  quantity: Number

}, { timestamps: true });

export const Order =
  mongoose.model("Order", OrderSchema);