import React from 'react';
import { html } from '../utils/htm.js';

export const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseClasses = 'px-6 py-2 font-bold uppercase tracking-widest rounded-md border-2 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-opacity-50';
  
  const variantClasses = variant === 'primary' 
    ? 'text-white bg-[rgba(var(--theme-color-primary),0.2)] hover:bg-[rgba(var(--theme-color-primary),0.4)] focus:ring-[rgba(var(--theme-color-primary),0.7)] neon-border'
    : 'text-stone-300 bg-stone-800 border-stone-700 hover:bg-stone-700 hover:border-stone-500 focus:ring-stone-500';

  return html`
    <button className=${`${baseClasses} ${variantClasses} ${className}`} ...${props}>
      ${children}
    </button>
  `;
};
