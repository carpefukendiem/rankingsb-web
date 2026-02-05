# Mission Control — Handoff / Continuity Doc

**Owner:** Ruben Johnny (Santa Barbara, CA)  
**Assistant persona:** Johnny 5 ⚡  
**Timezone:** America/Los_Angeles

This doc is intended so a new “brain” (model/provider) can immediately pick up where the previous agent left off.

---

## 0) Prime directives / constraints

- **Autonomy rule:** *draft + internal setup only*. No external outreach, submissions, client contact, Upwork proposals/submissions, or ad changes without explicit approval.
- **Budget:** hard cap **$20/day**, target **$7–12/day**. Prefer staggered/cheap schedules and short work blocks.
- **Security:** **no API keys** committed to GitHub or shipped to the public Vercel dashboard. Secrets live only as local env vars (or password manager) and Vercel env vars when necessary.
- **Primary niche focus:** **Electricians first**, Pest Control second.
- **Primary comms mode in GHL:** **two-way texting** (LC Phone to start). Use placeholder phone number in template specs.

---

## 1) Where everything lives

### GitHub (source of truth)
- Repo (private): `carpefukendiem/mission-control`
- Main branch: `main`

### Live dashboard (public)
- Vercel URL: https://mission-control-omega-seven.vercel.app/
- Dashboard reads from GitHub via server routes:
  - `/api/tasks` → `mission-control/tasks/`
  - `/api/working` → `mission-control/WORKING.md`
  - `/api/ticker` → safe commit-based ticker

**Important:** If the repo is private, Vercel **must** have a working `GITHUB_TOKEN` with repo read access.

### Local (optional) Mission Control UI
- Local UI server (iMac): `http://127.0.0.1:3200`
- Includes SSE ticker tailing: `mission-control/logs/activity.log`
- Known issue: port conflicts / process SIGKILL / EADDRINUSE can happen.

---

## 2) Discord: channels + IDs (reporting)

Discord is the primary reporting surface.

- `#mission-control` → **1468170930412064882**
- `#morning-brief` → **1467448139106746388**
- `#nightly-brief` → **1467448186686673040**

Pager mode:
- Respond quickly when **@Johnny5** is mentioned in `#mission-control`.

---

## 3) Automations (cron jobs)

Cron jobs are managed via OpenClaw Gateway cron tool.

### The reliable brief system (current)
- **Morning brief (reliable):** `e27da51c-d62a-4b09-afa4-dd51e8e7fd71`
  - Schedule: **08:00 PST daily**
  - Target: **isolated agentTurn**
  - Posts to `#morning-brief` and then posts a 1‑line confirmation in `#mission-control`.

- **Nightly brief (reliable):** `3c393c80-cece-4c9c-895e-c3833f786094`
  - Schedule: **23:05 PST daily**
  - Target: **isolated agentTurn**
  - Posts to `#nightly-brief` and then posts a 1‑line confirmation in `#mission-control`.

### Other jobs
- PM standup (main session): `3d891d8f-a680-48d2-91ec-d85023b7e7c1` @ 08:10
- Work block (Lead Gen + GHL): `e986db7d-1fc1-40d9-af72-986757f8f759` @ 10:30
- Work block (Sales enablement): `99303314-89b8-4c6a-9fb3-de2e90b477d7` @ 14:30
- Light check-in: `4b24f357-9edc-4f4c-b097-417fa21203ff` every 3h

Disabled legacy “trigger-only” jobs:
- Morning trigger: `cbc92212-719c-4441-ab72-07c9bc1dbbb1`
- Nightly trigger: `5beb72df-154a-4cc7-86fa-a940ff12c36a`

A snapshot export of cron jobs lives at:
- `mission-control/docs/AUTOMATIONS_CRON_BACKUP.json`

---

## 4) Mission Control file system (what the dashboard displays)

- Tasks: `mission-control/tasks/*.md`
- Working notes: `mission-control/WORKING.md`
- Activity ticker (local + logs): `mission-control/logs/activity.log`
- Agent descriptions (file-based “fleet”): `mission-control/agents/*.md`
- Key docs:
  - `mission-control/docs/OFFERS.md`
  - `mission-control/docs/AI_AGENT_FLEET.md`
  - `mission-control/docs/PROJECTS_AND_TASKS.md`
  - `mission-control/docs/sales-rep/*`
  - `mission-control/docs/ghl/TEMPLATE_LEAD_FLOW_ENGINE_ELECTRICIAN.md`

---

## 5) Offers (productized)

Canonical doc: `mission-control/docs/OFFERS.md`

Core offer:
- **Lead Flow Engine** → **$999 setup + $399/mo** (**3‑month minimum**)

Positioning:
- “SaaS-like, low-stress” delivery model; avoid high-retainer expectations.

---

## 6) GoHighLevel (GHL) / Lead Flow Engine template

Template location target:
- **Name:** `TEMPLATE — Lead Flow Engine (Electrician)`
- **Primary channel:** two-way texting
- **Phone:** placeholder for now (swap per client)
- Spec doc (build sheet):
  - `mission-control/docs/ghl/TEMPLATE_LEAD_FLOW_ENGINE_ELECTRICIAN.md`

Local-only connector scaffold (do not deploy secrets):
- `scripts/ghl-connector/README.md`
- `scripts/ghl-connector/ghl.mjs`

Env vars expected locally:
- `GHL_API_KEY` (required)
- `GHL_BASE_URL` (optional; defaults to `https://services.leadconnectorhq.com`)

---

## 7) Vercel + GitHub auth (why “no tasks yet” happens)

If the dashboard shows:
- “No tasks yet”
- `/api/tasks` returns `github 404`

…that means: Vercel is calling GitHub without sufficient permissions.

Required Vercel env vars (Production):
- `GITHUB_TOKEN` → Fine‑grained GitHub token with access to repo `carpefukendiem/mission-control`
  - Permissions: **Contents: Read** (and Metadata read)

Diagnostics:
- `GET /api/diag` (on Vercel) returns `hasToken`, plus GitHub reachability checks.

Implementation notes:
- GitHub API calls are made via `app/api/_github.ts`.
- Authorization header uses `Authorization: token <TOKEN>` for compatibility.

---

## 8) Known issues / tech debt

### A) Memory / long-term recall is currently broken
- `memory_search` tool returns `disabled: true`
- Root cause: embeddings call 403 (“project does not have access to model …”)
- This is separate from chat model choice; it’s the embeddings provider/model access.

Recommendation:
- Once the new provider/model is set, choose an embeddings model you **actually have access to**, or disable memory search until configured.

### B) Local UI server instability
- Sometimes process gets SIGKILL or port 3200 conflicts (EADDRINUSE)

---

## 9) Current priorities (what to do next)

1) **Electrician collateral pack v1**
   - Create:
     - `mission-control/docs/sales-rep/leave-behind-1pager-electrician.md`
     - `mission-control/docs/sales-rep/flyer-electrician.md`
   - Align to offer/pricing and texting wedge.

2) **Weekly rep packet v1**
   - 10 electrician targets + quick audit snippets + follow-up scripts.

3) **GHL connector — real endpoints**
   - Confirm auth type + headers
   - Implement: pipelines/stages, custom fields, workflows, calendar basics.

4) **Model/cost guardrails**
   - Move daily briefs to a cheaper model if Opus is default, or explicitly set per-cron model.

---

## 10) Backup checklist (disaster recovery)

### A) Local OpenClaw config
- File: `/Users/rubenruiz/.openclaw/openclaw.json`
- Make timestamped copies before major changes.

### B) Workspace
- Folder: `/Users/rubenruiz/.openclaw/workspace`
- Consider a tarball backup before model/provider changes.

### C) GitHub
- Ensure all commits are pushed to `main`.

---
