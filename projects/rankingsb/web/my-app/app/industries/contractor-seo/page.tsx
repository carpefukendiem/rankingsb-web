import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Phone, Hammer, TrendingUp, Star, MapPin, Shield, DollarSign } from "lucide-react"
import Link from "next/link"
import { CTASection } from "@/components/shared/CTASection"

export const metadata: Metadata = {
  title: "Contractor SEO Santa Barbara & Ventura County | Rankingsb",
  description: "SEO for general contractors, remodelers, and home builders in Santa Barbara and Ventura County. Get more high-value project leads from Google.",
  keywords: ["contractor SEO Santa Barbara", "general contractor marketing", "remodeling leads Santa Barbara", "home contractor SEO Ventura County"],
}

export default function ContractorSEOPage() {
  return (
    <main className="min-h-screen">
      <section className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-slate-900 via-orange-900/30 to-slate-900">
        <div className="container relative mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
              <Hammer className="w-4 h-4 text-orange-400" />
              <span className="text-sm text-white/90">General Contractor SEO · Santa Barbara & Ventura County</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white">
              Contractor SEO That<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">
                Fills Your Pipeline
              </span>
            </h1>
            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
              Homeowners in Santa Barbara and Ventura County are searching Google for contractors right now.
              We'll make sure they find you — not your competition.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/free-audit">
                <Button size="lg" className="gap-2 text-lg px-8 py-6 bg-orange-500 hover:bg-orange-400 text-white">
                  <Phone className="w-5 h-5" />
                  Get Free Contractor SEO Audit
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
            <Badge variant="secondary" className="mb-4">Contractor Types We Serve</Badge>
            <h2 className="text-3xl font-bold mb-4">SEO for All Contractor Types</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {["General Contractors", "Kitchen Remodelers", "Bathroom Remodelers", "Home Builders", "ADU Builders", "Room Additions", "Foundation Repair", "Deck & Patio Builders", "Fence Installers", "Flooring Contractors", "Painting Contractors", "Tile & Stone", "Cabinet Makers", "Window & Door", "Waterproofing"].map(type => (
              <Badge key={type} variant="outline" className="px-4 py-2 text-sm hover:bg-orange-50">{type}</Badge>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Why Contractors Need SEO</Badge>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { icon: DollarSign, title: "High-Value Projects", desc: "Santa Barbara homeowners search for contractors before $10k-$500k+ projects. Page 1 = getting those calls." },
              { icon: MapPin, title: "Service Area Targeting", desc: "We target searches in your specific service cities — from Montecito to Thousand Oaks — so you get qualified local leads." },
              { icon: Star, title: "Contractor Reviews", desc: "Build a strong review profile on Google, Yelp, Houzz, and HomeAdvisor that converts shoppers into callers." },
              { icon: Shield, title: "License & Trust Signals", desc: "Highlight your license, insurance, and certifications in a way that builds trust and satisfies Google's E-E-A-T standards." },
              { icon: TrendingUp, title: "Project Portfolio", desc: "SEO-optimized before/after project galleries that rank for 'kitchen remodel Santa Barbara'-type searches." },
              { icon: Hammer, title: "Google Local Services Ads", desc: "The Google Guaranteed badge puts you above all other contractors in local search results for immediate leads." },
            ].map((f, i) => (
              <Card key={i} className="border-0 shadow-md hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="w-14 h-14 rounded-xl bg-orange-100 flex items-center justify-center mb-4">
                    <f.icon className="w-7 h-7 text-orange-600" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                  <p className="text-sm text-slate-600">{f.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Fill Your Project Pipeline with SEO"
        subtitle="Get a free contractor SEO audit and see how to rank for the high-value project searches homeowners make in Santa Barbara and Ventura County."
        bullets={["Current ranking analysis", "Competitor contractor audit", "High-value keyword list", "Lead generation strategy"]}
        formTitle="Free Contractor SEO Audit"
      />
    </main>
  )
}
