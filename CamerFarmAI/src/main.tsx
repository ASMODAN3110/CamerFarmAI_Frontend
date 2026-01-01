import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { LanguageProvider } from '@/contexts/LanguageContext';
import './styles/global.css';
import App from './App.tsx';
// Import du script de diagnostic (disponible en développement)
if (import.meta.env.DEV) {
  import('./utils/emailNotificationDiagnostic').then((module) => {
    // Exposer la fonction de diagnostic dans la console
    (window as any).diagnoseEmailNotifications = module.diagnoseEmailNotifications;
  }).catch(() => {
    // Ignorer les erreurs d'import du script de diagnostic
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
    <App />
    </LanguageProvider>
  </StrictMode>
);
