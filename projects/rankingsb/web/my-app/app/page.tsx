import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LeadForm } from "@/components/shared/LeadForm"
import {
  CheckCircle,
  Phone,
  ArrowRight,
  Star,
  TrendingUp,
  BarChart3,
  Zap,
  Shield,
  Quote,
  MapPin,
  Code2,
  Smartphone,
  Target,
  RefreshCw,
  Share2,
} from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: {
    absolute:
      "The 805 Growth Engine | Website, SEO & Automation for 805 Businesses | Rankingsb",
  },
  description:
    "Santa Barbara and Ventura County's complete local growth system. Custom website, page-1 Google rankings, and AI-powered lead automation — built and running in 90 days. From $3,000.",
}

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* HERO */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&h=1080&fit=crop"
            alt="Santa Barbara coastline - local SEO services for California businesses"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-slate-800/90 to-blue-900/95" />
        </div>

        <div className="container relative mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="text-sm text-white/90">
                Trusted by 100+ local businesses in the 805
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-white">
              The Last Website You&apos;ll Ever Need to Buy — And the System That
              Fills It With Customers
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto">
              Most 805 businesses have a website. Almost none have a system. We
              build you one — a custom-coded site that ranks on Google, wired to
              an AI-powered CRM that follows up with every lead automatically.
              Done in 90 days. Maintained forever for $250/month.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <Link href="/free-audit">
                <Button
                  size="lg"
                  className="gap-2 text-lg px-10 py-6 bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-500/25 w-full sm:w-auto"
                >
                  <Phone className="w-5 h-5" />
                  Claim Your Free Growth Audit
                </Button>
              </Link>
              <Link href="/services">
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 text-lg px-8 py-6 border-white/40 text-white hover:bg-white/10 w-full sm:w-auto"
                >
                  See What&apos;s Inside the Engine
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400">
              {[
                "No contracts",
                "Results in 90 days",
                "Local Santa Barbara team",
                "100+ businesses helped",
              ].map((t) => (
                <div key={t} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </section>

      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm text-slate-500 mb-8 uppercase tracking-wider">
            Trusted by local businesses across Santa Barbara
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-60">
            {[
              "Fred's Upholstery",
              "Enzo MMA",
              "Paragon Goleta",
              "Coastal HVAC",
              "Brady Electric",
            ].map((client) => (
              <div
                key={client}
                className="text-lg font-semibold text-slate-400"
              >
                {client}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PAIN */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">
                The Problem
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
                Your Best Customers Are Searching Google Right Now
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                And if you&apos;re not the business they call, one of these four
                problems is why.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {[
                {
                  stat: "91%",
                  desc: "of customers never go past page 1 of Google",
                  icon: BarChart3,
                },
                {
                  stat: "67%",
                  desc: "click one of the top 3 results",
                  icon: TrendingUp,
                },
                {
                  stat: "$10K+",
                  desc: "in lost revenue monthly if you're not there",
                  icon: Zap,
                },
              ].map((item, i) => (
                <Card key={i} className="border-0 shadow-lg text-center py-8">
                  <CardContent>
                    <div className="w-16 h-16 rounded-2xl bg-red-100 flex items-center justify-center mx-auto mb-4">
                      <item.icon className="w-8 h-8 text-red-500" />
                    </div>
                    <div className="text-4xl font-bold text-slate-900 mb-2">
                      {item.stat}
                    </div>
                    <p className="text-slate-600">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {[
                {
                  h: "A website that looks fine and does nothing.",
                  b: "If it's not loading in under 2 seconds on mobile, doesn't have schema markup, and doesn't have a clear path to contact you — it's a brochure, not a business asset. You paid someone to build a brochure.",
                },
                {
                  h: "An SEO agency sending reports nobody understands.",
                  b: "Monthly PDFs full of impressions and domain authority. Meanwhile your phone isn't ringing any more than it was before. Real SEO has one metric: new customers. Everything else is noise.",
                },
                {
                  h: "Leads falling through the cracks because nobody followed up.",
                  b: "A customer finds you on Google at 9pm, fills out your form, and hears nothing until Tuesday morning. By then they've booked your competitor. Without automated follow-up, you're spending money to get leads and then losing them.",
                },
                {
                  h: "Three vendors for three things that should work together.",
                  b: "Your web developer doesn't talk to your SEO person. Your SEO person doesn't touch your CRM. Nobody owns the full picture. You're the one managing all of it.",
                },
              ].map((block, i) => (
                <Card key={i} className="border-slate-200 shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-3">
                      {block.h}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {block.b}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 805 GROWTH ENGINE — 3 STEPS */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <Badge className="mb-4 bg-white/20 text-white border-0">
              Our System
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              The 805 Growth Engine
            </h2>
            <p className="text-xl text-blue-100">
              Not a website package. Not an SEO retainer. A complete, integrated
              growth system — the same infrastructure that costs $15,000–$30,000
              to build at a traditional agency, delivered to 805 businesses for a
              fraction of that.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                label: "01 — Foundation",
                title: "Your website — built to rank and convert",
                body: "A custom-coded Next.js website engineered for speed, search, and conversion. Sub-2-second mobile load. Full technical SEO, schema markup, Google Analytics and Search Console verified before launch. Not a template. Not a page builder. A ranked website.",
                icon: Shield,
              },
              {
                label: "02 — Visibility",
                title: "Local SEO — get found when it matters",
                body: "Google Business Profile fully optimized, 40+ citations built and consistent, review generation system running within 30 days, and content targeting the exact searches your customers make. Monthly reports that show calls and leads — not impressions.",
                icon: MapPin,
              },
              {
                label: "03 — Automation",
                title:
                  "The Ranking App — leads followed up before you set down your coffee",
                body: "Every lead that comes in gets automatically followed up by text, email, and AI conversation within minutes — not hours. Your phone is answered 24/7 by an AI that qualifies leads and books appointments. Every missed call gets a text back in under 60 seconds. Reviews go out automatically after every job. Your entire pipeline visible on one screen.",
                icon: Zap,
              },
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 h-full">
                  <div className="text-sm font-semibold text-blue-200 mb-2">
                    {item.label}
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-blue-100 text-sm leading-relaxed">
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WE DO — 6 ITEMS */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              What We Do
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
              Everything Your Business Needs to Grow Online
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: Code2,
                title: "Custom Website Development",
                desc: "Next.js, technically perfect, built to rank from day one.",
                image:
                  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop",
              },
              {
                icon: MapPin,
                title: "Local SEO & Google Rankings",
                desc: "Google Business Profile, citations, content, reviews — the full stack.",
                image:
                  "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop",
              },
              {
                icon: Smartphone,
                title: "The Ranking App",
                desc: "Your leads captured, followed up, and booked automatically. Unified inbox, AI voice, smart pipeline, review automation — one dashboard replacing 9 separate tools.",
                image:
                  "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop",
              },
              {
                icon: Target,
                title: "Google Ads Management",
                desc: "Immediate leads while your SEO builds. $200/month management fee.",
                image:
                  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
              },
              {
                icon: RefreshCw,
                title: "SyncLocal",
                desc: "Your business info accurate across 200+ directories, maps, and voice search — automatically synced.",
                image:
                  "https://images.unsplash.com/photo-1520607162513-77705c0f9d86?w=400&h=300&fit=crop",
              },
              {
                icon: Share2,
                title: "Social Content",
                desc: "Weekly on-brand posts, handled for you. You approve, we publish.",
                image:
                  "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=300&fit=crop",
              },
            ].map((service, i) => (
              <Card
                key={i}
                className="border-0 shadow-md hover:shadow-xl transition-shadow group overflow-hidden"
              >
                <div className="h-36 overflow-hidden">
                  <img
                    src={service.image}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="w-14 h-14 rounded-xl bg-blue-100 group-hover:bg-blue-500 transition-colors flex items-center justify-center mb-4 -mt-12 relative z-10 border-4 border-white">
                    <service.icon className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{service.title}</h3>
                  <p className="text-sm text-slate-600">{service.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING PREVIEW */}
      <section className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-10">
              Transparent Pricing. No Surprises.
            </h2>
            <div className="grid md:grid-cols-2 gap-8 text-left mb-8">
              <Card className="border-slate-200 shadow-sm">
                <CardContent className="p-8">
                  <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-2">
                    Setup investment
                  </p>
                  <p className="text-3xl font-bold text-slate-900 mb-2">
                    $3,000 – $5,000 one-time
                  </p>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Custom website + full SEO implementation + Ranking App setup +
                    GA4 + Search Console
                  </p>
                </CardContent>
              </Card>
              <Card className="border-slate-200 shadow-sm">
                <CardContent className="p-8">
                  <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-2">
                    Monthly maintenance
                  </p>
                  <p className="text-3xl font-bold text-slate-900 mb-2">
                    $250/month
                  </p>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Hosting, webmastering, SEO monitoring, CRM maintenance,
                    consulting access
                  </p>
                </CardContent>
              </Card>
            </div>
            <p className="text-slate-700 mb-6">
              A single new client in most 805 industries pays for the first year.
              After that, it&apos;s pure profit.
            </p>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700"
            >
              See full pricing and add-ons
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              Real Results
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our Clients Say
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Don&apos;t just take our word for it. Here&apos;s what real business
              owners say about working with Rankingsb.
            </p>
          </div>

          <div className="max-w-4xl mx-auto mb-12">
            <Card className="border-0 shadow-2xl bg-gradient-to-br from-slate-50 to-white overflow-hidden">
              <CardContent className="p-8 md:p-12">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center">
                      <Quote className="w-10 h-10 text-blue-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex gap-1 mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className="w-5 h-5 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    <blockquote className="text-xl md:text-2xl text-slate-700 mb-6 italic leading-relaxed">
                      &quot;It&apos;s hard to find good people in digital marketing.
                      It&apos;s extremely hard to find people who are good at multiple
                      specialized fields of digital marketing. And Ruben at
                      Ranking SB is absolutely one of those extremely rare finds.
                      Whether it&apos;s SEO, Paid Social, SEM, Direct, or Web Strategy,
                      Ranking SB has the skillset of a world-class agency, with the
                      determination and care for their clients that a boutique agency
                      brings.&quot;
                    </blockquote>
                    <div className="border-t pt-4">
                      <p className="font-bold text-slate-900 text-lg">
                        Kenneth Shen
                      </p>
                      <p className="text-slate-500">Business Owner</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                quote:
                  "We went from page 3 to position 1 in 3 months. Phone rings off the hook now.",
                author: "Mike Johnson",
                business: "Santa Barbara Plumbing",
                result: "+340% organic traffic",
                image:
                  "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=face",
              },
              {
                quote:
                  "Best investment we ever made. ROI was positive by month 2.",
                author: "Sarah Chen",
                business: "Coastal HVAC",
                result: "15 new customers/month",
                image:
                  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face",
              },
              {
                quote:
                  "They actually answer the phone and explain what they're doing. Rare these days.",
                author: "David Rodriguez",
                business: "Goleta Auto Repair",
                result: "#1 for 'auto repair Goleta'",
                image:
                  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
              },
            ].map((testimonial, i) => (
              <Card
                key={i}
                className="border-0 shadow-lg hover:shadow-xl transition-shadow"
              >
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={testimonial.image}
                      alt={`${testimonial.author} from ${testimonial.business}`}
                      className="w-16 h-16 rounded-full object-cover border-2 border-blue-100"
                    />
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className="w-4 h-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-slate-700 mb-6 italic">
                    &quot;{testimonial.quote}&quot;
                  </p>
                  <div className="border-t pt-4">
                    <p className="font-semibold text-slate-900">
                      {testimonial.author}
                    </p>
                    <p className="text-sm text-slate-500">
                      {testimonial.business}
                    </p>
                    <Badge className="mt-2 bg-green-100 text-green-700 hover:bg-green-100">
                      {testimonial.result}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* MID-PAGE AUDIT */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="mb-4 bg-blue-500 text-white border-0">
                  Free Analysis
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Claim Your Free Growth Audit
                </h2>
                <p className="text-slate-300 mb-6">
                  We&apos;ll analyze your website, competitors, and market. You get
                  a clear picture of what&apos;s wrong and how to fix it — in 24
                  hours.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    "Complete technical audit ($500 value)",
                    "Competitor analysis",
                    "Keyword opportunity report",
                    "No obligation, no sales pitch",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-300">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <Card className="border-0 shadow-2xl">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-2 text-slate-900">
                    Request your audit
                  </h3>
                  <p className="text-slate-500 mb-6">
                    We&apos;ll send your Growth Audit within 24 hours
                  </p>
                  <LeadForm
                    source="homepage"
                    showWebsite={false}
                    buttonText="Claim Your Free Growth Audit"
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* DUAL GUARANTEE */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-10">
            <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-6">
              <Shield className="w-10 h-10 text-blue-600" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2 text-slate-900">
              The 805 Growth Engine Guarantee
            </h2>
            <p className="text-lg text-slate-600 font-medium">
              We don&apos;t get paid to set things up. We get paid to get you
              results.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="border-slate-200">
              <CardContent className="p-8">
                <h3 className="font-bold text-lg text-slate-900 mb-3">
                  90-Day Delivery Guarantee
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Your website is live, your SEO is running, your Ranking App is
                  active, and your Google Analytics and Search Console are verified —
                  all within 90 days of kickoff. Miss it on our end, you pay nothing
                  the following month.
                </p>
              </CardContent>
            </Card>
            <Card className="border-slate-200">
              <CardContent className="p-8">
                <h3 className="font-bold text-lg text-slate-900 mb-3">
                  Leads Guarantee
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Within 90 days of launch, you will see a measurable increase in
                  calls and lead inquiries from your online presence. We document
                  your baseline on day one and prove the movement on day 90. If it
                  hasn&apos;t moved, we keep working at no additional charge until
                  it does.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Stop Losing Customers to Competitors Who Just Showed Up First?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join 100+ Santa Barbara and Ventura County businesses who stopped
            guessing and built a system. Your free Growth Audit shows you exactly
            where you stand, what your competitors are doing differently, and what
            it would take to fix it — in 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/free-audit">
              <Button
                size="lg"
                className="text-lg px-8 py-6 bg-white text-blue-600 hover:bg-slate-100"
              >
                <Phone className="w-5 h-5 mr-2" />
                Claim Your Free Growth Audit
              </Button>
            </Link>
            <a href="tel:8053077600">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 border-white text-white hover:bg-white/10"
              >
                Call (805) 307-7600
              </Button>
            </a>
          </div>
          <p className="mt-6 text-blue-100 text-sm">
            Or call Ruben directly: (805) 307-7600
          </p>
        </div>
      </section>
    </main>
  )
}
