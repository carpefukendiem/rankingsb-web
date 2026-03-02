import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Phone, X, ArrowRight } from "lucide-react"
import Link from "next/link"
import { CTASection } from "@/components/shared/CTASection"

export const metadata: Metadata = {
  title: "SEO Pricing Santa Barbara | Local SEO Packages | Rankingsb",
  description: "Transparent local SEO pricing for Santa Barbara and Ventura County businesses. No contracts, no surprises. See our packages and get a custom quote.",
  keywords: ["SEO pricing Santa Barbara", "local SEO cost", "SEO packages Santa Barbara", "how much does SEO cost Santa Barbara"],
}

const plans = [
  {
    name: "Starter",
    price: "$799",
    period: "/month",
    description: "Perfect for new businesses or single-location service companies getting started with SEO.",
    highlight: false,
    features: [
      { text: "Google Business Profile optimization", included: true },
      { text: "Citation building (25 directories)", included: true },
      { text: "On-page SEO (up to 5 pages)", included: true },
      { text: "Monthly review campaign", included: true },
      { text: "Basic keyword research", included: true },
      { text: "Monthly ranking report", included: true },
      { text: "Location pages (up to 3)", included: false },
      { text: "Content creation (blog posts)", included: false },
      { text: "Google Ads management", included: false },
      { text: "Competitor tracking", included: false },
    ],
    cta: "Get Started",
    best_for: "1-2 locations, getting started",
  },
  {
    name: "Growth",
    price: "$1,499",
    period: "/month",
    description: "Our most popular plan for established local businesses ready to dominate their market.",
    highlight: true,
    features: [
      { text: "Everything in Starter", included: true },
      { text: "Citation building (40+ directories)", included: true },
      { text: "On-page SEO (unlimited pages)", included: true },
      { text: "Review generation automation", included: true },
      { text: "Advanced keyword research", included: true },
      { text: "Location pages (up to 10 cities)", included: true },
      { text: "2 blog posts per month", included: true },
      { text: "Competitor ranking tracking", included: true },
      { text: "Bi-monthly strategy calls", included: true },
      { text: "Google Ads management", included: false },
    ],
    cta: "Get Started",
    best_for: "Most businesses, 1-5 locations",
  },
  {
    name: "Dominator",
    price: "$2,499",
    period: "/month",
    description: "For businesses serious about owning their market across all of Santa Barbara and Ventura Counties.",
    highlight: false,
    features: [
      { text: "Everything in Growth", included: true },
      { text: "Unlimited location pages", included: true },
      { text: "4+ blog posts per month", included: true },
      { text: "Google Ads management (ad spend separate)", included: true },
      { text: "Priority support & response", included: true },
      { text: "Weekly check-ins", included: true },
      { text: "Competitor intelligence dashboard", included: true },
      { text: "Link building campaign", included: true },
      { text: "Schema markup (all pages)", included: true },
      { text: "Custom reporting dashboard", included: true },
    ],
    cta: "Get Started",
    best_for: "Multi-location, market domination",
  },
]

const faqs = [
  {
    q: "Do you require long-term contracts?",
    a: "No. We work month-to-month. We believe our results should keep you — not a contract. Most clients stay for 12+ months because SEO compounds over time, but there's no lock-in."
  },
  {
    q: "How long before I see results?",
    a: "Most clients see measurable ranking improvements within 60-90 days. Significant lead increases typically come within 4-6 months. We guarantee page 1 results in 90 days for at least one primary keyword, or we keep working for free."
  },
  {
    q: "What if I want to cancel?",
    a: "Just give us 30 days notice. No penalties, no complications. Everything we've built — your website content, citations, GBP optimization — remains yours."
  },
  {
    q: "Do you work with businesses outside Santa Barbara County?",
    a: "Yes! We serve all of Santa Barbara and Ventura Counties. This includes Ventura, Oxnard, Thousand Oaks, Camarillo, Simi Valley, Ojai, and everywhere in between."
  },
  {
    q: "Can I upgrade my plan?",
    a: "Absolutely. Many clients start on Starter or Growth and upgrade as their business grows. We prorate the difference."
  },
  {
    q: "What's not included in these packages?",
    a: "Ad spend for Google Ads (the actual clicks you pay Google), website hosting fees, and third-party tool subscriptions. We're transparent about all costs upfront."
  },
]

export default function PricingPage() {
  return (
    <main className="min-h-screen">
      <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-4 bg-white/20 text-white border-white/30">Transparent Pricing</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Simple, Honest SEO Pricing<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              No Surprises. No Contracts.
            </span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-8">
            We don't lock you into long-term contracts because we don't need to.
            Our results keep clients — not paperwork.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400">
            {["No setup fees", "No long-term contracts", "90-day ranking guarantee", "Cancel anytime"].map(t => (
              <div key={t} className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, i) => (
              <Card
                key={i}
                className={`border-0 shadow-lg relative overflow-hidden ${plan.highlight ? 'ring-2 ring-blue-500 shadow-2xl scale-105' : ''}`}
              >
                {plan.highlight && (
                  <div className="absolute top-0 left-0 right-0 bg-blue-600 text-white text-center py-2 text-xs font-bold uppercase tracking-wider">
                    Most Popular
                  </div>
                )}
                <CardContent className={`p-8 ${plan.highlight ? 'pt-12' : ''}`}>
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <div className="flex items-end gap-1 mb-4">
                    <span className="text-4xl font-bold text-slate-900">{plan.price}</span>
                    <span className="text-slate-500 mb-1">{plan.period}</span>
                  </div>
                  <p className="text-sm text-slate-600 mb-6">{plan.description}</p>
                  <div className="text-xs text-slate-500 mb-6 bg-slate-50 rounded-lg px-3 py-2">
                    Best for: {plan.best_for}
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-3">
                        {f.included
                          ? <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                          : <X className="w-4 h-4 text-slate-300 shrink-0" />
                        }
                        <span className={`text-sm ${f.included ? 'text-slate-700' : 'text-slate-400'}`}>{f.text}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/free-audit">
                    <Button
                      className={`w-full ${plan.highlight ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-slate-900 hover:bg-slate-800 text-white'}`}
                    >
                      {plan.cta}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-slate-600 mb-4">Need something custom? Multi-location businesses, franchises, or agencies — we do that too.</p>
            <a href="tel:8053077600">
              <Button variant="outline" size="lg">
                <Phone className="w-4 h-4 mr-2" />
                Call for Custom Quote: (805) 307-7600
              </Button>
            </a>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">Pricing FAQ</h2>
            </div>
            <div className="space-y-6">
              {faqs.map((faq, i) => (
                <div key={i} className="border-b border-slate-200 pb-6 last:border-0">
                  <h3 className="font-bold text-lg mb-2">{faq.q}</h3>
                  <p className="text-slate-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Not Sure Which Plan Is Right for You?"
        subtitle="Start with a free audit. We'll show you exactly what your business needs and recommend the right package — no pressure."
        bullets={["Free SEO audit first", "Custom recommendations", "No-pressure consultation", "30-day cancellation policy"]}
        formTitle="Get Free Audit First"
      />
    </main>
  )
}
