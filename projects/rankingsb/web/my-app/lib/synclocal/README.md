# SyncLocal (citation + verification)

Internal Ranking SB console for **SyncLocal** — lives under `/admin/synclocal`, `app/api/synclocal/*`, and `lib/synclocal/*`.

## Environment variables

Copy **`.env.local.example`** to `.env.local` and fill values. Never commit real credentials.

| Variable | Required for | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | UI + APIs | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | UI + APIs | Browser-safe key; RLS enforces access |
| `SUPABASE_SERVICE_ROLE_KEY` | Monthly cron only | Bypasses RLS — server-side only |
| `SYNCLocal_CRON_VERIFY_SECRET` or `CRON_SECRET` | Cron route | Must match Vercel cron `Authorization: Bearer …` |
| `GOOGLE_BUSINESS_PROFILE_CLIENT_ID` | GBP push | Google Cloud OAuth client |
| `GOOGLE_BUSINESS_PROFILE_CLIENT_SECRET` | GBP push | OAuth client secret |
| `GOOGLE_BUSINESS_PROFILE_REFRESH_TOKEN` | GBP push | Offline refresh token with Business Profile scope |
| `GOOGLE_BUSINESS_PROFILE_LOCATION_RESOURCE` | GBP push | `accounts/…/locations/…` for the verified listing |
| `BING_PLACES_API_KEY` | Bing adapter | Credential for your Bing/Microsoft listing workflow |
| `BING_PLACES_API_ENDPOINT` | Bing adapter (optional) | Override POST URL; default is a scaffold until SKU is finalized |
| `FACEBOOK_GRAPH_API_TOKEN` | Facebook adapter | Page access token |
| `FACEBOOK_BUSINESS_PAGE_ID` | Facebook adapter | Numeric page id |

Email summaries use `SYNCLocal_ALERT_EMAIL` (defaults to ruben@rankingsb.com) once `lib/synclocal/email.ts` is wired to a provider.

### Google Business Profile OAuth (high level)

1. In [Google Cloud Console](https://console.cloud.google.com/), create a project (or reuse one).
2. Enable **Google Business Profile Performance API / Business Profile APIs** applicable to managing your location.
3. Configure **OAuth consent** (internal or external) with the scopes required for managing the verified location (`business.manage` scope family — verify current Google documentation).
4. Create OAuth **client ID** (web or desktop); set redirect URI for whichever flow you use to obtain tokens.
5. Run the OAuth authorization code flow once; exchange for **refresh_token** with `access_type=offline` and store it as `GOOGLE_BUSINESS_PROFILE_REFRESH_TOKEN`.
6. Copy the target location’s API **resource name** into `GOOGLE_BUSINESS_PROFILE_LOCATION_RESOURCE` (`accounts/{id}/locations/{id}`).

Consult the latest Google Business Profile / My Business APIs documentation — names and scopes change; this README avoids locking you to stale endpoint strings.

## Database

SQL migrations:

- `supabase/migrations/20260512120000_synclocal_schema.sql` — enums, tenant tables (`agencies`, `agency_members`), citation tables, RLS  
- `supabase/migrations/20260512120001_synclocal_seed_rankingsb.sql` — Ranking SB agency, business, directory catalog, `not_submitted` listings

After applying migrations in Supabase:

1. Create an auth user (email/password) for yourself in **Authentication**.
2. Link the user to the seeded agency:

```sql
insert into agency_members (agency_id, user_id)
values ('a0000000-0000-4000-8000-000000000001', '<your-auth-user-uuid>')
on conflict do nothing;
```

3. Visit `/admin/login`, sign in, then open **SyncLocal** from the admin nav.

## Vercel cron

`vercel.json` schedules **`0 17 1 * *` UTC** (≈ 09:00 US/Pacific depending on DST) against `/api/synclocal/cron/verify-all`. Set `CRON_SECRET` in Vercel or align `SYNCLocal_CRON_VERIFY_SECRET` with the bearer token Vercel sends.

## Operational notes

- Tier **form / Playwright** directories enqueue **manual submission** payloads in SyncLocal v1 — Playwright fills in later without schema changes.
- User-visible copy stays **vendor-neutral** (no competitor/platform names surfaced in-admin beyond what directories themselves are named).
