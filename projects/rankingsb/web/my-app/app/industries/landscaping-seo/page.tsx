import { Metadata } from "next"
import { industryMarkdownMetadata } from "@/lib/seo-page-metadata"
import { SeoIndustryMarkdownPage } from "@/components/seo/SeoIndustryMarkdownPage"

const SLUG = "landscaping-seo"

export async function generateMetadata(): Promise<Metadata> {
  return industryMarkdownMetadata(SLUG)
}

export default function LandscapingSEOPage() {
  return (
    <SeoIndustryMarkdownPage
      slug={SLUG}
      heroGradientClass="from-green-900 via-emerald-900 to-slate-900"
      ctaTitle="Fill your landscaping schedule from Google"
      ctaSubtitle="Rank for drought-tolerant design, lawn care, and estate maintenance searches on the Central Coast."
      formTitle="Free Landscaping SEO Audit"
    />
  )
}
