import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Phone, Zap, Shield, Globe, Code2, Smartphone, BarChart3 } from "lucide-react"
import Link from "next/link"
import { CTASection } from "@/components/shared/CTASection"

export const metadata: Metadata = {
  title: "Technical SEO Services Santa Barbara | Rankingsb",
  description: "Fix the technical issues holding your website back from ranking. Expert technical SEO for Santa Barbara and Ventura County businesses.",
  keywords: ["technical SEO Santa Barbara", "website speed optimization", "Core Web Vitals", "site audit Santa Barbara"],
}

export default function TechnicalSEOPage() {
  return (
    <main className="min-h-screen">
      <section className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900/40 to-slate-900">
        <div className="container relative mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
              <Zap className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-white/90">Technical SEO Services</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white">
              Fix the Technical Issues<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                Killing Your Rankings
              </span>
            </h1>
            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
              Slow pages, broken links, missing schema, and crawl errors could be costing you thousands
              in lost leads. We identify and fix every issue.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/free-audit">
                <Button size="lg" className="gap-2 text-lg px-8 py-6 bg-purple-500 hover:bg-purple-400 text-white">
                  <Phone className="w-5 h-5" />
                  Get Free Technical Audit
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
            <Badge variant="secondary" className="mb-4">What We Fix</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">Technical Issues We Resolve</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { icon: Zap, title: "Page Speed", desc: "Optimize Core Web Vitals (LCP, FID, CLS) to meet Google's performance standards and rank higher." },
              { icon: Smartphone, title: "Mobile Optimization", desc: "Ensure your site works perfectly on all devices — Google uses mobile-first indexing." },
              { icon: Code2, title: "Schema Markup", desc: "Add structured data so Google understands your business, services, and location." },
              { icon: Shield, title: "Security (HTTPS)", desc: "Ensure proper SSL/HTTPS configuration — a confirmed Google ranking factor." },
              { icon: Globe, title: "Crawlability", desc: "Fix indexation issues, robots.txt, sitemaps, and crawl errors preventing ranking." },
              { icon: BarChart3, title: "Analytics Setup", desc: "Proper Google Analytics 4 and Search Console configuration for accurate tracking." },
            ].map((f, i) => (
              <Card key={i} className="border-0 shadow-md hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="w-14 h-14 rounded-xl bg-purple-100 flex items-center justify-center mb-4">
                    <f.icon className="w-7 h-7 text-purple-600" />
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
              <h2 className="text-3xl font-bold">Our 50-Point Technical Audit</h2>
              <p className="text-slate-400 mt-4">We check every technical factor that affects your Google rankings</p>
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              {[
                "Core Web Vitals (LCP, FID, CLS)",
                "Page loading speed (desktop & mobile)",
                "Mobile usability issues",
                "HTTPS / SSL certificate status",
                "XML sitemap presence & validity",
                "Robots.txt configuration",
                "Canonical tag implementation",
                "Duplicate content detection",
                "Broken links (internal & external)",
                "404 error pages",
                "301/302 redirect chains",
                "Image optimization & alt text",
                "Schema markup (LocalBusiness, Service, FAQ)",
                "Meta title & description completeness",
                "Header tag structure (H1, H2, H3)",
                "Google Analytics 4 setup",
                "Google Search Console verification",
                "Google Business Profile linking",
                "Crawl depth & internal linking",
                "Structured data validation",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 py-2 border-b border-slate-800 last:border-0">
                  <CheckCircle className="w-4 h-4 text-purple-400 shrink-0" />
                  <span className="text-slate-300 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Find What's Holding Your Site Back"
        subtitle="Get a complete technical SEO audit identifying every issue preventing your site from ranking — with a prioritized action plan."
        bullets={["50-point technical audit", "Prioritized fix list", "Speed optimization plan", "Schema markup strategy"]}
        formTitle="Free Technical Audit"
      />
    </main>
  )
}
