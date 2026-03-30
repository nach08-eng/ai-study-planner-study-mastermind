import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Brain, Mail, Lock, LogIn, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    const result = await login(email, password);
    if (result.success) {
      navigate('/');
    } else {
      setError(result.message);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex font-sans selection:bg-primary-500 selection:text-white transition-colors duration-300">
      {/* Left Decoration (Hidden on mobile) */}
      <div className="hidden lg:flex w-1/2 bg-primary-600 relative overflow-hidden flex-col justify-center px-12 text-white">
        <div className="absolute top-0 left-0 w-full h-full bg-primary-700/30 opacity-50 backdrop-blur-3xl rounded-full translate-x-[-30%] translate-y-[-30%]" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-primary-500/30 opacity-50 backdrop-blur-3xl rounded-full translate-x-[30%] translate-y-[30%]" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 space-y-8"
        >
          <div className="bg-white/10 w-20 h-20 rounded-2xl flex items-center justify-center backdrop-blur-lg border border-white/20 shadow-2xl">
            <Brain size={48} className="text-white drop-shadow-md" />
          </div>
          <div>
            <h1 className="text-6xl font-black mb-6 tracking-tight leading-tight">Master Your <br/><span className="text-primary-200 underline decoration-primary-300 decoration-8 underline-offset-4">Study Efficiency</span></h1>
            <p className="text-lg text-primary-50/80 font-medium max-w-md leading-relaxed">
              Unlock the power of AI-driven scheduling and Spaced Repetition. Study smarter, not harder.
            </p>
          </div>

          <div className="flex gap-4">
            <div className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/20">
              <p className="text-3xl font-black">2.5x</p>
              <p className="text-sm font-bold opacity-80">FASTER RETENTION</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/20">
              <p className="text-3xl font-black">100%</p>
              <p className="text-sm font-bold opacity-80">PERSONALIZED</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 relative overflow-hidden">
        {/* Mobile Background Accents */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl lg:hidden" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-600/10 rounded-full blur-3xl lg:hidden" />

        <div className="w-full max-w-lg z-10">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl border border-white/20 dark:border-white/5 p-10 lg:p-12 rounded-[2.5rem] shadow-2xl dark:shadow-primary-900/10 transition-all duration-300"
          >
            <div className="mb-10 text-center sm:text-left">
              <div className="lg:hidden mb-6 flex justify-center">
                 <div className="bg-primary-600 p-3 rounded-2xl text-white shadow-xl">
                   <Brain size={32} />
                 </div>
              </div>
              <h2 className="text-3xl font-black text-slate-800 dark:text-white mb-2 leading-tight">Welcome Back!</h2>
              <p className="text-slate-500 dark:text-slate-400 font-medium">Ready to crush your goals today?</p>
            </div>

            <AnimatePresence mode="wait">
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }} 
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800/40 text-rose-600 dark:text-rose-400 p-4 rounded-2xl text-sm font-bold mb-8 flex items-center gap-3 shadow-sm"
                >
                   <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                   {error}
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Email address</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors pointer-events-none" size={20} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-950/50 border-2 border-transparent focus:bg-white dark:focus:bg-slate-950 focus:border-primary-500 text-slate-900 dark:text-white rounded-2xl outline-none transition-all duration-300 font-medium placeholder:text-slate-400 shadow-sm"
                    placeholder="student@example.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Password</label>
                  <a href="#" className="text-xs font-bold text-primary-500 hover:text-primary-600 transition-colors">Forgot?</a>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors pointer-events-none" size={20} />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-950/50 border-2 border-transparent focus:bg-white dark:focus:bg-slate-950 focus:border-primary-500 text-slate-900 dark:text-white rounded-2xl outline-none transition-all duration-300 font-medium placeholder:text-slate-400 shadow-sm"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 rounded-2xl flex items-center justify-center gap-3 text-lg font-bold text-white shadow-xl shadow-primary-500/25 transition-all duration-300 ${
                  isSubmitting 
                    ? 'bg-primary-400 cursor-not-allowed scale-[0.98]' 
                    : 'bg-primary-600 hover:bg-primary-500 hover:translate-y-[-2px] active:scale-95'
                }`}
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Sign In <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-10 sm:mt-12 pt-8 border-t border-slate-100 dark:border-white/5 text-center">
              <p className="text-slate-500 dark:text-slate-400 font-semibold mb-2">
                New to AI Study Planner?
              </p>
              <Link
                to="/signup"
                className="text-primary-600 dark:text-primary-400 font-black text-lg hover:underline underline-offset-4 decoration-2"
              >
                Create an account
              </Link>
            </div>
          </motion.div>
          
          <div className="mt-8 text-center text-slate-400 dark:text-slate-600 font-medium text-xs tracking-wider uppercase">
            Built with AI • Privacy First • Student Centric
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
