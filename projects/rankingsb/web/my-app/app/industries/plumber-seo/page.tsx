import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { CheckCircle, Phone, ArrowRight, Droplets, Clock, Shield, TrendingUp } from "lucide-react"
import Link from "next/link"
import { LeadForm } from "@/components/shared/LeadForm"

export const metadata: Metadata = {
  title: "Plumber SEO Santa Barbara | Rankingsb",
  description: "Get more plumbing service calls with local SEO. Santa Barbara plumbers rank #1 on Google for emergency repairs.",
}

export default function PlumberSEOPage() {
  return (
    <main className="min-h-screen">
      <section className="relative py-20 lg:py-28 overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <img
          src="https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=1600&auto=format&fit=crop&q=70"
          alt="plumber professionals"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          loading="eager"
        />
        <div className="absolute inset-0 bg-slate-900/60" />
        <div className="container relative mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
              <Droplets className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-white/90">For Santa Barbara Plumbers</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white">
              Emergency Plumbing<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Calls Start Here
              </span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Burst pipes, clogged drains, water heater failures — when plumbing 
              disasters strike, homeowners call the plumber on Google page 1.
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

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <Badge variant="secondary" className="mb-4">Emergency Calls</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
              The Phone Rings 24/7 for Page 1 Plumbers
            </h2>
            <p className="text-xl text-slate-600">
              Plumbing emergencies don't wait. When a pipe bursts at 2 AM, 
              homeowners Google "emergency plumber Santa Barbara" and call immediately.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { stat: "$350", desc: "average emergency plumbing service call" },
              { stat: "24/7", desc: "emergency calls go to whoever ranks first" },
              { stat: "89%", desc: "of customers never scroll past page 1" },
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

      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <Badge variant="secondary" className="mb-4">Plumber SEO</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Local SEO That Gets You Emergency Calls
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { icon: Clock, title: "24/7 Visibility", desc: "Rank for 'emergency plumber' and '24 hour plumbing'" },
              { icon: Droplets, title: "Service Keywords", desc: "Target drain cleaning, leak detection, water heaters" },
              { icon: Shield, title: "Reputation", desc: "Build 5-star reviews that get you more calls" },
              { icon: TrendingUp, title: "Local Maps", desc: "Rank in Google Maps for 'plumber near me'" },
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

      <section className="py-20 bg-gradient-to-br from-blue-600 to-cyan-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Free Plumber SEO Audit
                </h2>
                <p className="text-blue-100 mb-6">
                  See why your plumbing business isn't ranking and how to 
                  capture more emergency calls starting this week.
                </p>
                <ul className="space-y-3 mb-8">
                  {["Complete local SEO audit", "Competitor analysis", "Emergency keyword opportunities", "90-day ranking plan"].map((item, i) => (
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
                  <LeadForm source="plumber-seo" showWebsite={false} buttonText="Get My Free Audit" />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
