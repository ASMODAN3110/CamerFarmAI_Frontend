import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { useNotificationContext } from '@/contexts/NotificationContext';
import { useEnrichedNotifications } from '@/hooks/useEnrichedNotifications';
import { notificationService } from '@/services/notificationService';
import { NotificationCanal, NotificationStatut } from '@/types/enums';
import { NotificationStats } from '@/components/notifications/NotificationStats';
import { NotificationList } from '@/components/notifications/NotificationList';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Background3D } from '@/components/ui/Background3D/Background3D';
import { FloatingButton } from '@/components/ui/FloatingButton/FloatingButton';
import { FaTrash } from 'react-icons/fa';
import { Button } from '@/components/ui/Button/Button';
import { ConfirmationModal } from '@/components/ui/ConfirmationModal/ConfirmationModal';
import styles from './NotificationsPage.module.css';

type FilterType = 'all' | 'web' | 'email' | 'unread';

export function NotificationsPage() {
  const { t } = useTranslation();
  const { notifications: contextNotifications, stats, isLoading, refresh, markAsRead, deleteNotification } = useNotificationContext();
  const [filter, setFilter] = useState<FilterType>('all');
  const [notifications, setNotifications] = useState(contextNotifications);
  const [isLoadingFiltered, setIsLoadingFiltered] = useState(false);
  const [isDeletingAll, setIsDeletingAll] = useState(false);
  const [isDeleteAllModalOpen, setIsDeleteAllModalOpen] = useState(false);

  // Utiliser le hook pour enrichir les notifications (remplacer "undefined" par le nom de la plantation)
  const enrichedNotifications = useEnrichedNotifications(notifications);

  // Charger les notifications selon le filtre
  useEffect(() => {
    const loadFilteredNotifications = async () => {
      setIsLoadingFiltered(true);
      try {
        let filtered: typeof contextNotifications = [];

        switch (filter) {
          case 'web':
            filtered = await notificationService.getAllWeb();
            break;
          case 'email':
            filtered = await notificationService.getAllEmail();
            break;
          case 'unread':
            filtered = await notificationService.getAll(true);
            break;
          case 'all':
          default:
            filtered = await notificationService.getAll();
            break;
        }

        setNotifications(filtered);
      } catch (error) {
        console.error('Erreur lors du chargement des notifications filtrées:', error);
        setNotifications(contextNotifications);
      } finally {
        setIsLoadingFiltered(false);
      }
    };

    loadFilteredNotifications();
  }, [filter, contextNotifications]);

  // Mettre à jour les notifications quand le contexte change
  useEffect(() => {
    setNotifications(contextNotifications);
  }, [contextNotifications]);

  const handleMarkAsRead = async (id: string) => {
    try {
      await markAsRead(id);
      // Rafraîchir après le marquage
      await refresh();
    } catch (error) {
      console.error('Erreur lors du marquage comme lu:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteNotification(id);
      // Rafraîchir après la suppression
      await refresh();
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
    }
  };

  const handleFilterChange = (newFilter: FilterType) => {
    setFilter(newFilter);
  };

  const handleDeleteAllClick = () => {
    if (notifications.length === 0) return;
    setIsDeleteAllModalOpen(true);
  };

  const handleConfirmDeleteAll = async () => {
    setIsDeletingAll(true);
    try {
      // Supprimer toutes les notifications une par une
      const deletePromises = notifications.map(notif => notificationService.delete(notif.id));
      await Promise.all(deletePromises);

      // Rafraîchir après la suppression
      await refresh();
      setIsDeleteAllModalOpen(false);
    } catch (error) {
      console.error('Erreur lors de la suppression de toutes les notifications:', error);
      // Ici on pourrait ajouter un toast d'erreur si disponible
    } finally {
      setIsDeletingAll(false);
    }
  };



  const navItems = [
    { href: '/', label: t('nav.home') || 'Accueil' },
    { href: '/plantations', label: t('nav.plantations') || 'Plantations' },
    { href: '/ai', label: t('nav.ai') || 'IA' },
    { href: '/support', label: t('nav.support') || 'Support' },
    // Ne pas afficher "Surveillance", "Graphiques" et "Notifications" dans le header quand on est sur la page notifications
  ];

  return (
    <>
      <Background3D />
      <Header navItems={navItems} currentPath="/notifications" showAuthIcons={true} />
      <main className={styles.page}>
        <div className={styles.container}>
          <div className={styles.headerSection}>
            <h1 className={styles.title}>{t('notifications.pageTitle') || 'Notifications'}</h1>
            {notifications.length > 0 && (
              <Button
                variant="secondary"
                size="sm"
                onClick={handleDeleteAllClick}
                disabled={isDeletingAll || isLoading || isLoadingFiltered}
                className={styles.deleteAllButton}
                aria-label={t('notifications.deleteAll.button') || 'Supprimer toutes les notifications'}
              >
                <FaTrash size={14} />
                {isDeletingAll
                  ? (t('notifications.deleteAll.deleting') || 'Suppression...')
                  : (t('notifications.deleteAll.button') || 'Tout supprimer')
                }
              </Button>
            )}
          </div>



          <NotificationStats stats={stats} isLoading={isLoading} />

          <NotificationList
            notifications={enrichedNotifications}
            isLoading={isLoading || isLoadingFiltered}
            onMarkAsRead={handleMarkAsRead}
            onDelete={handleDelete}
            filter={filter}
            onFilterChange={handleFilterChange}
          />

          <ConfirmationModal
            isOpen={isDeleteAllModalOpen}
            onClose={() => setIsDeleteAllModalOpen(false)}
            onConfirm={handleConfirmDeleteAll}
            title={t('notifications.deleteAll.button') || 'Tout supprimer'}
            message={`${t('notifications.deleteAll.confirm') || 'Êtes-vous sûr de vouloir supprimer toutes les notifications ? Cette action est irréversible.'}\n\n${notifications.length} notification(s) seront supprimée(s).`}
            confirmLabel={t('notifications.delete') || 'Supprimer'}
            cancelLabel={t('plantations.createModal.cancel') || 'Annuler'}
            isConfirming={isDeletingAll}
            variant="danger"
          />
        </div>
      </main>
      <Footer />
      <FloatingButton
        href="/ai"
        position="bottom-right"
        aria-label={t('floatingButton.ariaLabel') || 'Ouvrir l\'assistant IA'}
      />
    </>
  );
}

