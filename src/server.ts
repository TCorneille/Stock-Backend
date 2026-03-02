import app from "./app";
import { connectDB } from "./config/db";
import { env } from "./config/env";
import "./jobs/expireReservations";
import { logger } from "./config/logger";

async function startServer() {

  try {

    await connectDB();

    app.listen(env.PORT, () => {

      logger.info(
        `Server running on port ${env.PORT}`
      );

    });

  } catch (error) {

    logger.error("Startup error:", error);

    process.exit(1);

  }

}

startServer();