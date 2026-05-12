import type { BusinessRow, SynclocalDiscrepancyField } from "./types"

export type ScrapedNapFields = {
  name?: string | null
  address_line1?: string | null
  address_line2?: string | null
  city?: string | null
  state?: string | null
  zip?: string | null
  country?: string | null
  phone?: string | null
  email?: string | null
  website?: string | null
}

export function normalizePhone(value: string | null | undefined): string {
  if (!value) return ""
  return value.replace(/\D/g, "")
}

export function normalizeWhitespace(value: string | null | undefined): string {
  if (!value) return ""
  return value.replace(/\s+/g, " ").trim().toLowerCase()
}

export function normalizeUrl(value: string | null | undefined): string {
  if (!value) return ""
  try {
    const u = new URL(value.startsWith("http") ? value : `https://${value}`)
    return `${u.hostname.replace(/^www\./, "")}${u.pathname.replace(/\/$/, "")}`.toLowerCase()
  } catch {
    return normalizeWhitespace(value.replace(/^https?:\/\//, "").replace(/\/$/, ""))
  }
}

export function compareCanonicalToScraped(
  business: Pick<
    BusinessRow,
    | "name"
    | "address_line1"
    | "address_line2"
    | "city"
    | "state"
    | "zip"
    | "country"
    | "phone"
    | "email"
    | "website"
  >,
  scraped: ScrapedNapFields
): { napMatch: boolean; discrepancies: SynclocalDiscrepancyField } {
  const checks: Array<{
    key: string
    canonical: string | null
    scraped: string | null
    match: boolean
  }> = [
    {
      key: "name",
      canonical: business.name,
      scraped: scraped.name ?? null,
      match: normalizeWhitespace(business.name) === normalizeWhitespace(scraped.name ?? ""),
    },
    {
      key: "address_line1",
      canonical: business.address_line1,
      scraped: scraped.address_line1 ?? null,
      match:
        normalizeWhitespace(business.address_line1) === normalizeWhitespace(scraped.address_line1 ?? ""),
    },
    {
      key: "address_line2",
      canonical: business.address_line2,
      scraped: scraped.address_line2 ?? null,
      match:
        normalizeWhitespace(business.address_line2) === normalizeWhitespace(scraped.address_line2 ?? ""),
    },
    {
      key: "city",
      canonical: business.city,
      scraped: scraped.city ?? null,
      match: normalizeWhitespace(business.city) === normalizeWhitespace(scraped.city ?? ""),
    },
    {
      key: "state",
      canonical: business.state,
      scraped: scraped.state ?? null,
      match: normalizeWhitespace(business.state) === normalizeWhitespace(scraped.state ?? ""),
    },
    {
      key: "zip",
      canonical: business.zip,
      scraped: scraped.zip ?? null,
      match: normalizeWhitespace(business.zip).replace(/\s/g, "") === normalizeWhitespace(scraped.zip ?? "").replace(/\s/g, ""),
    },
    {
      key: "country",
      canonical: business.country,
      scraped: scraped.country ?? null,
      match: normalizeWhitespace(business.country) === normalizeWhitespace(scraped.country ?? ""),
    },
    {
      key: "phone",
      canonical: business.phone,
      scraped: scraped.phone ?? null,
      match: normalizePhone(business.phone) === normalizePhone(scraped.phone ?? ""),
    },
    {
      key: "email",
      canonical: business.email,
      scraped: scraped.email ?? null,
      match: normalizeWhitespace(business.email) === normalizeWhitespace(scraped.email ?? ""),
    },
    {
      key: "website",
      canonical: business.website,
      scraped: scraped.website ?? null,
      match: normalizeUrl(business.website) === normalizeUrl(scraped.website ?? ""),
    },
  ]

  const discrepancies: SynclocalDiscrepancyField = {}
  for (const row of checks) {
    if (!row.scraped) continue
    discrepancies[row.key] = {
      canonical: row.canonical,
      scraped: row.scraped,
      match: row.match,
    }
  }

  const comparedKeys = Object.keys(discrepancies)
  const napMatch =
    comparedKeys.length === 0 ? true : comparedKeys.every((k) => discrepancies[k]?.match)

  return { napMatch, discrepancies }
}
