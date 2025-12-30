import { api } from './api';
import { NotificationCanal, NotificationStatut, EventType, SensorStatus } from '@/types/enums';

// Exporter les types pour compatibilité
export type NotificationChannel = NotificationCanal;
export type NotificationStatus = NotificationStatut;

// Réexporter EventType pour compatibilité
export { EventType };

export interface NotificationEvent {
  id: string;
  type: string;
  description: string;
  date: string;
  plantationId?: string; // ID de la plantation (peut être présent directement dans l'événement)
  sensorId?: string | null; // ID du capteur (selon la documentation API)
  actuatorId?: string | null; // ID de l'actionneur (selon la documentation API)
  sensor?: {
    id: string;
    type: string;
    status?: SensorStatus; // 'active' | 'inactive' (pas 'offline')
    plantationId: string;
  } | null;
  actuator?: {
    id: string;
    type: string;
    name: string;
    plantationId: string;
  } | null;
}

export interface Notification {
  id: string;
  canal: NotificationCanal; // 'web' | 'email' | 'whatsapp'
  statut: NotificationStatut; // 'envoyee' | 'en_attente' | 'erreur' (minuscules)
  eventId: string;
  userId: string;
  dateEnvoi: string; // Format ISO 8601
  isRead: boolean;
  dateLu: string | null; // Format ISO 8601
  event?: NotificationEvent;
}

export interface NotificationStats {
  total: number;
  envoyees: number;
  enAttente: number;
  erreurs: number;
  // Champ calculé pour compatibilité
  nonLues: number;
  lues: number;
  parCanal?: {
    web?: number;
    email?: number;
    whatsapp?: number;
  };
}

const normalizeNotification = (data: any): Notification => {
  // Normaliser le statut depuis le backend
  // Le backend retourne: "envoyee", "en_attente", "erreur" (minuscules)
  // On normalise vers les valeurs en minuscules (selon le modèle backend)
  const statutRaw = String(data.statut || '').toLowerCase().trim();
  let statut: NotificationStatut = NotificationStatut.EN_ATTENTE;
  
  if (statutRaw === 'envoyee' || statutRaw === 'envoyée' || statutRaw === 'sent' || statutRaw === 'envoi') {
    statut = NotificationStatut.ENVOYEE;
  } else if (statutRaw === 'erreur' || statutRaw === 'error' || statutRaw === 'failed' || statutRaw === 'echec') {
    statut = NotificationStatut.ERREUR;
  } else if (statutRaw === 'en_attente' || statutRaw === 'pending' || statutRaw === 'attente' || statutRaw === '') {
    statut = NotificationStatut.EN_ATTENTE;
  }
  
  if (import.meta.env.DEV && data.id) {
    console.log('🔍 Normalisation notification:', { 
      id: data.id, 
      statutRaw: data.statut, 
      statutNormalized: statut,
      isRead: data.isRead,
      dateLu: data.dateLu
    });
  }
  
  // Normaliser le canal (backend peut retourner 'email', 'web', 'whatsapp')
  const canalRaw = String(data.canal || 'web').toLowerCase().trim();
  let canal: NotificationCanal = NotificationCanal.WEB;
  if (canalRaw === 'email') {
    canal = NotificationCanal.EMAIL;
  } else if (canalRaw === 'whatsapp') {
    canal = NotificationCanal.WHATSAPP;
  } else {
    canal = NotificationCanal.WEB;
  }
  
  return {
    id: data.id,
    canal,
    statut,
    eventId: data.eventId,
    userId: data.userId,
    dateEnvoi: data.dateEnvoi || data.createdAt || new Date().toISOString(),
    // Normaliser isRead : peut être boolean, string, number, null, undefined
    // Retourne true uniquement si la valeur est explicitement true, 'true', 1, ou '1'
    isRead: data.isRead === true || 
            data.isRead === 'true' || 
            data.isRead === 1 || 
            data.isRead === '1',
    dateLu: data.dateLu || null,
    event: data.event ? {
      id: data.event.id,
      type: data.event.type,
      description: data.event.description,
      date: data.event.date,
      // Essayer de trouver plantationId dans plusieurs endroits possibles
      plantationId: data.event.plantationId || 
                    (data.event as any).plantationId || 
                    (data.event as any).plantation?.id ||
                    data.event.actuator?.plantationId || 
                    data.event.sensor?.plantationId,
      sensorId: data.event.sensorId || null, // ID du capteur (selon la documentation API)
      actuatorId: data.event.actuatorId || null, // ID de l'actionneur (selon la documentation API)
      sensor: data.event.sensor ? {
        id: data.event.sensor.id,
        type: data.event.sensor.type,
        status: (data.event.sensor.status === 'active' ? SensorStatus.ACTIVE : 
                 data.event.sensor.status === 'inactive' ? SensorStatus.INACTIVE : 
                 undefined) as SensorStatus | undefined,
        plantationId: data.event.sensor.plantationId,
      } : null,
      actuator: data.event.actuator || null,
    } : undefined,
  };
};

export const notificationService = {
  /**
   * Récupère toutes les notifications de l'utilisateur connecté
   * @param unreadOnly - Si true, récupère uniquement les notifications non lues
   */
  async getAll(unreadOnly?: boolean): Promise<Notification[]> {
    try {
      const url = unreadOnly ? '/notifications/my?unreadOnly=true' : '/notifications/my';
      const res = await api.get(url);
      const payload = res.data?.data || res.data;
      
      if (Array.isArray(payload)) {
        return payload.map(normalizeNotification);
      }
      
      return [];
    } catch (error) {
      // En cas d'erreur, retourner un tableau vide plutôt que de faire planter l'application
      if (import.meta.env.DEV) {
        console.error('Erreur lors de la récupération des notifications:', error);
      }
      return [];
    }
  },

  /**
   * Récupère uniquement les notifications web de l'utilisateur connecté
   */
  async getAllWeb(): Promise<Notification[]> {
    const allNotifications = await this.getAll();
    // Filtrer uniquement les notifications web et trier par date décroissante
    const webNotifications = allNotifications
      .filter(notif => notif.canal === 'web')
      .sort((a, b) => new Date(b.dateEnvoi).getTime() - new Date(a.dateEnvoi).getTime());
    
    return webNotifications;
  },


  /**
   * Récupère les statistiques des notifications de l'utilisateur
   * Calcule aussi les stats à partir des notifications réelles pour plus de précision
   * @param allNotifications - Optionnel: notifications déjà chargées pour éviter un appel API supplémentaire
   */
  async getStats(allNotifications?: Notification[]): Promise<NotificationStats> {
    try {
      const res = await api.get('/notifications/stats');
      const data = res.data?.data || res.data;
      
      const envoyees = data.envoyees || data.envoyee || 0;
      const total = data.total || 0;
      const nonLues = data.nonLues || data.non_lues || 0;
      const lues = data.lues || total - nonLues;
      
      // Calculer les stats réelles à partir des notifications pour plus de précision
      // (les stats du backend peuvent ne pas être à jour, notamment parCanal)
      let realStats = {
        web: 0,
        email: 0,
        whatsapp: 0,
      };
      
      try {
        // Utiliser les notifications fournies ou les récupérer
        const notifications = allNotifications || await this.getAll();
        realStats = {
          web: notifications.filter(n => n.canal === 'web').length,
          email: notifications.filter(n => n.canal === 'email').length,
          whatsapp: notifications.filter(n => n.canal === 'whatsapp').length,
        };
      } catch (err) {
        // Si erreur, utiliser les stats du backend
        if (import.meta.env.DEV) {
          console.warn('⚠️ Impossible de calculer les stats réelles, utilisation des stats du backend');
        }
      }
      
      return {
        total,
        envoyees,
        enAttente: data.enAttente || data.en_attente || 0,
        erreurs: data.erreurs || data.erreur || 0,
        nonLues,
        lues,
        parCanal: {
          // Utiliser les stats réelles si disponibles, sinon celles du backend
          web: realStats.web || data.parCanal?.web || data.par_canal?.web || 0,
          email: realStats.email || data.parCanal?.email || data.par_canal?.email || 0,
          whatsapp: realStats.whatsapp || data.parCanal?.whatsapp || data.par_canal?.whatsapp || 0,
        },
      };
    } catch (error) {
      // En cas d'erreur, retourner des stats vides
      if (import.meta.env.DEV) {
        console.error('Erreur lors de la récupération des statistiques:', error);
      }
      return {
        total: 0,
        envoyees: 0,
        enAttente: 0,
        erreurs: 0,
        nonLues: 0,
        lues: 0,
      };
    }
  },

  /**
   * Récupère une notification spécifique par son ID
   */
  async getById(id: string): Promise<Notification> {
    try {
      const res = await api.get(`/notifications/${id}`);
      const data = res.data?.data || res.data;
      return normalizeNotification(data);
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error(`Erreur lors de la récupération de la notification ${id}:`, error);
      }
      throw error; // Propager l'erreur pour que le composant puisse la gérer
    }
  },

  /**
   * Marque une notification comme lue
   * Utilise PATCH selon la documentation API
   */
  async markAsRead(id: string): Promise<Notification> {
    try {
      const res = await api.patch(`/notifications/${id}/read`);
      const data = res.data?.data || res.data;
      
      if (import.meta.env.DEV) {
        console.log('📬 Réponse API markAsRead - Structure complète:', JSON.stringify(res.data, null, 2));
        console.log('📬 Réponse API markAsRead - Data extraite:', JSON.stringify(data, null, 2));
      }
      
      // Récupérer la notification depuis l'API pour avoir les champs isRead et dateLu mis à jour
      const getRes = await api.get(`/notifications/${id}`);
      const notificationData = getRes.data?.data || getRes.data;
      
      if (import.meta.env.DEV) {
        console.log('📬 Notification récupérée après marquage:', JSON.stringify(notificationData, null, 2));
      }
      
      const normalized = normalizeNotification(notificationData);
      
      if (import.meta.env.DEV) {
        console.log('✅ Notification normalisée après marquage:', { 
          id, 
          isRead: normalized.isRead,
          dateLu: normalized.dateLu,
          statut: normalized.statut
        });
      }
      
      return normalized;
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error(`❌ Erreur lors du marquage de la notification ${id} comme lue:`, error);
      }
      throw error; // Propager l'erreur pour que le composant puisse la gérer
    }
  },

  /**
   * Supprime une notification
   * @param id - ID de la notification à supprimer
   * @throws Error si la notification n'existe pas, n'appartient pas à l'utilisateur, ou en cas d'erreur réseau
   */
  async delete(id: string): Promise<void> {
    try {
      const res = await api.delete(`/notifications/${id}`);
      
      // Vérifier la réponse du backend
      const responseData = res.data?.data || res.data;
      
      if (import.meta.env.DEV) {
        console.log('🗑️ Notification supprimée:', {
          id,
          response: responseData,
          status: res.status
        });
      }
      
      // Le backend retourne 200 avec { success: true, message: "..." }
      // Si success est false, lever une erreur
      if (responseData && responseData.success === false) {
        const errorMessage = responseData.message || 'Erreur lors de la suppression de la notification';
        throw new Error(errorMessage);
      }
    } catch (error: any) {
      if (import.meta.env.DEV) {
        console.error(`❌ Erreur lors de la suppression de la notification ${id}:`, {
          status: error?.response?.status,
          data: error?.response?.data,
          message: error?.message
        });
      }
      
      // Extraire le message d'erreur du backend si disponible
      const errorMessage = 
        error?.response?.data?.message || 
        error?.response?.data?.error || 
        error?.message || 
        'Erreur lors de la suppression de la notification';
      
      // Créer une nouvelle erreur avec le message approprié
      const customError = new Error(errorMessage);
      (customError as any).status = error?.response?.status;
      (customError as any).response = error?.response;
      
      throw customError;
    }
  },
};

