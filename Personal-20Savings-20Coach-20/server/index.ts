import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleChat, getConversation } from "./routes/chat";
import {
  logExpense,
  getExpenses,
  getExpenseSummary,
  deleteExpense,
} from "./routes/expenses";
import { getFinancialInsights, getSpendingTrends } from "./routes/insights";
import { initializeFirebase } from "./config/firebase";

// Initialize Firebase when server actually starts (not during Vite config phase)
let firebaseInitialized = false;

function ensureFirebaseInitialized() {
  if (!firebaseInitialized) {
    initializeFirebase();
    firebaseInitialized = true;
  }
}

export function createServer() {
  // Initialize Firebase when creating the server
  ensureFirebaseInitialized();

  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Chat routes
  app.post("/api/chat", handleChat);
  app.get("/api/chat/:conversationId", getConversation);

  // Expense routes
  app.post("/api/expenses", logExpense);
  app.get("/api/expenses", getExpenses);
  app.get("/api/expenses/summary/:userId", getExpenseSummary);
  app.delete("/api/expenses/:expenseId", deleteExpense);

  // Insights routes
  app.get("/api/insights/:userId", getFinancialInsights);
  app.get("/api/insights/:userId/trends", getSpendingTrends);

  return app;
}
