import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Phone, MapPin, Star, TrendingUp, Building2, Users } from "lucide-react"
import Link from "next/link"
import { CTASection } from "@/components/shared/CTASection"

export const metadata: Metadata = {
  title: "SEO Services Oxnard CA | Local SEO Oxnard | Rankingsb",
  description: "Expert local SEO for Oxnard, CA. Get your Oxnard business to page 1 of Google in 90 days. Free SEO audit for Ventura County businesses.",
  keywords: ["SEO Oxnard", "local SEO Oxnard CA", "SEO company Oxnard", "digital marketing Oxnard", "Google ranking Oxnard California"],
  openGraph: {
    title: "SEO Services Oxnard CA | Rankingsb",
    description: "Get your Oxnard business to page 1. Expert local SEO with a 90-day ranking guarantee.",
    type: "website",
  },
}

export default function OxnardSEOPage() {
  return (
    <main className="min-h-screen">
      <section className="relative py-20 lg:py-28 overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="container relative mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
              <MapPin className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-white/90">Serving Oxnard, Ventura County</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white">
              SEO Services Oxnard<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Rank #1 on Google
              </span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Oxnard businesses trust Rankingsb to dominate local search. We know  — and we use that
              local knowledge to get you ranked where customers can find you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/free-audit">
                <Button size="lg" className="gap-2 text-lg px-8 py-6 bg-blue-500 hover:bg-blue-400 text-white shadow-lg shadow-blue-500/25">
                  <Phone className="w-5 h-5" />
                  Get Free SEO Audit
                </Button>
              </Link>
              <a href="tel:8053077600">
                <Button size="lg" variant="outline" className="gap-2 text-lg px-8 py-6 border-white/30 text-white hover:bg-white/10">
                  Call (805) 307-7600
                </Button>
              </a>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400">
              {["90-Day Ranking Guarantee", "No Contracts", "Free Audit", "Local 805 Team"].map(t => (
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

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <Badge variant="secondary" className="mb-4">The Oxnard Market</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
              Why Oxnard Businesses Need Local SEO
            </h2>
            <p className="text-xl text-slate-600">
              Oxnard is home to . Local SEO ensures your business captures customers
              searching for your services right here in Oxnard.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { stat: "207,000+", desc: "residents making Oxnard Ventura's largest city", icon: Users },
              { stat: "91%", desc: "of customers never scroll past page 1 of Google", icon: TrendingUp },
              { stat: "Top 3", desc: "positions get 68% of all local search clicks", icon: Building2 },
            ].map((item, i) => (
              <Card key={i} className="border-0 shadow-lg text-center py-8">
                <CardContent>
                  <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold text-slate-900 mb-2">{item.stat}</div>
                  <p className="text-slate-600 text-sm">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <Badge variant="secondary" className="mb-4">Local SEO Services</Badge>
            <h2 className="text-3xl font-bold mb-4">What We Do for Oxnard Businesses</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {[
              "Google Business Profile optimization",
              "Local keyword research & targeting",
              "On-page SEO for Oxnard searches",
              "Citation building (40+ directories)",
              "Review generation campaigns",
              "Technical SEO audit & fixes",
              "Content creation for local searches",
              "Competitor analysis & tracking",
              "Monthly ranking & traffic reports",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-4 rounded-lg bg-white border border-slate-100 shadow-sm">
                <CheckCircle className="w-5 h-5 text-blue-500 shrink-0" />
                <span className="text-sm text-slate-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Oxnard Client Results</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { quote: "We now rank for every service keyword in Oxnard. Leads doubled in 90 days.", author: "Local Business Owner", business: "Oxnard construction company", result: "Page 1 in 90 days" },
              { quote: "The free audit showed us 12 issues we didn't know about. All fixed in 30 days.", author: "Local Business Owner 2", business: "Oxnard Service Company", result: "300% traffic increase" },
              { quote: "Professional team that actually knows the Oxnard market inside and out.", author: "Local Business Owner 3", business: "Oxnard Local Business", result: "#1 for main keyword" },
            ].map((t, i) => (
              <Card key={i} className="border-0 bg-white/10 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="flex gap-1 mb-4">{[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}</div>
                  <p className="text-blue-100 mb-6 italic">"{t.quote}"</p>
                  <div className="border-t border-white/20 pt-4">
                    <p className="font-semibold">{t.author}</p>
                    <p className="text-sm text-blue-200">{t.business}</p>
                    <Badge className="mt-2 bg-green-500 text-white border-0 text-xs">{t.result}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Also Serving Nearby Areas</h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Link key="/locations/ventura-seo" href="/locations/ventura-seo"><Badge variant="secondary" className="px-4 py-2 cursor-pointer hover:bg-blue-100">Ventura</Badge></Link>
            <Link key="/locations/camarillo-seo" href="/locations/camarillo-seo"><Badge variant="secondary" className="px-4 py-2 cursor-pointer hover:bg-blue-100">Camarillo</Badge></Link>
            <Link key="/locations/thousand-oaks-seo" href="/locations/thousand-oaks-seo"><Badge variant="secondary" className="px-4 py-2 cursor-pointer hover:bg-blue-100">Thousand Oaks</Badge></Link>
          </div>
        </div>
      </section>

      <CTASection
        title="Get Your Free Oxnard SEO Audit"
        subtitle="Find out exactly why your Oxnard competitors outrank you and get a clear roadmap to page 1."
        bullets={["Complete Oxnard market analysis", "Competitor ranking comparison", "Keyword opportunity report", "90-day action plan"]}
        formTitle="Free Oxnard SEO Audit"
      />
    </main>
  )
}
