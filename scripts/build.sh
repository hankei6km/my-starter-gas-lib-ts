#!/bin/bash
set -e

NAMESPACE="${npm_package_config_namespace}"
BASENAME="${npm_package_config_basename}"

BUILD_DIR="build"
# rollupjs でビルドされた結果(定義は "rollup.js" でされている).
OUT_MAIN="${BUILD_DIR}/main.js"
# 上記ファイルに結合して Apps Scpirt で参照できるようにするファイル.
SRC_INDEX="src/index.js"
# 型定義時のエラー出力.
# TS2403 対応で作成する.
ERR_TYPEDEF_OUT_FILE="${BUILD_DIR}/tsc_err.txt"

# Apps Scipt へ push する用.
# iife 形式でビルドする(Apps Scriptからは参照できない状態).
# LICENSE の情報をまとめる.
npx rollup --config
# App Script で参照できるようにするファイルと結合.
cat "${SRC_INDEX}" "${OUT_MAIN}" > "${BUILD_DIR}/${BASENAME}.js"

# Assets に含める LICENSE ファイルをコピー.
cp LICENSE "${BUILD_DIR}/LICENSE.txt"

# 型定義を作成.
# TS2403 が発生するのでエラーの除外を行う、おそらく現状で正攻法な対応策はない.
# https://github.com/DefinitelyTyped/DefinitelyTyped/issues/32585
npx tsc "${SRC_INDEX}" --declaration --allowJs --emitDeclarationOnly --outDir build \
  | tee "${ERR_TYPEDEF_OUT_FILE}" | grep -o -e 'TS[0-9]\+' | grep -c -v TS2403 | grep -q 0 \
  && rm "${ERR_TYPEDEF_OUT_FILE}"  

# エラーがあれば出力して終了.
test -f "${ERR_TYPEDEF_OUT_FILE}" && cat "${ERR_TYPEDEF_OUT_FILE}" && exit 1

# 型定義を namespace に入れる(かなりよくない方法).
# あわせて "./" へ移動.
sed -i -e 's/^declare function/function/' "${BUILD_DIR}/index.d.ts"
cat <(echo "declare namespace ${NAMESPACE} {") "${BUILD_DIR}/index.d.ts" <(echo '}') > "index.d.ts"
rm  "${BUILD_DIR}/index.d.ts"

# 作業用ファイルなどを削除.
npx rimraf "${OUT_MAIN}" "${BUILD_DIR}/src" "${BUILD_DIR}/test" "${ERR_TYPEDEF_OUT_FILE}"
