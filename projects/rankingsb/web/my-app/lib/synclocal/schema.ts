import { z } from "zod"

const uuid = z.string().uuid()

export const SynclocalDirectoryTierSchema = z.enum(["api", "form", "aggregator"])
export const SynclocalAutomationSchema = z.enum(["api", "playwright", "manual"])
export const SynclocalListingStatusSchema = z.enum([
  "not_submitted",
  "pending",
  "submitted",
  "live",
  "needs_update",
  "discrepancy",
  "rejected",
])

export const BusinessSchema = z.object({
  id: uuid,
  agency_id: uuid,
  name: z.string(),
  address_line1: z.string().nullable(),
  address_line2: z.string().nullable(),
  city: z.string().nullable(),
  state: z.string().nullable(),
  zip: z.string().nullable(),
  country: z.string(),
  phone: z.string().nullable(),
  website: z.string().nullable(),
  email: z.string().nullable(),
  primary_category: z.string().nullable(),
  secondary_categories: z.array(z.string()),
  hours: z.record(z.string(), z.unknown()).nullable(),
  lat: z.number().nullable(),
  lng: z.number().nullable(),
  description_short: z.string().nullable(),
  description_long: z.string().nullable(),
  logo_url: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
})

export const DirectorySchema = z.object({
  id: uuid,
  name: z.string(),
  slug: z.string(),
  tier: SynclocalDirectoryTierSchema,
  submission_url: z.string().nullable(),
  login_url: z.string().nullable(),
  requires_auth: z.boolean(),
  automation_method: SynclocalAutomationSchema,
  notes: z.string().nullable(),
  active: z.boolean(),
})

export const ListingSchema = z.object({
  id: uuid,
  business_id: uuid,
  directory_id: uuid,
  status: SynclocalListingStatusSchema,
  listing_url: z.string().nullable(),
  external_listing_id: z.string().nullable(),
  last_submitted_at: z.string().nullable(),
  last_verified_at: z.string().nullable(),
  last_updated_at: z.string().nullable(),
  notes: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
})

export const VerificationRunSchema = z.object({
  id: uuid,
  listing_id: uuid,
  batch_id: uuid.nullable(),
  run_at: z.string(),
  nap_match: z.boolean(),
  discrepancies: z.record(
    z.string(),
    z.object({
      canonical: z.string().nullable(),
      scraped: z.string().nullable(),
      match: z.boolean(),
    })
  ),
  scraped_data: z.record(z.string(), z.unknown()).nullable(),
  error: z.string().nullable(),
})

export const SubmitSynclocalBodySchema = z.object({
  listingId: uuid,
  jobType: z.enum(["create", "update"]).optional().default("create"),
})

export const PatchListingBodySchema = z.object({
  notes: z.string().optional(),
  status: SynclocalListingStatusSchema.optional(),
  listing_url: z.union([z.string().url(), z.literal("")]).optional(),
  external_listing_id: z.string().optional(),
})
