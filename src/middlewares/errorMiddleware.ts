import { Request, Response, NextFunction } from "express";
import { logger } from "../config/logger";

export function errorMiddleware(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {

  logger.error({

    message: err.message,

    stack: err.stack,

    path: req.originalUrl

  });

  res.status(err.status || 500).json({

    error: err.message || "Internal server error"

  });

}