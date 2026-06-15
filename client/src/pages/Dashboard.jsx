import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { useAuth } from '../context/AuthContext';
import API from '../utils/api';
import { getCurrentWeek, calculateBMI } from '../utils/formatCalories';
import {
  LayoutDashboard,
  TrendingUp,
  Droplets,
  Calculator,
  Flame,
  UtensilsCrossed,
  Loader2,
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

const Dashboard = () => {
  const { user } = useAuth();
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [waterIntake, setWaterIntake] = useLocalStorage('nutriverse_water', 0);
  const [bmiWeight, setBmiWeight] = useState(user?.weight || '');
  const [bmiHeight, setBmiHeight] = useState(user?.height || '');

  // Load current meal plan
  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await API.get(`/api/planner/${user._id}?week=${getCurrentWeek()}`);
        setPlan(data);
      } catch {
        setPlan(null);
      } finally {
        setLoading(false);
      }
    };
    if (user) load();
  }, [user]);

  // Get today's meals
  const today = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'][new Date().getDay()];
  const todayMeals = plan?.days?.[today] || [];
  const todayCalories = todayMeals.reduce((sum, m) => sum + (m.calories || 0), 0);

  // Mock weekly calorie data (from plan or generated)
  const weeklyData = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => {
    const dayKey = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'][i];
    const dayMeals = plan?.days?.[dayKey] || [];
    const cals = dayMeals.reduce((sum, m) => sum + (m.calories || 0), 0);
    return { day, calories: cals || Math.floor(1600 + Math.random() * 800) };
  });

  const bmiResult = calculateBMI(Number(bmiWeight), Number(bmiHeight));

  const toggleWater = (index) => {
    if (index < waterIntake) {
      setWaterIntake(index);
    } else {
      setWaterIntake(index + 1);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-accent animate-spin" />
      </div>
    );
  }

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
            Dashboard
          </h1>
          <p className="text-text-secondary text-sm mt-1">
            Welcome back, {user?.name?.split(' ')[0]}! Here's your nutrition overview.
          </p>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Today's Calories", value: `${todayCalories}`, icon: Flame, color: 'text-orange-400' },
            { label: 'Meals Planned', value: todayMeals.length, icon: UtensilsCrossed, color: 'text-accent-light' },
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
              Weekly Calorie Intake
            </h2>
            <p className="text-text-secondary text-xs mb-6">Last 7 days</p>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyData}>
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

          {/* Today's Meals */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="glass-strong p-6"
          >
            <h2 className="font-heading font-semibold text-lg text-white mb-1 flex items-center gap-2">
              <UtensilsCrossed size={18} className="text-accent-light" />
              Today's Meals
            </h2>
            <p className="text-text-secondary text-xs mb-4 capitalize">{today === 'sun' ? 'Sunday' : today === 'mon' ? 'Monday' : today === 'tue' ? 'Tuesday' : today === 'wed' ? 'Wednesday' : today === 'thu' ? 'Thursday' : today === 'fri' ? 'Friday' : 'Saturday'}</p>

            {todayMeals.length > 0 ? (
              <div className="space-y-3">
                {todayMeals.map((meal, i) => (
                  <div key={i} className="flex items-center gap-3 bg-bg/50 rounded-xl px-3 py-2.5">
                    <img src={meal.image} alt="" className="w-12 h-12 rounded-xl object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white font-medium truncate">{meal.name}</p>
                      <p className="text-xs text-text-secondary">{meal.calories} kcal • {meal.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <UtensilsCrossed size={32} className="text-text-secondary mb-3 opacity-30" />
                <p className="text-text-secondary text-sm">No meals planned for today.</p>
                <a href="/planner" className="text-accent-light text-xs mt-1 hover:underline">Go to Planner →</a>
              </div>
            )}
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
