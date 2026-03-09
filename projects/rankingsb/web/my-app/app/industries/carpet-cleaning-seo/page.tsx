import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Phone, ArrowRight, Sparkles, Home, Shield, TrendingUp } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Carpet Cleaning SEO Santa Barbara | Rankingsb",
  description: "Get more carpet cleaning bookings with local SEO. Santa Barbara carpet cleaners rank #1 on Google.",
}

export default function CarpetCleaningSEOPage() {
  return (
    <main className="min-h-screen">
      <section className="relative py-20 lg:py-28 overflow-hidden bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900">
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&auto=format&fit=crop&q=70"
          alt="carpet cleaning professionals"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          loading="eager"
        />
        <div className="absolute inset-0 bg-slate-900/60" />
        <div className="container relative mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span className="text-sm text-white/90">For Santa Barbara Carpet Cleaners</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white">
              Fresh Leads for<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
                Fresh Carpets
              </span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Homeowners searching for carpet cleaning in Santa Barbara call the 
              business they find first. Be that business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/free-audit">
                <Button size="lg" className="gap-2 text-lg px-8 py-6 bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/25">
                <Phone className="w-5 h-5" />
                Get Free SEO Audit
              </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <Badge variant="secondary" className="mb-4">Spring Cleaning Rush</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
              The Phone Rings When You're Visible
            </h2>
            <p className="text-xl text-slate-600">
              Spring and fall are peak carpet cleaning seasons. When homeowners 
              search "carpet cleaning near me," they book with who they find first.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { stat: "$200", desc: "average carpet cleaning service ticket" },
              { stat: "3x/yr", desc: "average customer books multiple times" },
              { stat: "65%", desc: "book the first company they find" },
            ].map((item, i) => (
              <Card key={i} className="border-0 shadow-lg text-center">
                <CardContent className="p-8">
                  <div className="text-4xl font-bold text-emerald-600 mb-2">{item.stat}</div>
                  <p className="text-slate-600">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <Badge variant="secondary" className="mb-4">Carpet Cleaning SEO</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Local SEO for Carpet Cleaning Companies
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { icon: Home, title: "Home Services", desc: "Target 'residential carpet cleaning' and 'home carpet cleaners'" },
              { icon: Sparkles, title: "Deep Cleaning", desc: "Rank for 'deep carpet cleaning' and 'steam cleaning'" },
              { icon: Shield, title: "Reputation", desc: "Build 5-star reviews that drive bookings" },
              { icon: TrendingUp, title: "Local Maps", desc: "Rank in Google Maps for 'carpet cleaning near me'" },
            ].map((service, i) => (
              <Card key={i} className="border-0 shadow-md hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="w-14 h-14 rounded-xl bg-emerald-100 flex items-center justify-center mb-4">
                    <service.icon className="w-7 h-7 text-emerald-600" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{service.title}</h3>
                  <p className="text-sm text-slate-600">{service.desc}</p>
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Carpet Cleaning Keywords We Target
              </h2>
              <p className="text-lg text-slate-600">
                High-intent searches from homeowners ready to book
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                "carpet cleaning santa barbara",
                "carpet cleaners near me",
                "steam cleaning santa barbara",
                "deep carpet cleaning",
                "rug cleaning santa barbara",
                "upholstery cleaning",
                "pet stain removal",
                "move out carpet cleaning",
              ].map((keyword, i) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
                  <ArrowRight className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <span className="text-slate-700">{keyword}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready for More Carpet Cleaning Bookings?
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              Get a free SEO audit and see how you can rank higher than your competition.
            </p>
            <Link href="/free-audit">
              <Button size="lg" className="gap-2 text-lg px-8 py-6 bg-emerald-500 hover:bg-emerald-600 text-white">
              <Phone className="w-5 h-5" />
              Get Your Free Audit
            </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
