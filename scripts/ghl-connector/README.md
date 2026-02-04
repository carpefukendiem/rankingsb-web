# GHL Connector (local-only)

Purpose: connect Mission Control to GoHighLevel using an API key stored in env vars (never committed).

## Why local-only
Your Vercel dashboard is public; secrets must **not** be deployed there.
This connector runs on your iMac and can:
- validate API connectivity
- create/update template assets (pipelines, workflows, custom fields)
- export state back into Mission Control files

## Setup
1) Create env var (recommended: use your shell profile or 1Password CLI injection):

```bash
export GHL_API_KEY='***'
export GHL_BASE_URL='https://services.leadconnectorhq.com'
```

2) Run:
```bash
node scripts/ghl-connector/ghl.mjs help
```

## Current status
Scaffolded. Next step is to plug in the exact GHL API endpoints and headers for:
- pipelines
- workflows
- custom fields
- calendars

To finish this, either:
- paste the GHL API docs link/section you’re using, or
- enable web_search in OpenClaw so I can pull the latest API reference.
