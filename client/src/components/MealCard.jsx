import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Flame, ChevronRight } from 'lucide-react';
import { formatCalories, formatMacro, calcMacroPercentages } from '../utils/formatCalories';

const MealCard = ({ meal, index = 0 }) => {
  const navigate = useNavigate();
  const { proteinPct, carbsPct, fatPct } = calcMacroPercentages(meal);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -6 }}
      onClick={() => navigate(`/meals/${meal._id}`)}
      className="card-glow bg-surface cursor-pointer overflow-hidden group"
    >
      {/* Image — taller for more visual impact */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={meal.image}
          alt={meal.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        {/* Multiple gradient overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Category Badge */}
        <span className="absolute top-3 left-3 bg-accent/90 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
          {meal.category}
        </span>

        {/* Prep time badge */}
        <span className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1.5 rounded-full flex items-center gap-1">
          <Clock size={12} className="text-accent-light" />
          {meal.prepTime}m
        </span>

        {/* Hover arrow */}
        <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-accent/80 backdrop-blur-sm flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <ChevronRight size={16} className="text-white" />
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        <h3 className="font-heading font-semibold text-lg text-white line-clamp-1 group-hover:text-accent-light transition-colors">
          {meal.name}
        </h3>

        {/* Stats Row */}
        <div className="flex items-center gap-4 text-sm text-text-secondary">
          <div className="flex items-center gap-1.5">
            <Flame size={14} className="text-orange-400" />
            <span className="font-medium">{formatCalories(meal.calories)}</span>
          </div>
        </div>

        {/* Macros Bar */}
        <div className="space-y-2">
          <div className="macros-bar">
            <div
              className="bg-gradient-to-r from-blue-500 to-blue-400 transition-all duration-500"
              style={{ width: `${proteinPct}%` }}
              title={`Protein: ${formatMacro(meal.protein)}`}
            />
            <div
              className="bg-gradient-to-r from-amber-400 to-yellow-400 transition-all duration-500"
              style={{ width: `${carbsPct}%` }}
              title={`Carbs: ${formatMacro(meal.carbs)}`}
            />
            <div
              className="bg-gradient-to-r from-rose-500 to-pink-400 transition-all duration-500"
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
