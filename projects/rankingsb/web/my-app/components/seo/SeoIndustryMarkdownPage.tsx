import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Phone } from "lucide-react"
import { CTASection } from "@/components/shared/CTASection"
import { ArticleMarkdown } from "@/components/seo/ArticleMarkdown"
import { JsonLdGraph } from "@/components/seo/JsonLdGraph"
import { loadIndustryMarkdown } from "@/lib/load-seo-markdown"
import { getJsonLdForPath } from "@/lib/seo-graph"
import { cn } from "@/lib/utils"

type Props = {
  slug: string
  heroGradientClass: string
  ctaTitle: string
  ctaSubtitle: string
  formTitle: string
}

export function SeoIndustryMarkdownPage({
  slug,
  heroGradientClass,
  ctaTitle,
  ctaSubtitle,
  formTitle,
}: Props) {
  const parsed = loadIndustryMarkdown(slug)
  if (!parsed) {
    return null
  }
  const { frontmatter, body } = parsed
  const h1 = frontmatter.h1 ?? frontmatter.titleTag ?? slug
  const badge = frontmatter.heroBadge ?? "Industry SEO"
  const schema = getJsonLdForPath(`/industries/${slug}`)

  return (
    <>
      {schema ? <JsonLdGraph data={schema} /> : null}
      <main className="min-h-screen">
        <section
          className={cn(
            "relative py-20 lg:py-32 overflow-hidden bg-gradient-to-br",
            heroGradientClass
          )}
        >
          <div className="container relative mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
                <span className="text-sm text-white/90">{badge}</span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-white leading-tight">
                {h1}
              </h1>
              <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
                Local SEO that ranks you in the Google Local Pack and turns searches into leads.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/free-audit">
                  <Button
                    size="lg"
                    className="gap-2 text-lg px-8 py-6 bg-blue-500 hover:bg-blue-400 text-white"
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

        <CTASection
          title={ctaTitle}
          subtitle={ctaSubtitle}
          bullets={[
            "Current ranking snapshot",
            "Competitor comparison",
            "Keyword opportunities",
            "90-day action plan",
          ]}
          formTitle={formTitle}
        />
      </main>
    </>
  )
}
