import { api } from './api'

/* =======================
   TYPES
======================= */

export interface TechnicianStats {
  farmersCount: number
  fieldsCount: number
  activeSensors: number
  totalSensors: number
  actuatorsCount: number
}

export interface Sensor {
  id: string
  type: string
  status: string
  seuilMin?: number
  seuilMax?: number
}

export interface Actuator {
  id: string
  name: string
  type: string
  status: string
}

export interface Field {
  id: string
  name: string
  cropType?: string
  area?: number
  sensors?: Sensor[]
  actuators?: Actuator[]
  totalDevices?: number
  location?: string
}

export interface Farmer {
  id: string
  name: string
  // region: string  // En réalité, provient du champ "location" dans la DB
  fieldsCount: number
}

export interface FarmerDetails {
  id: string
  name: string
  phone?: string
  region: string  // En réalité, provient du champ "location" dans la DB
  fields: Field[]
}

/* =======================
   NORMALIZERS
======================= */

const normalizeStats = (data: any): TechnicianStats => ({
  farmersCount: Number(data.farmersCount) || 0,
  fieldsCount: Number(data.fieldsCount) || 0,
  activeSensors: Number(data.activeSensors) || 0,
  totalSensors: Number(data.totalSensors) || 0,
  actuatorsCount: Number(data.actuatorsCount) || 0
})

const normalizeFarmer = (data: any): Farmer => ({
  id: data.id,
  name: data.name,
  // region: data.location || '—',  // ← CORRECTION : on utilise location
  fieldsCount: Number(data.fieldsCount) || 0
})

const normalizeSensor = (data: any): Sensor => ({
  id: data.id,
  type: data.type,
  status: data.status,
  seuilMin: data.seuilMin,
  seuilMax: data.seuilMax
})

const normalizeActuator = (data: any): Actuator => ({
  id: data.id,
  name: data.name,
  type: data.type,
  status: data.status
})

const normalizeFieldWithEquipments = (data: any): Field => ({
  id: data.id,
  name: data.name,
  cropType: data.cropType,
  area: data.area,
    location: data.location || undefined,
  sensors: Array.isArray(data.sensors)
    ? data.sensors.map(normalizeSensor)
    : [],
  actuators: Array.isArray(data.actuators)
    ? data.actuators.map(normalizeActuator)
    : [],
  totalDevices: data.totalDevices ?? data.stats?.totalEquipments ?? 0
})

/* =======================
   SERVICE
======================= */

export const technicianService = {
  /* ---- Stats globales ---- */
  async getStats(): Promise<TechnicianStats> {
    const res = await api.get('/technician/dashboard/stats')
    return normalizeStats(res.data)
  },

  /* ---- Liste simple des agriculteurs ---- */
  async getFarmers(): Promise<Farmer[]> {
    const res = await api.get('/technician/farmers')
    return Array.isArray(res.data)
      ? res.data.map(normalizeFarmer)
      : []
  },

  /* ---- Vue complète : agriculteurs → champs → équipements ---- */
  async getFarmersWithDetails(): Promise<FarmerDetails[]> {
    const res = await api.get('/technician/farmers/details')
    console.log('Données brutes API /technician/farmers/details :', res.data)
console.log('Données brutes farmers details :', res.data)
    if (!Array.isArray(res.data)) return []

    return res.data.map((farmer: any) => ({
      id: farmer.id,
      name: farmer.name,
      phone: farmer.phone,
      region: farmer.location,  // ← CORRECTION : on utilise location ici aussi
      fields: Array.isArray(farmer.fields)
        ? farmer.fields.map(normalizeFieldWithEquipments)
        : []
    }))
  }
  
}