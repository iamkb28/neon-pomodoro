import { useState, useEffect, useRef, useCallback } from 'react';
import { POMODORO_DURATION_SECONDS } from '../constants.js';

export const useTimer = ({ onComplete, onMinuteElapsed }) => {
  const [timeRemaining, setTimeRemaining] = useState(POMODORO_DURATION_SECONDS);
  const [isActive, setIsActive] = useState(false);
  
  const intervalRef = useRef(null);
  const targetTimeRef = useRef(0);
  const notifiedMinutesElapsedRef = useRef(0);

  const stopTimer = useCallback(() => {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const tick = useCallback(() => {
    if (targetTimeRef.current <= 0) return;

    const remaining = Math.round((targetTimeRef.current - Date.now()) / 1000);

    const totalElapsedSeconds = POMODORO_DURATION_SECONDS - (remaining > 0 ? remaining : 0);
    const currentMinutesElapsed = Math.floor(totalElapsedSeconds / 60);

    if (currentMinutesElapsed > notifiedMinutesElapsedRef.current) {
        const minutesToAdd = currentMinutesElapsed - notifiedMinutesElapsedRef.current;
        for (let i = 0; i < minutesToAdd; i++) {
            onMinuteElapsed();
        }
        notifiedMinutesElapsedRef.current = currentMinutesElapsed;
    }

    if (remaining <= 0) {
      stopTimer();
      setIsActive(false);
      onComplete();
      setTimeRemaining(POMODORO_DURATION_SECONDS);
      targetTimeRef.current = 0;
      notifiedMinutesElapsedRef.current = 0;
    } else {
      setTimeRemaining(remaining);
    }
  }, [onComplete, onMinuteElapsed, stopTimer]);

  useEffect(() => {
    if (isActive) {
      intervalRef.current = window.setInterval(tick, 500);
    } else {
      stopTimer();
    }

    return () => stopTimer();
  }, [isActive, stopTimer, tick]);

  const startTimer = () => {
    targetTimeRef.current = Date.now() + timeRemaining * 1000;
    setIsActive(true);
  };

  const pauseTimer = () => {
    setIsActive(false);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeRemaining(POMODORO_DURATION_SECONDS);
    targetTimeRef.current = 0;
    notifiedMinutesElapsedRef.current = 0;
  };

  const isPaused = !isActive && timeRemaining < POMODORO_DURATION_SECONDS;

  return { timeRemaining, isActive, isPaused, startTimer, pauseTimer, resetTimer };
};
