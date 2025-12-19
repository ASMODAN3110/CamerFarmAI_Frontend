import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'fr' | 'en' | 'ff' | 'ew';

const LANGUAGE_KEY = 'camerfarm-language';
const DEFAULT_LANGUAGE: Language = 'fr';

interface LanguageContextType {
  language: Language;
  changeLanguage: (newLanguage: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(LANGUAGE_KEY) as Language;
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/160298b2-1cd0-45e0-a157-b1b9a1712855',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'LanguageContext.tsx:22',message:'LanguageProvider init',data:{stored,isValid:stored==='fr'||stored==='en'||stored==='ff'||stored==='ew',finalLanguage:stored&&(stored==='fr'||stored==='en'||stored==='ff'||stored==='ew')?stored:DEFAULT_LANGUAGE},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
      // #endregion
      return stored && (stored === 'fr' || stored === 'en' || stored === 'ff' || stored === 'ew') ? stored : DEFAULT_LANGUAGE;
    }
    return DEFAULT_LANGUAGE;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(LANGUAGE_KEY, language);
      document.documentElement.lang = language;
    }
  }, [language]);

  const changeLanguage = (newLanguage: Language) => {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/160298b2-1cd0-45e0-a157-b1b9a1712855',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'LanguageContext.tsx:35',message:'changeLanguage called',data:{newLanguage,isEw:newLanguage==='ew'},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
    // #endregion
    setLanguage(newLanguage);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

