/**
 * gas-md2html
 * @copyright (c) 2022 hankei6km
 * @license MIT
 * see "LICENSE.txt" "OPEN_SOURCE_LICENSES.txt" of "md2html.zip" in
 * releases(https://github.com/hankei6km/gas-md2html/releases)
 */

'use strict'

/**
 * Markdown ソース. Array の場合は '\n' で join される.
 * @typedef {string|number|Array<Array<string|number>>|undefined} MarkdownSource
 */

/**
 * Mardkdown を HTML へ変換.
 *
 * @param {string|number|Array<Array<string|number>>|undefined } md - Markdown ソース. Array の場合は '\n' で join される.
 * @returns {string} HTML
 */
function toHtml(md) {
  return _entry_point_.toHtml(md)
}

/**
 * Mardkdown を HTML へ変換(sanitize 無し).
 *
 * @param {string|number|Array<Array<string|number>>|undefined} md - Markdown ソース. Array の場合は '\n' で join される.
 * @returns {string} HTML
 */
function toHtml_unsafe(md) {
  return _entry_point_.toHtml_unsafe(md)
}
