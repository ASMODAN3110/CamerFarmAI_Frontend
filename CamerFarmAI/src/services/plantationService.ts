import { api } from './api';

export interface PlantationPayload {
  name: string;
  location: string;
  area: number;
  cropType?: string;
}

export type SensorType = 
  | 'temperature'
  | 'humidity'
  | 'soilMoisture'
  | 'co2Level'
  | 'waterLevel'
  | 'luminosity';

export interface Sensor {
  id: string;
  type: SensorType | string;
  status: 'active' | 'inactive' | 'offline';
  plantationId: string;
  createdAt?: string;
  updatedAt?: string;
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
  type: string;
  name: string;
  status: 'active' | 'inactive' | 'offline';
  isOn?: boolean;
  plantationId: string;
  lastUpdate?: string;
}

export interface Plantation {
  id: string;
  name: string;
  location: string;
  area: number;
  cropType?: string;
  ownerId?: string;
  createdAt: string;
  updatedAt: string;
  mode?: 'automatic' | 'manual'; // Mode de contrôle de la plantation (valeurs en minuscules comme stockées en base)
  sensors?: Sensor[];
  actuators?: Actuator[];
  hasSensors?: boolean;
  hasActuators?: boolean;
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

const normalizeSensor = (data: any): Sensor => ({
  id: data.id,
  type: data.type || data.sensorType || '',
  status: data.status || 'inactive',
  plantationId: data.plantationId,
  createdAt: data.createdAt,
  updatedAt: data.updatedAt,
  latestReading: data.latestReading ? normalizeSensorReading(data.latestReading) : undefined,
  readings: Array.isArray(data.readings) ? data.readings.map(normalizeSensorReading) : undefined,
});

const normalizeActuator = (data: any): Actuator => {
  // Le backend retourne exactement "pump", "fan", "light" comme type
  const type = data.type || '';
  const name = data.name || '';
  const status: 'active' | 'inactive' | 'offline' = data.status === 'active' || data.isOn === true ? 'active' : data.status === 'inactive' || data.isOn === false ? 'inactive' : 'offline';
  
  const normalized: Actuator = {
    id: data.id,
    type: type, // Préserver le type exact du backend ("pump", "fan", "light")
    name: name, // Préserver le nom exact du backend
    status: status,
    isOn: data.isOn !== undefined ? data.isOn : (data.status === 'active'),
    plantationId: data.plantationId,
    lastUpdate: data.lastUpdate || data.updatedAt || data.timestamp,
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
    name: data.name,
    location: data.location,
    area: typeof data.area === 'number' ? data.area : Number(data.area) || 0,
    cropType: data.cropType,
    ownerId: data.ownerId,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
    mode: data.mode || 'automatic', // Mode de contrôle (automatic ou manual)
    sensors,
    actuators,
    hasSensors: data.hasSensors === true || (sensors && sensors.length > 0),
    hasActuators: data.hasActuators === true || (actuators && actuators.length > 0),
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

  async create(payload: PlantationPayload): Promise<Plantation> {
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
    status: 'active' | 'inactive'
  ): Promise<Actuator> {
    try {
      const res = await api.patch(
        `/plantations/${plantationId}/actuators/${actuatorId}`,
        { status }
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
    mode: 'automatic' | 'manual'
  ): Promise<Plantation> {
    try {
      // Le backend utilise PATCH /plantations/:id avec { mode } dans le payload
      // Le backend attend les valeurs 'automatic' ou 'manual' (minuscules) comme stockées en base
      await api.patch(
        `/plantations/${plantationId}`,
        { mode }
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

