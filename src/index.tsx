import React from 'react';
import { createRoot } from 'react-dom/client';
import 'tailwindcss/tailwind.css';
import App from './components/App'; // Adjust the import path if necessary

const container = document.getElementById('root') as HTMLDivElement;
const root = createRoot(container);


async function enableMocking() {
  if (process.env.NODE_ENV !== 'development') {
    return
  }
  const { worker } = await import('./mocks/browser')
  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start()
}

enableMocking().then(() => {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
})


