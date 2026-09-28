# Sovereign AI 301 — Confidential Inference and Intel TDX Foundations

This factory candidate teaches one trust chain: Intel Xeon TDX-capable hardware → fresh measured and attested workload identity → policy-gated access to one protected model resource. Evidence appraisal, key-release authorization, inference authorization, and human authority remain separate.

The qualifier is deterministic and uses visibly synthetic fixtures. It emits no TDX quote, secret, model response, latency, throughput, or performance claim. The current Apple M2 factory cannot produce LIVE TDX evidence. `REHEARSAL` demonstrates contracts; `OFFLINE` explains unavailable dependencies. Neither earns LIVE credit.

The Triforce presentation is in `src/`; the independent learner journey is in `showroom/`. Discovery decisions are in `demo-blueprint.yaml` and `docs/discovery-ledger.md`.

No Sovereign AI 101 or 201 source, commit, image digest, or certification evidence is modified.

## Published factory candidates

Source revision `d46625e8e1eb89e35c0a93385a47564d825a8115` produced two linux/amd64 factory candidates in workflow run `36494072807`. Both complete inventories contain zero HIGH and zero CRITICAL findings, include SPDX 2.3 SBOMs, passed exact-digest pulls, and carry verified Sigstore GitHub OIDC signatures plus SPDX and SLSA provenance attestations. Exact digests are in `charts/sovereign-ai-301/values.published.yaml` and `handoff/evidence/published-release.json`.

These are noncertified REHEARSAL candidates. They neither enable a confidential runtime nor establish LIVE TDX execution. Launchpad intake remains a proposal with zero approved seats.
