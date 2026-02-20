# GHL API Token Refresh — Private Integration Setup

## 🚨 Current Status
**Old Token:** `pit-0ab4c82b-c4b2-4493-b7e5-fd8e94343813` — **EXPIRED/REVOKED**  
**New Method:** Private Integrations (API v2)

---

## 🔧 Step-by-Step: Create New API Token

### Step 1: Go to Agency Settings
1. Log into GHL as agency owner: https://app.rankingsb.com/
2. Click **Settings** (gear icon)
3. Go to **Company** → **Private Integrations**

### Step 2: Create Private Integration
1. Click **+ Create Integration**
2. Fill in:
   - **Name:** Johnny 5 API
   - **Description:** API access for automation and reporting
   - **Logo:** (optional)
3. Click **Create**

### Step 3: Get Credentials
After creating, you'll see:
- **Client ID** (looks like: `67b7...`)
- **Client Secret** (long string)
- **API Key** (looks like: `pit-...`)

**Copy the API Key** — this is what we need.

### Step 4: Set Permissions
Make sure these scopes are enabled:
- ✅ `businesses.read` — Read location data
- ✅ `contacts.read` — Read contacts
- ✅ `contacts.write` — Create/update contacts
- ✅ `opportunities.read` — Read pipeline/deals
- ✅ `opportunities.write` — Update pipeline
- ✅ `calendars/events.read` — Read appointments
- ✅ `calendars/events.write` — Create appointments
- ✅ `users.read` — Read user data
- ✅ `activities.read` — Read activity logs

### Step 5: Whitelist Locations
Add these location IDs:
- `yrvzyq2jB2me4Z23PFxP` (Rankingsb)
- `RaVrmoQzcKFJjHsc9Kxh` (CushionFoamz)

### Step 6: Update Environment
Once you have the new token:

```bash
export GHL_API_TOKEN=your_new_pit_token_here
```

Then update `.env`:
```bash
## GoHighLevel (Rankingsb)
**Key:** your_new_pit_token_here
**Location IDs:**
- Rankingsb: yrvzyq2jB2me4Z23PFxP
- CushionFoamz: RaVrmoQzcKFJjHsc9Kxh
```

---

## 🧪 Test Script

Run this to verify the token works:

```bash
node scripts/ghl-test-token.js
```

It will:
1. List locations in your agency
2. Show users in Rankingsb
3. Test reading opportunities

---

## 📋 API v2 Endpoints (New)

Base URL changed:
- **Old:** `https://rest.gohighlevel.com/v1/...`
- **New:** `https://services.leadconnectorhq.com/...`

### Key Endpoints for Sal Monitoring:

```
# Get opportunities (pipeline)
GET https://services.leadconnectorhq.com/opportunities/
  ?locationId={locationId}
  &limit=100
  
# Get contacts
GET https://services.leadconnectorhq.com/contacts/
  ?locationId={locationId}
  &limit=100
  
# Get appointments
GET https://services.leadconnectorhq.com/calendars/events
  ?locationId={locationId}
  &startAfter={timestamp}
  
# Get users
GET https://services.leadconnectorhq.com/users/
  ?locationId={locationId}
```

---

## 🔔 What Changed

| Old (v1) | New (v2) |
|----------|----------|
| API Keys in settings | Private Integrations |
| `rest.gohighlevel.com` | `services.leadconnectorhq.com` |
| Basic auth header | Bearer token |
| `Authorization: Bearer {token}` | Same, but token format changed |

---

## ⏱️ Timeline

- **Now:** Old token doesn't work
- **After setup:** New token works for all API calls
- **Sal monitoring:** Live once token is active

---

**Action Required:** Create Private Integration in GHL and paste the new API key here.
