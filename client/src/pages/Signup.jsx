import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Lock, UserPlus, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const result = await register(username, email, password);
    if (result.success) {
      navigate('/');
    } else {
      setError(result.message);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 transition-colors duration-300">
      <div className="w-full max-w-md">
        <Link to="/login" className="inline-flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-primary-500 mb-8 font-bold transition-all hover:-translate-x-1 group">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Login
        </Link>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-900 p-8 sm:p-10 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-2xl transition-all duration-300"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-slate-800 dark:text-white mb-3">Join AI StudyHub</h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium">Create your personalized study plan in seconds.</p>
          </div>

          {error && (
            <div className="bg-rose-50 dark:bg-rose-900/20 border-2 border-rose-100 dark:border-rose-900/30 text-rose-600 dark:text-rose-400 p-4 rounded-2xl text-sm font-bold mb-8 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Username</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors pointer-events-none" size={20} />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-950 border-2 border-transparent focus:bg-white dark:focus:bg-slate-950 focus:border-primary-500 text-slate-900 dark:text-white rounded-2xl outline-none transition-all duration-300 font-medium placeholder:text-slate-400 shadow-sm"
                  placeholder="CoolStudent99"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Email address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors pointer-events-none" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-950 border-2 border-transparent focus:bg-white dark:focus:bg-slate-950 focus:border-primary-500 text-slate-900 dark:text-white rounded-2xl outline-none transition-all duration-300 font-medium placeholder:text-slate-400 shadow-sm"
                  placeholder="student@example.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors pointer-events-none" size={20} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-950 border-2 border-transparent focus:bg-white dark:focus:bg-slate-950 focus:border-primary-500 text-slate-900 dark:text-white rounded-2xl outline-none transition-all duration-300 font-medium placeholder:text-slate-400 shadow-sm"
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
                  Create Account <UserPlus size={20} />
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-slate-500 dark:text-slate-400 font-semibold mb-2">
            Already have an account? <Link to="/login" className="text-primary-600 dark:text-primary-400 font-black hover:underline underline-offset-4 decoration-2">Sign In</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
