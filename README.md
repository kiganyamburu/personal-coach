# 💰 Personal Savings Coach

> An AI-powered financial coaching application that helps users track expenses, receive personalized savings advice, and gain insights into their spending patterns.

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=flat&logo=firebase&logoColor=black)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)
![Google AI](https://img.shields.io/badge/Google_AI-4285F4?style=flat&logo=google&logoColor=white)

## 🎥 Demo

📹 **[Watch Demo Video](./demo/demo-video.mp4)**

> **Note**: Add your demonstration video file to the `demo/` folder in the project root.

## ✨ Features

- 🤖 **AI-Powered Chat** - Natural language expense logging and personalized financial advice
- 💸 **Expense Tracking** - Log and categorize expenses with real-time data sync
- 📊 **Financial Insights** - AI-generated spending analysis and savings recommendations
- 🔐 **Secure Authentication** - Firebase Authentication with session management
- 📱 **Responsive Design** - Works seamlessly across desktop and mobile devices
- 🎨 **Modern UI** - Built with TailwindCSS and Radix UI components

## 🏗️ Architecture

This project consists of two main applications:

### Personal-20Savings-20Coach-20 (Frontend + Server)

Full-stack application with React frontend and Express backend using Firebase/Firestore for data storage.

- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Express + Firebase Admin SDK
- **Database**: Firebase Firestore
- **AI**: Google Gemini + Vertex AI via Genkit
- **Deployment**: Netlify-ready

### Personal-Backend (Alternative Backend)

Standalone MongoDB-based backend with JWT authentication.

- **Backend**: Express + TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Auth**: JWT-based authentication
- **AI**: Google Gemini integration

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- Google Gemini API key ([Get one here](https://makersuite.google.com/app/apikey))
- **Option A**: Firebase project ([Create one here](https://console.firebase.google.com/))
- **Option B**: MongoDB instance (local or cloud)

### Installation

```bash
# Clone the repository
git clone https://github.com/kiganyamburu/personal-coach.git
cd personal-coach
```

### Option A: Firebase Backend (Recommended)

```bash
cd Personal-20Savings-20Coach-20

# Install dependencies
pnpm install

# Configure environment variables
# Create .env file with your Firebase and Gemini credentials
cp .env.example .env

# Edit .env with your credentials:
# GOOGLE_GEMINI_API_KEY=your-gemini-api-key
# VITE_FIREBASE_API_KEY=your-api-key
# VITE_FIREBASE_PROJECT_ID=your-project-id
# ... (see Configuration section below)

# Start development server
pnpm dev
```

Visit http://localhost:8080

### Option B: MongoDB Backend

```bash
# Terminal 1: Start the MongoDB backend
cd Personal-Backend
npm install
# Create .env file (see Personal-Backend/.env.example)
npm run dev

# Terminal 2: Start the frontend (pointing to MongoDB backend)
cd Personal-20Savings-20Coach-20
pnpm install
# Update API endpoint configuration to point to localhost:3000
pnpm dev
```

## ⚙️ Configuration

### Firebase Backend Configuration

Create `.env` in `Personal-20Savings-20Coach-20/`:

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

### MongoDB Backend Configuration

Create `.env` in `Personal-Backend/`:

```env
MONGODB_URI=mongodb://localhost:27017/personal-savings
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
GOOGLE_GEMINI_API_KEY=your-gemini-api-key-here
PORT=3000
NODE_ENV=development
```

## 📖 Documentation

### Frontend Application

- **[QUICKSTART.md](./Personal-20Savings-20Coach-20/QUICKSTART.md)** - Get started in 5 minutes
- **[SETUP.md](./Personal-20Savings-20Coach-20/SETUP.md)** - Complete setup guide
- **[API.md](./Personal-20Savings-20Coach-20/API.md)** - API reference
- **[INTEGRATION.md](./Personal-20Savings-20Coach-20/INTEGRATION.md)** - Integration patterns

### Backend Documentation

- **[Personal-Backend/README.md](./Personal-Backend/README.md)** - MongoDB backend documentation

## 🛠️ Tech Stack

### Frontend

- **React 18** with TypeScript
- **Vite** - Build tool and dev server
- **TailwindCSS 3** - Utility-first CSS
- **Radix UI** - Accessible component primitives
- **React Router 6** - Client-side routing
- **React Hook Form** - Form management with validation

### Backend (Firebase)

- **Express 5** - Node.js web framework
- **Firebase Admin SDK** - Server-side Firebase
- **Firebase Firestore** - NoSQL database
- **Google Generative AI** - Gemini AI integration
- **Genkit** - AI workflow orchestration
- **Zod** - Schema validation

### Backend (MongoDB Alternative)

- **Express 5** - Node.js web framework
- **MongoDB** with Mongoose ODM
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Google Generative AI** - Gemini AI integration

## 📁 Project Structure

```
personal-coach/
├── Personal-20Savings-20Coach-20/    # Main application (Firebase)
│   ├── client/                        # React frontend
│   │   ├── components/                # UI components
│   │   ├── hooks/                     # Custom React hooks
│   │   ├── lib/                       # Utilities & Firebase config
│   │   ├── pages/                     # Route components
│   │   └── App.tsx                    # App entry point
│   ├── server/                        # Express backend
│   │   ├── config/                    # Service configurations
│   │   ├── routes/                    # API endpoints
│   │   └── middleware/                # Auth & validation
│   ├── shared/                        # Shared types & interfaces
│   └── netlify/                       # Netlify serverless functions
│
├── Personal-Backend/                  # Alternative MongoDB backend
│   └── src/
│       ├── config/                    # Database & AI config
│       ├── middleware/                # Auth & error handling
│       ├── models/                    # Mongoose schemas
│       ├── routes/                    # API endpoints
│       └── types/                     # TypeScript definitions
│
└── README.md                          # This file
```

## 🔌 API Endpoints

### Chat

- `POST /api/chat` - Send message to AI coach
- `GET /api/chat/:conversationId` - Get conversation history

### Expenses

- `POST /api/expenses` - Log new expense
- `GET /api/expenses` - Query expenses (with filters)
- `GET /api/expenses/summary/:userId` - Get expense summary
- `DELETE /api/expenses/:expenseId` - Delete expense

### Insights

- `GET /api/insights/:userId` - Get AI-powered insights
- `GET /api/insights/:userId/trends` - Get spending trends

### Authentication (MongoDB Backend)

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

## 💻 Development Scripts

### Frontend Application

```bash
cd Personal-20Savings-20Coach-20
pnpm dev          # Start dev server
pnpm build        # Build for production
pnpm test         # Run tests
pnpm typecheck    # Type checking
```

### MongoDB Backend

```bash
cd Personal-Backend
npm run dev       # Start with hot reload
npm run build     # Build TypeScript
npm start         # Start production server
npm run typecheck # Type checking
```

## 🚢 Deployment

### Frontend + Firebase Backend (Netlify)

The application is configured for Netlify deployment:

```bash
cd Personal-20Savings-20Coach-20
pnpm build
# Deploy to Netlify (configure environment variables in Netlify dashboard)
```

### MongoDB Backend

Deploy to any Node.js hosting platform (Heroku, Railway, DigitalOcean, etc.):

```bash
cd Personal-Backend
npm run build
# Set environment variables on your hosting platform
npm start
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**kiganyamburu**

- GitHub: [@kiganyamburu](https://github.com/kiganyamburu)

## 🙏 Acknowledgments

- Google Gemini AI for intelligent financial coaching
- Firebase for backend infrastructure
- Radix UI for accessible components
- TailwindCSS for beautiful styling

---

**Need help?** Check out the [documentation](./Personal-20Savings-20Coach-20/README.md) or open an issue.
