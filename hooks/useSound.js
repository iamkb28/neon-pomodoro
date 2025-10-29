
import { useRef, useCallback } from 'react';

export const useSound = (soundUrl) => {
  const audioRef = useRef(null);
  const isUnlockedRef = useRef(false);

  // Lazy initialization of the Audio object
  const getAudio = useCallback(() => {
    if (audioRef.current === null && typeof Audio !== 'undefined') {
      audioRef.current = new Audio(soundUrl);
    }
    return audioRef.current;
  }, [soundUrl]);

  const playSound = useCallback(() => {
    const audio = getAudio();
    if (!audio) return;

    audio.currentTime = 0;
    audio.play().catch(error => {
      console.error("Failed to play sound:", error);
      // If playback fails, it's likely due to browser policy, so we reset the lock.
      isUnlockedRef.current = false;
    });
  }, [getAudio]);

  // This function should be triggered by a direct user action (e.g., a click)
  const unlockAudio = useCallback(() => {
    if (isUnlockedRef.current) return;
    
    const audio = getAudio();
    if (!audio) return;
    
    // A common trick to unlock audio is to play a sound and immediately pause it.
    const promise = audio.play();
    if (promise !== undefined) {
      promise.then(() => {
        // On success, pause it immediately.
        audio.pause();
        audio.currentTime = 0;
        isUnlockedRef.current = true;
      }).catch(error => {
        // This might happen if the user clicks, but the browser still blocks it.
        console.warn("Audio unlock failed on this attempt:", error);
      });
    }
  }, [getAudio]);

  return { playSound, unlockAudio };
};
