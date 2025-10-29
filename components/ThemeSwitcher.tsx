
import React from 'react';
import type { Theme } from '../types';
import { THEMES } from '../constants';

interface ThemeSwitcherProps {
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ currentTheme, onThemeChange }) => {
  return (
    <div className="absolute top-4 right-4 z-20 flex items-center space-x-2 p-2 bg-stone-900/50 backdrop-blur-sm rounded-lg border border-stone-700">
      <span className="text-sm font-bold text-stone-300">Theme:</span>
      <div className="flex space-x-2">
        {THEMES.map((theme) => (
          <button
            key={theme.id}
            onClick={() => onThemeChange(theme)}
            className={`w-6 h-6 rounded-full border-2 transition-transform duration-200 ${currentTheme.id === theme.id ? 'border-white scale-110' : 'border-transparent hover:scale-110'}`}
            style={{ 
              background: `linear-gradient(45deg, ${theme.primary}, ${theme.secondary})`
            }}
            title={theme.name}
          />
        ))}
      </div>
    </div>
  );
};
