import { Metadata } from "next"
import { locationMarkdownMetadata } from "@/lib/seo-page-metadata"
import { SeoLocationMarkdownPage } from "@/components/seo/SeoLocationMarkdownPage"

const SLUG = "santa-maria-seo"

export async function generateMetadata(): Promise<Metadata> {
  return locationMarkdownMetadata(SLUG)
}

export default function SantaMariaSEOPage() {
  return (
    <SeoLocationMarkdownPage
      slug={SLUG}
      ctaTitle="Santa Maria local SEO — free audit"
      ctaSubtitle="Santa Barbara County's largest city is still wide open for local SEO. Start before your competitors do."
      formTitle="Free Santa Maria SEO Audit"
      nearby={[
        { href: "/locations/lompoc-seo", label: "Lompoc" },
        { href: "/locations/san-luis-obispo-seo", label: "San Luis Obispo" },
        { href: "/locations/santa-barbara-seo", label: "Santa Barbara" },
      ]}
    />
  )
}
