import { NextResponse, type NextRequest } from "next/server"
import { z } from "zod"

import { resolveSynclocalRequestAuth, synclocalJsonError } from "@/lib/synclocal/api-auth"
import type { BusinessRow, ListingRow } from "@/lib/synclocal/types"

export const runtime = "nodejs"

const ManualStatusBodySchema = z.object({
  status: z.enum(["submitted", "live", "not_submitted"]),
  listing_url: z.union([z.string().url(), z.literal(""), z.null()]).optional(),
})

function unwrapJoin(v: unknown): unknown {
  if (Array.isArray(v)) return v[0] ?? null
  return v ?? null
}

function normalizeListingUrl(value: z.infer<typeof ManualStatusBodySchema>["listing_url"]) {
  if (value === undefined) return undefined
  return value === "" ? null : value
}

export async function PATCH(req: NextRequest, ctx: { params: Promise<{ listing_id: string }> }) {
  try {
    const auth = await resolveSynclocalRequestAuth()
    if (!auth) return synclocalJsonError("Unauthorized", 401)

    const { listing_id } = await ctx.params

    let body: unknown
    try {
      body = await req.json()
    } catch {
      return synclocalJsonError("Invalid JSON body", 400)
    }

    const parsed = ManualStatusBodySchema.safeParse(body)
    if (!parsed.success) {
      return synclocalJsonError("Invalid manual status payload", 400)
    }

    const { data: row, error: loadErr } = await auth.supabase
      .from("listings")
      .select("*, business:businesses(*)")
      .eq("id", listing_id)
      .maybeSingle()

    if (loadErr) {
      console.error("[synclocal-manual-status] load listing", loadErr.message)
      return synclocalJsonError("Could not load listing", 500)
    }

    if (!row) return synclocalJsonError("Forbidden", 403)

    const business = unwrapJoin((row as { business?: unknown }).business) as BusinessRow | null
    const listing = row as ListingRow

    if (!business || !auth.agencyIds.includes(business.agency_id)) {
      return synclocalJsonError("Forbidden", 403)
    }

    const nowIso = new Date().toISOString()
    const suppliedUrl = normalizeListingUrl(parsed.data.listing_url)
    const updates: Partial<ListingRow> = {
      status: parsed.data.status,
      last_updated_at: nowIso,
    }

    if (parsed.data.status === "submitted") {
      updates.last_submitted_at = nowIso
      if (suppliedUrl !== undefined) updates.listing_url = suppliedUrl
    }

    if (parsed.data.status === "live") {
      updates.last_submitted_at = listing.last_submitted_at ?? nowIso
      updates.last_verified_at = nowIso
      if (suppliedUrl !== undefined) updates.listing_url = suppliedUrl
    }

    if (parsed.data.status === "not_submitted") {
      updates.listing_url = null
      updates.last_submitted_at = null
      updates.last_verified_at = null
    }

    const { data: updated, error: updateErr } = await auth.supabase
      .from("listings")
      .update(updates)
      .eq("id", listing.id)
      .select("*")
      .maybeSingle()

    if (updateErr) {
      console.error("[synclocal-manual-status] update listing", updateErr.message)
      return synclocalJsonError("Could not update listing", 500)
    }

    if (!updated) return synclocalJsonError("Forbidden", 403)

    return NextResponse.json({ success: true, listing: updated as ListingRow })
  } catch (err) {
    console.error("[synclocal-manual-status] unexpected", err)
    return synclocalJsonError("Unexpected manual status error", 500)
  }
}
