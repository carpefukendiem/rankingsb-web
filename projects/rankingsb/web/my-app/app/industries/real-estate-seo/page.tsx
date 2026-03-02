import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Phone, Home, TrendingUp, MapPin, DollarSign, Users, Star } from "lucide-react"
import Link from "next/link"
import { CTASection } from "@/components/shared/CTASection"

export const metadata: Metadata = {
  title: "Real Estate SEO Santa Barbara & Ventura County | Rankingsb",
  description: "SEO for real estate agents and brokerages in Santa Barbara, Montecito, and Ventura County. Rank for luxury property searches and attract qualified buyers.",
  keywords: ["real estate SEO Santa Barbara", "realtor SEO", "real estate marketing Santa Barbara", "luxury real estate SEO Montecito"],
}

export default function RealEstateSEOPage() {
  return (
    <main className="min-h-screen">
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1920&h=1080&fit=crop"
            alt="Luxury real estate Santa Barbara"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/96 via-slate-800/93 to-blue-900/95" />
        </div>
        <div className="container relative mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
              <Home className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-white/90">Real Estate SEO · Santa Barbara & Ventura County</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white">
              Real Estate SEO<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Santa Barbara & Montecito
              </span>
            </h1>
            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
              In one of California's most competitive luxury real estate markets, visibility is everything.
              We help Santa Barbara and Ventura County agents and brokerages rank for the keywords
              that attract qualified buyers and sellers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/free-audit">
                <Button size="lg" className="gap-2 text-lg px-8 py-6 bg-blue-500 hover:bg-blue-400 text-white shadow-lg shadow-blue-500/25">
                  <Phone className="w-5 h-5" />
                  Get Free Real Estate SEO Audit
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

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
            {[
              { stat: "#2", label: "Santa Barbara ranks among most expensive CA real estate markets" },
              { stat: "$2M+", label: "Average Montecito home price — buyers Google everything first" },
              { stat: "89%", label: "of homebuyers start their search online" },
              { stat: "72%", label: "of buyers contact the first agent they find online" },
            ].map((s, i) => (
              <div key={i}>
                <div className="text-3xl font-bold text-blue-600 mb-2">{s.stat}</div>
                <p className="text-xs text-slate-600">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">What We Target</Badge>
            <h2 className="text-3xl font-bold mb-4 text-slate-900">Real Estate Keywords That Matter</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">We focus on the searches your ideal clients make — not vanity keywords.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {[
              "homes for sale Santa Barbara",
              "luxury real estate Montecito",
              "real estate agent Santa Barbara",
              "Santa Barbara real estate",
              "Montecito homes for sale",
              "condos for sale Santa Barbara",
              "Santa Barbara beachfront homes",
              "homes for sale Goleta CA",
              "real estate Ventura County",
              "Thousand Oaks homes for sale",
              "best realtor Santa Barbara",
              "Santa Barbara real estate investment",
            ].map((kw, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-white border border-slate-200">
                <div className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                <span className="text-sm font-medium text-slate-700">"{kw}"</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Our Strategy</Badge>
            <h2 className="text-3xl font-bold mb-4 text-slate-900">Real Estate SEO Services</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { icon: MapPin, title: "Neighborhood Pages", desc: "Individual pages targeting every Santa Barbara neighborhood and Ventura County city — each optimized to rank." },
              { icon: Home, title: "Property Type Content", desc: "Targeted pages for luxury estates, condos, beach homes, wine country ranches, and investment properties." },
              { icon: TrendingUp, title: "Google Business Profile", desc: "Optimized local profile that ranks you when buyers search 'realtor near me' in Santa Barbara." },
              { icon: Users, title: "Seller & Buyer Content", desc: "Separate content funnels for sellers and buyers — addressing their specific questions and concerns." },
              { icon: DollarSign, title: "Market Report Content", desc: "Monthly market updates that rank for local real estate searches and position you as the area expert." },
              { icon: Star, title: "Review Building", desc: "Systematic approach to generating client reviews on Google, Zillow, and Realtor.com." },
            ].map((f, i) => (
              <Card key={i} className="border-0 shadow-md hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
                    <f.icon className="w-7 h-7 text-blue-600" />
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
        title="Dominate Santa Barbara Real Estate Search"
        subtitle="Find out which real estate keywords your competitors rank for and get a strategy to capture those leads."
        bullets={["Real estate keyword audit", "Competitor agent analysis", "Neighborhood page strategy", "Lead generation plan"]}
        formTitle="Free Real Estate SEO Audit"
      />
    </main>
  )
}
