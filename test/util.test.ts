import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { normalizeMarkdownSource } from '../src/util.ts'

describe('normalizeMarkdownSource()', () => {
  it('should convert undefined to ""', () => {
    assert.strictEqual(normalizeMarkdownSource(), '')
  })
  it('should convert string to string', () => {
    assert.strictEqual(normalizeMarkdownSource('simple text'), 'simple text')
  })
  it('should convert number to string', () => {
    assert.strictEqual(normalizeMarkdownSource(10), '10')
  })
  it('should convert single row to string', () => {
    assert.strictEqual(normalizeMarkdownSource([['abc', 'efg', 123]]), `abc
efg
123`)
  })
  it('should convert multiple rows to string', () => {
    assert.strictEqual(
      normalizeMarkdownSource([
        ['abc', 'efg', 123],
        ['ABC', 'EFG', 456]
      ]),
      `abc
efg
123
ABC
EFG
456`)
  })
})
