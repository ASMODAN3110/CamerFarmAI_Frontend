export interface CookiePreferences {
  essential: boolean;
  analytical: boolean;
  functional: boolean;
  marketing: boolean;
  consentGiven: boolean;
  consentDate: string;
}

const COOKIE_PREFERENCES_KEY = 'cookiePreferences';

const DEFAULT_PREFERENCES: CookiePreferences = {
  essential: true,
  analytical: false,
  functional: false,
  marketing: false,
  consentGiven: false,
  consentDate: '',
};

/**
 * Récupère les préférences de cookies depuis localStorage
 */
export function getCookiePreferences(): CookiePreferences {
  if (typeof window === 'undefined') {
    return DEFAULT_PREFERENCES;
  }

  try {
    const stored = localStorage.getItem(COOKIE_PREFERENCES_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as CookiePreferences;
      // S'assurer que essential est toujours true
      return {
        ...parsed,
        essential: true,
      };
    }
  } catch (error) {
    console.warn('Erreur lors de la lecture des préférences de cookies:', error);
  }

  return DEFAULT_PREFERENCES;
}

/**
 * Sauvegarde les préférences de cookies dans localStorage
 */
export function setCookiePreferences(preferences: CookiePreferences): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    // S'assurer que essential est toujours true
    const prefsToSave: CookiePreferences = {
      ...preferences,
      essential: true,
    };
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(prefsToSave));
  } catch (error) {
    console.error('Erreur lors de la sauvegarde des préférences de cookies:', error);
  }
}

/**
 * Vérifie si le consentement a été donné
 */
export function hasConsent(): boolean {
  const preferences = getCookiePreferences();
  return preferences.consentGiven;
}

/**
 * Accepte tous les cookies
 */
export function acceptAll(): void {
  const preferences: CookiePreferences = {
    essential: true,
    analytical: true,
    functional: true,
    marketing: true,
    consentGiven: true,
    consentDate: new Date().toISOString(),
  };
  setCookiePreferences(preferences);
}

/**
 * Rejette tous les cookies sauf les essentiels
 */
export function rejectAll(): void {
  const preferences: CookiePreferences = {
    essential: true,
    analytical: false,
    functional: false,
    marketing: false,
    consentGiven: true,
    consentDate: new Date().toISOString(),
  };
  setCookiePreferences(preferences);
}

/**
 * Sauvegarde des préférences personnalisées
 */
export function savePreferences(preferences: Partial<CookiePreferences>): void {
  const current = getCookiePreferences();
  const updated: CookiePreferences = {
    ...current,
    ...preferences,
    essential: true, // Toujours true
    consentGiven: true,
    consentDate: preferences.consentDate || current.consentDate || new Date().toISOString(),
  };
  setCookiePreferences(updated);
}

