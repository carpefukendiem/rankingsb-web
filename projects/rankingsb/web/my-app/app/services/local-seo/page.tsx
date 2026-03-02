import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Phone, MapPin, TrendingUp, Star, Search, Globe, Users, BarChart3, ArrowRight } from "lucide-react"
import Link from "next/link"
import { CTASection } from "@/components/shared/CTASection"

export const metadata: Metadata = {
  title: "Local SEO Services Santa Barbara & Ventura County | Rankingsb",
  description: "Dominate local Google search results in Santa Barbara and Ventura County. Our local SEO services get your business to page 1 in 90 days. Free audit included.",
  keywords: ["local SEO Santa Barbara", "local SEO services", "local search optimization", "Google Maps SEO Santa Barbara", "local SEO agency"],
}

const steps = [
  { step: "01", title: "Free SEO Audit", desc: "We analyze your current rankings, website health, and competitors to find your biggest opportunities." },
  { step: "02", title: "Keyword Strategy", desc: "We identify the exact search terms your customers use to find businesses like yours in Santa Barbara and Ventura County." },
  { step: "03", title: "On-Page Optimization", desc: "We optimize your website pages, meta titles, content, and schema markup to signal local relevance to Google." },
  { step: "04", title: "Local Signals", desc: "Citations, Google Business Profile, and local link building to build authority in your service area." },
  { step: "05", title: "Track & Report", desc: "Monthly reporting showing ranking improvements, traffic gains, and leads generated." },
]

const benefits = [
  { icon: MapPin, title: "Google Maps Dominance", desc: "Rank in the Google 3-Pack for local searches — the top position for high-intent buyers." },
  { icon: Search, title: "Organic Search Rankings", desc: "Rank on page 1 for the keywords your customers search when they need your service." },
  { icon: Users, title: "More Qualified Leads", desc: "Local SEO attracts people already searching for your service in your area — ready to buy." },
  { icon: TrendingUp, title: "Long-Term ROI", desc: "Unlike paid ads, organic rankings keep delivering leads 24/7 without ongoing ad spend." },
  { icon: Star, title: "Review Authority", desc: "Build a 5-star reputation that boosts rankings and converts searchers into customers." },
  { icon: Globe, title: "Multi-Location Coverage", desc: "Rank across all cities in Santa Barbara and Ventura Counties you want to target." },
]

export default function LocalSEOPage() {
  return (
    <main className="min-h-screen">
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&h=1080&fit=crop"
            alt="Local SEO Santa Barbara"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-blue-900/90 to-slate-900/95" />
        </div>
        <div className="container relative mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
              <MapPin className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-white/90">Santa Barbara & Ventura County Local SEO</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white">
              Local SEO Services<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                That Get You Ranked
              </span>
            </h1>
            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
              We help local businesses in Santa Barbara and Ventura County dominate Google search and Maps.
              90-day ranking guarantee — or we work for free.
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
            <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-400">
              {["90-Day Guarantee", "No Contracts", "Local SB Team", "Free Audit"].map((t) => (
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

      {/* Stats */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
            {[
              { stat: "91%", label: "of customers never scroll past page 1" },
              { stat: "46%", label: "of all Google searches are local" },
              { stat: "3x", label: "more leads from local SEO vs paid ads" },
              { stat: "90", label: "days to page 1 — guaranteed" },
            ].map((s, i) => (
              <div key={i}>
                <div className="text-4xl font-bold text-blue-600 mb-2">{s.stat}</div>
                <p className="text-sm text-slate-600">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Why Local SEO</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">What Local SEO Does for Your Business</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              When someone searches "plumber near me" or "best dentist Santa Barbara," local SEO determines who they call.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {benefits.map((b, i) => (
              <Card key={i} className="border-0 shadow-md hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
                    <b.icon className="w-7 h-7 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{b.title}</h3>
                  <p className="text-sm text-slate-600">{b.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Our Process</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">How We Get You to Page 1</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">A proven, systematic approach built specifically for local businesses in Santa Barbara and Ventura County.</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {steps.map((s, i) => (
                <div key={i} className="flex gap-6 items-start">
                  <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold text-lg shrink-0">
                    {s.step}
                  </div>
                  <div className="pt-1">
                    <h3 className="text-xl font-bold mb-2 text-slate-900">{s.title}</h3>
                    <p className="text-slate-600">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-500 text-white border-0">What's Included</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Full-Service Local SEO Package</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {[
              "Google Business Profile optimization & posting",
              "On-page SEO for all service pages",
              "Local keyword research & targeting",
              "Citation building & cleanup (40+ directories)",
              "Monthly review generation campaigns",
              "Technical SEO audit & fixes",
              "Schema markup implementation",
              "Competitor analysis & tracking",
              "Local link building & outreach",
              "Monthly ranking & traffic reports",
              "Dedicated account manager",
              "Bi-monthly strategy calls",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 py-3 border-b border-slate-800 last:border-0">
                <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
                <span className="text-slate-300">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Local SEO Service Areas</h2>
          <p className="text-slate-600 mb-8">We serve businesses across Santa Barbara and Ventura Counties</p>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {["Santa Barbara", "Goleta", "Montecito", "Carpinteria", "Solvang", "Santa Ynez", "Ventura", "Oxnard", "Thousand Oaks", "Camarillo", "Moorpark", "Ojai", "Simi Valley", "Santa Paula"].map((city) => (
              <Badge key={city} variant="outline" className="px-4 py-2 text-sm hover:bg-blue-50">{city}</Badge>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Get Your Free Local SEO Audit"
        subtitle="Find out exactly why your competitors are outranking you and get a clear roadmap to dominate local search in Santa Barbara and Ventura County."
      />
    </main>
  )
}
