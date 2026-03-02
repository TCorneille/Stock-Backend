import mongoose from "mongoose";
import { Product } from "../models/Product";
import { Reservation } from "../models/Reservation";
import { InventoryLog } from "../models/InventoryLog";

export async function reserveProduct(
  userId: string,
  productId: string,
  quantity: number
) {

  const session = await mongoose.startSession();

  session.startTransaction();

  try {

    const product =
      await Product.findOneAndUpdate(

        {
          _id: productId,

          $expr: {
            $gte: [
              { $subtract: ["$stock", "$reservedStock"] },
              quantity
            ]
          }
        },

        {
          $inc: {
            reservedStock: quantity
          }
        },

        { session, new: true }
      );

    if (!product)
      throw new Error("Out of stock");

    const reservation =
      await Reservation.create([{

        userId,
        productId,
        quantity,

        expiresAt:
          new Date(Date.now() + 5 * 60 * 1000)

      }], { session });

    await InventoryLog.create([{

      productId,
      change: -quantity,
      reason: "RESERVED"

    }], { session });

    await session.commitTransaction();

    return reservation[0];

  } catch (error) {

    await session.abortTransaction();
    throw error;

  } finally {

    session.endSession();

  }

}