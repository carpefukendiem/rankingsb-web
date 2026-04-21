import type { NextApiRequest, NextApiResponse } from "next"
import {
  crmRequest,
  getCrmApiKey,
  LOCATION_ID,
  OWNER_USER_ID,
  PIPELINE_ID,
  STAGE_ID,
  WORKFLOW_ID,
} from "@/lib/crm-api"
import { isBot } from "@/lib/website-form-bot-guard"

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
    _hp = "",
    _t = "",
  } = (req.body || {}) as Record<string, string>

  if (isBot(_hp, email, business, _t)) {
    console.log(
      `[contact] Bot blocked — email=${email} business=${business} hp=${!!_hp} elapsed=${_t ? Date.now() - parseInt(_t, 10) : "n/a"}ms`
    )
    return res.status(200).json({ success: true })
  }

  if (!email && !phone) {
    return res.status(400).json({ error: "Email or phone required" })
  }

  if (!getCrmApiKey()) {
    console.error("[contact] Missing CRM API key")
    return res.status(200).json({ success: true, degraded: true })
  }

  const [firstName, ...rest] = name.trim().split(" ")
  const lastName = rest.join(" ") || ""

  try {
    const contactRes = await crmRequest("POST", "/contacts/", {
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
      ].filter((f) => f.field_value),
    })

    const contactObj = (contactRes.contact ?? contactRes) as Record<string, unknown>
    const contactId = contactObj.id as string | undefined

    if (!contactId) {
      console.error("[contact] No contactId returned:", JSON.stringify(contactRes).slice(0, 300))
      return res.status(200).json({ success: true, degraded: true })
    }

    console.log(`[contact] Created contact ${contactId} for ${email}`)

    try {
      const oppRes = await crmRequest("POST", "/opportunities/", {
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

    try {
      await crmRequest("POST", `/contacts/${contactId}/workflow/${WORKFLOW_ID}`, {
        eventStartTime: new Date().toISOString(),
      })
      console.log(`[contact] Enrolled ${contactId} in Website Lead Workflow`)
    } catch (err) {
      console.error("[contact] Workflow error:", String(err))
    }

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
      ]
        .filter(Boolean)
        .join("\n")

      await crmRequest("POST", `/contacts/${contactId}/notes/`, {
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
