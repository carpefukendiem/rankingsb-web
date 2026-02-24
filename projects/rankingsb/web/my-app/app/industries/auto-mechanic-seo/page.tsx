import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { CheckCircle, Phone, ArrowRight, Star, Car, Shield, MapPin, TrendingUp, Wrench, Clock, DollarSign } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Auto Mechanic SEO Santa Barbara | Rankingsb",
  description: "Get more auto repair customers with local SEO. We help Santa Barbara auto shops rank #1 on Google for 'mechanic near me'.",
}

export default function AutoMechanicSEOPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative py-20 lg:py-28 overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        <div className="container relative mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
              <Car className="w-4 h-4 text-amber-400" />
              <span className="text-sm text-white/90">For Santa Barbara Auto Shops</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white">
              Get More Auto Repair<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Customers
              </span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              When drivers search "auto repair near me" or "mechanic Santa Barbara," 
              be the first shop they call. Local SEO that fills your bays.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/free-audit">
                <Button size="lg" className="gap-2 text-lg px-8 py-6 bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-500/25">
                  <Phone className="w-5 h-5" />
                  Get Free SEO Audit
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Problem */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <Badge variant="secondary" className="mb-4">The Problem</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
              Customers Driving Past Your Shop?
            </h2>
            <p className="text-xl text-slate-600">
              When someone's check engine light comes on or they need brake service, 
              they Google "mechanic near me" and call the first 3 results.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { stat: "78%", desc: "of customers choose an auto shop from page 1 of Google" },
              { stat: "24/7", desc: "emergency repair calls go to whoever ranks highest" },
              { stat: "$400", desc: "average repair job value" },
            ].map((item, i) => (
              <Card key={i} className="border-0 shadow-lg text-center">
                <CardContent className="p-8">
                  <div className="text-4xl font-bold text-blue-600 mb-2">{item.stat}</div>
                  <p className="text-slate-600">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <Badge variant="secondary" className="mb-4">Our Solution</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Auto Shop SEO That Fills Your Schedule
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { icon: MapPin, title: "Local Map Optimization", desc: "Rank in Google Maps 3-pack for 'auto repair near me'" },
              { icon: Wrench, title: "Service Keywords", desc: "Target 'brake repair,' 'oil change,' 'transmission' searches" },
              { icon: Star, title: "Review Generation", desc: "Build 5-star reputation that gets you more calls" },
              { icon: Clock, title: "Emergency Service", desc: "Rank for 'emergency mechanic' and after-hours calls" },
            ].map((service, i) => (
              <Card key={i} className="border-0 shadow-md hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
                    <service.icon className="w-7 h-7 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{service.title}</h3>
                  <p className="text-sm text-slate-600">{service.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <Badge variant="secondary" className="mb-4">Services We Target</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Rank for High-Value Repairs
            </h2>
            <p className="text-slate-600">
              We optimize your site to capture searches for the most profitable services.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              "Brake Repair",
              "Oil Change",
              "Transmission Service",
              "Engine Diagnostics",
              "AC Repair",
              "Tire Services",
              "Battery Replacement",
              "Suspension Work",
              "Pre-Purchase Inspections"
            ].map((service, i) => (
              <div key={i} className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="font-medium text-slate-700">{service}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Free SEO Audit for Auto Shops
                </h2>
                <p className="text-blue-100 mb-6">
                  See exactly why you're not ranking and what it'll take to get 
                  to page 1. Includes competitor analysis and keyword opportunities.
                </p>
                <ul className="space-y-3 mb-8">
                  {["Complete technical audit", "Competitor ranking analysis", "Keyword opportunity report", "90-day ranking plan"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-blue-100">
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
                    <Input placeholder="Shop Name" className="h-12" />
                    <Input type="email" placeholder="Email Address" className="h-12" />
                    <Input type="tel" placeholder="Phone Number" className="h-12" />
                    <Button className="w-full h-12 text-lg bg-blue-600 hover:bg-blue-700">
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
