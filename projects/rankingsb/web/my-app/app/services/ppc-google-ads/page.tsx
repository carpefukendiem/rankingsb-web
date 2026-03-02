import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Phone, Target, DollarSign, TrendingUp, BarChart3, Zap, Users } from "lucide-react"
import Link from "next/link"
import { CTASection } from "@/components/shared/CTASection"

export const metadata: Metadata = {
  title: "Google Ads & PPC Management Santa Barbara | Rankingsb",
  description: "Get immediate leads with expertly managed Google Ads campaigns. PPC management for Santa Barbara and Ventura County businesses that delivers ROI.",
  keywords: ["Google Ads Santa Barbara", "PPC management Santa Barbara", "pay per click Santa Barbara", "Google advertising Ventura County"],
}

export default function PPCPage() {
  return (
    <main className="min-h-screen">
      <section className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-slate-900 via-orange-900/40 to-slate-900">
        <div className="container relative mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
              <Target className="w-4 h-4 text-orange-400" />
              <span className="text-sm text-white/90">Google Ads & PPC Management</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white">
              Get Leads Tomorrow<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">
                with Google Ads
              </span>
            </h1>
            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
              While SEO builds long-term authority, Google Ads generates qualified leads immediately.
              We run profitable campaigns for Santa Barbara and Ventura County businesses.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/free-audit">
                <Button size="lg" className="gap-2 text-lg px-8 py-6 bg-orange-500 hover:bg-orange-400 text-white">
                  <Phone className="w-5 h-5" />
                  Get Free PPC Audit
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
              { stat: "2x", label: "average return on ad spend for our clients" },
              { stat: "24hr", label: "leads start coming in within first day" },
              { stat: "30%", label: "average reduction in cost per lead after 90 days" },
              { stat: "$0", label: "wasted on irrelevant clicks with our targeting" },
            ].map((s, i) => (
              <div key={i}>
                <div className="text-4xl font-bold text-orange-600 mb-2">{s.stat}</div>
                <p className="text-sm text-slate-600">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Our PPC Services</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">What We Manage</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { icon: Target, title: "Search Ads", desc: "Show up at the top of Google when someone searches for your exact service in your area." },
              { icon: Users, title: "Local Services Ads", desc: "Google Guaranteed badge to appear above traditional PPC for even higher trust and CTR." },
              { icon: Zap, title: "Remarketing", desc: "Re-target website visitors who didn't convert to bring them back when they're ready." },
              { icon: BarChart3, title: "Conversion Tracking", desc: "Track every call, form submission, and lead back to the exact ad that generated it." },
              { icon: DollarSign, title: "Bid Management", desc: "Daily bid optimization to minimize cost per lead while maximizing volume." },
              { icon: TrendingUp, title: "Landing Page CRO", desc: "Optimized landing pages that convert clicks into actual leads and customers." },
            ].map((f, i) => (
              <Card key={i} className="border-0 shadow-md hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="w-14 h-14 rounded-xl bg-orange-100 flex items-center justify-center mb-4">
                    <f.icon className="w-7 h-7 text-orange-600" />
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
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">SEO + PPC = The Winning Combination</h2>
            <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
              Most agencies do one or the other. We combine both for maximum lead flow — PPC for immediate results
              while SEO builds lasting organic rankings.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-8 rounded-2xl bg-slate-50 border">
                <h3 className="text-xl font-bold mb-4 text-orange-600">Google Ads</h3>
                <ul className="space-y-2 text-sm text-slate-600 text-left">
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> Leads within 24 hours</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> Precise targeting by location</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> Full budget control</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> Scalable instantly</li>
                </ul>
              </div>
              <div className="p-8 rounded-2xl bg-blue-50 border border-blue-100">
                <h3 className="text-xl font-bold mb-4 text-blue-600">Local SEO</h3>
                <ul className="space-y-2 text-sm text-slate-600 text-left">
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> Free leads long-term</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> Higher trust from organic</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> Compounds over time</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> 24/7 passive lead generation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Start Getting Leads Tomorrow"
        subtitle="Get a free PPC audit showing your biggest opportunities and how much you could spend to get profitable leads immediately."
        bullets={["Free PPC account audit", "Competitor ad analysis", "Keyword cost estimates", "Campaign strategy plan"]}
        formTitle="Free PPC Audit"
      />
    </main>
  )
}
