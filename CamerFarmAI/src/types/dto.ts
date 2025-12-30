/**
 * DTOs (Data Transfer Objects) pour les requêtes API
 * Correspondent exactement aux modèles attendus par le backend
 */

import type { PlantationMode, SensorType, ActuatorStatus } from './enums';

/**
 * DTO pour l'inscription d'un nouvel utilisateur
 */
export interface RegisterDto {
  phone: string; // Requis, format mobile valide
  password: string; // Requis, min 8 caractères, majuscule, minuscule, chiffre, caractère spécial
  firstName?: string; // Optionnel
  lastName?: string; // Optionnel
  email?: string; // Optionnel, format email valide
}

/**
 * DTO pour la connexion
 */
export interface LoginDto {
  email: string; // Requis, format email valide
  password: string; // Requis
  twoFactorCode?: string; // Optionnel, 6 chiffres
}

/**
 * DTO pour la mise à jour du profil utilisateur
 */
export interface UpdateProfileDto {
  phone?: string; // Optionnel, format mobile valide
  firstName?: string; // Optionnel
  lastName?: string; // Optionnel
  email?: string; // Optionnel, format email valide
}

/**
 * DTO pour la création d'une plantation
 */
export interface CreatePlantationDto {
  name: string; // Requis
  location?: string; // Optionnel
  area?: number; // Optionnel, en m² (le frontend doit convertir depuis d'autres unités)
  cropType: string; // Requis
  coordinates?: { // Optionnel
    lat: number;
    lng: number;
  };
  mode?: PlantationMode; // Optionnel, default: 'automatic'
}

/**
 * DTO pour la mise à jour d'une plantation
 */
export interface UpdatePlantationDto {
  name?: string;
  location?: string;
  area?: number; // En m²
  cropType?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  mode?: PlantationMode;
}

/**
 * DTO pour la création d'un capteur
 */
export interface CreateSensorDto {
  type: SensorType; // Requis
  seuilMin?: number; // Optionnel
  seuilMax?: number; // Optionnel
}

/**
 * DTO pour la mise à jour des seuils d'un capteur
 */
export interface UpdateSensorThresholdsDto {
  seuilMin: number; // Requis, decimal positif
  seuilMax: number; // Requis, decimal positif, > seuilMin
}

/**
 * DTO pour l'ajout d'une lecture de capteur
 */
export interface AddSensorReadingDto {
  value: number; // Requis, decimal(10,2)
}

/**
 * DTO pour la création d'un actionneur
 */
export interface CreateActuatorDto {
  name: string; // Requis
  type: string; // Requis (ex: "pompe", "ventilateur", "éclairage")
  metadata?: Record<string, any>; // Optionnel
}

/**
 * DTO pour la mise à jour d'un actionneur
 */
export interface UpdateActuatorDto {
  name?: string;
  type?: string;
  status?: ActuatorStatus;
  metadata?: Record<string, any>;
}

