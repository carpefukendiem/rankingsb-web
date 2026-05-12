import { NextResponse, type NextRequest } from "next/server"

import { resolveSynclocalRequestAuth, synclocalJsonError } from "@/lib/synclocal/api-auth"
import { SubmitSynclocalBodySchema } from "@/lib/synclocal/schema"
import { getSynclocalAdapter } from "@/lib/synclocal/adapters/registry"
import type { BusinessRow } from "@/lib/synclocal/types"
import type { ListingRow } from "@/lib/synclocal/types"
import type { DirectoryRow } from "@/lib/synclocal/types"

export const runtime = "nodejs"

export async function POST(req: NextRequest, ctx: { params: Promise<{ directory_slug: string }> }) {
  const auth = await resolveSynclocalRequestAuth()
  if (!auth) return synclocalJsonError("Unauthorized", 401)

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return synclocalJsonError("Invalid JSON body", 400)
  }

  const parsed = SubmitSynclocalBodySchema.safeParse(body)
  if (!parsed.success) return synclocalJsonError("Invalid payload", 400)

  const { directory_slug } = await ctx.params
  const slugFromPath = decodeURIComponent(directory_slug)

  const {
    data: row,
    error: loadErr,
  } = await auth.supabase
    .from("listings")
    .select("*, directory:directories(*), business:businesses(*)")
    .eq("id", parsed.data.listingId)
    .single()

  if (loadErr || !row) {
    console.error("[synclocal:submit] load listing", loadErr?.message)
    return NextResponse.json({ success: false, degraded: true })
  }

  const directoryObj = Array.isArray((row as { directory?: unknown }).directory)
    ? ((row as { directory: unknown[] }).directory[0] as unknown)
    : ((row as { directory?: unknown }).directory as unknown)

  const businessObj = Array.isArray((row as { business?: unknown }).business)
    ? ((row as { business: unknown[] }).business[0] as unknown)
    : ((row as { business?: unknown }).business as unknown)

  const listing = row as ListingRow & { directory?: unknown; business?: unknown }
  const directory = directoryObj as DirectoryRow
  const business = businessObj as BusinessRow

  if (!directory || !business) return NextResponse.json({ success: false, degraded: true })
  if (directory.slug !== slugFromPath) {
    return synclocalJsonError("Directory slug mismatch for listing", 409)
  }
  if (!auth.agencyIds.includes(business.agency_id)) {
    return synclocalJsonError("Forbidden", 403)
  }

  const jobType = parsed.data.jobType
  const nowIso = new Date().toISOString()

  const { data: jobRow, error: jobErr } = await auth.supabase
    .from("submission_jobs")
    .insert({
      listing_id: listing.id,
      job_type: jobType,
      status: "running",
      started_at: nowIso,
      payload: { directory_slug: slugFromPath, requestedBy: auth.user.email },
    })
    .select("id")
    .single()

  if (jobErr || !jobRow) {
    console.error("[synclocal:submit] job insert", jobErr?.message)
    return NextResponse.json({ success: false, degraded: true })
  }

  const jobId = jobRow.id as string

  try {
    const adapter = getSynclocalAdapter(directory)
    const result =
      jobType === "update" ? await adapter.update({ business, listing, directory }) : await adapter.submit({ business, listing, directory })

    if ("manualRequired" in result && result.manualRequired && result.submissionUrl) {
      const completeIso = new Date().toISOString()
      await auth.supabase.from("submission_jobs").update({
        status: "succeeded",
        completed_at: completeIso,
        payload: {
          manualSubmissionRequired: true,
          submissionUrl: result.submissionUrl,
          message: result.message,
        },
      }).eq("id", jobId)

      await auth.supabase
        .from("listings")
        .update({
          status: "pending",
          last_submitted_at: completeIso,
          notes:
            `${listing.notes ? `${listing.notes}\n` : ""}SyncLocal: manual submission required — ${result.submissionUrl}`,
        })
        .eq("id", listing.id)

      return NextResponse.json({
        success: true,
        manual: true,
        submissionUrl: result.submissionUrl,
        message: result.message,
      })
    }

    if (!result.ok) {
      const completeIso = new Date().toISOString()
      await auth.supabase.from("submission_jobs").update({
        status: result.scaffold || result.degraded ? "failed" : "failed",
        completed_at: completeIso,
        error_log: result.error ?? "Unknown adapter error",
        payload: result.scaffold ? { scaffold: true } : { degraded: true },
      }).eq("id", jobId)

      if (result.scaffold || result.degraded) {
        return NextResponse.json({
          success: false,
          degraded: true,
          scaffold: result.scaffold ?? false,
          error: result.error,
        })
      }

      console.error("[synclocal:submit]", result.error)
      return NextResponse.json({ success: false, degraded: true })
    }

    const completeIso = new Date().toISOString()

    await auth.supabase.from("submission_jobs").update({
      status: "succeeded",
      completed_at: completeIso,
      payload: result,
    }).eq("id", jobId)

    await auth.supabase
      .from("listings")
      .update({
        status: result.listingUrl ? "live" : "submitted",
        listing_url: result.listingUrl ?? listing.listing_url,
        external_listing_id: result.externalListingId ?? listing.external_listing_id,
        last_submitted_at: completeIso,
        last_updated_at: completeIso,
      })
      .eq("id", listing.id)

    return NextResponse.json({ success: true, result })
  } catch (err) {
    console.error("[synclocal:submit:fatal]", err)
    await auth.supabase
      .from("submission_jobs")
      .update({
        status: "failed",
        completed_at: new Date().toISOString(),
        error_log: err instanceof Error ? err.message : String(err),
      })
      .eq("id", jobId)
    return NextResponse.json({ success: false, degraded: true })
  }
}
