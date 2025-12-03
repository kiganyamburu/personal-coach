import { Link } from "react-router-dom";
import { PiggyBank, Sparkles, CheckCircle2, Shield, Target } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 dark:to-primary/10 flex flex-col">
      {/* Simple header focused on brand + auth */}
      <header className="w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container max-w-screen-2xl h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-primary to-secondary rounded-lg p-2 flex items-center justify-center">
              <PiggyBank className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent font-bold text-lg">
              Savings Coach
            </span>
          </div>
          <nav className="flex items-center gap-3 sm:gap-4">
            <Link
              to="/login"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center justify-center rounded-full px-4 py-1.5 text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm shadow-primary/30 transition-colors"
            >
              Sign up free
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1">
        <section className="container max-w-screen-2xl py-12 sm:py-16 lg:py-20 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="space-y-6 lg:space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-xs sm:text-sm font-medium text-primary">
                AI-Powered Savings Assistant
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-tight">
                Understand your{" "}
                <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                  money
                </span>{" "}
                in minutes, not months.
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-xl">
                Savings Coach turns everyday language into clear budgets,
                insights, and savings plans—so you always know where your money
                is going and how to make it work harder.
              </p>
            </div>

            {/* Dominant auth CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link
                to="/register"
                className={cn(
                  "inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full",
                  "bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95",
                  "text-base font-semibold transition-all duration-200",
                  "hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5",
                )}
              >
                Get started free
              </Link>
              <Link
                to="/login"
                className={cn(
                  "inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full",
                  "border border-primary/60 text-primary hover:bg-primary/10",
                  "text-base font-medium transition-all duration-200",
                )}
              >
                I already have an account
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
              {[
                "Track daily spending in a conversational way.",
                "See where your money goes each week and month.",
                "Get tailored savings tips based on your habits.",
                "Set realistic goals and stay accountable.",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                  <p className="text-sm text-foreground">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Visual panel describing experience (no sensitive data) */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-3xl" />
            <div className="relative rounded-3xl border border-border/60 bg-gradient-to-br from-card to-muted shadow-xl shadow-primary/10 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
                    Example conversation
                  </p>
                  <h2 className="text-lg font-semibold text-foreground">
                    You &amp; your savings coach
                  </h2>
                </div>
                <Shield className="h-5 w-5 text-primary" />
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center font-semibold">
                    Y
                  </div>
                  <div className="rounded-2xl bg-muted px-3 py-2 max-w-xs">
                    I spent KSH 2,300 on food this week and 1,200 on rides.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                    AI
                  </div>
                  <div className="rounded-2xl bg-primary/10 px-3 py-2 max-w-xs">
                    You&apos;re slightly above a healthy range for transport.
                    If we cap rides at KSH 900/week, you could save KSH 15,000
                    this year.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center font-semibold">
                    Y
                  </div>
                  <div className="rounded-2xl bg-muted px-3 py-2 max-w-xs">
                    Help me create a weekly budget to fix that.
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4 text-xs">
                <div className="rounded-lg border border-border bg-background/60 p-3 space-y-1">
                  <p className="text-muted-foreground">Built for privacy</p>
                  <p className="font-semibold text-foreground">
                    You control your data
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-background/60 p-3 space-y-1">
                  <p className="text-muted-foreground">Designed for clarity</p>
                  <p className="font-semibold text-foreground">
                    No spreadsheets needed
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-border/40 text-xs text-muted-foreground">
                <span>Works on mobile and desktop</span>
                <span className="inline-flex items-center gap-1">
                  <Target className="h-3 w-3" />
                  Focused on your goals
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-6 border-t border-border/40 bg-muted/20">
        <div className="container max-w-screen-2xl text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Savings Coach. Built to help you spend
          with confidence and save with intention.
        </div>
      </footer>
    </div>
  );
}


