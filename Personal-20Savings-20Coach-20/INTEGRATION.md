# Integration Guide: Using Firebase, Vertex AI & Genkit

This guide shows you how to use the newly integrated services in your Personal Savings Coach app.

## 🎯 Client-Side Integration

### 1. Using Firebase Authentication

```typescript
import { getFirebaseClientAuth } from "@/lib/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

// Sign up
const auth = getFirebaseClientAuth();
const userCredential = await createUserWithEmailAndPassword(
  auth,
  email,
  password,
);
const userId = userCredential.user.uid;

// Sign in
const userCredential = await signInWithEmailAndPassword(auth, email, password);

// Sign out
await signOut(auth);
```

### 2. Using the Chat Hook

```typescript
import { useChat } from "@/hooks/use-chat";

function ChatComponent() {
  const { sendMessage, loading, error } = useChat();
  const [conversationId, setConversationId] = useState<string>();

  const handleSend = async (message: string) => {
    const response = await sendMessage(message, userId, conversationId);

    if (response) {
      setConversationId(response.conversationId);
      console.log("AI Response:", response.response);
      console.log("Detected Intent:", response.intent);

      // Handle specific actions
      if (response.action === "log_expense") {
        // Extract expense data from response.data
      }
    }
  };

  return (
    <div>
      {/* Your chat UI */}
      {loading && <p>Thinking...</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
}
```

### 3. Using the Expenses Hook

```typescript
import { useExpenses } from "@/hooks/use-expenses";

function ExpenseTracker() {
  const { logExpense, getExpenses, getSummary, loading } = useExpenses();

  // Log a new expense
  const handleLogExpense = async () => {
    await logExpense({
      userId: "user123",
      amount: 50.00,
      category: "groceries",
      description: "Weekly shopping",
      date: new Date().toISOString(),
    });
  };

  // Get all expenses
  const handleGetExpenses = async () => {
    const result = await getExpenses("user123", {
      startDate: "2024-01-01",
      category: "groceries",
    });

    if (result) {
      console.log(`Found ${result.total} expenses:`, result.expenses);
    }
  };

  // Get summary
  const handleGetSummary = async () => {
    const summary = await getSummary("user123", {
      startDate: "2024-01-01",
      endDate: "2024-12-31",
    });

    if (summary) {
      console.log(`Total spent: KSH ${summary.totalSpent}`);
      console.log("By category:", summary.categoryBreakdown);
    }
  };

  return (
    <div>
      {/* Your expense UI */}
      {loading && <p>Loading...</p>}
    </div>
  );
}
```

### 4. Using the Insights Hook

```typescript
import { useInsights } from "@/hooks/use-insights";

function InsightsPanel() {
  const { getInsights, getTrends, loading } = useInsights();
  const [insights, setInsights] = useState<FinancialInsights | null>(null);

  useEffect(() => {
    loadInsights();
  }, []);

  const loadInsights = async () => {
    const data = await getInsights("user123", {
      timeframe: "last 30 days",
    });

    if (data) {
      setInsights(data);
    }
  };

  return (
    <div>
      {insights && (
        <>
          <h2>Insights</h2>
          <ul>
            {insights.insights.map((insight, i) => (
              <li key={i}>{insight}</li>
            ))}
          </ul>

          <h2>Recommendations</h2>
          <ul>
            {insights.recommendations.map((rec, i) => (
              <li key={i}>{rec}</li>
            ))}
          </ul>

          <h2>Top Categories</h2>
          {insights.topCategories.map((cat) => (
            <div key={cat.category}>
              {cat.category}: KSH {cat.amount.toFixed(2)} ({cat.percentage}%)
            </div>
          ))}
        </>
      )}
    </div>
  );
}
```

### 5. Direct Firestore Access (Client-Side)

```typescript
import { getFirebaseClientDb } from "@/lib/firebase";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";

const db = getFirebaseClientDb();

// Query expenses
const expensesRef = collection(db, "expenses");
const q = query(
  expensesRef,
  where("userId", "==", userId),
  where("category", "==", "groceries"),
);
const snapshot = await getDocs(q);
const expenses = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

// Add a document
await addDoc(collection(db, "expenses"), {
  userId: "user123",
  amount: 25.5,
  category: "food",
  date: new Date().toISOString(),
});
```

## 🔧 Server-Side Usage

### Accessing Firestore in API Routes

```typescript
import { RequestHandler } from "express";
import { getFirestoreDb } from "../config/firebase";

export const myHandler: RequestHandler = async (req, res) => {
  const db = getFirestoreDb();

  // Query data
  const snapshot = await db
    .collection("expenses")
    .where("userId", "==", req.body.userId)
    .get();

  const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  res.json({ data });
};
```

### Using Genkit AI Flows

```typescript
import { detectIntent, generateResponse, generateInsights } from "../config/genkit";

// Detect what the user wants
const intentResult = await detectIntent("I spent KSH 500 on groceries");
// Returns: { intent: "expense_log", confidence: 0.95, entities: {...} }

// Generate a response
const response = await generateResponse({
  message: "How can I save more money?",
  intent: ChatIntent.SAVINGS_ADVICE,
  context: { previousMessages: [...] },
  userId: "user123",
});

// Get AI insights
const insights = await generateInsights({
  expenses: [...],
  totalSpent: 1234.56,
  timeframe: "last 30 days",
});
```

## 📊 Example Complete Flow

Here's a complete example of handling a user message:

```typescript
// Client side (React component)
function ChatInterface() {
  const { sendMessage } = useChat();
  const { logExpense } = useExpenses();
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const handleUserMessage = async (userInput: string) => {
    // Add user message to UI
    setMessages(prev => [...prev, {
      role: "user",
      content: userInput,
      timestamp: new Date().toISOString()
    }]);

    // Send to AI
    const response = await sendMessage(userInput, currentUserId);

    if (response) {
      // Add AI response to UI
      setMessages(prev => [...prev, {
        role: "assistant",
        content: response.response,
        timestamp: new Date().toISOString()
      }]);

      // Handle actions
      if (response.action === "log_expense" && response.data) {
        await logExpense({
          userId: currentUserId,
          amount: response.data.amount,
          category: response.data.category,
          description: response.data.description,
          date: new Date().toISOString(),
        });
      }
    }
  };

  return (
    <div>
      <div className="messages">
        {messages.map((msg, i) => (
          <div key={i} className={msg.role}>
            {msg.content}
          </div>
        ))}
      </div>
      <input onSubmit={(e) => handleUserMessage(e.target.value)} />
    </div>
  );
}
```

## 🔐 Authentication Flow

```typescript
import { getFirebaseClientAuth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

// Listen for auth state changes
const auth = getFirebaseClientAuth();

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in
    const userId = user.uid;
    const email = user.email;
    // Load user's expenses, start chat, etc.
  } else {
    // User is signed out
    // Redirect to login or show sign-in UI
  }
});
```

## 🎨 UI Integration Examples

### Chat Message Component

```typescript
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";

function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const { sendMessage, loading } = useChat();

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <ChatMessage key={i} message={msg} />
        ))}
        {loading && <div>AI is thinking...</div>}
      </div>
      <ChatInput onSend={(msg) => handleSend(msg)} />
    </div>
  );
}
```

### Expense Summary Component

```typescript
import { ExpenseSummary } from "@/components/ExpenseSummary";

function Dashboard() {
  const { getSummary } = useExpenses();
  const [summary, setSummary] = useState<ExpenseSummary | null>(null);

  useEffect(() => {
    getSummary("user123").then(setSummary);
  }, []);

  if (!summary) return <div>Loading...</div>;

  return (
    <ExpenseSummary
      totalSpent={summary.totalSpent}
      categories={summary.categoryBreakdown}
    />
  );
}
```

## 🚀 Best Practices

1. **Error Handling**: Always check for errors when using hooks
2. **Loading States**: Show loading indicators during API calls
3. **User Feedback**: Provide clear feedback for all actions
4. **Type Safety**: Use the shared types from `@shared/types`
5. **Security**: Never expose service account credentials to the client
6. **Caching**: Consider using React Query or SWR for data caching
7. **Real-time**: Use Firestore's `onSnapshot()` for real-time updates

## 📱 Next Steps

1. Implement the chat UI on the `/chat` page
2. Create an expense logging form on the `/dashboard` page
3. Add insights visualization using recharts
4. Set up user authentication flow
5. Add real-time updates with Firestore listeners
6. Create budget tracking features
7. Add data export functionality

## 🐛 Troubleshooting

### "Firebase not initialized"

Make sure you've set all environment variables in `.env`

### "Vertex AI API error"

1. Check that Vertex AI API is enabled in Google Cloud Console
2. Verify billing is set up
3. Confirm project ID matches

### "Permission denied" in Firestore

Update Firestore security rules in Firebase Console

### CORS errors

The server is already configured with CORS. Check that requests go to `/api/*`
