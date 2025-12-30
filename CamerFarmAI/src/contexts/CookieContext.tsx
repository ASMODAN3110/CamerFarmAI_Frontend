import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { CookiePreferences } from '@/services/cookieService';
import {
  getCookiePreferences,
  setCookiePreferences,
  acceptAll as acceptAllCookies,
  rejectAll as rejectAllCookies,
  savePreferences,
} from '@/services/cookieService';

interface CookieContextType {
  preferences: CookiePreferences;
  updatePreferences: (prefs: Partial<CookiePreferences>) => void;
  acceptAll: () => void;
  rejectAll: () => void;
  saveCustomPreferences: (prefs: Partial<CookiePreferences>) => void;
  hasConsent: () => boolean;
}

const CookieContext = createContext<CookieContextType | undefined>(undefined);

interface CookieProviderProps {
  children: ReactNode;
}

export function CookieProvider({ children }: CookieProviderProps) {
  const [preferences, setPreferencesState] = useState<CookiePreferences>(() => {
    if (typeof window !== 'undefined') {
      return getCookiePreferences();
    }
    return {
      essential: true,
      analytical: false,
      functional: false,
      marketing: false,
      consentGiven: false,
      consentDate: '',
    };
  });

  // Synchroniser avec localStorage lors des changements
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCookiePreferences(preferences);
    }
  }, [preferences]);

  const updatePreferences = (prefs: Partial<CookiePreferences>) => {
    setPreferencesState((prev) => ({
      ...prev,
      ...prefs,
      essential: true, // Toujours true
    }));
  };

  const acceptAll = () => {
    acceptAllCookies();
    setPreferencesState(getCookiePreferences());
  };

  const rejectAll = () => {
    rejectAllCookies();
    setPreferencesState(getCookiePreferences());
  };

  const saveCustomPreferences = (prefs: Partial<CookiePreferences>) => {
    savePreferences(prefs);
    setPreferencesState(getCookiePreferences());
  };

  const hasConsent = () => {
    return preferences.consentGiven;
  };

  return (
    <CookieContext.Provider
      value={{
        preferences,
        updatePreferences,
        acceptAll,
        rejectAll,
        saveCustomPreferences,
        hasConsent,
      }}
    >
      {children}
    </CookieContext.Provider>
  );
}

export function useCookiePreferences() {
  const context = useContext(CookieContext);
  if (context === undefined) {
    throw new Error('useCookiePreferences must be used within a CookieProvider');
  }
  return context;
}

