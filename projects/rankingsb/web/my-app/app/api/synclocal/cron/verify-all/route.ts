import { NextResponse, type NextRequest } from "next/server"

import { sendSynclocalVerificationSummary } from "@/lib/synclocal/email"
import { fetchListingHtml, verifyBusinessAgainstHtml } from "@/lib/synclocal/run-verification"
import { createSynclocalServiceRole } from "@/lib/synclocal/service-role"
import type { BusinessRow } from "@/lib/synclocal/types"
import type { ListingRow } from "@/lib/synclocal/types"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

function unwrapJoin(v: unknown): unknown {
  if (Array.isArray(v)) return v[0] ?? null
  return v ?? null
}

export async function GET(req: NextRequest) {
  const bearer = req.headers.get("authorization")
  const secret = process.env.SYNCLocal_CRON_VERIFY_SECRET || process.env.CRON_SECRET
  if (!secret || bearer !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const svc = createSynclocalServiceRole()

    const { data: listings, error } = await svc
      .from("listings")
      .select("*, directory:directories(*), business:businesses(*)")
      .eq("status", "live")
      .not("listing_url", "is", null)

    if (error) {
      console.error("[synclocal:cron]", error.message)
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
    }

    type Row = ListingRow & { business?: unknown; directory?: unknown }
    const rows = (listings ?? []) as Row[]
    const byAgency = new Map<string, Row[]>()

    for (const row of rows) {
      const business = unwrapJoin(row.business) as BusinessRow | null
      if (!business?.agency_id) continue
      const arr = byAgency.get(business.agency_id) ?? []
      arr.push(row)
      byAgency.set(business.agency_id, arr)
    }

    let processed = 0
    let problems = 0
    const digest: string[] = []

    for (const [agencyId, agencyListings] of byAgency) {
      const { data: batchRow, error: batchErr } = await svc
        .from("synclocal_cron_batches")
        .insert({
          agency_id: agencyId,
          listings_checked: 0,
          discrepancy_count: 0,
        })
        .select("id")
        .single()

      if (batchErr || !batchRow) {
        console.error("[synclocal:cron] batch insert", batchErr?.message)
        continue
      }

      let discrepancyCount = 0
      const batchId = batchRow.id as string

      for (const listing of agencyListings) {
        const business = unwrapJoin(listing.business) as BusinessRow | null
        if (!business?.agency_id || !listing.listing_url) continue

        const directory = unwrapJoin(listing.directory) as { name?: string; slug?: string } | null

        processed += 1
        const fetched = await fetchListingHtml(listing.listing_url)

        const nowIso = new Date().toISOString()

        if (!fetched.ok) {
          await svc.from("verification_runs").insert({
            listing_id: listing.id,
            batch_id: batchId,
            nap_match: false,
            discrepancies: {},
            error: fetched.error,
          })
          await svc.from("listings").update({ last_verified_at: nowIso }).eq("id", listing.id)

          discrepancyCount += 1
          problems += 1
          digest.push(
            `Listing ${listing.id} (${directory?.slug ?? "unknown"}) — fetch failed (${fetched.error})`
          )
          continue
        }

        const verdict = verifyBusinessAgainstHtml(business, fetched.html)
        const napMatches = verdict.nap_match && !verdict.error

        await svc.from("verification_runs").insert({
          listing_id: listing.id,
          batch_id: batchId,
          nap_match: napMatches,
          discrepancies: verdict.discrepancies,
          scraped_data: verdict.scraped_data,
          error: verdict.error,
        })

        await svc
          .from("listings")
          .update({
            status: napMatches ? listing.status : "discrepancy",
            last_verified_at: nowIso,
            last_updated_at: nowIso,
          })
          .eq("id", listing.id)

        if (!napMatches || verdict.error) {
          discrepancyCount += 1
          problems += 1
          const dirLabel = directory?.slug ?? directory?.name ?? listing.id
          const badFields = Object.entries(verdict.discrepancies)
            .filter(([, value]) => value && !(value as { match?: boolean }).match)
            .map(([key]) => key)
          digest.push(`${dirLabel} — ${verdict.error ?? "NAP mismatch"} (${badFields.join(", ")})`)
        }
      }

      await svc
        .from("synclocal_cron_batches")
        .update({
          listings_checked: agencyListings.length,
          discrepancy_count: discrepancyCount,
        })
        .eq("id", batchId)
    }

    await sendSynclocalVerificationSummary(
      `SyncLocal monthly verification (${problems} issues / ${processed} listings)`,
      digest.length ? digest.join("\n") : `All ${processed} live listings verified clean — no discrepancy flags triggered.`
    )

    return NextResponse.json({
      ok: true,
      agencies: byAgency.size,
      processed,
      problems,
    })
  } catch (e) {
    console.error("[synclocal:cron:fatal]", e)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
