# Personal Backend

MongoDB backend for Personal Savings Coach application. Built with TypeScript, Express.js, and MongoDB.

## Features

- **MongoDB Integration**: Uses Mongoose ODM for database operations
- **JWT Authentication**: Secure token-based authentication
- **AI-Powered Chat**: Google Gemini integration for intelligent chat responses
- **Financial Insights**: AI-generated insights and recommendations
- **Expense Tracking**: Full CRUD operations for expense management
- **TypeScript**: Full type safety throughout the codebase

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- Google Gemini API key (for AI features)

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory:
```env
MONGODB_URI=mongodb://localhost:27017/personal-savings
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
GOOGLE_GEMINI_API_KEY=your-gemini-api-key-here
PORT=3000
NODE_ENV=development
```

3. Build the project:
```bash
npm run build
```

## Development

Run the development server with hot reload:
```bash
npm run dev
```

## Production

1. Build the project:
```bash
npm run build
```

2. Start the server:
```bash
npm start
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and get JWT token
- `GET /api/auth/me` - Get current user (requires authentication)

### Chat

- `POST /api/chat` - Send a message to the AI coach
- `GET /api/chat/:conversationId` - Get conversation history

### Expenses

- `POST /api/expenses` - Log a new expense
- `GET /api/expenses` - Get expenses with optional filters
- `GET /api/expenses/summary/:userId` - Get expense summary
- `DELETE /api/expenses/:expenseId` - Delete an expense

### Insights

- `GET /api/insights/:userId` - Get financial insights
- `GET /api/insights/:userId/trends` - Get spending trends

## Authentication

Most endpoints support optional authentication via JWT. To use authenticated requests:

1. Register or login to get a JWT token
2. Include the token in the Authorization header:
```
Authorization: Bearer <your-token>
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGODB_URI` | MongoDB connection string | Yes |
| `JWT_SECRET` | Secret key for JWT signing | Yes |
| `GOOGLE_GEMINI_API_KEY` | Google Gemini API key | Yes (for AI features) |
| `PORT` | Server port | No (default: 3000) |
| `NODE_ENV` | Environment (development/production) | No |

## Project Structure

```
src/
├── config/          # Configuration files (database, JWT, AI)
├── models/          # Mongoose models
├── routes/          # API route handlers
├── middleware/      # Express middleware
├── types/           # TypeScript type definitions
├── utils/           # Utility functions
└── index.ts         # Application entry point
```

## TypeScript

The project uses strict TypeScript configuration. Run type checking:
```bash
npm run typecheck
```

## Error Handling

All errors are handled consistently with proper HTTP status codes and error messages. The error handler middleware catches and formats all errors.

## License

ISC

