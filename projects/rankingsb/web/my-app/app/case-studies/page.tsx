import { Metadata } from "next"
import { clampMetaDescription } from "@/lib/meta-helpers"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, MapPin, Phone, Star } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: {
    absolute: "Real Results: 805 Businesses That Went to Page 1 | Ranking SB",
  },
  description: clampMetaDescription(
    "+340% traffic. Page 1 in 90 days. $150K in storm damage jobs. Real numbers from real 805 businesses. See exactly what the 805 Growth Engine produces."
  ),
}

const caseStudies = [
  {
    business: "Coastal HVAC",
    industry: "HVAC",
    location: "Santa Barbara",
    challenge:
      "Invisible on Google, entirely dependent on word-of-mouth, no system for following up with new inquiries.",
    whatWeBuilt:
      "Full 805 Growth Engine — new website, local SEO, The Ranking App automation.",
    results: [
      "Position 1 for 'HVAC Santa Barbara'",
      "+280% organic traffic",
      "12 new customers/month from search",
    ],
    quote:
      "We went from getting 2-3 calls a week to 5-6 calls a day. Best investment we ever made.",
    author: "Mike T., Owner",
    image:
      "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&h=400&fit=crop",
  },
  {
    business: "Santa Barbara Plumbing",
    industry: "Plumbing",
    location: "Santa Barbara",
    challenge:
      "A new competitor moved in and was taking Google calls that used to go to them.",
    whatWeBuilt:
      "Competitive keyword strategy, GBP overhaul, review velocity campaign.",
    results: [
      "Top 3 for 8 keywords",
      "+340% website traffic",
      "Phone rings 'off the hook'",
    ],
    quote:
      "Ranking SB got us to #1 faster than I thought possible. The ROI was obvious by month 2.",
    author: "Jennifer L., Owner",
    image:
      "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=600&h=400&fit=crop",
  },
  {
    business: "Elite Electric",
    industry: "Electrician",
    location: "Goleta",
    challenge:
      "Couldn't break into the Google Local Pack despite years in business.",
    whatWeBuilt:
      "Technical SEO audit, citation cleanup, GBP optimization, review generation.",
    results: [
      "#1 in Local Pack for 'electrician Goleta'",
      "45 new 5-star reviews",
      "6x increase in quote requests",
    ],
    quote:
      "I was skeptical about SEO but the results speak for themselves. We're now the go-to electrician in Goleta.",
    author: "Dave R., Owner",
    image:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&h=400&fit=crop",
  },
  {
    business: "Coastal Roofing",
    industry: "Roofing",
    location: "Ventura",
    challenge:
      "Storm season approaching, no Google presence for emergency call searches.",
    whatWeBuilt:
      "Emergency keyword content, GBP service area optimization, The Ranking App missed-call automation.",
    results: [
      "Page 1 for 'emergency roofer Ventura'",
      "25+ emergency calls/month",
      "$150K in storm damage jobs",
    ],
    quote:
      "When the big storm hit, we were ready. Our phone didn't stop ringing while competitors were invisible.",
    author: "Sarah M., Owner",
    image:
      "https://images.unsplash.com/photo-1632759145351-1d592919f522?w=600&h=400&fit=crop",
  },
  {
    business: "Paragon Wellness",
    industry: "Med Spa",
    location: "Santa Barbara",
    challenge: "New location, zero online presence, competing against established med spas.",
    whatWeBuilt:
      "Full 805 Growth Engine from scratch — site, SEO, The Ranking App, review system.",
    results: [
      "#2 for 'med spa Santa Barbara' in 90 days",
      "85 new clients in first 6 months",
      "4.9 star average",
    ],
    quote:
      "We opened with no customers. Within 3 months we were booked solid. Local SEO was the key.",
    author: "Dr. Chen, Founder",
    image:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&h=400&fit=crop",
  },
  {
    business: "Ventura Solar",
    industry: "Solar Installation",
    location: "Ventura",
    challenge:
      "National solar companies dominating local Google results with bigger budgets.",
    whatWeBuilt:
      "Hyper-local content strategy, local backlink campaign, Google Ads layered on top of SEO.",
    results: [
      "Top 3 for 'solar installer Ventura'",
      "18 qualified leads/month",
      "$2.4M in closed sales",
    ],
    quote:
      "We beat the national companies because we focused on local. Ranking SB made us the obvious choice for Ventura homeowners.",
    author: "Tom K., Sales Director",
    image:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&h=400&fit=crop",
  },
]

export default function CaseStudiesPage() {
  return (
    <main className="min-h-screen">
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&h=1080&fit=crop"
            alt="Business growth"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-blue-900/90 to-slate-900/95" />
        </div>

        <div className="container relative mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-white/10 text-white border-white/20 backdrop-blur-sm">
              Case Studies
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Real Results. Real 805 Businesses.
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Every number below is from a real client. No projected results, no
              rounded-up estimates. This is what the 805 Growth Engine produces when
              it runs.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {caseStudies.map((study, i) => (
              <Card
                key={i}
                className="h-full hover:shadow-2xl transition-all duration-300 overflow-hidden border-0"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={study.image}
                    alt={study.business}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Badge variant="secondary">{study.industry}</Badge>
                    <span className="text-sm text-slate-500 flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      {study.location}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{study.business}</h3>

                  <div className="mb-4">
                    <div className="text-sm font-medium text-slate-900 mb-1">
                      Challenge:
                    </div>
                    <div className="text-sm text-slate-600">{study.challenge}</div>
                  </div>

                  <div className="mb-4">
                    <div className="text-sm font-medium text-slate-900 mb-1">
                      What we built:
                    </div>
                    <div className="text-sm text-slate-600">{study.whatWeBuilt}</div>
                  </div>

                  <div className="mb-4">
                    <div className="text-sm font-medium text-slate-900 mb-1">
                      Results:
                    </div>
                    <ul className="space-y-1">
                      {study.results.map((result, j) => (
                        <li
                          key={j}
                          className="flex items-center text-sm text-slate-600"
                        >
                          <TrendingUp className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {result}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <blockquote className="border-l-4 border-blue-600 pl-4 italic text-slate-600 text-sm mb-4">
                    &quot;{study.quote}&quot;
                  </blockquote>
                  <div className="text-sm font-medium">— {study.author}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">
                Client Testimonial
              </Badge>
              <h2 className="text-3xl font-bold">What Our Clients Say</h2>
            </div>

            <Card className="border-0 shadow-xl bg-white overflow-hidden">
              <div className="grid md:grid-cols-2">
                <div className="h-64 md:h-auto">
                  <img
                    src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop"
                    alt="Business owner"
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-8 md:p-12 flex flex-col justify-center">
                  <div className="flex gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="w-5 h-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <blockquote className="text-xl text-slate-700 mb-6 italic">
                    &quot;It&apos;s hard to find good people in digital marketing.
                    It&apos;s extremely hard to find people who are good at multiple
                    highly-specialized fields of digital marketing. And Ruben at
                    Ranking SB is absolutely one of those extremely rare finds.
                    Whether it&apos;s SEO, Paid Social, SEM, or Web Strategy —
                    Ranking SB has the skillset of a world-class agency with the care
                    of a boutique one.&quot;
                  </blockquote>
                  <div>
                    <p className="font-bold text-slate-900">Kenneth Shen</p>
                    <p className="text-slate-500">Business Owner</p>
                  </div>
                </CardContent>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">100+</div>
              <div className="text-slate-600">Businesses Helped</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">94%</div>
              <div className="text-slate-600">Client Retention</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">$5M+</div>
              <div className="text-slate-600">Revenue Generated</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">300%</div>
              <div className="text-slate-600">Avg Traffic Increase</div>
            </div>
          </div>
          <p className="text-center text-slate-600 mt-10 max-w-2xl mx-auto">
            Every result above was produced by the same system: the 805 Growth Engine.
          </p>
        </div>
      </section>

      <section className="py-20 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Be the Next Case Study?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Your free Growth Audit shows you what&apos;s possible for your specific
            business, market, and competition level. We&apos;ll document your
            baseline on day one so we can prove the results on day 90 — just like
            the businesses above.
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
