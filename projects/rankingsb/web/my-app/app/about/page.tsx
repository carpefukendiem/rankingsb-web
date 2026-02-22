import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Award, Users, Target, ArrowRight } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "About Us | Rankingsb Santa Barbara",
  description: "Meet the team behind Rankingsb. Local SEO experts helping Santa Barbara businesses rank higher on Google.",
}

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative py-20 lg:py-28 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-white/10 text-white border-white/20">About Us</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Local SEO Experts for Santa Barbara
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              We help local businesses dominate Google search and get more customers. 
              No fluff, just results.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-slate-600 mb-4">
                Rankingsb was founded with a simple mission: help local Santa Barbara businesses 
                get found online. We noticed that great businesses were invisible on Google while 
                mediocre competitors dominated search results.
              </p>
              <p className="text-slate-600 mb-4">
                We decided to change that. Using proven local SEO strategies, we help businesses 
                rank in the Google Local Pack — that map section that gets 44% of all local search clicks.
              </p>
              <p className="text-slate-600">
                Today, we work with electricians, plumbers, HVAC companies, roofers, and other 
                local service businesses throughout Santa Barbara and Ventura counties.
              </p>
            </div>
            <div className="bg-slate-100 rounded-2xl p-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
                  <div className="text-slate-600">Businesses Helped</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">94%</div>
                  <div className="text-slate-600">Client Retention</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">3.2x</div>
                  <div className="text-slate-600">Avg ROI</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">#1</div>
                  <div className="text-slate-600">Rankings Achieved</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What We Believe</h2>
            <p className="text-lg text-slate-600">The principles that guide everything we do.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: Target,
                title: "Results First",
                description: "We measure success by rankings, traffic, and leads — not activity. If it's not driving results, we don't do it."
              },
              {
                icon: Users,
                title: "Local Focus",
                description: "We specialize in Santa Barbara and surrounding areas. We know this market, the competition, and what works here."
              },
              {
                icon: Award,
                title: "Transparency",
                description: "No black box. You get clear reports showing exactly what we're doing and the results we're achieving."
              }
            ].map((value, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-slate-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="text-3xl font-bold mb-6">Local to Santa Barbara</h2>
              <p className="text-slate-600 mb-4">
                We're based in Santa Barbara, California. We know the local market, 
                the competition, and the unique challenges of ranking here.
              </p>
              <div className="flex items-start gap-3 mb-4">
                <MapPin className="w-5 h-5 text-blue-600 mt-1" />
                <div>
                  <div className="font-medium">Address</div>
                  <div className="text-slate-600">10 E. Yanonali Street Suite 150<br />Santa Barbara, CA 93101</div>
                </div>
              </div>
              <div className="flex items-start gap-3 mb-4">
                <Phone className="w-5 h-5 text-blue-600 mt-1" />
                <div>
                  <div className="font-medium">Phone</div>
                  <a href="tel:8053077600" className="text-slate-600 hover:text-blue-600">(805) 307-7600</a>
                </div>
              </div>
            </div>
            <div className="bg-slate-100 rounded-2xl p-8 h-80 flex items-center justify-center">
              <div className="text-center text-slate-400">
                <MapPin className="w-12 h-12 mx-auto mb-4" />
                <p>Map placeholder</p>
                <p className="text-sm">Santa Barbara, CA</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Work With Us
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Ready to dominate local search? Let's talk about your business.
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
