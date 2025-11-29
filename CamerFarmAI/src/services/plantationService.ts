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
  const status = data.status === 'active' || data.isOn === true ? 'active' : data.status === 'inactive' || data.isOn === false ? 'inactive' : 'offline';
  
  const normalized = {
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
  // Normaliser les capteurs
  const sensors = Array.isArray(data.sensors) 
    ? data.sensors.map(normalizeSensor)
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
};

