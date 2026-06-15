import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Flame } from 'lucide-react';
import { formatCalories, formatMacro, calcMacroPercentages } from '../utils/formatCalories';

const MealCard = ({ meal, index = 0 }) => {
  const navigate = useNavigate();
  const { proteinPct, carbsPct, fatPct } = calcMacroPercentages(meal);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ scale: 1.03, y: -4 }}
      onClick={() => navigate(`/meals/${meal._id}`)}
      className="card-glow bg-surface cursor-pointer overflow-hidden group"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={meal.image}
          alt={meal.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface/90 to-transparent" />

        {/* Category Badge */}
        <span className="absolute top-3 left-3 bg-accent/90 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full">
          {meal.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <h3 className="font-heading font-semibold text-lg text-white line-clamp-1 group-hover:text-accent-light transition-colors">
          {meal.name}
        </h3>

        {/* Stats Row */}
        <div className="flex items-center gap-4 text-sm text-text-secondary">
          <div className="flex items-center gap-1.5">
            <Flame size={14} className="text-orange-400" />
            <span>{formatCalories(meal.calories)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock size={14} className="text-accent-light" />
            <span>{meal.prepTime} min</span>
          </div>
        </div>

        {/* Macros Bar */}
        <div className="space-y-2">
          <div className="macros-bar">
            <div
              className="bg-blue-500 transition-all duration-500"
              style={{ width: `${proteinPct}%` }}
              title={`Protein: ${formatMacro(meal.protein)}`}
            />
            <div
              className="bg-amber-400 transition-all duration-500"
              style={{ width: `${carbsPct}%` }}
              title={`Carbs: ${formatMacro(meal.carbs)}`}
            />
            <div
              className="bg-rose-500 transition-all duration-500"
              style={{ width: `${fatPct}%` }}
              title={`Fat: ${formatMacro(meal.fat)}`}
            />
          </div>

          {/* Macro Labels */}
          <div className="flex justify-between text-xs text-text-secondary">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              P: {formatMacro(meal.protein)}
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              C: {formatMacro(meal.carbs)}
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              F: {formatMacro(meal.fat)}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MealCard;
