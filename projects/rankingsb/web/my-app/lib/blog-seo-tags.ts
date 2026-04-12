/** 2–3 tags per SEO blog post for on-page badges */
export const blogSeoTags: Record<string, string[]> = {
  "google-local-pack": ["Local Pack", "Google Maps", "Santa Barbara"],
  "long-tail-seo": ["Keywords", "Content strategy", "Conversions"],
  "why-not-ranking-google": ["Diagnostics", "Local SEO", "Rankings"],
  "local-seo-checklist-2026": ["Checklist", "2026", "Central Coast"],
  "seo-cost-santa-barbara": ["Pricing", "Budget", "Santa Barbara"],
  "google-reviews-vs-yelp": ["Reviews", "Reputation", "Directories"],
  "schema-markup-local-businesses": ["Schema", "Technical SEO", "Local"],
  "respond-to-negative-reviews": ["Reputation", "Reviews", "Crisis"],
  "seo-vs-google-ads-when-use-both": ["PPC", "Strategy", "ROI"],
  "core-web-vitals": ["Performance", "CWV", "Mobile"],
  "local-link-building": ["Links", "Authority", "Santa Barbara"],
  "near-me-searches": ["Near me", "Maps", "Local intent"],
  "seasonal-seo-santa-barbara": ["Seasonal", "Tourism", "Santa Barbara"],
  "nap-consistency": ["Citations", "NAP", "Trust"],
  "track-seo-results": ["Analytics", "Reporting", "DIY"],
  "instagram-vs-seo": ["Social media", "Strategy", "Priorities"],
  "mobile-seo-local-businesses": ["Mobile", "UX", "Local"],
  "how-long-does-seo-take": ["Timeline", "Expectations", "ROI"],
}

export const seoBlogSlugOrder = [
  "google-local-pack",
  "long-tail-seo",
  "why-not-ranking-google",
  "local-seo-checklist-2026",
  "seo-cost-santa-barbara",
  "google-reviews-vs-yelp",
  "schema-markup-local-businesses",
  "respond-to-negative-reviews",
  "seo-vs-google-ads-when-use-both",
  "core-web-vitals",
  "local-link-building",
  "near-me-searches",
  "seasonal-seo-santa-barbara",
  "nap-consistency",
  "track-seo-results",
  "instagram-vs-seo",
  "mobile-seo-local-businesses",
  "how-long-does-seo-take",
] as const

export function pickRelatedSeoSlugs(slug: string, count = 3): string[] {
  const i = seoBlogSlugOrder.indexOf(slug as (typeof seoBlogSlugOrder)[number])
  if (i === -1) return seoBlogSlugOrder.filter((s) => s !== slug).slice(0, count)
  const out: string[] = []
  for (let step = 1; out.length < count && step < seoBlogSlugOrder.length; step++) {
    const s = seoBlogSlugOrder[(i + step) % seoBlogSlugOrder.length]
    if (s !== slug) out.push(s)
  }
  return out
}
