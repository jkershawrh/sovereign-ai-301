import test from 'node:test'
import assert from 'node:assert/strict'
import {readFile} from 'node:fs/promises'

const root = 'showroom/content/modules/ROOT/pages'
const pages = [
  '00-mission.adoc',
  '01-protection.adoc',
  '02-challenge.adoc',
  '03-appraise.adoc',
  '04-release.adoc',
  '05-failures.adoc',
  '06-handoff.adoc',
  '07-cleanup.adoc',
]

test('301 continues Northstar from 201 and hands off to 401', async () => {
  const text = await readFile(`${root}/index.adoc`, 'utf8')
  for (const phrase of ['Northstar Claims', 'Sovereign AI 201', 'claims-assistant', 'Sovereign AI 401', 'customer outcome']) assert.match(text, new RegExp(phrase, 'i'))
})

test('every 301 stage uses Show Learn Do Prove and executable actions', async () => {
  let count = 0
  for (const page of pages) {
    const text = await readFile(`${root}/${page}`, 'utf8')
    for (const phase of ['Show', 'Learn', 'Do', 'Prove']) assert.match(text, new RegExp(`== ${phase}`), `${page} lacks ${phase}`)
    count += (text.match(/role="execute"/g) ?? []).length
  }
  assert.ok(count >= 20, `expected at least 20 execute blocks, found ${count}`)
})

test('the learner authors and retains a portable qualification package', async () => {
  const all = (await Promise.all(pages.map((p) => readFile(`${root}/${p}`, 'utf8')))).join('\n')
  for (const artifact of [
    'decision-brief.md',
    'appraisal-matrix.md',
    'resource-policy.json',
    'failure-matrix.md',
    'evidence-manifest.json',
    'SHA256SUMS',
  ]) assert.match(all, new RegExp(artifact.replace('.', '\\.')))
  assert.match(all, /Portable qualification package/)
})

test('inference and cleanup claims remain honest', async () => {
  const all = (await Promise.all(pages.map((p) => readFile(`${root}/${p}`, 'utf8')))).join('\n')
  assert.match(all, /modelInvoked/)
  assert.match(all, /zero model executions/i)
  assert.match(all, /participant-owned/)
  assert.match(all, /Launchpad-owned/)
})

test('Showroom alone may reach the qualifier', async () => {
  const policy = await readFile('charts/sovereign-ai-301/templates/networkpolicy.yaml', 'utf8')
  assert.match(policy, /app\.kubernetes\.io\/name: showroom/)
  assert.match(policy, /port: 8080/)
  assert.doesNotMatch(policy, /namespaceSelector:\s*\{\}/)
})
