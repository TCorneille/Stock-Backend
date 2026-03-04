// src/services/checkoutService.ts
import { Order } from "../models/Order";
import { Reservation } from "../models/Reservation";
import { Product } from "../models/Product";

export async function checkout(reservationId: string, userId: string) {
  // Find reservation
  const reservation = await Reservation.findById(reservationId);
  if (!reservation) throw new Error("Reservation not found");
  if (reservation.userId.toString() !== userId) {
    throw new Error("Unauthorized checkout");
  }

  // Find product
  const product = await Product.findById(reservation.productId);
  if (!product) throw new Error("Product not found");

  // Deduct stock
  if (product.stock < reservation.quantity) {
    throw new Error("Not enough stock for checkout");
  }
  product.stock -= reservation.quantity;
  product.reservedStock -= reservation.quantity;
  await product.save();

  // Create order
  const order = await Order.create({
    userId,
    reservationId: reservation._id,
    quantity: reservation.quantity,
  });

  // Delete reservation after checkout (optional)
  await Reservation.findByIdAndDelete(reservation._id);

  return order;
}