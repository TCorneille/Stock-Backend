import app from "./app";
import { connectDB } from "./config/db";
import { env } from "./config/env";
import { logger } from "./config/logger";
import "./jobs/expireReservations";

async function startServer() {
  try {
    await connectDB(); // now uses env.MONGO_URI
    logger.info("Database connected successfully");

    const server = app.listen(env.PORT, () => {
      logger.info(`Server running on port ${env.PORT}`);
    });

    // graceful shutdown
    ["SIGINT", "SIGTERM"].forEach(sig => {
      process.on(sig, () => {
        logger.warn(`${sig} received. Shutting down...`);
        server.close(() => process.exit(0));
      });
    });

  } catch (error: unknown) {
    logger.error({ err: error }, "Startup error");
    process.exit(1);
  }
}

startServer();