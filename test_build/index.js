import { describe, it } from 'node:test'
import assert from 'node:assert/strict'

describe('toHtml()', () => {
  it('should return html', () => {
    assert.strictEqual(
      toHtml(`# test1

<script>alert('danger')</script>

test test
`), `<h1>test1</h1>

<p>test test</p>`)
  })

  it('should joined html', () => {
    assert.strictEqual(toHtml([['# test1', 'paragraph']]), `<h1>test1</h1>
<p>paragraph</p>`)
  })
})

describe('toHtml_unsafe()', () => {
  it('should return html', () => {
    assert.strictEqual(
      toHtml_unsafe(`# test1

<script>alert('danger')</script>

test test
`), `<h1>test1</h1>
<script>alert('danger')</script>
<p>test test</p>`)
  })

  it('should joined html', () => {
    assert.strictEqual(toHtml_unsafe([['# test1', 'paragraph']]), `<h1>test1</h1>
<p>paragraph</p>`)
  })
})
