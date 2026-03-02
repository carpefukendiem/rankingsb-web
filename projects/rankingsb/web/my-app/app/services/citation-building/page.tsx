import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Phone, Globe, Shield, Search, MapPin, Building2 } from "lucide-react"
import Link from "next/link"
import { CTASection } from "@/components/shared/CTASection"

export const metadata: Metadata = {
  title: "Citation Building Services Santa Barbara | Rankingsb",
  description: "Build consistent business citations across 40+ directories to boost local SEO rankings in Santa Barbara and Ventura County. Improve your NAP consistency.",
  keywords: ["citation building Santa Barbara", "local citations", "business directory listings", "NAP consistency", "local SEO citations"],
}

const directories = [
  "Google Business Profile", "Yelp", "Bing Places", "Apple Maps", "Facebook",
  "Yellow Pages", "Angi", "HomeAdvisor", "BBB", "Chamber of Commerce",
  "Foursquare", "Manta", "Citysearch", "Superpages", "TomTom",
  "HERE Maps", "MapQuest", "Hotfrog", "MerchantCircle", "Brownbook",
  "EZlocal", "iGlobal", "ShowMeLocal", "LocalDatabase", "Judy's Book",
  "Insider Pages", "YellowBook", "USDirectory", "Topix", "Local.com",
]

export default function CitationBuildingPage() {
  return (
    <main className="min-h-screen">
      <section className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-slate-900 via-teal-900/40 to-slate-900">
        <div className="container relative mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
              <Globe className="w-4 h-4 text-teal-400" />
              <span className="text-sm text-white/90">Citation Building & NAP Consistency</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white">
              Build Citations That<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">
                Boost Local Rankings
              </span>
            </h1>
            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
              Consistent business information across 40+ directories signals trust to Google and
              dramatically improves your local search rankings in Santa Barbara and Ventura County.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/free-audit">
                <Button size="lg" className="gap-2 text-lg px-8 py-6 bg-teal-500 hover:bg-teal-400 text-white">
                  <Phone className="w-5 h-5" />
                  Get Free Citation Audit
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
              { stat: "40+", label: "directories we build & manage" },
              { stat: "16%", label: "ranking boost from consistent citations" },
              { stat: "100%", label: "NAP accuracy guaranteed" },
              { stat: "7%", label: "of Google local ranking algorithm" },
            ].map((s, i) => (
              <div key={i}>
                <div className="text-4xl font-bold text-teal-600 mb-2">{s.stat}</div>
                <p className="text-sm text-slate-600">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">What Are Citations?</Badge>
            <h2 className="text-3xl font-bold mb-4 text-slate-900">Why Citations Matter for Local SEO</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              A citation is any online mention of your business name, address, and phone number (NAP).
              Consistent, widespread citations are a major local ranking factor.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: Globe, title: "Build Authority", desc: "More consistent citations across trusted sites signals to Google your business is legitimate and established." },
              { icon: Shield, title: "NAP Consistency", desc: "Inconsistent name/address/phone is one of the #1 reasons businesses don't rank locally — we fix this." },
              { icon: Search, title: "Rank Higher", desc: "Citations are a top-5 local ranking factor. More quality citations = higher position in local search." },
              { icon: MapPin, title: "Maps Visibility", desc: "Google Maps ranking is directly tied to the quality and quantity of your citations." },
              { icon: Building2, title: "Industry Directories", desc: "Industry-specific directories (Houzz, Zocdoc, Avvo, etc.) carry extra weight for niche rankings." },
              { icon: CheckCircle, title: "Duplicate Cleanup", desc: "We find and remove/merge duplicate listings that confuse Google and dilute your ranking authority." },
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

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">30+ Directories We Submit To</h2>
              <p className="text-slate-600 mt-4">Plus industry-specific directories relevant to your business</p>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {directories.map((dir, i) => (
                <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-full border border-teal-200 bg-teal-50 text-sm text-teal-800 font-medium">
                  <CheckCircle className="w-3.5 h-3.5 text-teal-600" />
                  {dir}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Audit Your Business Listings"
        subtitle="Find out how many incorrect or missing citations are hurting your local rankings and get a plan to fix them."
        bullets={["Citation audit report", "NAP inconsistency check", "Missing directory list", "Duplicate detection"]}
        formTitle="Free Citation Audit"
      />
    </main>
  )
}
