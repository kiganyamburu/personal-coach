import { useState } from "react";
import { buildApiUrl } from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";
import type { Expense, ExpenseSummary } from "@shared/types";

/**
 * Custom hook for expense management
 */
export function useExpenses() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();

  const logExpense = async (expense: Omit<Expense, "id" | "createdAt">) => {
    setLoading(true);
    setError(null);

    try {
      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await fetch(buildApiUrl("/expenses"), {
        method: "POST",
        headers,
        body: JSON.stringify(expense),
      });

      if (!response.ok) {
        throw new Error(`Failed to log expense: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      console.error("Error logging expense:", err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getExpenses = async (
    userId: string,
    filters?: {
      startDate?: string;
      endDate?: string;
      category?: string;
    },
  ): Promise<{ expenses: Expense[]; total: number } | null> => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({ userId });
      if (filters?.startDate) params.append("startDate", filters.startDate);
      if (filters?.endDate) params.append("endDate", filters.endDate);
      if (filters?.category) params.append("category", filters.category);

      const headers: HeadersInit = {};
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await fetch(
        `${buildApiUrl("/expenses")}?${params.toString()}`,
        { headers },
      );

      if (!response.ok) {
        throw new Error(`Failed to get expenses: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      console.error("Error getting expenses:", err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getSummary = async (
    userId: string,
    filters?: {
      startDate?: string;
      endDate?: string;
    },
  ): Promise<ExpenseSummary | null> => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      if (filters?.startDate) params.append("startDate", filters.startDate);
      if (filters?.endDate) params.append("endDate", filters.endDate);

      const url = `${buildApiUrl(`/expenses/summary/${userId}`)}${
        params.toString() ? `?${params.toString()}` : ""
      }`;
      const headers: HeadersInit = {};
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
      const response = await fetch(url, { headers });

      if (!response.ok) {
        throw new Error(`Failed to get summary: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      console.error("Error getting summary:", err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteExpense = async (expenseId: string) => {
    setLoading(true);
    setError(null);

    try {
      const headers: HeadersInit = {};
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
      const response = await fetch(buildApiUrl(`/expenses/${expenseId}`), {
        method: "DELETE",
        headers,
      });

      if (!response.ok) {
        throw new Error(`Failed to delete expense: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      console.error("Error deleting expense:", err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    logExpense,
    getExpenses,
    getSummary,
    deleteExpense,
    loading,
    error,
  };
}
