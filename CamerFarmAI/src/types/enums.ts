/**
 * Enums centralisés correspondant aux modèles de données du backend
 */

export enum UserRole {
  FARMER = 'farmer',
  TECHNICIAN = 'technician',
  ADMIN = 'admin',
}

export enum PlantationMode {
  AUTOMATIC = 'automatic',
  MANUAL = 'manual',
}

export enum SensorType {
  TEMPERATURE = 'temperature',
  SOIL_MOISTURE = 'soilMoisture',
  CO2_LEVEL = 'co2Level',
  WATER_LEVEL = 'waterLevel',
  LUMINOSITY = 'luminosity',
}

export enum SensorStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export enum ActuatorStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export enum NotificationCanal {
  WEB = 'web',
  EMAIL = 'email',
  WHATSAPP = 'whatsapp',
}

export enum NotificationStatut {
  ENVOYEE = 'envoyee',
  EN_ATTENTE = 'en_attente',
  ERREUR = 'erreur',
}

// EventType est déjà défini dans notificationService.ts, on l'exporte aussi ici pour cohérence
export enum EventType {
  SEUIL_DEPASSE = 'seuil_depasse',
  ACTIONNEUR_ACTIVE = 'actionneur_active',
  ACTIONNEUR_DESACTIVE = 'actionneur_desactive',
  MODE_CHANGED = 'mode_changed',
  SENSOR_ACTIVE = 'sensor_active',
  SENSOR_INACTIVE = 'sensor_inactive',
}

