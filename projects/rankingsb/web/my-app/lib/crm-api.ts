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
