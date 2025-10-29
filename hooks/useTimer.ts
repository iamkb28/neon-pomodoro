
import { useState, useEffect, useRef, useCallback } from 'react';
import { POMODORO_DURATION_SECONDS } from '../constants';

interface UseTimerProps {
  onComplete: () => void;
}

export const useTimer = ({ onComplete }: UseTimerProps) => {
  const [timeRemaining, setTimeRemaining] = useState(POMODORO_DURATION_SECONDS);
  const [isActive, setIsActive] = useState(false);
  
  const intervalRef = useRef<number | null>(null);

  const stopTimer = useCallback(() => {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (isActive) {
      intervalRef.current = window.setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            stopTimer();
            setIsActive(false);
            onComplete();
            return POMODORO_DURATION_SECONDS;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      stopTimer();
    }

    return () => stopTimer();
  }, [isActive, onComplete, stopTimer]);

  const startTimer = () => {
    setIsActive(true);
  };

  const pauseTimer = () => {
    setIsActive(false);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeRemaining(POMODORO_DURATION_SECONDS);
  };

  const isPaused = !isActive && timeRemaining < POMODORO_DURATION_SECONDS;

  return { timeRemaining, isActive, isPaused, startTimer, pauseTimer, resetTimer };
};
