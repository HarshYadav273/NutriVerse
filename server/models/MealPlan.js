import mongoose from 'mongoose';

const mealPlanSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    week: {
      type: String, // e.g. "2026-W24"
      required: true,
    },
    days: {
      mon: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Meal' }],
      tue: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Meal' }],
      wed: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Meal' }],
      thu: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Meal' }],
      fri: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Meal' }],
      sat: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Meal' }],
      sun: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Meal' }],
    },
  },
  {
    timestamps: true,
  }
);

// Compound index: one plan per user per week
mealPlanSchema.index({ userId: 1, week: 1 }, { unique: true });

const MealPlan = mongoose.model('MealPlan', mealPlanSchema);
export default MealPlan;
