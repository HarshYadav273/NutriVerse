import mongoose from 'mongoose';

const mealSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Meal name is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['Veg', 'Protein', 'Keto', 'Low-Carb', 'Mediterranean', 'Vegan'],
    },
    calories: {
      type: Number,
      required: true,
    },
    protein: {
      type: Number,
      required: true,
    },
    carbs: {
      type: Number,
      required: true,
    },
    fat: {
      type: Number,
      required: true,
    },
    fiber: {
      type: Number,
      default: 0,
    },
    ingredients: {
      type: [String],
      required: true,
    },
    steps: {
      type: [String],
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    prepTime: {
      type: Number, // in minutes
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Text index for search
mealSchema.index({ name: 'text', description: 'text' });

const Meal = mongoose.model('Meal', mealSchema);
export default Meal;
