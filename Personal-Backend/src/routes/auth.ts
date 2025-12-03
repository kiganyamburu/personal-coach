import { Router, Response } from "express";
import { User } from "../models/User";
import { generateToken } from "../config/jwt";
import { validateEmail, validatePassword } from "../utils/validators";
import { createError, asyncHandler } from "../middleware/errorHandler";
import { authenticate } from "../middleware/auth";
import { AuthRequest } from "../types";

const router = Router();

/**
 * POST /api/auth/register
 * Register a new user
 */
router.post(
  "/register",
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const { email, password, name } = req.body;

    // Validation
    if (!email || !password || !name) {
      throw createError("Email, password, and name are required", 400);
    }

    if (!validateEmail(email)) {
      throw createError("Invalid email format", 400);
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      throw createError(passwordValidation.message || "Invalid password", 400);
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      throw createError("User with this email already exists", 409);
    }

    // Create new user
    const user = new User({
      email: email.toLowerCase(),
      password,
      name: name.trim(),
    });

    await user.save();

    // Generate token
    const token = generateToken({
      userId: user._id.toString(),
      email: user.email,
    });

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
      },
    });
  })
);

/**
 * POST /api/auth/login
 * Login user and return JWT token
 */
router.post(
  "/login",
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      throw createError("Email and password are required", 400);
    }

    // Find user
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      throw createError("Invalid email or password", 401);
    }

    // Verify password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw createError("Invalid email or password", 401);
    }

    // Generate token
    const token = generateToken({
      userId: user._id.toString(),
      email: user.email,
    });

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
      },
    });
  })
);

/**
 * GET /api/auth/me
 * Get current authenticated user
 */
router.get(
  "/me",
  authenticate,
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      throw createError("User not found", 404);
    }

    res.json({
      user: {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
      },
    });
  })
);

export default router;

