import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { CheckCircle, Phone, ArrowRight, Thermometer, Snowflake, Flame, TrendingUp } from "lucide-react"

export const metadata: Metadata = {
  title: "HVAC SEO Santa Barbara | Rankingsb",
  description: "Get more HVAC service calls with local SEO. Santa Barbara heating & cooling companies rank #1 on Google.",
}

export default function HVACSEOPage() {
  return (
    <main className="min-h-screen">
      <section className="relative py-20 lg:py-28 overflow-hidden bg-gradient-to-br from-slate-900 via-orange-900 to-slate-900">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        <div className="container relative mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
              <Thermometer className="w-4 h-4 text-orange-400" />
              <span className="text-sm text-white/90">For Santa Barbara HVAC Companies</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white">
              More HVAC Calls.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">
                Less Ad Spend.
              </span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              When AC breaks in summer or heat fails in winter, homeowners 
              Google "HVAC repair Santa Barbara." Be the company they call first.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2 text-lg px-8 py-6 bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/25">
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
            <Badge variant="secondary" className="mb-4">Seasonal Demand</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
              Don't Miss Peak Season Calls
            </h2>
            <p className="text-xl text-slate-600">
              HVAC is seasonal. When summer hits and AC units break, 
              the companies on Google page 1 get flooded with calls.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="w-16 h-16 rounded-2xl bg-red-100 flex items-center justify-center mb-4">
                  <Flame className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">Summer AC Rush</h3>
                <p className="text-slate-600 mb-4">
                  90°F+ days = emergency AC repair calls. Companies ranking #1 
                  get 10-15 calls per day.
                </p>
                <div className="text-2xl font-bold text-red-600">$400-800</div>
                <p className="text-sm text-slate-500">average emergency AC service</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center mb-4">
                  <Snowflake className="w-8 h-8 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">Winter Heating Season</h3>
                <p className="text-slate-600 mb-4">
                  Furnace failures, heating emergencies. Homeowners need heat NOW 
                  and call whoever answers on page 1.
                </p>
                <div className="text-2xl font-bold text-blue-600">$300-600</div>
                <p className="text-sm text-slate-500">average heating repair</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <Badge variant="secondary" className="mb-4">HVAC SEO Services</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              SEO Built for HVAC Companies
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { icon: Thermometer, title: "Seasonal Campaigns", desc: "Optimize for summer AC and winter heating keywords" },
              { icon: TrendingUp, title: "Emergency Keywords", desc: "Rank for '24/7 HVAC repair' and 'emergency AC'" },
              { icon: CheckCircle, title: "Service Pages", desc: "Individual pages for install, repair, maintenance" },
              { icon: Phone, title: "Click-to-Call", desc: "Prominent phone buttons for mobile searchers" },
            ].map((service, i) => (
              <Card key={i} className="border-0 shadow-md hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="w-14 h-14 rounded-xl bg-orange-100 flex items-center justify-center mb-4">
                    <service.icon className="w-7 h-7 text-orange-600" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{service.title}</h3>
                  <p className="text-sm text-slate-600">{service.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-orange-600 to-red-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Free HVAC SEO Audit
                </h2>
                <p className="text-orange-100 mb-6">
                  See exactly why your HVAC company isn't ranking and how to 
                  capture more emergency calls this season.
                </p>
                <ul className="space-y-3 mb-8">
                  {["Complete local SEO audit", "Competitor analysis", "Seasonal keyword opportunities", "90-day ranking plan"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-orange-100">
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
                    <Input placeholder="HVAC Business Name" className="h-12" />
                    <Input type="email" placeholder="Email Address" className="h-12" />
                    <Input type="tel" placeholder="Phone Number" className="h-12" />
                    <Button className="w-full h-12 text-lg bg-orange-600 hover:bg-orange-700">
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
