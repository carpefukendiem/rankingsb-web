import { extractNapFromHtml } from "./scrape"
import { compareCanonicalToScraped } from "./verification"
import type { BusinessRow } from "./types"

const UA =
  "Mozilla/5.0 (compatible; SyncLocal/1.0; +https://rankingsb.com) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36"

export type VerifyFetchResult =
  | { ok: true; html: string }
  | { ok: false; error: string }

export async function fetchListingHtml(
  listingUrl: string,
  fetchImpl: typeof fetch = fetch
): Promise<VerifyFetchResult> {
  try {
    const res = await fetchImpl(listingUrl, {
      redirect: "follow",
      headers: {
        "User-Agent": UA,
        Accept: "text/html,application/xhtml+xml",
      },
    })
    if (!res.ok) {
      return { ok: false, error: `HTTP ${res.status}` }
    }
    const html = await res.text()
    if (!html || html.length < 200) {
      return { ok: false, error: "Listing page response too small to scrape." }
    }
    return { ok: true, html }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) }
  }
}

export function hasMeaningfulScrape(scraped: ReturnType<typeof extractNapFromHtml>): boolean {
  return Boolean(
    scraped.phone ||
      scraped.email ||
      scraped.address_line1 ||
      scraped.name ||
      scraped.zip ||
      scraped.website
  )
}

export function verifyBusinessAgainstHtml(business: BusinessRow, html: string) {
  const scraped = extractNapFromHtml(html)
  if (!hasMeaningfulScrape(scraped)) {
    return {
      nap_match: false,
      discrepancies: {} as Record<string, { canonical: string | null; scraped: string | null; match: boolean }>,
      scraped_data: scraped as Record<string, unknown>,
      error: "Insufficient data extracted from listing page — refine regex selectors or crawl path.",
    }
  }

  const { napMatch, discrepancies } = compareCanonicalToScraped(business, scraped)
  return {
    nap_match: napMatch,
    discrepancies,
    scraped_data: scraped as Record<string, unknown>,
    error: null as string | null,
  }
}
