import { api } from './api'
import { plantationService, type Plantation, type Sensor, type Actuator } from './plantationService'

/* =======================
   TYPES
======================= */

// Stats globales selon la documentation backend
export interface TechnicianStats {
  farmers: number           // Au lieu de farmersCount
  plantations: number      // Au lieu de fieldsCount
  activeSensors: number
  totalSensors: number
  actuators: number        // Au lieu de actuatorsCount
}

// Liste des agriculteurs selon la documentation backend
export interface FarmerListItem {
  id: string
  firstName: string        // Au lieu de name combiné
  lastName: string
  location: string | null
  plantationsCount: number
}

// Plantation simplifiée (sans détails complets)
export interface PlantationListItem {
  id: string
  name: string
  location: string
  area: number | null
  cropType: string
  mode: 'automatic' | 'manual'
  ownerId: string
  createdAt: string
  updatedAt: string
}

// Détails complets d'une plantation avec owner
export interface PlantationDetails {
  id: string
  name: string
  location: string
  area: number | null
  cropType: string
  mode: 'automatic' | 'manual'
  owner: {
    id: string
    firstName: string
    lastName: string
    phone: string
    email: string | null
  }
  sensors: Sensor[]
  actuators: Actuator[]
  createdAt: string
  updatedAt: string
}

// Pour compatibilité avec l'ancien code (sera supprimé progressivement)
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

export interface FarmerDetails {
  id: string
  name: string
  phone?: string
  region: string
  fields: Field[]
}

/* =======================
   NORMALIZERS
======================= */

const normalizeStats = (data: any): TechnicianStats => ({
  farmers: Number(data.farmers) || 0,
  plantations: Number(data.plantations) || 0,
  activeSensors: Number(data.activeSensors) || 0,
  totalSensors: Number(data.totalSensors) || 0,
  actuators: Number(data.actuators) || 0
})

const normalizeFarmerListItem = (data: any): FarmerListItem => ({
  id: data.id,
  firstName: data.firstName || '',
  lastName: data.lastName || '',
  location: data.location || null,
  plantationsCount: Number(data.plantationsCount) || 0
})

const normalizePlantationListItem = (data: any): PlantationListItem => ({
  id: data.id,
  name: data.name || '',
  location: data.location || '',
  area: data.area !== undefined && data.area !== null ? Number(data.area) : null,
  cropType: data.cropType || '',
  mode: data.mode || 'automatic',
  ownerId: data.ownerId || '',
  createdAt: data.createdAt || '',
  updatedAt: data.updatedAt || ''
})

const normalizePlantationDetails = (data: any): PlantationDetails => {
  // Normaliser les capteurs
  const normalizeSensor = (s: any): Sensor => ({
    id: s.id,
    type: s.type || '',
    status: s.status === 'active' ? 'active' : 'inactive',
    plantationId: s.plantationId || data.id,
    seuilMin: s.seuilMin !== undefined ? Number(s.seuilMin) : undefined,
    seuilMax: s.seuilMax !== undefined ? Number(s.seuilMax) : undefined,
    createdAt: s.createdAt,
    updatedAt: s.updatedAt
  })

  // Normaliser les actionneurs
  const normalizeActuator = (a: any): Actuator => ({
    id: a.id,
    type: a.type || '',
    name: a.name || '',
    status: a.status === 'active' ? 'active' : (a.status === 'inactive' ? 'inactive' : 'offline'),
    isOn: a.isOn !== undefined ? a.isOn : (a.status === 'active'),
    plantationId: a.plantationId || data.id,
    lastUpdate: a.lastUpdate || a.updatedAt
  })
  
  return {
    id: data.id || '',
    name: data.name || '',
    location: data.location || '',
    area: data.area !== undefined && data.area !== null ? Number(data.area) : null,
    cropType: data.cropType || '',
    mode: data.mode || 'automatic',
    owner: data.owner ? {
      id: data.owner.id || '',
      firstName: data.owner.firstName || '',
      lastName: data.owner.lastName || '',
      phone: data.owner.phone || '',
      email: data.owner.email || null
    } : {
      id: '',
      firstName: '',
      lastName: '',
      phone: '',
      email: null
    },
    sensors: Array.isArray(data.sensors) ? data.sensors.map(normalizeSensor) : [],
    actuators: Array.isArray(data.actuators) ? data.actuators.map(normalizeActuator) : [],
    createdAt: data.createdAt || '',
    updatedAt: data.updatedAt || ''
  }
}

/* =======================
   SERVICE
======================= */

export const technicianService = {
  /* ---- Stats globales ---- */
  async getStats(): Promise<TechnicianStats> {
    const res = await api.get('/technician/stats')
    return normalizeStats(res.data)
  },

  /* ---- Liste des agriculteurs avec recherche ---- */
  async getFarmers(search?: string): Promise<FarmerListItem[]> {
    const params = search ? { search } : {}
    const res = await api.get('/technician/farmers', { params })
    return Array.isArray(res.data)
      ? res.data.map(normalizeFarmerListItem)
      : []
  },

  /* ---- Plantations d'un agriculteur ---- */
  async getFarmerPlantations(farmerId: string): Promise<PlantationListItem[]> {
    const res = await api.get(`/technician/farmers/${farmerId}/plantations`)
    return Array.isArray(res.data)
      ? res.data.map(normalizePlantationListItem)
      : []
  },

  /* ---- Détails complets d'une plantation ---- */
  async getPlantationDetails(plantationId: string): Promise<PlantationDetails> {
    const res = await api.get(`/plantations/${plantationId}`)
    const data = res.data?.data || res.data
    return normalizePlantationDetails(data)
  },

  /* ---- Capteurs d'une plantation ---- */
  async getPlantationSensors(plantationId: string): Promise<Sensor[]> {
    return await plantationService.getSensors(plantationId)
  },

  /* ---- Lectures d'un capteur ---- */
  async getSensorReadings(plantationId: string, sensorId: string) {
    return await plantationService.getSensorReadings(plantationId, sensorId)
  },

  /* ---- Méthodes de compatibilité (à supprimer progressivement) ---- */
  
  // Ancienne méthode - à supprimer après migration
  async getFarmersWithDetails(): Promise<FarmerDetails[]> {
    // Pour compatibilité, on récupère les agriculteurs et leurs plantations
    const farmers = await this.getFarmers()
    const farmersWithDetails: FarmerDetails[] = []
    
    for (const farmer of farmers) {
      const plantations = await this.getFarmerPlantations(farmer.id)
      farmersWithDetails.push({
        id: farmer.id,
        name: `${farmer.firstName} ${farmer.lastName}`,
        region: farmer.location || '',
        fields: plantations.map(p => ({
          id: p.id,
          name: p.name,
          cropType: p.cropType,
          area: p.area || undefined,
          location: p.location,
          sensors: [],
          actuators: [],
          totalDevices: 0
        }))
      })
    }
    
    return farmersWithDetails
  }
}
