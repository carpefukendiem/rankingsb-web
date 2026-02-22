# Quick Start: Supabase Memory Setup

## 1. Create Project (5 min)
- Go to [supabase.com](https://supabase.com) → New Project
- Name: `johnny5-memory`
- Region: US West (N. California)
- Save the database password!

## 2. Get Credentials (2 min)
In Project Settings → API:
- Copy **Project URL** (e.g., `https://abc123.supabase.co`)
- Copy **service_role** key (NOT anon key)

## 3. Run Schema (2 min)
In SQL Editor, paste contents of:
`config/supabase-schema.sql`

## 4. Update .env (2 min)
```bash
SUPABASE_URL=https://[YOUR-PROJECT].supabase.co
SUPABASE_SERVICE_ROLE_KEY=[YOUR-KEY]
```

Also add to `~/.zshrc`:
```bash
echo 'export SUPABASE_URL=https://[YOUR-PROJECT].supabase.co' >> ~/.zshrc
echo 'export SUPABASE_SERVICE_ROLE_KEY=[YOUR-KEY]' >> ~/.zshrc
source ~/.zshrc
```

## 5. Install & Test (2 min)
```bash
cd /Users/rubenruiz/.openclaw/workspace
npm install
npm run test:memory
```

✅ Done! I will now remember everything.

---

## Contact Form Already Works
- API route: `pages/api/contact.js`
- Connected to GHL Rankingsb location
- Posts to `/api/contact` create GHL contacts

Test: `node lib/ghl-contact-backend.js`

---

## Files Created
- `lib/conversation-memory.js` - Memory system
- `lib/ghl-contact-backend.js` - Contact handler
- `config/supabase-schema.sql` - Database schema
- `scripts/test-memory.js` - Test script
- `SUPABASE-SETUP-GUIDE.md` - Full guide
