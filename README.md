# my-starter-gas-lib-ts

Googl Apps Script Library を TypeScript(clasp 利用)で作成するためのスターター。

実装中。

## 設定方法

スターターを利用するための設定。

### 名前の設定

事前に以下の名前を決めておきます。

- `NAMESPACE` - 型定義の  namespace に利用する名前
- `BASENAME` - ソースファイルなどに使う名前

例: `NAMESPACE=MD2html`、 `BASENAME=md2htnml`

名前を決めたら以下のように設定します。

1. `package.json` の変更
    -  `config` の `NAMESPACE` と `BASENAME` を事前に決めた値へ変更
    - パッケージ名などの変更
1. `src/index.js` のライセンスバナー
    - タイトル
    - `.zip` ファイル名
1. `.github/workflows/deploy.yaml`
    - `Make archilve file` ステップの `.zip` ファイル名
    - `Upload archive file to release Asset` ステップの `.zip` ファイル名
1. `LICENSE` 等を新しいライブラリーにあわせて変更(付録にテンプレート)


### Google Apps Script ライブラリーの作成と関連付け

1. `$ clasp create` などでライブラリーを 1 つ作成
  - 1 つは開発用、1 つは公開用として利用
1. テンプレートの `.clasp.json` の `scriptId` を開発用ライブラリーのものへ変更


### ライブラリー部分の変更

- `src/md2html.ts` を `BASENAME` にあわせて変更
- `test/md2html.spec.ts` `test/build/md2html_src.js` を `BASENAME` にあわせて変更


### GitHub 上の environment

ライブラリーへのデプロイや型定義を npm レジストリーへ登録するために以下の environment を作成。

#### デプロイ用

- `dev` - 開発用プロジェクトに `clasp push` と `clasp deploy` する設定用
- `rel` - 公開用プロジェクトに `clasp push` と `clasp deploy` する設定用

それぞれに SECRET が必要。

- `GAS_SCRIPT_ID` - scriptId
- `ACCESS_TOKEN` - `.clasprc` からコピー
- `SCOPE` - `.clasprc` からコピー
- `ID_TOKEN` - `.clasprc` からコピー
- `EXPIRY_DATE` - `.clasprc` からコピー
- `REFRESH_TOKEN` - `.clasprc` からコピー
- `CLIENT_ID` - `.clasprc` からコピー
- `CLIENT_SECRET` - `.clasprc` からコピー

`GAS_SCRIPT_ID` は dev と rel で切り替える。 開発と公開で異なるクレデンシャルが必要ならその他も切り替える。


#### npm publish 用

- `npm_pkg` - npm レジストリーへ `npm publish` するための設定用

以下の SECRET が必要。

- `NPM_TOKEN` - npm レジストリーの Access Token

## コード記述

1. `src/xxxx.ts` 処理を記述します。
1. `src/main.ts` でエクスポートする定義を記述します

    エクスポートされた定義は、以下の `src/index.js` から参照できる `_entry_point_` のメンバーとして登録されます。

1. `src/index.js` にライブラリーとして参照できる関数などを記述します

    ここでの記述は通常のライブラリーとして振る舞います。`_entry_point_` のメンバーなどを利用して関数を記述します。

NPM パッケージを追加できます。ただし、Node.js のビルトインライブラリーを利用しているとビルドできないこともあります。

## テスト記述

1. `test/xxxx.spec.ts` にテストを記述します

    Jest フレームワークを利用しています。また、テストは native ESM として実行されます。

1. `test/build/xxx_src.js` にビルドされたコード用のテストを記述します

    `src/index.js` 用のテストを記述します。`src/idnex.js` とは結合された状態で実行されるので `import` は行いません。

## npm スクリプト

- npm run build - ライブラリーとしてビルドします
- npm run test - テストを実行します
- npm run test:build - ライブラリーとしてビルドされた関数をテストします
- npm run push - `clasp push` します(ビルドの自動実行は行われなし)
- npm run deploy - `clasp delpoy` します

## プッシュ

プルリクエストを作成するなどで `main` 以外のブランチへプッシュすると、ビルドされたものを開発用のライブラリーへプッシュします。

## デプロイ

リリースを公開すると開発と公開用ライブラリーへプッシュとデプロイが行われます。

リリースノートの 1 行目がバージョンの説明として利用されます。

リリースノートに含まれているプルリクエストのラベルに `types` が設定されていると型定義を npm レジストリーへ公開します。


## 付録

`package.json` に記述する情報のテンプレート。`license` を変更したら `LICENSE` ファイルの変更も忘れずに。

```
  "name": "<package-name>",
  "version": "0.1.0",
  "description": "<description>",
  "author": "user <mail addr> (website url)",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "git://github.com/<user>/<repository>.git"
  },
  "bugs": {
    "url": "https://github.com/<user>/<repository>/issues"
  },
  "keywords": []
```


## License

MIT License

Copyright (c) 2022 hankei6km

