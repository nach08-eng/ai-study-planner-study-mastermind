import React, { useState, useEffect, useRef } from 'react';
import Layout from '../components/Layout/Layout';
import { Play, Pause, RotateCcw, Coffee, Zap, Info, Clock, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Focus = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [sessionType, setSessionType] = useState('focus'); // 'focus', 'short_break', 'long_break'
  const [completedSessions, setCompletedSessions] = useState(0);
  const timerRef = useRef(null);

  const settings = {
    focus: 25 * 60,
    short_break: 5 * 60,
    long_break: 15 * 60
  };

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleSessionComplete();
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isActive, timeLeft]);

  const handleSessionComplete = () => {
    setIsActive(false);
    clearInterval(timerRef.current);
    
    if (sessionType === 'focus') {
      setCompletedSessions(prev => prev + 1);
      alert('Focus session complete! Take a break.');
    } else {
      alert('Break over! Time to focus.');
    }
  };

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(settings[sessionType]);
  };

  const changeSessionType = (type) => {
    setSessionType(type);
    setIsActive(false);
    setTimeLeft(settings[type]);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((settings[sessionType] - timeLeft) / settings[sessionType]) * 100;

  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-slate-800 dark:text-white mb-4">Focus Mode 🧘</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Use the Pomodoro technique to maintain peak productivity.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Timer */}
          <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-slate-800 p-12 shadow-2xl relative overflow-hidden transition-all duration-300">
            {/* Background Decorative Circles */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/5 rounded-full blur-3xl -mr-20 -mt-20" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-500/5 rounded-full blur-3xl -ml-20 -mb-20" />

            {/* Session Type Selectors */}
            <div className="flex justify-center gap-3 mb-16 relative z-10">
              {['focus', 'short_break', 'long_break'].map((type) => (
                <button
                  key={type}
                  onClick={() => changeSessionType(type)}
                  className={`px-6 py-2.5 rounded-2xl text-sm font-bold transition-all duration-300 ${
                    sessionType === type 
                      ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30 ring-2 ring-primary-500/20' 
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {type.replace('_', ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                </button>
              ))}
            </div>

            {/* Circular Timer Visualization */}
            <div className="relative flex justify-center items-center mb-16">
              <svg className="w-80 h-80 sm:w-96 sm:h-96 transform -rotate-90">
                <circle
                  cx="50%"
                  cy="50%"
                  r="45%"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  className="text-slate-100 dark:text-slate-800"
                />
                <motion.circle
                  cx="50%"
                  cy="50%"
                  r="45%"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray="100 100"
                  strokeLinecap="round"
                  className="text-primary-500 drop-shadow-[0_0_8px_rgba(14,165,233,0.5)]"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 - timeLeft / settings[sessionType] }}
                  transition={{ duration: 0.5, ease: "linear" }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.span 
                  key={timeLeft}
                  initial={{ opacity: 0.8, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-7xl sm:text-8xl font-black text-slate-800 dark:text-white tabular-nums tracking-tight"
                >
                  {formatTime(timeLeft)}
                </motion.span>
                <span className="text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest text-sm mt-2">
                  {sessionType === 'focus' ? 'Time to work' : 'Relaxing'}
                </span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex justify-center items-center gap-8 relative z-10">
              <button 
                onClick={resetTimer}
                className="p-4 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-90 transition-all shadow-sm"
                title="Reset timer"
              >
                <RotateCcw size={24} />
              </button>
              <button 
                onClick={toggleTimer}
                className={`p-8 rounded-[2rem] text-white shadow-xl transition-all active:scale-95 flex items-center justify-center outline-none ring-8 ring-offset-0 ${
                  isActive 
                    ? 'bg-rose-500 shadow-rose-500/20 ring-rose-500/5' 
                    : 'bg-primary-500 shadow-primary-500/20 ring-primary-500/5'
                }`}
              >
                {isActive ? <Pause size={40} fill="currentColor" /> : <Play size={40} fill="currentColor" className="ml-1" />}
              </button>
              <button 
                className="p-4 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-90 transition-all shadow-sm"
                title="Settings"
              >
                <Zap size={24} />
              </button>
            </div>
          </div>

          {/* Sidebar Stats & Info */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm transition-all duration-300">
               <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
                 <CheckCircle size={22} className="text-emerald-500" />
                 Your Session
               </h3>
               <div className="space-y-6">
                  <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl">
                    <div className="flex items-center gap-3">
                      <Clock size={18} className="text-primary-500" />
                      <span className="text-sm font-bold text-slate-600 dark:text-slate-400">Total Focused</span>
                    </div>
                    <span className="text-lg font-black text-slate-800 dark:text-white">1h 45m</span>
                  </div>
                  <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl">
                    <div className="flex items-center gap-3">
                      <Zap size={18} className="text-amber-500" />
                      <span className="text-sm font-bold text-slate-600 dark:text-slate-400">Completed Sessions</span>
                    </div>
                    <span className="text-lg font-black text-slate-800 dark:text-white">{completedSessions}</span>
                  </div>
               </div>
            </div>

            <div className="bg-primary-600 p-8 rounded-[2rem] text-white shadow-xl relative overflow-hidden group transition-all duration-300">
              <div className="relative z-10">
                <h3 className="text-xl font-black mb-4 flex items-center gap-2">
                  <Info size={22} />
                  Pro Tip:
                </h3>
                <p className="text-primary-50 font-medium leading-relaxed mb-6">
                  Studies show that taking a short 5-minute break every 25 minutes increases your long-term focus by up to 15%.
                </p>
                <div className="h-1 bg-white/20 rounded-full w-full mb-2" />
                <p className="text-xs font-bold text-primary-200 uppercase tracking-widest">Pomodoro Technique</p>
              </div>
              <Coffee className="absolute -right-6 -bottom-6 w-32 h-32 opacity-10 transform -rotate-12 group-hover:scale-110 transition-transform duration-500" />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Focus;
