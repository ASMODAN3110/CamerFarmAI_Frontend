import { api } from './api';
import { SensorStatus, ActuatorStatus, PlantationMode } from '@/types/enums';
import type { SensorType } from '@/types/enums';
import type { CreatePlantationDto, UpdatePlantationDto, CreateSensorDto, UpdateSensorThresholdsDto, AddSensorReadingDto, CreateActuatorDto, UpdateActuatorDto } from '@/types/dto';

// Alias pour compatibilité ascendante
export type { SensorType, SensorStatus, ActuatorStatus, PlantationMode };

/**
 * @deprecated Utiliser CreatePlantationDto à la place
 */
export interface PlantationPayload extends CreatePlantationDto {}

export interface Sensor {
  id: string;
  type: SensorType | string; // Permet aussi les strings pour compatibilité
  status: SensorStatus; // 'active' | 'inactive' (pas 'offline')
  plantationId: string;
  seuilMin?: number;
  seuilMax?: number;
  createdAt: string; // Format ISO 8601
  updatedAt: string; // Format ISO 8601
  latestReading?: SensorReading;
  readings?: SensorReading[];
}

export interface SensorReading {
  id: string;
  sensorId: string;
  value: number;
  timestamp: string;
  createdAt?: string;
}

export interface Actuator {
  id: string;
  type: string; // Requis (ex: "pompe", "ventilateur", "éclairage")
  name: string; // Requis
  status: ActuatorStatus; // 'active' = allumé, 'inactive' = éteint (pas de notion de "hors ligne" comme pour les capteurs)
  plantationId: string;
  metadata?: Record<string, any>; // Optionnel, JSON
  createdAt: string; // Format ISO 8601
  updatedAt: string; // Format ISO 8601
  // Propriété calculée (non-backend) pour compatibilité frontend
  isOn?: boolean; // Calculé depuis status === 'active'
}

export interface Plantation {
  id: string; // UUID
  name: string; // Requis
  location: string | null; // Nullable selon backend
  area?: number; // Optionnel, en m²
  cropType: string; // Requis
  coordinates?: { // Optionnel
    lat: number;
    lng: number;
  };
  mode: PlantationMode; // 'automatic' | 'manual', default: 'automatic'
  ownerId?: string; // UUID du propriétaire
  sensors?: Sensor[];
  actuators?: Actuator[];
  hasSensors?: boolean; // Calculé (non-backend)
  hasActuators?: boolean; // Calculé (non-backend)
  createdAt: string; // Format ISO 8601
  updatedAt: string; // Format ISO 8601
  // État calculé par le backend
  etat?: {
    status: 'healthy' | 'warning' | 'critical' | 'unknown';
    activeSensors: number;
    totalSensors: number;
    activeActuators: number;
    totalActuators: number;
    message: string;
  };
  // Pour compatibilité avec l'ancienne structure
  latestSensorData?: any;
}

const normalizeSensorReading = (data: any): SensorReading => ({
  id: data.id,
  sensorId: data.sensorId,
  value: typeof data.value === 'number' ? data.value : Number(data.value) || 0,
  timestamp: data.timestamp,
  createdAt: data.createdAt,
});

const normalizeSensor = (data: any): Sensor => {
  // Normaliser le status : retirer 'offline' si présent, utiliser 'inactive' à la place
  let status: SensorStatus = SensorStatus.INACTIVE;
  const statusRaw = String(data.status || '').toLowerCase().trim();
  if (statusRaw === 'active') {
    status = SensorStatus.ACTIVE;
  } else if (statusRaw === 'inactive' || statusRaw === 'offline') {
    // Gérer gracieusement 'offline' pour compatibilité
    status = SensorStatus.INACTIVE;
  }

  return {
  id: data.id,
  type: data.type || data.sensorType || '',
    status,
  plantationId: data.plantationId,
  seuilMin: typeof data.seuilMin === 'number' ? data.seuilMin : data.seuilMin !== undefined ? Number(data.seuilMin) : undefined,
  seuilMax: typeof data.seuilMax === 'number' ? data.seuilMax : data.seuilMax !== undefined ? Number(data.seuilMax) : undefined,
    createdAt: data.createdAt || new Date().toISOString(),
    updatedAt: data.updatedAt || new Date().toISOString(),
  latestReading: data.latestReading ? normalizeSensorReading(data.latestReading) : undefined,
  readings: Array.isArray(data.readings) ? data.readings.map(normalizeSensorReading) : undefined,
  };
};

const normalizeActuator = (data: any): Actuator => {
  // Normaliser le status : 'active' = allumé, 'inactive' = éteint
  // Note: Contrairement aux capteurs, les actionneurs n'ont pas de notion de "hors ligne"
  // Le statut indique simplement si l'actionneur est allumé (active) ou éteint (inactive)
  let status: ActuatorStatus = ActuatorStatus.INACTIVE;
  const statusRaw = String(data.status || '').toLowerCase().trim();
  if (statusRaw === 'active' || data.isOn === true) {
    status = ActuatorStatus.ACTIVE;
  } else if (statusRaw === 'inactive' || statusRaw === 'offline' || data.isOn === false) {
    // Gérer gracieusement 'offline' pour compatibilité avec d'anciennes données
    status = ActuatorStatus.INACTIVE;
  }
  
  const normalized: Actuator = {
    id: data.id,
    type: data.type || '',
    name: data.name || '',
    status,
    plantationId: data.plantationId,
    metadata: data.metadata || undefined,
    createdAt: data.createdAt || data.lastUpdate || new Date().toISOString(),
    updatedAt: data.updatedAt || data.lastUpdate || new Date().toISOString(),
    // Propriété calculée (non-backend) pour compatibilité frontend
    isOn: status === ActuatorStatus.ACTIVE,
  };
  
  console.log('🔧 Actionneur normalisé:', { raw: data, normalized });
  
  return normalized;
};

const normalizePlantation = (data: any): Plantation => {
  // Créer une map des latestReadings par sensorId et sensorType
  const latestReadingsMap = new Map<string, SensorReading>();
  if (Array.isArray(data.latestReadings)) {
    data.latestReadings.forEach((item: any) => {
      if (item.latestReading && item.latestReading !== null) {
        // Mapper par sensorId (priorité)
        if (item.sensorId) {
          latestReadingsMap.set(item.sensorId, normalizeSensorReading(item.latestReading));
        }
        // Mapper aussi par sensorType pour compatibilité
        if (item.sensorType) {
          latestReadingsMap.set(item.sensorType, normalizeSensorReading(item.latestReading));
        }
      }
    });
  }

  // Normaliser les capteurs et associer les latestReadings
  const sensors = Array.isArray(data.sensors) 
    ? data.sensors.map((sensorData: any) => {
        const normalized = normalizeSensor(sensorData);
        // Si le capteur n'a pas de latestReading mais qu'il existe dans latestReadingsMap
        if (!normalized.latestReading) {
          const readingById = latestReadingsMap.get(normalized.id);
          const readingByType = latestReadingsMap.get(normalized.type);
          if (readingById) {
            normalized.latestReading = readingById;
          } else if (readingByType) {
            normalized.latestReading = readingByType;
          }
        }
        return normalized;
      })
    : undefined;

  // Normaliser les actionneurs
  const actuators = Array.isArray(data.actuators) 
    ? data.actuators.map(normalizeActuator)
    : undefined;

  console.log('🔄 Normalisation plantation:', {
    id: data.id,
    name: data.name,
    sensorsCount: sensors?.length || 0,
    actuatorsCount: actuators?.length || 0,
    hasSensors: data.hasSensors,
    hasActuators: data.hasActuators,
    latestReadingsCount: data.latestReadings?.length || 0,
    sensorsRaw: data.sensors,
    sensorsNormalized: sensors?.map((s: Sensor) => ({ id: s.id, type: s.type, status: s.status, hasLatestReading: !!s.latestReading })),
    actuatorsRaw: data.actuators,
    actuatorsNormalized: actuators
  });

  return {
    id: data.id,
    name: data.name || '',
    location: data.location !== undefined ? data.location : null, // Nullable
    area: data.area !== undefined && data.area !== null ? (typeof data.area === 'number' ? data.area : Number(data.area)) : undefined,
    cropType: data.cropType || '', // Requis
    coordinates: data.coordinates ? {
      lat: typeof data.coordinates.lat === 'number' ? data.coordinates.lat : Number(data.coordinates.lat),
      lng: typeof data.coordinates.lng === 'number' ? data.coordinates.lng : Number(data.coordinates.lng),
    } : undefined,
    mode: (data.mode || PlantationMode.AUTOMATIC) as PlantationMode,
    ownerId: data.ownerId,
    createdAt: data.createdAt || new Date().toISOString(),
    updatedAt: data.updatedAt || new Date().toISOString(),
    sensors,
    actuators,
    hasSensors: data.hasSensors === true || (sensors && sensors.length > 0), // Calculé (non-backend)
    hasActuators: data.hasActuators === true || (actuators && actuators.length > 0), // Calculé (non-backend)
    etat: data.etat ? {
      status: data.etat.status || 'unknown',
      activeSensors: Number(data.etat.activeSensors) || 0,
      totalSensors: Number(data.etat.totalSensors) || 0,
      activeActuators: Number(data.etat.activeActuators) || 0,
      totalActuators: Number(data.etat.totalActuators) || 0,
      message: data.etat.message || '',
    } : undefined,
    // Pour compatibilité avec l'ancienne structure
    latestSensorData: data.latestSensorData,
  };
};

export const plantationService = {
  async getAll(): Promise<Plantation[]> {
    const res = await api.get('/plantations/my');
    const payload = res.data?.data || res.data;
    if (Array.isArray(payload)) {
      return payload.map(normalizePlantation);
    }
    if (Array.isArray(payload?.items)) {
      return payload.items.map(normalizePlantation);
    }
    return [];
  },

  async getById(id: string): Promise<Plantation> {
    const res = await api.get(`/plantations/${id}`);
    // Le backend retourne directement l'objet plantation (pas encapsulé dans { data: {...} })
    const data = res.data?.data || res.data;
    console.log('📦 Réponse brute de getById:', res.data);
    console.log('📦 Données extraites:', data);
    console.log('📦 Actionneurs dans la réponse:', data?.actuators);
    return normalizePlantation(data);
  },

  async create(payload: CreatePlantationDto): Promise<Plantation> {
    const res = await api.post('/plantations', payload);
    const data = res.data?.data || res.data;
    return normalizePlantation(data);
  },

  async getSensors(plantationId: string): Promise<Sensor[]> {
    const res = await api.get(`/plantations/${plantationId}/sensors`);
    const payload = res.data?.data || res.data;
    if (Array.isArray(payload)) {
      return payload.map(normalizeSensor);
    }
    return [];
  },

  async getSensorReadings(plantationId: string, sensorId: string): Promise<SensorReading[]> {
    const res = await api.get(`/plantations/${plantationId}/sensors/${sensorId}/readings`);
    const payload = res.data?.data || res.data;
    // La réponse peut être { sensor: {...}, readings: [...] } ou directement un tableau
    if (payload?.readings && Array.isArray(payload.readings)) {
      return payload.readings.map(normalizeSensorReading);
    }
    if (Array.isArray(payload)) {
      return payload.map(normalizeSensorReading);
    }
    return [];
  },

  /**
   * Ajoute une lecture pour un capteur
   * Le capteur sera automatiquement activé s'il était inactif
   * @param plantationId - ID de la plantation
   * @param sensorId - ID du capteur
   * @param value - Valeur de la lecture
   * @returns La lecture créée
   */
  async addSensorReading(
    plantationId: string,
    sensorId: string,
    value: number
  ): Promise<SensorReading> {
    const payload: AddSensorReadingDto = { value };
    const res = await api.post(
      `/plantations/${plantationId}/sensors/${sensorId}/readings`,
      payload
    );
    const data = res.data?.data || res.data;
    return normalizeSensorReading(data);
  },

  /**
   * Met à jour les seuils d'un capteur
   * @param plantationId - ID de la plantation
   * @param sensorId - ID du capteur
   * @param seuils - seuilMin et seuilMax (seuilMax doit être > seuilMin)
   * @returns Capteur mis à jour
   */
  async updateSensorThresholds(
    plantationId: string,
    sensorId: string,
    seuils: UpdateSensorThresholdsDto
  ): Promise<Sensor> {
    const res = await api.patch(
      `/plantations/${plantationId}/sensors/${sensorId}/thresholds`,
      seuils
    );
    const data = res.data?.data || res.data;
    return normalizeSensor(data);
  },

  async getAllSensorReadings(plantationId: string): Promise<SensorReading[]> {
    // Récupérer tous les capteurs et leurs lectures
    const sensors = await this.getSensors(plantationId);
    const allReadings: SensorReading[] = [];
    
    for (const sensor of sensors) {
      if (sensor.readings) {
        allReadings.push(...sensor.readings);
      } else if (sensor.id) {
        // Si les lectures ne sont pas incluses, les récupérer
        const readings = await this.getSensorReadings(plantationId, sensor.id);
        allReadings.push(...readings);
      }
    }
    
    return allReadings;
  },

  /**
   * Met à jour le statut d'un actionneur
   * @param plantationId - ID de la plantation
   * @param actuatorId - ID de l'actionneur
   * @param status - Nouveau statut ('active' ou 'inactive')
   * @returns L'actionneur mis à jour
   */
  async updateActuator(
    plantationId: string,
    actuatorId: string,
    status: ActuatorStatus
  ): Promise<Actuator> {
    try {
      const payload: UpdateActuatorDto = { status };
      const res = await api.patch(
        `/plantations/${plantationId}/actuators/${actuatorId}`,
        payload
      );
      const data = res.data?.data || res.data;
      return normalizeActuator(data);
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'actionneur:', error);
      throw error;
    }
  },

  /**
   * Met à jour le mode de contrôle d'une plantation (automatique ou manuel)
   * @param plantationId - ID de la plantation
   * @param mode - Nouveau mode ('automatic' ou 'manual' - valeurs attendues par le backend)
   * @returns La plantation mise à jour
   */
  async updateControlMode(
    plantationId: string,
    mode: PlantationMode
  ): Promise<Plantation> {
    try {
      // Le backend utilise PATCH /plantations/:id avec { mode } dans le payload
      const payload: UpdatePlantationDto = { mode };
      await api.patch(
        `/plantations/${plantationId}`,
        payload
      );
      
      // Recharger la plantation complète après la mise à jour
      // car la réponse du PATCH peut ne contenir que le mode
      return await this.getById(plantationId);
    } catch (error) {
      console.error('Erreur lors de la mise à jour du mode de contrôle:', error);
      throw error;
    }
  },
};

