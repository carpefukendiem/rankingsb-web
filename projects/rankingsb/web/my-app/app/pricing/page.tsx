import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Phone, ArrowRight, Shield } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Pricing | The 805 Growth Engine | Rankingsb Santa Barbara",
  description:
    "Simple, transparent pricing for the 805 Growth Engine. $3,000–$5,000 setup, $250/month to maintain everything. No contracts. No hidden fees.",
  keywords: [
    "805 Growth Engine pricing",
    "SEO pricing Santa Barbara",
    "local SEO cost Ventura County",
    "Rankingsb pricing",
  ],
}

const addOns = [
  {
    name: "SyncLocal",
    price: "$65/mo",
    note: "3-month minimum",
    body: "200+ directories synced automatically. One update, everywhere at once.",
  },
  {
    name: "Social Content",
    price: "$250/mo",
    note: "",
    body: "Weekly on-brand posts, handled for you. You review, we publish.",
  },
  {
    name: "Google Ads Management",
    price: "$200/mo + ad budget",
    note: "",
    body: "Immediate leads while your SEO builds. Full campaign management.",
  },
  {
    name: "AI Voice Agent",
    price: "$100/mo unlimited",
    note: "or pay-as-you-go",
    body: "Answers calls, qualifies leads, books appointments 24/7.",
  },
  {
    name: "À La Carte Hosting",
    price: "$30/mo",
    note: "",
    body: "Managed hosting for your existing site. We match your current rate.",
  },
  {
    name: "À La Carte Website",
    price: "$750 – $5,000",
    note: "one-time",
    body: "Standalone Next.js site without the full Engine.",
  },
]

const pricingFaqs = [
  {
    q: "What determines whether my setup is $3,000 or $5,000?",
    a: "Scope. A single-location service business with a straightforward Ranking App workflow is at the lower end. A multi-location business with complex booking flows, multiple service areas, and an extensive content build is at the higher end. The free Growth Audit gives you a specific number upfront — no surprises.",
  },
  {
    q: "Is there a contract?",
    a: "No. The $250/month is month-to-month with 30 days notice to cancel. We believe results should keep you — not paperwork.",
  },
  {
    q: "Can I just get the website without the SEO and Ranking App?",
    a: "Yes — our à la carte website option starts at $750. But most clients find the full Engine pays for itself with a single new customer, so it's worth understanding the full picture first. The free audit shows you the math for your specific business.",
  },
]

const pricingSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://www.rankingsb.com/pricing#webpage",
      url: "https://www.rankingsb.com/pricing",
      name: "Pricing | The 805 Growth Engine | Rankingsb Santa Barbara",
      description:
        "Simple, transparent pricing for the 805 Growth Engine. $3,000–$5,000 setup, $250/month to maintain everything. No contracts. No hidden fees.",
      isPartOf: { "@id": "https://www.rankingsb.com/#website" },
      about: { "@id": "https://www.rankingsb.com/#organization" },
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.rankingsb.com/pricing#breadcrumb",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://www.rankingsb.com/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Pricing",
          item: "https://www.rankingsb.com/pricing",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.rankingsb.com/pricing#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "What determines whether my setup is $3,000 or $5,000?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Scope. A single-location service business with a straightforward workflow is at the lower end. A multi-location business with complex booking flows and extensive content is at the higher end. The free Growth Audit gives you a specific number upfront.",
          },
        },
        {
          "@type": "Question",
          name: "Is there a contract?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. The $250/month maintenance is month-to-month with 30 days notice to cancel. We believe results should keep you — not paperwork.",
          },
        },
        {
          "@type": "Question",
          name: "Can I just get the website without the SEO and Ranking App?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes — our à la carte website option starts at $750. But most clients find the full Engine pays for itself with a single new customer.",
          },
        },
      ],
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://www.rankingsb.com/#organization",
      name: "Rankingsb",
      url: "https://www.rankingsb.com",
      telephone: "+18053077600",
      logo: {
        "@type": "ImageObject",
        url: "https://www.rankingsb.com/logo.png",
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: "10 E. Yanonali Street Suite 150",
        addressLocality: "Santa Barbara",
        addressRegion: "CA",
        postalCode: "93101",
        addressCountry: "US",
      },
      priceRange: "$$",
      areaServed: [
        { "@type": "City", name: "Santa Barbara" },
        { "@type": "City", name: "Ventura" },
        { "@type": "State", name: "California" },
      ],
    },
  ],
}

export default function PricingPage() {
  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(pricingSchema),
        }}
      />

      <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <Badge className="mb-4 bg-white/20 text-white border-white/30">
            Transparent Pricing
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Simple Pricing. No Surprises.
          </h1>
          <p className="text-xl text-slate-300 leading-relaxed">
            One system. One price. Everything you need to rank on Google, follow up
            every lead automatically, and never miss a customer again.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <Card className="border-blue-200 shadow-xl overflow-hidden">
            <div className="bg-blue-600 text-white px-8 py-4 text-center">
              <p className="text-sm font-semibold uppercase tracking-wider">
                The 805 Growth Engine
              </p>
            </div>
            <CardContent className="p-8 md:p-10 space-y-10">
              <div>
                <div className="flex flex-wrap items-baseline gap-2 mb-3">
                  <span className="text-4xl font-bold text-slate-900">
                    $3,000 – $5,000
                  </span>
                  <span className="text-slate-500 font-medium">one-time setup</span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Custom Next.js website + full local SEO implementation + The
                  Ranking App configured for your business + Google Analytics 4 +
                  Google Search Console verified and tracking. Everything built,
                  tested, and live within 90 days.
                </p>
              </div>

              <div className="border-t border-slate-200 pt-10">
                <div className="flex flex-wrap items-baseline gap-2 mb-3">
                  <span className="text-4xl font-bold text-slate-900">$250/month</span>
                  <span className="text-slate-500 font-medium">
                    maintains everything
                  </span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Hosting, webmastering, SEO monitoring, Ranking App management, and
                  direct consulting access. Everything running. Nothing falling
                  through the cracks.
                </p>
              </div>

              <p className="text-slate-800 font-medium text-center md:text-left leading-relaxed">
                A single new client in most 805 industries covers 6 months. After
                that, every lead that finds you on Google is pure profit.
              </p>

              <Link href="/free-audit" className="block">
                <Button
                  size="lg"
                  className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Claim Your Free Growth Audit
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-4">
            Add-Ons — Pour Fuel on the Engine
          </h2>
          <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
            The 805 Growth Engine runs on its own. These accelerate it.
          </p>

          <div className="space-y-4">
            {addOns.map((row) => (
              <Card key={row.name} className="border-slate-200">
                <CardContent className="p-6 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
                      <h3 className="text-lg font-bold text-slate-900">
                        {row.name}
                      </h3>
                      <span className="text-blue-700 font-semibold">{row.price}</span>
                      {row.note ? (
                        <span className="text-sm text-slate-500">{row.note}</span>
                      ) : null}
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed">{row.body}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-10">
            Backed by the 805 Growth Engine Guarantee
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-slate-200">
              <CardContent className="p-8">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  90-Day Delivery
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Your website, SEO, and Ranking App all live within 90 days or your
                  next month is free.
                </p>
              </CardContent>
            </Card>
            <Card className="border-slate-200">
              <CardContent className="p-8">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
                  <CheckCircle className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  Leads Guarantee
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Measurable increase in calls and lead inquiries within 90 days of
                  launch. We document your baseline on day one and prove the
                  movement on day 90. If it hasn&apos;t moved, we keep working at no
                  additional charge.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl font-bold text-center text-slate-900 mb-10">
            Pricing questions
          </h2>
          <div className="space-y-8">
            {pricingFaqs.map((faq) => (
              <div
                key={faq.q}
                className="border border-slate-200 rounded-xl p-6 bg-white"
              >
                <h3 className="font-bold text-lg text-slate-900 mb-3">{faq.q}</h3>
                <p className="text-slate-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">Not sure where to start?</h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            The free Growth Audit shows you exactly where you stand, what your
            competitors are doing, and what it would cost to fix it. Delivered in 24
            hours. No obligation.
          </p>
          <Link href="/free-audit">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-slate-100 text-lg px-8 py-6 mb-6"
            >
              <Phone className="w-5 h-5 mr-2" />
              Claim Your Free Growth Audit
            </Button>
          </Link>
          <p className="text-blue-100">
            <span className="text-white/90">Or call Ruben: </span>
            <a
              href="tel:8053077600"
              className="font-semibold text-white underline-offset-2 hover:underline"
            >
              (805) 307-7600
            </a>
          </p>
        </div>
      </section>
    </main>
  )
}
