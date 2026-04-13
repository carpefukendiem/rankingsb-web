import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle,
  Phone,
  ArrowRight,
  Search,
  BarChart3,
  Shield,
  Clock,
  Star,
  MapPin,
  ListChecks,
} from "lucide-react"
import Link from "next/link"
import { LeadForm } from "@/components/shared/LeadForm"

export const metadata: Metadata = {
  title: "Free Growth Audit | See Why You're Not Ranking | Rankingsb 805",
  description:
    "Get a free analysis of your Google rankings, website health, and competitor gap. Delivered in 24 hours. We'll show you exactly what's holding you back and what it takes to fix it.",
  keywords: [
    "free Growth Audit Santa Barbara",
    "SEO audit Ventura County",
    "local SEO audit",
    "free Google ranking audit",
  ],
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
                  <span className="text-sm text-white/90">
                    $500 Value — Yours Free
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-white">
                  Find Out Exactly Why You&apos;re Not Ranking — Free, in 24 Hours
                </h1>
                <p className="text-xl text-slate-300 mb-8">
                  A complete analysis of your Google Business Profile, website
                  performance, citations, competitor gap, and current rankings —
                  delivered as a clear action plan within 24 hours. Not a sales
                  pitch. A real audit.
                </p>
                <ul className="space-y-4 mb-8">
                  {[
                    {
                      icon: Search,
                      text: "Complete technical SEO audit — speed, mobile, schema, indexation",
                    },
                    {
                      icon: MapPin,
                      text: "Google Business Profile completeness score + specific gaps",
                    },
                    {
                      icon: BarChart3,
                      text: "Top 3 competitor breakdown — what they're doing that you're not",
                    },
                    {
                      icon: ListChecks,
                      text: "Keyword opportunity report — searches you should be ranking for",
                    },
                    {
                      icon: Clock,
                      text: "90-day Growth Engine roadmap — prioritized by impact",
                    },
                    {
                      icon: Shield,
                      text: "Review profile vs. competitors",
                    },
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 text-slate-300"
                    >
                      <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                        <item.icon className="w-5 h-5 text-blue-400" />
                      </div>
                      {item.text}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-4 text-sm text-slate-400">
                  {[
                    "No contracts",
                    "No credit card",
                    "No spam",
                    "24-hour delivery",
                    "No sales call unless you want one",
                  ].map((t) => (
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
                    <h2 className="text-2xl font-bold text-slate-900">
                      Claim Your Free Growth Audit
                    </h2>
                    <p className="text-slate-500">
                      We&apos;ll deliver it within 24 hours.
                    </p>
                  </div>
                  <LeadForm
                    source="free-audit-page"
                    buttonText="Send My Audit Request"
                  />
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
            <Badge variant="secondary" className="mb-4">
              What&apos;s In Your Audit
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
              Your Complete SEO Analysis
            </h2>
            <p className="text-xl text-slate-600">
              Everything you need to understand your Google ranking and how to improve
              it — delivered within 24 hours.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                title: "Technical Audit",
                desc: "Site speed, mobile issues, broken links, schema markup, and indexation problems",
                image:
                  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop",
              },
              {
                title: "Competitor Analysis",
                desc: "What your top 3 local competitors are doing on Google that you're not — and the exact gaps we'd close first.",
                image:
                  "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
              },
              {
                title: "Keyword Report",
                desc: "Best keywords for your industry and city with monthly search volume",
                image:
                  "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=400&h=300&fit=crop",
              },
              {
                title: "Growth Engine Roadmap",
                desc: "A step-by-step 90-day plan showing exactly what we'd build, optimize, and launch — prioritized by the fastest path to new leads.",
                image:
                  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop",
              },
              {
                title: "Ranking App Opportunity",
                desc: "How much lead volume you're likely losing to slow or zero follow-up — and what automated response under 3 minutes would change for your business specifically.",
                image:
                  "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop",
              },
            ].map((item, i) => (
              <Card key={i} className="border-0 shadow-md overflow-hidden">
                <div className="h-32 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
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
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4">
              100% Free, No Obligation
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
              Why We Do This for Free
            </h2>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed text-left md:text-center">
              Because the audit does the selling — and we&apos;d rather earn your
              business with proof than convince you with a sales pitch.
            </p>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed text-left">
              Even if you never hire us, you&apos;ll walk away understanding your
              Google presence better than most agencies would tell you in a paid
              consultation. That&apos;s intentional. The 805 is a small market and
              our reputation here matters more than any single contract.
            </p>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed text-left">
              If the audit shows that the 805 Growth Engine is right for your
              business, we&apos;ll tell you. If it shows that a smaller fix would
              solve your problem, we&apos;ll tell you that too.
            </p>
            <p className="text-slate-700 font-medium mb-8">
              Call (805) 307-7600 or fill out the form above.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:8053077600">
                <Button
                  size="lg"
                  className="gap-2 text-lg px-8 py-6 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Phone className="w-5 h-5" />
                  Call (805) 307-7600
                </Button>
              </a>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="gap-2 text-lg px-8 py-6">
                  Send a Message <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
