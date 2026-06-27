import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import * as MD2html from '../src/md2html.ts'

describe('MD2html.toHtml()', () => {
  it('should return html', () => {
    assert.strictEqual(MD2html.toHtml(`# test1
test test
`), `<h1>test1</h1>
<p>test test</p>`
    )
  })

  it('should return blank', () => {
    assert.strictEqual(MD2html.toHtml(``), ``)
  })

  it('should sanitize html', () => {
    assert.strictEqual(MD2html.toHtml(`# test1

<div>
<p>paragraph</p>
<script>alert("danger")</script>
</div>

test test
`), `<h1>test1</h1>
<div>
<p>paragraph</p>

</div>
<p>test test</p>`)
  })

  it('should joined html', () => {
    assert.strictEqual(MD2html.toHtml([['# test1', 'paragraph']]), `<h1>test1</h1>
<p>paragraph</p>`)
  })
})

describe('MD2html.toHtml_unsafe()', () => {
  it('should not sanitize html', () => {
    assert.strictEqual(
      MD2html.toHtml_unsafe(`# test1

<div>
<p>paragraph</p>
<script>alert("danger")</script>
</div>

test test
`), `<h1>test1</h1>
<div>
<p>paragraph</p>
<script>alert("danger")</script>
</div>
<p>test test</p>`)
  })

  it('should joined html', () => {
    assert.strictEqual(MD2html.toHtml_unsafe([['# test1', 'paragraph']]), `<h1>test1</h1>
<p>paragraph</p>`)
  })
})
