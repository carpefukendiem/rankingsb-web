import { Metadata } from "next"
import { industryMarkdownMetadata } from "@/lib/seo-page-metadata"
import { SeoIndustryMarkdownPage } from "@/components/seo/SeoIndustryMarkdownPage"

const SLUG = "ecommerce-seo-central-coast"

export async function generateMetadata(): Promise<Metadata> {
  return industryMarkdownMetadata(SLUG)
}

export default function EcommerceCentralCoastSEOPage() {
  return (
    <SeoIndustryMarkdownPage
      slug={SLUG}
      heroGradientClass="from-slate-900 via-purple-900/35 to-slate-900"
      ctaTitle="Scale ecommerce SEO locally & nationally"
      ctaSubtitle="Product and category SEO for Central Coast brands selling online and in-store."
      formTitle="Free Ecommerce SEO Audit"
    />
  )
}
