import { useLanguage } from './useLanguage';
import { getTranslation, type TranslationKey } from '@/utils/translations';

export function useTranslation() {
  const { language } = useLanguage();

  const t = (key: TranslationKey): string => {
    const translation = getTranslation(key, language);
    return translation;
  };

  return { t, language };
}

