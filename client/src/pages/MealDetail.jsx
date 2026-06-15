import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useMeals } from '../context/MealContext';
import NutritionChart from '../components/NutritionChart';
import { ChartSkeleton } from '../components/LoadingSkeleton';
import {
  ArrowLeft,
  Clock,
  Flame,
  ChefHat,
  Sparkles,
  CheckCircle2,
  CalendarPlus,
  Leaf,
} from 'lucide-react';
import toast from 'react-hot-toast';

// Static nutrition tips based on category
const nutritionTips = {
  'Veg': '🥬 Vegetarian meals are rich in fiber and antioxidants. Pair with whole grains for complete protein intake and better iron absorption.',
  'Protein': '💪 High-protein meals support muscle recovery and growth. Spread protein intake across meals for optimal absorption — aim for 20-40g per serving.',
  'Keto': '🥑 Keto meals keep your body in fat-burning mode. The healthy fats here promote satiety — pair with leafy greens for micronutrient balance.',
  'Low-Carb': '🥗 Low-carb eating stabilizes blood sugar and reduces cravings. These meals provide sustained energy without the post-meal crash.',
  'Mediterranean': '🫒 Mediterranean diet is linked to longevity and heart health. The olive oil and fish provide omega-3 fatty acids for brain function.',
  'Vegan': '🌱 Plant-based meals are packed with phytonutrients. Consider pairing with vitamin B12-fortified foods for complete nutrition.',
};

const MealDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectedMeal: meal, loading, fetchMealById } = useMeals();

  useEffect(() => {
    fetchMealById(id);
  }, [id, fetchMealById]);

  if (loading || !meal) {
    return (
      <div className="min-h-screen pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="h-72 skeleton mb-8" />
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="h-8 w-3/4 skeleton" />
              <div className="h-4 w-1/2 skeleton" />
              <div className="h-32 skeleton" />
            </div>
            <ChartSkeleton />
          </div>
        </div>
      </div>
    );
  }

  const tip = nutritionTips[meal.category] || '🍽️ A balanced meal provides essential macronutrients for energy, repair, and overall wellbeing.';

  return (
    <div className="min-h-screen pt-20 pb-16">
      {/* Hero Image */}
      <div className="relative h-72 sm:h-80 md:h-96 overflow-hidden">
        <img src={meal.image} alt={meal.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/60 to-transparent" />

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-24 left-4 sm:left-8 glass p-2.5 hover:bg-accent/20 transition-colors z-10"
        >
          <ArrowLeft size={20} className="text-white" />
        </button>

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
          <div className="max-w-4xl mx-auto">
            <span className="inline-block bg-accent/90 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">
              {meal.category}
            </span>
            <h1 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl text-white mb-3">{meal.name}</h1>
            <div className="flex items-center gap-5 text-text-secondary text-sm">
              <span className="flex items-center gap-1.5">
                <Flame size={16} className="text-orange-400" />
                {meal.calories} kcal
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={16} className="text-accent-light" />
                {meal.prepTime} min
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid md:grid-cols-2 gap-10">
          {/* Left: Info */}
          <div className="space-y-8">
            {/* Description */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <p className="text-text-secondary leading-relaxed">{meal.description}</p>
            </motion.div>

            {/* Ingredients */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="font-heading font-semibold text-xl text-white mb-4 flex items-center gap-2">
                <ChefHat size={20} className="text-accent-light" />
                Ingredients
              </h2>
              <div className="space-y-2">
                {meal.ingredients.map((ing, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-text-secondary">
                    <CheckCircle2 size={16} className="text-accent-light mt-0.5 flex-shrink-0" />
                    <span>{ing}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Steps */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="font-heading font-semibold text-xl text-white mb-4">Instructions</h2>
              <div className="space-y-4">
                {meal.steps.map((step, i) => (
                  <div key={i} className="flex gap-4 group">
                    <div className="w-8 h-8 rounded-lg bg-accent/20 border border-accent/30 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/30 transition-colors">
                      <span className="text-accent-light text-sm font-semibold">{i + 1}</span>
                    </div>
                    <p className="text-text-secondary text-sm leading-relaxed pt-1">{step}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Nutrition + Tip */}
          <div className="space-y-8">
            {/* Nutrition Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="glass-strong p-6"
            >
              <h2 className="font-heading font-semibold text-xl text-white mb-6 text-center">
                Nutrition Breakdown
              </h2>
              <NutritionChart
                protein={meal.protein}
                carbs={meal.carbs}
                fat={meal.fat}
                calories={meal.calories}
              />
            </motion.div>

            {/* Nutrition Tip (static, no auth needed) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="glass-strong p-6"
            >
              <h2 className="font-heading font-semibold text-lg text-white mb-3 flex items-center gap-2">
                <Sparkles size={18} className="text-amber-400" />
                Nutrition Tip
              </h2>
              <p className="text-text-secondary text-sm leading-relaxed">{tip}</p>
            </motion.div>

            {/* Add to Plan Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              onClick={() => {
                toast.success(`${meal.name} noted! Go to Planner to add it to your week.`);
                navigate('/planner');
              }}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              <CalendarPlus size={18} />
              Add to Meal Plan
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealDetail;
