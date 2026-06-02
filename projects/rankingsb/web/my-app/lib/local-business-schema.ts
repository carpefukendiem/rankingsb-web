import {
  BUSINESS_AGGREGATE_RATING,
  BUSINESS_AREA_SERVED,
  BUSINESS_EMAIL,
  BUSINESS_GEO,
  BUSINESS_NAME_GBP,
  BUSINESS_PHONE_E164,
  BUSINESS_POSTAL_ADDRESS,
  BUSINESS_SAME_AS,
  ORGANIZATION_ID,
  WEBSITE_ID,
} from "@/lib/business-identity"
import { SITE_URL } from "@/lib/site-url"

/** Site-wide ProfessionalService node — referenced as #organization across JSON-LD graphs. */
export function buildOrganizationSchemaNode() {
  return {
    "@type": "ProfessionalService",
    "@id": ORGANIZATION_ID,
    name: BUSINESS_NAME_GBP,
    description:
      "Santa Barbara and Ventura County local SEO, website design, and marketing automation for service businesses.",
    url: SITE_URL,
    telephone: BUSINESS_PHONE_E164,
    email: BUSINESS_EMAIL,
    address: BUSINESS_POSTAL_ADDRESS,
    geo: BUSINESS_GEO,
    priceRange: "$$",
    areaServed: BUSINESS_AREA_SERVED,
    aggregateRating: BUSINESS_AGGREGATE_RATING,
    sameAs: [...BUSINESS_SAME_AS],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    serviceType: [
      "Local SEO",
      "Google Business Profile Optimization",
      "Review Management",
      "PPC Advertising",
      "Website Design",
    ],
  }
}

export function buildWebsiteSchemaNode() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: BUSINESS_NAME_GBP,
    publisher: { "@id": ORGANIZATION_ID },
  }
}

/** Root graph injected on every page via layout. */
export function buildSiteWideJsonLdGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [buildWebsiteSchemaNode(), buildOrganizationSchemaNode()],
  }
}
