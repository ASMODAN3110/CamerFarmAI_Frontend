/**
 * Enums centralisés correspondant aux modèles de données du backend
 * Utilise des const objects avec 'as const' pour compatibilité avec erasableSyntaxOnly
 */

export const UserRole = {
  FARMER: 'farmer',
  TECHNICIAN: 'technician',
  ADMIN: 'admin',
} as const;

export type UserRole = typeof UserRole[keyof typeof UserRole];

export const PlantationMode = {
  AUTOMATIC: 'automatic',
  MANUAL: 'manual',
} as const;

export type PlantationMode = typeof PlantationMode[keyof typeof PlantationMode];

export const SensorType = {
  TEMPERATURE: 'temperature',
  SOIL_MOISTURE: 'soilMoisture',
  CO2_LEVEL: 'co2Level',
  WATER_LEVEL: 'waterLevel',
  LUMINOSITY: 'luminosity',
} as const;

export type SensorType = typeof SensorType[keyof typeof SensorType];

export const SensorStatus = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
} as const;

export type SensorStatus = typeof SensorStatus[keyof typeof SensorStatus];

export const ActuatorStatus = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
} as const;

export type ActuatorStatus = typeof ActuatorStatus[keyof typeof ActuatorStatus];

export const NotificationCanal = {
  WEB: 'web',
  EMAIL: 'email',
  WHATSAPP: 'whatsapp',
} as const;

export type NotificationCanal = typeof NotificationCanal[keyof typeof NotificationCanal];

export const NotificationStatut = {
  ENVOYEE: 'envoyee',
  EN_ATTENTE: 'en_attente',
  ERREUR: 'erreur',
} as const;

export type NotificationStatut = typeof NotificationStatut[keyof typeof NotificationStatut];

// EventType est déjà défini dans notificationService.ts, on l'exporte aussi ici pour cohérence
export const EventType = {
  SEUIL_DEPASSE: 'seuil_depasse',
  THRESHOLD_CHANGED: 'threshold_changed',
  ACTIONNEUR_ACTIVE: 'actionneur_active',
  ACTIONNEUR_DESACTIVE: 'actionneur_desactive',
  MODE_CHANGED: 'mode_changed',
  SENSOR_ACTIVE: 'sensor_active',
  SENSOR_INACTIVE: 'sensor_inactive',
} as const;

export type EventType = typeof EventType[keyof typeof EventType];

