import { SITE_URL } from "@/lib/site-url"

/** Display + schema: must match Google Business Profile exactly. */
export const BUSINESS_NAME_GBP =
  "Ranking SB - Local Marketing & Automation Experts"

export const BUSINESS_NAME_SHORT = "Ranking SB"

export const BUSINESS_PHONE_DISPLAY = "(805) 307-7600"
export const BUSINESS_PHONE_TEL = "8053077600"
export const BUSINESS_PHONE_E164 = "+18053077600"

export const BUSINESS_EMAIL = "hello@rankingsb.com"

/** Single-line NAP address (GBP format). */
export const BUSINESS_ADDRESS_FULL =
  "10 E Yanonali St #150, Santa Barbara, CA 93101"

export const BUSINESS_ADDRESS_LINE1 = "10 E Yanonali St #150"
export const BUSINESS_ADDRESS_LINE2 = "Santa Barbara, CA 93101"

/** Schema.org PostalAddress — character-for-character GBP match. */
export const BUSINESS_POSTAL_ADDRESS = {
  "@type": "PostalAddress" as const,
  streetAddress: "10 E Yanonali St #150",
  addressLocality: "Santa Barbara",
  addressRegion: "CA",
  postalCode: "93101",
  addressCountry: "US",
}

/** 10 E Yanonali St #150, Santa Barbara — building centroid. */
export const BUSINESS_GEO = {
  "@type": "GeoCoordinates" as const,
  latitude: 34.414231,
  longitude: -119.691055,
}

/** Google Business Profile listing (sameAs). */
export const BUSINESS_GBP_URL =
  "https://www.google.com/maps/place/Ranking+SB+-+Local+Marketing+%26+Automation+Experts/@34.414231,-119.691055,17z"

export const BUSINESS_SAME_AS = [
  BUSINESS_GBP_URL,
  "https://www.facebook.com/rankingsb",
  "https://www.linkedin.com/company/ranking-sb",
] as const

export const ORGANIZATION_ID = `${SITE_URL}/#organization`
export const WEBSITE_ID = `${SITE_URL}/#website`

export const BUSINESS_AREA_SERVED = [
  { "@type": "City" as const, name: "Santa Barbara", containedInPlace: { "@type": "State" as const, name: "California" } },
  { "@type": "AdministrativeArea" as const, name: "Ventura County", containedInPlace: { "@type": "State" as const, name: "California" } },
]

/** Google Maps embed for /contact (exact office location). */
export const BUSINESS_MAP_EMBED_URL =
  "https://maps.google.com/maps?q=10+E+Yanonali+St+%23150,+Santa+Barbara,+CA+93101&hl=en&z=16&output=embed"
