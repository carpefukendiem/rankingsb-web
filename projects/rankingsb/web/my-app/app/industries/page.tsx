import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Zap, 
  Thermometer, 
  Droplets, 
  Home, 
  Sun, 
  Scale, 
  Stethoscope, 
  ShoppingBag, 
  UtensilsCrossed,
  Car,
  Dumbbell,
  Briefcase,
  ArrowRight,
  Phone,
  TrendingUp,
  MapPin,
  CheckCircle
} from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Industries We Serve | Rankingsb Santa Barbara",
  description: "Specialized SEO services for local businesses in Santa Barbara. Electricians, HVAC, plumbers, attorneys, auto repair, gyms, and more.",
}

const industries = [
  {
    title: "Electrician SEO",
    description: "Get more electrical service calls with local SEO. Rank #1 for 'electrician near me' and emergency electrical searches.",
    icon: Zap,
    href: "/industries/electrician-seo",
    color: "bg-blue-500",
    lightColor: "bg-blue-100",
    textColor: "text-blue-600",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&h=400&fit=crop",
    stats: "+180% avg. call increase"
  },
  {
    title: "HVAC SEO",
    description: "Capture seasonal demand with SEO built for heating and cooling companies. Rank for emergency AC and furnace repairs.",
    icon: Thermometer,
    href: "/industries/hvac-seo",
    color: "bg-orange-500",
    lightColor: "bg-orange-100",
    textColor: "text-orange-600",
    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&h=400&fit=crop",
    stats: "15+ calls/day in peak season"
  },
  {
    title: "Plumber SEO",
    description: "Emergency plumbing calls go to page 1. Get ranked for '24/7 plumber' and capture high-value service calls.",
    icon: Droplets,
    href: "/industries/plumber-seo",
    color: "bg-cyan-500",
    lightColor: "bg-cyan-100",
    textColor: "text-cyan-600",
    image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=600&h=400&fit=crop",
    stats: "$350 avg. emergency call"
  },
  {
    title: "Roofing SEO",
    description: "Storm season is your opportunity. Rank for storm damage repairs and capture insurance roofing jobs.",
    icon: Home,
    href: "/industries/roofing-seo",
    color: "bg-red-500",
    lightColor: "bg-red-100",
    textColor: "text-red-600",
    image: "https://images.unsplash.com/photo-1632759145351-1d592919f522?w=600&h=400&fit=crop",
    stats: "$15K avg. job value"
  },
  {
    title: "Solar SEO",
    description: "High-ticket solar installations require targeted SEO. Rank for 'solar installer near me' and capture qualified leads.",
    icon: Sun,
    href: "/industries/solar-seo",
    color: "bg-yellow-500",
    lightColor: "bg-yellow-100",
    textColor: "text-yellow-600",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&h=400&fit=crop",
    stats: "$25K avg. system value"
  },
  {
    title: "Attorney SEO",
    description: "Legal clients are searching right now. Rank for case-specific searches like 'personal injury lawyer Santa Barbara'.",
    icon: Scale,
    href: "/industries/attorney-seo",
    color: "bg-indigo-500",
    lightColor: "bg-indigo-100",
    textColor: "text-indigo-600",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&h=400&fit=crop",
    stats: "$5K+ avg. case value"
  },
  {
    title: "Dental SEO",
    description: "Attract new patients with local SEO for dentists. Rank for 'dentist near me' and cosmetic dentistry searches.",
    icon: Stethoscope,
    href: "/industries/dental-seo",
    color: "bg-teal-500",
    lightColor: "bg-teal-100",
    textColor: "text-teal-600",
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&h=400&fit=crop",
    stats: "40+ new patients/month"
  },
  {
    title: "E-commerce SEO",
    description: "Scale your online store with product page optimization and category SEO that drives qualified traffic.",
    icon: ShoppingBag,
    href: "/industries/ecommerce-seo",
    color: "bg-purple-500",
    lightColor: "bg-purple-100",
    textColor: "text-purple-600",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop",
    stats: "+220% organic traffic"
  },
  {
    title: "Restaurant SEO",
    description: "Fill more tables with local SEO. Rank for 'restaurants near me' and cuisine-specific searches.",
    icon: UtensilsCrossed,
    href: "/industries/restaurant-seo",
    color: "bg-rose-500",
    lightColor: "bg-rose-100",
    textColor: "text-rose-600",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop",
    stats: "+85% reservation increase"
  },
  {
    title: "Auto Mechanic SEO",
    description: "Get more repair calls with local SEO for auto shops. Rank for 'auto repair near me' and capture vehicle service customers.",
    icon: Car,
    href: "/industries/auto-mechanic-seo",
    color: "bg-amber-600",
    lightColor: "bg-amber-100",
    textColor: "text-amber-700",
    image: "/images/auto-mechanic-santa-barbara.jpg",
    stats: "+150% service calls"
  },
  {
    title: "Gym & Fitness SEO",
    description: "Attract new members with local SEO for fitness centers. Rank for 'gym near me' and personal training searches.",
    icon: Dumbbell,
    href: "/industries/gym-fitness-seo",
    color: "bg-lime-500",
    lightColor: "bg-lime-100",
    textColor: "text-lime-700",
    image: "/images/gym-fitness-santa-barbara.jpg",
    stats: "60+ new members/month"
  },
  {
    title: "Other Businesses",
    description: "No matter your industry, we can help you rank higher. Custom SEO strategies for any business type in Santa Barbara.",
    icon: Briefcase,
    href: "/industries/other-seo",
    color: "bg-slate-500",
    lightColor: "bg-slate-100",
    textColor: "text-slate-600",
    image: "/images/business-consulting-santa-barbara.jpg",
    stats: "Custom solutions"
  }
]

export default function IndustriesPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&h=1080&fit=crop"
            alt="Business growth"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-blue-900/90 to-slate-900/95" />
        
        <div className="container relative mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-white/10 text-white border-white/20 backdrop-blur-sm">Industries</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              SEO Specialized for<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Your Industry
              </span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              We don't do generic SEO. Every industry has unique search patterns, 
              seasonal demands, and customer behaviors. We know them all.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/free-audit">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-100">
                  <Phone className="w-5 h-5 mr-2" />
                  Get Free Audit
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Industry-Specific SEO */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">Why Specialized?</Badge>
              <h2 className="text-3xl font-bold mb-4">Every Industry is Different</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                A strategy that works for a restaurant won't work for a roofer. 
                We tailor our approach to your industry's unique challenges.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Seasonal Patterns</h3>
                  <p className="text-slate-600 text-sm">
                    HVAC needs summer AC optimization. Roofers need storm season prep. 
                    We time your SEO for maximum impact.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Local Search Behavior</h3>
                  <p className="text-slate-600 text-sm">
                    Electricians get "emergency" searches. Attorneys get "best" searches. 
                    We target the keywords your customers actually use.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-purple-100 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Proven Playbooks</h3>
                  <p className="text-slate-600 text-sm">
                    We've worked with dozens of businesses in each industry. 
                    We know what works—and what doesn't.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Industries We Serve</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Industry</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Click on your industry to see how we can help you get more customers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {industries.map((industry) => (
              <Link key={industry.href} href={industry.href} className="group">
                <Card className="h-full overflow-hidden hover:shadow-2xl transition-all duration-300 border-0">
                  {/* Image */}
                  <div className="h-48 overflow-hidden relative">
                    <img 
                      src={industry.image}
                      alt={industry.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <Badge className="bg-white/90 text-slate-900 backdrop-blur-sm">
                        {industry.stats}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl ${industry.lightColor} flex items-center justify-center flex-shrink-0 group-hover:${industry.color} transition-colors`}>
                        <industry.icon className={`w-6 h-6 ${industry.textColor} group-hover:text-white transition-colors`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                          {industry.title}
                        </h3>
                        <p className="text-slate-600 text-sm mb-4">
                          {industry.description}
                        </p>
                        <div className="flex items-center text-sm font-medium text-blue-600">
                          Learn more
                          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-sm text-slate-500 mb-8 uppercase tracking-wider">
              Trusted by local businesses across Santa Barbara County
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
              {['Fred\'s Upholstery', 'Enzo MMA', 'Paragon Goleta', 'Coastal HVAC', 'Brady Electric'].map((client) => (
                <div key={client} className="text-lg font-semibold text-slate-400">
                  {client}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Don't See Your Industry?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              We work with businesses across all industries. Contact us to see 
              how we can help you rank higher and get more customers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/free-audit">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-100">
                  <Phone className="w-5 h-5 mr-2" />
                  Get Free Audit
                </Button>
              </Link>
              <a href="tel:8053077600">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Call (805) 307-7600
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
