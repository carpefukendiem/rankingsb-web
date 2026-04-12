import { Metadata } from "next"
import { industryMarkdownMetadata } from "@/lib/seo-page-metadata"
import { SeoIndustryMarkdownPage } from "@/components/seo/SeoIndustryMarkdownPage"

const SLUG = "contractor-seo"

export async function generateMetadata(): Promise<Metadata> {
  return industryMarkdownMetadata(SLUG)
}

export default function ContractorSEOPage() {
  return (
    <SeoIndustryMarkdownPage
      slug={SLUG}
      heroGradientClass="from-slate-900 via-orange-900/30 to-slate-900"
      ctaTitle="Get more contractor bids from Google"
      ctaSubtitle="Free audit: see how you rank for high-value project searches across Santa Barbara and Ventura County."
      formTitle="Free Contractor SEO Audit"
    />
  )
}
