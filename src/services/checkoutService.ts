import { Order } from "../models/Order";
import { Reservation } from "../models/Reservation";
import { Product } from "../models/Product";

export async function checkout(
  reservationId: string,
  userId: string
) {

  const session =
    await mongoose.startSession();

  session.startTransaction();

  const reservation =
    await Reservation.findById(reservationId)
      .session(session);

  if (!reservation)
    throw new Error("Not found");

  if (reservation.status !== "ACTIVE")
    throw new Error("Invalid");

  await Product.updateOne(
    { _id: reservation.productId },
    {
      $inc: {
        stock: -reservation.quantity,
        reservedStock: -reservation.quantity
      }
    },
    { session }
  );

  const order =
    await Order.create([{

      userId,
      productId: reservation.productId,
      reservationId,
      quantity: reservation.quantity

    }], { session });

  reservation.status = "COMPLETED";

  await reservation.save({ session });

  await session.commitTransaction();

  return order;

}