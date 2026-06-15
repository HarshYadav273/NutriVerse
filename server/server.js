import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import mealRoutes from './routes/mealRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes — only meals and AI (no auth, no planner, no user routes)
app.use('/api/meals', mealRoutes);
app.use('/api/ai', aiRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handling
app.use(notFound);
app.use(errorHandler);

// Start server (no MongoDB needed!)
app.listen(PORT, () => {
  console.log(`🚀 NutriVerse API running on port ${PORT} (no database required)`);
});
