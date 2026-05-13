import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Phone, Star, ArrowRight, Clock, Shield } from "lucide-react"
import Link from "next/link"

import { THANK_YOU_GOOGLE_REVIEWS } from "./testimonials"

export const metadata: Metadata = {
  title: "Thank You! Your Audit Request Was Received | Ranking SB",
  description: "We received your free SEO audit request and will deliver your results within 24 hours.",
  robots: { index: false, follow: false }, // keep thank-you pages out of Google
}

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
            {THANK_YOU_GOOGLE_REVIEWS.map((review, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 flex flex-col">
                <div className="flex items-center gap-3 mb-3">
                  <div
                    aria-hidden
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-blue-100 bg-slate-50 text-lg font-semibold uppercase text-blue-900/70"
                  >
                    {review.name.trim().slice(0, 1)}
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(review.rating)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className="text-slate-700 text-sm leading-relaxed flex-1 mb-4 italic">
                  &ldquo;{review.quote}&rdquo;
                </p>
                <div className="border-t border-slate-100 pt-4">
                  <div className="font-semibold text-slate-900 text-sm">{review.name}</div>
                  {review.business ? <div className="text-xs text-slate-500 mt-0.5">{review.business}</div> : null}
                  <div className="text-xs text-slate-500 mt-0.5">
                    {review.source} · {review.date}
                  </div>
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
