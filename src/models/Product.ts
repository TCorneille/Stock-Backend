import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({

  name: String,

  stock: Number,

  reservedStock: {
    type: Number,
    default: 0
  }

}, { timestamps: true });

export const Product =
  mongoose.model("Product", ProductSchema);