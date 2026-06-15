import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';

import { AuthProvider } from './context/AuthContext';
import { MealProvider } from './context/MealContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Meals from './pages/Meals';
import MealDetail from './pages/MealDetail';
import AiChat from './pages/AiChat';
import Planner from './pages/Planner';
import Dashboard from './pages/Dashboard';

const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -12 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

function App() {
  const location = useLocation();

  return (
    <AuthProvider>
      <MealProvider>
        <div className="min-h-screen bg-bg flex flex-col">
          <Navbar />

          <main className="flex-1">
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<PageTransition><Home /></PageTransition>} />
                <Route path="/meals" element={<PageTransition><Meals /></PageTransition>} />
                <Route path="/meals/:id" element={<PageTransition><MealDetail /></PageTransition>} />
                <Route path="/ai-chat" element={<PageTransition><AiChat /></PageTransition>} />
                <Route path="/planner" element={<PageTransition><Planner /></PageTransition>} />
                <Route path="/dashboard" element={<PageTransition><Dashboard /></PageTransition>} />
              </Routes>
            </AnimatePresence>
          </main>

          <Footer />
        </div>

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#12121F',
              color: '#FFFFFF',
              border: '1px solid rgba(123, 79, 212, 0.3)',
              borderRadius: '12px',
              fontSize: '14px',
            },
            success: {
              iconTheme: { primary: '#7B4FD4', secondary: '#FFFFFF' },
            },
            error: {
              iconTheme: { primary: '#F43F5E', secondary: '#FFFFFF' },
            },
          }}
        />
      </MealProvider>
    </AuthProvider>
  );
}

export default App;
