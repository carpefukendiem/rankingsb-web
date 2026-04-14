import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Phone, MapPin } from "lucide-react"
import { CTASection } from "@/components/shared/CTASection"
import { ArticleMarkdown } from "@/components/seo/ArticleMarkdown"
import { JsonLdGraph } from "@/components/seo/JsonLdGraph"
import { loadLocationMarkdown } from "@/lib/load-seo-markdown"
import { getJsonLdForPath } from "@/lib/seo-graph"

type Props = {
  slug: string
  ctaTitle: string
  ctaSubtitle: string
  formTitle: string
  /** Short labels for nearby location links */
  nearby?: { href: string; label: string }[]
}

export function SeoLocationMarkdownPage({
  slug,
  ctaTitle,
  ctaSubtitle,
  formTitle,
  nearby = [],
}: Props) {
  const parsed = loadLocationMarkdown(slug)
  if (!parsed) return null
  const { frontmatter, body } = parsed
  const h1 = frontmatter.h1 ?? frontmatter.titleTag ?? slug
  const badge = frontmatter.heroBadge ?? "Local SEO"
  const schema = getJsonLdForPath(`/locations/${slug}`)

  return (
    <>
      {schema ? <JsonLdGraph data={schema} /> : null}
      <main className="min-h-screen">
        <section className="relative py-20 lg:py-28 overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
          <div className="container relative mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-white/90">{badge}</span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-white leading-tight">
                {h1}
              </h1>
              <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                Ranking SB helps local businesses rank on Google with a 90-day guarantee — no long-term
                contracts.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Link href="/free-audit">
                  <Button
                    size="lg"
                    className="gap-2 text-lg px-8 py-6 bg-blue-500 hover:bg-blue-400 text-white shadow-lg shadow-blue-500/25"
                  >
                    <Phone className="w-5 h-5" />
                    Get Free SEO Audit
                  </Button>
                </Link>
                <a href="tel:8053077600">
                  <Button
                    size="lg"
                    variant="outline"
                    className="gap-2 text-lg px-8 py-6 border-white/30 text-white hover:bg-white/10"
                  >
                    Call (805) 307-7600
                  </Button>
                </a>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400">
                {["90-Day Ranking Guarantee", "No Contracts", "Free Audit", "Local 805 Team"].map((t) => (
                  <div key={t} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <ArticleMarkdown markdown={body} />
            </div>
          </div>
        </section>

        {nearby.length > 0 ? (
          <section className="py-12 bg-slate-50 border-t border-slate-100">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-xl font-bold mb-4 text-slate-900">Also serving nearby</h2>
              <div className="flex flex-wrap justify-center gap-2">
                {nearby.map((n) => (
                  <Link key={n.href} href={n.href}>
                    <Badge variant="secondary" className="px-4 py-2 cursor-pointer hover:bg-blue-100">
                      {n.label}
                    </Badge>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <CTASection
          title={ctaTitle}
          subtitle={ctaSubtitle}
          bullets={[
            "Local market analysis",
            "Competitor comparison",
            "Keyword opportunities",
            "Clear 90-day roadmap",
          ]}
          formTitle={formTitle}
        />
      </main>
    </>
  )
}
