import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useMeals } from '../context/MealContext';
import { useDebounce } from '../hooks/useDebounce';
import MealCard from '../components/MealCard';
import { MealCardSkeleton } from '../components/LoadingSkeleton';
import { Search, Filter } from 'lucide-react';

const Meals = () => {
  const { meals, loading, categories, selectedCategory, fetchMeals, filterByCategory } = useMeals();
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 300);

  useEffect(() => {
    fetchMeals(selectedCategory, debouncedSearch);
  }, [debouncedSearch, selectedCategory, fetchMeals]);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-heading font-bold text-3xl sm:text-4xl mb-3">
            Discover <span className="text-gradient">Nutritious Meals</span>
          </h1>
          <p className="text-text-secondary max-w-xl mx-auto">
            Browse our curated collection of healthy meals across multiple dietary categories.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-xl mx-auto mb-8"
        >
          <div className="relative">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search meals by name..."
              className="input-dark pl-12 pr-4"
              id="meal-search"
            />
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide"
        >
          <Filter size={16} className="text-text-secondary flex-shrink-0" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => filterByCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                selectedCategory === cat
                  ? 'bg-accent text-white shadow-glow-sm'
                  : 'bg-surface border border-card-border text-text-secondary hover:text-white hover:border-accent/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Meal Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <MealCardSkeleton key={i} />
            ))}
          </div>
        ) : meals.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 rounded-full bg-surface border border-card-border flex items-center justify-center mx-auto mb-4">
              <Search size={32} className="text-text-secondary" />
            </div>
            <h3 className="font-heading font-semibold text-lg text-white mb-2">No meals found</h3>
            <p className="text-text-secondary text-sm">Try adjusting your search or filter criteria.</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {meals.map((meal, index) => (
              <MealCard key={meal._id} meal={meal} index={index} />
            ))}
          </div>
        )}

        {/* Results count */}
        {!loading && meals.length > 0 && (
          <p className="text-text-secondary text-sm text-center mt-8">
            Showing {meals.length} meal{meals.length !== 1 ? 's' : ''}
            {selectedCategory !== 'All' ? ` in ${selectedCategory}` : ''}
          </p>
        )}
      </div>
    </div>
  );
};

export default Meals;
