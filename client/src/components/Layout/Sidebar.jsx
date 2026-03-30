import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  Target, 
  MessageSquare, 
  PieChart, 
  Timer, 
  Settings, 
  LogOut,
  Brain
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
  const { logout, user } = useAuth();

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { name: 'Schedule', icon: Calendar, path: '/schedule' },
    { name: 'Goals', icon: Target, path: '/goals' },
    { name: 'Analytics', icon: PieChart, path: '/analytics' },
    { name: 'AI Assistant', icon: Brain, path: '/ai' },
    { name: 'Focus Mode', icon: Timer, path: '/focus' },
  ];

  return (
    <aside className="w-64 h-full bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col transition-colors duration-300">
      <div className="p-6 flex items-center gap-3">
        <div className="bg-primary-500 p-2 rounded-lg text-white">
          <Brain size={24} />
        </div>
        <h1 className="text-xl font-bold text-slate-800 dark:text-white">AI StudyHub</h1>
      </div>

      <nav className="flex-1 mt-4 px-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200
              ${isActive 
                ? 'bg-primary-500 text-white shadow-md shadow-primary-500/20' 
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'}
            `}
          >
            <item.icon size={20} />
            <span className="font-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 mt-auto border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3 px-3 py-2 mb-4">
          <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-700 dark:text-primary-300 font-bold uppercase">
            {user?.username?.[0] || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-800 dark:text-white truncate">
              {user?.username || 'User'}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
              Level 1 Student
            </p>
          </div>
        </div>
        
        <button
          onClick={logout}
          className="flex items-center gap-3 w-full px-3 py-2 text-slate-600 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
