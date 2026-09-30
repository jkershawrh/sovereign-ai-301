import test from 'node:test'
import assert from 'node:assert/strict'
import {readFile} from 'node:fs/promises'

const root = 'showroom/content/modules/ROOT/pages'
const pages = ['01-protection.adoc', '02-challenge.adoc', '03-appraise.adoc', '04-release.adoc', '05-failures.adoc', '06-handoff.adoc']

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
  assert.ok(count >= 12, `expected at least 12 execute blocks, found ${count}`)
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
