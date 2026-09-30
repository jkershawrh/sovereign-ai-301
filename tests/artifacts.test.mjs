import test from 'node:test'
import assert from 'node:assert/strict'
import {readFile, access} from 'node:fs/promises'

const mustExist = [
  'contracts/attestation-evidence.schema.json',
  'contracts/trust-chain.v1.json',
  'contracts/appraisal-policy.v1.json',
  'contracts/resource-policy.v1.json',
  'contracts/failure-matrix.v1.json',
  'showroom/default-site.yml',
  'charts/sovereign-ai-301/Chart.yaml',
  'charts/sovereign-ai-301/values.schema.json',
  '.github/workflows/release.yml',
  'handoff/launchpad-handoff.yaml',
]

test('contract implementation and delivery artifacts exist', async () => {
  for (const path of mustExist) await access(path)
})

test('chart defaults to rehearsal and cannot imply LIVE TDX', async () => {
  const values = await readFile('charts/sovereign-ai-301/values.yaml', 'utf8')
  assert.match(values, /sourceState:\s*REHEARSAL/)
  assert.match(values, /confidentialRuntime:\s*\n\s+enabled:\s+false/)
})

test('presentation is compatible with restricted OpenShift seats and long namespaces', async () => {
  const deployment = await readFile('charts/sovereign-ai-301/templates/presentation.yaml', 'utf8')
  const route = await readFile('charts/sovereign-ai-301/templates/route.yaml', 'utf8')
  const containerfile = await readFile('Containerfile', 'utf8')
  const nginx = await readFile('nginx-main.conf', 'utf8')

  assert.match(deployment, /name:\s+nginx-run,\s+mountPath:\s+\/run/)
  assert.match(deployment, /name:\s+nginx-run,\s+emptyDir:/)
  assert.match(route, /metadata:\s*\n\s+name:\s+story/)
  assert.match(route, /name:\s+\{\{ \.Release\.Name \}\}-presentation/)
  assert.match(containerfile, /COPY nginx-main\.conf \/etc\/nginx\/nginx\.conf/)
  assert.match(nginx, /worker_processes\s+2;/)
  assert.doesNotMatch(nginx, /worker_processes\s+auto;/)
})

test('no environment secret fallback or fabricated performance copy is shipped', async () => {
  const files = ['README.md', 'src/demo.config.ts', 'showroom/content/modules/ROOT/pages/index.adoc']
  for (const path of files) {
    const text = await readFile(path, 'utf8')
    assert.doesNotMatch(text, /zero performance impact|same speed|fallback.*env.*secret/i)
  }
})
