import { useState } from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { calculateBMI } from '../utils/formatCalories';
import {
  LayoutDashboard,
  TrendingUp,
  Droplets,
  Calculator,
  Flame,
  UtensilsCrossed,
  Activity,
} from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const WATER_GOAL = 8;

// Custom tooltip for charts
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-strong px-3 py-2 text-xs">
      <p className="text-text-secondary">{label}</p>
      <p className="text-accent-light font-semibold">{payload[0].value} kcal</p>
    </div>
  );
};

// Sample weekly data for demo
const sampleWeeklyData = [
  { day: 'Mon', calories: 1850 },
  { day: 'Tue', calories: 2100 },
  { day: 'Wed', calories: 1750 },
  { day: 'Thu', calories: 2300 },
  { day: 'Fri', calories: 1950 },
  { day: 'Sat', calories: 2200 },
  { day: 'Sun', calories: 1800 },
];

const Dashboard = () => {
  const [waterIntake, setWaterIntake] = useLocalStorage('nutriverse_water', 0);
  const [bmiWeight, setBmiWeight] = useState('');
  const [bmiHeight, setBmiHeight] = useState('');

  const bmiResult = calculateBMI(Number(bmiWeight), Number(bmiHeight));

  const toggleWater = (index) => {
    if (index < waterIntake) {
      setWaterIntake(index);
    } else {
      setWaterIntake(index + 1);
    }
  };

  // Aggregate stats from sample data
  const avgCalories = Math.round(sampleWeeklyData.reduce((s, d) => s + d.calories, 0) / 7);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-heading font-bold text-3xl text-white flex items-center gap-3">
            <LayoutDashboard className="text-accent-light" />
            Nutrition Dashboard
          </h1>
          <p className="text-text-secondary text-sm mt-1">
            Track your nutrition, hydration, and body metrics in one place.
          </p>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Avg Daily Calories', value: avgCalories.toLocaleString(), icon: Flame, color: 'text-orange-400' },
            { label: 'Weekly Meals', value: '21', icon: UtensilsCrossed, color: 'text-accent-light' },
            { label: 'Water Intake', value: `${waterIntake}/${WATER_GOAL}`, icon: Droplets, color: 'text-blue-400' },
            { label: 'BMI Score', value: bmiResult.bmi || '—', icon: Calculator, color: 'text-emerald-400' },
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="glass-strong p-4"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Icon size={16} className={stat.color} />
                  <span className="text-text-secondary text-xs">{stat.label}</span>
                </div>
                <p className="font-heading font-bold text-2xl text-white">{stat.value}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Calorie Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-strong p-6"
          >
            <h2 className="font-heading font-semibold text-lg text-white mb-1 flex items-center gap-2">
              <TrendingUp size={18} className="text-accent-light" />
              Weekly Calorie Overview
            </h2>
            <p className="text-text-secondary text-xs mb-6">Sample data — plan meals to see your actual intake</p>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sampleWeeklyData}>
                  <defs>
                    <linearGradient id="colorCal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7B4FD4" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#7B4FD4" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="day" tick={{ fill: '#9CA3AF', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#9CA3AF', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="calories" stroke="#7B4FD4" strokeWidth={2} fill="url(#colorCal)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Quick Tips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="glass-strong p-6"
          >
            <h2 className="font-heading font-semibold text-lg text-white mb-1 flex items-center gap-2">
              <Activity size={18} className="text-emerald-400" />
              Nutrition Tips
            </h2>
            <p className="text-text-secondary text-xs mb-4">Daily reminders for healthy living</p>

            <div className="space-y-3">
              {[
                { emoji: '🥤', tip: 'Drink at least 8 glasses of water daily for optimal hydration and metabolism.' },
                { emoji: '🥦', tip: 'Fill half your plate with vegetables for fiber, vitamins, and minerals.' },
                { emoji: '⏰', tip: 'Try to eat meals at consistent times — your body thrives on routine.' },
                { emoji: '🏃', tip: 'Pair good nutrition with 30 minutes of daily activity for best results.' },
                { emoji: '😴', tip: 'Quality sleep (7-9 hrs) is essential — poor sleep increases cravings.' },
                { emoji: '📝', tip: 'Use the meal planner to prep ahead — planned meals = healthier choices.' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 bg-bg/50 rounded-xl px-4 py-3">
                  <span className="text-lg flex-shrink-0 mt-0.5">{item.emoji}</span>
                  <p className="text-text-secondary text-sm leading-relaxed">{item.tip}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* BMI Calculator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-strong p-6"
          >
            <h2 className="font-heading font-semibold text-lg text-white mb-4 flex items-center gap-2">
              <Calculator size={18} className="text-accent-light" />
              BMI Calculator
            </h2>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="text-xs text-text-secondary mb-1 block">Weight (kg)</label>
                <input
                  type="number"
                  value={bmiWeight}
                  onChange={(e) => setBmiWeight(e.target.value)}
                  className="input-dark text-sm"
                  placeholder="70"
                  id="bmi-weight"
                />
              </div>
              <div>
                <label className="text-xs text-text-secondary mb-1 block">Height (cm)</label>
                <input
                  type="number"
                  value={bmiHeight}
                  onChange={(e) => setBmiHeight(e.target.value)}
                  className="input-dark text-sm"
                  placeholder="175"
                  id="bmi-height"
                />
              </div>
            </div>

            {bmiResult.bmi > 0 && (
              <div className="text-center">
                <div className="inline-flex flex-col items-center bg-bg/50 rounded-2xl px-8 py-5">
                  <span className="text-4xl font-heading font-bold" style={{ color: bmiResult.color }}>
                    {bmiResult.bmi}
                  </span>
                  <span className="text-sm font-medium mt-1" style={{ color: bmiResult.color }}>
                    {bmiResult.category}
                  </span>
                </div>

                {/* BMI scale bar */}
                <div className="mt-4 h-2 rounded-full overflow-hidden flex">
                  <div className="flex-1 bg-blue-400" />
                  <div className="flex-1 bg-green-400" />
                  <div className="flex-1 bg-yellow-400" />
                  <div className="flex-1 bg-red-400" />
                </div>
                <div className="flex justify-between text-[10px] text-text-secondary mt-1">
                  <span>Underweight</span>
                  <span>Normal</span>
                  <span>Overweight</span>
                  <span>Obese</span>
                </div>
              </div>
            )}
          </motion.div>

          {/* Water Tracker */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="glass-strong p-6"
          >
            <h2 className="font-heading font-semibold text-lg text-white mb-1 flex items-center gap-2">
              <Droplets size={18} className="text-blue-400" />
              Water Intake
            </h2>
            <p className="text-text-secondary text-xs mb-6">Goal: {WATER_GOAL} glasses per day</p>

            <div className="grid grid-cols-4 gap-3 mb-6">
              {Array.from({ length: WATER_GOAL }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => toggleWater(i)}
                  className={`aspect-square rounded-2xl border-2 flex items-center justify-center transition-all duration-300 ${
                    i < waterIntake
                      ? 'bg-blue-500/20 border-blue-400 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                      : 'bg-surface border-card-border text-text-secondary hover:border-blue-400/50'
                  }`}
                >
                  <Droplets size={24} className={i < waterIntake ? 'fill-blue-400' : ''} />
                </button>
              ))}
            </div>

            <div className="text-center">
              <span className="text-3xl font-heading font-bold text-white">{waterIntake}</span>
              <span className="text-text-secondary text-lg"> / {WATER_GOAL}</span>
              <p className="text-xs text-text-secondary mt-1">
                {waterIntake >= WATER_GOAL ? '🎉 Goal reached!' : `${WATER_GOAL - waterIntake} more to go`}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
