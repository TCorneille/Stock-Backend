// src/services/reservationService.ts
import { Reservation } from "../models/Reservation";
import { Product } from "../models/Product";

export async function reserveProduct(
  userId: string,
  productId: string,
  quantity: number
) {
  // Find product
  const product = await Product.findById(productId);
  if (!product) throw new Error("Product not found");

  if (product.stock - product.reservedStock < quantity) {
    throw new Error("Not enough stock available");
  }

  // Increment reserved stock
  product.reservedStock += quantity;
  await product.save(); // save immediately

  // Create reservation
  const reservation = await Reservation.create({
    userId,
    productId,
    quantity,
    expiresAt: new Date(Date.now() + 15 * 60 * 1000), // e.g., 15 min expiry
  });

  return reservation;
}