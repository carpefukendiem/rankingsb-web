import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Phone, ArrowRight } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Local SEO FAQ | Frequently Asked Questions | Rankingsb Santa Barbara",
  description: "Answers to the most common questions about local SEO, Google Business Profile, reviews, and digital marketing for Santa Barbara and Ventura County businesses.",
  keywords: ["local SEO FAQ", "SEO questions Santa Barbara", "how does local SEO work", "SEO for small business questions"],
}

const faqGroups = [
  {
    group: "About Local SEO",
    faqs: [
      { q: "What is local SEO?", a: "Local SEO (Search Engine Optimization) is the process of optimizing your online presence to appear higher in search results for location-specific searches — like 'plumber Santa Barbara' or 'dentist near me.' It includes optimizing your Google Business Profile, website, and building citations across directories." },
      { q: "How is local SEO different from regular SEO?", a: "Regular SEO targets national or global audiences. Local SEO specifically targets customers in your geographic service area. Local SEO emphasizes Google Maps rankings (the 3-Pack), local citations (NAP consistency), and locally-relevant content — all factors that matter most for businesses serving a specific community." },
      { q: "Does my business need local SEO?", a: "If customers in a specific area can hire you or visit you in person, you need local SEO. This includes nearly all service businesses (plumbers, HVAC, dentists, attorneys), retail stores, restaurants, and any business with a physical location or defined service area." },
      { q: "How long does local SEO take to work?", a: "Most businesses see measurable improvements within 60-90 days. Significant ranking changes and lead increases typically happen at the 4-6 month mark. The timeline depends on your competition, current website quality, and how consistently we execute the strategy." },
    ]
  },
  {
    group: "Google Business Profile",
    faqs: [
      { q: "What is a Google Business Profile?", a: "Google Business Profile (formerly Google My Business) is a free tool from Google that lets you manage how your business appears on Google Search and Maps. It's the listing that appears in the 3-Pack — the top 3 local results — and includes your hours, photos, reviews, and contact information." },
      { q: "How do I claim my Google Business Profile?", a: "Go to business.google.com and search for your business. If it exists, click 'Claim this business.' If it doesn't exist, click 'Add your business.' Google will verify you're the owner via postcard, phone, or email. The whole process takes about 1-2 weeks." },
      { q: "Why isn't my business showing up on Google Maps?", a: "The most common reasons are: (1) Your GBP hasn't been claimed or verified, (2) Your business information is inconsistent across directories (NAP mismatch), (3) You don't have enough reviews compared to competitors, (4) Your website doesn't reinforce your local relevance, or (5) You're in a wrong or too-broad category." },
      { q: "How important are Google reviews for ranking?", a: "Very important. Reviews are one of the top 3 local ranking factors. Google considers review quantity, recency, and your average star rating. Businesses with 50+ reviews consistently outrank those with fewer. The content of reviews (customers mentioning your services and city) also helps with specific keyword rankings." },
    ]
  },
  {
    group: "About Our Services",
    faqs: [
      { q: "What's included in your local SEO service?", a: "Our local SEO service includes: Google Business Profile optimization and management, citation building across 40+ directories, on-page SEO for your website pages, review generation campaigns, technical SEO improvements, monthly content creation, and detailed monthly reporting on rankings and leads." },
      { q: "Do you require long-term contracts?", a: "No. We work month-to-month. We believe our results should keep you — not a contract. Most clients stay for 12+ months because SEO compounds over time and leaving would mean losing built-up rankings. But there's no lock-in — cancel with 30 days notice." },
      { q: "How do you measure success?", a: "We track: keyword rankings (where you appear in Google for target searches), Google Business Profile views, calls, and direction requests, website traffic from organic search, and — most importantly — the number of leads and new customers attributable to SEO." },
      { q: "Do you guarantee rankings?", a: "We offer a 90-day ranking guarantee: we'll get your business to page 1 for at least one primary keyword in 90 days or we continue working at no additional cost. We can't guarantee #1 for every keyword (no ethical SEO company can), but we guarantee measurable, significant improvement." },
      { q: "What areas do you serve?", a: "We serve all of Santa Barbara County (Santa Barbara, Goleta, Montecito, Carpinteria, Solvang, Santa Ynez, Lompoc, Santa Maria) and all of Ventura County (Ventura, Oxnard, Thousand Oaks, Camarillo, Moorpark, Simi Valley, Ojai, Santa Paula, Newbury Park)." },
    ]
  },
  {
    group: "Citations & Reviews",
    faqs: [
      { q: "What are local citations?", a: "Citations are any online mentions of your business name, address, and phone number (NAP). These appear in directories like Yelp, Yellow Pages, Bing, Apple Maps, and hundreds of other sites. Google uses citation quantity and consistency to verify your business is legitimate and well-established in its location." },
      { q: "How do I get more Google reviews?", a: "The most effective approach: ask every satisfied customer directly, right after you complete the service. Keep it simple: 'Would you mind leaving us a quick Google review? It takes 30 seconds and really helps.' Send them your direct review link via text. Automate this with SMS follow-up sequences for even better results." },
      { q: "Can I respond to negative reviews?", a: "Yes — and you should. Responding to negative reviews professionally actually builds trust. A business that engages with feedback looks more trustworthy than one with only positive reviews. Respond calmly, apologize for the experience, and invite them to contact you to resolve it privately." },
    ]
  },
  {
    group: "Pricing & Getting Started",
    faqs: [
      { q: "How much does local SEO cost?", a: "Our local SEO packages start at $799/month for single-location businesses. Most established businesses invest $1,499-2,499/month for comprehensive SEO that includes content creation, multiple location targeting, and competitive ranking campaigns. See our Pricing page for full details." },
      { q: "What's the first step to get started?", a: "Start with a free SEO audit. We analyze your current rankings, website health, Google Business Profile, citation consistency, and competitors — then show you exactly what needs to be done and what results to expect. No cost, no obligation." },
      { q: "Is SEO better than Google Ads for my business?", a: "Both have their place. Google Ads delivers immediate leads but stops when you stop paying. SEO builds long-term organic rankings that generate free leads indefinitely. Most businesses benefit from a combined strategy: ads for immediate results while SEO compounds in the background. Read our blog post comparing both for a detailed breakdown." },
    ]
  },
]

export default function FAQPage() {
  return (
    <main className="min-h-screen">
      <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-4 bg-white/20 text-white border-white/30">Questions Answered</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Local SEO FAQ<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Everything You Want to Know
            </span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Answers to the most common questions about local SEO, Google Business Profile,
            reviews, and digital marketing for Santa Barbara and Ventura County businesses.
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
                    <div key={fi} className="border border-slate-200 rounded-xl p-6 hover:border-blue-200 transition-colors">
                      <h3 className="font-bold text-lg mb-3 text-slate-900">{faq.q}</h3>
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
          <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto">
            The best way to get answers specific to your business is a free SEO audit call.
            We'll review your current situation and answer all your questions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:8053077600">
              <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50">
                <Phone className="w-5 h-5 mr-2" />
                Call (805) 307-7600
              </Button>
            </a>
            <Link href="/free-audit">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Get Free Audit
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqGroups.flatMap(g => g.faqs.map(faq => ({
              "@type": "Question",
              "name": faq.q,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.a
              }
            })))
          })
        }}
      />
    </main>
  )
}
