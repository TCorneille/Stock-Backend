"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = errorMiddleware;
const logger_1 = require("../config/logger");
function errorMiddleware(err, req, res, next) {
    logger_1.logger.error({
        message: err.message,
        stack: err.stack,
        path: req.originalUrl
    });
    res.status(err.status || 500).json({
        error: err.message || "Internal server error"
    });
}
