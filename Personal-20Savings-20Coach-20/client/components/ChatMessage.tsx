import { cn } from "@/lib/utils";

export interface Message {
  id: string;
  content: string;
  sender: "user" | "assistant";
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.sender === "user";

  return (
    <div
      className={cn(
        "flex gap-3 animate-slide-up",
        isUser && "flex-row-reverse",
      )}
    >
      <div
        className={cn(
          "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold text-white",
          isUser ? "bg-primary" : "bg-secondary",
        )}
      >
        {isUser ? "U" : "A"}
      </div>
      <div className="flex-1 max-w-xs lg:max-w-md">
        <div
          className={cn(
            "rounded-lg px-4 py-3 break-words",
            isUser
              ? "bg-primary text-primary-foreground rounded-br-none"
              : "bg-muted text-foreground rounded-bl-none",
          )}
        >
          <p className="text-sm leading-relaxed">{message.content}</p>
        </div>
        <p
          className={cn(
            "text-xs text-muted-foreground mt-1",
            isUser && "text-right",
          )}
        >
          {message.timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </div>
  );
}
