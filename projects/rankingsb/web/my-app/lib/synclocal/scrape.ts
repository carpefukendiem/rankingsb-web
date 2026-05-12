import type { ScrapedNapFields } from "./verification"

function stripNoise(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ")
}

function firstMatch(text: string, re: RegExp): string | null {
  const m = text.match(re)
  return m?.[1]?.trim() || null
}

function collectTelLinks(html: string): string[] {
  const out: string[] = []
  const re = /href\s*=\s*["']tel:([^"']+)["']/gi
  let m: RegExpExecArray | null
  while ((m = re.exec(html)) !== null) {
    out.push(decodeURIComponent(m[1].replace(/\s/g, "")))
  }
  return out
}

function collectMailto(html: string): string[] {
  const out: string[] = []
  const re = /href\s*=\s*["']mailto:([^"']+)["']/gi
  let m: RegExpExecArray | null
  while ((m = re.exec(html)) !== null) {
    out.push(decodeURIComponent(m[1].split("?")[0] ?? ""))
  }
  return out
}

function parseJsonLdBlocks(html: string): unknown[] {
  const out: unknown[] = []
  const re = /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi
  let m: RegExpExecArray | null
  while ((m = re.exec(html)) !== null) {
    try {
      out.push(JSON.parse(m[1].trim()))
    } catch {
      /* ignore */
    }
  }
  return out
}

function extractFromJsonLd(blocks: unknown[]): ScrapedNapFields {
  const fields: ScrapedNapFields = {}
  const visit = (node: unknown) => {
    if (!node || typeof node !== "object") return
    if (Array.isArray(node)) {
      node.forEach(visit)
      return
    }
    const o = node as Record<string, unknown>
    const t = o["@type"]
    const types = Array.isArray(t) ? t : t ? [t] : []
    const hasSignals = Boolean(o.address || o.telephone || o.email || o.name)
    const isLocal =
      hasSignals ||
      types.some((x) => typeof x === "string" && /LocalBusiness|Organization|Store|Place/i.test(String(x)))
    if (!isLocal) return
    if (typeof o.name === "string" && !fields.name) fields.name = o.name
    if (typeof o.telephone === "string" && !fields.phone) fields.phone = o.telephone
    if (typeof o.email === "string" && !fields.email) fields.email = o.email
    if (typeof o.url === "string" && !fields.website) fields.website = o.url
    const addr = o.address
    if (addr && typeof addr === "object" && !Array.isArray(addr)) {
      const a = addr as Record<string, unknown>
      if (typeof a.streetAddress === "string" && !fields.address_line1) fields.address_line1 = a.streetAddress
      if (typeof a.addressLocality === "string" && !fields.city) fields.city = a.addressLocality
      if (typeof a.addressRegion === "string" && !fields.state) fields.state = a.addressRegion
      if (typeof a.postalCode === "string" && !fields.zip) fields.zip = a.postalCode
      if (typeof a.addressCountry === "string" && !fields.country) fields.country = a.addressCountry
    }
    if ("@graph" in o && Array.isArray(o["@graph"])) {
      visit(o["@graph"])
    }
  }
  blocks.forEach(visit)
  return fields
}

/**
 * Best-effort NAP extraction from raw HTML (fetch + regex / JSON-LD).
 * Tuned for directory pages that expose tel:/mailto: and schema.org blocks.
 */
export function extractNapFromHtml(html: string): ScrapedNapFields {
  const cleaned = stripNoise(html)
  const text = cleaned.replace(/<[^>]+>/g, " ")

  const jsonLd = parseJsonLdBlocks(cleaned)
  const fromLd = extractFromJsonLd(jsonLd)

  const tels = collectTelLinks(cleaned)
  const mails = collectMailto(cleaned)

  const phone =
    fromLd.phone || tels[0] || firstMatch(text, /\b(\+?1[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4})\b/)
  const email = fromLd.email || mails[0] || firstMatch(text, /\b([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,})\b/i)

  const zip = fromLd.zip || firstMatch(text, /\b(\d{5}(?:-\d{4})?)\b/)
  const state = fromLd.state || firstMatch(text, /\b([A-Z]{2})\s+\d{5}\b/i)
  const city = fromLd.city || firstMatch(text, /\b(Santa Barbara|Ventura|Oxnard|Goleta|Carpinteria)\b/i)

  const website = fromLd.website || firstMatch(cleaned, /href\s*=\s*["'](https?:\/\/[^"']+)["']/i)

  return {
    name:
      fromLd.name ||
      firstMatch(text, /(?:^|\n)\s*([A-Za-z0-9][A-Za-z0-9 &'.-]{2,80})\s*(?:\||\n)/),
    address_line1: fromLd.address_line1,
    address_line2: fromLd.address_line2,
    city,
    state,
    zip,
    country: fromLd.country,
    phone,
    email,
    website,
  }
}
