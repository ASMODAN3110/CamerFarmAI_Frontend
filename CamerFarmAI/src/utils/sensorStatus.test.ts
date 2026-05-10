import { describe, expect, it } from 'vitest'
import {
  getSensorStatusColor,
  getSensorStatusLabel,
  getTimeSinceLastReading,
  isSensorInactiveTooLong,
  getSensorStatusClass,
} from './sensorStatus'
import { SensorStatus } from '@/types/enums'

describe('utils/sensorStatus', () => {
  it('getSensorStatusColor should map active/inactive/offline/default', () => {
    expect(getSensorStatusColor(SensorStatus.ACTIVE)).toBe('#10b981')
    expect(getSensorStatusColor(SensorStatus.INACTIVE)).toBe('#ef4444')
    expect(getSensorStatusColor('offline')).toBe('#ef4444')
    expect(getSensorStatusColor('unknown')).toBe('#6b7280')
  })

  it('getSensorStatusLabel should use translations when provided', () => {
    const t = (key: string) => `T:${key}`

    expect(getSensorStatusLabel('active', t as any)).toBe('T:sensor.status.active')
    expect(getSensorStatusLabel('inactive', t as any)).toBe('T:sensor.status.inactive')
    expect(getSensorStatusLabel('offline', t as any)).toBe('T:sensor.status.inactive')
    expect(getSensorStatusLabel('unknown', t as any)).toBe('T:sensor.status.unknown')
  })

  it('getSensorStatusLabel should fallback to French strings when no translation', () => {
    expect(getSensorStatusLabel('active')).toBe('Actif')
    expect(getSensorStatusLabel('inactive')).toBe('Inactif')
    expect(getSensorStatusLabel('offline')).toBe('Inactif')
    expect(getSensorStatusLabel('unknown')).toBe('Inconnu')
  })

  it('getTimeSinceLastReading should handle null/invalid and relative cases', () => {
    expect(getTimeSinceLastReading(null)).toBe('Jamais')
    expect(getTimeSinceLastReading('not-a-date')).toBe('Date invalide')

    const now = Date.now()
    expect(getTimeSinceLastReading(new Date(now - 20_000).toISOString())).toBe("À l'instant")
    expect(getTimeSinceLastReading(new Date(now - 2 * 60 * 60 * 1000).toISOString())).toBe('Il y a 2 heures')
    expect(getTimeSinceLastReading(new Date(now - 2 * 24 * 60 * 60 * 1000).toISOString())).toBe('Il y a 2 jours')
  })

  it('isSensorInactiveTooLong should return true/false based on thresholdHours', () => {
    expect(isSensorInactiveTooLong(null)).toBe(true)
    expect(isSensorInactiveTooLong('not-a-date', 1)).toBe(true)

    const now = Date.now()
    // 0.5 hour -> should be considered active for threshold 1
    expect(isSensorInactiveTooLong(new Date(now - 30 * 60 * 1000).toISOString(), 1)).toBe(false)
    // 2 hours -> should be considered inactive for threshold 1
    expect(isSensorInactiveTooLong(new Date(now - 2 * 60 * 60 * 1000).toISOString(), 1)).toBe(true)
  })

  it('getSensorStatusClass should map active/inactive/offline/default', () => {
    expect(getSensorStatusClass(SensorStatus.ACTIVE)).toBe('sensor-status-active')
    expect(getSensorStatusClass(SensorStatus.INACTIVE)).toBe('sensor-status-inactive')
    expect(getSensorStatusClass('offline')).toBe('sensor-status-inactive')
    expect(getSensorStatusClass('unknown')).toBe('sensor-status-unknown')
  })
})

