import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { CheckCircle, Phone, ArrowRight, MapPin, GraduationCap, Building2, TrendingUp, Star, Search, Zap, Users } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "SEO Goleta | Rankingsb Digital Marketing",
  description: "Get more customers with local SEO in Goleta. Serving UCSB area, tech corridor, and Old Town businesses. Free SEO audit available.",
  keywords: ["SEO Goleta", "Goleta marketing agency", "digital marketing Goleta", "UCSB SEO", "Goleta SEO services"],
}

export default function GoletaSEOPage() {
  return (
    <main className="min-h-screen">
      {/* HERO SECTION */}
      <section className="relative py-20 lg:py-28 overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        <div className="container relative mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
              <GraduationCap className="w-4 h-4 text-indigo-400" />
              <span className="text-sm text-white/90">Serving Goleta & UCSB Area</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white">
              SEO Goleta<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                Grow Your Business
              </span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              From Old Town Goleta to the UCSB campus corridor, we help Goleta businesses 
              rank higher and get more customers through strategic local SEO.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/free-audit">
                <Button size="lg" className="gap-2 text-lg px-8 py-6 bg-indigo-500 hover:bg-indigo-600 text-white shadow-lg shadow-indigo-500/25">
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

      {/* UNIQUE GOLETA MARKET */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <Badge variant="secondary" className="mb-4">The Goleta Advantage</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
              Goleta's Unique Business Landscape
            </h2>
            <p className="text-xl text-slate-600">
              Goleta offers a diverse mix of college town energy, tech innovation, 
              and traditional local business—each requiring different SEO strategies.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { stat: "25,000+", desc: "UCSB students searching for local services", icon: GraduationCap },
              { stat: "100+", desc: "Tech companies in the Goleta corridor", icon: Zap },
              { stat: "30+", desc: "Years serving Goleta businesses", icon: Building2 },
            ].map((item, i) => (
              <Card key={i} className="border-0 shadow-lg text-center py-8">
                <CardContent>
                  <div className="w-16 h-16 rounded-2xl bg-indigo-100 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-8 h-8 text-indigo-600" />
                  </div>
                  <div className="text-4xl font-bold text-slate-900 mb-2">{item.stat}</div>
                  <p className="text-slate-600">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES FOR GOLETA */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <Badge variant="secondary" className="mb-4">Goleta SEO Services</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              SEO Strategies for Goleta Businesses
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { icon: GraduationCap, title: "Student-Focused SEO", desc: "Target UCSB students with student-specific keywords" },
              { icon: Zap, title: "Tech Company SEO", desc: "B2B SEO for Goleta's growing tech sector" },
              { icon: MapPin, title: "Old Town Visibility", desc: "Dominate searches in historic Goleta center" },
              { icon: Users, title: "Housing & Rentals", desc: "SEO for property management and student housing" },
            ].map((service, i) => (
              <Card key={i} className="border-0 shadow-md hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="w-14 h-14 rounded-xl bg-indigo-100 flex items-center justify-center mb-4">
                    <service.icon className="w-7 h-7 text-indigo-600" />
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
      <section className="py-20 bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-white/20 text-white border-0">Goleta Success Stories</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Goleta Businesses We Help
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                quote: "Our student-focused SEO strategy brought in 40% more UCSB customers.",
                author: "Maria Santos",
                business: "Old Town Cafe Goleta",
                result: "40% more students"
              },
              {
                quote: "Finally ranking for tech corridor searches. Our B2B leads doubled.",
                author: "David Park",
                business: "Goleta Tech Solutions",
                result: "2x B2B leads"
              },
              {
                quote: "We dominate student housing searches now. Best investment ever.",
                author: "Lisa Johnson",
                business: "Goleta Property Management",
                result: "#1 for housing searches"
              },
            ].map((testimonial, i) => (
              <Card key={i} className="border-0 bg-white/10 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="flex gap-1 mb-4">
                    {[1,2,3,4,5].map((star) => (
                      <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-indigo-100 mb-6 italic">"{testimonial.quote}"</p>
                  <div className="border-t border-white/20 pt-4">
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-indigo-200">{testimonial.business}</p>
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
                <Badge className="mb-4 bg-indigo-500 text-white border-0">Free SEO Audit</Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Ready to Dominate Goleta Search?
                </h2>
                <p className="text-slate-300 mb-6">
                  Get a free audit showing exactly how to capture the UCSB and Goleta market.
                </p>
                <ul className="space-y-3 mb-8">
                  {["Complete Goleta SEO audit", "UCSB student keyword analysis", "Competitor analysis", "90-day ranking roadmap"].map((item, i) => (
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
                    <Button className="w-full h-12 text-lg bg-indigo-600 hover:bg-indigo-700">
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
