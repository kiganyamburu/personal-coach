import { Response, NextFunction } from "express";
import { verifyToken, extractTokenFromHeader } from "../config/jwt";
import { AuthRequest } from "../types";
import { createError } from "./errorHandler";

/**
 * JWT Authentication middleware
 */
export function authenticate(
  req: AuthRequest,
  _res: Response,
  next: NextFunction,
): void {
  try {
    const authHeader = req.headers.authorization;
    const token = extractTokenFromHeader(authHeader);

    if (!token) {
      throw createError("Authentication token required", 401);
    }

    const decoded = verifyToken(token);
    req.userId = decoded.userId;
    req.user = {
      id: decoded.userId,
      email: decoded.email,
      name: "", // Will be populated if needed from database
    };

    next();
  } catch (error) {
    if (error instanceof Error && (error as any).statusCode) {
      next(error);
    } else {
      next(createError("Invalid or expired token", 401));
    }
  }
}

/**
 * Optional authentication middleware (doesn't fail if no token)
 */
export function optionalAuthenticate(
  req: AuthRequest,
  _res: Response,
  next: NextFunction,
): void {
  try {
    const authHeader = req.headers.authorization;
    const token = extractTokenFromHeader(authHeader);

    if (token) {
      const decoded = verifyToken(token);
      req.userId = decoded.userId;
      req.user = {
        id: decoded.userId,
        email: decoded.email,
        name: "",
      };
    }
  } catch (error) {
    // Silently fail for optional auth
  }
  next();
}

