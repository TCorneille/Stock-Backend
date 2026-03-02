import cron from "node-cron";
import { Reservation } from "../models/Reservation";
import { Product } from "../models/Product";

cron.schedule("* * * * *", async () => {

  const expired =
    await Reservation.find({

      status: "ACTIVE",

      expiresAt: {
        $lt: new Date()
      }

    });

  for (const reservation of expired) {

    await Product.updateOne(
      { _id: reservation.productId },
      {
        $inc: {
          reservedStock: -reservation.quantity
        }
      }
    );

    reservation.status = "EXPIRED";

    await reservation.save();

  }

});