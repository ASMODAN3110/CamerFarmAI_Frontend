import { useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { notificationService, type Notification } from '@/services/notificationService';
import { NotificationCanal, NotificationStatut } from '@/types/enums';
import { getEventTypeLabel, getPlantationName } from '@/utils/notificationFormatters';
import { FaTrash, FaCheck, FaEnvelope, FaGlobe, FaExclamationCircle, FaClock, FaCheckCircle } from 'react-icons/fa';
import styles from './NotificationList.module.css';

interface NotificationListProps {
  notifications: Notification[];
  isLoading?: boolean;
  onMarkAsRead: (id: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  filter?: 'all' | 'web' | 'email' | 'unread';
  onFilterChange?: (filter: 'all' | 'web' | 'email' | 'unread') => void;
}

export function NotificationList({
  notifications,
  isLoading,
  onMarkAsRead,
  onDelete,
  filter = 'all',
  onFilterChange,
}: NotificationListProps) {
  const { t, language } = useTranslation();
  const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set());
  const [markingAsReadIds, setMarkingAsReadIds] = useState<Set<string>>(new Set());

  const formatRelativeTime = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) {
      return t('notifications.justNow') || 'À l\'instant';
    }
    if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} ${t('notifications.minutesAgo') || 'min'}`;
    }
    if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} ${t('notifications.hoursAgo') || 'h'}`;
    }
    if (diffInSeconds < 604800) {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} ${t('notifications.daysAgo') || 'j'}`;
    }
    return date.toLocaleDateString(language === 'en' ? 'en-US' : 'fr-FR', { day: 'numeric', month: 'short' });
  };

  const getStatusBadge = (statut: NotificationStatut) => {
    switch (statut) {
      case NotificationStatut.ENVOYEE:
        return {
          text: t('notifications.status.envoyee') || 'Envoyée',
          className: styles.badgeSuccess,
          icon: FaCheckCircle,
        };
      case NotificationStatut.EN_ATTENTE:
        return {
          text: t('notifications.status.enAttente') || 'En attente',
          className: styles.badgeWarning,
          icon: FaClock,
        };
      case NotificationStatut.ERREUR:
        return {
          text: t('notifications.status.erreur') || 'Erreur',
          className: styles.badgeError,
          icon: FaExclamationCircle,
        };
      default:
        return {
          text: String(statut),
          className: styles.badgeDefault,
          icon: FaClock,
        };
    }
  };

  const getCanalIcon = (canal: NotificationCanal) => {
    switch (canal) {
      case NotificationCanal.EMAIL:
        return FaEnvelope; // 📧 Email
      case NotificationCanal.WEB:
        return FaGlobe; // 🔔 Web (utilise globe pour représenter web)
      case NotificationCanal.WHATSAPP:
        return FaEnvelope; // Fallback pour WhatsApp
      default:
        return FaGlobe;
    }
  };

  const handleMarkAsRead = async (id: string) => {
    if (markingAsReadIds.has(id)) return;
    try {
      setMarkingAsReadIds(prev => new Set(prev).add(id));
      await onMarkAsRead(id);
    } finally {
      setMarkingAsReadIds(prev => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (deletingIds.has(id)) return;
    if (!confirm(t('notifications.confirmDelete') || 'Voulez-vous vraiment supprimer cette notification ?')) {
      return;
    }
    try {
      setDeletingIds(prev => new Set(prev).add(id));
      await onDelete(id);
    } finally {
      setDeletingIds(prev => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'web') return notif.canal === NotificationCanal.WEB;
    if (filter === 'email') return notif.canal === NotificationCanal.EMAIL;
    if (filter === 'unread') return !notif.isRead;
    return true;
  });

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>{t('notifications.loading') || 'Chargement...'}</div>
      </div>
    );
  }

  if (filteredNotifications.length === 0) {
    return (
      <div className={styles.container}>
        {onFilterChange && (
          <div className={styles.filters}>
            <button
              className={filter === 'all' ? styles.filterActive : styles.filterButton}
              onClick={() => onFilterChange('all')}
            >
              {t('notifications.filters.all') || 'Toutes'}
            </button>
            <button
              className={filter === 'web' ? styles.filterActive : styles.filterButton}
              onClick={() => onFilterChange('web')}
            >
              {t('notifications.filters.web') || 'Web'}
            </button>
            <button
              className={filter === 'email' ? styles.filterActive : styles.filterButton}
              onClick={() => onFilterChange('email')}
            >
              {t('notifications.filters.email') || 'Email'}
            </button>
            <button
              className={filter === 'unread' ? styles.filterActive : styles.filterButton}
              onClick={() => onFilterChange('unread')}
            >
              {t('notifications.filters.unread') || 'Non lues'}
            </button>
          </div>
        )}
        <div className={styles.empty}>
          {t('notifications.empty') || 'Aucune notification'}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {onFilterChange && (
        <div className={styles.filters}>
          <button
            className={filter === 'all' ? styles.filterActive : styles.filterButton}
            onClick={() => onFilterChange('all')}
          >
            {t('notifications.filters.all') || 'Toutes'}
          </button>
          <button
            className={filter === 'web' ? styles.filterActive : styles.filterButton}
            onClick={() => onFilterChange('web')}
          >
            {t('notifications.filters.web') || 'Web'}
          </button>
          <button
            className={filter === 'email' ? styles.filterActive : styles.filterButton}
            onClick={() => onFilterChange('email')}
          >
            {t('notifications.filters.email') || 'Email'}
          </button>
          <button
            className={filter === 'unread' ? styles.filterActive : styles.filterButton}
            onClick={() => onFilterChange('unread')}
          >
            {t('notifications.filters.unread') || 'Non lues'}
          </button>
        </div>
      )}

      <div className={styles.list}>
        {filteredNotifications.map((notification) => {
          const statusBadge = getStatusBadge(notification.statut);
          const CanalIcon = getCanalIcon(notification.canal);
          const plantationName = getPlantationName(notification.event);
          const eventTypeLabel = notification.event?.type
            ? getEventTypeLabel(notification.event.type)
            : null;

          return (
            <div
              key={notification.id}
              className={`${styles.notificationItem} ${!notification.isRead ? styles.notificationItemUnread : ''
                }`}
            >
              <div className={styles.notificationHeader}>
                <div className={styles.notificationTitleRow}>
                  {eventTypeLabel && (
                    <h3 className={styles.notificationTitle}>{eventTypeLabel}</h3>
                  )}
                  <div className={styles.notificationBadges}>
                    <span className={`${styles.badge} ${statusBadge.className}`}>
                      {(() => {
                        const StatusIcon = statusBadge.icon;
                        return <StatusIcon size={12} />;
                      })()}
                      <span>{statusBadge.text}</span>
                    </span>
                    <span className={`${styles.badge} ${styles.badgeCanal}`}>
                      <CanalIcon size={12} />
                      <span>
                        {notification.canal === NotificationCanal.EMAIL
                          ? t('notifications.canal.email') || 'Email'
                          : notification.canal === NotificationCanal.WEB
                            ? t('notifications.canal.web') || 'Web'
                            : notification.canal}
                      </span>
                    </span>
                  </div>
                </div>
              </div>

              {notification.event && (
                <div className={styles.notificationContent}>
                  <p className={styles.notificationDescription}>
                    {notification.event.description}
                  </p>
                  {plantationName && (
                    <p className={styles.notificationPlantation}>
                      {t('notifications.plantation') || 'Plantation'}: {plantationName}
                    </p>
                  )}
                  {notification.canal === NotificationCanal.EMAIL && notification.statut === NotificationStatut.ERREUR && (
                    <div className={styles.errorInfo}>
                      <p className={styles.errorMessage}>
                        {t('notifications.emailError.hint') || '💡 Cette notification email n\'a pas pu être envoyée. Vérifiez la configuration SMTP du backend.'}
                      </p>
                    </div>
                  )}
                  <p className={styles.notificationDate}>
                    {formatRelativeTime(notification.dateEnvoi)}
                  </p>
                </div>
              )}

              <div className={styles.notificationActions}>
                {!notification.isRead && (
                  <button
                    className={styles.actionButton}
                    onClick={() => handleMarkAsRead(notification.id)}
                    disabled={markingAsReadIds.has(notification.id)}
                    aria-label={t('notifications.markAsRead') || 'Marquer comme lu'}
                  >
                    <FaCheck size={14} />
                    <span>{t('notifications.markAsRead') || 'Marquer comme lu'}</span>
                  </button>
                )}
                <button
                  className={`${styles.actionButton} ${styles.actionButtonDelete}`}
                  onClick={(e) => handleDelete(notification.id, e)}
                  disabled={deletingIds.has(notification.id)}
                  aria-label={t('notifications.delete') || 'Supprimer'}
                >
                  <FaTrash size={14} />
                  <span>{t('notifications.delete') || 'Supprimer'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

