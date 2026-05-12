import type { SynclocalAdapterContext, SynclocalDirectoryAdapter, SynclocalSubmitResult } from "../adapter-contract"

/**
 * Bing Places does not expose a single public JSON API for unmanaged keys.
 * v1 submits the canonical SyncLocal snapshot to Microsoft's documented verification endpoint shape.
 * Replace the URL + payload mapping once final credentials are settled.
 *
 * Env: BING_PLACES_API_KEY (used as OData-Key header in many Microsoft listings APIs — confirm for your SKU).
 */
export const bingPlacesAdapter: SynclocalDirectoryAdapter = {
  async submit(ctx: SynclocalAdapterContext): Promise<SynclocalSubmitResult> {
    return bingPlacesAdapter.update(ctx)
  },

  async update(ctx: SynclocalAdapterContext): Promise<SynclocalSubmitResult> {
    try {
      const key = process.env.BING_PLACES_API_KEY
      if (!key) {
        return { ok: false, degraded: true, error: "[synclocal] Missing BING_PLACES_API_KEY" }
      }

      const endpoint =
        process.env.BING_PLACES_API_ENDPOINT ??
        "https://www.bingplaces.com/api/v1/businesses/synclocal-upsert-placeholder"

      const b = ctx.business
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${key}`,
        },
        body: JSON.stringify({
          Source: "SyncLocal",
          BusinessName: b.name,
          AddressLine1: b.address_line1,
          AddressLine2: b.address_line2,
          City: b.city,
          StateProvince: b.state,
          PostalCode: b.zip,
          Country: b.country,
          PhonePrimary: b.phone,
          WebsiteUrl: b.website,
          EmailPrimary: b.email,
        }),
      })

      const text = await res.text()
      if (!res.ok) {
        console.warn("[synclocal] Bing Places ping failed:", res.status, text.slice(0, 400))
        return {
          ok: false,
          degraded: true,
          error: `Bing Places HTTP ${res.status} — adjust BING_PLACES_API_ENDPOINT once your Microsoft listing SKU is finalized.`,
        }
      }

      let data: Record<string, unknown>
      try {
        data = JSON.parse(text) as Record<string, unknown>
      } catch {
        data = {}
      }

      const listingUrl =
        typeof data.ListingUrl === "string"
          ? data.ListingUrl
          : typeof data.placeUrl === "string"
            ? String(data.placeUrl)
            : ctx.listing.listing_url || "https://www.bingplaces.com/"

      return {
        ok: true,
        externalListingId:
          typeof data.Id === "string" ? String(data.Id) : typeof data.id === "string" ? String(data.id) : undefined,
        listingUrl,
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e)
      return { ok: false, degraded: true, error: msg }
    }
  },
}
