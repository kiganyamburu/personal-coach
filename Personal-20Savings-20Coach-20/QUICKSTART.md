# Quick Start Guide

Get your Personal Savings Coach up and running in 5 minutes!

## ⚡ Fast Track Setup

### Step 1: Get Your API Keys (2 minutes)

#### Option A: Google Gemini (Easiest)

1. Go to https://makersuite.google.com/app/apikey
2. Click "Create API Key"
3. Copy the key

#### Option B: Vertex AI (Advanced)

1. Go to https://console.cloud.google.com/
2. Enable Vertex AI API
3. Set up billing

### Step 2: Get Firebase Credentials (2 minutes)

1. Go to https://console.firebase.google.com/
2. Click "Add project" or select existing
3. Go to Project Settings (⚙️ icon)
4. Scroll to "Your apps" → Click Web icon (</>)
5. Copy the config values

### Step 3: Configure Environment (1 minute)

Edit `.env` file:

```env
# Required: Google Gemini AI
GOOGLE_GEMINI_API_KEY=AIza...your-key-here

# Required: Firebase (from step 2)
VITE_FIREBASE_API_KEY=AIza...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123:web:abc

FIREBASE_PROJECT_ID=your-project-id
```

### Step 4: Set Up Firestore (30 seconds)

1. In Firebase Console, click "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (for development)
4. Select a region
5. Click "Enable"

### Step 5: Run the App!

```bash
pnpm dev
```

Visit http://localhost:8080

## 🎯 Quick Test

### Test Chat API

```bash
# Using PowerShell
Invoke-RestMethod -Uri "http://localhost:8080/api/chat" `
  -Method POST `
  -ContentType "application/json" `
  -Body '{"message":"Hello!", "userId":"test123"}'
```

### Test Expense Logging

```bash
Invoke-RestMethod -Uri "http://localhost:8080/api/expenses" `
  -Method POST `
  -ContentType "application/json" `
  -Body '{"userId":"test123","amount":50,"category":"groceries","description":"Weekly shopping"}'
```

## 💻 Add to Your UI

### Simple Chat Example

```typescript
// In any React component
import { useChat } from "@/hooks/use-chat";
import { useState } from "react";

function MyChatComponent() {
  const { sendMessage, loading } = useChat();
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const handleSend = async () => {
    const result = await sendMessage(message, "test-user");
    if (result) setResponse(result.response);
  };

  return (
    <div>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask me anything..."
      />
      <button onClick={handleSend} disabled={loading}>
        Send
      </button>
      {response && <div>{response}</div>}
    </div>
  );
}
```

### Simple Expense Logger

```typescript
import { useExpenses } from "@/hooks/use-expenses";

function ExpenseLogger() {
  const { logExpense } = useExpenses();

  const handleLog = async () => {
    await logExpense({
      userId: "test-user",
      amount: 25.50,
      category: "food",
      date: new Date().toISOString(),
    });
    alert("Expense logged!");
  };

  return <button onClick={handleLog}>Log Expense</button>;
}
```

## 📱 Next Steps

1. ✅ **Chat Page** - Add chat UI to `client/pages/Chat.tsx`
2. ✅ **Dashboard** - Show expenses in `client/pages/Dashboard.tsx`
3. ✅ **Insights** - Display AI insights with charts
4. ✅ **Auth** - Add login/signup flow (optional)

## 🆘 Troubleshooting

### "API key not valid"

- Double-check your Gemini API key in `.env`
- Make sure there are no extra spaces

### "Firebase: Error (auth/invalid-api-key)"

- Verify all VITE*FIREBASE*\* variables are set
- Check for typos in the API key

### "Permission denied" in Firestore

- Make sure you started in "test mode"
- Or add security rules in Firebase Console

### Server won't start

```bash
# Clear node_modules and reinstall
rm -rf node_modules
pnpm install
```

## 📚 Full Documentation

- `SETUP.md` - Complete setup guide
- `INTEGRATION.md` - Code examples
- `API.md` - API reference
- `INTEGRATION_COMPLETE.md` - What was added

## 🎉 That's It!

You now have:

- ✅ AI-powered chat
- ✅ Expense tracking
- ✅ Financial insights
- ✅ Real-time database
- ✅ Type-safe APIs

Start building your UI and let the AI handle the rest!
