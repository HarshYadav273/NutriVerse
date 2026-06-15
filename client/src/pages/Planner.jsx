import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  DndContext,
  closestCenter,
  DragOverlay,
  useSensor,
  useSensors,
  PointerSensor,
} from '@dnd-kit/core';
import { useDroppable, useDraggable } from '@dnd-kit/core';
import API from '../utils/api';
import { getCurrentWeek } from '../utils/formatCalories';
import { CalendarDays, Save, Loader2, Flame, X, Plus, GripVertical, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const DAYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const DAY_LABELS = { mon: 'Monday', tue: 'Tuesday', wed: 'Wednesday', thu: 'Thursday', fri: 'Friday', sat: 'Saturday', sun: 'Sunday' };

const STORAGE_KEY = 'nutriverse_meal_plan';

function DraggableMeal({ meal, id }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id, data: { meal } });
  const style = transform ? { transform: `translate(${transform.x}px, ${transform.y}px)` } : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`flex items-center gap-2 bg-surface border border-card-border rounded-xl px-3 py-2 cursor-grab active:cursor-grabbing hover:border-accent/50 transition-colors ${isDragging ? 'opacity-50' : ''}`}
    >
      <GripVertical size={14} className="text-text-secondary flex-shrink-0" />
      <img src={meal.image} alt="" className="w-8 h-8 rounded-lg object-cover flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-xs text-white font-medium truncate">{meal.name}</p>
        <p className="text-[10px] text-text-secondary">{meal.calories} kcal</p>
      </div>
    </div>
  );
}

function DroppableDay({ day, meals, onRemoveMeal }) {
  const { setNodeRef, isOver } = useDroppable({ id: day });
  const totalCalories = meals.reduce((sum, m) => sum + (m.calories || 0), 0);

  return (
    <div
      ref={setNodeRef}
      className={`bg-surface border rounded-card p-3 min-h-[160px] transition-all duration-200 ${
        isOver ? 'border-accent shadow-glow' : 'border-card-border'
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-heading font-semibold text-sm text-white">{DAY_LABELS[day]}</h3>
        {totalCalories > 0 && (
          <span className="text-[10px] text-accent-light bg-accent/10 px-2 py-0.5 rounded-full flex items-center gap-1">
            <Flame size={10} />
            {totalCalories}
          </span>
        )}
      </div>

      <div className="space-y-2">
        {meals.map((meal, idx) => (
          <div key={`${meal._id}-${idx}`} className="flex items-center gap-2 bg-bg/50 rounded-lg px-2 py-1.5 group">
            <img src={meal.image} alt="" className="w-7 h-7 rounded object-cover flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-white truncate">{meal.name}</p>
              <p className="text-[10px] text-text-secondary">{meal.calories} kcal</p>
            </div>
            <button
              onClick={() => onRemoveMeal(day, idx)}
              className="opacity-0 group-hover:opacity-100 text-text-secondary hover:text-red-400 transition-all"
            >
              <X size={14} />
            </button>
          </div>
        ))}

        {meals.length === 0 && (
          <div className="flex flex-col items-center justify-center py-6 text-text-secondary">
            <Plus size={16} className="mb-1 opacity-50" />
            <span className="text-[10px]">Drop meals here</span>
          </div>
        )}
      </div>
    </div>
  );
}

const Planner = () => {
  const [allMeals, setAllMeals] = useState([]);
  const [plan, setPlan] = useState(() => {
    // Load from localStorage on mount
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return { mon: [], tue: [], wed: [], thu: [], fri: [], sat: [], sun: [] };
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeMeal, setActiveMeal] = useState(null);
  const [activeTab, setActiveTab] = useState('mon');

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  // Load meals
  useEffect(() => {
    const load = async () => {
      try {
        const mealsRes = await API.get('/api/meals');
        setAllMeals(mealsRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // Save plan to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(plan));
  }, [plan]);

  const handleDragStart = (event) => {
    const meal = event.active.data.current.meal;
    setActiveMeal(meal);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveMeal(null);

    if (!over || !DAYS.includes(over.id)) return;

    const meal = active.data.current.meal;
    setPlan((prev) => ({
      ...prev,
      [over.id]: [...prev[over.id], meal],
    }));
  };

  const removeMeal = (day, index) => {
    setPlan((prev) => ({
      ...prev,
      [day]: prev[day].filter((_, i) => i !== index),
    }));
  };

  const savePlan = () => {
    setSaving(true);
    // Save is already handled by the useEffect above
    setTimeout(() => {
      setSaving(false);
      toast.success('Meal plan saved locally! 🎯');
    }, 500);
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
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8"
        >
          <div>
            <h1 className="font-heading font-bold text-3xl text-white flex items-center gap-3">
              <CalendarDays className="text-accent-light" />
              Meal Planner
            </h1>
            <p className="text-text-secondary text-sm mt-1">Week: {getCurrentWeek()} • Drag meals to plan your week</p>
          </div>
          <button
            onClick={savePlan}
            disabled={saving}
            className="btn-primary flex items-center gap-2 text-sm"
          >
            {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            Save Plan
          </button>
        </motion.div>

        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          <div className="grid lg:grid-cols-[280px_1fr] gap-6">
            {/* Meal Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-strong p-4 lg:max-h-[calc(100vh-180px)] lg:overflow-y-auto"
            >
              <h2 className="font-heading font-semibold text-sm text-white mb-3">Available Meals</h2>
              <div className="space-y-2">
                {allMeals.map((meal) => (
                  <DraggableMeal key={meal._id} id={`meal-${meal._id}`} meal={meal} />
                ))}
              </div>
            </motion.div>

            {/* Calendar Grid */}
            <div>
              {/* Mobile: Tabs */}
              <div className="lg:hidden flex gap-1 overflow-x-auto pb-3 mb-4 scrollbar-hide">
                {DAYS.map((day) => (
                  <button
                    key={day}
                    onClick={() => setActiveTab(day)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                      activeTab === day
                        ? 'bg-accent text-white'
                        : 'bg-surface text-text-secondary border border-card-border'
                    }`}
                  >
                    {DAY_LABELS[day].slice(0, 3)}
                  </button>
                ))}
              </div>

              {/* Mobile: Single Day */}
              <div className="lg:hidden">
                <DroppableDay day={activeTab} meals={plan[activeTab]} onRemoveMeal={removeMeal} />
              </div>

              {/* Desktop: Full Grid */}
              <div className="hidden lg:grid grid-cols-7 gap-3">
                {DAYS.map((day) => (
                  <DroppableDay key={day} day={day} meals={plan[day]} onRemoveMeal={removeMeal} />
                ))}
              </div>
            </div>
          </div>

          {/* Drag overlay */}
          <DragOverlay>
            {activeMeal && (
              <div className="flex items-center gap-2 bg-surface border border-accent rounded-xl px-3 py-2 shadow-glow">
                <img src={activeMeal.image} alt="" className="w-8 h-8 rounded-lg object-cover" />
                <div>
                  <p className="text-xs text-white font-medium">{activeMeal.name}</p>
                  <p className="text-[10px] text-text-secondary">{activeMeal.calories} kcal</p>
                </div>
              </div>
            )}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
};

export default Planner;
