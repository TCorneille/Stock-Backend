"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const reservationRoutes_1 = __importDefault(require("./routes/reservationRoutes"));
const checkoutRoutes_1 = __importDefault(require("./routes/checkoutRoutes"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const logger_1 = require("./config/logger");
const errorMiddleware_1 = require("./middlewares/errorMiddleware");
const metrics_1 = require("./utils/metrics");
const app = (0, express_1.default)();
// -----------------------------
// Security Middleware
// -----------------------------
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: "*", // change in production
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
// -----------------------------
// Rate Limiting
// -----------------------------
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 60 * 1000, // 1 minute
    max: 100, // limit each IP
    message: {
        error: "Too many requests"
    }
});
app.use(limiter);
// -----------------------------
// Body Parser
// -----------------------------
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({
    extended: true
}));
// -----------------------------
// Request Logging Middleware
// -----------------------------
app.use((req, res, next) => {
    const start = Date.now();
    res.on("finish", () => {
        const duration = Date.now() - start;
        logger_1.logger.info({
            method: req.method,
            url: req.originalUrl,
            status: res.statusCode,
            duration: `${duration}ms`,
            ip: req.ip
        });
    });
    next();
});
// -----------------------------
// Health Check Endpoint
// -----------------------------
app.get("/health", async (req, res) => {
    res.status(200).json({
        status: "ok",
        uptime: process.uptime(),
        timestamp: new Date()
    });
});
// -----------------------------
// Metrics Endpoint
// -----------------------------
app.get("/metrics", async (req, res, next) => {
    try {
        const metrics = await (0, metrics_1.getMetrics)();
        res.json({
            status: "ok",
            metrics
        });
    }
    catch (error) {
        next(error);
    }
});
// -----------------------------
// Routes
// -----------------------------
app.use("/auth", authRoutes_1.default);
app.use("/products", productRoutes_1.default);
app.use("/reservations", reservationRoutes_1.default);
app.use("/orders", checkoutRoutes_1.default);
// -----------------------------
// 404 Handler
// -----------------------------
app.use((req, res) => {
    res.status(404).json({
        error: "Route not found"
    });
});
// -----------------------------
// Global Error Handler
// -----------------------------
app.use(errorMiddleware_1.errorMiddleware);
// -----------------------------
// Export App
// -----------------------------
exports.default = app;
