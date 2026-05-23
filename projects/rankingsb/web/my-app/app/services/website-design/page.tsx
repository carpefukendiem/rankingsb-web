import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, CheckCircle2, Code2, MapPin, Phone, Search, Smartphone, Target, XCircle, Zap } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Website Design Santa Barbara | SEO-Optimized Websites | Ranking SB",
  description: "Beautiful, fast, SEO-ready websites for Santa Barbara and Ventura County businesses. Every site built to rank and convert from day one.",
  keywords: ["website design Santa Barbara", "web design Ventura County", "SEO website Santa Barbara", "local business website design"],
}

export default function WebsiteDesignPage() {
  return (
    <main className="min-h-screen">
      <section className="relative overflow-hidden py-16 md:py-20">
        <div className="absolute inset-0">
          <img
            src="/images/best-website-design-santa-barbara.png"
            alt="Custom website design and development for Santa Barbara businesses — built to rank and convert"
            className="w-full h-full object-cover object-center"
          />
          <div className="hero-overlay absolute inset-0" />
        </div>
        <div className="container relative mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
              <Code2 className="w-4 h-4 text-amber-400" />
              <span className="text-sm text-white/90">SEO-Optimized Website Design</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white">
              Websites Built to<br />
              <span className="text-white">
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
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0F1A2E] to-transparent" />
      </section>

      <section className="border-t border-[#1a2942] bg-[#0F1A2E] py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
            {[
              { stat: "<2s", label: "page load time (Google standard)" },
              { stat: "100", label: "Google PageSpeed score target" },
              { stat: "Mobile", label: "first design for Google's mobile index" },
              { stat: "SEO", label: "built-in from the first line of code" },
            ].map((s, i) => (
              <div key={i}>
                <div className="text-4xl md:text-5xl font-bold text-white">{s.stat}</div>
                <p className="text-slate-300 text-sm md:text-base text-center mt-2 max-w-[180px] mx-auto">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="mb-4 text-sm font-semibold uppercase tracking-widest text-[#D97706]">What We Build</div>
            <h2 className="text-3xl md:text-5xl font-bold text-[#0F1A2E] text-center mb-16">Every Website Includes</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { icon: Zap, title: "Lightning Fast", desc: "Optimized for Core Web Vitals with a sub-2-second load time that Google rewards with higher rankings." },
              { icon: Smartphone, title: "Mobile-First", desc: "Designed for phones first, then scaled to desktop — matching how 70% of your customers browse." },
              { icon: Search, title: "On-Page SEO", desc: "Built-in SEO structure: proper heading hierarchy, schema markup, meta tags, and local keyword optimization." },
              { icon: Target, title: "Conversion Focused", desc: "Clear CTAs, trust signals, and user flows designed to turn visitors into inquiries and calls." },
              { icon: MapPin, title: "Local SEO Ready", desc: "Location pages, schema markup, and Google Business Profile integration from the start." },
              { icon: Code2, title: "Modern Tech", desc: "Built on Next.js or WordPress — fast, secure, and easy to update with content you can manage yourself." },
            ].map((f, i) => (
              <div
                key={i}
                className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/50 transition-all duration-300 hover:border-amber-500/60 hover:shadow-xl hover:shadow-amber-500/10"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center mb-5">
                  <f.icon className="text-amber-600 w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#0F1A2E] mb-3">{f.title}</h3>
                <p className="text-slate-600 text-base leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0F1A2E] py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">Is Your Current Website Hurting Your SEO?</h2>
              <p className="text-slate-300 text-center mb-12 text-lg">Common issues we see with Santa Barbara business websites:</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-4xl mx-auto">
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
                <div key={i} className="flex items-center gap-3 rounded-xl border border-red-500/20 bg-[#0A1424] px-5 py-4">
                  <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                  <span className="text-slate-200 text-base">{issue}</span>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link href="/free-audit">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                  Check If Your Site Has These Issues →
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-5xl font-bold text-[#0F1A2E] mb-4">Get a Website That Ranks and Converts</h2>
                <p className="text-slate-600 text-lg leading-relaxed mb-6">
                  We'll audit your current site and show you exactly what's holding it back — and what a new site could do for your business.
                </p>
                <ul className="space-y-3 mb-8">
                  {["Free website audit", "Speed & SEO score", "Conversion analysis", "Redesign quote"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                      <CheckCircle2 className="text-green-600 w-5 h-5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-4">
                  <Link href="/free-audit">
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/30">
                      <Phone className="w-4 h-4 mr-2" />
                      Get Free Audit
                    </Button>
                  </Link>
                  <a href="tel:8053077600">
                    <Button size="lg" variant="outline" className="bg-white border-2 border-[#0F1A2E] text-[#0F1A2E] hover:bg-[#0F1A2E] hover:text-white transition-colors duration-300">
                      Call (805) 307-7600
                    </Button>
                  </a>
                </div>
              </div>
              <div className="bg-[#0F1A2E] border border-[#1a2942] rounded-2xl p-8 shadow-2xl shadow-slate-300/40">
                <h3 className="text-2xl font-bold text-white mb-1">Free Website Review</h3>
                <p className="text-slate-300 mb-6 text-sm">We'll deliver your audit within 24 hours</p>
                <form className="space-y-4">
                  <Input placeholder="Your Name" className="h-12 bg-[#0A1424] border border-[#1a2942] text-white placeholder-slate-500 rounded-lg" />
                  <Input placeholder="Business Name" className="h-12 bg-[#0A1424] border border-[#1a2942] text-white placeholder-slate-500 rounded-lg" />
                  <Input type="email" placeholder="Email Address" className="h-12 bg-[#0A1424] border border-[#1a2942] text-white placeholder-slate-500 rounded-lg" />
                  <Input type="tel" placeholder="(805) 555-0123" className="h-12 bg-[#0A1424] border border-[#1a2942] text-white placeholder-slate-500 rounded-lg" />
                  <Button className="w-full h-12 text-lg bg-blue-600 hover:bg-blue-700">
                    Send My Free Audit
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </form>
                <p className="text-sm text-slate-400 text-center mt-4">No spam. No contracts. No obligation.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
