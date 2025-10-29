import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import { html } from './utils/htm.js';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  html`
    <${React.StrictMode}>
      <${App} />
    </${React.StrictMode}>
  `
);
