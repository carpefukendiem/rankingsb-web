import { Metadata } from "next"
import { clampMetaDescription } from "@/lib/meta-helpers"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Phone, Mail, MapPin, Clock } from "lucide-react"
import { LeadForm } from "@/components/shared/LeadForm"

export const metadata: Metadata = {
  title: {
    absolute: "Talk to Ranking SB — (805) 307-7600 | Santa Barbara",
  },
  description: clampMetaDescription(
    "Call or text Ruben directly at (805) 307-7600. We respond same day, run your free audit, and tell you exactly what it takes to rank. No pressure."
  ),
  keywords: [
    "contact SEO agency Santa Barbara",
    "Ranking SB contact",
    "SEO consultation Santa Barbara",
  ],
}

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">
              Contact Us
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Let&apos;s Talk About Your Business
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Whether you want a free Growth Audit, have a specific question, or are
              ready to get started — the fastest path is a quick call or the form
              below.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-bold mb-8 text-slate-900">
                  Get in Touch
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                      <Phone className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 mb-1">Phone</h3>
                      <a
                        href="tel:8053077600"
                        className="text-blue-600 hover:text-blue-700 text-lg font-medium"
                      >
                        (805) 307-7600
                      </a>
                      <p className="text-slate-500 text-sm">
                        Call or text. We respond fast — usually same day.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                      <Mail className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 mb-1">Email</h3>
                      <a
                        href="mailto:hello@rankingsb.com"
                        className="text-blue-600 hover:text-blue-700 text-lg font-medium"
                      >
                        hello@rankingsb.com
                      </a>
                      <p className="text-slate-500 text-sm">
                        We respond within a few hours
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                      <MapPin className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 mb-1">Office</h3>
                      <p className="text-slate-700">10 E. Yanonali Street, Suite 150</p>
                      <p className="text-slate-700">Santa Barbara, CA 93101</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                      <Clock className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 mb-1">Hours</h3>
                      <p className="text-slate-700">
                        Monday–Friday 9am–6pm PST. We check messages on weekends too.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-10 p-6 rounded-2xl bg-slate-50 border">
                  <h3 className="font-bold text-lg mb-4">
                    What Happens After You Reach Out
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "We respond within 2 hours — usually faster.",
                      "We schedule a free 15-minute discovery call to understand your business.",
                      "We run your free Growth Audit — technical, competitive, keyword, and opportunity analysis.",
                      "We present findings with a specific 90-day roadmap and price.",
                      "You decide. No pressure. No follow-up harassment. Our work speaks for itself.",
                    ].map((s, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-3 text-sm text-slate-700"
                      >
                        <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold shrink-0">
                          {i + 1}
                        </div>
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <Card className="border-0 shadow-2xl">
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold mb-2 text-slate-900">
                      Send a Message or Request Your Free Audit
                    </h2>
                    <p className="text-slate-500 mb-6 text-sm">
                      Same form — tell us what you need and we&apos;ll get back to you
                      fast.
                    </p>
                    <LeadForm
                      source="contact-page"
                      showMessage={true}
                      buttonText="Send Message"
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
