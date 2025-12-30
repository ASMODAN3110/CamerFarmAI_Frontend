import { useLanguage } from './useLanguage';
import { getTranslation, type TranslationKey } from '@/utils/translations';

export function useTranslation() {
  const { language } = useLanguage();

  const t = (key: TranslationKey): string => {
    const translation = getTranslation(key, language);
    
    // #region agent log
    if (language === 'fr') {
      fetch('http://127.0.0.1:7242/ingest/160298b2-1cd0-45e0-a157-b1b9a1712855',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useTranslation.ts:12',message:'Translation used',data:{key,translation,language},timestamp:Date.now(),sessionId:'translation-review',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
    }
    // #endregion
    
    return translation;
  };

  return { t, language };
}

