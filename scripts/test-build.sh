#!/bin\bash
set -e

BASENAME="md2html"

# ビルドされたコードにテスト用のコードを結合する.
# ビルドされたコードはエクスポートされていないための対応.
cat test/build/md2html_src.js "build/${BASENAME}".js > "test/build/${BASENAME}.spec.js"