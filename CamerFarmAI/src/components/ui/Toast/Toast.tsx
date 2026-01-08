import { useEffect } from 'react';
import { FaTimes, FaCheckCircle, FaExclamationCircle, FaInfoCircle } from 'react-icons/fa';
import styles from './Toast.module.css';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
  duration?: number; // Durée en millisecondes avant auto-fermeture (défaut: 4000ms)
}

export function Toast({ message, type, onClose, duration = 4000 }: ToastProps) {
  useEffect(() => {
    // Auto-fermeture après la durée spécifiée
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose, duration]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <FaCheckCircle className={styles.toastIcon} />;
      case 'error':
        return <FaExclamationCircle className={styles.toastIcon} />;
      case 'info':
        return <FaInfoCircle className={styles.toastIcon} />;
      default:
        return null;
    }
  };

  const getToastClassName = () => {
    const baseClass = styles.toast;
    const typeClass = type === 'success' ? styles['toast--success'] :
                     type === 'error' ? styles['toast--error'] :
                     styles['toast--info'];
    return `${baseClass} ${typeClass}`;
  };

  return (
    <div className={getToastClassName()} role="alert">
      <div className={styles.toastContent}>
        {getIcon()}
        <span className={styles.toastMessage}>{message}</span>
      </div>
      <button
        className={styles.toastClose}
        onClick={onClose}
        aria-label="Fermer"
        type="button"
      >
        <FaTimes />
      </button>
    </div>
  );
}

