import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Clean up any previously registered service workers to prevent intercepting preview/iframe requests or causing internal fetch errors
if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator) {
  try {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      for (const registration of registrations) {
        registration.unregister().catch(() => {});
      }
    }).catch(() => {});
  } catch {
    // Ignore environments where serviceWorker access is restricted
  }
}

createRoot(document.getElementById('root')!).render(<App />);
