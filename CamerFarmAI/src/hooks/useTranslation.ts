import { useLanguage } from './useLanguage';
import { getTranslation, type TranslationKey } from '@/utils/translations';

export function useTranslation() {
  const { language } = useLanguage();

  const t = (key: TranslationKey): string => {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/160298b2-1cd0-45e0-a157-b1b9a1712855',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useTranslation.ts:8',message:'Translation lookup',data:{key,language},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
    // #endregion
    const translation = getTranslation(key, language);
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/160298b2-1cd0-45e0-a157-b1b9a1712855',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useTranslation.ts:11',message:'Translation result',data:{key,language,translation,isKey:translation===key},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
    // #endregion
    return translation;
  };

  return { t, language };
}

