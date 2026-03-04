import mongoose from "mongoose";

const InventoryLogSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
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
  },
  { timestamps: true }
);

export const InventoryLog = mongoose.model(
  "InventoryLog",
  InventoryLogSchema
);