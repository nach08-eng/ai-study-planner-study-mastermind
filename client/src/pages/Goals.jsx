import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import { Target, Plus, CheckCircle, Clock, Trash2, Edit3, TrendingUp, Calendar, ChevronRight, Award, Trash } from 'lucide-react';
import api from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';

const Goals = () => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newGoal, setNewGoal] = useState({ title: '', description: '', deadline: '' });

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const res = await api.get('/goals');
      setGoals(res.data);
    } catch (error) {
      console.error('Error fetching goals:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddGoal = async (e) => {
    e.preventDefault();
    try {
      await api.post('/goals', newGoal);
      fetchGoals();
      setShowAddModal(false);
      setNewGoal({ title: '', description: '', deadline: '' });
    } catch (error) {
      console.error('Error adding goal:', error);
    }
  };

  const handleDeleteGoal = async (id) => {
    try {
      await api.delete(`/goals/${id}`);
      setGoals(goals.filter(g => g._id !== id));
    } catch (error) {
      console.error('Error deleting goal:', error);
    }
  };

  const calculateDaysLeft = (deadline) => {
    if (!deadline) return null;
    const diff = new Date(deadline) - new Date();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  return (
    <Layout>
      <div className="flex flex-col sm:flex-row items-center justify-between mb-12 gap-6">
        <div className="flex items-center gap-6 group">
          <div className="w-16 h-16 bg-primary-600 rounded-3xl flex items-center justify-center text-white shadow-2xl shadow-primary-500/30 transition-transform group-hover:rotate-12 duration-500">
            <Target size={32} strokeWidth={3} />
          </div>
          <div>
            <h1 className="text-4xl font-extrabold text-slate-800 dark:text-white mb-1">Study Goals 🎯</h1>
            <p className="text-slate-500 dark:text-slate-400 font-bold flex items-center gap-2">
               Breaking down success, one step at a time.
            </p>
          </div>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-3 bg-primary-600 hover:bg-primary-500 text-white px-8 py-4 rounded-2xl shadow-xl shadow-primary-500/20 active:scale-95 transition-all text-lg font-black group"
        >
          <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
          Set New Goal
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center p-20">
          <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 pb-10">
          <AnimatePresence>
            {goals.length > 0 ? goals.map((goal) => {
              const daysLeft = calculateDaysLeft(goal.deadline);
              return (
                <motion.div
                  key={goal._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 p-8 shadow-sm hover:shadow-xl hover:translate-y-[-4px] transition-all duration-300 relative overflow-hidden group"
                >
                  {/* Progress Ring Decoration */}
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Target size={120} className="text-slate-400" />
                  </div>

                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-6">
                       <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ${
                         goal.progress === 100 
                         ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30' 
                         : 'bg-primary-100 text-primary-600 dark:bg-primary-900/30'
                       }`}>
                         {goal.progress === 100 ? 'Completed' : 'In Progress'}
                       </span>
                       <div className="flex gap-2">
                         <button className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-primary-500 transition-colors">
                           <Edit3 size={18} />
                         </button>
                         <button 
                            onClick={() => handleDeleteGoal(goal._id)}
                            className="p-2.5 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-900/20 text-slate-400 hover:text-rose-500 transition-colors"
                         >
                           <Trash2 size={18} />
                         </button>
                       </div>
                    </div>

                    <h3 className="text-2xl font-black text-slate-800 dark:text-white mb-3 group-hover:text-primary-600 transition-colors">{goal.title}</h3>
                    <p className="text-slate-500 dark:text-slate-400 font-medium mb-8 flex-1 leading-relaxed">{goal.description}</p>
                    
                    <div className="space-y-6">
                      <div className="space-y-3">
                         <div className="flex justify-between text-sm font-black mb-1">
                           <span className="text-slate-700 dark:text-slate-300">COMPLETION PROGRESS</span>
                           <span className="text-primary-500">{goal.progress}%</span>
                         </div>
                         <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-100 dark:border-slate-700/50">
                           <motion.div 
                             initial={{ width: 0 }}
                             animate={{ width: `${goal.progress}%` }}
                             className={`h-full rounded-full transition-all duration-1000 ${
                               goal.progress === 100 ? 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]' : 'bg-primary-500 shadow-[0_0_15px_rgba(14,165,233,0.5)]'
                             }`}
                           />
                         </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-50 dark:border-slate-800/50">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500">
                            <Calendar size={18} />
                          </div>
                          <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">DEADLINE</p>
                            <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                              {goal.deadline ? new Date(goal.deadline).toLocaleDateString([], { month: 'short', day: 'numeric' }) : 'No set date'}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                           <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                             daysLeft <= 3 && daysLeft > 0 ? 'bg-rose-100 text-rose-500 dark:bg-rose-900/30' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                           }`}>
                             <Clock size={18} />
                           </div>
                           <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">REMAINING</p>
                            <p className={`text-sm font-bold ${daysLeft <= 3 && daysLeft > 0 ? 'text-rose-500 animate-pulse' : 'text-slate-800 dark:text-slate-200'}`}>
                              {daysLeft !== null ? (daysLeft > 0 ? `${daysLeft} Days` : 'Overdue') : 'Continuous'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            }) : (
              <div className="col-span-full py-20 bg-white/50 dark:bg-slate-900/50 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center">
                 <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-300 dark:text-slate-700 mb-6">
                   <Target size={48} />
                 </div>
                 <h2 className="text-2xl font-black text-slate-800 dark:text-white mb-2">No active goals found</h2>
                 <p className="text-slate-500 font-medium max-w-sm mb-10">Set your first academic goal to start tracking your journey to success!</p>
                 <button 
                  onClick={() => setShowAddModal(true)}
                  className="bg-primary-600 hover:bg-primary-500 text-white px-10 py-4 rounded-2xl font-black transition-all shadow-xl shadow-primary-500/20 active:scale-95"
                 >
                   Start Planning Now
                 </button>
              </div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Add Goal Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 backdrop-blur-md bg-slate-900/40 transition-all duration-300">
           <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-[2.5rem] shadow-[0_0_100px_rgba(0,0,0,0.1)] p-10 border border-slate-200 dark:border-slate-800"
           >
              <h2 className="text-3xl font-black text-slate-800 dark:text-white mb-8 flex items-center gap-3">
                <Target className="text-primary-500" size={32} />
                Create New Goal
              </h2>
              <form onSubmit={handleAddGoal} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-black text-slate-700 dark:text-slate-300 ml-1">Goal Title</label>
                  <input
                    type="text"
                    required
                    value={newGoal.title}
                    onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                    placeholder="e.g. Finish Calculus Course"
                    className="w-full bg-slate-50 dark:bg-slate-950 border-2 border-transparent focus:border-primary-500 p-4 rounded-2xl outline-none font-bold text-slate-800 dark:text-white transition-all shadow-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-black text-slate-700 dark:text-slate-300 ml-1">Short Description</label>
                  <textarea
                    rows="3"
                    value={newGoal.description}
                    onChange={(e) => setNewGoal({...newGoal, description: e.target.value})}
                    placeholder="Break down your objective..."
                    className="w-full bg-slate-50 dark:bg-slate-950 border-2 border-transparent focus:border-primary-500 p-4 rounded-2xl outline-none font-bold text-slate-800 dark:text-white transition-all shadow-sm"
                  ></textarea>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-black text-slate-700 dark:text-slate-300 ml-1">Target Deadline</label>
                  <input
                    type="date"
                    value={newGoal.deadline}
                    onChange={(e) => setNewGoal({...newGoal, deadline: e.target.value})}
                    className="w-full bg-slate-50 dark:bg-slate-950 border-2 border-transparent focus:border-primary-500 p-4 rounded-2xl outline-none font-bold text-slate-800 dark:text-white transition-all shadow-sm"
                  />
                </div>
                <div className="flex gap-4 pt-6">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 py-4 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-2xl font-black hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-4 bg-primary-600 text-white rounded-2xl font-black hover:bg-primary-500 shadow-xl shadow-primary-500/20 transition-all active:scale-95"
                  >
                    Confirm Goal
                  </button>
                </div>
              </form>
           </motion.div>
        </div>
      )}
    </Layout>
  );
};

export default Goals;
