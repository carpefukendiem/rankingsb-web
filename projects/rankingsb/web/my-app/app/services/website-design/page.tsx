import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Phone, Zap, Smartphone, Globe, TrendingUp, Code2, Search } from "lucide-react"
import Link from "next/link"
import { CTASection } from "@/components/shared/CTASection"

export const metadata: Metadata = {
  title: "Website Design Santa Barbara | SEO-Optimized Websites | Rankingsb",
  description: "Beautiful, fast, SEO-ready websites for Santa Barbara and Ventura County businesses. Every site built to rank and convert from day one.",
  keywords: ["website design Santa Barbara", "web design Ventura County", "SEO website Santa Barbara", "local business website design"],
}

export default function WebsiteDesignPage() {
  return (
    <main className="min-h-screen">
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1920&h=1080&fit=crop"
            alt="Website design Santa Barbara"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/97 via-slate-800/95 to-blue-900/95" />
        </div>
        <div className="container relative mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
              <Code2 className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-white/90">SEO-Optimized Website Design</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white">
              Websites Built to<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Rank and Convert
              </span>
            </h1>
            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
              Every website we build for Santa Barbara businesses is fast, mobile-first, and optimized
              for local SEO from day one — not as an afterthought.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/free-audit">
                <Button size="lg" className="gap-2 text-lg px-8 py-6 bg-blue-500 hover:bg-blue-400 text-white">
                  <Phone className="w-5 h-5" />
                  Get Free Site Review
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
              { stat: "<2s", label: "page load time (Google standard)" },
              { stat: "100", label: "Google PageSpeed score target" },
              { stat: "Mobile", label: "first design for Google's mobile index" },
              { stat: "SEO", label: "built-in from the first line of code" },
            ].map((s, i) => (
              <div key={i}>
                <div className="text-4xl font-bold text-blue-600 mb-2">{s.stat}</div>
                <p className="text-sm text-slate-600">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">What We Build</Badge>
            <h2 className="text-3xl font-bold mb-4 text-slate-900">Every Website Includes</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { icon: Zap, title: "Lightning Fast", desc: "Optimized for Core Web Vitals with a sub-2-second load time that Google rewards with higher rankings." },
              { icon: Smartphone, title: "Mobile-First", desc: "Designed for phones first, then scaled to desktop — matching how 70% of your customers browse." },
              { icon: Search, title: "On-Page SEO", desc: "Built-in SEO structure: proper heading hierarchy, schema markup, meta tags, and local keyword optimization." },
              { icon: TrendingUp, title: "Conversion Focused", desc: "Clear CTAs, trust signals, and user flows designed to turn visitors into inquiries and calls." },
              { icon: Globe, title: "Local SEO Ready", desc: "Location pages, schema markup, and Google Business Profile integration from the start." },
              { icon: Code2, title: "Modern Tech", desc: "Built on Next.js or WordPress — fast, secure, and easy to update with content you can manage yourself." },
            ].map((f, i) => (
              <Card key={i} className="border-0 shadow-md hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
                    <f.icon className="w-7 h-7 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                  <p className="text-sm text-slate-600">{f.desc}</p>
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
              <h2 className="text-3xl font-bold">Is Your Current Website Hurting Your SEO?</h2>
              <p className="text-slate-600 mt-4">Common issues we see with Santa Barbara business websites:</p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                "Loads in 5+ seconds (losing 50% of visitors)",
                "Not mobile-optimized",
                "No schema markup",
                "Missing or duplicate meta tags",
                "No clear calls-to-action",
                "No local keyword optimization",
                "Can't be found in Google Search Console",
                "Not connected to Google Analytics",
                "No conversion tracking",
                "Poor or missing review sections",
              ].map((issue, i) => (
                <div key={i} className="flex items-center gap-3 p-4 rounded-lg border border-red-200 bg-red-50">
                  <div className="w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center text-xs font-bold shrink-0">✗</div>
                  <span className="text-sm text-slate-700">{issue}</span>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/free-audit">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                  Check If Your Site Has These Issues →
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Get a Website That Ranks and Converts"
        subtitle="We'll audit your current site and show you exactly what's holding it back — and what a new site could do for your business."
        bullets={["Free website audit", "Speed & SEO score", "Conversion analysis", "Redesign quote"]}
        formTitle="Free Website Review"
      />
    </main>
  )
}
