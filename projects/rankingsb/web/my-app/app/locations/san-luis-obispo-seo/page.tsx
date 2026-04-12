import { Metadata } from "next"
import { locationMarkdownMetadata } from "@/lib/seo-page-metadata"
import { SeoLocationMarkdownPage } from "@/components/seo/SeoLocationMarkdownPage"

const SLUG = "san-luis-obispo-seo"

export async function generateMetadata(): Promise<Metadata> {
  return locationMarkdownMetadata(SLUG)
}

export default function SanLuisObispoSEOPage() {
  return (
    <SeoLocationMarkdownPage
      slug={SLUG}
      ctaTitle="Expand into San Luis Obispo County"
      ctaSubtitle="Local SEO for SLO businesses and Santa Barbara brands serving Cal Poly, downtown, and the coast."
      formTitle="Free SLO SEO Audit"
      nearby={[
        { href: "/locations/santa-maria-seo", label: "Santa Maria" },
        { href: "/locations/santa-barbara-seo", label: "Santa Barbara" },
        { href: "/locations/ventura-seo", label: "Ventura" },
      ]}
    />
  )
}
