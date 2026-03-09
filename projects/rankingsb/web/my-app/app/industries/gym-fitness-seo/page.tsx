import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { CheckCircle, Phone, ArrowRight, Star, Dumbbell, Shield, MapPin, TrendingUp, Users, Heart, Calendar } from "lucide-react"
import Link from "next/link"
import { LeadForm } from "@/components/shared/LeadForm"

export const metadata: Metadata = {
  title: "Gym & Fitness SEO Santa Barbara | Rankingsb",
  description: "Attract new gym members with local SEO. We help Santa Barbara fitness centers rank #1 for 'gym near me' and personal training searches.",
}

export default function GymFitnessSEOPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative py-20 lg:py-28 overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <img
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1600&auto=format&fit=crop&q=70"
          alt="gym fitness professionals"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          loading="eager"
        />
        <div className="absolute inset-0 bg-slate-900/60" />
        <div className="container relative mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
              <Dumbbell className="w-4 h-4 text-lime-400" />
              <span className="text-sm text-white/90">For Santa Barbara Fitness Centers</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white">
              Attract More Gym<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Members
              </span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              When people search "gym near me" or "personal trainer Santa Barbara," 
              make sure they find your fitness center first.
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
              Empty Equipment While Competitors Are Full?
            </h2>
            <p className="text-xl text-slate-600">
              When someone's New Year's resolution kicks in or they want to get fit, 
              they Google "gym near me" and tour the first few results.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { stat: "85%", desc: "of gym members find their gym through Google search" },
              { stat: "Jan", desc: "is peak search season - you need to be ready" },
              { stat: "$600", desc: "average annual membership value per member" },
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
              Fitness SEO That Fills Your Classes
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { icon: MapPin, title: "Local Map Optimization", desc: "Rank in Google Maps 3-pack for 'gym near me'" },
              { icon: Users, title: "Class Bookings", desc: "Drive signups for yoga, spin, HIIT, and group classes" },
              { icon: Star, title: "Review Generation", desc: "Build 5-star reputation that attracts new members" },
              { icon: Heart, title: "Personal Training", desc: "Rank for high-value personal trainer searches" },
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
              Rank for Popular Fitness Searches
            </h2>
            <p className="text-slate-600">
              We optimize your site to capture searches for the most popular fitness services.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              "Personal Training",
              "Group Fitness Classes",
              "Yoga Studio",
              "CrossFit Gym",
              "24 Hour Gym",
              "Weight Loss Programs",
              "Strength Training",
              "Nutrition Coaching",
              "Sports Performance"
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
                  Free SEO Audit for Gyms
                </h2>
                <p className="text-blue-100 mb-6">
                  See exactly why you're not ranking and what it'll take to get 
                  more members through your doors.
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
                  <LeadForm source="gym-fitness-seo" showWebsite={false} buttonText="Get My Free Audit" />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
