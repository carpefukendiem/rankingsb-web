export type SynclocalDirectoryTier = "api" | "form" | "aggregator"
export type SynclocalAutomationMethod = "api" | "playwright" | "manual"
export type SynclocalListingStatus =
  | "not_submitted"
  | "pending"
  | "submitted"
  | "live"
  | "needs_update"
  | "discrepancy"
  | "rejected"
export type SynclocalJobType = "create" | "update" | "verify"
export type SynclocalJobStatus = "queued" | "running" | "succeeded" | "failed"

export type SynclocalDiscrepancyField = Record<
  string,
  {
    canonical: string | null
    scraped: string | null
    match: boolean
  }
>

export type BusinessRow = {
  id: string
  agency_id: string
  name: string
  address_line1: string | null
  address_line2: string | null
  city: string | null
  state: string | null
  zip: string | null
  country: string
  phone: string | null
  website: string | null
  email: string | null
  primary_category: string | null
  secondary_categories: string[]
  hours: Record<string, unknown> | null
  lat: number | null
  lng: number | null
  description_short: string | null
  description_long: string | null
  logo_url: string | null
  created_at: string
  updated_at: string
}

export type DirectoryRow = {
  id: string
  name: string
  slug: string
  tier: SynclocalDirectoryTier
  submission_url: string | null
  login_url: string | null
  requires_auth: boolean
  automation_method: SynclocalAutomationMethod
  notes: string | null
  active: boolean
}

export type ListingRow = {
  id: string
  business_id: string
  directory_id: string
  status: SynclocalListingStatus
  listing_url: string | null
  external_listing_id: string | null
  last_submitted_at: string | null
  last_verified_at: string | null
  last_updated_at: string | null
  notes: string | null
  created_at: string
  updated_at: string
}

export type VerificationRunRow = {
  id: string
  listing_id: string
  batch_id: string | null
  run_at: string
  nap_match: boolean
  discrepancies: SynclocalDiscrepancyField
  scraped_data: Record<string, unknown> | null
  error: string | null
}
