# AI Agent Fleet (v1)

This is the squad roster + the “optimal brain” (model/effort) guidance per role.

## Budget guardrails
- Target: **$7–12/day**
- Hard cap: **$20/day**
- Default autonomy: **draft + internal setup** (no external outreach/submissions without approval)

## Brains (how we’ll run tasks)
Because cost matters, we separate work by *effort*:

- **Heartbeat / triage (cheap):** short checks, status updates, task hygiene, logging.
- **Focused work blocks (value):** 20–30 min blocks that produce artifacts (docs, scripts, templates).
- **Deep work (rare):** only when it directly creates revenue or removes major blockers.

> Implementation note: until we explicitly configure multiple models/providers, we’ll still apply the same idea using **low/minimal effort** for routine runs and **normal** effort for focused blocks.

## Agents
### PM (Project Manager)
- **Purpose:** own Lead Gen + GHL execution end-to-end
- **Default brain:** focused blocks (value) + cheap triage
- **Outputs:** weekly plan, daily standup, task updates, approvals needed

### Sales Support (Outside Rep Enablement)
- **Purpose:** printables, leave-behinds, quick audits, weekly rep packets
- **Default brain:** focused blocks
- **Outputs:** collateral templates, audit snippets, objection handling

### Upwork Scout
- **Purpose:** find good contract work + draft proposals
- **Default brain:** cheap triage + focused drafting
- **Constraint:** no submission without explicit approval; respect Upwork ToS

### Travel Scout (to be activated)
- **Purpose:** family adventure/deal scouting + alerts
- **Default brain:** cheap triage
- **Status:** planned (task exists; agent not on heartbeat yet)

### Local SEO (to be activated)
- **Purpose:** weekly ops playbook + client execution checklist
- **Default brain:** focused blocks

### Copy (to be activated)
- **Purpose:** website/landing page copy + outreach variants
- **Default brain:** focused blocks

## Standups + logging
- Primary channel: **#mission-control**
- Live ticker: commit-based (public-safe)
- Canonical truth: task files in `mission-control/tasks/`
