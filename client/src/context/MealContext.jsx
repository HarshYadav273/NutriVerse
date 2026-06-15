import { createContext, useContext, useState, useCallback } from 'react';
import API from '../utils/api';

const MealContext = createContext(null);

export const useMeals = () => {
  const context = useContext(MealContext);
  if (!context) throw new Error('useMeals must be used within a MealProvider');
  return context;
};

const CATEGORIES = ['All', 'Veg', 'Protein', 'Keto', 'Low-Carb', 'Mediterranean', 'Vegan'];

export const MealProvider = ({ children }) => {
  const [meals, setMeals] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const fetchMeals = useCallback(async (category = '', search = '') => {
    setLoading(true);
    try {
      const params = {};
      if (category && category !== 'All') params.category = category;
      if (search) params.search = search;

      const { data } = await API.get('/api/meals', { params });
      setMeals(data);
    } catch (error) {
      console.error('Failed to fetch meals:', error);
      setMeals([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchMealById = useCallback(async (id) => {
    setLoading(true);
    try {
      const { data } = await API.get(`/api/meals/${id}`);
      setSelectedMeal(data);
      return data;
    } catch (error) {
      console.error('Failed to fetch meal:', error);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const filterByCategory = useCallback((category) => {
    setSelectedCategory(category);
    fetchMeals(category);
  }, [fetchMeals]);

  return (
    <MealContext.Provider
      value={{
        meals,
        selectedMeal,
        loading,
        categories: CATEGORIES,
        selectedCategory,
        fetchMeals,
        fetchMealById,
        filterByCategory,
        setSelectedCategory,
      }}
    >
      {children}
    </MealContext.Provider>
  );
};

export default MealContext;
