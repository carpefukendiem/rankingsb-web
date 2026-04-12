import { Metadata } from "next"
import { industryMarkdownMetadata } from "@/lib/seo-page-metadata"
import { SeoIndustryMarkdownPage } from "@/components/seo/SeoIndustryMarkdownPage"

const SLUG = "spa-salon-seo"

export async function generateMetadata(): Promise<Metadata> {
  return industryMarkdownMetadata(SLUG)
}

export default function SpaSalonSEOPage() {
  return (
    <SeoIndustryMarkdownPage
      slug={SLUG}
      heroGradientClass="from-slate-900 via-pink-900/30 to-slate-900"
      ctaTitle="Book more spa & salon clients online"
      ctaSubtitle="Rank for facials, hair, nails, and med-spa searches when locals pick their provider on Google."
      formTitle="Free Spa & Salon SEO Audit"
    />
  )
}
