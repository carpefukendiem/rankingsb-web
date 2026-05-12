import type { DirectoryRow } from "../types"
import type { SynclocalDirectoryAdapter } from "../adapter-contract"
import { scaffoldTier1Adapter } from "./scaffold-tier1"
import { manualFormAdapter } from "./manual-form"
import { googleBusinessProfileAdapter } from "./google-business-profile"
import { bingPlacesAdapter } from "./bing-places"
import { facebookBusinessAdapter } from "./facebook-business"

const tier1Apis: Record<string, SynclocalDirectoryAdapter> = {
  "google-business-profile": googleBusinessProfileAdapter,
  "bing-places": bingPlacesAdapter,
  "facebook-business": facebookBusinessAdapter,
  "apple-business-connect": scaffoldTier1Adapter("Apple Business Connect"),
  yelp: scaffoldTier1Adapter("Yelp"),
  foursquare: scaffoldTier1Adapter("Foursquare"),
  "data-axle": scaffoldTier1Adapter("Data Axle"),
  "linkedin-company": scaffoldTier1Adapter("LinkedIn Company"),
}

export function getSynclocalAdapter(directory: DirectoryRow): SynclocalDirectoryAdapter {
  if (directory.automation_method === "playwright" || directory.automation_method === "manual") {
    return manualFormAdapter
  }
  if (directory.tier === "api" || directory.automation_method === "api") {
    return tier1Apis[directory.slug] ?? scaffoldTier1Adapter(directory.name)
  }
  return manualFormAdapter
}
