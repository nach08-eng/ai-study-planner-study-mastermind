import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart, 
  Pie, 
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';

const data = [
  { name: 'Mon', study: 4, goal: 5 },
  { name: 'Tue', study: 3, goal: 5 },
  { name: 'Wed', study: 5.5, goal: 5 },
  { name: 'Thu', study: 2, goal: 5 },
  { name: 'Fri', study: 4.5, goal: 5 },
  { name: 'Sat', study: 6, goal: 5 },
  { name: 'Sun', study: 1, goal: 5 },
];

const subjectData = [
  { name: 'Math', value: 40, color: '#0ea5e9' },
  { name: 'Physics', value: 25, color: '#8b5cf6' },
  { name: 'Biology', value: 20, color: '#f59e0b' },
  { name: 'English', value: 15, color: '#10b981' },
];

const AnalyticsCharts = () => {
  const isDark = document.documentElement.classList.contains('dark');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-8">
      {/* Weekly Progress */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
          Weekly Study Progress (Hours)
        </h3>
        <div className="h-64 sm:h-80 w-full overflow-hidden">
          <ResponsiveContainer width="100%" height="95%">
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorStudy" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? '#334155' : '#e2e8f0'} />
              <XAxis dataKey="name" stroke={isDark ? '#94a3b8' : '#64748b'} fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke={isDark ? '#94a3b8' : '#64748b'} fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: isDark ? '#0f172a' : '#fff', 
                  borderColor: isDark ? '#334155' : '#e2e8f0',
                  color: isDark ? '#fff' : '#000',
                  borderRadius: '12px'
                }} 
              />
              <Area type="monotone" dataKey="study" stroke="#0ea5e9" strokeWidth={3} fillOpacity={1} fill="url(#colorStudy)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Subject Distribution */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col justify-between">
        <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-6">Subject Performance Analysis</h3>
        <div className="h-64 sm:h-80 w-full overflow-hidden flex flex-col sm:flex-row items-center justify-center">
          <ResponsiveContainer width="100%" height="95%">
            <PieChart>
              <Pie
                data={subjectData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {subjectData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: isDark ? '#0f172a' : '#fff', 
                  borderColor: isDark ? '#334155' : '#e2e8f0',
                  color: isDark ? '#fff' : '#000',
                  borderRadius: '12px'
                }} 
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="w-full sm:w-auto mt-4 sm:mt-0 flex flex-col gap-2">
            {subjectData.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{item.name}</span>
                <span className="text-xs text-slate-400 ml-auto">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCharts;
