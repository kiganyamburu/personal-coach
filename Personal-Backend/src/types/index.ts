// Re-export types from frontend for consistency
export enum ChatIntent {
  GREETING = "greeting",
  EXPENSE_LOG = "expense_log",
  EXPENSE_QUERY = "expense_query",
  SAVINGS_ADVICE = "savings_advice",
  BUDGET_HELP = "budget_help",
  UNKNOWN = "unknown",
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface ChatRequest {
  message: string;
  userId?: string;
  conversationId?: string;
}

export interface ChatResponse {
  response: string;
  intent: ChatIntent;
  conversationId: string;
  action?: string;
  data?: Record<string, any>;
}

export interface Expense {
  id?: string;
  userId: string;
  amount: number;
  category: string;
  description?: string;
  date: string;
  createdAt?: string;
}

export interface ExpenseCategory {
  category: string;
  total: number;
  count: number;
}

export interface ExpenseSummary {
  totalSpent: number;
  expenseCount: number;
  categoryBreakdown: ExpenseCategory[];
  timeframe: {
    start: string;
    end: string;
  };
}

export interface FinancialInsights {
  insights: string[];
  recommendations: string[];
  topCategories: Array<{
    category: string;
    amount: number;
    percentage: number;
  }>;
}

export interface SpendingTrend {
  period: string;
  amount: number;
}

export interface SpendingTrendsResponse {
  period: "day" | "week" | "month";
  trends: SpendingTrend[];
}

// Express request extensions
import { Request } from "express";

export interface AuthRequest extends Request {
  userId?: string;
  user?: {
    id: string;
    email: string;
    name: string;
  };
}

