/**
 * Mirrors the seeded directory slugs — useful for client-side labels and tooling.
 */
export const SYNCLocal_DIRECTORY_ORDER = [
  "google-business-profile",
  "bing-places",
  "apple-business-connect",
  "facebook-business",
  "yelp",
  "foursquare",
  "data-axle",
  "linkedin-company",
  "yellow-pages",
  "manta",
  "merchantcircle",
  "hotfrog",
  "cylex",
  "brownbook",
  "elocal",
  "citysearch",
  "superpages",
  "chamber-of-commerce",
  "bbb",
  "nextdoor-business",
  "santa-barbara-chamber-of-commerce",
] as const

export type SynclocalDirectorySlug = (typeof SYNCLocal_DIRECTORY_ORDER)[number]
