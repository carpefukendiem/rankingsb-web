import { MetadataRoute } from "next"

export const dynamic = "force-static"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://rankingsb.com"
  const now = new Date()

  const staticPages = [
    { url: baseUrl, priority: 1.0, changeFrequency: "weekly" as const },
    { url: `${baseUrl}/about`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/services`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/industries`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/locations`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/case-studies`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/blog`, priority: 0.8, changeFrequency: "weekly" as const },
    { url: `${baseUrl}/free-audit`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/pricing`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/faq`, priority: 0.7, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/contact`, priority: 0.8, changeFrequency: "monthly" as const },
  ]

  const servicePages = [
    "local-seo", "google-business-profile", "review-management",
    "citation-building", "technical-seo", "ppc-google-ads",
    "content-marketing", "website-design",
  ].map(slug => ({
    url: `${baseUrl}/services/${slug}`,
    priority: 0.85,
    changeFrequency: "monthly" as const,
  }))

  const industryPages = [
    "electrician-seo", "hvac-seo", "plumber-seo", "roofing-seo",
    "solar-seo", "attorney-seo", "dental-seo", "restaurant-seo",
    "ecommerce-seo", "ecommerce-seo-central-coast", "auto-mechanic-seo", "gym-fitness-seo",
    "real-estate-seo", "medical-seo", "winery-seo", "contractor-seo",
    "landscaping-seo", "carpet-cleaning-seo", "spa-beauty-seo", "spa-salon-seo", "pest-control-seo",
    "pet-services-seo", "financial-advisor-seo", "home-services-seo",
  ].map(slug => ({
    url: `${baseUrl}/industries/${slug}`,
    priority: 0.8,
    changeFrequency: "monthly" as const,
  }))

  const locationPages = [
    "santa-barbara-seo", "goleta-seo", "montecito-seo", "carpinteria-seo",
    "isla-vista-seo", "ventura-county-seo", "solvang-seo", "santa-ynez-seo",
    "lompoc-seo", "santa-maria-seo", "san-luis-obispo-seo", "buellton-santa-ynez-valley-seo",
    "port-hueneme-seo", "summerland-seo", "ventura-seo", "oxnard-seo",
    "thousand-oaks-seo", "camarillo-seo", "moorpark-seo", "simi-valley-seo",
    "ojai-seo", "santa-paula-seo", "newbury-park-seo",
  ].map(slug => ({
    url: `${baseUrl}/locations/${slug}`,
    priority: 0.85,
    changeFrequency: "monthly" as const,
  }))

  const blogPosts = [
    "santa-barbara-seo-guide", "ventura-county-seo-guide",
    "google-business-profile-guide", "google-maps-ranking",
    "get-more-reviews", "electrician-seo-guide", "seo-vs-google-ads",
    "hvac-seasonal-seo", "local-citation-sites",
    "google-local-pack", "long-tail-seo", "why-not-ranking-google",
    "local-seo-checklist-2026", "seo-cost-santa-barbara", "google-reviews-vs-yelp",
    "schema-markup-local-businesses", "respond-to-negative-reviews",
    "seo-vs-google-ads-when-use-both", "core-web-vitals", "local-link-building",
    "near-me-searches", "seasonal-seo-santa-barbara", "nap-consistency",
    "track-seo-results", "instagram-vs-seo", "mobile-seo-local-businesses",
    "how-long-does-seo-take",
  ].map(slug => ({
    url: `${baseUrl}/blog/${slug}`,
    priority: 0.7,
    changeFrequency: "monthly" as const,
  }))

  return [
    ...staticPages.map(p => ({ ...p, lastModified: now })),
    ...servicePages.map(p => ({ ...p, lastModified: now })),
    ...industryPages.map(p => ({ ...p, lastModified: now })),
    ...locationPages.map(p => ({ ...p, lastModified: now })),
    ...blogPosts.map(p => ({ ...p, lastModified: now })),
  ]
}
