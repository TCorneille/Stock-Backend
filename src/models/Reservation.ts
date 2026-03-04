import mongoose, { Document, Schema } from "mongoose";

export type ReservationStatus = "ACTIVE" | "COMPLETED" | "EXPIRED";

export interface IReservation extends Document {
  userId: mongoose.Types.ObjectId;
  productId: mongoose.Types.ObjectId;
  quantity: number;
  status: ReservationStatus;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ReservationSchema = new Schema<IReservation>(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    productId: { type: Schema.Types.ObjectId, required: true, ref: "Product" },
    quantity: { type: Number, required: true },
    status: {
      type: String,
      enum: ["ACTIVE", "COMPLETED", "EXPIRED"],
      default: "ACTIVE",
    },
    expiresAt: { type: Date, required: true },
  },
  { timestamps: true }
);

export const Reservation = mongoose.model<IReservation>(
  "Reservation",
  ReservationSchema
);