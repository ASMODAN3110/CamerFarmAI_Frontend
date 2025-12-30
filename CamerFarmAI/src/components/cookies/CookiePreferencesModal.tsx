import { useState, useEffect } from 'react';
import { Modal } from '@/components/ui/Modal/Modal';
import { Button } from '@/components/ui/Button/Button';
import { useCookiePreferences } from '@/contexts/CookieContext';
import { useTranslation } from '@/hooks/useTranslation';
import { FaCookie } from 'react-icons/fa';
import styles from './CookiePreferencesModal.module.css';

interface CookiePreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CookiePreferencesModal({ isOpen, onClose }: CookiePreferencesModalProps) {
  const { preferences, acceptAll, rejectAll, saveCustomPreferences } = useCookiePreferences();
  const { t } = useTranslation();
  
  const [localPreferences, setLocalPreferences] = useState({
    analytical: preferences.analytical,
    functional: preferences.functional,
    marketing: preferences.marketing,
  });

  // Synchroniser avec les préférences du context quand le modal s'ouvre
  useEffect(() => {
    if (isOpen) {
      setLocalPreferences({
        analytical: preferences.analytical,
        functional: preferences.functional,
        marketing: preferences.marketing,
      });
    }
  }, [isOpen, preferences]);

  const handleToggle = (type: 'analytical' | 'functional' | 'marketing') => {
    setLocalPreferences((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const handleAcceptAll = () => {
    acceptAll();
    onClose();
  };

  const handleRejectAll = () => {
    rejectAll();
    onClose();
  };

  const handleSave = () => {
    saveCustomPreferences(localPreferences);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t('cookies.preferences.title')}
      size="lg"
    >
      <div className={styles.preferencesModal}>
        <p className={styles.preferencesModal__description}>
          {t('cookies.preferences.description')}
        </p>

        {/* Cookie essentiels - toujours activé */}
        <div className={styles.preferencesModal__item}>
          <div className={styles.preferencesModal__itemHeader}>
            <div className={styles.preferencesModal__itemInfo}>
              <h3 className={styles.preferencesModal__itemTitle}>
                {t('cookies.preferences.essential.label')}
              </h3>
              <p className={styles.preferencesModal__itemDescription}>
                {t('cookies.preferences.essential.description')}
              </p>
            </div>
            <div className={`${styles.preferencesModal__toggle} ${styles.preferencesModal__toggleDisabled}`}>
              <input
                type="checkbox"
                checked={true}
                disabled
                readOnly
                className={styles.preferencesModal__checkbox}
              />
              <span className={styles.preferencesModal__toggleLabel}>Activé</span>
            </div>
          </div>
        </div>

        {/* Cookie analytiques */}
        <div className={styles.preferencesModal__item}>
          <div className={styles.preferencesModal__itemHeader}>
            <div className={styles.preferencesModal__itemInfo}>
              <h3 className={styles.preferencesModal__itemTitle}>
                {t('cookies.preferences.analytical.label')}
              </h3>
              <p className={styles.preferencesModal__itemDescription}>
                {t('cookies.preferences.analytical.description')}
              </p>
            </div>
            <div className={styles.preferencesModal__toggle}>
              <label className={styles.preferencesModal__toggleLabel}>
                <input
                  type="checkbox"
                  checked={localPreferences.analytical}
                  onChange={() => handleToggle('analytical')}
                  className={styles.preferencesModal__checkbox}
                />
                <span className={styles.preferencesModal__slider}></span>
              </label>
            </div>
          </div>
        </div>

        {/* Cookie fonctionnels */}
        <div className={styles.preferencesModal__item}>
          <div className={styles.preferencesModal__itemHeader}>
            <div className={styles.preferencesModal__itemInfo}>
              <h3 className={styles.preferencesModal__itemTitle}>
                {t('cookies.preferences.functional.label')}
              </h3>
              <p className={styles.preferencesModal__itemDescription}>
                {t('cookies.preferences.functional.description')}
              </p>
            </div>
            <div className={styles.preferencesModal__toggle}>
              <label className={styles.preferencesModal__toggleLabel}>
                <input
                  type="checkbox"
                  checked={localPreferences.functional}
                  onChange={() => handleToggle('functional')}
                  className={styles.preferencesModal__checkbox}
                />
                <span className={styles.preferencesModal__slider}></span>
              </label>
            </div>
          </div>
        </div>

        {/* Cookie marketing */}
        <div className={styles.preferencesModal__item}>
          <div className={styles.preferencesModal__itemHeader}>
            <div className={styles.preferencesModal__itemInfo}>
              <h3 className={styles.preferencesModal__itemTitle}>
                {t('cookies.preferences.marketing.label')}
              </h3>
              <p className={styles.preferencesModal__itemDescription}>
                {t('cookies.preferences.marketing.description')}
              </p>
            </div>
            <div className={styles.preferencesModal__toggle}>
              <label className={styles.preferencesModal__toggleLabel}>
                <input
                  type="checkbox"
                  checked={localPreferences.marketing}
                  onChange={() => handleToggle('marketing')}
                  className={styles.preferencesModal__checkbox}
                />
                <span className={styles.preferencesModal__slider}></span>
              </label>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className={styles.preferencesModal__actions}>
          <Button
            variant="ghost"
            size="md"
            onClick={handleRejectAll}
            className={styles.preferencesModal__actionButton}
          >
            {t('cookies.preferences.rejectAll')}
          </Button>
          <Button
            variant="ghost"
            size="md"
            onClick={handleAcceptAll}
            className={styles.preferencesModal__actionButton}
          >
            {t('cookies.preferences.acceptAll')}
          </Button>
          <Button
            variant="secondary"
            size="md"
            onClick={onClose}
            className={styles.preferencesModal__actionButton}
          >
            {t('cookies.preferences.cancel')}
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={handleSave}
            className={styles.preferencesModal__actionButton}
          >
            {t('cookies.preferences.save')}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

