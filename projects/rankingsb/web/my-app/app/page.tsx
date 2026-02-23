import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  CheckCircle, 
  Phone, 
  ArrowRight, 
  Star, 
  TrendingUp, 
  MapPin, 
  Award,
  BarChart3,
  Globe,
  Users,
  Zap,
  Shield,
  Clock,
  ArrowUpRight,
  Play
} from "lucide-react"

export default function HomePage() {
  return (
    <main className="min-h-screen">
        {/* HERO SECTION - Dark gradient with pattern */}
        <section className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>
          
          <div className="container relative mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              {/* Trust badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="text-sm text-white/90">Trusted by 50+ Santa Barbara businesses</span>
              </div>
              
              {/* Main headline */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-white">
                Stop Losing Customers<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                  to Your Competitors
                </span>
              </h1>
              
              {/* Subheadline */}
              <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-2xl mx-auto">
                67% of customers choose the business on page 1 of Google. 
                We'll get you there in 90 days—or work for free until you rank.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <a href="/free-audit">
                  <Button size="lg" className="gap-2 text-lg px-8 py-6 bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-500/25">
                    <Phone className="w-5 h-5" />
                    Get Free SEO Audit
                  </Button>
                </a>
                <Button size="lg" variant="outline" className="gap-2 text-lg px-8 py-6 border-white/30 text-white hover:bg-white/10">
                  <Play className="w-5 h-5" />
                  See How It Works
                </Button>
              </div>
              
              {/* Trust signals */}
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>No contracts</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Results in 90 days</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Local Santa Barbara team</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bottom gradient fade */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
        </section>

        {/* CLIENT LOGOS - Trust section */}
        <section className="py-12 bg-white border-b">
          <div className="container mx-auto px-4">
            <p className="text-center text-sm text-slate-500 mb-8 uppercase tracking-wider">
              Trusted by local businesses across Santa Barbara
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-60">
              {['Fred\'s Upholstery', 'Enzo MMA', 'Paragon Goleta', 'Coastal HVAC', 'Brady Electric'].map((client) => (
                <div key={client} className="text-lg font-semibold text-slate-400">
                  {client}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROBLEM/AGITATION - Dark section */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <Badge variant="secondary" className="mb-4">The Problem</Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
                  Your Best Customers Are Searching...<br />
                  <span className="text-slate-500">And Finding Your Competitors</span>
                </h2>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { 
                    stat: "91%", 
                    desc: "of customers never go past page 1 of Google",
                    icon: BarChart3 
                  },
                  { 
                    stat: "67%", 
                    desc: "click on one of the top 3 search results",
                    icon: TrendingUp 
                  },
                  { 
                    stat: "$10k+", 
                    desc: "in lost revenue monthly if you're not ranking",
                    icon: Clock 
                  },
                ].map((item, i) => (
                  <Card key={i} className="border-0 shadow-lg text-center py-8">
                    <CardContent>
                      <div className="w-16 h-16 rounded-2xl bg-red-100 flex items-center justify-center mx-auto mb-4">
                        <item.icon className="w-8 h-8 text-red-500" />
                      </div>
                      <div className="text-4xl font-bold text-slate-900 mb-2">{item.stat}</div>
                      <p className="text-slate-600">{item.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SOLUTION - Gradient section */}
        <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <Badge className="mb-4 bg-white/20 text-white border-0">Our Solution</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                The Rankingsb 90-Day System
              </h2>
              <p className="text-xl text-blue-100">
                Proven process that gets local businesses to page 1—guaranteed
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { 
                  step: "01", 
                  title: "Audit & Strategy",
                  desc: "Deep analysis of your market, competitors, and opportunities. We find the quick wins.",
                  icon: Shield 
                },
                { 
                  step: "02", 
                  title: "Optimize & Build",
                  desc: "Technical fixes, content creation, and authority building. Google starts noticing.",
                  icon: Zap 
                },
                { 
                  step: "03", 
                  title: "Rank & Convert",
                  desc: "Page 1 rankings. More calls. More customers. You watch the leads roll in.",
                  icon: Award 
                },
              ].map((item, i) => (
                <div key={i} className="relative">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                    <div className="text-5xl font-bold text-white/20 mb-4">{item.step}</div>
                    <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-4">
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-blue-100">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SOCIAL PROOF - Testimonials */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge variant="secondary" className="mb-4">Real Results</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Businesses Like Yours Are Winning
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  quote: "We went from page 3 to position 1 in 3 months. Phone rings off the hook now.",
                  author: "Mike Johnson",
                  business: "Santa Barbara Plumbing",
                  result: "+340% organic traffic"
                },
                {
                  quote: "Best investment we ever made. ROI was positive by month 2.",
                  author: "Sarah Chen",
                  business: "Coastal HVAC",
                  result: "15 new customers/month"
                },
                {
                  quote: "They actually answer the phone and explain what they're doing. Rare these days.",
                  author: "David Rodriguez",
                  business: "Goleta Auto Repair",
                  result: "#1 for 'auto repair Goleta'"
                },
              ].map((testimonial, i) => (
                <Card key={i} className="border-0 shadow-lg">
                  <CardContent className="p-8">
                    <div className="flex gap-1 mb-4">
                      {[1,2,3,4,5].map((star) => (
                        <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-slate-700 mb-6 italic">"{testimonial.quote}"</p>
                    <div className="border-t pt-4">
                      <p className="font-semibold text-slate-900">{testimonial.author}</p>
                      <p className="text-sm text-slate-500">{testimonial.business}</p>
                      <Badge className="mt-2 bg-green-100 text-green-700 hover:bg-green-100">
                        {testimonial.result}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* SERVICES - Cards with icons */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge variant="secondary" className="mb-4">What We Do</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Everything You Need to Dominate Local Search
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {[
                { icon: MapPin, title: "Local SEO", desc: "Google Maps optimization, local citations, reputation management" },
                { icon: Globe, title: "On-Page SEO", desc: "Content optimization, technical fixes, site speed improvements" },
                { icon: BarChart3, title: "Google Ads", desc: "High-converting PPC campaigns that deliver immediate results" },
                { icon: Users, title: "Content Marketing", desc: "Blog posts, service pages, and content that ranks and converts" },
              ].map((service, i) => (
                <Card key={i} className="border-0 shadow-md hover:shadow-xl transition-shadow group">
                  <CardContent className="p-6">
                    <div className="w-14 h-14 rounded-xl bg-blue-100 group-hover:bg-blue-500 transition-colors flex items-center justify-center mb-4">
                      <service.icon className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">{service.title}</h3>
                    <p className="text-sm text-slate-600">{service.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING/CTA - Dark with urgency */}
        <section className="py-20 bg-slate-900 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <Badge className="mb-4 bg-red-500 text-white border-0">Limited Spots</Badge>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Get Started with a Free SEO Audit
                  </h2>
                  <p className="text-slate-300 mb-6">
                    We'll analyze your website, competitors, and market. You'll get a 
                    10-minute video showing exactly what's wrong and how to fix it.
                  </p>
                  <ul className="space-y-3 mb-8">
                    {[
                      "Complete technical audit ($500 value)",
                      "Competitor analysis",
                      "Keyword opportunity report",
                      "No obligation, no sales pitch"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-slate-300">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Card className="border-0 shadow-2xl">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold mb-2 text-slate-900">Request Your Free Audit</h3>
                    <p className="text-slate-500 mb-6">We'll send your audit within 24 hours</p>
                    
                    <form className="space-y-4">
                      <Input placeholder="Your Name" className="h-12" />
                      <Input placeholder="Business Name" className="h-12" />
                      <Input type="email" placeholder="Email Address" className="h-12" />
                      <Input type="tel" placeholder="Phone Number" className="h-12" />
                      <Button className="w-full h-12 text-lg bg-blue-600 hover:bg-blue-700">
                        Get My Free Audit
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </form>
                    
                    <p className="text-xs text-slate-400 text-center mt-4">
                      We respect your privacy. No spam, ever.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* GUARANTEE SECTION */}
        <section className="py-16 bg-blue-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-6">
                <Shield className="w-10 h-10 text-blue-600" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Our 90-Day Ranking Guarantee
              </h2>
              <p className="text-lg text-slate-600">
                If you don't see measurable improvement in your Google rankings within 90 days, 
                we'll continue working for free until you do. That's our promise.
              </p>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Stop Losing Customers?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join 50+ Santa Barbara businesses who trust us with their SEO. 
              Your free audit is waiting.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:8053077600">
                <Button size="lg" className="text-lg px-8 py-6 bg-white text-blue-600 hover:bg-slate-100">
                  <Phone className="w-5 h-5 mr-2" />
                  Call (805) 307-7600
                </Button>
              </a>
              <a href="/free-audit">
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-white text-white hover:bg-white/10">
                  Get Free Audit
                  <ArrowUpRight className="w-5 h-5 ml-2" />
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>
  )
}
