import mongoose, { Document, Schema } from "mongoose";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface IConversation extends Document {
  userId: string;
  messages: ChatMessage[];
  lastUpdated: Date;
  intent?: string;
}

const ConversationSchema = new Schema<IConversation>(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    messages: [
      {
        role: {
          type: String,
          enum: ["user", "assistant"],
          required: true,
        },
        content: {
          type: String,
          required: true,
        },
        timestamp: {
          type: String,
          required: true,
        },
      },
    ],
    lastUpdated: {
      type: Date,
      default: Date.now,
      index: true,
    },
    intent: {
      type: String,
    },
  },
  {
    timestamps: false,
  }
);

// Compound index for efficient queries
ConversationSchema.index({ userId: 1, lastUpdated: -1 });

export const Conversation = mongoose.model<IConversation>(
  "Conversation",
  ConversationSchema
);

