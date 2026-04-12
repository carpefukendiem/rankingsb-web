import { Metadata } from "next"
import { locationMarkdownMetadata } from "@/lib/seo-page-metadata"
import { SeoLocationMarkdownPage } from "@/components/seo/SeoLocationMarkdownPage"

const SLUG = "port-hueneme-seo"

export async function generateMetadata(): Promise<Metadata> {
  return locationMarkdownMetadata(SLUG)
}

export default function PortHuenemeSEOPage() {
  return (
    <SeoLocationMarkdownPage
      slug={SLUG}
      ctaTitle="Ventura coast SEO — Port Hueneme & Oxnard Harbor"
      ctaSubtitle="Rank for harbor-adjacent and Oxnard–adjacent searches with a local team that knows Ventura County."
      formTitle="Free Port Hueneme SEO Audit"
      nearby={[
        { href: "/locations/oxnard-seo", label: "Oxnard" },
        { href: "/locations/ventura-seo", label: "Ventura" },
        { href: "/locations/camarillo-seo", label: "Camarillo" },
      ]}
    />
  )
}
