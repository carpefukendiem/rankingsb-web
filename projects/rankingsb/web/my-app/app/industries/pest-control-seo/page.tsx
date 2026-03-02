import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Phone, TrendingUp, Users, Search, MapPin, Shield, Star } from "lucide-react"
import Link from "next/link"
import { CTASection } from "@/components/shared/CTASection"

export const metadata: Metadata = {
  title: "SEO for Pest Control Companies Santa Barbara | Rankingsb",
  description: "Get more pest control leads in Santa Barbara and Ventura County. Dominate local search for termites, rodents, ants, bed bugs & more. 90-day ranking guarantee.",
  keywords: ["pest control SEO Santa Barbara", "exterminator SEO Ventura County", "pest control marketing Santa Barbara", "termite company SEO", "pest control leads California"],
}

export default function PestControlSEOPage() {
  return (
    <main className="min-h-screen">
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&h=1080&fit=crop"
            alt="Pest control SEO Santa Barbara"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-green-900/95 via-slate-900/95 to-emerald-900/90" />
        </div>
        <div className="container relative mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
              <Shield className="w-4 h-4 text-green-400" />
              <span className="text-sm text-white/90">Pest Control Industry SEO</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white">
              SEO for Pest Control<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
                Get More Service Calls
              </span>
            </h1>
            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
              When homeowners discover termites or a rodent problem, they search Google immediately.
              Be the first pest control company they call — we make sure of it.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/free-audit">
                <Button size="lg" className="gap-2 text-lg px-8 py-6 bg-green-500 hover:bg-green-400 text-white">
                  <Phone className="w-5 h-5" />
                  Get Free Pest Control SEO Audit
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
              { stat: "90%", label: "of pest control jobs start with a Google search" },
              { stat: "Emergency", label: "searches convert immediately — be #1 when it counts" },
              { stat: "$150+", label: "avg value of a new pest control customer" },
              { stat: "Local 3-Pack", label: "captures 80% of pest control calls in any area" },
            ].map((s, i) => (
              <div key={i}>
                <div className="text-4xl font-bold text-green-600 mb-2">{s.stat}</div>
                <p className="text-sm text-slate-600">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Pest Types We Help You Rank For</Badge>
            <h2 className="text-3xl font-bold mb-4 text-slate-900">Target Every Pest Search in Your Market</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              We build individual landing pages for every pest type and service area — so you capture every search.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {[
              "Termite Inspection & Treatment",
              "Rodent Control (Rats & Mice)",
              "Ant Extermination",
              "Bed Bug Treatment",
              "Cockroach Control",
              "Spider Removal",
              "Wasp & Bee Removal",
              "Gopher & Ground Squirrel Control",
              "Mosquito Control",
              "Flea & Tick Treatment",
              "Wildlife Removal",
              "Commercial Pest Control",
            ].map((pest, i) => (
              <div key={i} className="flex items-center gap-3 p-4 rounded-lg bg-white border border-slate-200">
                <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                <span className="text-sm font-medium text-slate-700">{pest}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge variant="secondary" className="mb-4">Our Pest Control SEO Strategy</Badge>
              <h2 className="text-3xl font-bold mb-4 text-slate-900">How We Generate More Service Calls</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: MapPin,
                  title: "Local Map Pack Domination",
                  desc: "Get into the Google 3-Pack for every pest + city combination in your service area. This is where emergency calls come from."
                },
                {
                  icon: Search,
                  title: "Service + Location Pages",
                  desc: "Dedicated pages for 'termite control Santa Barbara,' 'rodent removal Ventura,' and every other high-value search."
                },
                {
                  icon: Star,
                  title: "Review Management",
                  desc: "Pest control is trust-based. We automate review collection to build a 4.8+ star rating that converts searchers into callers."
                },
                {
                  icon: TrendingUp,
                  title: "Emergency Search Optimization",
                  desc: "Rank for urgent searches ('pest control open now,' 'same day exterminator') that convert at 3x the normal rate."
                },
                {
                  icon: Users,
                  title: "Commercial Lead Generation",
                  desc: "Target restaurants, hotels, apartment complexes, and commercial accounts that need ongoing pest management contracts."
                },
                {
                  icon: Shield,
                  title: "Reputation & Trust Signals",
                  desc: "Showcase licenses, certifications, and guarantees that convert cautious homeowners into confident customers."
                },
              ].map((f, i) => (
                <Card key={i} className="border-0 shadow-md hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-14 h-14 rounded-xl bg-green-100 flex items-center justify-center mb-4">
                      <f.icon className="w-7 h-7 text-green-600" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                    <p className="text-sm text-slate-600">{f.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900">Why Pest Control Companies Lose Online</h2>
              <p className="text-slate-600 mt-4">Common mistakes we fix for pest control companies in Santa Barbara and Ventura County:</p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                "One generic page instead of individual pest service pages",
                "Not listed in Google Maps or incomplete GBP",
                "No reviews or reviews with no responses",
                "Not targeting 'near me' and emergency keywords",
                "Slow website that loses mobile users immediately",
                "Missing service area pages for surrounding cities",
                "No blog content addressing common pest questions",
                "Losing to national chains (Orkin, Terminix) on local searches",
              ].map((issue, i) => (
                <div key={i} className="flex items-center gap-3 p-4 rounded-lg border border-red-200 bg-white">
                  <div className="w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center text-xs font-bold shrink-0">✗</div>
                  <span className="text-sm text-slate-700">{issue}</span>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/free-audit">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white">
                  Audit My Pest Control Website →
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">Service Areas</Badge>
              <h2 className="text-3xl font-bold text-slate-900">Serving Pest Control Companies Across the Region</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                "Santa Barbara", "Goleta", "Montecito", "Carpinteria",
                "Ventura", "Oxnard", "Thousand Oaks", "Camarillo",
                "Simi Valley", "Moorpark", "Ojai", "Santa Paula"
              ].map((city, i) => (
                <div key={i} className="flex items-center gap-2 p-3 rounded-lg bg-slate-50">
                  <MapPin className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-slate-700">{city}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Get More Pest Control Calls From Google"
        subtitle="We'll show you exactly where you're losing to competitors and what it takes to dominate local search in your service area."
        bullets={["Free SEO audit", "Competitor gap analysis", "Service area keyword research", "90-day ranking plan"]}
        formTitle="Free Pest Control SEO Audit"
      />
    </main>
  )
}
