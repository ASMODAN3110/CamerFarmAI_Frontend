import { Modal } from '@/components/ui/Modal/Modal';
import { Button } from '@/components/ui/Button/Button';
import { useTranslation } from '@/hooks/useTranslation';
import styles from './AccountDisabledModal.module.css';

interface AccountDisabledModalProps {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
}

export function AccountDisabledModal({
  isOpen,
  onClose,
  message,
}: AccountDisabledModalProps) {
  const { t } = useTranslation();

  const displayMessage = message || t('login.accountDisabled.message');

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t('login.accountDisabled.title')}
      size="md"
      className={styles.accountDisabledModal}
    >
      <div className={styles.accountDisabledModal__content}>
        <div className={styles.accountDisabledModal__icon}>
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
              fill="currentColor"
            />
          </svg>
        </div>
        <p className={styles.accountDisabledModal__message}>{displayMessage}</p>
        <div className={styles.accountDisabledModal__actions}>
          <Button
            variant="primary"
            size="md"
            onClick={onClose}
            className={styles.accountDisabledModal__closeButton}
          >
            {t('login.accountDisabled.close')}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

