import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';

const NotFound = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-center px-4 relative overflow-hidden pt-20"
    >
      {/* Animated Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-violet-400/20 blur-[120px] mix-blend-multiply animate-blob"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-pink-400/20 blur-[120px] mix-blend-multiply animate-blob" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
          className="text-8xl md:text-9xl font-black text-slate-300"
        >
          404
        </motion.h1>
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-3xl md:text-5xl font-bold text-slate-800 mt-4 mb-6 tracking-tight"
        >
          Page Not Found
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-lg text-slate-500 max-w-md mx-auto mb-10"
        >
          Oops! The page you are looking for does not exist. It might have been moved or deleted.
        </motion.p>
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.8, type: 'spring' }}>
          <Link to="/dashboard" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-600 to-pink-500 text-white rounded-full font-bold text-lg shadow-lg shadow-purple-500/30 hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] hover:scale-105 transition-all duration-300">
            <Home size={20} /> Go to Dashboard
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default NotFound;