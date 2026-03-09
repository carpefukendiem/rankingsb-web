# Rankingsb — Master Prompt: New Client Website + GHL Integration

Use this prompt verbatim when starting a new client website build. Fill in every `[PLACEHOLDER]` before pasting.

---

## CONTEXT

You are building a production-ready local SEO / marketing agency client website for **Rankingsb** (agency: Ruben Ruiz, ruben@rankingsb.com, Santa Barbara CA).

This is a **Next.js 16+ App Router** site deployed to **Vercel** via **GitHub auto-deploy**, integrated with a **GoHighLevel (GHL) sub-account** that I will provide. Follow every instruction below exactly — this is a proven, tested, repeatable system.

---

## CLIENT INFO (fill before starting)

```
CLIENT_NAME=             [e.g. "Ocean View Plumbing"]
CLIENT_SLUG=             [e.g. "ocean-view-plumbing"]  ← used for repo/folder names
CLIENT_DOMAIN=           [e.g. "https://oceanviewplumbing.com"]
CLIENT_PHONE=            [e.g. "+18054441234"]
CLIENT_CITY=             [e.g. "Santa Barbara"]
CLIENT_STATE=            [e.g. "CA"]
CLIENT_INDUSTRY=         [e.g. "plumber"]
CLIENT_PRIMARY_COLOR=    [e.g. "#1e40af"]  ← brand color for buttons/accents
GHL_LOCATION_ID=         [provided by Ruben at build time]
GHL_API_KEY=             [Private Integration token — provided by Ruben at build time]
GITHUB_REPO=             [e.g. "carpefukendiem/{CLIENT_SLUG}-web"]
```

---

## PHASE 1 — GHL SUB-ACCOUNT SETUP (do this first via API)

Before writing any website code, set up the GHL sub-account so all IDs are known.

> **Important:** GHL API calls CANNOT be made from your local machine — Cloudflare blocks them with error 1010. Deploy a temporary diagnostic endpoint to Vercel first, then call it to proxy requests. See Phase 6 for deploy instructions. Alternatively, do Phase 2 first (project setup + deploy), then come back to Phase 1 to fetch IDs via the live endpoint.

### 1A. Verify API key works
```
GET https://services.leadconnectorhq.com/locations/{GHL_LOCATION_ID}
Headers: Authorization: Bearer {GHL_API_KEY}, Version: 2021-07-28
```
Expected: 200 with location name matching client. If 401/403, stop and ask Ruben for a fresh API key.

### 1B. Create "Website Forms" pipeline
```
POST https://services.leadconnectorhq.com/opportunities/pipelines/
{
  "locationId": "{GHL_LOCATION_ID}",
  "name": "Website Forms",
  "stages": [
    { "name": "New Form Lead" },
    { "name": "Contacted" },
    { "name": "Proposal Sent" },
    { "name": "Closed Won" },
    { "name": "Closed Lost" }
  ]
}
```
Save the pipeline ID and the "New Form Lead" stage ID.

> **Note:** If client already has a "Website Forms" pipeline from Ruben's agency template, skip creation and just fetch the IDs via `GET /opportunities/pipelines/?locationId={GHL_LOCATION_ID}`.

### 1C. Fetch GHL users to get Ruben's user ID
```
GET https://services.leadconnectorhq.com/users/?locationId={GHL_LOCATION_ID}
```
Find user with email `ruben@rankingsb.com`. Save:
- `OWNER_USER_ID` = Ruben's GHL user ID in this sub-account

### 1D. Create "Form Fill Notification" workflow (manual step — Ruben does this)
Tell Ruben: *"Go to GHL → Automation → Workflows → Create new workflow. Name it 'Form Fill Notification'. Set trigger: Contact Tag Added = 'Website Lead'. Action 1: Send SMS to your number with this template:*

```
New lead from [CLIENT_NAME] website:
Name: {{contact.full_name}}
Phone: {{contact.phone}}
Email: {{contact.email}}
Business: {{contact.company_name}}
Industry: {{contact.industry}}
Source: {{contact.source}}
```

*Save and publish. Give me the workflow URL so I can extract the workflow ID."*

Extract workflow ID from URL: `https://app.rankingsb.com/location/{location_id}/workflow/{WORKFLOW_ID}`

---

## PHASE 2 — PROJECT SETUP

### 2A. Create Next.js project
```bash
npx create-next-app@latest {CLIENT_SLUG}-web --typescript --tailwind --app --no-src-dir --import-alias "@/*"
cd {CLIENT_SLUG}-web
npm install lucide-react @tailwindcss/typography
npx shadcn@latest init -d
npx shadcn@latest add button card badge input
```

### 2B. next.config.ts
```typescript
import type { NextConfig } from "next"
import path from "path"

const nextConfig: NextConfig = {
  images: { unoptimized: true },
  turbopack: { root: path.resolve(__dirname) },
}

export default nextConfig
```

**CRITICAL — Never add `output: 'export'`:** Static export mode breaks all `/api/*` routes at runtime on Vercel. The site must run as serverless so API routes function. Also never add `distDir` unless explicitly needed.

### 2C. Environment variables
Set these in the **Vercel dashboard** (Settings → Environment Variables) AND locally in `.env.local`:

```
GHL_API_KEY=                   {GHL_API_KEY}
GHL_PIPELINE_ID=               {pipeline ID from Step 1B}
GHL_PIPELINE_STAGE_ID=         {New Form Lead stage ID from Step 1B}
GHL_WORKFLOW_ID=               {workflow ID from Step 1D}
GHL_LOCATION_ID=               {GHL_LOCATION_ID}
GHL_OWNER_USER_ID=             {OWNER_USER_ID from Step 1C}
NEXT_PUBLIC_SITE_URL=          {CLIENT_DOMAIN}
```

---

## PHASE 3 — LEAD CAPTURE API ROUTE

Create `pages/api/contact.ts`. Use the Pages Router for API routes — **not** the App Router. App Router API routes (`app/api/`) work differently and have caused issues.

```typescript
import type { NextApiRequest, NextApiResponse } from "next"

const GHL_BASE = "https://services.leadconnectorhq.com"
const LOCATION_ID = process.env.GHL_LOCATION_ID || ""
const PIPELINE_ID = process.env.GHL_PIPELINE_ID || ""
const STAGE_ID = process.env.GHL_PIPELINE_STAGE_ID || ""
const WORKFLOW_ID = process.env.GHL_WORKFLOW_ID || ""
const OWNER_USER_ID = process.env.GHL_OWNER_USER_ID || ""

// Extend these as new spam patterns are identified — see Spam Blocklist section
const SPAM_EMAIL_PATTERNS = [
  /remotetact/i, /intellagency/i, /flowchat/i, /a\.yo\.de\.k\.ep/i, /vettedvas/i,
]
const SPAM_COMPANY_PATTERNS = [
  /^[A-Za-z0-9]{18,}$/,  // GHL auto-generated IDs used as company name by bots
  /flowchat/i, /intellagency/i,
  /vettedvas/i, /vetted.*va/i, /virtual.*assist/i, /va\s+services/i,
]

// Minimum ms a real human takes to fill out a form.
// Automated scripts submit instantly — this blocks them even without honeypot.
const MIN_FILL_MS = 5000

function isBot(hp: string, email: string, business: string, mountTime: string): boolean {
  if (hp) return true // honeypot field was filled — definitely a bot
  if (SPAM_EMAIL_PATTERNS.some(p => p.test(email))) return true
  if (business && SPAM_COMPANY_PATTERNS.some(p => p.test(business))) return true
  // Timing check — bots submit in <1s; real people take at least 5s to fill a form
  if (mountTime) {
    const elapsed = Date.now() - parseInt(mountTime, 10)
    if (!isNaN(elapsed) && elapsed < MIN_FILL_MS) return true
  }
  return false
}

async function ghl(method: "GET" | "POST" | "DELETE", path: string, body?: object) {
  const apiKey = process.env.GHL_API_KEY || ""
  const res = await fetch(`${GHL_BASE}${path}`, {
    method,
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "Version": "2021-07-28",
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  })
  const text = await res.text()
  let data: unknown
  try { data = JSON.parse(text) } catch { data = { raw: text } }
  if (!res.ok) throw new Error(`GHL ${res.status} ${path}: ${text.slice(0, 300)}`)
  return data as Record<string, unknown>
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader("Access-Control-Allow-Origin", process.env.NEXT_PUBLIC_SITE_URL || "*")
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type")
  if (req.method === "OPTIONS") return res.status(200).end()
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" })

  const {
    name = "", email = "", phone = "", business = "",
    website = "", industry = "", source = "website", message = "",
    _hp = "",  // honeypot — bots fill this, humans don't
    _t = "",   // form mount timestamp — used for timing check
  } = (req.body || {}) as Record<string, string>

  if (isBot(_hp, email, business, _t)) {
    console.log(`[contact] Bot blocked — email=${email} hp=${!!_hp} elapsed=${_t ? Date.now() - parseInt(_t, 10) : "n/a"}ms`)
    return res.status(200).json({ success: true }) // lie to the bot — don't reveal detection
  }

  if (!email && !phone) {
    return res.status(400).json({ error: "Email or phone required" })
  }

  const [firstName, ...rest] = name.trim().split(" ")
  const lastName = rest.join(" ") || ""

  try {
    // ── Step 1: Create / update contact ──────────────────────────────────
    const contactRes = await ghl("POST", "/contacts/", {
      locationId: LOCATION_ID,
      firstName, lastName, email, phone,
      companyName: business, website, source,
      tags: [
        "Website Lead",
        source === "free-audit-page" ? "Free Audit Request" : "Contact Form",
        industry,
      ].filter(Boolean),
      customFields: [
        { key: "website", field_value: website },
        { key: "industry", field_value: industry },
        { key: "message", field_value: message },
      ].filter(f => f.field_value),
    })

    // GHL sometimes returns { contact: {...} } and sometimes just {...}
    const contactObj = (contactRes.contact ?? contactRes) as Record<string, unknown>
    const contactId = contactObj.id as string | undefined

    if (!contactId) {
      console.error("[contact] No contactId:", JSON.stringify(contactRes).slice(0, 300))
      return res.status(200).json({ success: true, degraded: true })
    }

    console.log(`[contact] Created ${contactId} for ${email}`)

    // ── Step 2: Add to Website Forms pipeline ────────────────────────────
    if (PIPELINE_ID && STAGE_ID) {
      try {
        const oppRes = await ghl("POST", "/opportunities/", {
          locationId: LOCATION_ID,
          pipelineId: PIPELINE_ID,
          pipelineStageId: STAGE_ID,
          contactId,
          name: `${name || email} — Website Form`,
          status: "open",
          assignedTo: OWNER_USER_ID,
          monetaryValue: 0,
        })
        const oppId = (oppRes.opportunity as Record<string, unknown>)?.id ?? oppRes.id
        console.log(`[contact] Opportunity ${oppId}`)
      } catch (err) {
        console.error("[contact] Opportunity error:", String(err))
      }
    }

    // ── Step 3: Enroll in notification workflow ───────────────────────────
    if (WORKFLOW_ID) {
      try {
        await ghl("POST", `/contacts/${contactId}/workflow/${WORKFLOW_ID}`, {
          eventStartTime: new Date().toISOString(),
        })
        console.log(`[contact] Workflow enrolled`)
      } catch (err) {
        console.error("[contact] Workflow error:", String(err))
      }
    }

    // ── Step 4: Add note with full form details ──────────────────────────
    try {
      const note = [
        "📋 Website Form Submission",
        `Name: ${name || "—"}`,
        `Email: ${email || "—"}`,
        `Phone: ${phone || "—"}`,
        `Business: ${business || "—"}`,
        `Website: ${website || "—"}`,
        `Industry: ${industry || "—"}`,
        `Form: ${source}`,
        message ? `Message: ${message}` : "",
      ].filter(Boolean).join("\n")

      await ghl("POST", `/contacts/${contactId}/notes/`, {
        body: note,
        userId: OWNER_USER_ID,
      })
    } catch (err) {
      console.warn("[contact] Note error:", String(err))
    }

    return res.status(200).json({ success: true, contactId })

  } catch (err) {
    console.error("[contact] Fatal:", String(err))
    return res.status(200).json({ success: true, degraded: true })
  }
}
```

---

## PHASE 4 — LEAD FORM COMPONENT

Create `components/shared/LeadForm.tsx`. This is the **only** form component used across the entire site. Never use raw `<form>` elements — always use this component.

```typescript
"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, Loader2 } from "lucide-react"

interface LeadFormProps {
  source: string
  showIndustry?: boolean
  showWebsite?: boolean
  showMessage?: boolean
  buttonText?: string
  className?: string
}

export function LeadForm({
  source,
  showIndustry = true,
  showWebsite = true,
  showMessage = false,
  buttonText = "Get My Free SEO Audit",
  className = "",
}: LeadFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [mountTime, setMountTime] = useState<number | null>(null)

  // Record when the form was rendered — used server-side to catch instant (bot) submissions
  useEffect(() => {
    setMountTime(Date.now())
  }, [])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const data = Object.fromEntries(new FormData(e.currentTarget))
    data.source = source
    data._t = mountTime ? String(mountTime) : ""
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
    } catch { /* fail silently */ }
    router.push("/thank-you")
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      {/* Honeypot — invisible to humans, auto-filled by bots */}
      <input name="_hp" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ display: "none" }} />

      <div>
        <label className="text-sm font-medium text-slate-700 mb-1 block">Your Name *</label>
        <Input name="name" placeholder="John Smith" className="h-12" required />
      </div>
      <div>
        <label className="text-sm font-medium text-slate-700 mb-1 block">Business Name *</label>
        <Input name="business" placeholder="Your Business LLC" className="h-12" required />
      </div>
      <div>
        <label className="text-sm font-medium text-slate-700 mb-1 block">Email Address *</label>
        <Input type="email" name="email" placeholder="john@yourbusiness.com" className="h-12" required />
      </div>
      <div>
        <label className="text-sm font-medium text-slate-700 mb-1 block">Phone Number *</label>
        <Input type="tel" name="phone" placeholder="(805) 555-0123" className="h-12" required />
      </div>
      {showWebsite && (
        <div>
          <label className="text-sm font-medium text-slate-700 mb-1 block">Website URL</label>
          <Input name="website" placeholder="https://yourbusiness.com" className="h-12" />
        </div>
      )}
      {showIndustry && (
        <div>
          <label className="text-sm font-medium text-slate-700 mb-1 block">Industry</label>
          <select name="industry" className="w-full h-12 px-3 border rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Select your industry</option>
            <option value="electrician">Electrician</option>
            <option value="hvac">HVAC / Heating & Cooling</option>
            <option value="plumber">Plumber</option>
            <option value="roofer">Roofing</option>
            <option value="solar">Solar</option>
            <option value="attorney">Attorney / Law Firm</option>
            <option value="dental">Dental</option>
            <option value="medical">Medical Practice</option>
            <option value="real-estate">Real Estate</option>
            <option value="restaurant">Restaurant</option>
            <option value="contractor">General Contractor</option>
            <option value="winery">Winery / Wine Bar</option>
            <option value="spa-beauty">Spa / Beauty Salon</option>
            <option value="pest-control">Pest Control</option>
            <option value="landscaping">Landscaping</option>
            <option value="other">Other</option>
          </select>
        </div>
      )}
      {showMessage && (
        <div>
          <label className="text-sm font-medium text-slate-700 mb-1 block">Message</label>
          <textarea
            name="message"
            placeholder="Tell us about your business and goals..."
            className="w-full px-3 py-3 border rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows={3}
          />
        </div>
      )}
      <Button type="submit" disabled={loading} className="w-full h-12 text-lg bg-blue-600 hover:bg-blue-700 mt-2">
        {loading ? (
          <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Submitting...</>
        ) : (
          <>{buttonText}<ArrowRight className="w-5 h-5 ml-2" /></>
        )}
      </Button>
      <p className="text-xs text-slate-400 text-center">No spam, ever. We respect your privacy.</p>
    </form>
  )
}
```

**Usage in pages:**
```tsx
// Free audit page (most common)
<LeadForm source="free-audit-page" />

// Homepage (no website field, custom CTA text)
<LeadForm source="homepage" showWebsite={false} buttonText="Get My Free Audit" />

// Industry page (pass slug as source)
<LeadForm source="plumber" showWebsite={false} buttonText="Get My Free Audit" />

// Contact page (with message field)
<LeadForm source="contact-page" showMessage={true} buttonText="Send Message" />
```

**NEVER use raw `<form>` elements.** Every form on the site must use this `<LeadForm>` component. Raw forms with no `action` or `onSubmit` are silently broken.

---

## PHASE 5 — THANK YOU PAGE

Create `app/thank-you/page.tsx`. This page must:
- Confirm submission with a clear headline ("We Got It! We'll Be In Touch Shortly")
- Show "What Happens Next" (3 steps: audit scheduled, strategy call, results)
- Include 3 real client case studies with specific numbers (get from Ruben)
- Include 4-6 Google-style reviews (get real ones from Ruben or GMB)
- Bottom CTA: "While You Wait, Learn About Our Approach" → link to blog
- Set `robots: { index: false, follow: false }` to exclude from Google
- Set `export const metadata` with noindex

---

## PHASE 6 — VERCEL DEPLOYMENT

### vercel.json
```json
{
  "version": 2,
  "name": "{CLIENT_SLUG}-web",
  "framework": "nextjs",
  "env": {
    "NEXT_PUBLIC_SITE_URL": "{CLIENT_DOMAIN}"
  },
  "github": {
    "enabled": true,
    "autoAlias": true,
    "silent": false
  },
  "redirects": [
    // Map all old site URLs → new equivalent pages
    // Add 301 redirects discovered by scanning the old site
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" }
      ]
    }
  ]
}
```

**Critical vercel.json rules:**
- Do NOT add a `builds` array — it bypasses Vercel's project settings and causes warnings
- Do NOT add `buildCommand` or `outputDirectory` — let Vercel auto-detect Next.js
- Do NOT use `output: 'export'` in next.config.ts — breaks API routes

### Deployment: GitHub auto-deploy (preferred)
```bash
git add -A
git commit -m "Initial deploy"
git push origin main
```
Vercel watches the GitHub repo and auto-deploys on every push to `main`. Check progress at vercel.com dashboard.

### Deployment: Vercel CLI (fallback if no GitHub connection)
```bash
npx vercel --prod --token {VERCEL_TOKEN} --scope {VERCEL_SCOPE} --yes
```
Vercel scope for Rankingsb projects: `carpefukendiems-projects`

### Temporary diagnostic endpoint (needed to call GHL API from Vercel's servers)
Create `pages/api/ghl-setup.ts` temporarily to proxy GHL calls (Cloudflare blocks local machine calls):
```typescript
import type { NextApiRequest, NextApiResponse } from "next"
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.headers["x-setup-token"] !== "rankingsb-setup-2026") return res.status(403).end()
  const apiKey = process.env.GHL_API_KEY || ""
  const { path, method = "GET", body } = req.query
  const r = await fetch(`https://services.leadconnectorhq.com${path}`, {
    method: String(method),
    headers: { "Authorization": `Bearer ${apiKey}`, "Version": "2021-07-28", "Content-Type": "application/json" },
    ...(body ? { body: String(body) } : {}),
  })
  res.status(200).json(await r.json())
}
```
**Delete this file immediately after Phase 1 setup is complete.**

---

## PHASE 7 — BUTTON & FORM AUDIT

Before launch, run these Python audit scripts to catch broken UI elements.

### Dead button detection (buttons not wrapped in Link/a)
```python
import re, glob

def check_buttons(pattern="app/**/*.tsx"):
    files = glob.glob(pattern, recursive=True)
    broken = []
    for f in files:
        lines = open(f).readlines()
        for i, line in enumerate(lines):
            if "<Button" in line and 'type="submit"' not in line:
                ctx = "".join(lines[max(0,i-5):i+1])
                if not re.search(r'<(Link|a)\b', ctx):
                    broken.append(f"{f}:{i+1} — {line.strip()[:80]}")
    for b in broken:
        print("❌", b)
    print(f"\n{len(broken)} broken buttons found")

check_buttons()
```

### Dead form detection (raw forms with no handler)
```python
import re, glob

for f in glob.glob("app/**/*.tsx", recursive=True):
    content = open(f).read()
    if re.search(r'<form\b(?![^>]*onSubmit)', content):
        if 'LeadForm' not in content:
            print(f"❌ Raw form without handler: {f}")
```

Fix all broken buttons by wrapping in `<Link href="/free-audit">`. Replace all raw forms with `<LeadForm>` component.

---

## PHASE 8 — INTEGRATION TEST (run before handing off)

```python
import urllib.request, json, time

BASE = "https://{CLIENT_DOMAIN}/api/contact"
ts = int(time.time())

def post(payload, label):
    req = urllib.request.Request(BASE,
        data=json.dumps(payload).encode(),
        headers={"Content-Type": "application/json"},
        method="POST")
    with urllib.request.urlopen(req) as r:
        resp = json.loads(r.read())
    created = "contactId" in resp and not resp.get("degraded")
    print(f"{'✅ Created' if created else '✅ Blocked'} {label} — {resp}")

# Real lead — must appear in GHL pipeline + trigger SMS
# Include _t timestamp simulating a human who took 15s to fill the form
mount_time = str(int(time.time() * 1000) - 15000)
post({
    "name": "Test Lead", "email": f"test.{ts}@testco.com",
    "phone": "8055550000", "business": "Test Co",
    "industry": "other", "source": "free-audit-page",
    "_hp": "", "_t": mount_time
}, "Real lead (15s fill time)")

# Bot tests — must ALL be silently blocked (no GHL entry created)
post({"name": "Bot", "email": "bot@test.com", "_hp": "filled", "_t": mount_time}, "Honeypot bot")
post({"name": "Spammer", "email": "x@remotetact.com", "_hp": "", "_t": mount_time}, "Spam email domain")
post({"name": "VA Cold Outreach", "email": "x@vettedvas.com", "_hp": "", "_t": mount_time}, "VA cold outreach")
post({
    "name": "Speed Bot", "email": f"speedbot.{ts}@gmail.com",
    "phone": "8055550001", "business": "Fast Co",
    "_hp": "", "_t": str(int(time.time() * 1000))  # submitted instantly
}, "Timing bot (instant submit)")
```

**Verify in GHL after running:**
- [ ] Real lead appears in **Website Forms → New Form Lead**
- [ ] Real lead has tags: `Website Lead`, source tag, industry tag
- [ ] Real lead has note with full form details
- [ ] Ruben receives SMS with lead info within 60 seconds
- [ ] ZERO bot contacts appear anywhere in GHL

---

## PHASE 9 — POST-LAUNCH CHECKLIST

- [ ] Submit `{CLIENT_DOMAIN}/sitemap.xml` to Google Search Console
- [ ] Request indexing for homepage, services, and top location pages
- [ ] Verify favicon appears in browser tab
- [ ] Test all form submission flows end-to-end on mobile and desktop
- [ ] Confirm 301 redirects work: `curl -I {old-url}` → should show `Location: {new-url}`
- [ ] Check Vercel function logs for any `[contact] error` entries
- [ ] **Delete all test contacts from GHL** (see Contact Hygiene section below)
- [ ] Delete temporary `ghl-setup.ts` diagnostic endpoint if not already removed
- [ ] Verify no `ghl-setup.ts` or `ghl-recent.ts` diagnostic endpoints in production

---

## SPAM BLOCKLIST MAINTENANCE

When new spam gets through, add the pattern to both `SPAM_EMAIL_PATTERNS` and/or `SPAM_COMPANY_PATTERNS` in `pages/api/contact.ts`.

**Key insight — two types of unwanted submissions:**
1. **Automated bots** — caught by honeypot (`_hp`) and timing check (`_t < 5000ms`)
2. **Human cold outreach** (VA companies, marketing agencies) — must be caught by email/company pattern matching. Tell-tale signs: email domain matches a service company, industry selected is random/wrong, company name contains "VA", "Virtual Assistant", "Agency"

| Source | Pattern | Type |
|---|---|---|
| RemoteTact | `/remotetact/i` (email) | Bot |
| Intellagency.ai | `/intellagency/i` (email + company) | Bot |
| FlowChat | `/flowchat/i` (email + company) | Bot |
| Gmail scraper | `/a\.yo\.de\.k\.ep/i` (email) | Bot |
| GHL ID as company | `/^[A-Za-z0-9]{18,}$/` (company) | Bot |
| Vetted VAs (vettedvas.com) | `/vettedvas/i` (email + company) | Human cold outreach |
| Generic VA companies | `/vetted.*va/i`, `/virtual.*assist/i`, `/va\s+services/i` | Human cold outreach |

---

## CONTACT HYGIENE

After testing, delete all test contacts from GHL before handing the site to the client.

### Temporary delete endpoint
Add to `pages/api/ghl-setup.ts` (or create `pages/api/ghl-recent.ts` temporarily):
```typescript
// Add this inside the handler:
if (req.query.delete) {
  const dr = await fetch(`https://services.leadconnectorhq.com/contacts/${req.query.delete}`, {
    method: "DELETE",
    headers: { "Authorization": `Bearer ${apiKey}`, "Version": "2021-07-28" }
  })
  return res.status(200).json({ deleted: req.query.delete, status: dr.status })
}
```

Then call it for each test contact ID:
```bash
curl "https://{CLIENT_DOMAIN}/api/ghl-setup?delete={CONTACT_ID}" \
  -H "x-setup-token: rankingsb-setup-2026"
```

**Delete this endpoint when done.** Never leave diagnostic endpoints in production.

---

## KEY REFERENCE IDs (Rankingsb master sub-account)

> These are for Ruben's own `rankingsb.com` website. New client sub-accounts will have different IDs — run Phase 1 to discover them.

| Item | Value |
|---|---|
| GHL Location ID | `yrvzyq2jB2me4Z23PFxP` |
| Ruben's GHL User ID | `f9vwcJruPj2OsBE5o5H0` |
| Ruben's GHL Contact ID | `Jr6XLDoWJdZwlg4y48Dk` |
| Ruben's Phone (GHL) | `+18052589236` |
| Vercel Scope | `carpefukendiems-projects` |
| GitHub Org | `carpefukendiem` |
| Website Forms Pipeline | `sehxEqLagvuYTMkkVksH` |
| New Form Lead Stage | `54a34543-de3b-47fd-85cb-34ff6da2c5b0` |
| Form Fill Workflow | `9c8cd11f-55fa-4c9b-b64c-f4f5223eb114` |

---

## COMMON PITFALLS (learned the hard way)

| Mistake | Consequence | Fix |
|---|---|---|
| `output: 'export'` in next.config.ts | API routes compile but fail silently at runtime | Remove it entirely |
| `builds` array in vercel.json | Bypasses project settings, causes warnings | Remove it entirely |
| App Router API routes (`app/api/`) | Different behavior from Pages Router | Use `pages/api/` for all API routes |
| Raw `<form>` elements without handler | Silently does nothing on submit | Replace with `<LeadForm>` component |
| `<Button>` not inside `<Link>` | Click does nothing | Wrap in `<Link href="/free-audit">` |
| GHL API calls from local machine | Cloudflare error 1010 blocks all requests | Use live Vercel endpoint as proxy |
| Not cleaning up test contacts | Pollutes client's GHL pipeline | Always clean up before handoff |
| Diagnostic endpoints left in production | Security risk, unnecessary exposure | Delete before handoff |
