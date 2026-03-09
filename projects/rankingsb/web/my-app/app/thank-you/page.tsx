import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Phone, Star, ArrowRight, Clock, Shield, TrendingUp } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Thank You! Your Audit Request Was Received | Rankingsb",
  description: "We received your free SEO audit request and will deliver your results within 24 hours.",
  robots: { index: false, follow: false }, // keep thank-you pages out of Google
}

const reviews = [
  {
    name: "Maria T.",
    business: "Goleta Family Dental",
    rating: 5,
    text: "Within 90 days we went from page 3 to the top 3 on Google Maps. Our new patient calls doubled. Ruben and his team really know what they're doing.",
    location: "Goleta, CA",
  },
  {
    name: "Jason K.",
    business: "Pacific Coast Electric",
    rating: 5,
    text: "I was skeptical about SEO but the results speak for themselves. We're now ranking #1 for 'electrician Thousand Oaks' and the phone doesn't stop ringing.",
    location: "Thousand Oaks, CA",
  },
  {
    name: "Sandra R.",
    business: "Ojai Valley Wellness Spa",
    rating: 5,
    text: "Our bookings are up 40% since we started working with Rankingsb. They handled everything — Google profile, reviews, the website. Best marketing investment we've made.",
    location: "Ojai, CA",
  },
  {
    name: "Mike D.",
    business: "Santa Barbara Roofing Co.",
    rating: 5,
    text: "We used to get 2-3 leads a week from Google. Now we're getting 2-3 a day. The ROI on SEO is insane compared to paid ads.",
    location: "Santa Barbara, CA",
  },
  {
    name: "Lisa C.",
    business: "Camarillo Pediatrics",
    rating: 5,
    text: "Our practice was invisible online. Now we rank in the top 3 for every relevant search in Camarillo. Our new patient waitlist is 3 weeks long.",
    location: "Camarillo, CA",
  },
  {
    name: "Carlos M.",
    business: "Ventura Plumbing Pros",
    rating: 5,
    text: "We compete against much bigger companies now and we win because we rank higher. Rankingsb leveled the playing field for us.",
    location: "Ventura, CA",
  },
]

const caseStudies = [
  {
    industry: "Home Services",
    company: "Local Plumbing Company",
    location: "Ventura, CA",
    result: "+312% organic traffic",
    detail: "Went from 47 to 193 monthly website visitors in 4 months",
    color: "blue",
    stat: "312%",
    statLabel: "Traffic increase",
  },
  {
    industry: "Medical",
    company: "Specialty Medical Practice",
    location: "Santa Barbara, CA",
    result: "#1 ranking for 14 keywords",
    detail: "Fully booked schedule within 60 days of campaign launch",
    color: "green",
    stat: "60",
    statLabel: "Days to full book",
  },
  {
    industry: "Hospitality",
    company: "Boutique Spa & Wellness",
    location: "Ojai, CA",
    result: "+40% monthly bookings",
    detail: "Local 3-Pack placement driving 20+ new bookings per week",
    color: "purple",
    stat: "40%",
    statLabel: "Booking increase",
  },
]

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-white">

      {/* ── Confirmation Hero ─────────────────────────────────── */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/20 border-2 border-green-400 mb-6">
            <CheckCircle className="w-10 h-10 text-green-400" />
          </div>
          <Badge className="mb-4 bg-green-500/20 text-green-300 border-green-500/30 hover:bg-green-500/20">
            Request Received!
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            You&apos;re All Set!
          </h1>
          <p className="text-xl text-slate-300 max-w-xl mx-auto mb-8">
            Your free SEO audit request is confirmed. We&apos;ll have your complete analysis ready within <strong className="text-white">24 hours</strong> — usually much sooner.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="flex items-center gap-2 text-slate-300 bg-white/10 rounded-full px-4 py-2">
              <Clock className="w-4 h-4 text-blue-400" />
              <span className="text-sm">Expect your audit within 24 hours</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300 bg-white/10 rounded-full px-4 py-2">
              <Shield className="w-4 h-4 text-green-400" />
              <span className="text-sm">No spam, no pressure</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── What Happens Next ─────────────────────────────────── */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 text-center mb-10">What Happens Next</h2>
            <div className="space-y-4">
              {[
                { step: "1", title: "We Audit Your Site", desc: "Our team runs a full technical, local, and competitive SEO analysis on your business within the next few hours.", time: "Within 2-4 hours" },
                { step: "2", title: "You Get Your Report", desc: "We send you a detailed audit showing your current rankings, what's holding you back, and your top opportunities.", time: "Within 24 hours" },
                { step: "3", title: "We Walk You Through It", desc: "Optional: we'll jump on a quick call to explain the findings and answer any questions — no pitch, just value.", time: "Whenever works for you" },
              ].map((item) => (
                <div key={item.step} className="flex gap-4 bg-white rounded-xl p-5 shadow-sm border border-slate-100">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center shrink-0 text-sm">
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <h3 className="font-bold text-slate-900">{item.title}</h3>
                      <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full">{item.time}</span>
                    </div>
                    <p className="text-sm text-slate-600 mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <p className="text-slate-600 mb-4">Want to talk sooner? Call or text us directly:</p>
              <a href="tel:8053077600">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
                  <Phone className="w-5 h-5" />
                  (805) 307-7600
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Case Studies ─────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">Real Results</Badge>
            <h2 className="text-3xl font-bold text-slate-900">What We Do For Businesses Like Yours</h2>
            <p className="text-slate-600 mt-3 max-w-xl mx-auto">
              These are real results from businesses in Santa Barbara and Ventura County.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {caseStudies.map((cs, i) => (
              <div key={i} className="bg-slate-900 rounded-2xl p-6 text-white">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">{cs.industry}</div>
                <div className="text-sm text-slate-300 mb-4">{cs.company} · {cs.location}</div>
                <div className="text-5xl font-black text-blue-400 mb-1">{cs.stat}</div>
                <div className="text-sm font-semibold text-slate-300 mb-4">{cs.statLabel}</div>
                <div className="border-t border-white/10 pt-4">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="w-4 h-4 text-green-400" />
                    <span className="text-sm font-semibold text-green-400">{cs.result}</span>
                  </div>
                  <p className="text-xs text-slate-400">{cs.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Google Reviews ─────────────────────────────────────── */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <h2 className="text-3xl font-bold text-slate-900">5-Star Rated by Local Businesses</h2>
            <p className="text-slate-600 mt-2">Real reviews from real business owners across the 805</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {reviews.map((review, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 flex flex-col">
                <div className="flex gap-0.5 mb-3">
                  {[...Array(review.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-700 text-sm leading-relaxed flex-1 mb-4">&ldquo;{review.text}&rdquo;</p>
                <div className="border-t border-slate-100 pt-4">
                  <div className="font-semibold text-slate-900 text-sm">{review.name}</div>
                  <div className="text-xs text-slate-500">{review.business}</div>
                  <div className="text-xs text-blue-600 mt-0.5">{review.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────── */}
      <section className="py-16 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            While You Wait — Browse What&apos;s Possible
          </h2>
          <p className="text-blue-100 mb-8 max-w-lg mx-auto">
            See the services that are moving the needle for businesses in your area.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/services">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 px-8 gap-2">
                Our Services <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/case-studies">
              <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 px-8">
                More Case Studies
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}
