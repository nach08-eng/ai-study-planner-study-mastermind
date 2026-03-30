import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import StatCard from '../components/Dashboard/StatCard';
import AnalyticsCharts from '../components/Dashboard/AnalyticsCharts';
import { 
  CheckCircle, 
  Clock, 
  TrendingUp, 
  BookOpen, 
  Star,
  Plus,
  ArrowRight,
  Brain
} from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tasksRes, goalsRes] = await Promise.all([
          api.get('/tasks'),
          api.get('/goals')
        ]);
        setTasks(tasksRes.data);
        setGoals(goalsRes.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const completedTasks = tasks.filter(t => t.isCompleted).length;
  const pendingTasks = tasks.length - completedTasks;
  const completionRate = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;

  const stats = [
    { title: 'Tasks Completed', value: completedTasks, icon: CheckCircle, trend: 12, color: 'bg-emerald-500' },
    { title: 'Focus Hours', value: '24.5h', icon: Clock, trend: 5, color: 'bg-primary-500' },
    { title: 'Avg. Score', value: '88%', icon: TrendingUp, trend: 2, color: 'bg-amber-500' },
    { title: 'Study Streak', value: `${user?.streakCount || 0} Days`, icon: Star, trend: null, color: 'bg-rose-500' },
  ];

  return (
    <Layout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white mb-2">
            Welcome back, {user?.username || 'Student'}! 👋
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            You're doing great! You've completed {completionRate}% of your weekly goals.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/ai" className="flex items-center gap-2 bg-primary-500/10 text-primary-600 dark:text-primary-400 px-4 py-2.5 rounded-xl border border-primary-500/20 hover:bg-primary-500/20 transition-all font-semibold">
            <Brain size={20} />
            <span>Ask AI</span>
          </Link>
          <button className="flex items-center gap-2 bg-primary-500 text-white px-5 py-2.5 rounded-xl hover:bg-primary-600 shadow-lg shadow-primary-500/20 active:scale-95 transition-all font-bold">
            <Plus size={20} />
            <span className="hidden sm:inline">Add Task</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <AnalyticsCharts />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Tasks */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <BookOpen size={20} className="text-primary-500" />
              Upcoming Study Tasks
            </h3>
            <Link to="/schedule" className="text-sm text-primary-500 hover:text-primary-600 font-bold transition-all hover:translate-x-1 inline-flex items-center gap-1">
              View All <ArrowRight size={14} />
            </Link>
          </div>
          <div className="divide-y divide-slate-50 dark:divide-slate-800">
            {tasks.length > 0 ? tasks.slice(0, 5).map((task) => (
              <div key={task._id} className="p-5 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors flex items-center gap-4 group">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                  task.priority === 'high' ? 'bg-rose-100 text-rose-600 dark:bg-rose-900/30' :
                  task.priority === 'medium' ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30' :
                  'bg-primary-100 text-primary-600 dark:bg-primary-900/30'
                }`}>
                  <BookOpen size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-slate-800 dark:text-white truncate group-hover:text-primary-500 transition-colors">{task.title}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 capitalize">{task.subject} • {task.difficultyLevel || 'Medium'}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-slate-800 dark:text-white">{new Date(task.nextReviewDate).toLocaleDateString([], { month: 'short', day: 'numeric' })}</p>
                  <p className="text-xs text-slate-400">{task.priority.toUpperCase()}</p>
                </div>
              </div>
            )) : (
              <div className="p-10 text-center text-slate-500 dark:text-slate-400">
                <p>No tasks scheduled yet. Start by adding a task!</p>
              </div>
            )}
          </div>
        </div>

        {/* Current Goals */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between shrink-0">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <Target size={20} className="text-primary-500" />
              Active Goals
            </h3>
            <Link to="/goals" className="text-primary-500">
              <Plus size={20} />
            </Link>
          </div>
          <div className="p-6 space-y-8 overflow-y-auto max-h-[400px]">
             {goals.length > 0 ? goals.map((goal) => (
              <div key={goal._id} className="space-y-3">
                <div className="flex justify-between items-center group cursor-pointer">
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-300 group-hover:text-primary-500 transition-colors">{goal.title}</span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
                    {goal.progress}%
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${goal.progress}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-primary-500 rounded-full shadow-[0_0_10px_rgba(14,165,233,0.5)]" 
                  />
                </div>
              </div>
            )) : (
              <p className="text-center text-slate-500 dark:text-slate-400 mt-4">Set some study goals to stay focused!</p>
            )}
          </div>
          <div className="mt-auto p-6 bg-slate-50 dark:bg-slate-800/30 border-t border-slate-100 dark:border-slate-800">
             <div className="bg-primary-500 rounded-xl p-4 text-white relative overflow-hidden group">
                <div className="relative z-10">
                  <h4 className="font-bold text-sm mb-1">AI Insight</h4>
                  <p className="text-xs opacity-90 leading-relaxed">
                    You study best at 9:00 PM. Schedule your hardest Physics tasks then!
                  </p>
                </div>
                <Brain className="absolute -right-4 -bottom-4 w-20 h-20 opacity-20 transform -rotate-12 group-hover:scale-110 transition-transform duration-500" />
             </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
