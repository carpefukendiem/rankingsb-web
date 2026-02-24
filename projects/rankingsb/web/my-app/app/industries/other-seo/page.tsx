import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { CheckCircle, Phone, ArrowRight, Star, Briefcase, Shield, MapPin, TrendingUp, Building2, Users, Sparkles } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "SEO for Any Business | Rankingsb Santa Barbara",
  description: "Custom SEO solutions for any industry. We help Santa Barbara businesses of all types rank higher on Google and get more customers.",
}

export default function OtherSEOPage() {
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
              <Briefcase className="w-4 h-4 text-slate-300" />
              <span className="text-sm text-white/90">For Any Santa Barbara Business</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white">
              SEO for<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Your Industry
              </span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              No matter what business you're in, we can help you rank higher on Google 
              and attract more customers in Santa Barbara.
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

      {/* Industries We Serve */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <Badge variant="secondary" className="mb-4">Custom Solutions</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
              We Work With All Industries
            </h2>
            <p className="text-xl text-slate-600">
              From retail to professional services, we've helped businesses across dozens of industries dominate local search.
            </p>
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {[
              "Retail Stores",
              "Salons & Spas",
              "Cleaning Services",
              "Landscaping",
              "Pet Services",
              "Moving Companies",
              "Security Services",
              "Event Venues",
              "Caterers",
              "Photographers",
              "Financial Services",
              "Insurance Agents",
              "Consultants",
              "Contractors",
              "Painters",
              "And More..."
            ].map((industry, i) => (
              <div key={i} className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg hover:bg-blue-50 transition-colors">
                <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0" />
                <span className="font-medium text-slate-700">{industry}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Universal SEO Process */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <Badge variant="secondary" className="mb-4">Our Approach</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Tailored SEO for Your Business
            </h2>
            <p className="text-slate-600">
              While every industry is different, our proven process delivers results across the board.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { icon: MapPin, title: "Local Optimization", desc: "Dominate 'near me' searches in your area" },
              { icon: Building2, title: "Google Business", desc: "Optimize your GBP for maximum visibility" },
              { icon: Star, title: "Reputation Management", desc: "Build and manage online reviews" },
              { icon: TrendingUp, title: "Content Strategy", desc: "Create content that ranks and converts" },
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

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <Badge variant="secondary" className="mb-4">How It Works</Badge>
              <h2 className="text-3xl font-bold mb-4">Your Custom SEO Strategy</h2>
              <p className="text-slate-600">
                We research your industry, analyze your competition, and build a strategy that works for you.
              </p>
            </div>
            
            <div className="space-y-8">
              {[
                { 
                  step: "01", 
                  title: "Industry Research", 
                  desc: "We dive deep into your industry to understand your customers, competitors, and unique opportunities." 
                },
                { 
                  step: "02", 
                  title: "Competitive Analysis", 
                  desc: "We analyze what's working for your top competitors and identify gaps you can exploit." 
                },
                { 
                  step: "03", 
                  title: "Custom Strategy", 
                  desc: "We create a tailored SEO plan based on your industry, goals, and budget." 
                },
                { 
                  step: "04", 
                  title: "Execution & Results", 
                  desc: "We implement the strategy and track results, adjusting as needed to maximize your ROI." 
                }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 items-start">
                  <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-bold text-blue-600">{item.step}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-slate-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
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
                  Free SEO Audit for Your Business
                </h2>
                <p className="text-blue-100 mb-6">
                  Whatever industry you're in, we'll analyze your market and show you exactly 
                  how to outrank your competition.
                </p>
                <ul className="space-y-3 mb-8">
                  {["Industry-specific research", "Competitor analysis", "Custom strategy report", "No obligation consultation"].map((item, i) => (
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
                    <Input placeholder="Business Name" className="h-12" />
                    <Input placeholder="Industry" className="h-12" />
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
