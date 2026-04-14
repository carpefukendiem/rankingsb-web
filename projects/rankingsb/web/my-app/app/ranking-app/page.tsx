import { Metadata } from "next"
import { clampMetaDescription } from "@/lib/meta-helpers"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Phone, ArrowRight } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: {
    absolute: "The Ranking App — Follow Up Every Lead in Under 3 Minutes",
  },
  description: clampMetaDescription(
    "9 tools in one dashboard. AI answers calls, texts every lead in 60 sec, books appointments, sends reviews automatically. Included in the 805 Growth Engine."
  ),
}

const comparisonRows: [string, string][] = [
  [
    "Google Voice / basic phone",
    "AI Voice Agent + Call Tracking + Missed Call Text-Back",
  ],
  [
    "Calendly + phone-tag booking",
    "Smart Online Calendar + Automated Reminders",
  ],
  ["Gmail for leads", "Unified Inbox — SMS, email, DMs, chat, all channels"],
  ["Spreadsheet pipeline", "Visual Sales Pipeline with stage automation"],
  ["Manual review requests", "Automated post-job review sequences"],
  [
    "Separate email marketing tool",
    "Workflow Automation + Drip Campaigns + Conversation AI",
  ],
  ["QuickBooks for invoices", "Built-in Invoicing & Payment Collection"],
  ["Google Analytics alone", "Full Attribution Reporting + Ad Widgets"],
  [
    "Nothing for past customers",
    "Automated Reactivation + Referral Campaigns",
  ],
]

const sections = [
  {
    title: "Capture — Never Miss a Lead Again",
    features: [
      {
        name: "Unified Conversation Inbox",
        body: "Every message from every channel — SMS, email, Google Business Profile chat, Facebook Messenger, Instagram DMs, WhatsApp, and live website chat — arrives in one inbox. No more switching between apps. No more missed DMs. Every conversation visible, every response trackable.",
      },
      {
        name: "Missed Call Text-Back",
        body: "When you miss a call, The Ranking App texts that person back automatically within 60 seconds. The average business responds to missed calls in 47 hours. You respond in under a minute. That's the difference between a booked job and a lost lead.",
      },
      {
        name: "AI Voice Agent",
        body: "Your phone, answered 24/7 by an AI that sounds human, qualifies leads, answers your most common questions, and books appointments directly into your calendar. No hold music. No voicemail. No missed opportunities at midnight.",
      },
      {
        name: "Call Tracking",
        body: "Every phone number you advertise gets a unique tracked number that routes to your main line. You know exactly which channel drove which call, so every marketing dollar is accounted for.",
      },
      {
        name: "Lead Capture Forms + AI Business Card Scanner",
        body: "Smart forms with address autocomplete trigger follow-up the moment someone submits. Scan a business card at a networking event and the contact is in your CRM within seconds, follow-up sequence triggered automatically.",
      },
    ],
  },
  {
    title: "Nurture — Follow Up Faster Than Humanly Possible",
    features: [
      {
        name: "Automated Follow-Up Workflows",
        body: "From the moment a lead comes in, a sequence of texts, emails, and tasks fires automatically. Day 1: confirmation text. Day 2: value email. Day 3: check-in SMS. Built once. Runs forever. Personalized to each contact.",
      },
      {
        name: "Conversation AI",
        body: "An AI assistant that holds real two-way conversations with your leads via text — answering questions, qualifying intent, overcoming objections, and scheduling appointments without human intervention. It knows your services, your pricing, your availability, and your tone.",
      },
      {
        name: "Multi-Channel Outreach",
        body: "Reach leads through SMS, email, WhatsApp, Facebook Messenger, Instagram DMs, and voice — all from one workflow, all tracked in one inbox.",
      },
      {
        name: "Smart Lists & Auto-Segmentation",
        body: "Contacts automatically organized by behavior. Leads who go cold get a reactivation sequence. Active leads move forward. No manual list management required.",
      },
    ],
  },
  {
    title: "Close — Convert Leads Into Booked Jobs",
    features: [
      {
        name: "Visual Sales Pipeline",
        body: "A drag-and-drop board showing every lead at every stage — New Lead, Contacted, Quote Sent, Appointment Booked, Job Won. See exactly what's in your pipeline and what your projected revenue looks like this month.",
      },
      {
        name: "Online Booking & Calendar",
        body: "Clients book directly into your calendar from your website, your Google Business Profile, or a text message link — with automatic confirmation, reminders at 24 hours and 1 hour before, and reschedule/cancel options.",
      },
      {
        name: "Invoicing & Payments",
        body: "Send branded invoices and collect payment — card, ACH, or tap-to-pay — directly from The Ranking App. Every payment recorded against the contact automatically.",
      },
      {
        name: "Proposals & E-Signatures",
        body: "Send professional proposals that clients sign electronically. Accepted proposals automatically advance the deal to the next pipeline stage. No PDF email chains.",
      },
    ],
  },
  {
    title: "Retain — Reviews, Reactivation, Referrals",
    features: [
      {
        name: "Automated Review Requests",
        body: "After every completed job, The Ranking App sends a review request automatically by text — directly to your Google review page. Set it once. Reviews compound forever.",
      },
      {
        name: "Reputation Management Dashboard",
        body: "Every Google and Facebook review visible in one place. Respond from The Ranking App without opening a separate browser tab. Instant alerts when a new review lands.",
      },
      {
        name: "Reactivation Campaigns",
        body: "Customers who haven't booked in 6 months get a targeted message automatically. Reactivating a past customer costs a fraction of acquiring a new one. The Ranking App does it while you sleep.",
      },
      {
        name: "Referral Automation",
        body: "Your happiest clients get a referral request triggered automatically after a 5-star review or completed job. Turn your best customers into your most effective salespeople.",
      },
    ],
  },
  {
    title: "Report — Know Exactly What's Working",
    features: [
      {
        name: "Live Dashboard",
        body: "Leads this week, revenue in pipeline, appointments booked, reviews received, calls tracked — one screen, everything that matters.",
      },
      {
        name: "Attribution Reporting",
        body: "See exactly which marketing channels are producing calls, bookings, and revenue. Allocate your budget to what's working and cut what isn't.",
      },
      {
        name: "Ad Performance Widgets",
        body: "Google Ads and Facebook/Instagram campaign metrics — spend, reach, click-through rate, conversions — visible directly inside The Ranking App dashboard.",
      },
    ],
  },
]

const rankingAppSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://www.rankingsb.com/ranking-app#webpage",
      url: "https://www.rankingsb.com/ranking-app",
      name: "The Ranking App — Follow Up Every Lead in Under 3 Minutes",
      description:
        "9 tools in one dashboard. AI answers calls, texts every lead in 60 sec, books appointments, sends reviews automatically. Included in the 805 Growth Engine.",
      isPartOf: { "@id": "https://www.rankingsb.com/#website" },
    },
    {
      "@type": "Service",
      "@id": "https://www.rankingsb.com/ranking-app#service",
      name: "The Ranking App — Business Automation Platform",
      description:
        "CRM and automation platform for 805 local businesses. Captures leads, automates follow-up, books appointments, manages reviews, and tracks revenue — all in one dashboard.",
      provider: { "@id": "https://www.rankingsb.com/#organization" },
      areaServed: [
        { "@type": "City", name: "Santa Barbara" },
        { "@type": "City", name: "Ventura" },
        { "@type": "State", name: "California" },
      ],
      url: "https://www.rankingsb.com/ranking-app",
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.rankingsb.com/ranking-app#breadcrumb",
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
          name: "Services",
          item: "https://www.rankingsb.com/services",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "The Ranking App",
          item: "https://www.rankingsb.com/ranking-app",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.rankingsb.com/ranking-app#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is The Ranking App?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The Ranking App is a branded business automation platform that captures leads from every channel, follows up automatically within minutes, answers your phone with an AI voice agent 24/7, books appointments, sends review requests after every job, and gives you a live dashboard showing your entire pipeline — all in one login.",
          },
        },
        {
          "@type": "Question",
          name: "What tools does The Ranking App replace?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The Ranking App replaces a separate CRM, email marketing tool, SMS platform, online booking system, call tracker, review request service, invoice tool, chat widget, and pipeline manager — consolidating 9 separate tools into one platform.",
          },
        },
        {
          "@type": "Question",
          name: "How quickly does The Ranking App follow up with new leads?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Within minutes of a lead coming in. The moment a form is submitted or a call comes in, automated follow-up sequences fire immediately. Missed calls receive a text back in under 60 seconds. The average business takes 47 hours to respond to a new lead — our clients respond in under 3 minutes.",
          },
        },
        {
          "@type": "Question",
          name: "Is The Ranking App included in the 805 Growth Engine?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. The Ranking App is fully included in the 805 Growth Engine — set up, configured for your specific business, and maintained as part of the $250/month fee. There is no separate subscription charge for the platform itself.",
          },
        },
      ],
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://www.rankingsb.com/#organization",
      name: "Ranking SB",
      url: "https://www.rankingsb.com",
      telephone: "+18053077600",
      address: {
        "@type": "PostalAddress",
        streetAddress: "10 E. Yanonali Street Suite 150",
        addressLocality: "Santa Barbara",
        addressRegion: "CA",
        postalCode: "93101",
        addressCountry: "US",
      },
    },
  ],
}

export default function RankingAppPage() {
  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(rankingAppSchema),
        }}
      />

      <section className="relative py-20 lg:py-28 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <Badge className="mb-6 bg-white/10 text-white border-white/20">
            Included in the 805 Growth Engine
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            The Ranking App: Your Entire Business, Automated in One Dashboard
          </h1>
          <p className="text-xl text-blue-100 mb-4 leading-relaxed">
            Most businesses lose 30–50% of their leads to slow follow-up and
            disconnected tools. The Ranking App closes that gap — capturing every
            inquiry, responding in minutes, booking appointments automatically, and
            giving you complete visibility into your pipeline. All from one login. All
            running without you lifting a finger.
          </p>
          <p className="text-lg text-slate-300 italic">
            The average business takes 47 hours to respond to a new lead. Our clients
            respond in under 3 minutes.
          </p>
        </div>
      </section>

      {sections.map((section) => (
        <section
          key={section.title}
          className="py-16 bg-white border-b border-slate-100 last:border-0"
        >
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">
              {section.title}
            </h2>
            <div className="space-y-8">
              {section.features.map((f) => (
                <div key={f.name}>
                  <h3 className="text-lg font-semibold text-blue-700 mb-2">
                    {f.name}
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                    {f.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-slate-900 mb-10">
            What you&apos;re replacing vs. what The Ranking App does instead
          </h2>
          <Card className="border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-900 text-white">
                    <th className="text-left p-4 font-semibold">
                      What you&apos;re replacing
                    </th>
                    <th className="text-left p-4 font-semibold">
                      What The Ranking App does instead
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map(([left, right], i) => (
                    <tr
                      key={i}
                      className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}
                    >
                      <td className="p-4 text-slate-700 align-top border-t border-slate-200">
                        {left}
                      </td>
                      <td className="p-4 text-slate-700 align-top border-t border-slate-200">
                        {right}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <CardContent className="p-6 bg-blue-50/80 border-t border-slate-200">
              <p className="text-center text-slate-800 font-medium text-sm md:text-base">
                9 tools. One platform. One login. Included in the 805 Growth Engine
                at $250/month total.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-20 bg-blue-600">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to see what your business looks like when nothing falls through the
            cracks?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            The Ranking App is included in the 805 Growth Engine — fully configured
            for your business, tested, and running within 90 days. Or request a free
            Growth Audit and we&apos;ll show you exactly how many leads your current
            setup is losing right now.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/free-audit">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-100">
                <Phone className="w-5 h-5 mr-2" />
                Claim Your Free Growth Audit
              </Button>
            </Link>
            <Link href="/services">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                See the full 805 Growth Engine
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
