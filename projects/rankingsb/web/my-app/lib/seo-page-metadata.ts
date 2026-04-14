import type { Metadata } from "next"
import { loadIndustryMarkdown, loadLocationMarkdown } from "@/lib/load-seo-markdown"
import { clampMetaDescription, truncateMetaTitle } from "@/lib/meta-helpers"

const BASE = "https://rankingsb.com"

export function industryMarkdownMetadata(slug: string): Metadata {
  const parsed = loadIndustryMarkdown(slug)
  if (!parsed) {
    return { title: "Not Found | Ranking SB" }
  }
  const { frontmatter } = parsed
  const canonical = `${BASE}/industries/${slug}`
  const title = truncateMetaTitle(frontmatter.titleTag, 70)
  const description = clampMetaDescription(frontmatter.metaDescription)
  return {
    title: { absolute: title },
    description,
    alternates: { canonical },
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "website",
    },
  }
}

export function locationMarkdownMetadata(slug: string): Metadata {
  const parsed = loadLocationMarkdown(slug)
  if (!parsed) {
    return { title: "Not Found | Ranking SB" }
  }
  const { frontmatter } = parsed
  const canonical = `${BASE}/locations/${slug}`
  const title = truncateMetaTitle(frontmatter.titleTag, 70)
  const description = clampMetaDescription(frontmatter.metaDescription)
  return {
    title: { absolute: title },
    description,
    alternates: { canonical },
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "website",
    },
  }
}
