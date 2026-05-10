import { describe, expect, it, vi, beforeEach } from 'vitest'
import { SensorStatus, ActuatorStatus } from '@/types/enums'

// Vitest hoiste les appels vi.mock, donc on doit initialiser le mock via vi.hoisted
// pour éviter "Cannot access 'apiGetMock' before initialization".
const apiGetMock = vi.hoisted(() => vi.fn())

vi.mock('@/services/api', () => {
  return {
    api: {
      get: apiGetMock,
    },
  }
})

import { technicianService } from '@/services/technicianService'

describe('services/technicianService', () => {
  beforeEach(() => {
    apiGetMock.mockReset()
  })

  it('getStats should normalize numeric fields', async () => {
    apiGetMock.mockResolvedValueOnce({
      data: {
        farmers: '1',
        plantations: '2',
        activeSensors: '3',
        totalSensors: '4',
        actuators: '5',
      },
    })

    const stats = await technicianService.getStats()
    expect(stats).toEqual({
      farmers: 1,
      plantations: 2,
      activeSensors: 3,
      totalSensors: 4,
      actuators: 5,
    })
  })

  it('getPlantationDetails should map sensor status to active/inactive', async () => {
    apiGetMock.mockResolvedValueOnce({
      data: {
        id: 'pid',
        name: 'Plantation 1',
        location: 'Douala',
        area: 10,
        cropType: 'tomato',
        mode: 'automatic',
        owner: {
          id: 'owner1',
          firstName: 'Alice',
          lastName: 'Doe',
          phone: '123',
          email: null,
        },
        sensors: [
          {
            id: 's1',
            type: 'temperature',
            status: 'active',
            plantationId: 'pid',
            seuilMin: 10,
            seuilMax: 20,
            createdAt: '2020-01-01',
            updatedAt: '2020-01-02',
          },
          {
            id: 's2',
            type: 'soilMoisture',
            status: 'inactive',
            plantationId: 'pid',
            seuilMin: 30,
            seuilMax: 40,
            createdAt: '2020-01-03',
            updatedAt: '2020-01-04',
          },
        ],
        actuators: [
          {
            id: 'a1',
            type: 'valve',
            name: 'Irrigation valve',
            status: 'inactive',
            plantationId: 'pid',
            metadata: { zone: 1 },
            lastUpdate: '2020-01-05',
          },
        ],
        createdAt: '2020-01-01',
        updatedAt: '2020-01-06',
      },
    })

    const details = await technicianService.getPlantationDetails('pid')

    expect(details.id).toBe('pid')
    expect(details.sensors[0].id).toBe('s1')
    expect(details.sensors[0].status).toBe(SensorStatus.ACTIVE)
    expect(details.sensors[1].id).toBe('s2')
    expect(details.sensors[1].status).toBe(SensorStatus.INACTIVE)

    expect(details.actuators[0].status).toBe(ActuatorStatus.INACTIVE)
    expect(details.actuators[0].isOn).toBe(false)
  })
})

