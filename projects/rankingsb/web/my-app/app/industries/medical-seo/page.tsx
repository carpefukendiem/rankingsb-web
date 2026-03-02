import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Phone, Heart, Shield, Star, TrendingUp, Users, Search } from "lucide-react"
import Link from "next/link"
import { CTASection } from "@/components/shared/CTASection"

export const metadata: Metadata = {
  title: "Medical Practice SEO Santa Barbara & Ventura County | Rankingsb",
  description: "Healthcare SEO for doctors, dentists, chiropractors, and specialists in Santa Barbara and Ventura County. Attract more new patients through Google.",
  keywords: ["medical SEO Santa Barbara", "doctor SEO", "healthcare marketing Santa Barbara", "medical practice marketing Ventura County", "dentist SEO Santa Barbara"],
}

export default function MedicalSEOPage() {
  return (
    <main className="min-h-screen">
      <section className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-slate-900 via-teal-900/40 to-slate-900">
        <div className="container relative mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
              <Heart className="w-4 h-4 text-red-400" />
              <span className="text-sm text-white/90">Medical Practice SEO · Santa Barbara & Ventura County</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white">
              Medical SEO That<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">
                Gets You New Patients
              </span>
            </h1>
            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
              Patients choose their doctor, dentist, or specialist based on Google rankings and reviews.
              We help Santa Barbara and Ventura County medical practices get found — and chosen.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/free-audit">
                <Button size="lg" className="gap-2 text-lg px-8 py-6 bg-teal-500 hover:bg-teal-400 text-white">
                  <Phone className="w-5 h-5" />
                  Get Free Practice Audit
                </Button>
              </Link>
              <a href="tel:8053077600">
                <Button size="lg" variant="outline" className="gap-2 text-lg px-8 py-6 border-white/30 text-white hover:bg-white/10">
                  Call (805) 307-7600
                </Button>
              </a>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
            {[
              { stat: "77%", label: "of patients use Google to find a new doctor" },
              { stat: "4.8+", label: "star average needed to be chosen over competitors" },
              { stat: "84%", label: "of patients trust online reviews as much as personal referrals" },
              { stat: "$0", label: "cost per new patient from organic SEO vs. paid ads" },
            ].map((s, i) => (
              <div key={i}>
                <div className="text-3xl font-bold text-teal-600 mb-2">{s.stat}</div>
                <p className="text-xs text-slate-600">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Specialties We Serve</Badge>
            <h2 className="text-3xl font-bold mb-4">Medical SEO for Every Specialty</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {["Family Medicine", "Dentistry", "Orthodontics", "Chiropractic", "Physical Therapy", "Dermatology", "Ophthalmology", "Mental Health / Therapy", "Plastic Surgery", "Cosmetic Dentistry", "Pediatrics", "OBGYN", "Naturopathic Medicine", "Acupuncture", "Sports Medicine", "Urgent Care"].map(spec => (
              <Badge key={spec} variant="outline" className="px-4 py-2 text-sm hover:bg-teal-50">{spec}</Badge>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Our Medical SEO Services</Badge>
            <h2 className="text-3xl font-bold mb-4">HIPAA-Compliant Healthcare Marketing</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { icon: Search, title: "Patient-Intent Keywords", desc: "Target the searches patients make when choosing a doctor: 'dentist accepting new patients Santa Barbara'" },
              { icon: Star, title: "Google Reviews", desc: "Ethical, HIPAA-compliant review generation that builds a 5-star reputation and boosts rankings." },
              { icon: Users, title: "Google Business Profile", desc: "Fully optimized profile with services, insurance info, photos, and booking link to maximize new patient calls." },
              { icon: Shield, title: "HIPAA Compliance", desc: "All content and marketing strategies are HIPAA-compliant to protect your practice and patients." },
              { icon: TrendingUp, title: "Medical Content", desc: "Educational blog posts and service pages targeting condition keywords that attract patients researching treatment." },
              { icon: Heart, title: "Patient Conversion", desc: "Website optimization focused on converting visitors into booked appointments with clear CTAs and trust signals." },
            ].map((f, i) => (
              <Card key={i} className="border-0 shadow-md hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="w-14 h-14 rounded-xl bg-teal-100 flex items-center justify-center mb-4">
                    <f.icon className="w-7 h-7 text-teal-600" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                  <p className="text-sm text-slate-600">{f.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Get More New Patients from Google"
        subtitle="See how your practice appears on Google vs. competitors and get a strategy to dominate local healthcare searches in Santa Barbara and Ventura County."
        bullets={["Practice visibility audit", "Competitor patient analysis", "Review strategy plan", "Patient keyword research"]}
        formTitle="Free Practice SEO Audit"
      />
    </main>
  )
}
