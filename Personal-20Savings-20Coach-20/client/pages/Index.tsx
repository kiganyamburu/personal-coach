import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import {
  MessageCircle,
  TrendingUp,
  PieChart,
  Zap,
  Target,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 dark:to-primary/10">
      <Header />

      {/* Hero Section */}
      <section className="container max-w-screen-2xl py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-6 lg:space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-xs sm:text-sm font-medium text-primary">
                AI-Powered Financial Guidance
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-tight">
                Your Personal{" "}
                <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                  Savings Coach
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-xl">
                Chat naturally about your spending, and let our AI help you
                build better financial habits, save more money, and achieve your
                goals.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                to="/login"
                className={cn(
                  "inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg",
                  "bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95",
                  "text-base font-medium transition-all duration-200",
                  "hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5",
                )}
              >
                Get started
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                to="/about"
                className={cn(
                  "inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg",
                  "border border-primary text-primary hover:bg-primary/10",
                  "text-base font-medium transition-all duration-200",
                  "hover:shadow-md hover:-translate-y-0.5 active:scale-95",
                )}
              >
                Learn More
              </Link>
            </div>

            <div className="pt-4 space-y-3">
              <p className="text-sm font-medium text-muted-foreground">
                What you can do:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "Track daily spending",
                  "Analyze expenses",
                  "Get smart budgets",
                  "Receive insights",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-sm text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Hero Image / Dashboard Preview */}
          <div className="relative hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl blur-3xl" />
            <div className="relative bg-gradient-to-br from-card to-muted rounded-2xl border border-border/50 p-8 shadow-xl space-y-6">
              {/* Dashboard Header */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1">
                  Dashboard
                </h3>
                <p className="text-xs text-muted-foreground">
                  Your spending overview
                </p>
              </div>

              {/* Expense Summary Cards */}
              <div className="grid grid-cols-1 gap-3">
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-4 border border-primary/20">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs text-muted-foreground font-medium">
                      This Month
                    </p>
                    <span className="text-xs font-semibold text-orange-600 bg-orange-100/50 px-2 py-1 rounded">
                      +12%
                    </span>
                  </div>
                  <p className="text-xl font-bold text-foreground">
                    KSH 24,500
                  </p>
                </div>

                <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-lg p-4 border border-secondary/20">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs text-muted-foreground font-medium">
                      Budget Used
                    </p>
                    <span className="text-xs font-semibold text-secondary">
                      73%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div className="w-3/4 h-full bg-gradient-to-r from-primary to-secondary rounded-full" />
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-100/20 to-green-50/10 rounded-lg p-4 border border-green-200/50">
                  <p className="text-xs text-muted-foreground font-medium mb-2">
                    Savings Potential
                  </p>
                  <p className="text-xl font-bold text-green-700">KSH 8,900</p>
                </div>
              </div>

              {/* Mini Chart Visualization */}
              <div className="pt-2 border-t border-border/30">
                <p className="text-xs text-muted-foreground font-medium mb-3">
                  Spending Trend
                </p>
                <div className="flex items-end gap-1 h-12">
                  {[60, 70, 55, 80, 65, 75].map((height, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-gradient-to-t from-primary to-secondary rounded-sm opacity-70 hover:opacity-100 transition-opacity"
                      style={{
                        height: `${(height / 100) * 100}%`,
                        minHeight: "4px",
                      }}
                    />
                  ))}
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>Jan</span>
                  <span>Jun</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-20 lg:py-24 border-t border-border/40 bg-muted/20">
        <div className="container max-w-screen-2xl">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Everything you need to manage your money
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to help you take control of your
              finances
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                icon: MessageCircle,
                title: "Natural Chat Interface",
                description:
                  "Just chat naturally about your spending. No complex forms or confusing interfaces.",
              },
              {
                icon: TrendingUp,
                title: "Smart Analytics",
                description:
                  "Get detailed insights into your spending patterns and trends over time.",
              },
              {
                icon: Target,
                title: "Personalized Goals",
                description:
                  "Set savings goals and get AI-powered recommendations tailored to your situation.",
              },
              {
                icon: PieChart,
                title: "Visual Reports",
                description:
                  "See beautiful charts and reports that break down exactly where your money goes.",
              },
              {
                icon: Zap,
                title: "Instant Recommendations",
                description:
                  "Get actionable advice on how to save more and spend smarter.",
              },
              {
                icon: CheckCircle2,
                title: "Real-Time Tracking",
                description:
                  "Track expenses in real-time and stay on top of your budget automatically.",
              },
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group rounded-xl border border-border/50 bg-gradient-to-br from-card to-muted/10 p-6 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 cursor-pointer hover:-translate-y-1.5 active:scale-95"
                >
                  <div className="mb-4 inline-flex p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 group-hover:shadow-lg group-hover:shadow-primary/20 transition-all duration-300 group-hover:scale-110">
                    <Icon className="h-6 w-6 text-primary transition-transform duration-300" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 sm:py-20 lg:py-24 container max-w-screen-2xl">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            How it works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get started in just three simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              step: "1",
              title: "Chat About Your Spending",
              description:
                "Simply tell the coach about your expenses. Say things like 'spent KSH 500 on groceries' or 'my rent is KSH 15,000'.",
            },
            {
              step: "2",
              title: "Get Personalized Insights",
              description:
                "The AI analyzes your spending patterns and creates a personalized financial profile just for you.",
            },
            {
              step: "3",
              title: "Save More, Stress Less",
              description:
                "Follow personalized recommendations and watch your savings grow with confidence.",
            },
          ].map((item, index) => (
            <div key={index} className="relative group cursor-pointer">
              <div className="absolute -top-8 -left-2 w-16 h-16 bg-primary/10 rounded-full blur-xl group-hover:bg-primary/20 transition-colors duration-300" />
              <div className="relative text-center space-y-4 transition-transform duration-300 group-hover:-translate-y-1">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-br from-primary to-secondary text-white font-bold text-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/30 active:scale-95">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-300">
                  {item.description}
                </p>
              </div>
              {index < 2 && (
                <div className="hidden md:block absolute top-6 -right-4 text-primary/30 transition-all duration-300 group-hover:text-primary/60 group-hover:translate-x-1">
                  <ArrowRight className="h-6 w-6" />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 lg:py-24 border-t border-border/40">
        <div className="container max-w-screen-2xl">
          <div className="relative rounded-2xl bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/10 border border-primary/20 p-8 sm:p-12 lg:p-16 text-center">
            <div className="space-y-6 max-w-2xl mx-auto">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
                Ready to take control of your finances?
              </h2>
              <p className="text-lg text-muted-foreground">
                Start chatting with your Personal Savings Coach today and begin
                your journey to better financial health.
              </p>
              <Link
                to="/login"
                className={cn(
                  "inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg",
                  "bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95",
                  "text-base font-medium transition-all duration-200",
                  "hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5",
                  "cursor-pointer",
                )}
              >
                <span className="transition-all duration-300 group-hover:translate-x-0">
                  Start Now
                </span>
                <ArrowRight className="h-5 w-5 transition-transform duration-300 hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 sm:py-12 border-t border-border/40 bg-muted/30">
        <div className="container max-w-screen-2xl">
          <div className="text-center text-sm text-muted-foreground">
            <p>
              © 2024 Personal Savings Coach. All rights reserved. Built with
              care to help you achieve your financial goals.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
