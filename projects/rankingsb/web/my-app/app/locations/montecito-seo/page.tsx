import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { CheckCircle, Phone, ArrowRight, MapPin, Gem, Home, Star, Search, Crown } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "SEO Montecito | Rankingsb Digital Marketing",
  description: "Luxury SEO services for Montecito businesses. High-end digital marketing for estate management, luxury services, and premium brands. Free audit available.",
  keywords: ["SEO Montecito", "Montecito marketing", "luxury SEO Montecito", "high-end digital marketing", "estate management SEO"],
}

export default function MontecitoSEOPage() {
  return (
    <main className="min-h-screen">
      {/* HERO SECTION */}
      <section className="relative py-20 lg:py-28 overflow-hidden bg-gradient-to-br from-amber-900 via-orange-900 to-slate-900">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        <div className="container relative mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
              <Crown className="w-4 h-4 text-amber-400" />
              <span className="text-sm text-white/90">Luxury Market Specialists</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white">
              SEO Montecito<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                Luxury Digital Excellence
              </span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Premium SEO services for Montecito's discerning businesses. Estate management, 
              luxury services, and high-end brands deserve exceptional digital presence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/free-audit">
                <Button size="lg" className="gap-2 text-lg px-8 py-6 bg-amber-500 hover:bg-amber-600 text-white shadow-lg shadow-amber-500/25">
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

      {/* UNIQUE MONTECITO */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <Badge variant="secondary" className="mb-4">The Montecito Market</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
              SEO for Luxury Markets
            </h2>
            <p className="text-xl text-slate-600">
              Montecito demands a different approach. We understand the discretion, 
              sophistication, and expectations of the luxury market.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { stat: "$3M+", desc: "Average home value in Montecito", icon: Home },
              { stat: "Premium", desc: "Clientele expecting white-glove service", icon: Gem },
              { stat: "Elite", desc: "Competition requires elite SEO", icon: Crown },
            ].map((item, i) => (
              <Card key={i} className="border-0 shadow-lg text-center py-8">
                <CardContent>
                  <div className="w-16 h-16 rounded-2xl bg-amber-100 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-8 h-8 text-amber-600" />
                  </div>
                  <div className="text-4xl font-bold text-slate-900 mb-2">{item.stat}</div>
                  <p className="text-slate-600">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES FOR MONTECITO */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <Badge variant="secondary" className="mb-4">Montecito SEO Services</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              High-End Digital Strategies
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { icon: Home, title: "Estate Management SEO", desc: "Property management for luxury estates and rentals" },
              { icon: Gem, title: "Luxury Brand SEO", desc: "Premium brand positioning and reputation" },
              { icon: Crown, title: "Concierge Services", desc: "High-end service provider optimization" },
              { icon: Search, title: "Discreet Marketing", desc: "Private, sophisticated digital presence" },
            ].map((service, i) => (
              <Card key={i} className="border-0 shadow-md hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="w-14 h-14 rounded-xl bg-amber-100 flex items-center justify-center mb-4">
                    <service.icon className="w-7 h-7 text-amber-600" />
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
      <section className="py-20 bg-gradient-to-br from-amber-600 to-orange-700 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-white/20 text-white border-0">Montecito Success Stories</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Luxury Clients We Serve
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                quote: "Finally an SEO team that understands discretion and luxury branding.",
                author: "Estate Manager",
                business: "Montecito Estate Services",
                result: "Elite client acquisition"
              },
              {
                quote: "Our luxury rental bookings increased 200% with their targeted SEO.",
                author: "Alexandra V.",
                business: "Montecito Luxury Rentals",
                result: "200% booking increase"
              },
              {
                quote: "Sophisticated approach that matches our brand perfectly.",
                author: "Jonathan M.",
                business: "Private Concierge Montecito",
                result: "Premium clientele growth"
              },
            ].map((testimonial, i) => (
              <Card key={i} className="border-0 bg-white/10 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="flex gap-1 mb-4">
                    {[1,2,3,4,5].map((star) => (
                      <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-amber-100 mb-6 italic">"{testimonial.quote}"</p>
                  <div className="border-t border-white/20 pt-4">
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-amber-200">{testimonial.business}</p>
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
                <Badge className="mb-4 bg-amber-500 text-white border-0">Free SEO Audit</Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Elevate Your Montecito Presence
                </h2>
                <p className="text-slate-300 mb-6">
                  Get your complimentary luxury market SEO audit and discover how to attract elite clientele.
                </p>
                <ul className="space-y-3 mb-8">
                  {["Complete luxury market audit", "Premium keyword analysis", "Competitor intelligence", "90-day elite ranking roadmap"].map((item, i) => (
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
                  <p className="text-slate-500 mb-6">Confidential consultation within 24 hours</p>
                  <form className="space-y-4">
                    <Input placeholder="Your Name" className="h-12" />
                    <Input placeholder="Business Name" className="h-12" />
                    <Input type="email" placeholder="Email Address" className="h-12" />
                    <Input type="tel" placeholder="Phone Number" className="h-12" />
                    <Button className="w-full h-12 text-lg bg-amber-600 hover:bg-amber-700">
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
