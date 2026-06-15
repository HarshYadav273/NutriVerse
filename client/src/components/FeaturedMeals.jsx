import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useMeals } from '../context/MealContext';
import { Flame, Clock, ArrowRight } from 'lucide-react';

const FeaturedMeals = () => {
  const { meals, loading, fetchMeals } = useMeals();
  const navigate = useNavigate();

  useEffect(() => {
    if (meals.length === 0) {
      fetchMeals();
    }
  }, [meals.length, fetchMeals]);

  // Show first 6 meals as featured
  const featured = meals.slice(0, 6);

  if (loading || featured.length === 0) {
    return (
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-accent-light text-sm font-semibold uppercase tracking-wider">Featured</span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl mt-3 mb-4">
              Discover Our <span className="text-gradient">Top Meals</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-80 skeleton rounded-2xl" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 relative">
      {/* Subtle background accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(123,79,212,0.08)_0%,_transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-accent-light text-sm font-semibold uppercase tracking-wider">Featured</span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl mt-3 mb-4">
            Discover Our <span className="text-gradient">Top Meals</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Handpicked nutritious recipes across multiple dietary categories — from keto to vegan, every meal is a masterpiece.
          </p>
        </motion.div>

        {/* Featured grid — mixed sizes for visual interest */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((meal, i) => (
            <motion.div
              key={meal._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              onClick={() => navigate(`/meals/${meal._id}`)}
              className={`relative group cursor-pointer overflow-hidden rounded-2xl ${
                i === 0 || i === 3 ? 'md:col-span-2 lg:col-span-1' : ''
              } ${i < 2 ? 'h-80 lg:h-96' : 'h-72 lg:h-80'}`}
            >
              {/* Image */}
              <img
                src={meal.image}
                alt={meal.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Category Badge */}
              <div className="absolute top-4 left-4">
                <span className="bg-accent/90 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
                  {meal.category}
                </span>
              </div>

              {/* Content Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-heading font-bold text-xl text-white mb-2 group-hover:text-accent-light transition-colors">
                  {meal.name}
                </h3>

                <div className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1.5 text-orange-300">
                    <Flame size={14} />
                    {meal.calories} kcal
                  </span>
                  <span className="flex items-center gap-1.5 text-purple-300">
                    <Clock size={14} />
                    {meal.prepTime} min
                  </span>
                </div>

                {/* Hover reveal — macros */}
                <div className="mt-3 flex gap-3 text-xs text-white/70 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <span className="bg-blue-500/30 backdrop-blur-sm px-2 py-1 rounded-lg">P: {meal.protein}g</span>
                  <span className="bg-amber-500/30 backdrop-blur-sm px-2 py-1 rounded-lg">C: {meal.carbs}g</span>
                  <span className="bg-rose-500/30 backdrop-blur-sm px-2 py-1 rounded-lg">F: {meal.fat}g</span>
                </div>
              </div>

              {/* Glow border on hover */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-accent/50 transition-colors duration-300" />
            </motion.div>
          ))}
        </div>

        {/* View all button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button
            onClick={() => navigate('/meals')}
            className="btn-outline inline-flex items-center gap-2 group"
          >
            View All Meals
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedMeals;
