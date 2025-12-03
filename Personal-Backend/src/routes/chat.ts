import { Router, Response } from "express";
import { Conversation } from "../models/Conversation";
import { Expense } from "../models/Expense";
import { detectIntent, generateResponse, ChatIntent } from "../config/genkit";
import { createError, asyncHandler } from "../middleware/errorHandler";
import { AuthRequest, ChatRequest, ChatResponse, ChatMessage } from "../types";

const router = Router();

/**
 * POST /api/chat
 * Handle chat messages with AI-powered responses
 */
router.post(
  "/",
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const { message, userId, conversationId } = req.body as ChatRequest;

    if (!message) {
      throw createError("Message is required", 400);
    }

    // Use authenticated userId if available, otherwise use provided userId
    const chatUserId = req.userId || userId || "anonymous";

    // Detect intent
    const intentResult = await detectIntent(message);

    // Get conversation history for context
    let context: Record<string, any> = {};
    let conversation = null;

    if (conversationId) {
      conversation = await Conversation.findById(conversationId);
      if (conversation && conversation.userId === chatUserId) {
        context = {
          previousMessages: conversation.messages.slice(-5) || [], // Last 5 messages
          userId: conversation.userId,
        };
      }
    }

    // If it's an expense query, fetch recent expenses
    if (intentResult.intent === ChatIntent.EXPENSE_QUERY && chatUserId !== "anonymous") {
      const recentExpenses = await Expense.find({ userId: chatUserId })
        .sort({ date: -1 })
        .limit(20)
        .lean();

      context.recentExpenses = recentExpenses.map((doc) => ({
        id: doc._id.toString(),
        userId: doc.userId,
        amount: doc.amount,
        category: doc.category,
        description: doc.description,
        date: doc.date,
        createdAt: doc.createdAt.toISOString(),
      }));
    }

    // Generate AI response
    const aiResponse = await generateResponse({
      message,
      intent: intentResult.intent,
      context,
      userId: chatUserId,
    });

    // Save or update conversation
    const newConversationId = conversationId || conversation?._id?.toString();
    let conversationDoc;

    if (newConversationId && conversation) {
      // Update existing conversation
      conversation.messages.push({
        role: "user",
        content: message,
        timestamp: new Date().toISOString(),
      });
      conversation.messages.push({
        role: "assistant",
        content: aiResponse.response,
        timestamp: new Date().toISOString(),
      });
      conversation.lastUpdated = new Date();
      conversation.intent = intentResult.intent;
      await conversation.save();
      conversationDoc = conversation;
    } else {
      // Create new conversation
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

      conversationDoc = new Conversation({
        userId: chatUserId,
        messages: [userMessage, assistantMessage],
        lastUpdated: new Date(),
        intent: intentResult.intent,
      });

      await conversationDoc.save();
    }

    const response: ChatResponse = {
      response: aiResponse.response,
      intent: intentResult.intent,
      conversationId: conversationDoc._id.toString(),
      action: aiResponse.action,
      data: aiResponse.data,
    };

    res.json(response);
  })
);

/**
 * GET /api/chat/:conversationId
 * Get conversation history
 */
router.get(
  "/:conversationId",
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const { conversationId } = req.params;

    if (!conversationId) {
      throw createError("Conversation ID is required", 400);
    }

    const conversation = await Conversation.findById(conversationId);

    if (!conversation) {
      throw createError("Conversation not found", 404);
    }

    // Optional: Verify conversation belongs to user if authenticated
    if (req.userId && conversation.userId !== req.userId) {
      throw createError("Unauthorized to access this conversation", 403);
    }

    res.json({
      id: conversation._id.toString(),
      userId: conversation.userId,
      messages: conversation.messages,
      lastUpdated: conversation.lastUpdated.toISOString(),
      intent: conversation.intent,
    });
  })
);

export default router;

