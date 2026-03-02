import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Phone, Star, TrendingUp, Users, Search, MapPin } from "lucide-react"
import Link from "next/link"
import { CTASection } from "@/components/shared/CTASection"

export const metadata: Metadata = {
  title: "SEO for Spas & Beauty Salons Santa Barbara | Rankingsb",
  description: "Dominate local search for your spa, salon, or beauty business in Santa Barbara and Ventura County. Get found by clients searching for massage, facials, hair, nails & more.",
  keywords: ["spa SEO Santa Barbara", "beauty salon SEO Ventura County", "salon marketing Santa Barbara", "massage therapy SEO", "nail salon SEO Santa Barbara"],
}

export default function SpaBeautySEOPage() {
  return (
    <main className="min-h-screen">
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1920&h=1080&fit=crop"
            alt="Spa and beauty SEO Santa Barbara"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-rose-900/95 via-slate-900/95 to-pink-900/90" />
        </div>
        <div className="container relative mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
              <Star className="w-4 h-4 text-pink-400" />
              <span className="text-sm text-white/90">Spa & Beauty Industry SEO</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white">
              SEO for Spas &<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-400">
                Beauty Businesses
              </span>
            </h1>
            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
              When someone searches "massage near me" or "best salon in Santa Barbara," your business
              should be the first thing they see. We make that happen.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/free-audit">
                <Button size="lg" className="gap-2 text-lg px-8 py-6 bg-pink-500 hover:bg-pink-400 text-white">
                  <Phone className="w-5 h-5" />
                  Get Free Beauty Business Audit
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
              { stat: "72%", label: "of beauty clients book after finding business online" },
              { stat: "4.5★", label: "avg Google rating needed to win new clients" },
              { stat: "\"Near Me\"", label: "top search modifier for spa & salon services" },
              { stat: "3x", label: "more bookings from page 1 vs page 2 listings" },
            ].map((s, i) => (
              <div key={i}>
                <div className="text-4xl font-bold text-pink-600 mb-2">{s.stat}</div>
                <p className="text-sm text-slate-600">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Beauty Business Types We Serve</Badge>
            <h2 className="text-3xl font-bold mb-4 text-slate-900">SEO for Every Beauty Business</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              From luxury day spas to nail salons and independent stylists, we know how to get beauty businesses found online.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {[
              "Day Spas & Med Spas",
              "Hair Salons & Barbershops",
              "Nail Salons & Nail Studios",
              "Massage Therapy Practices",
              "Skincare & Facial Studios",
              "Lash & Brow Studios",
              "Waxing & Threading Services",
              "Tanning Salons & Spray Tan",
              "Makeup Artists & Studios",
              "Wellness & Holistic Centers",
              "Tattoo & Body Art Studios",
              "Blow Dry Bars",
            ].map((type, i) => (
              <div key={i} className="flex items-center gap-3 p-4 rounded-lg bg-white border border-slate-200">
                <CheckCircle className="w-5 h-5 text-pink-500 shrink-0" />
                <span className="text-sm font-medium text-slate-700">{type}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge variant="secondary" className="mb-4">Our Strategy</Badge>
              <h2 className="text-3xl font-bold mb-4 text-slate-900">How We Get Beauty Businesses to Page 1</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: MapPin,
                  title: "Google Business Profile",
                  desc: "Optimize your GBP with photos, services, booking links, and keyword-rich descriptions to dominate the local map pack."
                },
                {
                  icon: Star,
                  title: "Review Generation",
                  desc: "Automate client review requests after appointments. More 5-star reviews = higher rankings and more trust."
                },
                {
                  icon: Search,
                  title: "Local Keyword Targeting",
                  desc: "Rank for 'massage Santa Barbara,' 'hair salon near me,' and every service + location combo your ideal clients search."
                },
                {
                  icon: Users,
                  title: "Service Page Optimization",
                  desc: "Individual pages for each service (facials, massage, nails, etc.) targeting specific high-intent search queries."
                },
                {
                  icon: TrendingUp,
                  title: "Booking Conversion",
                  desc: "Optimize your website to turn visitors into booked appointments with clear CTAs, scheduling integrations, and trust signals."
                },
                {
                  icon: Star,
                  title: "Photo & Visual SEO",
                  desc: "Your before/afters and studio photos are powerful SEO assets. We optimize images and build visual content strategy."
                },
              ].map((f, i) => (
                <Card key={i} className="border-0 shadow-md hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-14 h-14 rounded-xl bg-pink-100 flex items-center justify-center mb-4">
                      <f.icon className="w-7 h-7 text-pink-600" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                    <p className="text-sm text-slate-600">{f.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-rose-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900">Why Beauty Businesses Struggle Online</h2>
              <p className="text-slate-600 mt-4">Common issues we see with spas and salons in Santa Barbara and Ventura County:</p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                "Not showing up in Google Maps for 'near me' searches",
                "Outdated Google Business Profile with no photos",
                "Low or no online reviews — clients don't know to leave them",
                "No service pages targeting specific keywords",
                "Instagram-heavy but no Google presence",
                "Slow website loading on mobile",
                "No booking link or online scheduling",
                "Competitors outranking you for your own specialty",
              ].map((issue, i) => (
                <div key={i} className="flex items-center gap-3 p-4 rounded-lg border border-red-200 bg-white">
                  <div className="w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center text-xs font-bold shrink-0">✗</div>
                  <span className="text-sm text-slate-700">{issue}</span>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/free-audit">
                <Button size="lg" className="bg-pink-600 hover:bg-pink-700 text-white">
                  Get Your Free Beauty Business SEO Audit →
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">Local SEO for Beauty</Badge>
              <h2 className="text-3xl font-bold text-slate-900">Serving Santa Barbara & Ventura County Beauty Businesses</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                "Santa Barbara", "Goleta", "Montecito", "Carpinteria", "Ventura",
                "Oxnard", "Thousand Oaks", "Camarillo", "Simi Valley", "Ojai", "Solvang", "Summerland"
              ].map((city, i) => (
                <div key={i} className="flex items-center gap-2 p-3 rounded-lg bg-slate-50">
                  <MapPin className="w-4 h-4 text-pink-500" />
                  <span className="text-sm text-slate-700">{city}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to Fill Your Appointment Book?"
        subtitle="Let us show you exactly what it takes to get your spa or salon to the top of Google in Santa Barbara and Ventura County."
        bullets={["Free SEO audit", "Competitor analysis", "Ranking roadmap", "No commitment"]}
        formTitle="Free Beauty Business SEO Audit"
      />
    </main>
  )
}
