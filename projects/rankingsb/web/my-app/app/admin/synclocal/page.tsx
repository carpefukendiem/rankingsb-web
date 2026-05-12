import type { Metadata } from "next"

import { createServerSupabase } from "@/lib/supabase/server"
import type { BusinessRow } from "@/lib/synclocal/types"
import type { DirectoryRow } from "@/lib/synclocal/types"
import type { ListingRow } from "@/lib/synclocal/types"

import { SynclocalDashboard } from "./synclocal-dashboard"

export const metadata: Metadata = {
  title: "SyncLocal",
  robots: { index: false, follow: false },
}

type SynclocalMatrixRow = {
  listing: ListingRow
  directory: DirectoryRow
}

export default async function SynclocalAdminPage({
  searchParams,
}: Readonly<{
  searchParams: Promise<{ biz?: string }>
}>) {
  const sp = await searchParams
  const supabase = await createServerSupabase()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  const { data: memberships } = await supabase.from("agency_members").select("agency_id").eq("user_id", user.id)
  const agencyIds = [...new Set((memberships ?? []).map((m) => m.agency_id))]

  if (!agencyIds.length) {
    return (
      <SynclocalDashboard
        businesses={[]}
        initialRows={[]}
        defaultBusinessId={null}
        lastBatchIso={null}
      />
    )
  }

  const { data: businessRows } = await supabase
    .from("businesses")
    .select("*")
    .in("agency_id", agencyIds)
    .order("name", { ascending: true })

  const businesses = ((businessRows ?? []) as unknown as BusinessRow[]).slice()

  const preferredId = sp.biz
  let defaultBiz =
    (preferredId ? businesses.find((b) => b.id === preferredId) : undefined) ??
    businesses.find((b) => b.id === "b0000000-0000-4000-8000-000000000001") ??
    businesses[0]

  let matrix: SynclocalMatrixRow[] = []
  let lastBatchIso: string | null = null

  const primaryAgencyId = defaultBiz?.agency_id

  if (defaultBiz) {
    const { data: listings } = await supabase
      .from("listings")
      .select("*, directory:directories(*)")
      .eq("business_id", defaultBiz.id)

    matrix = ((listings ?? []) as (ListingRow & { directory?: DirectoryRow | DirectoryRow[] })[])
      .map((row) => {
        const directory = Array.isArray(row.directory) ? row.directory[0] : row.directory
        const { directory: _omit, ...listing } = row
        return {
          listing: listing as ListingRow,
          directory: directory as DirectoryRow,
        }
      })
      .filter((r) => r.directory)
      .sort((a, b) => a.directory.name.localeCompare(b.directory.name))

    if (primaryAgencyId) {
      const { data: batch } = await supabase
        .from("synclocal_cron_batches")
        .select("run_at")
        .eq("agency_id", primaryAgencyId)
        .order("run_at", { ascending: false })
        .limit(1)
        .maybeSingle()
      lastBatchIso = batch?.run_at ?? null
    }
  }

  return (
    <SynclocalDashboard
      businesses={businesses}
      initialRows={matrix}
      defaultBusinessId={defaultBiz?.id ?? null}
      lastBatchIso={lastBatchIso}
    />
  )
}
