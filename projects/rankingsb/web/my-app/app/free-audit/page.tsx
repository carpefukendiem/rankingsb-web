import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { CheckCircle, Phone, ArrowRight, Search, BarChart3, Shield, Clock, Star } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Free SEO Audit Santa Barbara | Rankingsb",
  description: "Get a free SEO audit showing exactly why your Santa Barbara or Ventura County business isn't ranking on Google. Delivered in 24 hours. No obligation.",
  keywords: ["free SEO audit Santa Barbara", "SEO audit Ventura County", "local SEO audit", "free Google ranking audit"],
}

export default function FreeAuditPage() {
  return (
    <main className="min-h-screen">
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&h=1080&fit=crop"
            alt="SEO analytics dashboard"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-blue-900/90 to-slate-900/95" />
        </div>

        <div className="container relative mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm text-white/90">$500 Value — Yours Free</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-white">
                  Free SEO Audit:<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                    See Why You're Not Ranking
                  </span>
                </h1>
                <p className="text-xl text-slate-300 mb-8">
                  Get a complete analysis of your website, competitors, and Google rankings.
                  We'll show you exactly what's wrong and how to fix it — in 24 hours.
                </p>
                <ul className="space-y-4 mb-8">
                  {[
                    { icon: Search, text: "Complete technical SEO audit" },
                    { icon: BarChart3, text: "Competitor ranking analysis" },
                    { icon: Shield, text: "Keyword opportunity report" },
                    { icon: Clock, text: "90-day ranking roadmap" },
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-300">
                      <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                        <item.icon className="w-5 h-5 text-blue-400" />
                      </div>
                      {item.text}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-4 text-sm text-slate-400">
                  {["No contracts", "No credit card", "No spam", "24-hour delivery"].map(t => (
                    <div key={t} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Card className="border-0 shadow-2xl">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-slate-900">Request Your Free Audit</h2>
                    <p className="text-slate-500">We'll deliver it within 24 hours</p>
                  </div>

                  {/*
                    =====================================================
                    GHL FORM EMBED: Replace this HTML form with your
                    GoHighLevel form embed code.

                    To get your GHL embed code:
                    1. Log into app.rankingsb.com (or your GHL sub-account)
                    2. Go to: Sites → Forms → [Your Form] → Integrate
                    3. Copy the iframe embed code
                    4. Replace the <form> below with:
                    <iframe src="YOUR_GHL_FORM_URL" ... />
                    =====================================================
                  */}
                  <form className="space-y-4" action="https://api.rankingsb.com/lead" method="post">
                    <input type="hidden" name="source" value="free-audit-page" />
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-1 block">Your Name *</label>
                      <Input name="name" placeholder="John Smith" className="h-12" required />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-1 block">Business Name *</label>
                      <Input name="business" placeholder="Your Business LLC" className="h-12" required />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-1 block">Email Address *</label>
                      <Input type="email" name="email" placeholder="john@yourbusiness.com" className="h-12" required />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-1 block">Phone Number *</label>
                      <Input type="tel" name="phone" placeholder="(805) 555-0123" className="h-12" required />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-1 block">Website URL</label>
                      <Input name="website" placeholder="https://yourbusiness.com" className="h-12" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-1 block">Industry</label>
                      <select name="industry" className="w-full h-12 px-3 border rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">Select your industry</option>
                        <option value="electrician">Electrician</option>
                        <option value="hvac">HVAC / Heating & Cooling</option>
                        <option value="plumber">Plumber</option>
                        <option value="roofer">Roofing</option>
                        <option value="solar">Solar</option>
                        <option value="attorney">Attorney / Law Firm</option>
                        <option value="dental">Dental</option>
                        <option value="medical">Medical Practice</option>
                        <option value="real-estate">Real Estate</option>
                        <option value="restaurant">Restaurant</option>
                        <option value="contractor">General Contractor</option>
                        <option value="winery">Winery / Wine Bar</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <Button type="submit" className="w-full h-12 text-lg bg-blue-600 hover:bg-blue-700 mt-2">
                      Get My Free SEO Audit
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </form>
                  <p className="text-xs text-slate-400 text-center mt-4">
                    No spam, ever. We respect your privacy.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <Badge variant="secondary" className="mb-4">What's In Your Audit</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
              Your Complete SEO Analysis
            </h2>
            <p className="text-xl text-slate-600">
              Everything you need to understand your Google ranking and how to improve it —
              delivered within 24 hours.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                title: "Technical Audit",
                desc: "Site speed, mobile issues, broken links, schema markup, and indexation problems",
                image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop"
              },
              {
                title: "Competitor Analysis",
                desc: "What your top 3 local competitors do differently — and how to beat them",
                image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop"
              },
              {
                title: "Keyword Report",
                desc: "Best keywords for your industry and city with monthly search volume",
                image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=400&h=300&fit=crop"
              },
              {
                title: "Action Plan",
                desc: "Step-by-step roadmap to page 1 rankings — prioritized by impact",
                image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop"
              },
            ].map((item, i) => (
              <Card key={i} className="border-0 shadow-md overflow-hidden">
                <div className="h-32 overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4 -mt-10 relative z-10 border-4 border-white">
                    <CheckCircle className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold text-center mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-600 text-center">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4">100% Free, No Obligation</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
              Why Do We Offer This Free?
            </h2>
            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
              We do this to demonstrate our expertise. Even if you don't hire us,
              you'll walk away with a valuable analysis of your online presence.
              We're confident that once you see what we find — and what's possible — you'll want to work together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:8053077600">
                <Button size="lg" className="gap-2 text-lg px-8 py-6 bg-blue-600 hover:bg-blue-700 text-white">
                  <Phone className="w-5 h-5" />
                  Call (805) 307-7600
                </Button>
              </a>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="gap-2 text-lg px-8 py-6">
                  Send a Message
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
