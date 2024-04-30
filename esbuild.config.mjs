import * as fs from 'node:fs/promises'
import * as path from 'node:path'
import { fileURLToPath } from 'node:url'
import * as esbuild from 'esbuild'
import { FilesToLicenses } from '@hankei6km/files-to-licenses'

const result = await esbuild.build({
  entryPoints: ['src/main.ts'],
  outfile: 'build/main.js',
  //outdir: 'build',
  bundle: true,
  format: 'iife',
  globalName: '_entry_point_',
  sourcemap: false,
  platform: 'node',
  metafile: true,
  target: 'ES2019',
  tsconfig: 'tsconfig.build.json',
  logLevel: 'info'
})

const baseDir = path.dirname(fileURLToPath(import.meta.url))
const opensourceLicensesFilePath = path.join(
  baseDir,
  'build',
  'OPEN_SOURCE_LICENSES.txt'
)

async function* outoutFiles(outputs) {
  for (const [file, { bytes, inputs }] of Object.entries(outputs)) {
    for (const i in inputs) {
      yield path.join(baseDir, i)
    }
  }
}
const filesToLicenses = new FilesToLicenses(
  baseDir,
  outoutFiles(result.metafile.outputs)
)

const opensourceLicensesFile = await fs.open(opensourceLicensesFilePath, 'w')
await opensourceLicensesFile.write('---\n')

for await (const i of filesToLicenses.generate()) {
  await opensourceLicensesFile.write(i)
  await opensourceLicensesFile.write('\n---\n')
}

await opensourceLicensesFile.close()
