# SpendWise – Full Stack Expense Tracker

SpendWise is a full-stack expense tracking application built as a solution for Exercise 2 (Mini Expense Tracker) from the Studio Graphene Full Stack Developer Assessment.

The application allows users to securely manage their personal expenses, categorize spending, view visual analytics, filter records, export data to CSV, and track spending habits through an intuitive dashboard.

---

## Live Demo

Frontend:
https://spend-wise-eta-seven.vercel.app/

Backend API:
https://spendwise-backend-thmu.onrender.com/

GitHub Repository:
https://github.com/harshitaj25/SpendWise

---

## Features

### Authentication
- User Signup
- User Login
- JWT-based Authentication
- Protected Expense Routes
- Multi-user Expense Isolation

### Expense Management
- Add Expense
- Edit Expense
- Delete Expense
- View Expense History
- Category Selection
- Notes Support

### Analytics
- Total Spending Summary
- Highest Expense Tracking
- Category-wise Expense Breakdown
- Pie Chart Visualization (Recharts)

### Filters
- Category Filter
- Date Range Filter
- Search Functionality

### Extra Features
- CSV Export
- Responsive Design
- Dark Mode Support
- SQLite Persistence
- Mobile-Friendly UI

---

## Tech Stack

### Frontend
- React.js
- Vite
- Axios
- Tailwind CSS
- Recharts
- React Toastify

### Backend
- Node.js
- Express.js
- JWT (jsonwebtoken)
- bcryptjs

### Database
- SQLite3

### Deployment
- Vercel (Frontend)
- Render (Backend)

---

## Why These Technologies?

### React + Vite
Fast development experience with modern React architecture.

### Express.js
Lightweight and simple REST API development.

### SQLite
Simple persistent database suitable for small full-stack applications.

### JWT Authentication
Secure user session management without server-side session storage.

### Recharts
Easy-to-use React charting library for expense visualization.

---

## How To Run Locally

### Clone Repository

```bash
git clone https://github.com/harshitaj25/SpendWise.git
cd SpendWise


### Backend Setup

cd server
npm install
npm run dev

### Frontend Setup

cd client
npm install
npm run dev

## API Documentation

POST /api/auth/signup

POST /api/auth/login

GET /api/expenses

POST /api/expenses

PUT /api/expenses/:id

DELETE /api/expenses/:id

GET /api/expenses/summary

## Project Structure

SpendWise
│
├── client
│   ├── src
│   │   ├── components
│   │   │   ├── ExpenseForm.jsx
│   │   │   ├── ExpenseList.jsx
│   │   │   ├── CategoryChart.jsx
│   │   │   ├── SummaryCards.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Signup.jsx
│   │   │
│   │   ├── services
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│
├── server
│   ├── routes
│   │   ├── authRoutes.js
│   │   └── expenseRoutes.js
│   │
│   ├── middleware
│   │   └── authMiddleware.js
│   │
│   ├── db
│   │   └── database.js
│   │
│   ├── data
│   │   └── expenses.db
│   │
│   └── index.js
│
└── README.md

## Future Improvements
Budget Tracking Per Category
Monthly Expense Reports
Dashboard Analytics
Recurring Expenses
User Profile Management
Password Reset Functionality
Unit Testing (Jest/Vitest)
Expense Receipt Uploads



Author
Harshita Jain

GitHub:
https://github.com/harshitaj25

LinkedIn:
https://www.linkedin.com/in/harshita-jain-635832274/
Advanced Charts and Trends
