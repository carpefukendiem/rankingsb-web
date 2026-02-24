import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { CheckCircle, Phone, ArrowRight, UtensilsCrossed, Calendar, Star, TrendingUp, Users } from "lucide-react"

export const metadata: Metadata = {
  title: "Restaurant SEO Santa Barbara | Rankingsb",
  description: "Fill more tables with local SEO. Rank for 'restaurants near me' and cuisine-specific searches in Santa Barbara.",
}

export default function RestaurantSEOPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative py-20 lg:py-28 overflow-hidden bg-gradient-to-br from-slate-900 via-rose-900 to-slate-900">
        <div className="absolute inset-0 opacity-10">
          <img 
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&h=1080&fit=crop"
            alt="Restaurant interior"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-rose-900/80 to-slate-900/90" />
        
        <div className="container relative mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
              <UtensilsCrossed className="w-4 h-4 text-rose-400" />
              <span className="text-sm text-white/90">For Restaurants</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white">
              Restaurant SEO<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-400">
                That Fills Tables
              </span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              When hungry customers search "restaurants near me" or "best Italian Santa Barbara," 
              be the restaurant they choose.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2 text-lg px-8 py-6 bg-rose-600 hover:bg-rose-700 text-white shadow-lg shadow-rose-600/25">
                <Phone className="w-5 h-5" />
                Get Free SEO Audit
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Problem */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <Badge variant="secondary" className="mb-4">Hunger = Immediate Action</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
              Diners Decide in Seconds
            </h2>
            <p className="text-xl text-slate-600">
              When people are hungry, they search and decide immediately. 
              The restaurants on Google page 1 get the diners.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { stat: "85%", desc: "increase in reservations possible" },
              { stat: "90 min", desc: "average time from search to dining" },
              { stat: "3", desc: "restaurants get 70% of consideration" },
            ].map((item, i) => (
              <Card key={i} className="border-0 shadow-lg text-center">
                <CardContent className="p-8">
                  <div className="text-4xl font-bold text-rose-600 mb-2">{item.stat}</div>
                  <p className="text-slate-600">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <Badge variant="secondary" className="mb-4">Restaurant SEO</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Get Found by Hungry Diners
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { icon: UtensilsCrossed, title: "Cuisine Keywords", desc: "Rank for 'Italian,' 'sushi,' 'seafood' + Santa Barbara" },
              { icon: Star, title: "Review Management", desc: "Build 5-star reputation that attracts diners" },
              { icon: Calendar, title: "Reservation SEO", desc: "Optimize for 'reservations' and 'book a table'" },
              { icon: TrendingUp, title: "Local Maps", desc: "Rank in Google Maps for 'restaurants near me'" },
            ].map((service, i) => (
              <Card key={i} className="border-0 shadow-md hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="w-14 h-14 rounded-xl bg-rose-100 flex items-center justify-center mb-4">
                    <service.icon className="w-7 h-7 text-rose-600" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{service.title}</h3>
                  <p className="text-sm text-slate-600">{service.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-rose-600 to-orange-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Free Restaurant SEO Audit
                </h2>
                <p className="text-rose-100 mb-6">
                  See why competing restaurants are outranking you and how to 
                  fill more tables with hungry diners.
                </p>
                <ul className="space-y-3 mb-8">
                  {["Complete local SEO audit", "Competitor restaurant analysis", "Cuisine keyword opportunities", "90-day ranking plan"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-rose-100">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <Card className="border-0 shadow-2xl">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-2 text-slate-900">Request Your Audit</h3>
                  <p className="text-slate-500 mb-6">We'll send it within 24 hours</p>
                  <form className="space-y-4">
                    <Input placeholder="Your Name" className="h-12" />
                    <Input placeholder="Restaurant Name" className="h-12" />
                    <Input type="email" placeholder="Email Address" className="h-12" />
                    <Input type="tel" placeholder="Phone Number" className="h-12" />
                    <Button className="w-full h-12 text-lg bg-rose-600 hover:bg-rose-700">
                      Get My Free Audit
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
