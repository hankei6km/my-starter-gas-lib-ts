#!/bin\bash
set -e

BASENAME="${npm_package_config_basename}"

# ビルドされたコードにテスト用のコードを結合する.
# ビルドされたコードはエクスポートされていないための対応.
cat test/build/md2html_src.js "build/${BASENAME}".js > "test/build/${BASENAME}.spec.js"