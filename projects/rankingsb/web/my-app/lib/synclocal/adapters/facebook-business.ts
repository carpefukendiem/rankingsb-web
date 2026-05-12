import type { SynclocalAdapterContext, SynclocalDirectoryAdapter, SynclocalSubmitResult } from "../adapter-contract"

/**
 * Pushes editable page fields via Graph API. Requires a PAGE access token plus page ID.
 *
 * FACEBOOK_GRAPH_API_TOKEN — PAGE-scoped Graph token with pages_manage_posts / manage_page as needed.
 * FACEBOOK_BUSINESS_PAGE_ID — Numeric page id backing the storefront.
 */
export const facebookBusinessAdapter: SynclocalDirectoryAdapter = {
  async submit(ctx: SynclocalAdapterContext): Promise<SynclocalSubmitResult> {
    return facebookBusinessAdapter.update(ctx)
  },

  async update(ctx: SynclocalAdapterContext): Promise<SynclocalSubmitResult> {
    try {
      const token = process.env.FACEBOOK_GRAPH_API_TOKEN
      const pageId = process.env.FACEBOOK_BUSINESS_PAGE_ID
      if (!token || !pageId) {
        return {
          ok: false,
          degraded: true,
          error: "[synclocal] Missing FACEBOOK_GRAPH_API_TOKEN or FACEBOOK_BUSINESS_PAGE_ID",
        }
      }

      const b = ctx.business
      const params = new URLSearchParams({
        access_token: token,
        ...(b.website ? { website: b.website } : {}),
        ...(b.phone ? { phone: b.phone } : {}),
        ...(b.description_short ? { about: b.description_short.slice(0, 255) } : {}),
        ...(b.city && b.country ? { location: `${b.city}, ${b.state}` } : {}),
      })

      const res = await fetch(`https://graph.facebook.com/v21.0/${pageId}?${params.toString()}`, {
        method: "POST",
      })

      const data = (await res.json()) as Record<string, unknown>
      if (!res.ok || data.error) {
        console.error("[synclocal] Facebook Graph error:", data)
        const err =
          typeof (data.error as Record<string, unknown> | undefined)?.message === "string"
            ? String((data.error as { message: string }).message)
            : `HTTP ${res.status}`
        return { ok: false, degraded: true, error: err }
      }

      return {
        ok: true,
        externalListingId: pageId,
        listingUrl: `https://www.facebook.com/${pageId}`,
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e)
      return { ok: false, degraded: true, error: msg }
    }
  },
}
