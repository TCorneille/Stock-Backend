import express, { Application, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import authRoutes from "./routes/authRoutes";
import reservationRoutes from "./routes/reservationRoutes";
import checkoutRoutes from "./routes/checkoutRoutes";
import productRoutes from "./routes/productRoutes";

import { logger } from "./config/logger";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import { getMetrics } from "./utils/metrics";

const app: Application = express();


// -----------------------------
// Security Middleware
// -----------------------------

app.use(helmet());

app.use(cors({
  origin: "*", // change in production
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));


// -----------------------------
// Rate Limiting
// -----------------------------

const limiter = rateLimit({

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

app.use(express.json());

app.use(express.urlencoded({
  extended: true
}));


// -----------------------------
// Request Logging Middleware
// -----------------------------

app.use((req: Request, res: Response, next) => {

  const start = Date.now();

  res.on("finish", () => {

    const duration = Date.now() - start;

    logger.info({
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

app.get("/health", async (req: Request, res: Response) => {

  res.status(200).json({

    status: "ok",

    uptime: process.uptime(),

    timestamp: new Date()

  });

});


// -----------------------------
// Metrics Endpoint
// -----------------------------

app.get("/metrics", async (req: Request, res: Response, next) => {

  try {

    const metrics = await getMetrics();

    res.json({

      status: "ok",

      metrics

    });

  } catch (error) {

    next(error);

  }

});


// -----------------------------
// Routes
// -----------------------------

app.use("/auth", authRoutes);

app.use("/products", productRoutes);

app.use("/reservations", reservationRoutes);

app.use("/orders", checkoutRoutes);


// -----------------------------
// 404 Handler
// -----------------------------

app.use((req: Request, res: Response) => {

  res.status(404).json({

    error: "Route not found"

  });

});


// -----------------------------
// Global Error Handler
// -----------------------------

app.use(errorMiddleware);


// -----------------------------
// Export App
// -----------------------------

export default app;