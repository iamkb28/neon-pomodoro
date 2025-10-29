import React, { useEffect, useState } from 'react';
import { html } from '../utils/htm.js';

const FireIcon = () => html`
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth=${2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7.C14.05 5.5 16.5 7.5 16.5 10c0 1-1.543 2.582-2.5 3.5C13 14.582 12 16.5 12 18c0 2.21 1.79 4 4 4a4 4 0 004-4c0-1.657-.895-3.08-2.143-3.843z" />
    </svg>
`;


export const MotivationalToast = ({ message, show, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        // Allow time for fade out animation before calling onClose
        setTimeout(onClose, 500);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return html`
    <div 
      className=${`fixed bottom-5 right-5 flex items-center p-4 rounded-lg border-2 bg-stone-900/80 backdrop-blur-sm shadow-lg transition-all duration-500 transform neon-border ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}
      style=${{ zIndex: 1000 }}
    >
      <${FireIcon} />
      <span className="font-semibold text-lg neon-text">${message}</span>
    </div>
  `;
};
