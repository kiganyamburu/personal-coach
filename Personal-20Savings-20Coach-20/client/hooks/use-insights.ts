import { useState } from "react";
import { buildApiUrl } from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";
import type { FinancialInsights, SpendingTrendsResponse } from "@shared/types";

/**
 * Custom hook for financial insights
 */
export function useInsights() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();

  const getInsights = async (
    userId: string,
    filters?: {
      startDate?: string;
      endDate?: string;
      timeframe?: string;
    },
  ): Promise<FinancialInsights | null> => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      if (filters?.startDate) params.append("startDate", filters.startDate);
      if (filters?.endDate) params.append("endDate", filters.endDate);
      if (filters?.timeframe) params.append("timeframe", filters.timeframe);

      const url = `${buildApiUrl(`/insights/${userId}`)}${
        params.toString() ? `?${params.toString()}` : ""
      }`;
      const headers: HeadersInit = {};
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
      const response = await fetch(url, { headers });

      if (!response.ok) {
        throw new Error(`Failed to get insights: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      console.error("Error getting insights:", err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getTrends = async (
    userId: string,
    period: "day" | "week" | "month" = "month",
  ): Promise<SpendingTrendsResponse | null> => {
    setLoading(true);
    setError(null);

    try {
      const headers: HeadersInit = {};
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
      const response = await fetch(
        `${buildApiUrl(`/insights/${userId}/trends`)}?period=${period}`,
        { headers },
      );

      if (!response.ok) {
        throw new Error(`Failed to get trends: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      console.error("Error getting trends:", err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    getInsights,
    getTrends,
    loading,
    error,
  };
}
