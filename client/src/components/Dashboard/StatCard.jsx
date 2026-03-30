import React from 'react';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon: Icon, trend, color }) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all duration-300"
    >
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-lg text-white ${color || 'bg-primary-500'}`}>
          <Icon size={24} />
        </div>
        {trend && (
          <span className={`text-xs font-bold px-2 py-1 rounded-md ${trend > 0 ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30' : 'bg-rose-100 text-rose-600 dark:bg-rose-900/30'}`}>
            {trend > 0 ? '+' : ''}{trend}%
          </span>
        )}
      </div>
      <div>
        <h3 className="text-slate-500 dark:text-slate-400 text-sm font-medium">{title}</h3>
        <p className="text-2xl font-bold text-slate-800 dark:text-white mt-1">{value}</p>
      </div>
    </motion.div>
  );
};

export default StatCard;
