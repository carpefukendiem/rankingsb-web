import type { NextApiRequest, NextApiResponse } from "next"

// TEMPORARY — delete after investigation
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.headers["x-setup-token"] !== "rankingsb-setup-2026") return res.status(403).end()
  const apiKey = process.env.GHL_API_KEY || ""
  const r = await fetch(
    "https://services.leadconnectorhq.com/contacts/?locationId=yrvzyq2jB2me4Z23PFxP&limit=20",
    { headers: { "Authorization": `Bearer ${apiKey}`, "Version": "2021-07-28" } }
  )
  // Delete a contact
  if (req.query.delete) {
    const dr = await fetch(`https://services.leadconnectorhq.com/contacts/${req.query.delete}`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${apiKey}`, "Version": "2021-07-28" }
    })
    return res.status(200).json({ deleted: req.query.delete, status: dr.status })
  }
  const raw = await r.json()
  if (req.query.debug) return res.status(200).json(raw)
  const contacts = (raw.contacts || []).map((c: Record<string, unknown>) => ({
    id: c.id,
    name: `${c.firstName || ""} ${c.lastName || ""}`.trim(),
    email: c.email,
    phone: c.phone,
    company: c.companyName,
    source: c.source,
    tags: c.tags,
    dateAdded: c.dateAdded,
    ip: c.ip,
  }))
  return res.status(200).json(contacts)
}
