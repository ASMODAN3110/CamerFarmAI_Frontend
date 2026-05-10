import { describe, expect, it } from 'vitest'
import { serializeParams } from './paramsSerializer'

describe('utils/paramsSerializer', () => {
  it('should skip null/undefined and serialize arrays with repeated keys', () => {
    expect(
      serializeParams({
        a: 1,
        b: null,
        c: undefined,
        d: [1, 2],
      })
    ).toBe('a=1&d=1&d=2')
  })

  it('should encodeURIComponent keys/values', () => {
    expect(
      serializeParams({
        'hello world': 'a b',
      })
    ).toBe('hello%20world=a%20b')
  })
})

