import express from 'express';
import { savePlan, getPlan } from '../controllers/plannerController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, savePlan);
router.get('/:userId', protect, getPlan);

export default router;
