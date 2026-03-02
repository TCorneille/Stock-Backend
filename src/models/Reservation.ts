import mongoose from "mongoose";

const ReservationSchema = new mongoose.Schema({

  userId: mongoose.Types.ObjectId,

  productId: mongoose.Types.ObjectId,

  quantity: Number,

  status: {
    type: String,
    enum: ["ACTIVE", "COMPLETED", "EXPIRED"],
    default: "ACTIVE"
  },

  expiresAt: Date

}, { timestamps: true });

export const Reservation =
  mongoose.model("Reservation", ReservationSchema);