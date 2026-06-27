import * as MD2html from './md2html.ts'
export function normalizeMarkdownSource(md?: MD2html.MarkdownSource): string {
  if (md) {
    if (Array.isArray(md)) {
      return md.map((r) => r.map((c) => `${c}`).join('\n')).join('\n')
    }
    return `${md}`
  }
  return ''
}
