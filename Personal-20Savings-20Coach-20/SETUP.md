# Personal Savings Coach - Setup Guide

This application integrates Firebase, Vertex AI, and Genkit to provide AI-powered financial coaching and expense tracking.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and pnpm
- A Google Cloud Platform account
- A Firebase project

### 1. Firebase Setup

1. **Create a Firebase Project**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Click "Add project" and follow the wizard
   - Enable Google Analytics (optional)

2. **Enable Firestore Database**
   - In your Firebase project, go to "Firestore Database"
   - Click "Create database"
   - Choose "Start in production mode" (or test mode for development)
   - Select a location close to your users

3. **Enable Firebase Authentication** (Optional)
   - Go to "Authentication" in Firebase Console
   - Click "Get started"
   - Enable the sign-in methods you want (Email/Password, Google, etc.)

4. **Get Firebase Web App Credentials**
   - In Firebase Console, go to Project Settings (gear icon)
   - Scroll to "Your apps" section
   - Click "Add app" and select "Web" (</> icon)
   - Register your app with a nickname
   - Copy the `firebaseConfig` object values

5. **Get Firebase Admin SDK Credentials**
   - In Firebase Console, go to Project Settings
   - Click "Service accounts" tab
   - Click "Generate new private key"
   - Save the JSON file securely (DO NOT commit to git)

### 2. Google Cloud / Vertex AI Setup

1. **Enable Vertex AI API**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Select your Firebase project (or create a new one)
   - Navigate to "APIs & Services" > "Library"
   - Search for "Vertex AI API" and enable it

2. **Set up Billing**
   - Vertex AI requires a billing account
   - Go to "Billing" in Cloud Console
   - Link a billing account to your project

3. **Note Your Project Details**
   - Project ID (same as Firebase project ID)
   - Preferred region (e.g., `us-central1`)

### 3. Environment Configuration

1. **Copy example files:**

   ```bash
   cp .env.example .env
   cp .env.client.example .env.client
   ```

2. **Update `.env` with server-side credentials:**

   ```env
   FIREBASE_PROJECT_ID=your-project-id
   FIREBASE_SERVICE_ACCOUNT={"type":"service_account","project_id":"...","private_key":"..."}
   GOOGLE_CLOUD_PROJECT_ID=your-project-id
   VERTEX_AI_LOCATION=us-central1
   ```

3. **Update `.env` with client-side credentials:**
   ```env
   VITE_FIREBASE_API_KEY=your-web-api-key
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
   VITE_FIREBASE_APP_ID=1:123456789:web:abcdef
   ```

### 4. Install Dependencies

```bash
pnpm install
```

### 5. Firestore Security Rules

Set up Firestore security rules in Firebase Console:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Expenses collection
    match /expenses/{expenseId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }

    // Conversations collection
    match /conversations/{conversationId} {
      allow read, write: if request.auth != null &&
        (request.auth.uid == resource.data.userId || resource.data.userId == "anonymous");
      allow create: if request.auth != null;
    }
  }
}
```

### 6. Run the Application

```bash
# Development mode
pnpm dev

# Production build
pnpm build
pnpm start
```

## 📡 API Endpoints

### Chat Endpoints

- `POST /api/chat` - Send a message to the AI coach
- `GET /api/chat/:conversationId` - Get conversation history

### Expense Endpoints

- `POST /api/expenses` - Log a new expense
- `GET /api/expenses?userId=X` - Get user's expenses
- `GET /api/expenses/summary/:userId` - Get expense summary
- `DELETE /api/expenses/:expenseId` - Delete an expense

### Insights Endpoints

- `GET /api/insights/:userId` - Get AI-powered financial insights
- `GET /api/insights/:userId/trends` - Get spending trends

## 🔧 Features Implemented

### ✅ Vertex AI (Google Cloud)

- AI-driven conversation using Gemini models
- Intent detection and classification
- Personalized financial insights and recommendations

### ✅ Genkit

- Structured chatbot workflows
- Intent detection (greeting, expense_log, expense_query, savings_advice, budget_help)
- Message routing and context management
- Type-safe AI flows with input/output schemas

### ✅ Firebase Firestore

- Real-time expense logging
- Conversation history storage
- User expense summaries
- Querying by date range, category, etc.

### ✅ Firebase Authentication (Optional)

- User account management
- Secure personal data
- Integration ready (configured in client/lib/firebase.ts)

## 🎯 Usage Examples

### Chat with AI Coach

```typescript
const response = await fetch("/api/chat", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    message: "I spent KSH 500 on groceries today",
    userId: "user123",
  }),
});
```

### Log an Expense

```typescript
const response = await fetch("/api/expenses", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    userId: "user123",
    amount: 50.0,
    category: "groceries",
    description: "Weekly shopping",
    date: new Date().toISOString(),
  }),
});
```

### Get Financial Insights

```typescript
const response = await fetch("/api/insights/user123?timeframe=last 30 days");
const insights = await response.json();
// Returns: { insights: [...], recommendations: [...], topCategories: [...] }
```

## 📝 Next Steps

1. **Customize AI Prompts**: Edit `server/config/genkit.ts` to adjust the AI's personality and responses
2. **Add More Intents**: Extend the `ChatIntent` enum for more specific use cases
3. **Implement Authentication**: Use Firebase Auth in your React components
4. **Add Charts**: Use the expense data with recharts for visualizations
5. **Set Budget Goals**: Create new API endpoints for budget management

## 🔐 Security Notes

- Never commit `.env` files to version control
- Keep Firebase service account JSON secure
- Use environment variables for all sensitive data
- Enable Firestore security rules in production
- Use Firebase Authentication for user verification

## 📚 Documentation Links

- [Firebase Documentation](https://firebase.google.com/docs)
- [Vertex AI Documentation](https://cloud.google.com/vertex-ai/docs)
- [Genkit Documentation](https://firebase.google.com/docs/genkit)
- [Firestore Guide](https://firebase.google.com/docs/firestore)
