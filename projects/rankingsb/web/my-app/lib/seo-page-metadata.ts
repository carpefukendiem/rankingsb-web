import type { Metadata } from "next"
import { loadIndustryMarkdown, loadLocationMarkdown } from "@/lib/load-seo-markdown"

const BASE = "https://rankingsb.com"

export function industryMarkdownMetadata(slug: string): Metadata {
  const parsed = loadIndustryMarkdown(slug)
  if (!parsed) {
    return { title: "Not Found | Rankingsb" }
  }
  const { frontmatter } = parsed
  const canonical = `${BASE}/industries/${slug}`
  return {
    title: { absolute: frontmatter.titleTag },
    description: frontmatter.metaDescription,
    alternates: { canonical },
    robots: { index: true, follow: true },
    openGraph: {
      title: frontmatter.titleTag,
      description: frontmatter.metaDescription,
      url: canonical,
      type: "website",
    },
  }
}

export function locationMarkdownMetadata(slug: string): Metadata {
  const parsed = loadLocationMarkdown(slug)
  if (!parsed) {
    return { title: "Not Found | Rankingsb" }
  }
  const { frontmatter } = parsed
  const canonical = `${BASE}/locations/${slug}`
  return {
    title: { absolute: frontmatter.titleTag },
    description: frontmatter.metaDescription,
    alternates: { canonical },
    robots: { index: true, follow: true },
    openGraph: {
      title: frontmatter.titleTag,
      description: frontmatter.metaDescription,
      url: canonical,
      type: "website",
    },
  }
}
