import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { CheckCircle, Phone, ArrowRight, MapPin, GraduationCap, Home, TrendingUp, Star, Users, Store } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "SEO Isla Vista | Rankingsb Digital Marketing",
  description: "Get more customers with local SEO in Isla Vista. 90-day ranking guarantee. Free audit shows exactly how to rank higher on Google.",
  keywords: ["SEO Isla Vista", "digital marketing Isla Vista", "local SEO Isla Vista", "Isla Vista SEO agency", "UCSB area SEO"],
  openGraph: {
    title: "SEO Isla Vista | Rankingsb",
    description: "Get more customers with local SEO in Isla Vista. 90-day ranking guarantee.",
    type: "website",
  },
}

export default function IslaVistaSEOPage() {
  return (
    <main className="min-h-screen">
      {/* HERO SECTION */}
      <section className="relative py-20 lg:py-28 overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        <div className="container relative mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
              <MapPin className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-white/90">Serving Isla Vista & UCSB Area</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white">
              SEO Isla Vista<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Rank #1 on Google
              </span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Isla Vista businesses trust us to get them to page 1. From Del Playa to Embarcadero Loop, 
              we help local companies dominate local search and get more customers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/free-audit">
                <Button size="lg" className="gap-2 text-lg px-8 py-6 bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-500/25">
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
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>90-Day Ranking Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>UCSB Area Specialists</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>No Long-Term Contracts</span>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* PROBLEM SECTION */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <Badge variant="secondary" className="mb-4">The Isla Vista Challenge</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
              Why Isla Vista Businesses<br />Struggle With SEO
            </h2>
            <p className="text-xl text-slate-600">
              Isla Vista's unique market presents specific challenges. The student population, 
              seasonal turnover, and competitive rental market make local SEO critical.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { stat: "25,000+", desc: "UCSB students searching for local services", icon: GraduationCap },
              { stat: "800+", desc: "Registered businesses in Isla Vista", icon: Store },
              { stat: "Top 3", desc: "Get 67% of all local search clicks", icon: TrendingUp },
            ].map((item, i) => (
              <Card key={i} className="border-0 shadow-lg text-center py-8">
                <CardContent>
                  <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="text-4xl font-bold text-slate-900 mb-2">{item.stat}</div>
                  <p className="text-slate-600">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTION SECTION */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <Badge variant="secondary" className="mb-4">Our Solution</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Local SEO Built for Isla Vista
            </h2>
            <p className="text-xl text-slate-600">
              We understand the Isla Vista market—from student housing to family rentals. 
              Our strategies are tailored for local success.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { icon: MapPin, title: "Local Maps Optimization", desc: "Dominate Google Maps for Isla Vista searches" },
              { icon: Users, title: "Student Marketing", desc: "Capture the UCSB student market effectively" },
              { icon: Home, title: "Rental SEO", desc: "Rank for rental properties and housing searches" },
              { icon: Store, title: "Small Business", desc: "Targeted SEO for IV shops and restaurants" },
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

      {/* NEIGHBORHOODS SECTION */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <Badge variant="secondary" className="mb-4">Areas We Serve</Badge>
            <h2 className="text-3xl font-bold mb-4">Isla Vista SEO Services</h2>
            <p className="text-slate-600">Helping businesses rank across the entire Isla Vista area</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {["Del Playa Drive", "Embarcadero Loop", "Sueno Road", "El Colegio Road", "Pasado Road", "Sabado Tarde", "Trigo Road", "Cordoba Road"].map((area) => (
              <Badge key={area} variant="outline" className="px-4 py-2 text-sm hover:bg-blue-50 cursor-pointer">
                {area}
              </Badge>
            ))}
          </div>
          <div className="mt-12 text-center">
            <p className="text-slate-500 mb-4">Also serving nearby areas:</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/locations/goleta-seo"><Badge variant="secondary" className="cursor-pointer hover:bg-blue-100">Goleta</Badge></Link>
              <Link href="/locations/santa-barbara-seo"><Badge variant="secondary" className="cursor-pointer hover:bg-blue-100">Santa Barbara</Badge></Link>
              <Link href="/locations/carpinteria-seo"><Badge variant="secondary" className="cursor-pointer hover:bg-blue-100">Carpinteria</Badge></Link>
              <Link href="/locations/summerland-seo"><Badge variant="secondary" className="cursor-pointer hover:bg-blue-100">Summerland</Badge></Link>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-white/20 text-white border-0">Isla Vista Success Stories</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Local Businesses Trust Us
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                quote: "We're now #1 for 'restaurant Isla Vista' and see students daily from Google searches.",
                author: "Maria Santos",
                business: "Embarcadero Eats",
                result: "Page 1 in 45 days"
              },
              {
                quote: "Finally found an SEO company that understands the student market and rental season.",
                author: "David Chen",
                business: "IV Property Management",
                result: "150% traffic increase"
              },
              {
                quote: "Our bike shop ranks for 'bicycle repair Isla Vista' and we get calls every day.",
                author: "Jake Wilson",
                business: "Del Playa Cycles",
                result: "#1 for bike repair IV"
              },
            ].map((testimonial, i) => (
              <Card key={i} className="border-0 bg-white/10 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="flex gap-1 mb-4">
                    {[1,2,3,4,5].map((star) => (
                      <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-blue-100 mb-6 italic">"{testimonial.quote}"</p>
                  <div className="border-t border-white/20 pt-4">
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-blue-200">{testimonial.business}</p>
                    <Badge className="mt-2 bg-green-500 text-white border-0">{testimonial.result}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">FAQ</Badge>
              <h2 className="text-3xl font-bold mb-4">Isla Vista SEO Questions</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { q: "How long to rank in Isla Vista?", a: "Most clients see page 1 results within 60-90 days, depending on competition in your specific industry and location within IV." },
                { q: "Do you work with UCSB student businesses?", a: "Absolutely! We specialize in helping Isla Vista businesses capture the student market and seasonal opportunities." },
                { q: "Can you help my rental property business?", a: "Yes! We have specific strategies for rental companies, property managers, and landlords targeting the IV market." },
                { q: "What's included in the free audit?", a: "We analyze your current rankings, competitors, website issues, and provide a video walkthrough with actionable recommendations." },
              ].map((faq, i) => (
                <Card key={i} className="border-0 shadow-md">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-2">{faq.q}</h3>
                    <p className="text-slate-600 text-sm">{faq.a}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="mb-4 bg-blue-500 text-white border-0">Free SEO Audit</Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Ready to Dominate Isla Vista Search?
                </h2>
                <p className="text-slate-300 mb-6">
                  Get a free 10-minute video audit showing exactly why you're not ranking 
                  and how to beat your competitors in Isla Vista.
                </p>
                <ul className="space-y-3 mb-8">
                  {["Complete technical SEO audit", "Competitor analysis", "Isla Vista keyword opportunities", "90-day ranking roadmap"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-300">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      {item}
                    </li>
                  ))}
                </ul>
                <a href="tel:8053077600">
                  <Button size="lg" className="bg-blue-500 hover:bg-blue-600">
                    <Phone className="w-5 h-5 mr-2" />
                    Call (805) 307-7600
                  </Button>
                </a>
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