import { useTranslation } from '@/hooks/useTranslation';
import type { NotificationStats as NotificationStatsType } from '@/services/notificationService';
import styles from './NotificationStats.module.css';

interface NotificationStatsProps {
  stats: NotificationStatsType | null;
  isLoading?: boolean;
}

export function NotificationStats({ stats, isLoading }: NotificationStatsProps) {
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <div className={styles.statsContainer}>
        <div className={styles.loading}>{t('notifications.stats.loading') || 'Chargement des statistiques...'}</div>
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  return (
    <div className={styles.statsContainer}>
      <h2 className={styles.title}>{t('notifications.stats.title') || 'Statistiques des notifications'}</h2>
      
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <h3 className={styles.statLabel}>{t('notifications.stats.total') || 'Total'}</h3>
          <p className={styles.statValue}>{stats.total}</p>
        </div>
        
        <div className={`${styles.statCard} ${styles.statCardSuccess}`}>
          <h3 className={styles.statLabel}>{t('notifications.stats.envoyees') || 'Envoyées'}</h3>
          <p className={styles.statValue}>{stats.envoyees}</p>
        </div>
        
        <div className={`${styles.statCard} ${styles.statCardWarning}`}>
          <h3 className={styles.statLabel}>{t('notifications.stats.enAttente') || 'En attente'}</h3>
          <p className={styles.statValue}>{stats.enAttente}</p>
        </div>
        
        <div className={`${styles.statCard} ${styles.statCardError}`}>
          <h3 className={styles.statLabel}>{t('notifications.stats.erreurs') || 'Erreurs'}</h3>
          <p className={styles.statValue}>{stats.erreurs}</p>
        </div>
        
        <div className={`${styles.statCard} ${styles.statCardUnread}`}>
          <h3 className={styles.statLabel}>{t('notifications.stats.nonLues') || 'Non lues'}</h3>
          <p className={styles.statValue}>{stats.nonLues}</p>
        </div>
      </div>

      {stats.parCanal && (
        <div className={styles.channelStats}>
          <h3 className={styles.channelTitle}>{t('notifications.stats.parCanal') || 'Par canal'}</h3>
          <div className={styles.channelGrid}>
            <div className={styles.channelItem}>
              <span className={styles.channelLabel}>{t('notifications.canal.web') || 'Web'}</span>
              <span className={styles.channelValue}>{stats.parCanal.web || 0}</span>
            </div>
            <div className={styles.channelItem}>
              <span className={styles.channelLabel}>{t('notifications.canal.email') || 'Email'}</span>
              <span className={styles.channelValue}>{stats.parCanal.email || 0}</span>
            </div>
            <div className={styles.channelItem}>
              <span className={styles.channelLabel}>{t('notifications.canal.whatsapp') || 'WhatsApp'}</span>
              <span className={styles.channelValue}>{stats.parCanal.whatsapp || 0}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

