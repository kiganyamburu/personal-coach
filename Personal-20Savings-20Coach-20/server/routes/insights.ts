import { RequestHandler } from "express";
import { getFirestoreDb } from "../config/firebase";
import { generateInsights } from "../config/genkit";

/**
 * Get AI-powered financial insights
 */
export const getFinancialInsights: RequestHandler = async (req, res) => {
  try {
    const { userId } = req.params;
    const { startDate, endDate, timeframe = "last 30 days" } = req.query;

    if (!userId) {
      res.status(400).json({ error: "userId is required" });
      return;
    }

    const db = getFirestoreDb();
    let query = db.collection("expenses").where("userId", "==", userId);

    if (startDate) {
      query = query.where("date", ">=", startDate as string);
    }

    if (endDate) {
      query = query.where("date", "<=", endDate as string);
    }

    const snapshot = await query.get();

    if (snapshot.empty) {
      res.json({
        insights: ["No expenses found for the selected period."],
        recommendations: [
          "Start tracking your expenses to get personalized insights!",
        ],
        topCategories: [],
      });
      return;
    }

    const expenses = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        amount: data.amount,
        category: data.category,
        description: data.description,
        date: data.date,
      };
    });

    const totalSpent = expenses.reduce((sum, exp) => sum + exp.amount, 0);

    // Generate AI insights using Vertex AI
    const insights = await generateInsights({
      expenses,
      totalSpent,
      timeframe: timeframe as string,
    });

    res.json(insights);
  } catch (error) {
    console.error("Error generating insights:", error);
    res.status(500).json({
      error: "Failed to generate insights",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

/**
 * Get spending trends
 */
export const getSpendingTrends: RequestHandler = async (req, res) => {
  try {
    const { userId } = req.params;
    const { period = "month" } = req.query; // day, week, month

    if (!userId) {
      res.status(400).json({ error: "userId is required" });
      return;
    }

    const db = getFirestoreDb();
    const snapshot = await db
      .collection("expenses")
      .where("userId", "==", userId)
      .orderBy("date", "desc")
      .get();

    const expenses = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Group expenses by period
    const trends: Record<string, number> = {};
    expenses.forEach((expense: any) => {
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

    res.json({
      period,
      trends: trendData,
    });
  } catch (error) {
    console.error("Error getting spending trends:", error);
    res.status(500).json({
      error: "Failed to get spending trends",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
