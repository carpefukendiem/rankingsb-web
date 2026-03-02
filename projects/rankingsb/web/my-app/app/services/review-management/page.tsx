import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Phone, Star, Shield, TrendingUp, MessageSquare, Bell, BarChart3 } from "lucide-react"
import Link from "next/link"
import { CTASection } from "@/components/shared/CTASection"

export const metadata: Metadata = {
  title: "Review Management & Reputation Management Santa Barbara | Rankingsb",
  description: "Build a 5-star reputation that dominates Google search. Professional review management for Santa Barbara and Ventura County businesses.",
  keywords: ["reputation management Santa Barbara", "review management", "online reviews Santa Barbara", "Google reviews", "5-star reviews"],
}

export default function ReviewManagementPage() {
  return (
    <main className="min-h-screen">
      <section className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-slate-900 via-yellow-900/30 to-slate-900">
        <div className="container relative mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="text-sm text-white/90 ml-2">Review & Reputation Management</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white">
              Build a 5-Star Reputation<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                Customers Trust
              </span>
            </h1>
            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
              93% of customers read reviews before choosing a local business. We'll help you generate more 5-star
              reviews, respond professionally, and outshine your competition.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/free-audit">
                <Button size="lg" className="gap-2 text-lg px-8 py-6 bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-bold">
                  <Phone className="w-5 h-5" />
                  Get Free Reputation Audit
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
              { stat: "93%", label: "of customers read reviews before buying" },
              { stat: "4.3+", label: "average stars needed to win new customers" },
              { stat: "97%", label: "of business owners say reviews impact sales" },
              { stat: "10x", label: "reviews generate from our automated campaigns" },
            ].map((s, i) => (
              <div key={i}>
                <div className="text-4xl font-bold text-yellow-600 mb-2">{s.stat}</div>
                <p className="text-sm text-slate-600">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Our Approach</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
              Complete Reputation Management
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { icon: Star, title: "Review Generation", desc: "Automated SMS & email campaigns that ask happy customers for reviews — at the perfect moment.", color: "yellow" },
              { icon: MessageSquare, title: "Review Responses", desc: "Professional, timely responses to every review — good and bad — to show you care.", color: "blue" },
              { icon: Shield, title: "Negative Review Defense", desc: "Strategy for addressing and mitigating negative reviews to protect your reputation.", color: "red" },
              { icon: Bell, title: "Real-Time Monitoring", desc: "Instant alerts when new reviews come in across Google, Yelp, Facebook, and more.", color: "purple" },
              { icon: TrendingUp, title: "Star Rating Growth", desc: "Systematic approach to improving your average star rating month over month.", color: "green" },
              { icon: BarChart3, title: "Monthly Reports", desc: "Clear reporting on review growth, star rating trends, and competitive comparison.", color: "orange" },
            ].map((f, i) => (
              <Card key={i} className="border-0 shadow-md hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="w-14 h-14 rounded-xl bg-yellow-100 flex items-center justify-center mb-4">
                    <f.icon className="w-7 h-7 text-yellow-600" />
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
              <h2 className="text-3xl font-bold">Platforms We Monitor & Manage</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {["Google Business Profile", "Yelp", "Facebook", "BBB (Better Business Bureau)", "Houzz (Home Services)", "Zocdoc (Medical)", "Avvo (Attorneys)", "TripAdvisor (Tourism)", "HomeAdvisor", "Angi", "Healthgrades", "Nextdoor"].map((platform, i) => (
                <div key={i} className="flex items-center gap-3 p-4 rounded-lg border border-slate-200 hover:border-yellow-300 transition-colors">
                  <CheckCircle className="w-5 h-5 text-yellow-500 shrink-0" />
                  <span className="text-sm font-medium text-slate-700">{platform}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Start Building Your 5-Star Reputation"
        subtitle="See how your current reputation compares to competitors and get a free plan to generate more reviews and dominate local search."
        bullets={["Current reputation analysis", "Competitor review comparison", "Review generation strategy", "Response templates"]}
        formTitle="Free Reputation Audit"
      />
    </main>
  )
}
