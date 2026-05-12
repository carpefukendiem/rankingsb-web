import { NextResponse, type NextRequest } from "next/server"

import { resolveSynclocalRequestAuth, synclocalJsonError } from "@/lib/synclocal/api-auth"
import { PatchListingBodySchema } from "@/lib/synclocal/schema"
import type { BusinessRow } from "@/lib/synclocal/types"
import type { ListingRow } from "@/lib/synclocal/types"
import type { VerificationRunRow } from "@/lib/synclocal/types"

export const runtime = "nodejs"

function unwrapJoin(v: unknown): unknown {
  if (Array.isArray(v)) return v[0] ?? null
  return v ?? null
}

async function authorizeListing(access: Exclude<Awaited<ReturnType<typeof resolveSynclocalRequestAuth>>, null>, listing_id: string) {
  const { data: row, error } = await access.supabase
    .from("listings")
    .select("*, directory:directories(*), business:businesses(*)")
    .eq("id", listing_id)
    .single()

  if (error || !row) return null

  const biz = unwrapJoin((row as { business?: unknown }).business) as BusinessRow | null
  if (!biz || !access.agencyIds.includes(biz.agency_id)) return null
  return row
}

export async function GET(_req: NextRequest, ctx: { params: Promise<{ listing_id: string }> }) {
  const auth = await resolveSynclocalRequestAuth()
  if (!auth) return synclocalJsonError("Unauthorized", 401)

  const { listing_id } = await ctx.params
  const listing = await authorizeListing(auth, listing_id)

  if (!listing) return synclocalJsonError("Not found", 404)

  const { data: runs, error: rErr } = await auth.supabase
    .from("verification_runs")
    .select("*")
    .eq("listing_id", listing_id)
    .order("run_at", { ascending: false })

  if (rErr) console.error("[synclocal:listings] runs load", rErr.message)

  return NextResponse.json({
    success: true,
    listing,
    verification_runs: (runs ?? []) as VerificationRunRow[],
  })
}

export async function PATCH(req: NextRequest, ctx: { params: Promise<{ listing_id: string }> }) {
  const auth = await resolveSynclocalRequestAuth()
  if (!auth) return synclocalJsonError("Unauthorized", 401)

  const { listing_id } = await ctx.params
  const listing = await authorizeListing(auth, listing_id)
  if (!listing) return synclocalJsonError("Not found", 404)

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return synclocalJsonError("Invalid JSON body", 400)
  }

  const parsed = PatchListingBodySchema.safeParse(body)
  if (!parsed.success) return synclocalJsonError("Invalid payload", 400)

  const updates: Partial<ListingRow> = {}

  if (parsed.data.notes !== undefined) updates.notes = parsed.data.notes
  if (parsed.data.status !== undefined) updates.status = parsed.data.status
  if (parsed.data.external_listing_id !== undefined) updates.external_listing_id = parsed.data.external_listing_id
  if (parsed.data.listing_url !== undefined) {
    updates.listing_url = parsed.data.listing_url === "" ? null : parsed.data.listing_url
  }

  if (Object.keys(updates).length === 0) return synclocalJsonError("No fields supplied", 400)

  updates.last_updated_at = new Date().toISOString()

  const { error: upErr } = await auth.supabase.from("listings").update(updates).eq("id", listing_id)
  if (upErr) {
    console.error(upErr.message)
    return NextResponse.json({ success: false, degraded: true })
  }

  return NextResponse.json({ success: true })
}
