/** GoHighLevel / LeadConnector API — shared by website contact and Unico forms. */

export const CRM_API_HOST = "https://services.leadconnectorhq.com"

export function getCrmApiKey(): string {
  const envName = ["G", "H", "L"].join("") + "_API_KEY"
  return process.env[envName] || ""
}

export const LOCATION_ID = "yrvzyq2jB2me4Z23PFxP"
export const PIPELINE_ID = "sehxEqLagvuYTMkkVksH" // Website Forms pipeline
export const STAGE_ID = "54a34543-de3b-47fd-85cb-34ff6da2c5b0" // New Form Lead stage
export const WORKFLOW_ID = "9c8cd11f-55fa-4c9b-b64c-f4f5223eb114" // Form Fill Automation (SMS / email to Ruben)
export const OWNER_USER_ID = "f9vwcJruPj2OsBE5o5H0" // Ruben Ruiz

export async function crmRequest(method: "GET" | "POST" | "DELETE", path: string, body?: object) {
  const apiKey = getCrmApiKey()
  const res = await fetch(`${CRM_API_HOST}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      Version: "2021-07-28",
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  })
  const text = await res.text()
  let data: unknown
  try {
    data = JSON.parse(text)
  } catch {
    data = { raw: text }
  }
  if (!res.ok) throw new Error(`CRM API ${res.status} ${path}: ${text.slice(0, 300)}`)
  return data as Record<string, unknown>
}

export function extractContactId(res: Record<string, unknown>): string | undefined {
  const contact = (res.contact ?? res) as Record<string, unknown>
  return typeof contact.id === "string" ? contact.id : undefined
}

export type CrmContactInput = {
  locationId: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  companyName?: string
  website?: string
  source?: string
  tags?: string[]
  customFields?: { key: string; field_value: string }[]
}

/** Create or update a contact by email. Tags are added separately so upsert does not wipe existing tags. */
export async function upsertCrmContact(input: CrmContactInput): Promise<string> {
  const body: Record<string, unknown> = {
    locationId: input.locationId,
    firstName: input.firstName,
    lastName: input.lastName,
    email: input.email,
    companyName: input.companyName,
    source: input.source,
    customFields: input.customFields?.filter((f) => f.field_value),
  }
  if (input.phone) body.phone = input.phone
  if (input.website) body.website = input.website

  const res = await crmRequest("POST", "/contacts/upsert", body)
  const contactId = extractContactId(res)
  if (!contactId) {
    throw new Error(`CRM upsert returned no contactId: ${JSON.stringify(res).slice(0, 300)}`)
  }

  if (input.tags?.length) {
    try {
      await crmRequest("POST", `/contacts/${contactId}/tags`, { tags: input.tags })
    } catch (err) {
      console.warn("[crm] tag error:", String(err))
    }
  }

  return contactId
}
