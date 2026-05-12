import type { SynclocalAdapterContext, SynclocalDirectoryAdapter, SynclocalSubmitResult } from "../adapter-contract"

async function refreshGoogleAccessToken(): Promise<string> {
  const clientId = process.env.GOOGLE_BUSINESS_PROFILE_CLIENT_ID
  const clientSecret = process.env.GOOGLE_BUSINESS_PROFILE_CLIENT_SECRET
  const refreshToken = process.env.GOOGLE_BUSINESS_PROFILE_REFRESH_TOKEN

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error(
      "[synclocal] Missing GOOGLE_BUSINESS_PROFILE_CLIENT_ID / CLIENT_SECRET / REFRESH_TOKEN"
    )
  }

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    }),
  })

  const data = (await res.json()) as Record<string, unknown>
  const accessToken = data.access_token
  if (!res.ok || typeof accessToken !== "string") {
    throw new Error(`[synclocal] Google OAuth token refresh failed (${res.status}): ${JSON.stringify(data)}`)
  }
  return accessToken
}

function gbpPayloadFromBusiness(ctx: SynclocalAdapterContext) {
  const b = ctx.business
  const lines: string[] = []
  if (b.address_line1) lines.push(b.address_line1)
  if (b.address_line2) lines.push(b.address_line2)

  const meta: Record<string, unknown> = {}
  meta.description = (b.description_long || b.description_short || "").slice(0, 750)

  const body: Record<string, unknown> = {
    title: b.name,
    websiteUri: b.website ?? undefined,
    profile: meta,
    phoneNumbers: b.phone ? { primaryPhone: b.phone } : undefined,
    storefrontAddress: {
      regionCode: b.country || "US",
      postalCode: b.zip ?? undefined,
      administrativeArea: b.state ?? undefined,
      locality: b.city ?? undefined,
      addressLines: lines.length ? lines : undefined,
    },
  }
  Object.keys(body).forEach((k) => {
    const v = body[k]
    if (v === undefined) delete body[k]
  })
  const address = body.storefrontAddress as Record<string, unknown>
  Object.keys(address).forEach((k) => {
    if (address[k] === undefined) delete address[k]
  })
  if (Object.keys(address).length === 0) delete body.storefrontAddress
  return body
}

export const googleBusinessProfileAdapter: SynclocalDirectoryAdapter = {
  async submit(ctx: SynclocalAdapterContext): Promise<SynclocalSubmitResult> {
    return googleBusinessProfileAdapter.update(ctx)
  },

  async update(ctx: SynclocalAdapterContext): Promise<SynclocalSubmitResult> {
    try {
      const resource = process.env.GOOGLE_BUSINESS_PROFILE_LOCATION_RESOURCE
      if (!resource) {
        return {
          ok: false,
          degraded: true,
          error:
            "[synclocal] Set GOOGLE_BUSINESS_PROFILE_LOCATION_RESOURCE to accounts/*/locations/* for your verified profile.",
        }
      }

      const accessToken = await refreshGoogleAccessToken()
      const updateMask =
        "title,websiteUri,profile,phoneNumbers.primaryPhone,storefrontAddress"

      const res = await fetch(
        `https://mybusinessbusinessinformation.googleapis.com/v1/${resource}?updateMask=${encodeURIComponent(updateMask)}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(gbpPayloadFromBusiness(ctx)),
        }
      )

      const text = await res.text()
      if (!res.ok) {
        console.error("[synclocal] GBP update failed:", res.status, text.slice(0, 500))
        return { ok: false, degraded: true, error: `Google Business Profile API ${res.status}` }
      }

      let data: Record<string, unknown> = {}
      try {
        data = JSON.parse(text) as Record<string, unknown>
      } catch {
        /* non-json */
      }

      const name = typeof data.name === "string" ? data.name : resource
      const listingUrl =
        typeof (data.metadata as Record<string, unknown> | undefined)?.mapsUri === "string"
          ? String((data.metadata as { mapsUri: string }).mapsUri)
          : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ctx.business.name)}`

      return {
        ok: true,
        externalListingId: name,
        listingUrl,
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e)
      console.error("[synclocal] GBP adapter:", msg)
      return { ok: false, degraded: true, error: msg }
    }
  },
}
