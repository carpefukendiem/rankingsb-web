import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { CheckCircle, Phone, ArrowRight, MapPin, Palmtree, Store, Star, Search, Users } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "SEO Carpinteria | Rankingsb Digital Marketing",
  description: "Local SEO services for Carpinteria businesses. Small town charm meets digital excellence. Free SEO audit for Carpinteria business owners.",
  keywords: ["SEO Carpinteria", "Carpinteria digital marketing", "small business SEO Carpinteria", "Carpinteria marketing"],
}

export default function CarpinteriaSEOPage() {
  return (
    <main className="min-h-screen">
      {/* HERO SECTION */}
      <section className="relative py-20 lg:py-28 overflow-hidden bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        <div className="container relative mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
              <Palmtree className="w-4 h-4 text-emerald-400" />
              <span className="text-sm text-white/90">Small Town, Big Results</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white">
              SEO Carpinteria<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
                Beach Town Success
              </span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Carpinteria's small-town charm meets world-class SEO. We help local businesses 
              stand out in a competitive coastal market.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/free-audit">
                <Button size="lg" className="gap-2 text-lg px-8 py-6 bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/25">
                  <Phone className="w-5 h-5" />
                  Get Free SEO Audit
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
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* UNIQUE CARPINTERIA */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <Badge variant="secondary" className="mb-4">Carpinteria's Opportunity</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
              Small Town, Big SEO Opportunity
            </h2>
            <p className="text-xl text-slate-600">
              Carpinteria's unique blend of tourism, agriculture, and local services 
              creates distinct SEO opportunities for savvy businesses.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { stat: "500K+", desc: "Annual visitors to Carpinteria beaches", icon: Palmtree },
              { stat: "13,000", desc: "Local residents needing services", icon: Users },
              { stat: "#1", desc: "Easier to rank than Santa Barbara", icon: Star },
            ].map((item, i) => (
              <Card key={i} className="border-0 shadow-lg text-center py-8">
                <CardContent>
                  <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-8 h-8 text-emerald-600" />
                  </div>
                  <div className="text-4xl font-bold text-slate-900 mb-2">{item.stat}</div>
                  <p className="text-slate-600">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES FOR CARPINTERIA */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <Badge variant="secondary" className="mb-4">Carpinteria SEO Services</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              SEO for Beach Town Businesses
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { icon: Palmtree, title: "Tourism SEO", desc: "Capture beach visitor searches and vacation traffic" },
              { icon: Store, title: "Main Street Local", desc: "Rank for 'near me' searches in downtown Carpinteria" },
              { icon: MapPin, title: "Avocado Industry", desc: "Agricultural and farm-related SEO expertise" },
              { icon: Search, title: "Easy Rankings", desc: "Less competition means faster results for you" },
            ].map((service, i) => (
              <Card key={i} className="border-0 shadow-md hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="w-14 h-14 rounded-xl bg-emerald-100 flex items-center justify-center mb-4">
                    <service.icon className="w-7 h-7 text-emerald-600" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{service.title}</h3>
                  <p className="text-sm text-slate-600">{service.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 bg-gradient-to-br from-emerald-600 to-teal-700 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-white/20 text-white border-0">Carpinteria Success Stories</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Local Businesses We Help
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                quote: "We're #1 for 'Carpinteria surf shop' and get tourists all summer.",
                author: "Jake Wilson",
                business: "Wave Rider Surf Shop",
                result: "#1 surf shop ranking"
              },
              {
                quote: "Tourists find us now. Our beach rental business tripled.",
                author: "Ana Garcia",
                business: "Carpinteria Beach Rentals",
                result: "3x rental bookings"
              },
              {
                quote: "Best decision for our small farm stand. Online orders flowing in.",
                author: "Tom Anderson",
                business: "Carpinteria Farm Fresh",
                result: "50+ monthly orders"
              },
            ].map((testimonial, i) => (
              <Card key={i} className="border-0 bg-white/10 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="flex gap-1 mb-4">
                    {[1,2,3,4,5].map((star) => (
                      <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-emerald-100 mb-6 italic">"{testimonial.quote}"</p>
                  <div className="border-t border-white/20 pt-4">
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-emerald-200">{testimonial.business}</p>
                    <Badge className="mt-2 bg-green-500 text-white border-0">{testimonial.result}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="mb-4 bg-emerald-500 text-white border-0">Free SEO Audit</Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Dominate Carpinteria Search
                </h2>
                <p className="text-slate-300 mb-6">
                  Get your free SEO audit and discover how to capture tourists and locals alike.
                </p>
                <ul className="space-y-3 mb-8">
                  {["Complete Carpinteria SEO audit", "Tourism keyword analysis", "Competitor analysis", "90-day ranking roadmap"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-300">
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
                    <Input type="email" placeholder="Email Address" className="h-12" />
                    <Input type="tel" placeholder="Phone Number" className="h-12" />
                    <Button className="w-full h-12 text-lg bg-emerald-600 hover:bg-emerald-700">
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
