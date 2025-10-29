import { useState, useCallback } from 'react';

export const useSound = (soundUrl) => {
  const [audio] = useState(new Audio(soundUrl));

  const playSound = useCallback(() => {
    audio.currentTime = 0;
    audio.play().catch(e => console.error("Error playing sound:", e));
  }, [audio]);

  return playSound;
};
