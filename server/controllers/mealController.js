import Meal from '../models/Meal.js';

/**
 * GET /api/meals
 * Get all meals with optional category & search filters
 */
export const getMeals = async (req, res, next) => {
  try {
    const { category, search } = req.query;
    const filter = {};

    if (category && category !== 'All') {
      filter.category = category;
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const meals = await Meal.find(filter).sort({ createdAt: -1 });
    res.json(meals);
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/meals/:id
 * Get a single meal by ID
 */
export const getMealById = async (req, res, next) => {
  try {
    const meal = await Meal.findById(req.params.id);

    if (!meal) {
      res.status(404);
      throw new Error('Meal not found');
    }

    res.json(meal);
  } catch (error) {
    next(error);
  }
};
