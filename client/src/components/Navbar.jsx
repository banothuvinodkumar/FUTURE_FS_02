import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const auth = useAuth() || {};
  const user = auth.user;
  const logout = auth.logout;
  
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100 py-4' : 'bg-transparent py-6'}`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="text-2xl font-black tracking-tighter">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 via-purple-600 to-pink-500 animate-gradient-x">
            LeadFlow.
          </span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          <Link to="/features" className="text-gray-600 hover:text-purple-600 transition-colors font-medium">Features</Link>
          <Link to="/contact" className="text-gray-600 hover:text-purple-600 transition-colors font-medium">Contact</Link>
        </div>
        <div className="hidden lg:flex items-center space-x-4">
          {user ? (
            <>
              <span className="hidden md:inline-block text-slate-600 font-medium mr-2">
                Hi, <span className="font-bold text-violet-600">{user.name || 'User'}</span>
              </span>
              <Link to="/dashboard" className="text-gray-600 hover:text-purple-600 transition-colors font-medium">Dashboard</Link>
              <button onClick={logout} className="text-gray-600 hover:text-pink-600 transition-colors font-medium">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-600 hover:text-purple-600 transition-colors font-medium hidden md:block">Log in</Link>
              <Link to="/login" state={{ mode: 'register' }} className="bg-gradient-to-r from-violet-600 to-pink-500 text-white px-6 py-2.5 rounded-full font-medium shadow-lg shadow-purple-500/30 hover:shadow-[0_0_20px_rgba(168,85,247,0.6)] transition-all hover:scale-105">
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="lg:hidden flex items-center">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-600 focus:outline-none p-2">
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-slate-100 shadow-xl overflow-hidden absolute w-full top-full left-0"
          >
            <div className="px-6 py-6 flex flex-col space-y-4">
              <Link to="/features" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-600 hover:text-violet-600 font-medium text-lg">Features</Link>
              <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-600 hover:text-violet-600 font-medium text-lg">Contact</Link>
              <hr className="border-slate-100 my-2" />
              {user ? (
                <>
                  <span className="text-slate-600 font-medium text-lg">Hi, <span className="font-bold text-violet-600">{user.name || 'User'}</span></span>
                  <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-600 hover:text-violet-600 font-medium text-lg">Dashboard</Link>
                  <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="text-left text-slate-600 hover:text-pink-600 font-medium text-lg">Logout</button>
                </>
              ) : (
                <div className="flex flex-col space-y-3 pt-2">
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="w-full py-3 text-center border border-slate-200 text-slate-600 rounded-xl font-medium hover:bg-slate-50 transition-colors">Log in</Link>
                  <Link to="/login" state={{ mode: 'register' }} onClick={() => setIsMobileMenuOpen(false)} className="w-full py-3 text-center bg-gradient-to-r from-violet-600 to-pink-500 text-white rounded-xl font-medium shadow-lg hover:shadow-purple-500/30 transition-all">Get Started</Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;