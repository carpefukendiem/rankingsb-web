import type { NextApiRequest, NextApiResponse } from "next"

const GHL_BASE = "https://services.leadconnectorhq.com"
const LOCATION_ID = "yrvzyq2jB2me4Z23PFxP"
const PIPELINE_ID = "sehxEqLagvuYTMkkVksH"         // Website Forms pipeline
const STAGE_ID = "54a34543-de3b-47fd-85cb-34ff6da2c5b0" // New Form Lead stage
const WORKFLOW_ID = "9c8cd11f-55fa-4c9b-b64c-f4f5223eb114" // Form Fill Automation
const OWNER_USER_ID = "f9vwcJruPj2OsBE5o5H0"       // Ruben Ruiz

// Known spam domains/patterns — extend this list as needed
const SPAM_EMAIL_PATTERNS = [/remotetact/i, /intellagency/i, /flowchat/i, /a\.yo\.de\.k\.ep/i, /vettedvas/i]
const SPAM_COMPANY_PATTERNS = [
  /^[A-Za-z0-9]{18,}$/,
  /flowchat/i,
  /intellagency/i,
  /vettedvas/i,
  /vetted.*va/i,
  /virtual.*assist/i,
  /va\s+services/i,
]

// Minimum ms a human takes to fill a form. Bots submit instantly.
const MIN_FILL_MS = 5000

function isBot(hp: string, email: string, business: string, mountTime: string): boolean {
  if (hp) return true // honeypot field was filled — definitely a bot
  if (SPAM_EMAIL_PATTERNS.some(p => p.test(email))) return true
  if (business && SPAM_COMPANY_PATTERNS.some(p => p.test(business))) return true
  // Timing check — reject if form submitted in under 5 seconds
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
  res.setHeader("Access-Control-Allow-Origin", "https://www.rankingsb.com")
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type")
  if (req.method === "OPTIONS") return res.status(200).end()
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" })

  const {
    name = "",
    email = "",
    phone = "",
    business = "",
    website = "",
    industry = "",
    source = "website",
    message = "",
    _hp = "",  // honeypot — bots fill this, humans don't
    _t = "",   // mount timestamp — used for timing check
  } = (req.body || {}) as Record<string, string>

  // Bot protection
  if (isBot(_hp, email, business, _t)) {
    console.log(`[contact] Bot blocked — email=${email} business=${business} hp=${!!_hp} elapsed=${_t ? Date.now() - parseInt(_t, 10) : "n/a"}ms`)
    return res.status(200).json({ success: true }) // lie to the bot
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
      firstName,
      lastName,
      email,
      phone,
      companyName: business,
      website,
      source,
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

    const contactObj = (contactRes.contact ?? contactRes) as Record<string, unknown>
    const contactId = contactObj.id as string | undefined

    if (!contactId) {
      console.error("[contact] No contactId returned:", JSON.stringify(contactRes).slice(0, 300))
      return res.status(200).json({ success: true, degraded: true })
    }

    console.log(`[contact] Created contact ${contactId} for ${email}`)

    // ── Step 2: Add to Website Forms pipeline ────────────────────────────
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
      console.log(`[contact] Opportunity created ${oppId}`)
    } catch (err) {
      console.error("[contact] Opportunity error:", String(err))
    }

    // ── Step 3: Enroll in Website Lead Workflow (notifies Ruben via SMS) ─
    try {
      await ghl("POST", `/contacts/${contactId}/workflow/${WORKFLOW_ID}`, {
        eventStartTime: new Date().toISOString(),
      })
      console.log(`[contact] Enrolled ${contactId} in Website Lead Workflow`)
    } catch (err) {
      console.error("[contact] Workflow error:", String(err))
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
    console.error("[contact] Fatal error:", String(err))
    return res.status(200).json({ success: true, degraded: true })
  }
}
