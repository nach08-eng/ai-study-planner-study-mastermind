import React from 'react';
import Layout from '../components/Layout/Layout';
import AnalyticsCharts from '../components/Dashboard/AnalyticsCharts';
import { PieChart, TrendingUp, Calendar, Zap, Trophy, Target, ArrowUpRight, Plus, Download, Brain } from 'lucide-react';
import { motion } from 'framer-motion';

const Analytics = () => {
  return (
    <Layout>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-8">
        <div className="flex items-center gap-6 group">
          <div className="w-16 h-16 bg-primary-600 rounded-3xl flex items-center justify-center text-white shadow-2xl shadow-primary-500/30 transition-all group-hover:scale-110 duration-500">
            <TrendingUp size={32} strokeWidth={3} />
          </div>
          <div>
            <h1 className="text-4xl font-extrabold text-slate-800 dark:text-white mb-1">Performance Stats 📊</h1>
            <p className="text-slate-500 dark:text-slate-400 font-bold flex items-center gap-2">
               Deep dive into your learning data & retention efficiency.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <button className="flex-1 md:flex-none py-4 px-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 rounded-2xl font-black hover:bg-slate-50 active:scale-95 transition-all shadow-sm flex items-center justify-center gap-3">
             <Download size={20} />
             Export PDF
          </button>
          <button className="flex-1 md:flex-none py-4 px-8 bg-primary-600 text-white rounded-2xl font-black hover:bg-primary-500 active:scale-95 transition-all shadow-xl shadow-primary-500/20 flex items-center justify-center gap-3">
             <Plus size={20} />
             New Goal
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        <motion.div 
          whileHover={{ y: -8 }}
          className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Zap size={100} className="text-primary-500" />
          </div>
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-amber-100 dark:bg-amber-900/30 text-amber-500 rounded-2xl">
              <Zap size={24} strokeWidth={3} />
            </div>
            <h3 className="text-lg font-black text-slate-800 dark:text-white uppercase tracking-wider">Retention Peak</h3>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="text-5xl font-black text-slate-800 dark:text-white">88%</p>
            <span className="text-emerald-500 flex items-center text-sm font-bold">
              <ArrowUpRight size={14} /> +4%
            </span>
          </div>
          <p className="text-slate-500 dark:text-slate-400 font-medium mt-4 leading-relaxed">
            Your active recall sessions are performing 15% better than last month.
          </p>
        </motion.div>

        <motion.div 
          whileHover={{ y: -8 }}
          className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-8 opacity-5 text-blue-500">
            <Calendar size={100} />
          </div>
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-primary-100 dark:bg-primary-900/30 text-primary-500 rounded-2xl">
              <Calendar size={24} strokeWidth={3} />
            </div>
            <h3 className="text-lg font-black text-slate-800 dark:text-white uppercase tracking-wider">Time Mastery</h3>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="text-5xl font-black text-slate-800 dark:text-white">4.2h</p>
            <span className="text-slate-500 text-sm font-bold uppercase tracking-widest">AVG / DAY</span>
          </div>
          <p className="text-slate-500 dark:text-slate-400 font-medium mt-4 leading-relaxed">
            Focus sessions are longer and more productive during morning hours.
          </p>
        </motion.div>

        <motion.div 
          whileHover={{ y: -8 }}
          className="bg-indigo-600 p-8 rounded-[2.5rem] text-white shadow-2xl shadow-indigo-600/20 relative overflow-hidden group"
        >
          <div className="absolute -bottom-10 -right-10 opacity-20 transform -rotate-12">
            <Brain size={180} />
          </div>
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
              <Trophy size={24} strokeWidth={3} />
            </div>
            <h3 className="text-lg font-black uppercase tracking-wider">Academic Rank</h3>
          </div>
          <div className="mb-4">
             <p className="text-5xl font-black mb-1 tracking-tight">Top 5%</p>
             <p className="text-indigo-200 font-bold uppercase tracking-widest text-xs">Global Leaderboard</p>
          </div>
          <div className="relative pt-4 mt-6 border-t border-white/10">
             <p className="text-white font-bold mb-3 flex items-center gap-2">
               Next Milestone: Scholar <ChevronRight size={16} />
             </p>
             <div className="h-2 bg-white/20 rounded-full w-full">
                <div className="h-full bg-white rounded-full w-3/4 shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
             </div>
          </div>
        </motion.div>
      </div>

      <div className="space-y-12">
        <AnalyticsCharts />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pb-20">
           <div className="lg:col-span-8 bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
             <div className="flex items-center justify-between mb-10">
                <h3 className="text-2xl font-black text-slate-800 dark:text-white flex items-center gap-3">
                  <Brain size={28} className="text-primary-500" />
                  Subject Proficiency Score
                </h3>
                <div className="flex items-center gap-4">
                   <div className="w-3 h-3 rounded-full bg-emerald-500" />
                   <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Growing Potential</span>
                </div>
             </div>

             <div className="space-y-10">
                {[
                  { name: 'Mathematics', score: 92, color: 'bg-primary-500', trend: 'up' },
                  { name: 'Theoretical Physics', score: 78, color: 'bg-indigo-500', trend: 'stable' },
                  { name: 'Organic Chemistry', score: 65, color: 'bg-amber-500', trend: 'down' },
                  { name: 'World Literature', score: 85, color: 'bg-rose-500', trend: 'up' }
                ].map((subject) => (
                  <div key={subject.name} className="group cursor-help">
                    <div className="flex justify-between items-center mb-3">
                       <span className="text-lg font-black text-slate-700 dark:text-slate-300 group-hover:text-primary-600 transition-colors uppercase tracking-tight">{subject.name}</span>
                       <div className="flex items-center gap-3">
                         <span className="text-sm font-black text-slate-400 uppercase">{subject.trend}</span>
                         <span className="text-xl font-black text-slate-800 dark:text-white">{subject.score}%</span>
                       </div>
                    </div>
                    <div className="w-full h-4 bg-slate-100 dark:bg-slate-800 rounded-full p-1 border border-slate-100 dark:border-slate-800 group-hover:border-primary-500/30 transition-all">
                       <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${subject.score}%` }}
                        transition={{ duration: 1.5, ease: "circOut" }}
                        className={`h-full rounded-full ${subject.color} shadow-lg`} 
                       />
                    </div>
                  </div>
                ))}
             </div>
           </div>

           <div className="lg:col-span-4 bg-primary-600 p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden flex flex-col items-center text-center justify-center min-h-[500px]">
              <div className="relative z-10">
                <div className="w-32 h-32 bg-white/10 rounded-[3rem] border border-white/20 flex items-center justify-center mb-10 shadow-3xl mx-auto rotate-6 rotate-12 backdrop-blur-2xl">
                  <Target size={64} className="text-white drop-shadow-2xl" />
                </div>
                <h3 className="text-3xl font-black mb-6 tracking-tight">Focus Heatmap</h3>
                <p className="text-primary-100 font-bold mb-10 leading-relaxed text-lg">
                  You are most productive on **Tuesdays** and **Thursdays** between **7 PM - 10 PM**. 
                </p>
                <div className="grid grid-cols-7 gap-2 max-w-xs mx-auto">
                   {[...Array(28)].map((_, i) => (
                     <div key={i} className={`w-full aspect-square rounded-lg ${i % 7 === 1 || i % 7 === 3 ? 'bg-white shadow-[0_0_10px_white]' : 'bg-primary-500/40 border border-white/10'}`} />
                   ))}
                </div>
                <p className="mt-8 text-xs font-black text-primary-200 uppercase tracking-[0.2em]">Peak Activity Map</p>
              </div>
           </div>
        </div>
      </div>
    </Layout>
  );
};

export default Analytics;
