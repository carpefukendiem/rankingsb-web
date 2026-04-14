import { Metadata } from "next"
import { clampMetaDescription } from "@/lib/meta-helpers"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Phone, ArrowRight } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: {
    absolute: "Website, SEO & Automation for 805 Businesses | Ranking SB",
  },
  description: clampMetaDescription(
    "Custom website built to rank + AI automation that follows up every lead in minutes. $3,000–$5,000 setup. $250/month. No contracts. No hidden fees."
  ),
}

const pillar1Bullets = [
  "Sub-2-second mobile load (Core Web Vitals passing on day one)",
  "Full technical SEO — schema markup, canonical tags, sitemap, structured data",
  "Google Analytics 4 + Google Search Console verified and tracking before launch",
  "Location pages, service pages, blog architecture ready to rank",
  "Click-to-call and lead capture forms wired to The Ranking App",
  "SSL, security headers, performance infrastructure",
]

const pillar2Bullets = [
  "Google Business Profile fully optimized — categories, description, photos, services, Q&A",
  "Citation audit and build across 40+ directories with full NAP consistency",
  "Review generation system — automated, compliant, running within 30 days",
  "On-page SEO for every page of your site",
  "Schema markup validated for rich results eligibility",
  "Monthly reports showing calls, direction requests, and rankings — not just impressions",
]

const pillar3Bullets = [
  "Automated lead follow-up by text and email the moment a form is submitted",
  "Missed call text-back within 60 seconds",
  "Appointment booking integrated into your website and calendar",
  "Pipeline tracking — know where every lead stands at every moment",
  "Review request automation — sent after every completed job",
  "AI voice agent option — answers calls, qualifies leads, books appointments 24/7",
]

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      <section className="relative py-20 lg:py-28 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-white/10 text-white border-white/20">
              The 805 Growth Engine
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Every Tool Your Business Needs to Own Google and Never Miss a Lead
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              The 805 Growth Engine is one integrated system. Below is exactly
              what&apos;s inside, what each add-on costs, and how everything works
              together. No hidden fees. No long-term contracts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/free-audit">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-100">
                  <Phone className="w-5 h-5 mr-2" />
                  Claim Your Free Growth Audit
                </Button>
              </Link>
              <Link href="/ranking-app">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                >
                  The Ranking App
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-slate-900">
            The 805 Growth Engine — What&apos;s Included
          </h2>
          <p className="text-center text-slate-600 mb-10">
            <span className="font-semibold text-slate-900">
              Setup: $3,000 – $5,000 one-time
            </span>
          </p>

          {/* Pillar 1 */}
          <Card className="mb-10 border-slate-200 shadow-sm">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-3">
                Custom Website
              </h3>
              <p className="text-slate-600 mb-4 leading-relaxed">
                A custom Next.js website built from scratch for your business. Not a
                template. Not a drag-and-drop builder. Code that Google loves, that
                loads fast on every device, and that&apos;s designed to convert
                visitors into calls.
              </p>
              <p className="text-sm font-semibold text-slate-900 mb-3">
                What&apos;s built in:
              </p>
              <ul className="space-y-2 mb-6">
                {pillar1Bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-slate-700 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
              <p className="text-blue-700 font-semibold text-sm italic">
                Most agencies build websites. We build ranked websites.
              </p>
            </CardContent>
          </Card>

          {/* Pillar 2 */}
          <Card className="mb-10 border-slate-200 shadow-sm">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Local SEO</h3>
              <p className="text-slate-600 mb-4 leading-relaxed">
                Everything Google needs to rank your business in the Local Pack and
                organic results for the searches your customers are making right
                now.
              </p>
              <p className="text-sm font-semibold text-slate-900 mb-3">
                What&apos;s included:
              </p>
              <ul className="space-y-2 mb-6">
                {pillar2Bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-slate-700 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
              <p className="text-blue-700 font-semibold text-sm italic">
                We don&apos;t just rank your website. We rank your business.
              </p>
            </CardContent>
          </Card>

          {/* Pillar 3 */}
          <Card className="mb-10 border-slate-200 shadow-sm">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-3">
                The Ranking App
              </h3>
              <p className="text-slate-600 mb-4 leading-relaxed">
                Your own branded CRM and automation platform. Every lead gets
                followed up within minutes — automatically, without you lifting a
                finger.
              </p>
              <p className="text-sm font-semibold text-slate-900 mb-3">
                What&apos;s wired in:
              </p>
              <ul className="space-y-2 mb-6">
                {pillar3Bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-slate-700 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-blue-50/50">
            <CardContent className="p-8 text-center md:text-left">
              <p className="text-sm font-semibold text-blue-800 uppercase tracking-wide mb-2">
                Monthly
              </p>
              <p className="text-3xl font-bold text-slate-900 mb-3">$250/month</p>
              <p className="text-slate-600 text-sm leading-relaxed">
                Hosting, webmastering, CRM maintenance, SEO monitoring, and direct
                consulting access. Everything running. Nothing falling through the
                cracks.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Add-ons */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-slate-900">
            Accelerate Your Engine
          </h2>
          <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
            The 805 Growth Engine runs on its own. These add-ons pour fuel on it.
          </p>

          <div className="space-y-8">
            {[
              {
                name: "SyncLocal — $65/month (3-month minimum)",
                tagline: "One update. 200+ directories. Zero inconsistencies.",
                body: "Your business information synced and protected across 200+ directories, data aggregators, maps platforms, and voice search assistants — automatically. One update, everywhere at once.",
                bestFor:
                  "Any business that has moved, changed phone numbers, or wants voice search coverage (Siri, Alexa, Google Assistant).",
              },
              {
                name: "Social Content Management — $250/month",
                body: "Consistent, on-brand social posts published every week — without you writing a word or touching your phone. We handle the calendar, copy, graphics, and scheduling. You review and approve.",
                bestFor:
                  "Restaurants, salons, contractors, and any business where social proof reinforces trust.",
              },
              {
                name: "Google Ads Management — $200/month + ad budget",
                body: "Immediate leads while your SEO builds. Full campaign management — keywords, ad copy, bid strategy, conversion tracking wired to The Ranking App. Industry average management fee is $500–$1,500/month. We charge $200 because the system is already built.",
                bestFor:
                  "New businesses, seasonal spikes, or competitive markets where SEO needs a paid supplement.",
              },
              {
                name: "AI Voice Agent — $100/month unlimited (or Pay-As-You-Go)",
                body: "Answers your phone, qualifies leads, books appointments, and handles common questions — 24/7. Integrated with your Ranking App calendar. Sounds human. Two options: Unlimited: $100/month — all calls covered. Pay-As-You-Go: no monthly fee, pay per call handled.",
                bestFor:
                  "Any business that misses calls after hours or handles a high volume of repetitive inquiries.",
              },
              {
                name: "À La Carte Hosting — $30/month",
                body: "Fast, managed hosting for your existing website. Paying more elsewhere? We match your rate and migrate you free.",
              },
              {
                name: "À La Carte Website — $750–$5,000 one-time",
                body: "Need a website but not the full Engine? Standalone Next.js sites at every scope level — from single-page lead capture to full multi-page service sites. All technically optimized. All yours to own outright.",
              },
            ].map((addon, i) => (
              <Card key={i} className="border-slate-200">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {addon.name}
                  </h3>
                  {"tagline" in addon && addon.tagline && (
                    <p className="text-blue-700 font-medium text-sm mb-3">
                      {addon.tagline}
                    </p>
                  )}
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">
                    {addon.body}
                  </p>
                  {"bestFor" in addon && addon.bestFor && (
                    <p className="text-sm text-slate-700">
                      <span className="font-semibold">Best for:</span>{" "}
                      {addon.bestFor}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Not sure which option fits your business?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Start with a free Growth Audit. We&apos;ll look at your current
            rankings, your competitors, and your market — then tell you exactly what
            you need and what it&apos;ll cost. No obligation, delivered in 24
            hours.
          </p>
          <Link href="/free-audit">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-100">
              <Phone className="w-5 h-5 mr-2" />
              Claim Your Free Growth Audit
            </Button>
          </Link>
        </div>
      </section>
    </main>
  )
}
