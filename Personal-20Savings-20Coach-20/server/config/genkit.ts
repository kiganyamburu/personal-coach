import { GoogleGenerativeAI } from "@google/generative-ai";
import { initializeFirebase } from "./firebase";

// Firebase will be initialized when server starts, not during config loading
// initializeFirebase(); // Removed - will be called in server/index.ts

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(
  process.env.GOOGLE_GEMINI_API_KEY || process.env.VERTEX_AI_API_KEY || "",
);

/**
 * Define intents for the chatbot
 */
export enum ChatIntent {
  GREETING = "greeting",
  EXPENSE_LOG = "expense_log",
  EXPENSE_QUERY = "expense_query",
  SAVINGS_ADVICE = "savings_advice",
  BUDGET_HELP = "budget_help",
  UNKNOWN = "unknown",
}

/**
 * Detect user intent from message using AI
 */
export async function detectIntent(message: string) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
Analyze the following user message and determine the intent. Classify it into one of these categories:
- greeting: User is greeting or starting a conversation
- expense_log: User wants to record/log an expense (e.g., "I spent KSH 500 on groceries")
- expense_query: User is asking about their expenses (e.g., "How much did I spend last week?")
- savings_advice: User is asking for financial advice or savings tips
- budget_help: User is asking for help with budgeting
- unknown: The intent is unclear

User message: "${message}"

Extract any relevant entities like amounts, categories, dates, etc.

Respond in JSON format with: intent, confidence (0-1), and entities (if any).
Example: {"intent": "expense_log", "confidence": 0.95, "entities": {"amount": 50, "category": "groceries"}}
    `;

    const result = await model.generateContent(prompt);
    const response = result.response.text();

    // Clean the response to get valid JSON
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    const parsed = jsonMatch
      ? JSON.parse(jsonMatch[0])
      : { intent: "unknown", confidence: 0.5 };

    return {
      intent: (parsed.intent as ChatIntent) || ChatIntent.UNKNOWN,
      confidence: parsed.confidence || 0.5,
      entities: parsed.entities || {},
    };
  } catch (error) {
    console.error("Error detecting intent:", error);
    return {
      intent: ChatIntent.UNKNOWN,
      confidence: 0.3,
      entities: {},
    };
  }
}

/**
 * Generate AI response based on intent and context
 */
export async function generateResponse(params: {
  message: string;
  intent: ChatIntent;
  context?: Record<string, any>;
  userId?: string;
}) {
  try {
    const { message, intent, context, userId } = params;
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    let systemPrompt = "";

    switch (intent) {
      case ChatIntent.GREETING:
        systemPrompt = `You are a friendly personal savings coach. Greet the user warmly and ask how you can help them with their finances today.`;
        break;
      case ChatIntent.EXPENSE_LOG:
        systemPrompt = `You are a personal savings coach. The user wants to log an expense. Extract the amount, category, and description from their message. Confirm the details and provide encouragement.`;
        break;
      case ChatIntent.EXPENSE_QUERY:
        systemPrompt = `You are a personal savings coach. The user is asking about their expenses. Use the context provided to answer their question. If context is missing, ask for clarification.`;
        break;
      case ChatIntent.SAVINGS_ADVICE:
        systemPrompt = `You are an expert financial advisor focused on savings. Provide practical, actionable advice based on the user's situation. Be encouraging and specific.`;
        break;
      case ChatIntent.BUDGET_HELP:
        systemPrompt = `You are a budgeting expert. Help the user create or manage their budget. Provide the 50/30/20 rule as a starting point if they're new to budgeting.`;
        break;
      default:
        systemPrompt = `You are a helpful personal savings coach. The user's intent is unclear. Ask clarifying questions to better understand how you can help.`;
    }

    const contextStr = context
      ? `\n\nContext: ${JSON.stringify(context, null, 2)}`
      : "";
    const fullPrompt = `${systemPrompt}\n\nUser: ${message}${contextStr}\n\nAssistant:`;

    const result = await model.generateContent(fullPrompt);
    const response = result.response.text();

    return {
      response,
      action: intent === ChatIntent.EXPENSE_LOG ? "log_expense" : undefined,
      data: context,
    };
  } catch (error) {
    console.error("Error generating response:", error);
    return {
      response:
        "I'm sorry, I'm having trouble processing your request right now. Please try again.",
      action: undefined,
      data: undefined,
    };
  }
}

/**
 * Provide financial insights based on expense data
 */
export async function generateInsights(params: {
  expenses: Array<{
    amount: number;
    category: string;
    description?: string;
    date: string;
  }>;
  totalSpent: number;
  timeframe: string;
}) {
  try {
    const { expenses, totalSpent, timeframe } = params;
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const prompt = `
As a financial advisor, analyze the following expense data and provide insights:

Timeframe: ${timeframe}
Total Spent: KSH ${totalSpent.toFixed(2)}
Number of Expenses: ${expenses.length}

Expenses by Category:
${JSON.stringify(expenses, null, 2)}

Please provide:
1. 3-5 key insights about spending patterns
2. 3-5 actionable recommendations for saving money
3. Top spending categories with percentages

Respond in JSON format with this structure:
{
  "insights": ["insight 1", "insight 2", ...],
  "recommendations": ["recommendation 1", "recommendation 2", ...],
  "topCategories": [
    {"category": "name", "amount": 100, "percentage": 25},
    ...
  ]
}
    `;

    const result = await model.generateContent(prompt);
    const response = result.response.text();

    // Clean the response to get valid JSON
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    const parsed = jsonMatch
      ? JSON.parse(jsonMatch[0])
      : {
          insights: ["Unable to generate insights at this time."],
          recommendations: ["Please try again later."],
          topCategories: [],
        };

    return parsed;
  } catch (error) {
    console.error("Error generating insights:", error);
    return {
      insights: [
        "Unable to generate insights. Please check your expenses and try again.",
      ],
      recommendations: ["Consider reviewing your spending patterns manually."],
      topCategories: [],
    };
  }
}

export default { detectIntent, generateResponse, generateInsights };
