import React from 'react';
import { Bell, Moon, Sun, Search, Zap, Trophy, Menu } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Navbar = ({ onToggleSidebar }) => {
  const { user } = useAuth();
  const [isDarkMode, setIsDarkMode] = React.useState(true);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className="h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 sticky top-0 z-30 transition-colors duration-300">
      <div className="flex items-center gap-4">
        <button 
          className="lg:hidden text-slate-500 dark:text-slate-400"
          onClick={onToggleSidebar}
        >
          <Menu size={24} />
        </button>
        <div className="relative group hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-primary-500 transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search study goals..."
            className="pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-transparent border focus:border-primary-500 text-slate-900 dark:text-white rounded-xl w-64 transition-all duration-200 outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-6">
        <div className="hidden sm:flex items-center gap-4 bg-slate-100 dark:bg-slate-800 px-4 py-1.5 rounded-full border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2 text-amber-500 font-bold">
            <Zap size={18} fill="currentColor" />
            <span className="text-sm">{user?.streakCount || 0}d Streak</span>
          </div>
          <div className="w-px h-4 bg-slate-200 dark:bg-slate-700" />
          <div className="flex items-center gap-2 text-primary-500 font-bold">
            <Trophy size={18} fill="currentColor" />
            <span className="text-sm">{user?.points || 0} pts</span>
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-3">
          <button 
            onClick={toggleDarkMode}
            className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            title="Toggle theme"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <button className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg relative transition-colors">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
