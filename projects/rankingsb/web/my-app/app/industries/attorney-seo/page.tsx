import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { CheckCircle, Phone, ArrowRight, Scale, Shield, Users, TrendingUp } from "lucide-react"

export const metadata: Metadata = {
  title: "Attorney SEO Santa Barbara | Rankingsb",
  description: "Get more legal clients with local SEO. Santa Barbara law firms rank #1 on Google for case-specific searches.",
}

export default function AttorneySEOPage() {
  return (
    <main className="min-h-screen">
      <section className="relative py-20 lg:py-28 overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        <div className="container relative mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
              <Scale className="w-4 h-4 text-indigo-400" />
              <span className="text-sm text-white/90">For Santa Barbara Law Firms</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white">
              Attorney SEO That<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                Wins Cases
              </span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              When someone searches "personal injury lawyer Santa Barbara" or 
              "DUI attorney near me," be the firm they call first.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2 text-lg px-8 py-6 bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/25">
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
            <Badge variant="secondary" className="mb-4">High-Value Clients</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
              Legal Clients Are Searching for You Right Now
            </h2>
            <p className="text-xl text-slate-600">
              When someone needs a lawyer, they Google immediately. The firms on 
              page 1 get the consultation calls.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { stat: "$5K+", desc: "average case value for most practice areas" },
              { stat: "76%", desc: "of legal clients research online first" },
              { stat: "3", desc: "firms get 80% of Google call clicks" },
            ].map((item, i) => (
              <Card key={i} className="border-0 shadow-lg text-center">
                <CardContent className="p-8">
                  <div className="text-4xl font-bold text-indigo-600 mb-2">{item.stat}</div>
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
            <Badge variant="secondary" className="mb-4">Legal SEO</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              SEO for Law Firms
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { icon: Scale, title: "Practice Area Pages", desc: "Individual pages for PI, DUI, family law, etc." },
              { icon: Shield, title: "Authority Building", desc: "Content that establishes legal expertise" },
              { icon: Users, title: "Review Management", desc: "Build 5-star reputation ethically" },
              { icon: TrendingUp, title: "Local Maps", desc: "Rank in Google Maps for 'lawyer near me'" },
            ].map((service, i) => (
              <Card key={i} className="border-0 shadow-md hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="w-14 h-14 rounded-xl bg-indigo-100 flex items-center justify-center mb-4">
                    <service.icon className="w-7 h-7 text-indigo-600" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{service.title}</h3>
                  <p className="text-sm text-slate-600">{service.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-indigo-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Free Attorney SEO Audit
                </h2>
                <p className="text-indigo-100 mb-6">
                  See why competing firms are outranking you and how to capture 
                  more high-value legal clients.
                </p>
                <ul className="space-y-3 mb-8">
                  {["Complete local SEO audit", "Competitor firm analysis", "Practice area keyword opportunities", "90-day ranking plan"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-indigo-100">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <Card className="border-0 shadow-2xl">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-2 text-slate-900">Request Your Audit</h3>
                  <p className="text-slate-500 mb-6">We'll send it within 24 hours</p>
                  <form className="space-y-4">
                    <Input placeholder="Your Name" className="h-12" />
                    <Input placeholder="Law Firm Name" className="h-12" />
                    <Input type="email" placeholder="Email Address" className="h-12" />
                    <Input type="tel" placeholder="Phone Number" className="h-12" />
                    <Button className="w-full h-12 text-lg bg-indigo-600 hover:bg-indigo-700">
                      Get My Free Audit
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
