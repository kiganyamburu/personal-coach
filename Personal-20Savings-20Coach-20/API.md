# API Reference

Quick reference for all available API endpoints.

## Base URL

- Development: `http://localhost:8080/api`
- Production: `https://your-domain.com/api`

---

## 💬 Chat Endpoints

### POST /api/chat

Send a message to the AI coach and get a response.

**Request Body:**

```json
{
  "message": "I spent KSH 500 on groceries today",
  "userId": "user123",
  "conversationId": "conv-456" // Optional, for continuing a conversation
}
```

**Response:**

```json
{
  "response": "Great! I've noted that you spent KSH 500 on groceries...",
  "intent": "expense_log",
  "conversationId": "conv-456",
  "action": "log_expense", // Optional
  "data": {
    // Optional
    "amount": 50,
    "category": "groceries"
  }
}
```

**Possible Intents:**

- `greeting` - User is greeting or starting conversation
- `expense_log` - User wants to log an expense
- `expense_query` - User is asking about their expenses
- `savings_advice` - User wants financial advice
- `budget_help` - User needs help with budgeting
- `unknown` - Intent unclear

---

### GET /api/chat/:conversationId

Retrieve conversation history.

**Response:**

```json
{
  "id": "conv-456",
  "userId": "user123",
  "messages": [
    {
      "role": "user",
      "content": "Hello!",
      "timestamp": "2024-01-15T10:30:00Z"
    },
    {
      "role": "assistant",
      "content": "Hi! How can I help you today?",
      "timestamp": "2024-01-15T10:30:01Z"
    }
  ],
  "lastUpdated": "2024-01-15T10:30:01Z"
}
```

---

## 💰 Expense Endpoints

### POST /api/expenses

Log a new expense.

**Request Body:**

```json
{
  "userId": "user123",
  "amount": 50.0,
  "category": "groceries",
  "description": "Weekly shopping", // Optional
  "date": "2024-01-15T10:00:00Z" // Optional, defaults to now
}
```

**Response:**

```json
{
  "id": "expense-789",
  "userId": "user123",
  "amount": 50.0,
  "category": "groceries",
  "description": "Weekly shopping",
  "date": "2024-01-15T10:00:00Z",
  "message": "Expense logged successfully"
}
```

---

### GET /api/expenses

Get expenses for a user with optional filters.

**Query Parameters:**

- `userId` (required) - User ID
- `startDate` (optional) - ISO date string
- `endDate` (optional) - ISO date string
- `category` (optional) - Filter by category

**Example:**

```
GET /api/expenses?userId=user123&startDate=2024-01-01&category=groceries
```

**Response:**

```json
{
  "expenses": [
    {
      "id": "expense-789",
      "userId": "user123",
      "amount": 50.0,
      "category": "groceries",
      "description": "Weekly shopping",
      "date": "2024-01-15T10:00:00Z",
      "createdAt": "2024-01-15T10:00:00Z"
    }
  ],
  "total": 1
}
```

---

### GET /api/expenses/summary/:userId

Get expense summary for a user.

**Query Parameters:**

- `startDate` (optional) - ISO date string
- `endDate` (optional) - ISO date string

**Example:**

```
GET /api/expenses/summary/user123?startDate=2024-01-01&endDate=2024-01-31
```

**Response:**

```json
{
  "totalSpent": 450.75,
  "expenseCount": 15,
  "categoryBreakdown": [
    {
      "category": "groceries",
      "total": 200.0,
      "count": 5
    },
    {
      "category": "dining",
      "total": 150.75,
      "count": 8
    }
  ],
  "timeframe": {
    "start": "2024-01-01",
    "end": "2024-01-31"
  }
}
```

---

### DELETE /api/expenses/:expenseId

Delete an expense.

**Response:**

```json
{
  "message": "Expense deleted successfully"
}
```

---

## 📊 Insights Endpoints

### GET /api/insights/:userId

Get AI-powered financial insights.

**Query Parameters:**

- `startDate` (optional) - ISO date string
- `endDate` (optional) - ISO date string
- `timeframe` (optional) - Human-readable timeframe (e.g., "last 30 days")

**Example:**

```
GET /api/insights/user123?timeframe=last 30 days
```

**Response:**

```json
{
  "insights": [
    "You spent 40% of your budget on dining out this month",
    "Your grocery spending decreased by 15% compared to last month",
    "Weekend spending is 2x higher than weekdays"
  ],
  "recommendations": [
    "Consider meal planning to reduce dining expenses",
    "Try setting a weekly dining budget of KSH 500",
    "Look for grocery store promotions on weekends"
  ],
  "topCategories": [
    {
      "category": "dining",
      "amount": 300.0,
      "percentage": 40
    },
    {
      "category": "groceries",
      "amount": 250.0,
      "percentage": 33
    }
  ]
}
```

---

### GET /api/insights/:userId/trends

Get spending trends over time.

**Query Parameters:**

- `period` (optional) - `day`, `week`, or `month` (default: `month`)

**Example:**

```
GET /api/insights/user123/trends?period=month
```

**Response:**

```json
{
  "period": "month",
  "trends": [
    {
      "period": "2024-01",
      "amount": 450.75
    },
    {
      "period": "2024-02",
      "amount": 523.2
    },
    {
      "period": "2024-03",
      "amount": 389.5
    }
  ]
}
```

---

## 🔐 Authentication

All endpoints support optional authentication via Firebase Auth. To use authenticated requests:

1. Sign in using Firebase Authentication on the client
2. Get the ID token:
   ```typescript
   const user = auth.currentUser;
   const token = await user?.getIdToken();
   ```
3. Include in request headers:
   ```typescript
   fetch("/api/expenses", {
     headers: {
       Authorization: `Bearer ${token}`,
     },
   });
   ```

---

## ⚠️ Error Responses

All endpoints may return error responses:

```json
{
  "error": "Error message",
  "details": "Detailed error information"
}
```

**Common HTTP Status Codes:**

- `200` - Success
- `201` - Created
- `400` - Bad Request (missing parameters)
- `404` - Not Found
- `500` - Internal Server Error

---

## 📝 Common Expense Categories

Suggested categories for consistency:

- `groceries`
- `dining`
- `transportation`
- `utilities`
- `entertainment`
- `healthcare`
- `shopping`
- `housing`
- `education`
- `other`

---

## 🔄 Rate Limits

Currently no rate limits are enforced, but consider implementing them for production:

- Chat: 60 requests/minute
- Expenses: 100 requests/minute
- Insights: 30 requests/minute (due to AI processing)
