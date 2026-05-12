import { NextResponse, type NextRequest } from "next/server"

import { resolveSynclocalRequestAuth, synclocalJsonError } from "@/lib/synclocal/api-auth"
import { fetchListingHtml, verifyBusinessAgainstHtml } from "@/lib/synclocal/run-verification"
import type { BusinessRow } from "@/lib/synclocal/types"
import type { ListingRow } from "@/lib/synclocal/types"

export const runtime = "nodejs"

function unwrapJoin(v: unknown): unknown {
  if (Array.isArray(v)) return v[0] ?? null
  return v ?? null
}

export async function POST(_req: NextRequest, ctx: { params: Promise<{ listing_id: string }> }) {
  const auth = await resolveSynclocalRequestAuth()
  if (!auth) return synclocalJsonError("Unauthorized", 401)

  const { listing_id } = await ctx.params

  const { data: row, error } = await auth.supabase
    .from("listings")
    .select("*, business:businesses(*)")
    .eq("id", listing_id)
    .single()

  if (error || !row) return synclocalJsonError("Not found", 404)

  const business = unwrapJoin((row as { business?: unknown }).business) as BusinessRow | null
  const listing = row as ListingRow

  if (!business || !auth.agencyIds.includes(business.agency_id)) return synclocalJsonError("Forbidden", 403)
  if (!listing.listing_url) return synclocalJsonError("Listing URL missing — drop a live listing link first.", 400)

  const fetched = await fetchListingHtml(listing.listing_url)
  const nowIso = new Date().toISOString()

  if (!fetched.ok) {
    await auth.supabase.from("verification_runs").insert({
      listing_id: listing.id,
      nap_match: false,
      discrepancies: {},
      error: fetched.error,
    })
    await auth.supabase.from("listings").update({ last_verified_at: nowIso }).eq("id", listing.id)
    return NextResponse.json({ success: false, degraded: true, fetchError: fetched.error })
  }

  const verdict = verifyBusinessAgainstHtml(business, fetched.html)
  const napMatches = verdict.nap_match && !verdict.error

  await auth.supabase.from("verification_runs").insert({
    listing_id: listing.id,
    nap_match: napMatches,
    discrepancies: verdict.discrepancies,
    scraped_data: verdict.scraped_data,
    error: verdict.error,
  })

  await auth.supabase
    .from("listings")
    .update({
      status: napMatches ? listing.status : "discrepancy",
      last_verified_at: nowIso,
      last_updated_at: nowIso,
    })
    .eq("id", listing.id)

  return NextResponse.json({
    success: true,
    nap_match: napMatches,
    discrepancies: verdict.discrepancies,
    scraped_error: verdict.error,
  })
}
