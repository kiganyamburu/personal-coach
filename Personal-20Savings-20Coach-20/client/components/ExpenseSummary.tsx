import { TrendingDown, TrendingUp, Coins, Target } from "lucide-react";
import { cn } from "@/lib/utils";

interface ExpenseMetric {
  label: string;
  value: string;
  change?: string;
  trend?: "up" | "down";
  icon: React.ReactNode;
  color: string;
}

interface ExpenseSummaryProps {
  metrics?: ExpenseMetric[];
}

export function ExpenseSummary({ metrics }: ExpenseSummaryProps) {
  const defaultMetrics: ExpenseMetric[] = [
    {
      label: "This Month",
      value: "KSH 24,500",
      change: "+12% from last month",
      trend: "up",
      icon: <Coins className="h-5 w-5" />,
      color: "from-primary/20 to-primary/10",
    },
    {
      label: "Budget Used",
      value: "73%",
      change: "KSH 30,000 total budget",
      icon: <Target className="h-5 w-5" />,
      color: "from-secondary/20 to-secondary/10",
    },
    {
      label: "Savings Potential",
      value: "KSH 8,900",
      change: "Based on spending patterns",
      trend: "down",
      icon: <TrendingDown className="h-5 w-5" />,
      color: "from-green-200/20 to-green-100/10",
    },
  ];

  const displayMetrics = metrics || defaultMetrics;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {displayMetrics.map((metric, index) => (
        <div
          key={index}
          className={cn(
            "rounded-lg border border-border p-6 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-primary/30 cursor-pointer group",
            `bg-gradient-to-br ${metric.color}`,
          )}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm text-muted-foreground font-medium group-hover:text-foreground transition-colors duration-300">
                {metric.label}
              </p>
              <p className="text-2xl font-bold text-foreground mt-2 group-hover:text-primary transition-colors duration-300">
                {metric.value}
              </p>
              {metric.change && (
                <p className="text-xs text-muted-foreground mt-2">
                  {metric.change}
                </p>
              )}
            </div>
            <div
              className={cn(
                "p-2 rounded-lg",
                metric.trend === "up" && "text-orange-600 bg-orange-100/20",
                metric.trend === "down" && "text-green-600 bg-green-100/20",
                !metric.trend && "text-primary bg-primary/10",
              )}
            >
              {metric.trend === "up" && <TrendingUp className="h-5 w-5" />}
              {metric.trend === "down" && <TrendingDown className="h-5 w-5" />}
              {!metric.trend && metric.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
