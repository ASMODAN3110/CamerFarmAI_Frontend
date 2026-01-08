import type { Notification, NotificationEvent } from '@/services/notificationService';
import type { TranslationKey } from '@/utils/translations';
import { EventType } from '@/services/notificationService';

/**
 * Vérifie si une notification concerne un changement de statut de capteur
 */
export function isSensorStatusNotification(notification: Notification): boolean {
  const eventType = notification.event?.type;
  return eventType === EventType.SENSOR_ACTIVE || eventType === EventType.SENSOR_INACTIVE;
}

/**
 * Obtient le label traduit du type de capteur
 */
export function getSensorTypeLabel(
  type: string,
  t: (key: TranslationKey) => string
): string {
  const sensorTypeMap: Record<string, TranslationKey> = {
    temperature: 'monitoring.sensors.temperature',
    soilMoisture: 'monitoring.sensors.soilHumidity',
    soilHumidity: 'monitoring.sensors.soilHumidity',
    co2Level: 'monitoring.sensors.co2',
    co2: 'monitoring.sensors.co2',
    waterLevel: 'monitoring.sensors.waterLevel',
    luminosity: 'monitoring.sensors.luminosity',
  };

  const translationKey = sensorTypeMap[type.toLowerCase()];
  if (translationKey) {
    return t(translationKey);
  }

  // Fallback : retourner le type tel quel avec première lettre en majuscule
  return type.charAt(0).toUpperCase() + type.slice(1);
}

/**
 * Formate une notification de changement de statut de capteur
 * Utilise la description du backend si disponible et valide, sinon formate automatiquement
 */
export function formatSensorNotification(
  notification: Notification,
  t: (key: TranslationKey) => string
): string {
  const event = notification.event;
  
  if (!event) {
    return t('notifications.noDescription');
  }

  // Si pas de capteur associé, utiliser la description brute
  if (!event.sensor) {
    return event.description || t('notifications.noDescription');
  }

  // Utiliser la description du backend si elle est disponible et ne contient pas "undefined"
  if (event.description && !event.description.includes('undefined') && !event.description.includes('"la plantation"')) {
    return event.description;
  }

  // Formatage de fallback avec traductions
  const sensorType = getSensorTypeLabel(event.sensor.type, t);
  const eventType = event.type;

  if (eventType === EventType.SENSOR_ACTIVE) {
    // Utiliser la description du backend si disponible, sinon formater
    if (event.description && event.description.trim()) {
      return event.description;
    }
    return `${sensorType} est maintenant actif`;
  } else if (eventType === EventType.SENSOR_INACTIVE) {
    // Utiliser la description du backend si disponible, sinon formater
    if (event.description && event.description.trim()) {
      return event.description;
    }
    return `${sensorType} est devenu inactif`;
  }

  // Pour les autres types d'événements, retourner la description telle quelle
  return event.description || t('notifications.noDescription');
}

/**
 * Obtient les styles (icône, couleur) pour un type d'événement
 * Utile pour un affichage visuel futur
 */
export function getNotificationStyle(eventType: string): {
  icon: string;
  color: string;
  bgColor: string;
} {
  switch (eventType) {
    case EventType.SENSOR_ACTIVE:
      return {
        icon: '✓',
        color: '#10b981', // Vert
        bgColor: '#d1fae5',
      };
    case EventType.SENSOR_INACTIVE:
      return {
        icon: '⚠',
        color: '#ef4444', // Rouge
        bgColor: '#fee2e2',
      };
    case EventType.THRESHOLD_CHANGED:
      return {
        icon: '📊',
        color: '#0d9488', // Vert-bleu (teal)
        bgColor: '#ccfbf1',
      };
    default:
      return {
        icon: 'ℹ',
        color: '#6b7280', // Gris
        bgColor: '#f3f4f6',
      };
  }
}

/**
 * Obtient le label formaté avec emoji pour un type d'événement
 * Selon la documentation backend
 */
export function getEventTypeLabel(eventType: string): string {
  const labels: Record<string, string> = {
    [EventType.SEUIL_DEPASSE]: '🚨 Alerte : Seuil Dépassé',
    [EventType.THRESHOLD_CHANGED]: '📊 Modification des Seuils',
    [EventType.ACTIONNEUR_ACTIVE]: '✅ Actionneur Activé',
    [EventType.ACTIONNEUR_DESACTIVE]: '⏸️ Actionneur Désactivé',
    [EventType.MODE_CHANGED]: '🔄 Changement de Mode',
    [EventType.SENSOR_ACTIVE]: '✅ Capteur Actif',
    [EventType.SENSOR_INACTIVE]: '⚠️ Capteur Inactif',
  };
  
  return labels[eventType] || `Notification : ${eventType}`;
}

/**
 * Extrait le nom de la plantation depuis l'événement
 * Vérifie sensor.plantation.name puis actuator.plantation.name
 */
export function getPlantationName(event: NotificationEvent | undefined): string | null {
  if (!event) return null;
  
  if (event.sensor?.plantation?.name) {
    return event.sensor.plantation.name;
  }
  
  if (event.actuator?.plantation?.name) {
    return event.actuator.plantation.name;
  }
  
  return null;
}

