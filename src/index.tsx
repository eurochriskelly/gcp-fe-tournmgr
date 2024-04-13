import React from 'react';
import { createRoot } from 'react-dom/client';
import 'tailwindcss/tailwind.css';
import App from './components/App'; // Adjust the import path if necessary
import { worker } from './mocks/browser'; // Ensure this path is correct based on your file structure

const container = document.getElementById('root') as HTMLDivElement;
const root = createRoot(container);

if (process.env.NODE_ENV === 'development') {
  worker.start({
    onUnhandledRequest: 'bypass'
  });
}

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
