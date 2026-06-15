/**
 * Format calorie number with comma separator and unit
 * @param {number} calories - The calorie count
 * @returns {string} Formatted string like "1,200 kcal"
 */
export const formatCalories = (calories) => {
  if (calories === undefined || calories === null) return '0 kcal';
  return `${calories.toLocaleString()} kcal`;
};

/**
 * Format macros as grams
 * @param {number} grams - Macro amount in grams
 * @returns {string} Formatted string like "42g"
 */
export const formatMacro = (grams) => {
  if (grams === undefined || grams === null) return '0g';
  return `${Math.round(grams)}g`;
};

/**
 * Calculate macro percentages from total
 * @param {Object} macros - { protein, carbs, fat }
 * @returns {Object} { proteinPct, carbsPct, fatPct }
 */
export const calcMacroPercentages = ({ protein, carbs, fat }) => {
  const totalCals = (protein * 4) + (carbs * 4) + (fat * 9);
  if (totalCals === 0) return { proteinPct: 33, carbsPct: 34, fatPct: 33 };
  return {
    proteinPct: Math.round((protein * 4 / totalCals) * 100),
    carbsPct: Math.round((carbs * 4 / totalCals) * 100),
    fatPct: Math.round((fat * 9 / totalCals) * 100),
  };
};

/**
 * Get current ISO week string (e.g., "2026-W24")
 */
export const getCurrentWeek = () => {
  const now = new Date();
  const oneJan = new Date(now.getFullYear(), 0, 1);
  const days = Math.floor((now - oneJan) / 86400000);
  const weekNum = Math.ceil((days + oneJan.getDay() + 1) / 7);
  return `${now.getFullYear()}-W${String(weekNum).padStart(2, '0')}`;
};

/**
 * Calculate BMI
 * @param {number} weight - Weight in kg
 * @param {number} height - Height in cm
 * @returns {{ bmi: number, category: string, color: string }}
 */
export const calculateBMI = (weight, height) => {
  if (!weight || !height) return { bmi: 0, category: 'N/A', color: '#9CA3AF' };
  const heightM = height / 100;
  const bmi = weight / (heightM * heightM);
  let category, color;

  if (bmi < 18.5) { category = 'Underweight'; color = '#60A5FA'; }
  else if (bmi < 25) { category = 'Normal'; color = '#34D399'; }
  else if (bmi < 30) { category = 'Overweight'; color = '#FBBF24'; }
  else { category = 'Obese'; color = '#F87171'; }

  return { bmi: Math.round(bmi * 10) / 10, category, color };
};
