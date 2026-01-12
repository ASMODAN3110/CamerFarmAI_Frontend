/**
 * Utilitaires pour la gestion des statuts des capteurs
 */

import { SensorStatus } from '@/types/enums';

// Réexporter pour compatibilité
export { SensorStatus };

/**
 * Retourne la couleur associée à un statut de capteur
 */
export function getSensorStatusColor(status: SensorStatus | string): string {
  const normalizedStatus = String(status).toLowerCase();
  switch (normalizedStatus) {
    case 'active':
      return '#10b981'; // Vert
    case 'inactive':
    case 'offline': // Gérer gracieusement 'offline' pour compatibilité
      return '#ef4444'; // Rouge
    default:
      return '#6b7280'; // Gris par défaut
  }
}

import { TranslationKey } from './translations';

/**
 * Retourne le label associé à un statut de capteur
 */
export function getSensorStatusLabel(status: SensorStatus | string, t?: (key: TranslationKey) => string): string {
  const normalizedStatus = String(status).toLowerCase();

  if (t) {
    switch (normalizedStatus) {
      case 'active':
        return t('sensor.status.active');
      case 'inactive':
      case 'offline': // Gérer gracieusement 'offline' pour compatibilité
        return t('sensor.status.inactive');
      default:
        return t('sensor.status.unknown');
    }
  }

  // Fallback sans traduction
  switch (normalizedStatus) {
    case 'active':
      return 'Actif';
    case 'inactive':
    case 'offline': // Gérer gracieusement 'offline' pour compatibilité
      return 'Inactif';
    default:
      return 'Inconnu';
  }
}

/**
 * Calcule et retourne le temps écoulé depuis la dernière lecture
 * @param timestamp - Timestamp ISO de la dernière lecture (peut être null)
 * @returns String formatée du temps écoulé
 */
export function getTimeSinceLastReading(timestamp: string | null | undefined): string {
  if (!timestamp) {
    return 'Jamais';
  }

  try {
    const now = new Date();
    const lastReading = new Date(timestamp);

    if (isNaN(lastReading.getTime())) {
      return 'Date invalide';
    }

    const diffMs = now.getTime() - lastReading.getTime();
    const diffMinutes = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMinutes < 1) {
      return 'À l\'instant';
    } else if (diffMinutes < 60) {
      return `Il y a ${diffMinutes} minute${diffMinutes > 1 ? 's' : ''}`;
    } else if (diffHours < 24) {
      return `Il y a ${diffHours} heure${diffHours > 1 ? 's' : ''}`;
    } else {
      return `Il y a ${diffDays} jour${diffDays > 1 ? 's' : ''}`;
    }
  } catch (error) {
    console.error('Erreur lors du calcul du temps écoulé:', error);
    return 'Erreur';
  }
}

/**
 * Vérifie si un capteur est considéré comme inactif depuis trop longtemps
 * @param timestamp - Timestamp ISO de la dernière lecture
 * @param thresholdHours - Seuil en heures (défaut: 1)
 * @returns true si le capteur est inactif depuis plus que le seuil
 */
export function isSensorInactiveTooLong(
  timestamp: string | null | undefined,
  thresholdHours: number = 1
): boolean {
  if (!timestamp) {
    return true; // Pas de lecture = inactif
  }

  try {
    const now = new Date();
    const lastReading = new Date(timestamp);

    if (isNaN(lastReading.getTime())) {
      return true;
    }

    const diffMs = now.getTime() - lastReading.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);

    return diffHours > thresholdHours;
  } catch (error) {
    console.error('Erreur lors de la vérification de l\'inactivité:', error);
    return true;
  }
}

/**
 * Retourne une classe CSS pour le statut d'un capteur
 */
export function getSensorStatusClass(status: SensorStatus | string): string {
  const normalizedStatus = String(status).toLowerCase();
  switch (normalizedStatus) {
    case 'active':
      return 'sensor-status-active';
    case 'inactive':
    case 'offline': // Gérer gracieusement 'offline' pour compatibilité
      return 'sensor-status-inactive';
    default:
      return 'sensor-status-unknown';
  }
}

