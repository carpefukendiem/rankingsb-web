import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Phone, ArrowRight, Leaf, Sun, Shield, TrendingUp } from "lucide-react"

export const metadata: Metadata = {
  title: "Landscaper SEO Santa Barbara | Rankingsb",
  description: "Get more landscaping clients with local SEO. Santa Barbara landscapers rank #1 on Google for lawn care and design services.",
}

export default function LandscaperSEOPage() {
  return (
    <main className="min-h-screen">
      <section className="relative py-20 lg:py-28 overflow-hidden bg-gradient-to-br from-green-900 via-emerald-900 to-slate-900">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        <div className="container relative mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
              <Leaf className="w-4 h-4 text-green-400" />
              <span className="text-sm text-white/90">For Santa Barbara Landscapers</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white">
              Grow Your Business<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
                Like Your Lawns
              </span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Spring rush is here. When homeowners search for landscaping in Santa Barbara, 
              they choose the company on Google page 1.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2 text-lg px-8 py-6 bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/25">
                <Phone className="w-5 h-5" />
                Get Free SEO Audit
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <Badge variant="secondary" className="mb-4">Spring Rush Season</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
              Spring = Landscaping Gold Rush
            </h2>
            <p className="text-xl text-slate-600">
              March through June, homeowners flood Google looking for landscapers. 
              The companies that rank first get the best projects.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { stat: "$2,500", desc: "average residential landscaping project" },
              { stat: "4-6mo", desc: "peak season for landscaping services" },
              { stat: "72%", desc: "of leads go to top 3 ranked companies" },
            ].map((item, i) => (
              <Card key={i} className="border-0 shadow-lg text-center">
                <CardContent className="p-8">
                  <div className="text-4xl font-bold text-green-600 mb-2">{item.stat}</div>
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
            <Badge variant="secondary" className="mb-4">Landscaper SEO</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              SEO for Landscaping Companies
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { icon: Sun, title: "Seasonal Surge", desc: "Rank high when homeowners need you most" },
              { icon: Leaf, title: "Service Variety", desc: "Target lawn care, hardscape, design, maintenance" },
              { icon: Shield, title: "Portfolio", desc: "Showcase your best work with image SEO" },
              { icon: TrendingUp, title: "Local Maps", desc: "Rank in Google Maps for 'landscaper near me'" },
            ].map((service, i) => (
              <Card key={i} className="border-0 shadow-md hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="w-14 h-14 rounded-xl bg-green-100 flex items-center justify-center mb-4">
                    <service.icon className="w-7 h-7 text-green-600" />
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
                Landscaping Keywords We Target
              </h2>
              <p className="text-lg text-slate-600">
                High-value searches from homeowners ready to hire
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                "landscaping santa barbara",
                "landscaper near me",
                "lawn care services",
                "landscape design santa barbara",
                "hardscaping contractors",
                "garden design services",
                "sprinkler installation",
                "tree trimming santa barbara",
              ].map((keyword, i) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
                  <ArrowRight className="w-5 h-5 text-green-500 flex-shrink-0" />
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
              Ready to Grow Your Landscaping Business?
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              Get a free SEO audit and start ranking for landscaping services in Santa Barbara.
            </p>
            <Button size="lg" className="gap-2 text-lg px-8 py-6 bg-green-500 hover:bg-green-600 text-white">
              <Phone className="w-5 h-5" />
              Get Your Free Audit
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
