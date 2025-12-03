import { RequestHandler } from "express";
import { getFirestoreDb } from "../config/firebase";
import { generateInsights } from "../config/genkit";

interface Expense {
  userId: string;
  amount: number;
  category: string;
  description?: string;
  date: string;
}

interface ExpenseQueryParams {
  userId?: string;
  startDate?: string;
  endDate?: string;
  category?: string;
}

/**
 * Log a new expense
 */
export const logExpense: RequestHandler = async (req, res) => {
  try {
    const { userId, amount, category, description, date } = req.body as Expense;

    if (!userId || !amount || !category) {
      res.status(400).json({
        error: "Missing required fields: userId, amount, category",
      });
      return;
    }

    const db = getFirestoreDb();
    const expenseRef = db.collection("expenses").doc();

    const expense: Expense = {
      userId,
      amount: Number(amount),
      category,
      description: description || "",
      date: date || new Date().toISOString(),
    };

    await expenseRef.set({
      ...expense,
      createdAt: new Date().toISOString(),
    });

    res.status(201).json({
      id: expenseRef.id,
      ...expense,
      message: "Expense logged successfully",
    });
  } catch (error) {
    console.error("Error logging expense:", error);
    res.status(500).json({
      error: "Failed to log expense",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

/**
 * Get expenses for a user
 */
export const getExpenses: RequestHandler = async (req, res) => {
  try {
    const { userId, startDate, endDate, category } =
      req.query as ExpenseQueryParams;

    if (!userId) {
      res.status(400).json({ error: "userId is required" });
      return;
    }

    const db = getFirestoreDb();
    let query = db.collection("expenses").where("userId", "==", userId);

    // Apply filters
    if (category) {
      query = query.where("category", "==", category);
    }

    if (startDate) {
      query = query.where("date", ">=", startDate);
    }

    if (endDate) {
      query = query.where("date", "<=", endDate);
    }

    const snapshot = await query.orderBy("date", "desc").get();

    const expenses = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json({
      expenses,
      total: expenses.length,
    });
  } catch (error) {
    console.error("Error getting expenses:", error);
    res.status(500).json({
      error: "Failed to get expenses",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

/**
 * Get expense summary
 */
export const getExpenseSummary: RequestHandler = async (req, res) => {
  try {
    const { userId } = req.params;
    const { startDate, endDate } = req.query;

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

    const expenses = snapshot.docs.map((doc) => doc.data());
    const totalSpent = expenses.reduce((sum, exp: any) => sum + exp.amount, 0);

    // Group by category
    const byCategory = expenses.reduce((acc: any, exp: any) => {
      if (!acc[exp.category]) {
        acc[exp.category] = { category: exp.category, total: 0, count: 0 };
      }
      acc[exp.category].total += exp.amount;
      acc[exp.category].count += 1;
      return acc;
    }, {});

    const categoryBreakdown = Object.values(byCategory).sort(
      (a: any, b: any) => b.total - a.total,
    );

    res.json({
      totalSpent,
      expenseCount: expenses.length,
      categoryBreakdown,
      timeframe: {
        start: startDate || "all time",
        end: endDate || "now",
      },
    });
  } catch (error) {
    console.error("Error getting expense summary:", error);
    res.status(500).json({
      error: "Failed to get expense summary",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

/**
 * Delete an expense
 */
export const deleteExpense: RequestHandler = async (req, res) => {
  try {
    const { expenseId } = req.params;

    if (!expenseId) {
      res.status(400).json({ error: "expenseId is required" });
      return;
    }

    const db = getFirestoreDb();
    await db.collection("expenses").doc(expenseId).delete();

    res.json({ message: "Expense deleted successfully" });
  } catch (error) {
    console.error("Error deleting expense:", error);
    res.status(500).json({
      error: "Failed to delete expense",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
