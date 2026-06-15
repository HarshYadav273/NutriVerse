import MealPlan from '../models/MealPlan.js';

/**
 * POST /api/planner
 * Save or update a weekly meal plan
 */
export const savePlan = async (req, res, next) => {
  try {
    const { week, days } = req.body;
    const userId = req.user._id;

    if (!week || !days) {
      res.status(400);
      throw new Error('Please provide week and days data');
    }

    // Upsert — create or update
    const plan = await MealPlan.findOneAndUpdate(
      { userId, week },
      { userId, week, days },
      { new: true, upsert: true, runValidators: true }
    ).populate('days.mon days.tue days.wed days.thu days.fri days.sat days.sun');

    res.status(200).json(plan);
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/planner/:userId
 * Get a user's meal plan (most recent or by week query param)
 */
export const getPlan = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { week } = req.query;

    const filter = { userId };
    if (week) filter.week = week;

    const plan = await MealPlan.findOne(filter)
      .sort({ createdAt: -1 })
      .populate('days.mon days.tue days.wed days.thu days.fri days.sat days.sun');

    if (!plan) {
      return res.json({ days: { mon: [], tue: [], wed: [], thu: [], fri: [], sat: [], sun: [] } });
    }

    res.json(plan);
  } catch (error) {
    next(error);
  }
};
