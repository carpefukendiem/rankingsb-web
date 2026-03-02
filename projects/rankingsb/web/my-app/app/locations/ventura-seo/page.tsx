import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Phone, MapPin, Star, TrendingUp, Building2, Users } from "lucide-react"
import Link from "next/link"
import { CTASection } from "@/components/shared/CTASection"

export const metadata: Metadata = {
  title: "SEO Company Ventura CA | Local SEO Services Ventura | Rankingsb",
  description: "Expert local SEO services in Ventura, CA. Get your Ventura business to page 1 of Google in 90 days. Free SEO audit for Ventura County businesses.",
  keywords: ["SEO Ventura", "local SEO Ventura CA", "SEO company Ventura", "digital marketing Ventura", "Google ranking Ventura California"],
  openGraph: {
    title: "SEO Services Ventura CA | Rankingsb",
    description: "Get your Ventura business to page 1 on Google. Expert local SEO services with a 90-day ranking guarantee.",
    type: "website",
  },
}

export default function VenturaSEOPage() {
  return (
    <main className="min-h-screen">
      <section className="relative py-20 lg:py-28 overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
        </div>
        <div className="container relative mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
              <MapPin className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-white/90">Serving Ventura, California</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white">
              SEO Services Ventura CA<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Rank #1 on Google
              </span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Ventura businesses trust Rankingsb to dominate local search. From downtown Main Street to the harbor,
              we help Ventura companies get found by customers who are ready to buy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/free-audit">
                <Button size="lg" className="gap-2 text-lg px-8 py-6 bg-blue-500 hover:bg-blue-400 text-white shadow-lg shadow-blue-500/25">
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
              {["90-Day Ranking Guarantee", "No Long-Term Contracts", "Free SEO Audit", "Local 805 Team"].map(t => (
                <div key={t} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <Badge variant="secondary" className="mb-4">The Ventura Market</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">Why Ventura Businesses Need Local SEO</h2>
            <p className="text-xl text-slate-600">Ventura's coastal economy creates unique opportunities and competition for local businesses.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { stat: "115,000+", desc: "Ventura County residents searching for local services monthly", icon: Users },
              { stat: "2,000+", desc: "Active businesses competing for Google's top spots in Ventura", icon: Building2 },
              { stat: "Top 3", desc: "Positions capture 68% of all clicks in local search results", icon: TrendingUp },
            ].map((item, i) => (
              <Card key={i} className="border-0 shadow-lg text-center py-8">
                <CardContent>
                  <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold text-slate-900 mb-2">{item.stat}</div>
                  <p className="text-slate-600 text-sm">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <Badge variant="secondary" className="mb-4">Industries We Serve in Ventura</Badge>
            <h2 className="text-3xl font-bold mb-4">SEO for Every Ventura Business</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {["Restaurants", "Contractors", "Plumbers", "Electricians", "HVAC", "Attorneys", "Dentists", "Medical Practices", "Real Estate", "Auto Repair", "Landscaping", "Roofing", "Solar", "Spas & Salons", "Retail", "Fitness Studios"].map(ind => (
              <Badge key={ind} variant="outline" className="px-4 py-2 text-sm hover:bg-blue-50">{ind}</Badge>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ventura Business Success Stories</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { quote: "We went from page 4 to page 1 for 'plumber Ventura' and our calls doubled.", author: "Mike Torres", business: "Ventura Coast Plumbing", result: "Page 1 in 45 days" },
              { quote: "Best marketing investment we've made for our downtown restaurant.", author: "Ana Reyes", business: "Main Street Bistro Ventura", result: "200% traffic increase" },
              { quote: "Finally ranking for 'dentist Ventura' — consistently getting new patients monthly.", author: "Dr. Paul Kim", business: "Pacific Smiles Ventura", result: "#1 for dentist Ventura" },
            ].map((t, i) => (
              <Card key={i} className="border-0 bg-white/10 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="flex gap-1 mb-4">{[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}</div>
                  <p className="text-blue-100 mb-6 italic">"{t.quote}"</p>
                  <div className="border-t border-white/20 pt-4">
                    <p className="font-semibold">{t.author}</p>
                    <p className="text-sm text-blue-200">{t.business}</p>
                    <Badge className="mt-2 bg-green-500 text-white border-0 text-xs">{t.result}</Badge>
                  </div>
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
              <h2 className="text-3xl font-bold">Ventura SEO FAQ</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { q: "How long to rank in Ventura?", a: "Most Ventura clients see page 1 results within 60-90 days for their main keywords, depending on industry competition." },
                { q: "Do you serve all of Ventura?", a: "Yes — from Downtown Ventura to Midtown, the Harbor area, and surrounding neighborhoods. We target all Ventura search areas." },
                { q: "What industries do you help in Ventura?", a: "All local service businesses: plumbers, HVAC, electricians, contractors, restaurants, dentists, attorneys, and more." },
                { q: "What does Ventura SEO include?", a: "Google Business Profile optimization, local citations, on-page SEO, content creation, and monthly reporting on rankings and leads." },
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

      <section className="py-12 bg-slate-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Also Serving All of Ventura County</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { href: "/locations/oxnard-seo", label: "Oxnard" },
              { href: "/locations/thousand-oaks-seo", label: "Thousand Oaks" },
              { href: "/locations/camarillo-seo", label: "Camarillo" },
              { href: "/locations/moorpark-seo", label: "Moorpark" },
              { href: "/locations/simi-valley-seo", label: "Simi Valley" },
              { href: "/locations/ojai-seo", label: "Ojai" },
              { href: "/locations/santa-paula-seo", label: "Santa Paula" },
              { href: "/locations/newbury-park-seo", label: "Newbury Park" },
            ].map(loc => (
              <Link key={loc.href} href={loc.href}>
                <Badge variant="secondary" className="px-4 py-2 cursor-pointer hover:bg-blue-100">{loc.label}</Badge>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to Dominate Ventura Search?"
        subtitle="Get a free Ventura SEO audit and see exactly how to rank above your competitors on Google."
        bullets={["Complete Ventura market analysis", "Competitor ranking report", "Keyword opportunity map", "90-day ranking roadmap"]}
        formTitle="Free Ventura SEO Audit"
      />
    </main>
  )
}
