
import { useState, useEffect, useCallback } from 'react';
import type { DailyStats, ChartData } from '../types';

const STATS_STORAGE_KEY = 'neonPomodoroStats';

const getTodayDateString = () => {
  const today = new Date();
  return today.toISOString().split('T')[0]; // YYYY-MM-DD
};

export const useStats = () => {
  const [stats, setStats] = useState<DailyStats>({});

  useEffect(() => {
    try {
      const storedStats = localStorage.getItem(STATS_STORAGE_KEY);
      if (storedStats) {
        setStats(JSON.parse(storedStats));
      }
    } catch (error) {
      console.error("Failed to load stats from localStorage:", error);
    }
  }, []);

  const addCompletedPomodoro = useCallback(() => {
    const today = getTodayDateString();
    setStats(prevStats => {
      const newStats = {
        ...prevStats,
        [today]: (prevStats[today] || 0) + 1,
      };
      try {
        localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(newStats));
      } catch (error) {
        console.error("Failed to save stats to localStorage:", error);
      }
      return newStats;
    });
  }, []);

  const getWeeklyChartData = (): ChartData[] => {
    const data: ChartData[] = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dateString = date.toISOString().split('T')[0];
      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
      
      const pomodoros = stats[dateString] || 0;
      data.push({
        day: dayName,
        minutes: pomodoros * 30,
      });
    }
    return data;
  };

  const todayMinutes = (stats[getTodayDateString()] || 0) * 30;
  const weeklyChartData = getWeeklyChartData();
  const weeklyTotalMinutes = weeklyChartData.reduce((sum, day) => sum + day.minutes, 0);

  return { addCompletedPomodoro, todayMinutes, weeklyTotalMinutes, weeklyChartData };
};
