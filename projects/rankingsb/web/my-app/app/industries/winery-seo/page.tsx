import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Phone, Star, MapPin, TrendingUp, Users, Globe, Camera } from "lucide-react"
import Link from "next/link"
import { CTASection } from "@/components/shared/CTASection"

export const metadata: Metadata = {
  title: "Winery & Wine Bar SEO Santa Barbara Wine Country | Rankingsb",
  description: "SEO for wineries, tasting rooms, and wine bars in Santa Ynez Valley and Santa Barbara County. Attract more visitors and wine club members online.",
  keywords: ["winery SEO Santa Barbara", "wine country marketing", "Santa Ynez Valley winery marketing", "tasting room SEO", "wine bar marketing Santa Barbara"],
}

export default function WinerySEOPage() {
  return (
    <main className="min-h-screen">
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1920&h=1080&fit=crop"
            alt="Santa Barbara wine country winery"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-purple-900/85 to-slate-900/95" />
        </div>
        <div className="container relative mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
              <Star className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-white/90">Winery & Wine Bar SEO · Santa Barbara Wine Country</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white">
              Winery SEO for<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                Santa Ynez Valley
              </span>
            </h1>
            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
              Santa Barbara wine country attracts millions of visitors searching Google before every trip.
              We help wineries and tasting rooms rank first — attracting more visitors, wine club sign-ups,
              and event bookings.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/free-audit">
                <Button size="lg" className="gap-2 text-lg px-8 py-6 bg-purple-500 hover:bg-purple-400 text-white">
                  <Phone className="w-5 h-5" />
                  Get Free Winery SEO Audit
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
              { stat: "1.5M+", label: "annual visitors to Santa Barbara wine country" },
              { stat: "100+", label: "wineries competing in Santa Ynez Valley" },
              { stat: "78%", label: "of wine tourists plan visits using Google" },
              { stat: "#1", label: "on Google = 10x more tasting room visits" },
            ].map((s, i) => (
              <div key={i}>
                <div className="text-3xl font-bold text-purple-600 mb-2">{s.stat}</div>
                <p className="text-xs text-slate-600">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Winery SEO Strategy</Badge>
            <h2 className="text-3xl font-bold mb-4 text-slate-900">How We Market Santa Barbara Wineries</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { icon: Globe, title: "Google Maps Ranking", desc: "Rank in the top 3 when tourists search 'wineries near me' or 'wine tasting Santa Ynez Valley.'" },
              { icon: Camera, title: "Visual SEO", desc: "Optimize photos for Google's visual search — often the #1 way tourists discover new wineries." },
              { icon: Users, title: "Wine Club Growth", desc: "Content strategies targeting wine club searches to attract recurring revenue members." },
              { icon: MapPin, title: "Tour & Event Pages", desc: "SEO-optimized pages for wine tours, private events, and tasting experiences that rank for high-intent searches." },
              { icon: Star, title: "Review Management", desc: "Build a 4.8+ star reputation on Google, Yelp, and TripAdvisor to become the #1 choice for wine tourists." },
              { icon: TrendingUp, title: "Seasonal Content", desc: "Harvest season, wine pairing guides, and holiday content that captures peak tourist traffic." },
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

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">Keywords We Target for Wineries</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              {[
                "wine tasting Santa Barbara",
                "wineries Santa Ynez Valley",
                "wine tasting Solvang",
                "best wineries Santa Barbara County",
                "wine tour Santa Barbara",
                "tasting room Buellton",
                "wine club Santa Barbara",
                "private wine tasting Santa Barbara",
                "wine country wedding venue Santa Barbara",
                "Santa Barbara wine country day trip",
                "Foxen Canyon wine trail",
                "Los Olivos wine tasting",
              ].map((kw, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-purple-50 border border-purple-100">
                  <div className="w-2 h-2 rounded-full bg-purple-500 shrink-0" />
                  <span className="text-sm font-medium text-slate-700">"{kw}"</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Get More Wine Country Visitors"
        subtitle="Find out which wineries outrank you and get a strategy to capture more tasting room visits, wine club members, and event bookings."
        bullets={["Winery SEO audit", "Competitor winery analysis", "Tourist keyword research", "Wine club growth strategy"]}
        formTitle="Free Winery SEO Audit"
      />
    </main>
  )
}
