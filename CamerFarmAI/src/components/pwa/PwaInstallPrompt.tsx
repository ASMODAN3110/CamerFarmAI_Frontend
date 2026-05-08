import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/Button/Button';
import styles from './PwaInstallPrompt.module.css';

const STORAGE_KEY = 'camerfarm-pwa-install-dismissed-at';
const DISMISS_MS = 7 * 24 * 60 * 60 * 1000;

function isStandaloneDisplay(): boolean {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    window.matchMedia('(display-mode: fullscreen)').matches ||
    (window.navigator as Navigator & { standalone?: boolean }).standalone === true
  );
}

function isIosDevice(): boolean {
  const ua = navigator.userAgent;
  return /iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
}

function isIosInstallableSafari(): boolean {
  if (!isIosDevice()) return false;
  const ua = navigator.userAgent;
  if (/CriOS|FxiOS|EdgiOS/.test(ua)) return false;
  return true;
}

function isMobileishViewport(): boolean {
  return window.matchMedia('(max-width: 768px), (pointer: coarse)').matches;
}

function wasDismissedRecently(): boolean {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return false;
  const t = parseInt(raw, 10);
  if (Number.isNaN(t)) return false;
  return Date.now() - t < DISMISS_MS;
}

type IosPromptMode = 'none' | 'safari' | 'otherBrowser';

export function PwaInstallPrompt() {
  const { t } = useTranslation();
  const [eligible, setEligible] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [iosMode, setIosMode] = useState<IosPromptMode>('none');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (isStandaloneDisplay() || wasDismissedRecently()) return;
    setEligible(isMobileishViewport());
  }, []);

  useEffect(() => {
    if (!eligible) return;

    let bipFired = false;
    const onBip = (e: Event) => {
      e.preventDefault();
      bipFired = true;
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener('beforeinstallprompt', onBip);

    const timer = window.setTimeout(() => {
      if (bipFired) return;
      if (isIosDevice()) {
        if (isIosInstallableSafari()) setIosMode('safari');
        else setIosMode('otherBrowser');
      }
    }, 4000);

    return () => {
      window.removeEventListener('beforeinstallprompt', onBip);
      window.clearTimeout(timer);
    };
  }, [eligible]);

  useEffect(() => {
    if (deferredPrompt) setIosMode('none');
  }, [deferredPrompt]);

  const handleDismiss = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, String(Date.now()));
    setDeferredPrompt(null);
    setIosMode('none');
  }, []);

  const handleInstallClick = useCallback(async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
  }, [deferredPrompt]);

  if (!eligible) return null;

  const open = deferredPrompt !== null || iosMode !== 'none';
  if (!open) return null;

  const isAndroidPrompt = deferredPrompt !== null;
  const title = isAndroidPrompt
    ? t('pwa.install.title')
    : iosMode === 'safari'
      ? t('pwa.install.iosTitle')
      : t('pwa.install.iosUseSafariTitle');
  const description = isAndroidPrompt
    ? t('pwa.install.androidDescription')
    : iosMode === 'safari'
      ? t('pwa.install.iosDescription')
      : t('pwa.install.iosUseSafariDescription');

  return (
    <div className={styles.banner} role="dialog" aria-labelledby="pwa-install-title">
      <div className={styles.inner}>
        <div className={styles.copy}>
          <h2 id="pwa-install-title" className={styles.title}>
            {title}
          </h2>
          <p className={styles.text}>{description}</p>
        </div>
        <div className={styles.actions}>
          {isAndroidPrompt ? (
            <Button variant="primary" size="sm" type="button" onClick={handleInstallClick}>
              {t('pwa.install.button')}
            </Button>
          ) : null}
          <Button variant="ghost" size="sm" type="button" onClick={handleDismiss}>
            {t('pwa.install.dismiss')}
          </Button>
        </div>
      </div>
    </div>
  );
}
