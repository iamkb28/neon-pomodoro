
import React from 'react';
import { useTimer } from '../hooks/useTimer.js';
import { Button } from './Button.js';
import { html } from '../utils/htm.js';

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
  const secs = (seconds % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
};

export const Timer = ({ onComplete, onMinuteElapsed, themeColor, unlockAudio }) => {
  const { timeRemaining, isActive, isPaused, startTimer: originalStartTimer, pauseTimer, resetTimer } = useTimer({ onComplete, onMinuteElapsed });
  const isPulsing = isActive && timeRemaining <= 60;

  const startTimer = () => {
    unlockAudio();
    originalStartTimer();
  };

  return html`
    <div className="flex flex-col items-center justify-center h-full p-8 bg-stone-900/50 backdrop-blur-md rounded-2xl border-2 neon-border">
      <h1 className="text-2xl font-bold tracking-widest uppercase text-[rgba(var(--theme-color-secondary),0.8)] mb-8">
        Focus Session
      </h1>
      
      <div 
        className=${`font-orbitron text-8xl md:text-9xl mb-10 transition-all duration-300 neon-text ${isPulsing ? 'pulse-animation' : ''}`}
        style=${{ color: themeColor }}
      >
        ${formatTime(timeRemaining)}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-xs">
        ${(!isActive && !isPaused) && html`
          <${Button} variant="primary" onClick=${startTimer} className="col-span-2">Start</${Button}>
        `}
        ${isPaused && html`
           <${Button} variant="primary" onClick=${startTimer} className="col-span-2">Resume</${Button}>
        `}
        ${isActive && html`
          <${Button} variant="secondary" onClick=${pauseTimer} className="col-span-2">Pause</${Button}>
        `}
        <${Button} variant="secondary" onClick=${resetTimer} className="col-span-2">Reset</${Button}>
      </div>
       <div className="mt-auto text-center text-stone-400 text-sm">
        <p>Stay focused for 30 minutes.</p>
        <p>Unleash your potential.</p>
      </div>
    </div>
  `;
};
