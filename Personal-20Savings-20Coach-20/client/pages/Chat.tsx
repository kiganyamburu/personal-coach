import { useState, useEffect, useRef } from "react";
import { Header } from "@/components/Header";
import { ChatMessage, Message } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { ExpenseSummary } from "@/components/ExpenseSummary";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BarChart3, MessageCircle, TrendingUp } from "lucide-react";

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("chat");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Add initial greeting message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: "1",
          content:
            "Hi! I'm your Personal Savings Coach. Tell me about your spending habits, and I'll help you manage your budget better. You can say things like 'spent $45 on groceries' or 'my rent is $1200'.",
          sender: "assistant",
          timestamp: new Date(),
        },
      ]);
    }
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate AI response (replace with actual API call to Vertex AI)
    setTimeout(() => {
      const assistantResponses = [
        `I logged that expense for you. Based on your spending pattern, you might want to track how much you're spending on this category over the week.`,
        `Great! That's helpful information. Let me analyze this with your other expenses to give you better recommendations.`,
        `I've recorded this. Over the past week, you've shared several expenses. Would you like a summary of your spending by category?`,
        `Perfect! I'm noticing some patterns in your spending. On average, you're spending about $300 on discretionary items. Would you like tips on how to reduce this?`,
        `Got it! Let me help you set up a budget for this category. Based on industry standards, most people spend 30-40% of their income on needs.`,
      ];

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          assistantResponses[
            Math.floor(Math.random() * assistantResponses.length)
          ],
        sender: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex flex-col">
      <Header />

      <main className="flex-1 container max-w-screen-2xl py-6">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="h-full flex flex-col"
        >
          <TabsList className="grid w-full max-w-xs grid-cols-3">
            <TabsTrigger value="chat" className="gap-2">
              <MessageCircle className="h-4 w-4" />
              <span className="hidden sm:inline">Chat</span>
            </TabsTrigger>
            <TabsTrigger value="summary" className="gap-2">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Summary</span>
            </TabsTrigger>
            <TabsTrigger value="insights" className="gap-2">
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">Insights</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="flex-1 flex flex-col gap-4">
            <div className="flex-1 border border-border rounded-lg bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-background/60 overflow-hidden flex flex-col">
              <ScrollArea className="flex-1 p-4">
                <div ref={scrollRef} className="flex flex-col gap-4">
                  {messages.map((message) => (
                    <ChatMessage key={message.id} message={message} />
                  ))}
                  {isLoading && (
                    <div className="flex gap-3 animate-slide-up">
                      <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-sm font-semibold text-white">
                        A
                      </div>
                      <div className="flex gap-1 items-center h-10 px-4 py-3 rounded-lg bg-muted">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-100" />
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-200" />
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
              <div className="border-t border-border p-4">
                <ChatInput onSubmit={handleSendMessage} isLoading={isLoading} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="summary" className="flex-1 overflow-y-auto py-4">
            <ExpenseSummary />
          </TabsContent>

          <TabsContent value="insights" className="flex-1 overflow-y-auto py-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="rounded-lg border border-border p-6 bg-gradient-to-br from-blue-50 to-blue-50/50 dark:from-blue-950/20 dark:to-blue-900/10">
                <h3 className="font-semibold text-lg mb-2">
                  Spending Insights
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Based on your recent conversations, here are personalized
                  recommendations to improve your financial health.
                </p>
                <ul className="space-y-3">
                  <li className="flex gap-3">
                    <span className="text-primary font-bold flex-shrink-0">
                      1.
                    </span>
                    <span className="text-sm">
                      <strong>Reduce discretionary spending:</strong> You're
                      spending 40% above the recommended budget for
                      entertainment.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-bold flex-shrink-0">
                      2.
                    </span>
                    <span className="text-sm">
                      <strong>Automate savings:</strong> Set up automatic
                      transfers of $100/week to build your emergency fund.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-bold flex-shrink-0">
                      3.
                    </span>
                    <span className="text-sm">
                      <strong>Track subscriptions:</strong> You have 5 monthly
                      subscriptions totaling $89. Consider canceling unused
                      ones.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
