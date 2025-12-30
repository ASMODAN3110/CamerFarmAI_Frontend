import { useState } from 'react';
import { useCookiePreferences } from '@/contexts/CookieContext';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/Button/Button';
import { CookiePreferencesModal } from './CookiePreferencesModal';
import styles from './CookieBanner.module.css';

export function CookieBanner() {
  const { hasConsent, acceptAll, rejectAll } = useCookiePreferences();
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Ne pas afficher si le consentement a déjà été donné
  if (hasConsent()) {
    return null;
  }

  const handleAcceptAll = () => {
    acceptAll();
  };

  const handleRejectAll = () => {
    rejectAll();
  };

  const handleCustomize = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className={styles.cookieBanner}>
        <div className={styles.cookieBanner__container}>
          <div className={styles.cookieBanner__content}>
            <h3 className={styles.cookieBanner__title}>
              {t('cookies.banner.title')}
            </h3>
            <p className={styles.cookieBanner__description}>
              {t('cookies.banner.description')}
            </p>
          </div>
          <div className={styles.cookieBanner__actions}>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleRejectAll}
              className={styles.cookieBanner__button}
            >
              {t('cookies.banner.rejectAll')}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCustomize}
              className={styles.cookieBanner__button}
            >
              {t('cookies.banner.customize')}
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleAcceptAll}
              className={styles.cookieBanner__button}
            >
              {t('cookies.banner.acceptAll')}
            </Button>
          </div>
        </div>
      </div>
      <CookiePreferencesModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
      />
    </>
  );
}

