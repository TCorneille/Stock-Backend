import { Reservation } from "../models/Reservation";
import { Order } from "../models/Order";
import { Product } from "../models/Product";

export async function getMetrics() {

  const [

    activeReservations,

    completedOrders,

    totalProducts

  ] = await Promise.all([

    Reservation.countDocuments({
      status: "ACTIVE"
    }),

    Order.countDocuments(),

    Product.countDocuments()

  ]);

  return {

    activeReservations,

    completedOrders,

    totalProducts,

    timestamp: new Date()

  };

}