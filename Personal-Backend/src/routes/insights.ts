import { Router, Response } from "express";
import { Expense } from "../models/Expense";
import { generateInsights } from "../config/genkit";
import { createError, asyncHandler } from "../middleware/errorHandler";
import { AuthRequest, FinancialInsights, SpendingTrendsResponse } from "../types";

const router = Router();

/**
 * GET /api/insights/:userId
 * Get AI-powered financial insights
 */
router.get(
  "/:userId",
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const { userId } = req.params;
    const { startDate, endDate, timeframe = "last 30 days" } = req.query;

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

    if (expenses.length === 0) {
      const emptyInsights: FinancialInsights = {
        insights: ["No expenses found for the selected period."],
        recommendations: [
          "Start tracking your expenses to get personalized insights!",
        ],
        topCategories: [],
      };
      res.json(emptyInsights);
      return;
    }

    // Format expenses for AI
    const formattedExpenses = expenses.map((exp) => ({
      amount: exp.amount,
      category: exp.category,
      description: exp.description,
      date: exp.date,
    }));

    const totalSpent = expenses.reduce((sum, exp) => sum + exp.amount, 0);

    // Generate AI insights
    const insights = await generateInsights({
      expenses: formattedExpenses,
      totalSpent,
      timeframe: timeframe as string,
    });

    res.json(insights);
  })
);

/**
 * GET /api/insights/:userId/trends
 * Get spending trends over time
 */
router.get(
  "/:userId/trends",
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const { userId } = req.params;
    const { period = "month" } = req.query; // day, week, month

    if (!userId) {
      throw createError("userId is required", 400);
    }

    if (!["day", "week", "month"].includes(period as string)) {
      throw createError("Period must be 'day', 'week', or 'month'", 400);
    }

    // Get all expenses for user
    const expenses = await Expense.find({ userId })
      .sort({ date: -1 })
      .lean();

    // Group expenses by period
    const trends: Record<string, number> = {};

    expenses.forEach((expense) => {
      const date = new Date(expense.date);
      let key: string;

      switch (period) {
        case "day":
          key = date.toISOString().split("T")[0];
          break;
        case "week":
          const weekStart = new Date(date);
          weekStart.setDate(date.getDate() - date.getDay());
          key = weekStart.toISOString().split("T")[0];
          break;
        case "month":
        default:
          key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
          break;
      }

      trends[key] = (trends[key] || 0) + expense.amount;
    });

    const trendData = Object.entries(trends)
      .map(([period, amount]) => ({ period, amount }))
      .sort((a, b) => a.period.localeCompare(b.period));

    const response: SpendingTrendsResponse = {
      period: period as "day" | "week" | "month",
      trends: trendData,
    };

    res.json(response);
  })
);

export default router;

