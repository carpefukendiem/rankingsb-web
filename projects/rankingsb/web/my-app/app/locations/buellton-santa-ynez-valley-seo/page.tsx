import { Metadata } from "next"
import { locationMarkdownMetadata } from "@/lib/seo-page-metadata"
import { SeoLocationMarkdownPage } from "@/components/seo/SeoLocationMarkdownPage"

const SLUG = "buellton-santa-ynez-valley-seo"

export async function generateMetadata(): Promise<Metadata> {
  return locationMarkdownMetadata(SLUG)
}

export default function BuelltonSantaYnezValleySEOPage() {
  return (
    <SeoLocationMarkdownPage
      slug={SLUG}
      ctaTitle="Wine country SEO for Buellton & the SYV"
      ctaSubtitle="Capture tourism, tasting-room, and local service searches across the Santa Ynez Valley."
      formTitle="Free Buellton & SYV SEO Audit"
      nearby={[
        { href: "/locations/solvang-seo", label: "Solvang" },
        { href: "/locations/santa-ynez-seo", label: "Santa Ynez" },
        { href: "/locations/lompoc-seo", label: "Lompoc" },
        { href: "/industries/winery-seo", label: "Winery SEO" },
      ]}
    />
  )
}
