import React, { useState, useEffect, useCallback } from 'react';
import { Timer } from './components/Timer.js';
import { Stats } from './components/Stats.js';
import { ThemeSwitcher } from './components/ThemeSwitcher.js';
import { MotivationalToast } from './components/MotivationalToast.js';
import { NeonBackground } from './components/NeonBackground.js';
import { useStats } from './hooks/useStats.js';
import { useSound } from './hooks/useSound.js';
import { THEMES, MOTIVATIONAL_MESSAGES, NOTIFICATION_SOUND } from './constants.js';
import { html } from './utils/htm.js';

const App = () => {
  const [currentTheme, setCurrentTheme] = useState(THEMES[0]);
  const { addFocusMinute, todayMinutes, weeklyTotalMinutes, weeklyChartData } = useStats();
  const playNotificationSound = useSound(NOTIFICATION_SOUND);
  
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--theme-color-primary', currentTheme.primaryRgb);
    root.style.setProperty('--theme-color-secondary', currentTheme.secondaryRgb);
  }, [currentTheme]);

  const handlePomodoroComplete = useCallback(() => {
    playNotificationSound();
    setToastMessage(MOTIVATIONAL_MESSAGES[Math.floor(Math.random() * MOTIVATIONAL_MESSAGES.length)]);
    setShowToast(true);
  }, [playNotificationSound]);

  const handleMinuteElapsed = useCallback(() => {
    addFocusMinute();
  }, [addFocusMinute]);
  
  const handleToastClose = () => {
    setShowToast(false);
  };

  return html`
    <div className="relative min-h-screen w-full overflow-hidden">
      <${NeonBackground} theme=${currentTheme} />
      <div className="relative z-10 p-4 md:p-8">
        <${ThemeSwitcher} currentTheme=${currentTheme} onThemeChange=${setCurrentTheme} />
        
        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <aside className="lg:col-span-1 h-[85vh] lg:h-[calc(100vh-4rem)]">
            <${Timer} onComplete=${handlePomodoroComplete} onMinuteElapsed=${handleMinuteElapsed} themeColor=${currentTheme.primary} />
          </aside>
          <section className="lg:col-span-2 h-full">
            <${Stats} 
              todayMinutes=${todayMinutes}
              weeklyTotalMinutes=${weeklyTotalMinutes}
              weeklyChartData=${weeklyChartData}
              themeColor=${currentTheme.primary}
            />
          </section>
        </main>
      </div>
      
      <${MotivationalToast} message=${toastMessage} show=${showToast} onClose=${handleToastClose} />
      
      <div className=${`fixed inset-0 transition-opacity duration-1000 pointer-events-none ${showToast ? 'bg-[rgba(var(--theme-color-primary),0.1)] opacity-100' : 'opacity-0'}`} />

    </div>
  `;
};

export default App;
