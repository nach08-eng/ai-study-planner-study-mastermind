import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import { Calendar, Plus, CheckCircle, Clock, Brain, AlertCircle, ChevronRight, Zap, Trophy, Sliders, List, MoreVertical } from 'lucide-react';
import api from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';

const Schedule = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, today, upcoming

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await api.get('/tasks');
      setTasks(res.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleComplete = async (task) => {
    try {
      const res = await api.patch(`/tasks/${task._id}/complete`, { quality: 'medium' });
      setTasks(tasks.map(t => t._id === task._id ? res.data : t));
    } catch (error) {
      console.error('Error completing task:', error);
    }
  };

  const formatDate = (dateString) => {
    const options = { weekday: 'long', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Filter tasks logic
  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    const taskDate = new Date(task.nextReviewDate).setHours(0,0,0,0);
    const today = new Date().setHours(0,0,0,0);
    if (filter === 'today') return taskDate === today;
    if (filter === 'upcoming') return taskDate > today;
    return true;
  });

  return (
    <Layout>
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-16">
        <div className="flex items-center gap-6 group">
           <div className="w-16 h-16 bg-primary-600 rounded-3xl flex items-center justify-center text-white shadow-2xl shadow-primary-500/30 transition-all group-hover:scale-110 duration-500">
             <Calendar size={32} strokeWidth={3} />
           </div>
           <div>
             <h1 className="text-4xl font-extrabold text-slate-800 dark:text-white mb-1">Study Schedule 🗓️</h1>
             <p className="text-slate-500 dark:text-slate-400 font-bold flex items-center gap-2">
                Intelligent learning path powered by Spaced Repetition.
             </p>
           </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 p-1.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm sm:max-w-md w-full">
          {['all', 'today', 'upcoming'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`flex-1 py-3 px-6 rounded-xl capitalize font-black text-sm transition-all duration-300 active:scale-95 ${
                filter === f 
                ? 'bg-primary-600 text-white shadow-xl shadow-primary-500/30' 
                : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        {/* Task List container */}
        <div className="xl:col-span-8 space-y-6">
          {loading ? (
             <div className="flex justify-center p-20">
               <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
             </div>
          ) : (
            <AnimatePresence>
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task) => (
                  <motion.div
                    key={task._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className={`bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center gap-8 group hover:shadow-2xl transition-all duration-500 ${
                      task.isCompleted ? 'opacity-60 grayscale-[0.2]' : ''
                    }`}
                  >
                     {/* Checkbox / Priority indicator */}
                    <div className="flex flex-row md:flex-col items-center gap-3">
                       <button 
                        onClick={() => handleToggleComplete(task)}
                        disabled={task.isCompleted}
                        className={`w-14 h-14 rounded-3xl flex items-center justify-center transition-all duration-300 border-4 ${
                          task.isCompleted 
                          ? 'bg-emerald-500 border-emerald-100 dark:border-emerald-900/30 text-white scale-95' 
                          : 'bg-white dark:bg-slate-950 border-slate-100 dark:border-slate-800 text-slate-300 hover:border-primary-500 hover:text-primary-500 active:scale-90 group-hover:shadow-lg'
                        }`}
                       >
                         {task.isCompleted ? <CheckCircle size={32} strokeWidth={3} /> : <div className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-800" />}
                       </button>
                       <div className={`text-[10px] sm:hidden md:block font-black uppercase tracking-widest text-center ${
                         task.priority === 'high' ? 'text-rose-500' : 
                         task.priority === 'medium' ? 'text-amber-500' : 
                         'text-primary-500'
                       }`}>
                         {task.priority || 'Medium'}
                       </div>
                    </div>

                    {/* Task Info */}
                    <div className="flex-1 text-center md:text-left">
                       <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 mb-2">
                          <span className="px-4 py-1.5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-xs font-black uppercase tracking-wider">
                            {task.subject}
                          </span>
                          <span className="flex items-center gap-1.5 text-xs font-bold text-slate-400 group-hover:text-primary-500 transition-colors">
                            <Clock size={14} />
                            {task.nextReviewDate ? formatDate(task.nextReviewDate) : 'Someday'}
                          </span>
                       </div>
                       <h3 className={`text-2xl font-black mb-2 transition-colors ${
                         task.isCompleted ? 'line-through text-slate-400' : 'text-slate-800 dark:text-white group-hover:text-primary-600'
                       }`}>{task.title}</h3>
                       <p className="text-slate-500 dark:text-slate-400 font-medium max-w-xl">{task.description || "Unlock the potential of this subject with active recall."}</p>
                    </div>

                    {/* AI Insights & Actions */}
                    <div className="flex flex-row md:flex-col items-center gap-4 border-l-0 md:border-l border-slate-100 dark:border-slate-800 pl-0 md:pl-8">
                       <div className="bg-primary-50 dark:bg-primary-900/20 p-4 rounded-3xl flex flex-col items-center text-center group-hover:bg-primary-100 dark:group-hover:bg-primary-900/40 transition-colors">
                           <Brain size={24} className="text-primary-600 dark:text-primary-400 mb-2" />
                           <span className="text-[10px] font-black text-primary-500 uppercase tracking-tighter mb-0.5">SPACED REP.</span>
                           <span className="text-sm font-black text-slate-800 dark:text-white">Review {task.repetitionCount || 1}</span>
                       </div>
                       <button className="p-3 text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 rounded-2xl transition-all active:scale-90">
                          <MoreVertical size={24} />
                       </button>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="py-32 bg-white dark:bg-slate-900 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center">
                   <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-300 mb-6">
                     <List size={48} />
                   </div>
                   <h2 className="text-2xl font-black text-slate-800 dark:text-white mb-2">Clean Slate! ✨</h2>
                   <p className="text-slate-500 font-medium max-w-sm">You have no tasks for this period. Great job staying on top of your schedule!</p>
                </div>
              )}
            </AnimatePresence>
          )}
        </div>

        {/* AI Sidebar Info */}
        <div className="xl:col-span-4 space-y-8">
           <div className="bg-primary-600 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
              <div className="relative z-10 flex flex-col items-center text-center">
                 <div className="w-24 h-24 bg-white/10 backdrop-blur-xl rounded-[2rem] border border-white/20 flex items-center justify-center mb-8 rotate-12 shadow-2xl">
                    <Trophy size={48} fill="currentColor" className="text-amber-300 drop-shadow-[0_0_10px_rgba(251,191,36,0.8)]" />
                 </div>
                 <h3 className="text-2xl font-black mb-4 tracking-tight leading-tight">Gamified Mastery</h3>
                 <p className="text-primary-50/80 font-bold mb-8">Each completed task earns you points and boosts your retention score!</p>
                 <div className="w-full bg-white/20 h-1 rounded-full mb-2" />
                 <span className="text-xs font-black uppercase tracking-widest text-primary-200">Session Goal: 5 Tasks</span>
              </div>
              <Sparkles className="absolute -left-10 -bottom-10 w-48 h-48 opacity-10 group-hover:rotate-180 transition-transform duration-[4s]" />
           </div>

           <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-[2.5rem] shadow-sm">
              <h3 className="text-xl font-black text-slate-800 dark:text-white mb-6 flex items-center gap-3">
                <Sliders size={22} className="text-primary-500" />
                Smart Controls
              </h3>
              <div className="space-y-4">
                 <button className="w-full py-4 px-6 bg-slate-50 dark:bg-slate-800 hover:bg-primary-50 dark:hover:bg-primary-900/20 text-slate-700 dark:text-slate-300 hover:text-primary-600 font-black rounded-2xl flex items-center justify-between transition-all group">
                   <span>Bulk Reschedule</span>
                   <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                 </button>
                 <button className="w-full py-4 px-6 bg-slate-50 dark:bg-slate-800 hover:bg-primary-50 dark:hover:bg-primary-900/20 text-slate-700 dark:text-slate-300 hover:text-primary-600 font-black rounded-2xl flex items-center justify-between transition-all group">
                   <span>Export to Calendar</span>
                   <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                 </button>
                 <button className="w-full py-4 px-6 bg-slate-50 dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-rose-900/20 text-slate-700 dark:text-slate-300 hover:text-rose-600 font-black rounded-2xl flex items-center justify-between transition-all group">
                   <span>Clear History</span>
                   <Trash size={18} className="group-hover:rotate-12 transition-transform" />
                 </button>
              </div>
           </div>
        </div>
      </div>
    </Layout>
  );
};

export default Schedule;
