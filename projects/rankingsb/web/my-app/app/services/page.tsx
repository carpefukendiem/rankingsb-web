import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Search, MapPin, BarChart3, PenTool, Shield, ArrowRight, Phone } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "SEO Services | Rankingsb Santa Barbara",
  description: "Local SEO services for Santa Barbara businesses. Google Business Profile optimization, local rankings, and lead generation.",
}

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative py-20 lg:py-28 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-white/10 text-white border-white/20">Our Services</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              SEO Services That Drive Results
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Local SEO expertise for Santa Barbara businesses. We help you rank higher, 
              get more calls, and grow your customer base.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/free-audit">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-100">
                  <Phone className="w-5 h-5 mr-2" />
                  Get Free Audit
                </Button>
              </Link>
              <Link href="/industries">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  View Industries
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What We Do</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Everything you need to dominate local search and get more customers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: MapPin,
                title: "Google Business Profile Optimization",
                description: "Complete setup and optimization of your Google listing. Photos, posts, Q&A, and review management.",
                features: ["Profile setup & verification", "Photo optimization", "Google Posts strategy", "Review generation"]
              },
              {
                icon: Search,
                title: "Local SEO Rankings",
                description: "Rank in the top 3 for 'near me' searches in Santa Barbara and surrounding areas.",
                features: ["Keyword optimization", "Local citations", "On-page SEO", "Link building"]
              },
              {
                icon: BarChart3,
                title: "Website Optimization",
                description: "Technical fixes, speed improvements, and conversion optimization for your website.",
                features: ["Site speed fixes", "Mobile optimization", "Schema markup", "Conversion tracking"]
              },
              {
                icon: PenTool,
                title: "Content Creation",
                description: "SEO-optimized blog posts, service pages, and location pages that rank and convert.",
                features: ["Blog writing", "Service pages", "Location pages", "Content strategy"]
              },
              {
                icon: Shield,
                title: "Reputation Management",
                description: "Review monitoring, response management, and strategies to build your online reputation.",
                features: ["Review monitoring", "Response templates", "Review generation", "Negative review handling"]
              },
              {
                icon: CheckCircle,
                title: "Monthly Reporting",
                description: "Clear, actionable reports showing rankings, traffic, and leads. Know exactly what's working.",
                features: ["Ranking reports", "Traffic analytics", "Lead tracking", "Competitor analysis"]
              }
            ].map((service, i) => (
              <Card key={i} className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
                    <service.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-slate-600 mb-4">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, j) => (
                      <li key={j} className="flex items-center text-sm text-slate-600">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple Pricing</h2>
            <p className="text-lg text-slate-600">No hidden fees. No long-term contracts.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border-2 border-blue-600">
              <CardContent className="p-8">
                <Badge className="mb-4">Most Popular</Badge>
                <h3 className="text-2xl font-bold mb-2">Growth</h3>
                <div className="text-4xl font-bold mb-4">$497<span className="text-lg font-normal text-slate-600">/mo</span></div>
                <p className="text-slate-600 mb-6">+ $997 one-time setup</p>
                <ul className="space-y-3 mb-8">
                  {[
                    "Google Business Profile optimization",
                    "Local SEO for 5 keywords",
                    "2 blog posts per month",
                    "Monthly reporting",
                    "Review management",
                    "Email support"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/free-audit">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-2">Domination</h3>
                <div className="text-4xl font-bold mb-4">$997<span className="text-lg font-normal text-slate-600">/mo</span></div>
                <p className="text-slate-600 mb-6">+ $1,497 one-time setup</p>
                <ul className="space-y-3 mb-8">
                  {[
                    "Everything in Growth, plus:",
                    "Local SEO for 10 keywords",
                    "4 blog posts per month",
                    "Website optimization",
                    "Competitor monitoring",
                    "Priority support",
                    "Bi-weekly calls"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/free-audit">
                  <Button variant="outline" className="w-full">
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Rank Higher?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Get a free audit showing exactly why you're not ranking — and how to fix it.
          </p>
          <Link href="/free-audit">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-100">
              <Phone className="w-5 h-5 mr-2" />
              Get Free Audit
            </Button>
          </Link>
        </div>
      </section>
    </main>
  )
}
