import { createContext, useContext, type ReactNode } from 'react';
import { useNotifications } from '@/hooks/useNotifications';
import type { Notification, NotificationStats } from '@/services/notificationService';

interface NotificationContextValue {
  notifications: Notification[];
  stats: NotificationStats | null;
  isLoading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
  deleteNotification: (id: string) => Promise<void>;
}

const NotificationContext = createContext<NotificationContextValue | undefined>(undefined);

interface NotificationProviderProps {
  children: ReactNode;
  autoRefresh?: boolean;
  refreshInterval?: number;
}

/**
 * Provider pour le contexte de notifications
 * Permet de partager l'état des notifications entre tous les composants
 */
export function NotificationProvider({ 
  children, 
  autoRefresh = true, 
  refreshInterval = 45000 
}: NotificationProviderProps) {
  const notifications = useNotifications({ autoRefresh, refreshInterval });

  return (
    <NotificationContext.Provider value={notifications}>
      {children}
    </NotificationContext.Provider>
  );
}

/**
 * Hook pour accéder au contexte de notifications
 * @throws Error si utilisé en dehors d'un NotificationProvider
 */
export function useNotificationContext(): NotificationContextValue {
  const context = useContext(NotificationContext);
  
  if (context === undefined) {
    throw new Error('useNotificationContext must be used within a NotificationProvider');
  }
  
  return context;
}

