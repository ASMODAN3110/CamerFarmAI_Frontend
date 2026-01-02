import { api } from './api'
import { plantationService, type Sensor, type Actuator } from './plantationService'
import { serializeParams } from '@/utils/paramsSerializer'
import { SensorStatus, ActuatorStatus } from '@/types/enums'

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
  phone: string | null     // Numéro de téléphone
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

const normalizeFarmerListItem = (data: any): FarmerListItem => {
  // Log pour déboguer
  if (data.id && !data.phone) {
    console.warn('⚠️ Farmer without phone:', { id: data.id, name: `${data.firstName} ${data.lastName}`, rawData: data })
  }
  
  return {
    id: data.id,
    firstName: data.firstName || '',
    lastName: data.lastName || '',
    phone: data.phone && data.phone.trim() ? data.phone.trim() : null,
    location: data.location || null,
    plantationsCount: Number(data.plantationsCount) || 0
  }
}

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
  const normalizeSensor = (s: any): Sensor => {
    const statusRaw = String(s.status || '').toLowerCase().trim();
    const status = statusRaw === 'active' ? SensorStatus.ACTIVE : SensorStatus.INACTIVE;
    
    return {
    id: s.id,
    type: s.type || '',
      status,
    plantationId: s.plantationId || data.id,
    seuilMin: s.seuilMin !== undefined ? Number(s.seuilMin) : undefined,
    seuilMax: s.seuilMax !== undefined ? Number(s.seuilMax) : undefined,
    createdAt: s.createdAt,
    updatedAt: s.updatedAt
    };
  }

  // Normaliser les actionneurs
  const normalizeActuator = (a: any): Actuator => {
    // Normaliser le status : 'active' = allumé, 'inactive' = éteint
    // Note: Contrairement aux capteurs, les actionneurs n'ont pas de notion de "hors ligne"
    const statusRaw = String(a.status || '').toLowerCase().trim();
    const status = statusRaw === 'active' ? ActuatorStatus.ACTIVE : ActuatorStatus.INACTIVE;
    
    return {
    id: a.id,
    type: a.type || '',
    name: a.name || '',
      status,
    plantationId: a.plantationId || data.id,
      metadata: a.metadata || undefined,
      createdAt: a.createdAt || a.lastUpdate || new Date().toISOString(),
      updatedAt: a.updatedAt || a.lastUpdate || new Date().toISOString(),
      // Propriété calculée (non-backend) pour compatibilité frontend
      isOn: a.isOn !== undefined ? a.isOn : (status === ActuatorStatus.ACTIVE),
    };
  }
  
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
  async getFarmers(search?: string | string[]): Promise<FarmerListItem[]> {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/160298b2-1cd0-45e0-a157-b1b9a1712855',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'technicianService.ts:175',message:'getFarmers called',data:{search,searchType:Array.isArray(search)?'array':typeof search,searchLength:Array.isArray(search)?search.length:search?.length,isEmpty:Array.isArray(search)?search.length===0:!search},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'H4'})}).catch(()=>{});
    // #endregion
    let params: any = {}
    let paramsSerializer: ((params: any) => string) | undefined = undefined
    
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/160298b2-1cd0-45e0-a157-b1b9a1712855',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'technicianService.ts:179',message:'Before if(search) check',data:{hasSearch:!!search,searchValue:search},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'H4'})}).catch(()=>{});
    // #endregion
    
    if (search) {
      if (Array.isArray(search)) {
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/160298b2-1cd0-45e0-a157-b1b9a1712855',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'technicianService.ts:183',message:'Array path taken',data:{searchArray:search,arrayLength:search.length},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'H2'})}).catch(()=>{});
        // #endregion
        // Format recommandé: search[]=mot1&search[]=mot2
        // Utiliser params avec paramsSerializer pour garantir le format exact attendu par le backend
        params['search[]'] = search
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/160298b2-1cd0-45e0-a157-b1b9a1712855',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'technicianService.ts:194',message:'After params assignment',data:{params,paramsKeys:Object.keys(params),hasSearchArray:!!params['search[]'],searchArrayValue:params['search[]']},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'H9'})}).catch(()=>{});
        // #endregion
        paramsSerializer = serializeParams
      } else {
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/160298b2-1cd0-45e0-a157-b1b9a1712855',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'technicianService.ts:201',message:'String path taken',data:{searchString:search},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'H3'})}).catch(()=>{});
        // #endregion
        // Format rétrocompatible: search=mot
        params.search = search
      }
    }
    
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/160298b2-1cd0-45e0-a157-b1b9a1712855',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'technicianService.ts:215',message:'Config before API call',data:{hasParamsSerializer:!!paramsSerializer,params,paramsKeys:Object.keys(params)},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'H6'})}).catch(()=>{});
    // #endregion
    
    const config: any = {
      params: Object.keys(params).length > 0 ? params : undefined
    }
    
    if (paramsSerializer) {
      config.paramsSerializer = {
        serialize: paramsSerializer
      }
    }
    
    const res = await api.get('/technician/farmers', config)
    
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/160298b2-1cd0-45e0-a157-b1b9a1712855',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'technicianService.ts:230',message:'API response received',data:{status:res.status,dataLength:Array.isArray(res.data)?res.data.length:0,isArray:Array.isArray(res.data),firstItem:Array.isArray(res.data)&&res.data.length>0?res.data[0]:null,firstItemPhone:Array.isArray(res.data)&&res.data.length>0?res.data[0]?.phone:null},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'E'})}).catch(()=>{});
    // #endregion
    
    const normalized = Array.isArray(res.data)
      ? res.data.map(normalizeFarmerListItem)
      : []
    
    // Log pour vérifier les données normalisées
    if (normalized.length > 0) {
      console.log('📞 Farmers with phone:', normalized.map(f => ({ name: `${f.firstName} ${f.lastName}`, phone: f.phone })))
    }
    
    return normalized
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
