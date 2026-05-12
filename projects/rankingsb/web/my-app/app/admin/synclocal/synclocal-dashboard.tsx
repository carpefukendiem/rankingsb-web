"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { format, parseISO } from "date-fns"
import { MoreHorizontal } from "lucide-react"
import { toast } from "sonner"

import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { BusinessRow, DirectoryRow, ListingRow, SynclocalListingStatus, VerificationRunRow } from "@/lib/synclocal/types"

type SynclocalMatrixRow = {
  listing: ListingRow
  directory: DirectoryRow
}

export function SynclocalDashboard(props: Readonly<{
  businesses: BusinessRow[]
  initialRows: SynclocalMatrixRow[]
  defaultBusinessId: string | null
  lastBatchIso: string | null
}>) {
  const router = useRouter()
  const { businesses, initialRows, defaultBusinessId, lastBatchIso } = props

  const rows = initialRows
  const [activeRow, setActiveRow] = React.useState<SynclocalMatrixRow | null>(null)
  const [detailRuns, setDetailRuns] = React.useState<VerificationRunRow[]>([])
  const [detailLoading, setDetailLoading] = React.useState(false)
  const [notesDraft, setNotesDraft] = React.useState("")

  React.useEffect(() => {
    if (!activeRow) return
    setNotesDraft(activeRow.listing.notes ?? "")
    setDetailRuns([])
    setDetailLoading(true)
    fetch(`/api/synclocal/listings/${activeRow.listing.id}`)
      .then((r) => r.json())
      .then((data) => {
        if (!data.success) throw new Error(data.error ?? "detail load failed")
        setDetailRuns(data.verification_runs as VerificationRunRow[])
      })
      .catch((e: Error) => toast.error(e.message))
      .finally(() => setDetailLoading(false))
  }, [activeRow])

  async function persistNotes(next: string, listingId: string) {
    const res = await fetch(`/api/synclocal/listings/${listingId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ notes: next }),
    })
    const data = await res.json()
    if (!data.success) throw new Error("Could not save notes")
  }

  const summary = React.useMemo(() => {
    const total = rows.length
    let live = 0
    let discrepancies = 0
    for (const row of rows) {
      const s = row.listing.status
      if (s === "live") live += 1
      if (s === "discrepancy" || s === "rejected") discrepancies += 1
    }
    return { total, live, discrepancies }
  }, [initialRows])

  function statusBadge(status: SynclocalListingStatus) {
    if (status === "live") {
      return <Badge className="bg-emerald-600 text-white hover:bg-emerald-600/90">Live</Badge>
    }
    if (status === "pending" || status === "needs_update") {
      return <Badge className="bg-amber-400 text-zinc-900 hover:bg-amber-400/90">Pending</Badge>
    }
    if (status === "discrepancy" || status === "rejected") {
      return <Badge variant="destructive">Issue</Badge>
    }
    return <Badge variant="secondary">Queued</Badge>
  }

  function tierLabel(d: DirectoryRow) {
    if (d.tier === "api") return "API"
    if (d.tier === "form") return "Form"
    return "Local"
  }

  async function postSubmit(row: SynclocalMatrixRow, jobType: "create" | "update") {
    const slug = row.directory.slug
    let res: Response
    try {
      res = await fetch(`/api/synclocal/submit/${encodeURIComponent(slug)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ listingId: row.listing.id, jobType }),
      })
    } catch (e) {
      toast.error(e instanceof Error ? e.message : String(e))
      return
    }
    const data = await res.json()
    if (data.manual && data.submissionUrl) {
      toast.message("Manual submission required", {
        description: data.submissionUrl,
      })
    } else if (data.success) {
      toast.success("SyncLocal job completed")
    } else if (data.scaffold) {
      toast.warning("Adapter scaffold only", { description: data.error })
    } else {
      toast.error(data.error ?? "SyncLocal request failed")
    }
    router.refresh()
  }

  async function postVerify(listingId: string) {
    try {
      const res = await fetch(`/api/synclocal/verify/${listingId}`, { method: "POST" })
      const data = await res.json()
      if (!data.success) {
        toast.error(data.fetchError ?? data.error ?? "Verification failed")
      } else if (data.nap_match) {
        toast.success("Verified — NAP matches")
      } else {
        toast.warning("Discrepancy detected")
      }
    } catch (e) {
      toast.error(e instanceof Error ? e.message : String(e))
    }
    router.refresh()
  }

  async function markManual(row: SynclocalMatrixRow) {
    const urlInput = typeof window !== "undefined" ? window.prompt("Optional live listing URL (leave blank to fill later):") : null
    const payload: Record<string, string> = { status: "live" }
    if (urlInput) payload.listing_url = urlInput
    const res = await fetch(`/api/synclocal/listings/${row.listing.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    const data = await res.json()
    if (!data.success) {
      toast.error("Could not mark listing live")
      return
    }
    toast.success("Marked as manually submitted")
    router.refresh()
  }

  async function patchListing(listingId: string, patch: Record<string, unknown>) {
    const res = await fetch(`/api/synclocal/listings/${listingId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    })
    const data = await res.json()
    if (!data.success) {
      toast.error("Update failed")
    } else {
      toast.success("Updated")
      router.refresh()
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">SyncLocal</h1>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Citation directory matrix for Ranking SB. Automations push canonical SyncLocal snapshots; discrepancies bubble up after scrapes — no noisy
            third-party branding in-console.
          </p>
          <label className="flex flex-wrap items-center gap-2 text-sm">
            <span className="font-medium">Business</span>
            <select
              value={defaultBusinessId ?? ""}
              disabled={businesses.length === 0}
              onChange={(event) =>
                router.push(`/admin/synclocal${event.target.value ? `?biz=${encodeURIComponent(event.target.value)}` : ""}`)
              }
              className="rounded border px-3 py-1 dark:border-zinc-700 dark:bg-zinc-900"
            >
              {businesses.length === 0 ? <option value="">No businesses linked</option> : null}
              {businesses.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="grid w-full max-w-lg grid-cols-2 gap-3 text-sm sm:grid-cols-4">
          <SummaryCard label="Directories" value={String(summary.total)} />
          <SummaryCard label="Live" value={String(summary.live)} />
          <SummaryCard label="Issues" value={String(summary.discrepancies)} />
          <SummaryCard
            label="Last batch"
            value={lastBatchIso ? format(parseISO(lastBatchIso), "MMM d, yyyy h:mm a") : "—"}
          />
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Directory</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Tier</TableHead>
            <TableHead>Last verified</TableHead>
            <TableHead>Listing URL</TableHead>
            <TableHead className="w-[70px] text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.listing.id}
              className="cursor-pointer"
              onClick={() => setActiveRow(row)}
            >
              <TableCell className="font-medium">{row.directory.name}</TableCell>
              <TableCell>{statusBadge(row.listing.status)}</TableCell>
              <TableCell>{tierLabel(row.directory)}</TableCell>
              <TableCell className="text-muted-foreground">
                {row.listing.last_verified_at
                  ? format(parseISO(row.listing.last_verified_at), "MMM d, yyyy")
                  : "—"}
              </TableCell>
              <TableCell className="max-w-[220px] truncate text-primary underline">
                {row.listing.listing_url ? (
                  <a href={row.listing.listing_url} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>
                    {row.listing.listing_url}
                  </a>
                ) : (
                  "—"
                )}
              </TableCell>
              <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      type="button"
                      className="inline-flex size-9 items-center justify-center rounded-md border bg-white dark:border-zinc-700 dark:bg-zinc-900"
                    >
                      <MoreHorizontal className="size-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => postSubmit(row, "create")}>Submit</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => postSubmit(row, "update")}>Update</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => postVerify(row.listing.id)}>Verify now</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => {
                        setActiveRow(row)
                      }}
                    >
                      Edit notes…
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => markManual(row)}>Mark manually submitted</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Sheet
        open={Boolean(activeRow)}
        onOpenChange={(open) => {
          if (!open) setActiveRow(null)
        }}
      >
        <SheetContent className="w-full overflow-y-auto sm:max-w-xl">
          {activeRow ? (
            <>
              <SheetHeader>
                <SheetTitle>{activeRow.directory.name}</SheetTitle>
              </SheetHeader>
              <div className="mt-4 space-y-4">
                <div className="text-sm text-muted-foreground">
                  Status label: {activeRow.listing.status} · slug {activeRow.directory.slug}
                </div>
                <label className="grid gap-2 text-sm font-medium">
                  Notes
                  <textarea
                    className="min-h-[120px] rounded border px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
                    value={notesDraft}
                    onChange={(e) => setNotesDraft(e.target.value)}
                  />
                  <button
                    type="button"
                    className="w-fit rounded bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground"
                    onClick={() =>
                      persistNotes(notesDraft, activeRow.listing.id)
                        .then(() => toast.success("Saved"))
                        .catch((e: Error) => toast.error(e.message))
                    }
                  >
                    Save notes
                  </button>
                </label>
                <div>
                  <h3 className="text-sm font-semibold">Manual URL override</h3>
                  <p className="text-xs text-muted-foreground">Paste a known live URL if scrapes should target something other than Maps.</p>
                  <LiveUrlUpdater onSave={(loc) => patchListing(activeRow.listing.id, { listing_url: loc })} />
                </div>

                <div>
                  <h3 className="text-sm font-semibold">Verification history</h3>
                  <p className="text-xs text-muted-foreground">Most recent run first — field mismatches expand inline.</p>
                  {detailLoading ? <p className="text-sm">Loading…</p> : null}
                  <div className="mt-3 space-y-3">
                    {detailRuns.map((run) => (
                      <div key={run.id} className="rounded border p-3 text-sm dark:border-zinc-800">
                        <div className="flex flex-wrap items-center justify-between gap-2 font-medium">
                          <span>{format(parseISO(run.run_at), "PPpp")}</span>
                          <Badge variant={run.nap_match ? "secondary" : "destructive"}>{run.nap_match ? "Match" : "Mismatch"}</Badge>
                        </div>
                        {run.error ? (
                          <p className="mt-2 rounded bg-red-500/10 p-2 text-xs text-red-700 dark:text-red-300">{run.error}</p>
                        ) : null}
                        <div className="mt-3 space-y-2">
                          {Object.entries(run.discrepancies ?? {}).map(([field, value]) => (
                            <div key={field} className="rounded bg-muted px-3 py-2">
                              <div className="text-xs uppercase text-muted-foreground">{field}</div>
                              <div className={value.match ? "text-emerald-600" : "text-rose-600"}>
                                Expected: <span className="font-mono">{String(value.canonical)}</span>
                              </div>
                              <div className={value.match ? "text-emerald-600" : "text-rose-600"}>
                                Found: <span className="font-mono">{String(value.scraped)}</span>
                              </div>
                            </div>
                          ))}
                          {!Object.keys(run.discrepancies ?? {}).length && !run.error ? (
                            <div className="text-xs text-muted-foreground">
                              Structured discrepancies unavailable for this scrape pass.
                            </div>
                          ) : null}
                        </div>
                      </div>
                    ))}
                  </div>
                  {!detailLoading && detailRuns.length === 0 ? (
                    <div className="text-sm text-muted-foreground">No automated checks yet.</div>
                  ) : null}
                </div>
              </div>
            </>
          ) : null}
        </SheetContent>
      </Sheet>
    </div>
  )
}

function SummaryCard({ label, value }: Readonly<{ label: string; value: string }>) {
  return (
    <div className="rounded-lg border bg-white p-3 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="text-xs uppercase text-muted-foreground">{label}</div>
      <div className="text-lg font-semibold">{value}</div>
    </div>
  )
}

function LiveUrlUpdater({ onSave }: Readonly<{ onSave: (url: string) => void }>) {
  const [value, setValue] = React.useState("")
  return (
    <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-end">
      <input
        className="grow rounded border px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
        placeholder="https://"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <button type="button" className="rounded border px-3 py-2 text-sm font-medium" onClick={() => onSave(value)}>
        Apply
      </button>
      <button
        type="button"
        className="rounded px-3 py-2 text-sm text-muted-foreground"
        onClick={() => {
          setValue("")
          onSave("")
        }}
      >
        Clear
      </button>
    </div>
  )
}
