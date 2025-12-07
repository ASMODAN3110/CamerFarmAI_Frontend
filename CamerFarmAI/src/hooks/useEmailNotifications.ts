import { useState, useEffect, useCallback } from 'react';
import { notificationService, type Notification, type NotificationStats } from '@/services/notificationService';
import { useAuthStore } from '@/services/useAuthStore';

interface UseEmailNotificationsReturn {
  emailNotifications: Notification[];
  stats: NotificationStats | null;
  isLoading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
  deleteNotification: (id: string) => Promise<void>;
  getEmailStatusLabel: (notification: Notification) => string;
}

/**
 * Hook personnalisé pour gérer spécifiquement les notifications email
 * Filtre automatiquement les notifications par canal 'email'
 */
export function useEmailNotifications(options?: {
  autoRefresh?: boolean;
  refreshInterval?: number;
}): UseEmailNotificationsReturn {
  const { autoRefresh = true, refreshInterval = 120000 } = options || {}; // 120 secondes (2 minutes) pour les emails pour réduire les appels
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  
  const [emailNotifications, setEmailNotifications] = useState<Notification[]>([]);
  const [stats, setStats] = useState<NotificationStats | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  /**
   * Charge les notifications email et les statistiques
   */
  const loadEmailNotifications = useCallback(async () => {
    if (!isAuthenticated) {
      setEmailNotifications([]);
      setStats(null);
      setError(null);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      // Récupérer toutes les notifications d'abord
      const allNotifications = await notificationService.getAll();
      
      // Filtrer uniquement les notifications email
      const emails = allNotifications
        .filter(notif => notif.canal === 'email')
        .sort((a, b) => new Date(b.dateEnvoi).getTime() - new Date(a.dateEnvoi).getTime());
      
      // Calculer les stats en passant les notifications déjà chargées pour éviter un appel API supplémentaire
      const statsData = await notificationService.getStats(allNotifications);
      
      setEmailNotifications(emails);
      setStats(statsData);
      
      if (import.meta.env.DEV) {
        console.log(`📧 ${emails.length} notification(s) email chargée(s)`);
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Erreur lors du chargement des notifications email');
      setError(error);
      
      if (import.meta.env.DEV) {
        console.error('Erreur lors du chargement des notifications email:', err);
      }
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  /**
   * Rafraîchit les notifications email manuellement
   */
  const refresh = useCallback(async () => {
    await loadEmailNotifications();
  }, [loadEmailNotifications]);

  /**
   * Marque une notification email comme lue
   */
  const markAsRead = useCallback(async (id: string) => {
    try {
      const updatedNotification = await notificationService.markAsRead(id);
      
      // Mettre à jour la notification dans la liste locale
      setEmailNotifications(prev =>
        prev.map(notif => notif.id === id ? updatedNotification : notif)
      );
      
      // Recharger les stats
      const stats = await notificationService.getStats();
      setStats(stats);
    } catch (err) {
      if (import.meta.env.DEV) {
        console.error('Erreur lors du marquage de la notification email comme lue:', err);
      }
      await loadEmailNotifications();
      throw err;
    }
  }, [loadEmailNotifications]);

  /**
   * Supprime une notification email
   */
  const deleteNotification = useCallback(async (id: string) => {
    try {
      await notificationService.delete(id);
      
      // Retirer la notification de la liste locale
      setEmailNotifications(prev => prev.filter(notif => notif.id !== id));
      
      // Recharger les stats
      const stats = await notificationService.getStats();
      setStats(stats);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Erreur lors de la suppression de la notification email');
      setError(error);
      
      if (import.meta.env.DEV) {
        console.error('Erreur lors de la suppression de la notification email:', err);
      }
      
      await loadEmailNotifications();
      throw error;
    }
  }, [loadEmailNotifications]);

  /**
   * Obtient le label du statut d'envoi d'un email
   */
  const getEmailStatusLabel = useCallback((notification: Notification): string => {
    switch (notification.statut) {
      case 'ENVOYEE':
        return '✅ Email envoyé';
      case 'EN_ATTENTE':
        return '⏳ En attente d\'envoi';
      case 'ERREUR':
        return '❌ Erreur d\'envoi';
      default:
        return '❓ Statut inconnu';
    }
  }, []);

  // Charger les notifications au montage et quand l'authentification change
  useEffect(() => {
    loadEmailNotifications();
  }, [loadEmailNotifications]);

  // Polling périodique pour rafraîchir les notifications email
  useEffect(() => {
    if (!isAuthenticated || !autoRefresh) return;

    const interval = setInterval(() => {
      loadEmailNotifications();
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [isAuthenticated, autoRefresh, refreshInterval, loadEmailNotifications]);

  return {
    emailNotifications,
    stats,
    isLoading,
    error,
    refresh,
    markAsRead,
    deleteNotification,
    getEmailStatusLabel,
  };
}

