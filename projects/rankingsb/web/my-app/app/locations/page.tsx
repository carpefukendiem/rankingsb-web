import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, ArrowRight, CheckCircle } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "SEO Services Santa Barbara & Ventura County | All Locations | Rankingsb",
  description: "Local SEO services for every city in Santa Barbara and Ventura Counties. From Santa Barbara to Oxnard to Thousand Oaks — we help local businesses rank.",
  keywords: ["SEO services Santa Barbara County", "SEO Ventura County", "local SEO 805", "digital marketing Santa Barbara Ventura"],
}

const sbCounty = [
  { href: "/locations/santa-barbara-seo", city: "Santa Barbara", desc: "The 805's premier city — State Street, Funk Zone, and beyond" },
  { href: "/locations/goleta-seo", city: "Goleta", desc: "UCSB campus city with tech, retail, and service businesses" },
  { href: "/locations/montecito-seo", city: "Montecito", desc: "Luxury community — celebrity clientele, high-end services" },
  { href: "/locations/carpinteria-seo", city: "Carpinteria", desc: "Beach community with agriculture and tourism economy" },
  { href: "/locations/solvang-seo", city: "Solvang", desc: "Danish village and wine country tourism destination" },
  { href: "/locations/santa-ynez-seo", city: "Santa Ynez", desc: "Wine country hub with 100+ nearby wineries" },
  { href: "/locations/lompoc-seo", city: "Lompoc", desc: "Flower field city and aerospace community" },
  { href: "/locations/summerland-seo", city: "Summerland", desc: "Small affluent beach community with antiques and boutiques" },
  { href: "/locations/isla-vista-seo", city: "Isla Vista", desc: "UC Santa Barbara university community" },
]

const venturaCounty = [
  { href: "/locations/ventura-county-seo", city: "Ventura County", desc: "Overview page for all of Ventura County" },
  { href: "/locations/ventura-seo", city: "Ventura", desc: "Coastal city with tourism, dining, and professional services" },
  { href: "/locations/oxnard-seo", city: "Oxnard", desc: "Ventura's largest city — harbor, agriculture, diverse market" },
  { href: "/locations/thousand-oaks-seo", city: "Thousand Oaks", desc: "Affluent Conejo Valley — professional services, home services" },
  { href: "/locations/camarillo-seo", city: "Camarillo", desc: "Tech and aerospace hub with growing healthcare market" },
  { href: "/locations/moorpark-seo", city: "Moorpark", desc: "Suburban community with strong home services demand" },
  { href: "/locations/simi-valley-seo", city: "Simi Valley", desc: "Large suburban city with diverse service business market" },
  { href: "/locations/ojai-seo", city: "Ojai", desc: "Wellness tourism destination with boutique economy" },
  { href: "/locations/santa-paula-seo", city: "Santa Paula", desc: "Historic citrus city with growing small business community" },
  { href: "/locations/newbury-park-seo", city: "Newbury Park", desc: "Affluent Thousand Oaks neighborhood" },
]

export default function LocationsPage() {
  return (
    <main className="min-h-screen">
      <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
            <MapPin className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-white/90">Serving Santa Barbara & Ventura Counties</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Local SEO for Every<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              805 Business
            </span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-8">
            From Santa Barbara to Simi Valley, we help local businesses in every corner
            of the 805 dominate Google search and get more customers.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-400">
            {["Santa Barbara County", "Ventura County", "19+ Cities", "90-Day Guarantee"].map(t => (
              <div key={t} className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Santa Barbara County */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-12">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <Badge variant="secondary" className="mb-1">Santa Barbara County</Badge>
                <h2 className="text-3xl font-bold text-slate-900">Santa Barbara County SEO</h2>
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sbCounty.map((loc, i) => (
                <Link key={i} href={loc.href}>
                  <Card className="border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all group">
                    <CardContent className="p-5 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-blue-50 group-hover:bg-blue-100 flex items-center justify-center shrink-0 transition-colors">
                        <MapPin className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{loc.city}</p>
                        <p className="text-xs text-slate-500 truncate">{loc.desc}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-500 shrink-0 transition-colors" />
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Ventura County */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-12">
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <Badge variant="secondary" className="mb-1">Ventura County</Badge>
                <h2 className="text-3xl font-bold text-slate-900">Ventura County SEO</h2>
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {venturaCounty.map((loc, i) => (
                <Link key={i} href={loc.href}>
                  <Card className="border border-slate-200 hover:border-purple-300 hover:shadow-lg transition-all group">
                    <CardContent className="p-5 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-purple-50 group-hover:bg-purple-100 flex items-center justify-center shrink-0 transition-colors">
                        <MapPin className="w-5 h-5 text-purple-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-slate-900 group-hover:text-purple-600 transition-colors">{loc.city}</p>
                        <p className="text-xs text-slate-500 truncate">{loc.desc}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-purple-500 shrink-0 transition-colors" />
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Don't See Your City?</h2>
          <p className="text-blue-100 mb-6">We serve all communities in Santa Barbara and Ventura Counties. Call us to discuss your specific area.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:8053077600">
              <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50">
                <Phone className="w-5 h-5 mr-2" />
                Call (805) 307-7600
              </Button>
            </a>
            <Link href="/free-audit">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Get Free Audit
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
