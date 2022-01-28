import {
  md2html,
  md2html_unsafe,
  normalizeMarkdownSource
} from '../src/md2html'

describe('normalizeMarkdownSource()', () => {
  it('should convert undefined to ""', () => {
    expect(normalizeMarkdownSource()).toEqual('')
  })
  it('should convert string to string', () => {
    expect(normalizeMarkdownSource('simple text')).toEqual('simple text')
  })
  it('should convert number to string', () => {
    expect(normalizeMarkdownSource(10)).toEqual('10')
  })
  it('should convert single row to string', () => {
    expect(normalizeMarkdownSource([['abc', 'efg', 123]])).toEqual(`abc
efg
123`)
  })
  it('should convert multiple rows to string', () => {
    expect(
      normalizeMarkdownSource([
        ['abc', 'efg', 123],
        ['ABC', 'EFG', 456]
      ])
    ).toEqual(`abc
efg
123
ABC
EFG
456`)
  })
})

describe('md2html()', () => {
  it('should return html', () => {
    expect(
      md2html(`# test1
test test
`)
    ).toEqual(`<h1>test1</h1>
<p>test test</p>`)
  })

  it('should return blank', () => {
    expect(md2html(``)).toEqual(``)
  })

  it('should sanitize html', () => {
    expect(
      md2html(`# test1

<div>
<p>paragraph</p>
<script>alert("danger")</script>
</div>

test test
`)
    ).toEqual(`<h1>test1</h1>
<div>
<p>paragraph</p>

</div>
<p>test test</p>`)
  })

  it('should joined html', () => {
    expect(md2html([['# test1', 'paragraph']])).toEqual(`<h1>test1</h1>
<p>paragraph</p>`)
  })
})

describe('md2html_unsafe()', () => {
  it('should not sanitize html', () => {
    expect(
      md2html_unsafe(`# test1

<div>
<p>paragraph</p>
<script>alert("danger")</script>
</div>

test test
`)
    ).toEqual(`<h1>test1</h1>
<div>
<p>paragraph</p>
<script>alert("danger")</script>
</div>
<p>test test</p>`)
  })

  it('should joined html', () => {
    expect(md2html_unsafe([['# test1', 'paragraph']])).toEqual(`<h1>test1</h1>
<p>paragraph</p>`)
  })
})
