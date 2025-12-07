import { useState, useEffect, useCallback } from 'react';
import { notificationService, type Notification, type NotificationStats } from '@/services/notificationService';
import { useAuthStore } from '@/services/useAuthStore';

interface UseNotificationsReturn {
  notifications: Notification[];
  stats: NotificationStats | null;
  isLoading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
  deleteNotification: (id: string) => Promise<void>;
}

/**
 * Hook personnalisé pour gérer les notifications
 * Centralise la logique de chargement, rafraîchissement et gestion des notifications
 */
export function useNotifications(options?: {
  autoRefresh?: boolean;
  refreshInterval?: number;
  unreadOnly?: boolean;
}): UseNotificationsReturn {
  const { autoRefresh = true, refreshInterval = 60000, unreadOnly = false } = options || {}; // 60 secondes pour optimiser
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [stats, setStats] = useState<NotificationStats | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  /**
   * Charge les notifications et les statistiques
   */
  const loadNotifications = useCallback(async () => {
    if (!isAuthenticated) {
      setNotifications([]);
      setStats(null);
      setError(null);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      const [notificationsData, statsData] = await Promise.all([
        unreadOnly ? notificationService.getAll(true) : notificationService.getAllWeb(),
        notificationService.getStats(),
      ]);
      
      setNotifications(notificationsData);
      setStats(statsData);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Erreur lors du chargement des notifications');
      setError(error);
      
      if (import.meta.env.DEV) {
        console.error('Erreur lors du chargement des notifications:', err);
      }
      // En cas d'erreur, on garde les données précédentes
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, unreadOnly]);

  /**
   * Rafraîchit les notifications manuellement
   */
  const refresh = useCallback(async () => {
    await loadNotifications();
  }, [loadNotifications]);

  /**
   * Marque une notification comme lue
   */
  const markAsRead = useCallback(async (id: string) => {
    try {
      const updatedNotification = await notificationService.markAsRead(id);
      
      // Mettre à jour la notification dans la liste locale
      setNotifications(prev =>
        prev.map(notif => notif.id === id ? updatedNotification : notif)
      );
      
      // Recharger les stats pour mettre à jour le badge
      const stats = await notificationService.getStats();
      setStats(stats);
    } catch (err) {
      if (import.meta.env.DEV) {
        console.error('Erreur lors du marquage de la notification comme lue:', err);
      }
      // En cas d'erreur, recharger les notifications pour synchroniser
      await loadNotifications();
      throw err;
    }
  }, [loadNotifications]);

  /**
   * Supprime une notification
   */
  const deleteNotification = useCallback(async (id: string) => {
    try {
      if (import.meta.env.DEV) {
        console.log('🗑️ Suppression de la notification:', id);
      }
      
      await notificationService.delete(id);
      
      // Retirer la notification de la liste locale immédiatement
      setNotifications(prev => {
        const filtered = prev.filter(notif => notif.id !== id);
        if (import.meta.env.DEV) {
          console.log('✅ Notification retirée de la liste locale. Restantes:', filtered.length);
        }
        return filtered;
      });
      
      // Recharger les stats pour mettre à jour le badge
      const stats = await notificationService.getStats();
      setStats(stats);
      
      if (import.meta.env.DEV) {
        console.log('✅ Notification supprimée avec succès');
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Erreur lors de la suppression de la notification');
      setError(error);
      
      if (import.meta.env.DEV) {
        console.error('❌ Erreur lors de la suppression de la notification:', {
          id,
          error: err,
          message: error.message,
          status: (err as any)?.status
        });
      }
      
      // En cas d'erreur, recharger les notifications pour synchroniser
      try {
        await loadNotifications();
      } catch (reloadError) {
        if (import.meta.env.DEV) {
          console.error('❌ Erreur lors du rechargement après suppression:', reloadError);
        }
      }
      
      throw error;
    }
  }, [loadNotifications]);

  // Charger les notifications au montage et quand l'authentification change
  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  // Polling périodique pour rafraîchir les notifications
  useEffect(() => {
    if (!isAuthenticated || !autoRefresh) return;

    const interval = setInterval(() => {
      loadNotifications();
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [isAuthenticated, autoRefresh, refreshInterval, loadNotifications]);

  return {
    notifications,
    stats,
    isLoading,
    error,
    refresh,
    markAsRead,
    deleteNotification,
  };
}

