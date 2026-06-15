# 🥗 NutriVerse — Healthy Meal & Nutrition Platform

> AI-powered nutrition companion. Discover meals, plan your diet, and track your health goals.

![NutriVerse](https://img.shields.io/badge/NutriVerse-v1.0.0-7B4FD4?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![Express](https://img.shields.io/badge/Express-4-000000?style=flat-square&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-8-47A248?style=flat-square&logo=mongodb)
![Tailwind](https://img.shields.io/badge/Tailwind-3-06B6D4?style=flat-square&logo=tailwindcss)

---

## ✨ Features

- 🍽️ **Meal Discovery** — Browse 18+ curated meals across 6 dietary categories
- 🤖 **AI Nutrition Assistant** — Chat with NutriBot powered by Groq (Llama 3.3 70B)
- 📅 **Drag & Drop Meal Planner** — Plan your weekly meals with auto calorie tracking
- 📊 **Dashboard** — Track calories, BMI, and water intake with interactive charts
- 🔐 **Secure Auth** — JWT authentication with bcrypt password hashing
- 📱 **Fully Responsive** — Mobile-first design that looks great on all devices
- 🎨 **Premium Dark UI** — Glassmorphism, purple glow effects, smooth animations

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite + Tailwind CSS v3 + Framer Motion |
| Backend | Node.js + Express.js (REST API) |
| Database | MongoDB + Mongoose |
| Auth | JWT + bcryptjs |
| AI | Groq API (Llama 3.3 70B Versatile) |
| Charts | Recharts |
| DnD | @dnd-kit/core |
| Icons | Lucide React |
| Toasts | react-hot-toast |

## 📁 Project Structure

```
NutriVerse/
├── client/                     # React Frontend
│   ├── src/
│   │   ├── components/         # Navbar, MealCard, ChatBubble, NutritionChart...
│   │   ├── pages/              # Home, Meals, MealDetail, AiChat, Planner, Dashboard...
│   │   ├── context/            # AuthContext, MealContext
│   │   ├── hooks/              # useDebounce, useLocalStorage
│   │   ├── utils/              # api.js, formatCalories.js
│   │   └── index.css           # Tailwind + custom styles
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── server/                     # Express Backend
│   ├── controllers/            # Auth, Meals, Planner, AI, User controllers
│   ├── models/                 # User, Meal, MealPlan, ChatLog schemas
│   ├── routes/                 # API route definitions
│   ├── middleware/              # Auth middleware, error handler
│   ├── seed.js                 # Database seed script (18 meals)
│   └── server.js               # Express entry point
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (or local MongoDB)
- Groq API key (free at [console.groq.com](https://console.groq.com))

### 1. Clone the repository
```bash
git clone <repository-url>
cd NutriVerse
```

### 2. Setup Backend
```bash
cd server
cp .env.example .env
# Edit .env with your MongoDB URI, JWT secret, and Groq API key
npm install
npm run seed    # Seed database with 18 meals
npm run dev     # Starts on http://localhost:5000
```

### 3. Setup Frontend
```bash
cd client
cp .env.example .env
npm install
npm run dev     # Starts on http://localhost:5173
```

### 4. Open in browser
Visit `http://localhost:5173`

## 🔑 Environment Variables

### Server (.env)
```env
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/nutriverse
JWT_SECRET=your_jwt_secret_here
GROQ_API_KEY=gsk_your_groq_api_key
PORT=5000
```

### Client (.env)
```env
VITE_API_URL=http://localhost:5000
```

## 📡 API Endpoints

| Method | Route | Description | Auth |
|--------|-------|-------------|------|
| POST | `/api/auth/register` | Register new user | ❌ |
| POST | `/api/auth/login` | Login user | ❌ |
| GET | `/api/meals` | List meals (?category=&search=) | ❌ |
| GET | `/api/meals/:id` | Get meal details | ❌ |
| POST | `/api/planner` | Save weekly meal plan | ✅ |
| GET | `/api/planner/:userId` | Get user's meal plan | ✅ |
| POST | `/api/ai/chat` | Chat with NutriBot (SSE stream) | ✅ |
| GET | `/api/user/profile` | Get user profile | ✅ |
| PUT | `/api/user/profile` | Update user profile | ✅ |

## 🎨 Design System

| Token | Value |
|-------|-------|
| Background | `#0A0A14` |
| Surface | `#12121F` |
| Accent | `#7B4FD4` |
| Accent Light | `#A78BFA` |
| Text Primary | `#FFFFFF` |
| Text Secondary | `#9CA3AF` |
| Card Border | `rgba(123, 79, 212, 0.3)` |
| Border Radius | `16px` |
| Heading Font | Plus Jakarta Sans |
| Body Font | Inter |

## 🚢 Deployment

### Frontend (Netlify)
1. Build: `cd client && npm run build`
2. Deploy the `dist` folder to Netlify
3. Set environment variable: `VITE_API_URL=https://your-api.onrender.com`

### Backend (Render)
1. Create a new Web Service
2. Root directory: `server`
3. Build command: `npm install`
4. Start command: `npm start`
5. Add environment variables from `.env`

---

<p align="center">Made with 💜 for healthier lives</p>
