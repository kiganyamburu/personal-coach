import { Header } from "@/components/Header";
import { ExpenseSummary } from "@/components/ExpenseSummary";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import {
  DollarSign,
  TrendingUp,
  Target,
  ArrowUpRight,
  ArrowDownLeft,
  Calendar,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const spendingByCategory = [
  { name: "Food & Dining", value: 450, fill: "#26d0ac" },
  { name: "Transportation", value: 320, fill: "#0fa9ff" },
  { name: "Entertainment", value: 280, fill: "#8b5cf6" },
  { name: "Utilities", value: 200, fill: "#f59e0b" },
  { name: "Other", value: 200, fill: "#ef4444" },
];

const monthlyTrend = [
  { month: "Jan", spent: 2100, budget: 3000 },
  { month: "Feb", spent: 2300, budget: 3000 },
  { month: "Mar", spent: 2150, budget: 3000 },
  { month: "Apr", spent: 2450, budget: 3000 },
  { month: "May", spent: 2200, budget: 3000 },
  { month: "Jun", spent: 2400, budget: 3000 },
];

const categoryBreakdown = [
  {
    category: "Food & Dining",
    spent: 450,
    budget: 500,
    percentage: 90,
  },
  {
    category: "Transportation",
    spent: 320,
    budget: 400,
    percentage: 80,
  },
  {
    category: "Entertainment",
    spent: 280,
    budget: 300,
    percentage: 93,
  },
  {
    category: "Utilities",
    spent: 200,
    budget: 250,
    percentage: 80,
  },
  {
    category: "Shopping",
    spent: 200,
    budget: 200,
    percentage: 100,
  },
];

const recentTransactions = [
  {
    id: "1",
    description: "Whole Foods Market",
    category: "Food & Dining",
    amount: 52.43,
    date: "Today",
    type: "expense",
  },
  {
    id: "2",
    description: "Uber",
    category: "Transportation",
    amount: 28.5,
    date: "Yesterday",
    type: "expense",
  },
  {
    id: "3",
    description: "Salary Deposit",
    category: "Income",
    amount: 5000.0,
    date: "2 days ago",
    type: "income",
  },
  {
    id: "4",
    description: "Netflix",
    category: "Entertainment",
    amount: 15.99,
    date: "5 days ago",
    type: "expense",
  },
  {
    id: "5",
    description: "Electric Bill",
    category: "Utilities",
    amount: 120.0,
    date: "1 week ago",
    type: "expense",
  },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex flex-col">
      <Header />

      <main className="flex-1 container max-w-screen-2xl py-6">
        <div className="space-y-8">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
              Dashboard
            </h1>
            <p className="text-muted-foreground">
              Track your spending and manage your finances
            </p>
          </div>

          {/* Key Metrics */}
          <ExpenseSummary />

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Spending by Category */}
            <div className="rounded-lg border border-border p-6 bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <h2 className="text-lg font-semibold text-foreground mb-6">
                Spending by Category
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={spendingByCategory}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name} $${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {spendingByCategory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `$${value}`} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Monthly Trend */}
            <div className="rounded-lg border border-border p-6 bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <h2 className="text-lg font-semibold text-foreground mb-6">
                Monthly Spending Trend
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyTrend}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="hsl(var(--border))"
                  />
                  <XAxis
                    dataKey="month"
                    stroke="hsl(var(--muted-foreground))"
                  />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                    }}
                    formatter={(value) => `$${value}`}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="spent"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--primary))" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="budget"
                    stroke="hsl(var(--secondary))"
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--secondary))" }}
                    strokeDasharray="5 5"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Detailed View */}
          <Tabs defaultValue="categories" className="space-y-4">
            <TabsList>
              <TabsTrigger value="categories">By Category</TabsTrigger>
              <TabsTrigger value="transactions">Recent</TabsTrigger>
            </TabsList>

            <TabsContent value="categories" className="space-y-4">
              <div className="rounded-lg border border-border bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-background/60 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-border bg-muted/30">
                      <tr>
                        <th className="text-left px-6 py-4 font-semibold text-foreground">
                          Category
                        </th>
                        <th className="text-right px-6 py-4 font-semibold text-foreground">
                          Spent
                        </th>
                        <th className="text-right px-6 py-4 font-semibold text-foreground">
                          Budget
                        </th>
                        <th className="text-right px-6 py-4 font-semibold text-foreground">
                          Progress
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {categoryBreakdown.map((item) => (
                        <tr
                          key={item.category}
                          className="hover:bg-muted/20 transition-colors"
                        >
                          <td className="px-6 py-4 text-foreground font-medium">
                            {item.category}
                          </td>
                          <td className="px-6 py-4 text-right text-foreground">
                            ${item.spent.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 text-right text-muted-foreground">
                            ${item.budget.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                                <div
                                  className={`h-full rounded-full transition-all ${
                                    item.percentage > 90
                                      ? "bg-orange-500"
                                      : item.percentage > 75
                                        ? "bg-yellow-500"
                                        : "bg-primary"
                                  }`}
                                  style={{ width: `${item.percentage}%` }}
                                />
                              </div>
                              <span className="text-xs font-semibold text-muted-foreground w-8">
                                {item.percentage}%
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="transactions" className="space-y-4">
              <div className="space-y-2">
                {recentTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-4 rounded-lg border border-border bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-background/60 hover:border-primary/30 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`p-2 rounded-lg ${
                          transaction.type === "income"
                            ? "bg-green-100 dark:bg-green-900/20"
                            : "bg-blue-100 dark:bg-blue-900/20"
                        }`}
                      >
                        {transaction.type === "income" ? (
                          <ArrowDownLeft className="h-5 w-5 text-green-600 dark:text-green-400" />
                        ) : (
                          <ArrowUpRight className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">
                          {transaction.description}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {transaction.category}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={`font-semibold ${
                          transaction.type === "income"
                            ? "text-green-600 dark:text-green-400"
                            : "text-foreground"
                        }`}
                      >
                        {transaction.type === "income" ? "+" : "-"}$
                        {transaction.amount.toFixed(2)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {transaction.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
