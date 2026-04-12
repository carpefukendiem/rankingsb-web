import { Metadata } from "next"
import { industryMarkdownMetadata } from "@/lib/seo-page-metadata"
import { SeoIndustryMarkdownPage } from "@/components/seo/SeoIndustryMarkdownPage"

const SLUG = "home-services-seo"

export async function generateMetadata(): Promise<Metadata> {
  return industryMarkdownMetadata(SLUG)
}

export default function HomeServicesSEOPage() {
  return (
    <SeoIndustryMarkdownPage
      slug={SLUG}
      heroGradientClass="from-slate-900 via-cyan-900/30 to-slate-900"
      ctaTitle="More home-service jobs from local search"
      ctaSubtitle="Cleaning, organizing, handyman — rank when homeowners search on Google in the 805."
      formTitle="Free Home Services SEO Audit"
    />
  )
}
