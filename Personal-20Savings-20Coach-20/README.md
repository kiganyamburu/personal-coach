# 💰 Personal Savings Coach

An AI-powered financial coaching application that helps users track expenses, receive personalized savings advice, and gain insights into their spending patterns.

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=flat&logo=firebase&logoColor=black)
![Google AI](https://img.shields.io/badge/Google_AI-4285F4?style=flat&logo=google&logoColor=white)

## ✨ Features

### 🤖 AI-Powered Chat

- Natural language expense logging: "I spent KSH 500 on groceries"
- Intelligent intent detection and routing
- Contextual conversations with memory
- Personalized financial advice

### 💸 Expense Tracking

- Log expenses via chat or API
- Real-time data sync with Firebase Firestore
- Filter by date, category, and amount
- Categorized spending summaries

### 📊 Financial Insights

- AI-generated spending analysis
- Personalized savings recommendations
- Spending trends visualization
- Category breakdowns with percentages

### 🔐 User Management

- Firebase Authentication integration
- Secure user data storage
- Session management
- Multi-user support

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- Google Gemini API key ([Get one here](https://makersuite.google.com/app/apikey))
- Firebase project ([Create one here](https://console.firebase.google.com/))
-

### Installation

```bash
# Clone the repository
git clone https://github.com/kiganyamburu/Personal-20Savings-20Coach-20.git
cd Personal-20Savings-20Coach-20

# Install dependencies
pnpm install

# Configure environment variables
cp .env.example .env
# Edit .env with your credentials

# Start development server
pnpm dev
```

Visit http://localhost:8080

### Configuration

Create a `.env` file with:

```env
# Google Gemini AI
GOOGLE_GEMINI_API_KEY=your-gemini-api-key

# Firebase Client Config
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123:web:abc

# Firebase Server Config
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_SERVICE_ACCOUNT={"type":"service_account",...}
```

See [QUICKSTART.md](./QUICKSTART.md) for detailed setup instructions.

## 📖 Documentation

- **[QUICKSTART.md](./QUICKSTART.md)** - Get started in 5 minutes
- **[SETUP.md](./SETUP.md)** - Complete setup guide with Firebase & Google Cloud configuration
- **[INTEGRATION.md](./INTEGRATION.md)** - Code examples and integration patterns
- **[API.md](./API.md)** - Complete API reference
- **[AGENTS.md](./AGENTS.md)** - Project structure and architecture

## 🏗️ Tech Stack

### Frontend

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **TailwindCSS 3** - Styling
- **Radix UI** - Accessible component primitives
- **React Router 6** - Client-side routing
- **React Hook Form** - Form management

### Backend

- **Express** - Node.js server
- **Firebase Admin SDK** - Server-side Firebase
- **Google Generative AI** - Gemini AI integration
- **Zod** - Schema validation

### Services

- **Firebase Firestore** - NoSQL database
- **Firebase Authentication** - User management
- **Google Gemini AI** - Natural language processing
- **Vertex AI** - Advanced AI capabilities

## 📁 Project Structure

```
client/                   # React frontend
├── components/           # React components
│   ├── ui/              # Reusable UI components
│   ├── ChatInput.tsx
│   ├── ChatMessage.tsx
│   └── ExpenseSummary.tsx
├── hooks/               # Custom React hooks
│   ├── use-chat.ts
│   ├── use-expenses.ts
│   └── use-insights.ts
├── lib/                 # Utilities
│   └── firebase.ts      # Firebase client config
├── pages/               # Route components
│   ├── Index.tsx        # Home page
│   ├── Chat.tsx         # Chat interface
│   ├── Dashboard.tsx    # Expense dashboard
│   └── About.tsx
└── App.tsx              # App entry & routing

server/                  # Express backend
├── config/              # Service configurations
│   ├── firebase.ts      # Firebase Admin setup
│   └── genkit.ts        # AI workflows
├── routes/              # API handlers
│   ├── chat.ts          # Chat endpoints
│   ├── expenses.ts      # Expense CRUD
│   └── insights.ts      # AI insights
└── index.ts             # Server setup

shared/                  # Shared code
├── api.ts               # API interfaces
└── types.ts             # TypeScript types
```

## 🔌 API Endpoints

### Chat

```
POST   /api/chat                    # Send message to AI coach
GET    /api/chat/:conversationId    # Get conversation history
```

### Expenses

```
POST   /api/expenses                # Log new expense
GET    /api/expenses                # Query expenses (with filters)
GET    /api/expenses/summary/:userId # Get expense summary
DELETE /api/expenses/:expenseId     # Delete expense
```

### Insights

```
GET    /api/insights/:userId        # Get AI-powered insights
GET    /api/insights/:userId/trends # Get spending trends
```

See [API.md](./API.md) for detailed documentation.

## 💻 Usage Examples

### Using Chat Hook

```typescript
import { useChat } from "@/hooks/use-chat";

function ChatComponent() {
  const { sendMessage, loading, error } = useChat();

  const handleSend = async (message: string) => {
    const response = await sendMessage(message, userId);
    console.log(response?.response); // AI's reply
  };

  return <div>{/* Your chat UI */}</div>;
}
```

### Logging Expenses

```typescript
import { useExpenses } from "@/hooks/use-expenses";

function ExpenseForm() {
  const { logExpense } = useExpenses();

  const handleSubmit = async () => {
    await logExpense({
      userId: "user123",
      amount: 50.0,
      category: "groceries",
      description: "Weekly shopping",
      date: new Date().toISOString(),
    });
  };
}
```

### Getting Insights

```typescript
import { useInsights } from "@/hooks/use-insights";

function InsightsPanel() {
  const { getInsights } = useInsights();

  const insights = await getInsights("user123", {
    timeframe: "last 30 days",
  });

  // Display insights, recommendations, top categories
}
```

## 🛠️ Development

```bash
# Start dev server (client + server)
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run type checking
pnpm typecheck

# Run tests
pnpm test

# Format code
pnpm format.fix
```

## 🚢 Deployment

### Option 1: Netlify / Vercel

The app is configured for serverless deployment:

```bash
pnpm build
# Deploy dist/ folder
```

### Option 2: Traditional Server

```bash
pnpm build
pnpm start
```

### Option 3: Binary Executable

Package as standalone executable for Linux, macOS, or Windows.

## 🔐 Security

- Environment variables stored in `.env` (not committed)
- Firebase service account credentials protected
- Firestore security rules enforced
- API keys never exposed to client
- User authentication via Firebase Auth

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with [Fusion Starter](https://github.com/fusion-starter) template
- Powered by [Google Gemini AI](https://ai.google.dev/)
- Database by [Firebase](https://firebase.google.com/)
- UI components by [Radix UI](https://www.radix-ui.com/)
- Styled with [TailwindCSS](https://tailwindcss.com/)

## 📧 Contact

**GitHub:** [@kiganyamburu](https://github.com/kiganyamburu)  
**Project Link:** [https://github.com/kiganyamburu/Personal-20Savings-20Coach-20](https://github.com/kiganyamburu/Personal-20Savings-20Coach-20)

---

<div align="center">
  Made by P.K.Mburu for better financial wellness
</div>
