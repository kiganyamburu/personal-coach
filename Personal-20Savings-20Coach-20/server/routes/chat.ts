import { RequestHandler } from "express";
import { getFirestoreDb } from "../config/firebase";
import { detectIntent, generateResponse, ChatIntent } from "../config/genkit";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

interface ChatRequest {
  message: string;
  userId?: string;
  conversationId?: string;
}

interface ChatResponse {
  response: string;
  intent: ChatIntent;
  conversationId: string;
  action?: string;
  data?: Record<string, any>;
}

/**
 * Handle chat messages with AI-powered responses
 */
export const handleChat: RequestHandler = async (req, res) => {
  try {
    const { message, userId, conversationId } = req.body as ChatRequest;

    if (!message) {
      res.status(400).json({ error: "Message is required" });
      return;
    }

    const db = getFirestoreDb();

    // Detect intent
    const intentResult = await detectIntent(message);

    // Get conversation history for context
    let context: Record<string, any> = {};
    if (conversationId) {
      const conversationRef = db
        .collection("conversations")
        .doc(conversationId);
      const conversationDoc = await conversationRef.get();
      if (conversationDoc.exists) {
        const data = conversationDoc.data();
        context = {
          previousMessages: data?.messages?.slice(-5) || [], // Last 5 messages
          userId: data?.userId,
        };
      }
    }

    // If it's an expense query, fetch recent expenses
    if (intentResult.intent === ChatIntent.EXPENSE_QUERY && userId) {
      const expensesSnapshot = await db
        .collection("expenses")
        .where("userId", "==", userId)
        .orderBy("date", "desc")
        .limit(20)
        .get();

      context.recentExpenses = expensesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    }

    // Generate AI response
    const aiResponse = await generateResponse({
      message,
      intent: intentResult.intent,
      context,
      userId,
    });

    // Save conversation to Firestore
    const newConversationId =
      conversationId || db.collection("conversations").doc().id;
    const conversationRef = db
      .collection("conversations")
      .doc(newConversationId);

    const userMessage: ChatMessage = {
      role: "user",
      content: message,
      timestamp: new Date().toISOString(),
    };

    const assistantMessage: ChatMessage = {
      role: "assistant",
      content: aiResponse.response,
      timestamp: new Date().toISOString(),
    };

    await conversationRef.set(
      {
        userId: userId || "anonymous",
        messages: [
          ...(context.previousMessages || []),
          userMessage,
          assistantMessage,
        ],
        lastUpdated: new Date().toISOString(),
        intent: intentResult.intent,
      },
      { merge: true },
    );

    const response: ChatResponse = {
      response: aiResponse.response,
      intent: intentResult.intent,
      conversationId: newConversationId,
      action: aiResponse.action,
      data: aiResponse.data,
    };

    res.json(response);
  } catch (error) {
    console.error("Error in chat handler:", error);
    res.status(500).json({
      error: "Failed to process chat message",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

/**
 * Get conversation history
 */
export const getConversation: RequestHandler = async (req, res) => {
  try {
    const { conversationId } = req.params;

    if (!conversationId) {
      res.status(400).json({ error: "Conversation ID is required" });
      return;
    }

    const db = getFirestoreDb();
    const conversationRef = db.collection("conversations").doc(conversationId);
    const conversationDoc = await conversationRef.get();

    if (!conversationDoc.exists) {
      res.status(404).json({ error: "Conversation not found" });
      return;
    }

    res.json({
      id: conversationDoc.id,
      ...conversationDoc.data(),
    });
  } catch (error) {
    console.error("Error getting conversation:", error);
    res.status(500).json({
      error: "Failed to get conversation",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
