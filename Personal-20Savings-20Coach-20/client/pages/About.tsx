import { Header } from "@/components/Header";
import {
  Heart,
  Target,
  Zap,
  Users,
  Award,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex flex-col">
      <Header />

      <main className="flex-1 container max-w-screen-2xl py-12 lg:py-16">
        <div className="space-y-16">
          {/* Hero Section */}
          <section className="space-y-8">
            <div className="space-y-4 max-w-2xl">
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
                About Personal Savings Coach
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                We believe financial wellness shouldn't be complicated. Our
                mission is to empower everyone to take control of their finances
                through intelligent, conversational AI guidance.
              </p>
            </div>
          </section>

          {/* Mission & Vision */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-xl border border-border bg-gradient-to-br from-primary/10 to-primary/5 p-8 space-y-4">
              <div className="inline-flex p-3 rounded-lg bg-primary/20">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">
                Our Mission
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                To democratize financial guidance by making it accessible,
                personalized, and conversational. We help you understand your
                spending, make smarter decisions, and build lasting wealth.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-gradient-to-br from-secondary/10 to-secondary/5 p-8 space-y-4">
              <div className="inline-flex p-3 rounded-lg bg-secondary/20">
                <Heart className="h-6 w-6 text-secondary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Our Values</h2>
              <p className="text-muted-foreground leading-relaxed">
                We're committed to transparency, privacy, and empowerment. Your
                financial data is treated with the utmost care, and our guidance
                is always unbiased and truly personalized to your situation.
              </p>
            </div>
          </section>

          {/* Why Choose Us */}
          <section className="space-y-8">
            <div className="space-y-2 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                Why Choose Personal Savings Coach?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                What makes us different from traditional budgeting tools
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Zap,
                  title: "Instant Insights",
                  description:
                    "Get real-time analysis of your spending patterns without manual data entry or complex interfaces.",
                },
                {
                  icon: Users,
                  title: "Personal Coach",
                  description:
                    "Talk to an AI that understands your unique financial situation and provides tailored recommendations.",
                },
                {
                  icon: Award,
                  title: "Proven Results",
                  description:
                    "Users save an average of $200-500 per month after following our personalized advice.",
                },
                {
                  icon: Target,
                  title: "Goal-Focused",
                  description:
                    "Set meaningful financial goals and receive actionable steps to achieve them faster.",
                },
                {
                  icon: Heart,
                  title: "Privacy First",
                  description:
                    "Your data is encrypted and never sold. Only you control how your information is used.",
                },
                {
                  icon: CheckCircle2,
                  title: "Easy to Use",
                  description:
                    "No learning curve. Just chat naturally about your finances like you would with a friend.",
                },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="rounded-lg border border-border/50 bg-card/50 backdrop-blur p-6 space-y-3 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 cursor-pointer group hover:-translate-y-1 active:scale-95"
                  >
                    <div className="inline-flex p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 group-hover:scale-110 group-hover:shadow-md transition-all duration-300">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed group-hover:text-foreground transition-colors duration-300">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* How We Work */}
          <section className="space-y-8">
            <div className="space-y-2 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                How It Works
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our technology stack designed for reliability and accuracy
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  step: "1",
                  title: "Natural Language Processing",
                  description:
                    "Our AI understands natural language, so you can chat about your spending just like you would with a friend. No complex forms or jargon.",
                },
                {
                  step: "2",
                  title: "Smart Analysis",
                  description:
                    "We analyze your spending patterns in real-time, identifying trends, anomalies, and opportunities to save money.",
                },
                {
                  step: "3",
                  title: "Personalized Guidance",
                  description:
                    "Based on your unique situation, we provide actionable recommendations tailored specifically to help you reach your goals.",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="relative group cursor-pointer overflow-visible"
                >
                  <div className="absolute -top-5 left-6 inline-flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-br from-primary to-secondary text-white font-bold text-sm transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/30 z-10">
                    {item.step}
                  </div>
                  <div className="rounded-lg border border-border bg-card/50 backdrop-blur p-6 pt-12 space-y-3 transition-all duration-300 group-hover:border-primary/40 group-hover:shadow-lg group-hover:shadow-primary/10 group-hover:-translate-y-1 relative z-0">
                    <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-300">
                      {item.description}
                    </p>
                  </div>
                  {index < 2 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-primary/30 transition-all duration-300 group-hover:text-primary/60 group-hover:translate-x-1">
                      <ArrowRight className="h-6 w-6" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Tech Stack */}
          <section className="space-y-8">
            <div className="space-y-2 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                Built with Modern Technology
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We use cutting-edge tools to ensure reliability, security, and
                performance
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {[
                { name: "Next.js", desc: "React Framework" },
                { name: "Vertex AI", desc: "LLM & NLP" },
                { name: "Firebase", desc: "Real-time DB" },
                { name: "Genkit", desc: "AI Workflows" },
                { name: "React", desc: "UI Library" },
                { name: "TypeScript", desc: "Type Safety" },
                { name: "TailwindCSS", desc: "Styling" },
                { name: "Recharts", desc: "Visualizations" },
              ].map((tech, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-border/50 bg-card/50 backdrop-blur p-4 text-center space-y-1 hover:border-primary/40 hover:shadow-md hover:shadow-primary/10 transition-all duration-300 cursor-pointer hover:-translate-y-1 group active:scale-95"
                >
                  <p className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors duration-300">
                    {tech.name}
                  </p>
                  <p className="text-xs text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                    {tech.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ Section */}
          <section className="space-y-8">
            <div className="space-y-2 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-4 max-w-3xl mx-auto">
              {[
                {
                  q: "Is my financial data secure?",
                  a: "Yes. All your data is encrypted end-to-end. We never sell your information to third parties, and you maintain complete control over your data.",
                },
                {
                  q: "How accurate are the recommendations?",
                  a: "Our AI learns from millions of financial transactions and proven budgeting strategies. However, recommendations are personalized based on your unique situation, so accuracy depends on how much you share with the coach.",
                },
                {
                  q: "Can I connect my bank account?",
                  a: "Currently, we use conversational tracking for more privacy. You simply tell the coach about your expenses, and we provide analysis based on that information.",
                },
                {
                  q: "What makes this different from other budgeting apps?",
                  a: "We combine natural language understanding with AI-powered financial insights. Instead of entering data manually, you chat naturally, and our AI handles the analysis and personalization.",
                },
                {
                  q: "Is there a free trial?",
                  a: "Yes! You can start chatting with your Personal Savings Coach immediately for free. Premium features are coming soon.",
                },
              ].map((faq, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-border/50 bg-card/50 backdrop-blur p-6 space-y-3 transition-all duration-300 hover:border-primary/40 hover:shadow-md hover:shadow-primary/10 cursor-pointer group hover:-translate-y-1"
                >
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                    {faq.q}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-300">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="relative rounded-2xl bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/10 border border-primary/20 p-8 sm:p-12 lg:p-16 text-center space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Ready to take control of your finances?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Start chatting with your Personal Savings Coach today and begin
              your journey to better financial health.
            </p>
            <Link
              to="/login"
              className={cn(
                "inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg",
                "bg-primary text-primary-foreground hover:bg-primary/90",
                "text-base font-medium transition-colors",
              )}
            >
              Get started
              <ArrowRight className="h-5 w-5" />
            </Link>
          </section>

          {/* Footer Message */}
          <section className="text-center space-y-4 py-8 border-t border-border/40">
            <p className="text-muted-foreground">
              Personal Savings Coach — Empowering your financial future
            </p>
            <p className="text-sm text-muted-foreground/60">
              © 2025 Personal Savings Coach. All rights reserved.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
