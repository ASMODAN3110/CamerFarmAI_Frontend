import { describe, expect, it } from 'vitest'
import {
  formatSensorNotification,
  getEventTypeLabel,
  getPlantationName,
  getSensorTypeLabel,
  getNotificationStyle,
  isSensorStatusNotification,
} from './notificationFormatters'
import { EventType } from '@/services/notificationService'

describe('utils/notificationFormatters', () => {
  const t = (key: string) => `T:${key}`

  it('isSensorStatusNotification should identify sensor active/inactive events', () => {
    expect(isSensorStatusNotification({ event: { type: EventType.SENSOR_ACTIVE } } as any)).toBe(true)
    expect(isSensorStatusNotification({ event: { type: EventType.SENSOR_INACTIVE } } as any)).toBe(true)
    expect(isSensorStatusNotification({ event: { type: 'something_else' } } as any)).toBe(false)
  })

  it('getSensorTypeLabel should map known sensor types and fallback to TitleCase', () => {
    expect(getSensorTypeLabel('temperature', t as any)).toBe('T:monitoring.sensors.temperature')
    expect(getSensorTypeLabel('Co2', t as any)).toBe('T:monitoring.sensors.co2')
    expect(getSensorTypeLabel('myCustom', t as any)).toBe('MyCustom')
  })

  it('getNotificationStyle should return expected style buckets', () => {
    expect(getNotificationStyle(EventType.SENSOR_ACTIVE)).toMatchObject({
      icon: '✓',
      color: '#10b981',
    })
    expect(getNotificationStyle(EventType.SENSOR_INACTIVE)).toMatchObject({
      icon: '⚠',
      color: '#ef4444',
    })
  })

  it('getEventTypeLabel should return a non-empty label', () => {
    expect(getEventTypeLabel(EventType.SENSOR_ACTIVE)).toContain('Capteur')
  })

  it('getPlantationName should extract plantation name from sensor/actuator', () => {
    expect(
      getPlantationName({
        sensor: { plantation: { name: 'Plant A' } },
        actuator: null,
      } as any)
    ).toBe('Plant A')

    expect(
      getPlantationName({
        sensor: null,
        actuator: { plantation: { name: 'Plant B' } },
      } as any)
    ).toBe('Plant B')

    expect(getPlantationName(undefined)).toBeNull()
  })

  it('formatSensorNotification should format based on event type + sensor type', () => {
    // No event
    expect(formatSensorNotification({} as any, t as any)).toBe('T:notifications.noDescription')

    // Event without sensor uses backend description
    expect(
      formatSensorNotification({ event: { description: 'backend desc', type: 'x', sensor: undefined } } as any, t as any)
    ).toBe('backend desc')

    // SENSOR_ACTIVE fallback when description is missing/empty
    expect(
      formatSensorNotification(
        {
          event: {
            type: EventType.SENSOR_ACTIVE,
            description: '',
            sensor: { type: 'temperature' },
          },
        } as any,
        t as any
      )
    ).toBe('T:monitoring.sensors.temperature est maintenant actif')

    // SENSOR_INACTIVE fallback when description contains "undefined"
    expect(
      formatSensorNotification(
        {
          event: {
            type: EventType.SENSOR_INACTIVE,
            description: 'la plantation undefined',
            sensor: { type: 'soilMoisture' },
          },
        } as any,
        t as any
      )
    ).toBe('la plantation undefined')
  })
})

