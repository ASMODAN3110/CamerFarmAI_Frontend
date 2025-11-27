import { api } from './api';

export type PlantationStatus = 'active' | 'inactive';

export interface PlantationPayload {
  name: string;
  location: string;
  area: number;
  cropType?: string;
}

export interface Plantation {
  id: string;
  name: string;
  location: string;
  area: number;
  status: PlantationStatus;
  cropType?: string;
  ownerId?: string;
  createdAt: string;
  updatedAt: string;
}

const normalizePlantation = (data: any): Plantation => ({
  id: data.id,
  name: data.name,
  location: data.location,
  area: typeof data.area === 'number' ? data.area : Number(data.area) || 0,
  status: data.status || 'active',
  cropType: data.cropType,
  ownerId: data.ownerId,
  createdAt: data.createdAt,
  updatedAt: data.updatedAt,
});

export const plantationService = {
  async getAll(): Promise<Plantation[]> {
    const res = await api.get('/plantations');
    const payload = res.data?.data || res.data;
    if (Array.isArray(payload)) {
      return payload.map(normalizePlantation);
    }
    if (Array.isArray(payload?.items)) {
      return payload.items.map(normalizePlantation);
    }
    return [];
  },

  async create(payload: PlantationPayload): Promise<Plantation> {
    const res = await api.post('/plantations', payload);
    const data = res.data?.data || res.data;
    return normalizePlantation(data);
  },
};

