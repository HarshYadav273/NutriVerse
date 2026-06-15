import express from 'express';
import { getMeals, getMealById } from '../controllers/mealController.js';

const router = express.Router();

router.get('/', getMeals);
router.get('/:id', getMealById);

export default router;
