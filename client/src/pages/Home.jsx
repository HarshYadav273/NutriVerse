import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Flame,
  Dumbbell,
  Apple,
  Bot,
  CalendarDays,
  BarChart3,
  ChevronRight,
  Sparkles,
  Star,
  ArrowRight,
  Zap,
  Heart,
  Target,
} from 'lucide-react';
import FeaturedMeals from '../components/FeaturedMeals';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.15 } },
  viewport: { once: true },
};

const floatingCards = [
  { icon: Flame, label: 'Calories', value: '2,100', color: 'from-orange-500 to-amber-500', delay: 0 },
  { icon: Dumbbell, label: 'Protein', value: '142g', color: 'from-blue-500 to-cyan-500', delay: 0.3 },
  { icon: Apple, label: 'Vitamins', value: 'A, C, D', color: 'from-emerald-500 to-green-500', delay: 0.6 },
];

const features = [
  {
    icon: Bot,
    title: 'AI Nutrition Assistant',
    description: 'Get personalized meal advice from our AI powered by advanced language models. Ask anything about nutrition.',
  },
  {
    icon: CalendarDays,
    title: 'Smart Meal Planner',
    description: 'Drag and drop meals into your weekly plan. Auto-calculated calories and macros for each day.',
  },
  {
    icon: BarChart3,
    title: 'Progress Dashboard',
    description: 'Track your calorie intake, water consumption, and BMI with beautiful interactive charts.',
  },
  {
    icon: Zap,
    title: '18+ Curated Recipes',
    description: 'Discover meals across 6 categories — Veg, Protein, Keto, Low-Carb, Mediterranean, and Vegan.',
  },
  {
    icon: Heart,
    title: 'Health First',
    description: 'Every recipe is nutritionist-reviewed with detailed macro and micronutrient breakdowns.',
  },
  {
    icon: Target,
    title: 'Goal Tracking',
    description: 'Set dietary goals and monitor your progress with detailed nutrition breakdowns per meal.',
  },
];

const steps = [
  { num: '01', title: 'Browse Meals', desc: 'Explore our curated collection of healthy meals across 6 dietary categories.' },
  { num: '02', title: 'Plan Your Week', desc: 'Build weekly meal plans with an intuitive drag-and-drop planner.' },
  { num: '03', title: 'Track & Thrive', desc: 'Monitor your nutrition, water intake, and BMI to reach your goals.' },
];

const testimonials = [
  { name: 'Sarah Chen', role: 'Fitness Enthusiast', text: "NutriVerse completely transformed how I approach meal planning. The AI assistant is like having a personal nutritionist 24/7!", rating: 5 },
  { name: 'Marcus Johnson', role: 'College Athlete', text: "The macro tracking and meal planner helped me hit my protein goals every single day. Game changer for my performance.", rating: 5 },
  { name: 'Priya Patel', role: 'Nutrition Student', text: "As someone studying nutrition, I'm impressed by the accuracy. The keto and Mediterranean meal selections are fantastic.", rating: 5 },
];

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* ─── HERO ─────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated BG */}
        <div className="absolute inset-0 gradient-bg" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(123,79,212,0.15)_0%,_transparent_70%)]" />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-accent/10 border border-accent/30 rounded-full px-4 py-1.5 mb-6"
              >
                <Sparkles size={14} className="text-accent-light" />
                <span className="text-sm text-accent-light font-medium">AI-Powered Nutrition Platform</span>
              </motion.div>

              <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-tight mb-6">
                Fuel Your Body.{' '}
                <span className="text-gradient">Power Your Life.</span>
              </h1>

              <p className="text-text-secondary text-lg sm:text-xl max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
                Discover nutritious meals, plan your diet with AI assistance, and track your health journey — all in one beautiful platform.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/meals" className="btn-primary text-base flex items-center justify-center gap-2 group">
                  Explore Meals
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/planner" className="btn-outline text-base flex items-center justify-center gap-2">
                  Plan Your Week
                  <ChevronRight size={18} />
                </Link>
              </div>

              {/* Stats */}
              <div className="flex gap-8 mt-10 justify-center lg:justify-start">
                {[
                  { value: '18+', label: 'Recipes' },
                  { value: '6', label: 'Categories' },
                  { value: 'AI', label: 'Powered' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-2xl font-heading font-bold text-white">{stat.value}</div>
                    <div className="text-xs text-text-secondary mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: Floating Cards */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative hidden lg:block h-[500px]"
            >
              {floatingCards.map((card, i) => {
                const Icon = card.icon;
                const positions = [
                  'top-4 right-8',
                  'top-40 left-4',
                  'bottom-16 right-16',
                ];
                const animations = ['animate-float', 'animate-float-delayed', 'animate-float-slow'];
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + card.delay, duration: 0.5 }}
                    className={`absolute ${positions[i]} ${animations[i]} glass-strong p-5 w-56`}
                  >
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-3`}>
                      <Icon size={20} className="text-white" />
                    </div>
                    <p className="text-text-secondary text-sm">{card.label}</p>
                    <p className="text-white font-heading font-bold text-2xl mt-1">{card.value}</p>
                  </motion.div>
                );
              })}

              {/* Decorative elements */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
              <div className="absolute top-20 left-20 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl" />
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-accent/50 flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-accent-light rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* ─── FEATURED MEALS ────────────────────────── */}
      <FeaturedMeals />

      {/* ─── FEATURES ─────────────────────────────── */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <span className="text-accent-light text-sm font-semibold uppercase tracking-wider">Features</span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl mt-3 mb-4">
              Everything You Need for{' '}
              <span className="text-gradient">Healthy Living</span>
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              From AI-powered meal advice to interactive tracking, NutriVerse gives you the complete toolkit for your nutrition journey.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={i}
                  variants={{ initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.5 }}
                  className="card-glow bg-surface p-6 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                    <Icon size={22} className="text-accent-light" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg text-white mb-2">{feature.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{feature.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─────────────────────────── */}
      <section className="py-24 bg-surface/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <span className="text-accent-light text-sm font-semibold uppercase tracking-wider">How It Works</span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl mt-3 mb-4">
              Start Your Journey in{' '}
              <span className="text-gradient">3 Simple Steps</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-accent/0 via-accent/50 to-accent/0" />

            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                className="text-center relative"
              >
                <div className="w-16 h-16 rounded-2xl bg-accent/20 border border-accent/40 flex items-center justify-center mx-auto mb-6 relative z-10">
                  <span className="font-heading font-bold text-xl text-accent-light">{step.num}</span>
                </div>
                <h3 className="font-heading font-semibold text-xl text-white mb-3">{step.title}</h3>
                <p className="text-text-secondary text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─────────────────────────── */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <span className="text-accent-light text-sm font-semibold uppercase tracking-wider">Testimonials</span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl mt-3 mb-4">
              Loved by{' '}
              <span className="text-gradient">Health Enthusiasts</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="glass p-6"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={16} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-text-secondary text-sm leading-relaxed mb-6">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center">
                    <span className="text-accent-light font-semibold text-sm">{t.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-text-secondary text-xs">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────── */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-strong p-12 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent" />
            <div className="relative z-10">
              <h2 className="font-heading font-bold text-3xl sm:text-4xl mb-4">
                Ready to Transform Your{' '}
                <span className="text-gradient">Nutrition?</span>
              </h2>
              <p className="text-text-secondary max-w-xl mx-auto mb-8">
                Start exploring delicious, healthy meals and take the first step toward a more balanced lifestyle.
              </p>
              <Link to="/meals" className="btn-primary text-base inline-flex items-center gap-2 group">
                Explore Meals Now
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
