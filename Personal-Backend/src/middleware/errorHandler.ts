import { Request, Response, NextFunction } from "express";

export interface AppError extends Error {
  statusCode?: number;
  details?: string;
}

/**
 * Error handling middleware
 */
export function errorHandler(
  err: AppError | Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  const statusCode = (err as AppError).statusCode || 500;
  const message = err.message || "Internal server error";
  const details = (err as AppError).details;

  console.error("Error:", {
    message,
    statusCode,
    details,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });

  res.status(statusCode).json({
    error: message,
    details: details || (process.env.NODE_ENV === "development" ? err.stack : undefined),
  });
}

/**
 * Create custom error
 */
export function createError(
  message: string,
  statusCode: number = 500,
  details?: string
): AppError {
  const error = new Error(message) as AppError;
  error.statusCode = statusCode;
  error.details = details;
  return error;
}

/**
 * Async error wrapper
 */
export function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

