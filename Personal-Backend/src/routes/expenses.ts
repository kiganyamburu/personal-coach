import { Router, Response } from "express";
import { Expense } from "../models/Expense";
import { validateAmount, validateCategory, validateDate } from "../utils/validators";
import { createError, asyncHandler } from "../middleware/errorHandler";
import { AuthRequest, ExpenseSummary, ExpenseCategory } from "../types";

const router = Router();

/**
 * POST /api/expenses
 * Log a new expense
 */
router.post(
  "/",
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const { userId, amount, category, description, date } = req.body;

    // Use authenticated userId if available, otherwise use provided userId
    const expenseUserId = req.userId || userId;

    if (!expenseUserId) {
      throw createError("userId is required", 400);
    }

    if (!amount || !category) {
      throw createError("amount and category are required", 400);
    }

    // Validation
    const amountValidation = validateAmount(amount);
    if (!amountValidation.valid) {
      throw createError(amountValidation.message || "Invalid amount", 400);
    }

    const categoryValidation = validateCategory(category);
    if (!categoryValidation.valid) {
      throw createError(categoryValidation.message || "Invalid category", 400);
    }

    const expenseDate = date || new Date().toISOString();
    const dateValidation = validateDate(expenseDate);
    if (!dateValidation.valid) {
      throw createError(dateValidation.message || "Invalid date", 400);
    }

    // Create expense
    const expense = new Expense({
      userId: expenseUserId,
      amount: Number(amount),
      category: category.trim(),
      description: description?.trim() || "",
      date: expenseDate,
    });

    await expense.save();

    res.status(201).json({
      id: expense._id.toString(),
      userId: expense.userId,
      amount: expense.amount,
      category: expense.category,
      description: expense.description,
      date: expense.date,
      createdAt: expense.createdAt.toISOString(),
      message: "Expense logged successfully",
    });
  })
);

/**
 * GET /api/expenses
 * Get expenses for a user with optional filters
 */
router.get(
  "/",
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const { userId, startDate, endDate, category } = req.query;

    // Use authenticated userId if available, otherwise use provided userId
    const expenseUserId = req.userId || userId;

    if (!expenseUserId) {
      throw createError("userId is required", 400);
    }

    // Build query
    const query: any = { userId: expenseUserId };

    if (category) {
      query.category = category;
    }

    if (startDate || endDate) {
      query.date = {};
      if (startDate) {
        query.date.$gte = startDate;
      }
      if (endDate) {
        query.date.$lte = endDate;
      }
    }

    // Execute query
    const expenses = await Expense.find(query)
      .sort({ date: -1 })
      .lean();

    const formattedExpenses = expenses.map((exp) => ({
      id: exp._id.toString(),
      userId: exp.userId,
      amount: exp.amount,
      category: exp.category,
      description: exp.description,
      date: exp.date,
      createdAt: exp.createdAt.toISOString(),
    }));

    res.json({
      expenses: formattedExpenses,
      total: formattedExpenses.length,
    });
  })
);

/**
 * GET /api/expenses/summary/:userId
 * Get expense summary for a user
 */
router.get(
  "/summary/:userId",
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const { userId } = req.params;
    const { startDate, endDate } = req.query;

    if (!userId) {
      throw createError("userId is required", 400);
    }

    // Build query
    const query: any = { userId };

    if (startDate || endDate) {
      query.date = {};
      if (startDate) {
        query.date.$gte = startDate;
      }
      if (endDate) {
        query.date.$lte = endDate;
      }
    }

    // Get expenses
    const expenses = await Expense.find(query).lean();

    // Calculate totals
    const totalSpent = expenses.reduce((sum, exp) => sum + exp.amount, 0);

    // Group by category
    const categoryMap = new Map<string, { total: number; count: number }>();

    expenses.forEach((exp) => {
      const existing = categoryMap.get(exp.category) || { total: 0, count: 0 };
      categoryMap.set(exp.category, {
        total: existing.total + exp.amount,
        count: existing.count + 1,
      });
    });

    const categoryBreakdown: ExpenseCategory[] = Array.from(
      categoryMap.entries()
    )
      .map(([category, data]) => ({
        category,
        total: data.total,
        count: data.count,
      }))
      .sort((a, b) => b.total - a.total);

    const summary: ExpenseSummary = {
      totalSpent,
      expenseCount: expenses.length,
      categoryBreakdown,
      timeframe: {
        start: (startDate as string) || "all time",
        end: (endDate as string) || "now",
      },
    };

    res.json(summary);
  })
);

/**
 * DELETE /api/expenses/:expenseId
 * Delete an expense
 */
router.delete(
  "/:expenseId",
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const { expenseId } = req.params;

    if (!expenseId) {
      throw createError("expenseId is required", 400);
    }

    // Optional: Verify expense belongs to user if authenticated
    if (req.userId) {
      const expense = await Expense.findById(expenseId);
      if (!expense) {
        throw createError("Expense not found", 404);
      }
      if (expense.userId !== req.userId) {
        throw createError("Unauthorized to delete this expense", 403);
      }
    }

    const result = await Expense.findByIdAndDelete(expenseId);

    if (!result) {
      throw createError("Expense not found", 404);
    }

    res.json({ message: "Expense deleted successfully" });
  })
);

export default router;

