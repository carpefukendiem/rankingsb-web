import type { BusinessRow, DirectoryRow, ListingRow } from "./types"

export type SynclocalSubmitResult =
  | { ok: true; listingUrl?: string; externalListingId?: string }
  | {
      ok: false
      error?: string
      degraded?: boolean
      scaffold?: boolean
      manualRequired?: boolean
      submissionUrl?: string
      message?: string
    }

export type SynclocalAdapterContext = {
  business: BusinessRow
  listing: ListingRow
  directory: DirectoryRow
}

export interface SynclocalDirectoryAdapter {
  submit(context: SynclocalAdapterContext): Promise<SynclocalSubmitResult>
  update(context: SynclocalAdapterContext): Promise<SynclocalSubmitResult>
}
