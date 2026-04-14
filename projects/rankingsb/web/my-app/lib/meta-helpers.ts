import type { Metadata } from "next"

const BLOG_TITLE_SUFFIX = " | Ranking SB"

/** Truncate a full title string to maxLen (default 70) at a word boundary when possible. */
export function truncateMetaTitle(title: string, maxLen = 70): string {
  const t = title.trim().replace(/\s+/g, " ")
  if (t.length <= maxLen) return t
  let cut = t.slice(0, maxLen - 1)
  const sp = cut.lastIndexOf(" ")
  if (sp > maxLen * 0.45) cut = cut.slice(0, sp)
  return `${cut.trim()}…`
}

/** Normalize meta description to roughly 150–160 characters. */
export function clampMetaDescription(raw: string, minLen = 150, maxLen = 160): string {
  let s = raw.trim().replace(/\s+/g, " ")
  if (s.length > maxLen) {
    let cut = s.slice(0, maxLen - 3)
    const sp = cut.lastIndexOf(" ")
    if (sp >= minLen - 30) cut = cut.slice(0, sp)
    return `${cut.trim()}...`
  }
  const pad = " — Ranking SB, 805 Growth Engine."
  if (s.length < minLen) {
    const once = s + pad
    if (once.length <= maxLen) return once
    return `${s} (805) 307-7600.`.slice(0, maxLen).trim()
  }
  return s
}

/** Blog post `<title>`: post title + suffix, total ≤70 chars. */
export function blogPostBrowserTitle(postTitle: string): string {
  const clean = postTitle.trim().replace(/\s+/g, " ")
  const maxTotal = 70
  const suffix = BLOG_TITLE_SUFFIX
  if (clean.length + suffix.length <= maxTotal) return clean + suffix
  const budget = maxTotal - suffix.length - 1
  let head = clean.slice(0, budget)
  const sp = head.lastIndexOf(" ")
  if (sp > budget * 0.4) head = head.slice(0, sp)
  return `${head.trim()}…${suffix}`
}

export function blogPostMetaDescription(excerpt: string): string {
  return clampMetaDescription(excerpt)
}

export function locationSeoMetadata(cityDisplay: string): Metadata {
  const mid = cityDisplay.includes("County") ? cityDisplay : `${cityDisplay} CA`
  const rawTitle = `SEO Services ${mid} — Rank #1 on Google | Ranking SB`
  const title = truncateMetaTitle(rawTitle, 70)
  const rawDesc = `Local SEO for ${cityDisplay} businesses. Get to page 1 of Google in 90 days. Free growth audit shows exactly what's holding you back. No contracts. (805) 307-7600.`
  return {
    title: { absolute: title },
    description: clampMetaDescription(rawDesc),
  }
}

export function industrySeoMetadata(opts: {
  industryLabel: string
  outcome: string
  descIndustryPhrase: string
}): Metadata {
  const rawTitle = `${opts.industryLabel} SEO Santa Barbara — Get More ${opts.outcome} | Ranking SB`
  const title = truncateMetaTitle(rawTitle, 70)
  const rawDesc = `More customers from Google. Local SEO for ${opts.descIndustryPhrase} in Santa Barbara and Ventura County. Free growth audit in 24 hours. 90-day guarantee.`
  return {
    title: { absolute: title },
    description: clampMetaDescription(rawDesc),
  }
}
