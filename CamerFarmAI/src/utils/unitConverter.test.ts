import { describe, expect, it } from 'vitest'
import { convertFromM2, convertToM2, formatArea } from './unitConverter'

describe('utils/unitConverter', () => {
  it('convertToM2 and convertFromM2 should be consistent', () => {
    expect(convertToM2(1, 'm²')).toBe(1)
    expect(convertToM2(1, 'ha')).toBe(10000)
    expect(convertToM2(2, 'acre')).toBe(2 * 4047)
    expect(convertToM2(1, 'km²')).toBe(1_000_000)

    expect(convertFromM2(10000, 'ha')).toBe(1)
    expect(convertFromM2(4047, 'acre')).toBe(1)
  })

  it('formatArea should format with decimals', () => {
    expect(formatArea(10.123, 'ha')).toBe('10.12 ha')
    expect(formatArea(10.123, 'ha', 1)).toBe('10.1 ha')
  })
})

