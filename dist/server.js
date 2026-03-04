"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const db_1 = require("./config/db");
const env_1 = require("./config/env");
const logger_1 = require("./config/logger");
require("./jobs/expireReservations");
async function startServer() {
    try {
        await (0, db_1.connectDB)(); // now uses env.MONGO_URI
        logger_1.logger.info("Database connected successfully");
        const server = app_1.default.listen(env_1.env.PORT, () => {
            logger_1.logger.info(`Server running on port ${env_1.env.PORT}`);
        });
        // graceful shutdown
        ["SIGINT", "SIGTERM"].forEach(sig => {
            process.on(sig, () => {
                logger_1.logger.warn(`${sig} received. Shutting down...`);
                server.close(() => process.exit(0));
            });
        });
    }
    catch (error) {
        logger_1.logger.error({ err: error }, "Startup error");
        process.exit(1);
    }
}
startServer();
