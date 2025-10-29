
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import type { ChartData } from '../types';

interface StatsProps {
  todayMinutes: number;
  weeklyTotalMinutes: number;
  weeklyChartData: ChartData[];
  themeColor: string;
}

const formatHoursAndMinutes = (totalMinutes: number) => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours > 0 && minutes > 0) return `${hours}h ${minutes}m`;
  if (hours > 0) return `${hours}h`;
  return `${minutes}m`;
};

export const Stats: React.FC<StatsProps> = ({ todayMinutes, weeklyTotalMinutes, weeklyChartData, themeColor }) => {
    
    const motivationalQuote = todayMinutes > 120 
        ? "🔥 You’ve focused for over 2 hours today!" 
        : todayMinutes > 30 
        ? "💡 Great start to your focus journey!"
        : "Let's get the first session done!";

  return (
    <div className="p-6 space-y-8 h-full flex flex-col">
      <div>
        <h2 className="text-3xl font-bold neon-text">Productivity Stats</h2>
        <p className="text-stone-400 mt-1">{motivationalQuote}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-stone-900/50 rounded-lg neon-box">
          <h3 className="font-bold text-stone-400 uppercase tracking-wider">Today's Focus</h3>
          <p className="text-5xl font-orbitron font-bold mt-2" style={{color: themeColor}}>{formatHoursAndMinutes(todayMinutes)}</p>
        </div>
         <div className="p-6 bg-stone-900/50 rounded-lg neon-box">
          <h3 className="font-bold text-stone-400 uppercase tracking-wider">This Week's Total</h3>
          <p className="text-5xl font-orbitron font-bold mt-2" style={{color: themeColor}}>{formatHoursAndMinutes(weeklyTotalMinutes)}</p>
        </div>
      </div>

      <div className="flex-grow flex flex-col min-h-[300px]">
        <h3 className="text-2xl font-bold mb-4 neon-text">Weekly Progress (minutes)</h3>
        <div className="flex-grow">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={weeklyChartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(var(--theme-color-primary), 0.1)" />
            <XAxis dataKey="day" tick={{ fill: '#a8a29e' }} stroke="#57534e" />
            <YAxis tick={{ fill: '#a8a29e' }} stroke="#57534e" />
            <Tooltip
                contentStyle={{ 
                    backgroundColor: 'rgba(12, 10, 9, 0.9)', 
                    borderColor: 'rgba(var(--theme-color-primary), 0.5)',
                }}
                labelStyle={{ color: '#d6d3d1' }}
                cursor={{ fill: 'rgba(var(--theme-color-primary), 0.1)' }}
             />
            <Bar dataKey="minutes" fill={themeColor} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
