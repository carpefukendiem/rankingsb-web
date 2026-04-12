import { Metadata } from "next"
import { industryMarkdownMetadata } from "@/lib/seo-page-metadata"
import { SeoIndustryMarkdownPage } from "@/components/seo/SeoIndustryMarkdownPage"

const SLUG = "financial-advisor-seo"

export async function generateMetadata(): Promise<Metadata> {
  return industryMarkdownMetadata(SLUG)
}

export default function FinancialAdvisorSEOPage() {
  return (
    <SeoIndustryMarkdownPage
      slug={SLUG}
      heroGradientClass="from-slate-900 via-indigo-900/40 to-slate-900"
      ctaTitle="Grow qualified financial & accounting leads"
      ctaSubtitle="E-E-A-T focused SEO for advisors, CPAs, and wealth managers on the Central Coast."
      formTitle="Free Financial SEO Audit"
    />
  )
}
