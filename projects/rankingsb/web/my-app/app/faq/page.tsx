import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Phone, ArrowRight } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "FAQ | The 805 Growth Engine | Rankingsb Santa Barbara",
  description:
    "Answers to every question about Rankingsb, the 805 Growth Engine, local SEO, website builds, The Ranking App, pricing, and guarantees.",
  keywords: [
    "local SEO FAQ",
    "SEO questions Santa Barbara",
    "how does local SEO work",
    "SEO for small business questions",
  ],
}

const faqGroups = [
  {
    group: "About the 805 Growth Engine",
    faqs: [
      {
        q: "What is the 805 Growth Engine?",
        a: "It's our complete local growth system for 805 businesses — a custom-coded website, full local SEO implementation, and The Ranking App all built together and maintained for $250/month. It's the infrastructure that lets a local business compete like it has a 10-person marketing department.",
      },
      {
        q: "What is The Ranking App?",
        a: "The Ranking App is your own branded business command center — a single platform that handles everything that happens after a lead first finds you. It captures leads from every channel into one inbox, follows up automatically by text and email within minutes, answers your phone with an AI voice agent 24/7, books appointments, sends review requests after every job, tracks every call back to its source, and gives you a live dashboard showing your entire pipeline. It replaces tools like a separate CRM, email marketing software, online booking, review request services, and call tracking — all in one login.",
      },
      {
        q: "How is this different from just hiring an SEO agency?",
        a: "A typical SEO agency handles rankings — that's it. We build the full system: the website that ranks, the SEO that drives traffic, and The Ranking App that converts that traffic into booked appointments. Most businesses lose 30–50% of their leads to slow follow-up. We close that gap at the same time we open the top of the funnel.",
      },
      {
        q: "What does the AI voice agent actually do?",
        a: "It answers your phone like a real person — greets the caller by your business name, answers their questions, qualifies their needs, and books them into your calendar directly. Available 24/7. No hold music. No voicemail. Callers can complete the entire booking process without ever waiting for a human to call them back.",
      },
      {
        q: "How does the review automation work?",
        a: "After you mark a job as complete (or after a configurable time delay), The Ranking App sends the customer a text message with a direct link to your Google review page. The timing is automatic, the message is personalized, and you set it up once and never think about it again.",
      },
      {
        q: "Do I own the website and the system?",
        a: "You own the website outright. The Ranking App is a managed platform included in your $250/month — fully set up for your business, hosted, and maintained by us. If you ever leave, we help you transition everything.",
      },
    ],
  },
  {
    group: "About Local SEO",
    faqs: [
      {
        q: "What is local SEO?",
        a: "Local SEO (Search Engine Optimization) is the process of optimizing your online presence to appear higher in search results for location-specific searches — like 'plumber Santa Barbara' or 'dentist near me.' It includes optimizing your Google Business Profile, website, and building citations across directories.",
      },
      {
        q: "How is local SEO different from regular SEO?",
        a: "Regular SEO targets national or global audiences. Local SEO specifically targets customers in your geographic service area. Local SEO emphasizes Google Maps rankings (the 3-Pack), local citations (NAP consistency), and locally-relevant content — all factors that matter most for businesses serving a specific community.",
      },
      {
        q: "Does my business need local SEO?",
        a: "If customers in a specific area can hire you or visit you in person, you need local SEO. This includes nearly all service businesses (plumbers, HVAC, dentists, attorneys), retail stores, restaurants, and any business with a physical location or defined service area.",
      },
      {
        q: "How long does local SEO take to work?",
        a: "Most businesses see measurable improvements within 60-90 days. Significant ranking changes and lead increases typically happen at the 4-6 month mark. The timeline depends on your competition, current website quality, and how consistently we execute the strategy.",
      },
    ],
  },
  {
    group: "Google Business Profile",
    faqs: [
      {
        q: "What is a Google Business Profile?",
        a: "Google Business Profile (formerly Google My Business) is a free tool from Google that lets you manage how your business appears on Google Search and Maps. It's the listing that appears in the 3-Pack — the top 3 local results — and includes your hours, photos, reviews, and contact information.",
      },
      {
        q: "How do I claim my Google Business Profile?",
        a: "Go to business.google.com and search for your business. If it exists, click 'Claim this business.' If it doesn't exist, click 'Add your business.' Google will verify you're the owner via postcard, phone, or email. The whole process takes about 1-2 weeks.",
      },
      {
        q: "Why isn't my business showing up on Google Maps?",
        a: "The most common reasons are: (1) Your GBP hasn't been claimed or verified, (2) Your business information is inconsistent across directories (NAP mismatch), (3) You don't have enough reviews compared to competitors, (4) Your website doesn't reinforce your local relevance, or (5) You're in a wrong or too-broad category.",
      },
      {
        q: "How important are Google reviews for ranking?",
        a: "Very important. Reviews are one of the top 3 local ranking factors. Google considers review quantity, recency, and your average star rating. Businesses with 50+ reviews consistently outrank those with fewer. The content of reviews (customers mentioning your services and city) also helps with specific keyword rankings.",
      },
    ],
  },
  {
    group: "About Our Services",
    faqs: [
      {
        q: "What's included in your local SEO service?",
        a: "Our local SEO service includes: Google Business Profile optimization and management, citation building across 40+ directories, on-page SEO for your website pages, review generation campaigns, technical SEO improvements, monthly content creation, and detailed monthly reporting on rankings and leads.",
      },
      {
        q: "Do you require long-term contracts?",
        a: "No. There are no long-term contracts. The $250/month maintenance is month-to-month with 30 days notice to cancel. We believe results should keep you — not paperwork. Most clients stay well beyond 12 months because the system compounds over time, but the choice is always yours.",
      },
      {
        q: "How do you measure success?",
        a: "We track: keyword rankings (where you appear in Google for target searches), Google Business Profile views, calls, and direction requests, website traffic from organic search, and — most importantly — the number of leads and new customers attributable to your online presence.",
      },
      {
        q: "Do you guarantee rankings?",
        a: "We offer two guarantees. First, a 90-day delivery guarantee: your website, SEO, and Ranking App are all live and running within 90 days or your next month is free. Second, a leads guarantee: within 90 days of launch you'll see a measurable increase in calls and lead inquiries — we document your baseline on day one and prove it on day 90. If it hasn't moved, we keep working at no additional charge.",
      },
      {
        q: "What areas do you serve?",
        a: "We serve all of Santa Barbara County (Santa Barbara, Goleta, Montecito, Carpinteria, Solvang, Santa Ynez, Lompoc, Santa Maria) and all of Ventura County (Ventura, Oxnard, Thousand Oaks, Camarillo, Moorpark, Simi Valley, Ojai, Santa Paula, Newbury Park).",
      },
    ],
  },
  {
    group: "Citations & Reviews",
    faqs: [
      {
        q: "What are local citations?",
        a: "Citations are any online mentions of your business name, address, and phone number (NAP). These appear in directories like Yelp, Yellow Pages, Bing, Apple Maps, and hundreds of other sites. Google uses citation quantity and consistency to verify your business is legitimate and well-established in its location.",
      },
      {
        q: "How do I get more Google reviews?",
        a: "The most effective approach: ask every satisfied customer directly, right after you complete the service. Keep it simple: 'Would you mind leaving us a quick Google review? It takes 30 seconds and really helps.' Send them your direct review link via text. Automate this with SMS follow-up sequences for even better results.",
      },
      {
        q: "Can I respond to negative reviews?",
        a: "Yes — and you should. Responding to negative reviews professionally actually builds trust. A business that engages with feedback looks more trustworthy than one with only positive reviews. Respond calmly, apologize for the experience, and invite them to contact you to resolve it privately.",
      },
    ],
  },
  {
    group: "Pricing & Getting Started",
    faqs: [
      {
        q: "How much does local SEO cost?",
        a: "The 805 Growth Engine — which includes your website, full SEO implementation, and The Ranking App — starts at $3,000–$5,000 as a one-time setup investment. After that, $250/month covers hosting, webmastering, ongoing SEO monitoring, CRM maintenance, and consulting access. Individual add-ons (SyncLocal, social content, Google Ads management, AI voice) are available separately.",
      },
      {
        q: "What's the first step to get started?",
        a: "Start with a free Growth Audit. We analyze your current rankings, website health, Google Business Profile, citation consistency, and competitors — then show you exactly what needs to be done and what results to expect. No cost, no obligation.",
      },
      {
        q: "Is SEO better than Google Ads for my business?",
        a: "Both have their place. Google Ads delivers immediate leads but stops when you stop paying. SEO builds long-term organic rankings that generate free leads indefinitely. Most businesses benefit from a combined strategy: ads for immediate results while SEO compounds in the background. Read our blog post comparing both for a detailed breakdown.",
      },
    ],
  },
]

export default function FAQPage() {
  return (
    <main className="min-h-screen">
      <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-4 bg-white/20 text-white border-white/30">
            Questions Answered
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Everything you want to know about how the 805 Growth Engine works, what
            it costs, and what to expect. If your question isn&apos;t here, call us:
            (805) 307-7600.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {faqGroups.map((group, gi) => (
              <div key={gi} className="mb-16">
                <h2 className="text-2xl font-bold mb-8 text-slate-900 border-b border-slate-200 pb-4">
                  {group.group}
                </h2>
                <div className="space-y-6">
                  {group.faqs.map((faq, fi) => (
                    <div
                      key={fi}
                      className="border border-slate-200 rounded-xl p-6 hover:border-blue-200 transition-colors"
                    >
                      <h3 className="font-bold text-lg mb-3 text-slate-900">
                        {faq.q}
                      </h3>
                      <p className="text-slate-600 leading-relaxed">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Still have questions?</h2>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto">
            The fastest way to get answers specific to your business is a free
            Growth Audit call. 15 minutes. We review your situation, answer every
            question, and show you exactly what the 805 Growth Engine would do for
            your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:8053077600">
              <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50">
                <Phone className="w-5 h-5 mr-2" />
                Call (805) 307-7600
              </Button>
            </a>
            <Link href="/free-audit">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                Claim Your Free Growth Audit
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
          <p className="mt-6 text-blue-100 text-sm">
            Or call Ruben: (805) 307-7600
          </p>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqGroups.flatMap((g) =>
              g.faqs.map((faq) => ({
                "@type": "Question",
                name: faq.q,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.a,
                },
              }))
            ),
          }),
        }}
      />
    </main>
  )
}
