import type { Theme } from './types';

export const POMODORO_DURATION_SECONDS = 30 * 60; // 30 minutes

export const THEMES: Theme[] = [
  {
    id: 'red-black',
    name: 'Crimson Core',
    primary: '#ff1744', // Neon Red
    secondary: '#ff4569', // Lighter Crimson
    primaryRgb: '255, 23, 68',
    secondaryRgb: '255, 69, 105',
  },
  {
    id: 'gold-black',
    name: 'Molten Gold',
    primary: '#ffd700', // Gold
    secondary: '#ffb300', // Amber
    primaryRgb: '255, 215, 0',
    secondaryRgb: '255, 179, 0',
  },
  {
    id: 'blue-black',
    name: 'Azure Tech',
    primary: '#00bfff', // Electric Blue (DeepSkyBlue)
    secondary: '#00ffff', // Cyan
    primaryRgb: '0, 191, 255',
    secondaryRgb: '0, 255, 255',
  },
];

export const MOTIVATIONAL_MESSAGES = [
  'Keep glowing, you’re unstoppable!',
  'Crushing goals, one pomodoro at a time.',
  'Your focus is electric!',
  'Another session done. You\'re on fire!',
  '💡 New focus streak!',
  'In the zone!',
];

// A short, pleasant notification sound encoded in base64
export const NOTIFICATION_SOUND = 'data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YV';
