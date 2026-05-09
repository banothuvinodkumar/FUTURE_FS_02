import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
);

const EyeOffIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>
);

const LoaderIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
);

const LoginPage = () => {
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(location.state?.mode === 'register' ? false : true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    let success = false;
    
    if (isLogin) {
      success = await login(email, password);
    } else {
      success = await register(name, email, password);
    }
    
    setIsLoading(false);
    
    if (success) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
      {/* Animated Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-violet-600/30 blur-[120px] mix-blend-screen animate-blob"></div>
        <div className="absolute top-[20%] right-[-20%] w-[50%] h-[50%] rounded-full bg-fuchsia-600/30 blur-[120px] mix-blend-screen animate-blob" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-[-20%] left-[20%] w-[50%] h-[50%] rounded-full bg-blue-600/30 blur-[120px] mix-blend-screen animate-blob" style={{ animationDelay: '4s' }}></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8 relative z-10 bg-white/10 backdrop-blur-xl p-8 sm:p-10 rounded-[2.5rem] border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]"
      >
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white tracking-tight mb-2">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-sm text-slate-300">
            {isLogin ? 'Sign in to access your CRM' : 'Register to start managing leads'}
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <AnimatePresence>
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="relative group overflow-hidden"
                >
                  <input
                    type="text"
                    required={!isLogin}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-300 hover:bg-white/10"
                    placeholder="Full Name"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="relative group">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-300 hover:bg-white/10"
                placeholder="Email Address"
              />
            </div>

            <div className="relative group">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-300 hover:bg-white/10"
                placeholder="Password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-5 flex items-center text-slate-400 hover:text-white transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-4 px-4 border border-transparent rounded-2xl shadow-lg text-sm font-bold text-white bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 focus:ring-offset-slate-900 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_20px_rgba(139,92,246,0.5)]"
            >
              {isLoading ? <LoaderIcon /> : (isLogin ? 'Sign In' : 'Sign Up')}
            </button>
          </div>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-slate-300">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="font-medium text-violet-400 hover:text-violet-300 transition-colors focus:outline-none"
            >
              {isLogin ? 'Register now' : 'Sign in'}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;