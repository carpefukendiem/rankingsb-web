import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Phone, FileText, TrendingUp, Users, Search, Pen, BarChart3, MapPin } from "lucide-react"
import Link from "next/link"
import { CTASection } from "@/components/shared/CTASection"

export const metadata: Metadata = {
  title: "Content Marketing Services Santa Barbara | Rankingsb",
  description: "SEO-driven content marketing that ranks and converts. Blog posts, service pages, and local content for Santa Barbara and Ventura County businesses.",
  keywords: ["content marketing Santa Barbara", "SEO content writing", "local content strategy", "blog SEO Santa Barbara"],
}

export default function ContentMarketingPage() {
  return (
    <main className="min-h-screen">
      <section className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-900/40 to-slate-900">
        <div className="container relative mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
              <FileText className="w-4 h-4 text-indigo-400" />
              <span className="text-sm text-white/90">Content Marketing & SEO Writing</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white">
              Content That Ranks<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                and Converts
              </span>
            </h1>
            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
              High-quality, locally-optimized content that attracts Santa Barbara and Ventura County
              customers organically — and positions you as the expert in your industry.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/free-audit">
                <Button size="lg" className="gap-2 text-lg px-8 py-6 bg-indigo-500 hover:bg-indigo-400 text-white">
                  <Phone className="w-5 h-5" />
                  Get Content Strategy
                </Button>
              </Link>
              <a href="tel:8053077600">
                <Button size="lg" variant="outline" className="gap-2 text-lg px-8 py-6 border-white/30 text-white hover:bg-white/10">
                  Call (805) 307-7600
                </Button>
              </a>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">What We Create</Badge>
            <h2 className="text-3xl font-bold mb-4 text-slate-900">Content That Works</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { icon: FileText, title: "Blog Posts", desc: "SEO-optimized articles targeting local keywords that attract customers actively searching for your services." },
              { icon: Search, title: "Service Pages", desc: "Conversion-focused service pages that rank for high-intent local keywords and turn visitors into leads." },
              { icon: MapPin, title: "Location Pages", desc: "City and neighborhood pages that help you rank in every area of Santa Barbara and Ventura County." },
              { icon: Pen, title: "FAQ Content", desc: "Answer the questions your customers are actually searching for to rank in featured snippets." },
              { icon: Users, title: "Case Studies", desc: "Compelling client success stories that build trust and convert skeptical prospects." },
              { icon: TrendingUp, title: "Content Strategy", desc: "Keyword research and content calendar planning to systematically expand your organic reach." },
            ].map((f, i) => (
              <Card key={i} className="border-0 shadow-md hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="w-14 h-14 rounded-xl bg-indigo-100 flex items-center justify-center mb-4">
                    <f.icon className="w-7 h-7 text-indigo-600" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                  <p className="text-sm text-slate-600">{f.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">Our Content Process</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { step: "1", title: "Keyword Research", desc: "We find the exact search terms your ideal customers use when looking for businesses like yours in Santa Barbara and Ventura County." },
                { step: "2", title: "Content Brief", desc: "Every piece of content is planned with a clear goal, target keyword, and outline optimized for the specific search intent." },
                { step: "3", title: "Expert Writing", desc: "Content is written by SEO specialists who understand your industry and how to communicate with local Santa Barbara customers." },
                { step: "4", title: "On-Page Optimization", desc: "Every page is optimized for schema markup, meta data, header structure, internal links, and local relevance signals." },
              ].map((s, i) => (
                <div key={i} className="flex gap-4 p-6 rounded-xl bg-slate-800">
                  <div className="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold shrink-0">{s.step}</div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">{s.title}</h3>
                    <p className="text-slate-400 text-sm">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Build Your Content Authority"
        subtitle="Get a free content audit and strategy showing which keywords you should target to dominate local search in Santa Barbara and Ventura County."
        bullets={["Content gap analysis", "Competitor content audit", "Target keyword list", "3-month content calendar"]}
        formTitle="Free Content Strategy"
      />
    </main>
  )
}
