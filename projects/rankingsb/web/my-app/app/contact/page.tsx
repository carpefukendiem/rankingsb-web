import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { CheckCircle, Phone, Mail, MapPin, Clock, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Contact Us | Rankingsb SEO Agency Santa Barbara",
  description: "Contact Rankingsb for local SEO services in Santa Barbara and Ventura County. Call (805) 307-7600 or get a free audit online.",
  keywords: ["contact SEO agency Santa Barbara", "Rankingsb contact", "SEO consultation Santa Barbara"],
}

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">Contact Us</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Let's Talk About Your<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Business Growth
              </span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Whether you have questions, want a free audit, or are ready to get started —
              we'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div>
                <h2 className="text-2xl font-bold mb-8 text-slate-900">Get in Touch</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                      <Phone className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 mb-1">Phone</h3>
                      <a href="tel:8053077600" className="text-blue-600 hover:text-blue-700 text-lg font-medium">
                        (805) 307-7600
                      </a>
                      <p className="text-slate-500 text-sm">Call or text — we respond fast</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                      <Mail className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 mb-1">Email</h3>
                      <a href="mailto:hello@rankingsb.com" className="text-blue-600 hover:text-blue-700 text-lg font-medium">
                        hello@rankingsb.com
                      </a>
                      <p className="text-slate-500 text-sm">We respond within a few hours</p>
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
                      <p className="text-slate-700">Monday – Friday: 9am – 6pm PST</p>
                      <p className="text-slate-500 text-sm">We check messages on weekends too</p>
                    </div>
                  </div>
                </div>

                <div className="mt-10 p-6 rounded-2xl bg-slate-50 border">
                  <h3 className="font-bold text-lg mb-4">What Happens After You Contact Us?</h3>
                  <ul className="space-y-3">
                    {[
                      "We respond within 2 hours (usually faster)",
                      "Schedule a free 15-min discovery call",
                      "We run your free SEO audit",
                      "Present findings & recommendations",
                      "You decide if/how to move forward — no pressure",
                    ].map((s, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-slate-700">
                        <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold shrink-0">{i+1}</div>
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <Card className="border-0 shadow-2xl">
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold mb-2 text-slate-900">Send a Message</h2>
                    <p className="text-slate-500 mb-6 text-sm">Or get your free SEO audit — same form, same result.</p>
                    <form className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-slate-700 mb-1 block">First Name</label>
                          <Input placeholder="John" className="h-11" />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-slate-700 mb-1 block">Last Name</label>
                          <Input placeholder="Smith" className="h-11" />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-700 mb-1 block">Business Name</label>
                        <Input placeholder="Your Business LLC" className="h-11" />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-700 mb-1 block">Email</label>
                        <Input type="email" placeholder="john@yourbusiness.com" className="h-11" />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-700 mb-1 block">Phone</label>
                        <Input type="tel" placeholder="(805) 555-0123" className="h-11" />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-700 mb-1 block">City / Area</label>
                        <Input placeholder="Santa Barbara, Ventura, etc." className="h-11" />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-700 mb-1 block">How can we help?</label>
                        <textarea
                          className="w-full h-24 px-3 py-2 border rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Tell us about your business and what you're looking for..."
                        />
                      </div>
                      <Button className="w-full h-12 text-lg bg-blue-600 hover:bg-blue-700">
                        Send Message
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </form>
                    <p className="text-xs text-slate-400 text-center mt-4">No spam. We'll only contact you about your inquiry.</p>
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
