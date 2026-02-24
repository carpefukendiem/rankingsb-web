import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, TrendingUp, MapPin, Phone, Star } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Case Studies | Rankingsb Santa Barbara",
  description: "Real results from real Santa Barbara businesses. See how we helped local companies rank higher and get more customers.",
}

const caseStudies = [
  {
    business: "Coastal HVAC",
    industry: "HVAC",
    location: "Santa Barbara",
    challenge: "Invisible on Google, relying on word-of-mouth",
    solution: "Local SEO + Google Business Profile optimization",
    results: [
      "Position 1 for 'HVAC Santa Barbara'",
      "+280% organic traffic",
      "12 new customers/month from search"
    ],
    quote: "We went from getting 2-3 calls a week to 5-6 calls a day. Best investment we ever made.",
    author: "Mike T., Owner",
    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&h=400&fit=crop"
  },
  {
    business: "Santa Barbara Plumbing",
    industry: "Plumbing",
    location: "Santa Barbara",
    challenge: "New competitor taking all the Google calls",
    solution: "Aggressive local SEO + content strategy",
    results: [
      "Top 3 for 8 keywords",
      "+340% website traffic",
      "Phone rings 'off the hook'"
    ],
    quote: "Rankingsb got us to #1 faster than I thought possible. The ROI was obvious by month 2.",
    author: "Jennifer L., Owner",
    image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=600&h=400&fit=crop"
  },
  {
    business: "Elite Electric",
    industry: "Electrician",
    location: "Goleta",
    challenge: "Couldn't break into Google Local Pack",
    solution: "GBP optimization + citation building + reviews",
    results: [
      "#1 in Local Pack for 'electrician Goleta'",
      "45 new 5-star reviews",
      "6x increase in quote requests"
    ],
    quote: "I was skeptical about SEO but the results speak for themselves. We're now the go-to electrician in Goleta.",
    author: "Dave R., Owner",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&h=400&fit=crop"
  },
  {
    business: "Coastal Roofing",
    industry: "Roofing",
    location: "Ventura",
    challenge: "Storm season coming, needed emergency call volume",
    solution: "Emergency keywords + rapid GBP optimization",
    results: [
      "Page 1 for 'emergency roofer Ventura'",
      "25+ emergency calls/month",
      "$150K in storm damage jobs"
    ],
    quote: "When the big storm hit, we were ready. Our phone didn't stop ringing while competitors were invisible.",
    author: "Sarah M., Owner",
    image: "https://images.unsplash.com/photo-1632759145351-1d592919f522?w=600&h=400&fit=crop"
  },
  {
    business: "Paragon Wellness",
    industry: "Med Spa",
    location: "Santa Barbara",
    challenge: "New location, zero online presence",
    solution: "Full local SEO launch + reputation building",
    results: [
      "#2 for 'med spa Santa Barbara' in 90 days",
      "85 new clients in first 6 months",
      "4.9 star average rating"
    ],
    quote: "We opened with no customers. Within 3 months we were booked solid. Local SEO was the key.",
    author: "Dr. Chen, Founder",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&h=400&fit=crop"
  },
  {
    business: "Ventura Solar",
    industry: "Solar Installation",
    location: "Ventura",
    challenge: "Competing against national solar companies",
    solution: "Local authority content + targeted SEO",
    results: [
      "Top 3 for 'solar installer Ventura'",
      "18 qualified leads/month",
      "$2.4M in closed sales"
    ],
    quote: "We beat the national companies because we focused on local. Rankingsb made us the obvious choice for Ventura homeowners.",
    author: "Tom K., Sales Director",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&h=400&fit=crop"
  }
]

export default function CaseStudiesPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&h=1080&fit=crop"
            alt="Business growth"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-blue-900/90 to-slate-900/95" />
        </div>
        
        <div className="container relative mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-white/10 text-white border-white/20 backdrop-blur-sm">Case Studies</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Real Results for Local Businesses
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              See how we helped Santa Barbara businesses dominate local search 
              and grow their customer base.
            </p>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {caseStudies.map((study, i) => (
              <Card key={i} className="h-full hover:shadow-2xl transition-all duration-300 overflow-hidden border-0">
                {/* Image */}
                <div className="h-48 overflow-hidden">
                  <img 
                    src={study.image}
                    alt={study.business}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Badge variant="secondary">{study.industry}</Badge>
                    <span className="text-sm text-slate-500 flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      {study.location}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{study.business}</h3>
                  
                  <div className="mb-4">
                    <div className="text-sm font-medium text-slate-900 mb-1">Challenge:</div>
                    <div className="text-sm text-slate-600">{study.challenge}</div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="text-sm font-medium text-slate-900 mb-1">Results:</div>
                    <ul className="space-y-1">
                      {study.results.map((result, j) => (
                        <li key={j} className="flex items-center text-sm text-slate-600">
                          <TrendingUp className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {result}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <blockquote className="border-l-4 border-blue-600 pl-4 italic text-slate-600 text-sm mb-4">
                    "{study.quote}"
                  </blockquote>
                  <div className="text-sm font-medium">— {study.author}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Testimonial */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">Client Testimonial</Badge>
              <h2 className="text-3xl font-bold">What Our Clients Say</h2>
            </div>
            
            <Card className="border-0 shadow-xl bg-white overflow-hidden">
              <div className="grid md:grid-cols-2">
                <div className="h-64 md:h-auto">
                  <img 
                    src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop"
                    alt="Business owner"
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-8 md:p-12 flex flex-col justify-center">
                  <div className="flex gap-1 mb-4">
                    {[1,2,3,4,5].map((star) => (
                      <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <blockquote className="text-xl text-slate-700 mb-6 italic">
                    "It's hard to find good people in digital marketing. It's extremely hard to find people who are good at multiple highly-specialized fields of digital marketing. And Ruben at Ranking SB is absolutely one of those extremely rare finds."
                  </blockquote>
                  <div>
                    <p className="font-bold text-slate-900">Kenneth Shen</p>
                    <p className="text-slate-500">Business Owner</p>
                  </div>
                </CardContent>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">100+</div>
              <div className="text-slate-600">Businesses Helped</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">94%</div>
              <div className="text-slate-600">Client Retention</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">$5M+</div>
              <div className="text-slate-600">Revenue Generated</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">300%</div>
              <div className="text-slate-600">Avg Traffic Increase</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Be Our Next Success Story?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Get a free audit showing exactly how we can help your business rank higher.
          </p>
          <Link href="/free-audit">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-100">
              <Phone className="w-5 h-5 mr-2" />
              Get Free Audit
            </Button>
          </Link>
        </div>
      </section>
    </main>
  )
}
