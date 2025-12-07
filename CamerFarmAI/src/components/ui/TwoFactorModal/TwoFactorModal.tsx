import { useState, useEffect } from 'react';
import { Modal } from '@/components/ui/Modal/Modal';
import { FormField } from '@/components/ui/FormField/FormField';
import { Button } from '@/components/ui/Button/Button';
import { useTranslation } from '@/hooks/useTranslation';
import { authService } from '@/services/authService';
import { useAuthStore } from '@/services/useAuthStore';
import styles from './TwoFactorModal.module.css';

interface TwoFactorModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'enable' | 'disable';
  onSuccess?: () => void;
}

export function TwoFactorModal({
  isOpen,
  onClose,
  mode,
  onSuccess,
}: TwoFactorModalProps) {
  const { t } = useTranslation();
  const loadUser = useAuthStore((s) => s.loadUser);
  const [step, setStep] = useState<'setup' | 'verify' | 'disable'>('setup');
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [secret, setSecret] = useState<string | null>(null);
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (isOpen && mode === 'enable' && step === 'setup') {
      generateSecret();
    } else if (isOpen && mode === 'disable') {
      setStep('disable');
    }
  }, [isOpen, mode, step]);

  const generateSecret = async () => {
    setIsGenerating(true);
    setError(null);
    try {
      const response = await authService.generateTwoFactorSecret();
      setQrCodeUrl(response.qrCodeUrl);
      setSecret(response.secret);
      setStep('verify');
    } catch (err: any) {
      setError(err?.response?.data?.message || t('profile.twoFactor.error'));
    } finally {
      setIsGenerating(false);
    }
  };

  const handleEnable = async () => {
    if (!code.trim() || code.length !== 6 || !/^\d+$/.test(code)) {
      setError(t('login.errors.twoFactorInvalid'));
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await authService.enableTwoFactor(code);
      await loadUser();
      onSuccess?.();
      handleClose();
    } catch (err: any) {
      setError(err?.response?.data?.message || t('profile.twoFactor.error'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisable = async () => {
    if (!code.trim() || code.length !== 6 || !/^\d+$/.test(code)) {
      setError(t('login.errors.twoFactorInvalid'));
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await authService.disableTwoFactor(code);
      await loadUser();
      onSuccess?.();
      handleClose();
    } catch (err: any) {
      setError(err?.response?.data?.message || t('profile.twoFactor.error'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setStep('setup');
    setQrCodeUrl(null);
    setSecret(null);
    setCode('');
    setError(null);
    onClose();
  };

  const title = mode === 'enable'
    ? (step === 'setup' ? t('profile.twoFactor.setupTitle') : t('profile.twoFactor.setupTitle'))
    : t('profile.twoFactor.disableTitle');

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={title}
      size="md"
    >
      <div className={styles.twoFactorModal}>
        {mode === 'enable' && step === 'verify' && qrCodeUrl && (
          <>
            <p className={styles.twoFactorModal__description}>
              {t('profile.twoFactor.setupDescription')}
            </p>
            <div className={styles.twoFactorModal__qrContainer}>
              <img
                src={qrCodeUrl}
                alt="QR Code 2FA"
                className={styles.twoFactorModal__qrCode}
              />
              <p className={styles.twoFactorModal__qrLabel}>
                {t('profile.twoFactor.scanQRCode')}
              </p>
            </div>
            <div className={styles.twoFactorModal__codeSection}>
              <p className={styles.twoFactorModal__codeDescription}>
                {t('profile.twoFactor.enterCode')}
              </p>
              <FormField
                type="text"
                label={t('profile.twoFactor.codeLabel')}
                placeholder={t('profile.twoFactor.codePlaceholder')}
                value={code}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                  setCode(value);
                  if (error) setError(null);
                }}
                error={error || undefined}
                maxLength={6}
                disabled={isLoading}
              />
              <div className={styles.twoFactorModal__actions}>
                <Button
                  variant="secondary"
                  onClick={handleClose}
                  disabled={isLoading}
                >
                  {t('profile.cancelButton')}
                </Button>
                <Button
                  variant="primary"
                  onClick={handleEnable}
                  disabled={isLoading || code.length !== 6}
                >
                  {isLoading ? t('profile.saving') : t('profile.twoFactor.activateButton')}
                </Button>
              </div>
            </div>
          </>
        )}

        {mode === 'disable' && (
          <>
            <p className={styles.twoFactorModal__description}>
              {t('profile.twoFactor.disableDescription')}
            </p>
            <FormField
              type="text"
              label={t('profile.twoFactor.codeLabel')}
              placeholder={t('profile.twoFactor.codePlaceholder')}
              value={code}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                setCode(value);
                if (error) setError(null);
              }}
              error={error || undefined}
              maxLength={6}
              disabled={isLoading}
            />
            <div className={styles.twoFactorModal__actions}>
              <Button
                variant="secondary"
                onClick={handleClose}
                disabled={isLoading}
              >
                {t('profile.cancelButton')}
              </Button>
              <Button
                variant="primary"
                onClick={handleDisable}
                disabled={isLoading || code.length !== 6}
              >
                {isLoading ? t('profile.saving') : t('profile.twoFactor.deactivateButton')}
              </Button>
            </div>
          </>
        )}

        {isGenerating && (
          <div className={styles.twoFactorModal__loading}>
            <p>{t('profile.loading')}</p>
          </div>
        )}
      </div>
    </Modal>
  );
}

