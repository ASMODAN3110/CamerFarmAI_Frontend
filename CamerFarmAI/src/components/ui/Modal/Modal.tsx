import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { Icon } from '@/components/ui/Icon/Icon';
import { FaTimes } from 'react-icons/fa';
import styles from './Modal.module.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  className,
  size = 'md',
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === overlayRef.current) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className={styles.modalOverlay}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
    >
      <div
        ref={modalRef}
        className={`${styles.modal} ${styles[`modal--${size}`]} ${className || ''}`}
      >
        {title && (
          <div className={styles.modal__header}>
            <h2 id="modal-title" className={styles.modal__title}>
              {title}
            </h2>
            <button
              type="button"
              className={styles.modal__closeButton}
              onClick={onClose}
              aria-label="Fermer"
            >
              <Icon icon={FaTimes} size={20} />
            </button>
          </div>
        )}
        <div className={styles.modal__content}>{children}</div>
      </div>
    </div>
  );
}

