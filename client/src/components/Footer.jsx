import { Link } from 'react-router-dom';
import { Heart, ExternalLink, MessageCircle, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-surface/50 border-t border-card-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-purple-600 flex items-center justify-center">
                <span className="text-white font-heading font-bold text-sm">N</span>
              </div>
              <span className="font-heading font-bold text-xl text-white">NutriVerse</span>
            </div>
            <p className="text-text-secondary text-sm leading-relaxed">
              Your AI-powered nutrition companion. Discover meals, plan your diet, and achieve your health goals.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-4">Explore</h4>
            <ul className="space-y-2">
              {[
                { name: 'Meals', path: '/meals' },
                { name: 'AI Assistant', path: '/ai-chat' },
                { name: 'Meal Planner', path: '/planner' },
                { name: 'Dashboard', path: '/dashboard' },
              ].map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-text-secondary hover:text-accent-light text-sm transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-4">Categories</h4>
            <ul className="space-y-2">
              {['Vegetarian', 'High Protein', 'Keto', 'Low Carb', 'Mediterranean', 'Vegan'].map((cat) => (
                <li key={cat}>
                  <span className="text-text-secondary text-sm">{cat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-4">Connect</h4>
            <div className="flex gap-3">
              {[
                { icon: ExternalLink, href: '#' },
                { icon: MessageCircle, href: '#' },
                { icon: Mail, href: '#' },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-10 h-10 rounded-xl bg-surface border border-card-border flex items-center justify-center text-text-secondary hover:text-accent-light hover:border-accent/50 transition-all"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-card-border mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-text-secondary text-sm">
            © {new Date().getFullYear()} NutriVerse. All rights reserved.
          </p>
          <p className="text-text-secondary text-sm flex items-center gap-1">
            Made with <Heart size={14} className="text-rose-500 fill-rose-500" /> for healthier lives
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
