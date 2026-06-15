import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import {
  Menu,
  X,
  Home,
  UtensilsCrossed,
  Bot,
  CalendarDays,
  LayoutDashboard,
  User,
  LogOut,
  LogIn,
  UserPlus,
  ChevronDown,
} from 'lucide-react';

const navLinks = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'Meals', path: '/meals', icon: UtensilsCrossed },
  { name: 'AI Chat', path: '/ai-chat', icon: Bot },
  { name: 'Planner', path: '/planner', icon: CalendarDays },
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-strong">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
              <span className="text-white font-heading font-bold text-sm">N</span>
            </div>
            <span className="font-heading font-bold text-xl text-white group-hover:text-accent-light transition-colors">
              NutriVerse
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    isActive(link.path)
                      ? 'bg-accent/20 text-accent-light'
                      : 'text-text-secondary hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon size={16} />
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-white/5 transition-all"
                >
                  <div className="w-8 h-8 rounded-full bg-accent/30 border border-accent/50 flex items-center justify-center overflow-hidden">
                    {user.avatar ? (
                      <img src={user.avatar} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-accent-light text-sm font-semibold">
                        {user.name?.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <span className="text-sm text-white font-medium">{user.name?.split(' ')[0]}</span>
                  <ChevronDown size={14} className={`text-text-secondary transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-12 w-48 glass-strong py-2 shadow-glow-lg"
                    >
                      <Link
                        to="/profile"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-text-secondary hover:text-white hover:bg-white/5 transition-colors"
                      >
                        <User size={16} />
                        Profile
                      </Link>
                      <button
                        onClick={() => { logout(); setProfileOpen(false); }}
                        className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-white/5 transition-colors"
                      >
                        <LogOut size={16} />
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Link to="/login" className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-text-secondary hover:text-white transition-colors">
                  <LogIn size={16} />
                  Login
                </Link>
                <Link to="/register" className="btn-primary text-sm !py-2 !px-4 flex items-center gap-2">
                  <UserPlus size={16} />
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-xl hover:bg-white/5 transition-colors"
          >
            {mobileOpen ? <X size={24} className="text-white" /> : <Menu size={24} className="text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden glass-strong border-t border-card-border"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      isActive(link.path)
                        ? 'bg-accent/20 text-accent-light'
                        : 'text-text-secondary hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon size={18} />
                    {link.name}
                  </Link>
                );
              })}

              <div className="border-t border-card-border my-3" />

              {user ? (
                <>
                  <Link
                    to="/profile"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-text-secondary hover:text-white hover:bg-white/5"
                  >
                    <User size={18} />
                    Profile
                  </Link>
                  <button
                    onClick={() => { logout(); setMobileOpen(false); }}
                    className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm text-red-400 hover:text-red-300 hover:bg-white/5"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-text-secondary hover:text-white hover:bg-white/5"
                  >
                    <LogIn size={18} />
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-accent-light hover:text-white hover:bg-accent/10"
                  >
                    <UserPlus size={18} />
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
