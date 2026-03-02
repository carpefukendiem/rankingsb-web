import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Phone, Star, MapPin, Camera, MessageSquare, BarChart3, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"
import { CTASection } from "@/components/shared/CTASection"

export const metadata: Metadata = {
  title: "Google Business Profile Optimization Santa Barbara | Rankingsb",
  description: "Rank higher on Google Maps and the local 3-Pack with expert Google Business Profile optimization. Santa Barbara and Ventura County businesses get more calls.",
  keywords: ["Google Business Profile Santa Barbara", "Google My Business optimization", "Google Maps ranking Santa Barbara", "local 3-pack SEO"],
}

const features = [
  { icon: MapPin, title: "3-Pack Ranking", desc: "Get your business into Google's coveted top 3 local results — where 67% of clicks go." },
  { icon: Camera, title: "Photo Optimization", desc: "Professional photo strategy that increases profile views and engagement by up to 520%." },
  { icon: MessageSquare, title: "Review Strategy", desc: "Systematic review generation to build a 4.8+ star reputation that dominates competitors." },
  { icon: BarChart3, title: "Insights & Reporting", desc: "Track profile views, calls, direction requests, and website clicks every month." },
  { icon: Star, title: "Post Management", desc: "Weekly Google Posts to signal activity and keep your profile ranked higher." },
  { icon: Clock, title: "Q&A Management", desc: "Monitor and answer questions to convert searchers before they contact a competitor." },
]

export default function GBPPage() {
  return (
    <main className="min-h-screen">
      <section className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-slate-900 via-green-900/50 to-slate-900">
        <div className="container relative mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="text-sm text-white/90">Google Business Profile Optimization</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white">
              Dominate Google Maps<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">
                in Santa Barbara
              </span>
            </h1>
            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
              Your Google Business Profile is often the first thing customers see. We'll optimize it to rank
              in the top 3 local results and turn views into calls and visits.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/free-audit">
                <Button size="lg" className="gap-2 text-lg px-8 py-6 bg-green-500 hover:bg-green-400 text-white">
                  <Phone className="w-5 h-5" />
                  Get Free GBP Audit
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

      <section className="py-16 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
            {[
              { stat: "44%", label: "of GBP profiles get a direction request" },
              { stat: "56%", label: "of actions are website visits" },
              { stat: "5x", label: "more reviews from an optimized profile" },
              { stat: "#1", label: "factor in Google Maps ranking" },
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
            <Badge variant="secondary" className="mb-4">What We Do</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">Complete GBP Management</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              We handle every aspect of your Google Business Profile to maximize visibility and conversions.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {features.map((f, i) => (
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
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">Our GBP Checklist</Badge>
              <h2 className="text-3xl font-bold">Everything We Optimize</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                "Business name, category & description optimization",
                "Service area and hours configuration",
                "Primary and secondary category selection",
                "Product/service listings with keywords",
                "Photo uploads (interior, exterior, team, products)",
                "Review request campaign setup",
                "Review response management",
                "Weekly Google Posts (updates, offers, events)",
                "Q&A monitoring and responses",
                "Attribute optimization (accessibility, payments, etc.)",
                "Duplicate listing detection & removal",
                "Spam competitor reporting",
                "Monthly performance reporting",
                "Click tracking and call analytics",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 py-2">
                  <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                  <span className="text-slate-700 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Get More Calls from Google Maps"
        subtitle="We'll audit your Google Business Profile and show you exactly why your competitors rank above you — and how to overtake them."
        bullets={["Full GBP audit", "Competitor comparison", "Keyword opportunities", "Action plan"]}
        formTitle="Request Free GBP Audit"
      />
    </main>
  )
}
