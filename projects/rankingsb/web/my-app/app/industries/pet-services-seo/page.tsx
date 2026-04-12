import { Metadata } from "next"
import { industryMarkdownMetadata } from "@/lib/seo-page-metadata"
import { SeoIndustryMarkdownPage } from "@/components/seo/SeoIndustryMarkdownPage"

const SLUG = "pet-services-seo"

export async function generateMetadata(): Promise<Metadata> {
  return industryMarkdownMetadata(SLUG)
}

export default function PetServicesSEOPage() {
  return (
    <SeoIndustryMarkdownPage
      slug={SLUG}
      heroGradientClass="from-slate-900 via-amber-900/35 to-slate-900"
      ctaTitle="More appointments for your pet business"
      ctaSubtitle="Local SEO for groomers, vets, boarding, and pet services in Santa Barbara and Ventura County."
      formTitle="Free Pet Services SEO Audit"
    />
  )
}
