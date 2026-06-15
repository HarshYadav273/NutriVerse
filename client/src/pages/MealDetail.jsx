import { useEffect, useState } from 'react';
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
  Loader2,
  CalendarPlus,
} from 'lucide-react';
import API from '../utils/api';
import toast from 'react-hot-toast';

const MealDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectedMeal: meal, loading, fetchMealById } = useMeals();
  const [aiTip, setAiTip] = useState('');
  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    fetchMealById(id);
  }, [id, fetchMealById]);

  // Fetch AI tip when meal loads
  useEffect(() => {
    const fetchAiTip = async () => {
      if (!meal) return;
      const token = localStorage.getItem('nutriverse_token');
      if (!token) return; // Only fetch for logged in users

      setAiLoading(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/ai/chat`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            message: `Give me a brief (2-3 sentences) nutrition tip about "${meal.name}" - mention one health benefit and one suggestion to make it even healthier. Be concise.`,
            history: [],
          }),
        });

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let tip = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const text = decoder.decode(value);
          const lines = text.split('\n').filter((l) => l.startsWith('data: '));
          for (const line of lines) {
            try {
              const data = JSON.parse(line.slice(6));
              if (data.content) {
                tip += data.content;
                setAiTip(tip);
              }
            } catch {}
          }
        }
      } catch {
        // Silently fail — AI tip is optional
      } finally {
        setAiLoading(false);
      }
    };

    fetchAiTip();
  }, [meal]);

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

          {/* Right: Nutrition + AI */}
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

            {/* AI Tip */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="glass-strong p-6"
            >
              <h2 className="font-heading font-semibold text-lg text-white mb-3 flex items-center gap-2">
                <Sparkles size={18} className="text-amber-400" />
                AI Nutrition Tip
              </h2>
              {aiLoading ? (
                <div className="flex items-center gap-2 text-text-secondary text-sm">
                  <Loader2 size={16} className="animate-spin" />
                  Generating tip...
                </div>
              ) : aiTip ? (
                <p className="text-text-secondary text-sm leading-relaxed">{aiTip}</p>
              ) : (
                <p className="text-text-secondary text-sm">
                  Sign in to get personalized AI nutrition tips for this meal.
                </p>
              )}
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
