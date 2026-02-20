import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
  Users
} from "lucide-react"

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-24 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
          <div className="container relative mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <Badge variant="secondary" className="mb-4">
                <Award className="w-3 h-3 mr-1" />
                Trusted by 50+ Local Businesses
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                Get More Customers with Better Google Rankings
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Santa Barbara's premier SEO agency. We help local businesses dominate search results and attract high-quality leads.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="gap-2 text-lg">
                  <Phone className="w-5 h-5" />
                  Call (805) 555-0123
                </Button>
                <Button size="lg" variant="outline" className="gap-2 text-lg">
                  Get Free Audit
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
              <p className="mt-6 text-sm text-muted-foreground">
                Free 10-minute SEO audit • No obligation • Results guaranteed
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
              <div>
                <div className="text-3xl font-bold text-primary">300%</div>
                <div className="text-sm text-muted-foreground">Avg. Traffic Increase</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">50+</div>
                <div className="text-sm text-muted-foreground">Local Clients</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">#1</div>
                <div className="text-sm text-muted-foreground">Google Rankings</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">6.5 yrs</div>
                <div className="text-sm text-muted-foreground">Avg. Experience</div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Services</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Everything you need to dominate local search and get more customers
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Local SEO</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Dominate Google Maps and local search results. Get found by customers in Santa Barbara and surrounding areas.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <BarChart3 className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Google Ads</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    High-converting PPC campaigns that deliver immediate results. Optimized for local businesses and service areas.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Globe className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Web Design</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Beautiful, fast websites that convert visitors into customers. Mobile-first design with SEO built in.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Choose Rankingsb</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We're not just another marketing agency. We're your local SEO partner.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {[
                { icon: MapPin, title: "Local Expertise", desc: "Deep knowledge of Santa Barbara market" },
                { icon: Users, title: "Dedicated Support", desc: "Direct access to your SEO team" },
                { icon: CheckCircle, title: "Proven Results", desc: "Track record of success" },
                { icon: Award, title: "Transparent Pricing", desc: "No hidden fees, clear reporting" },
              ].map((item, i) => (
                <Card key={i} className="border-0">
                  <CardHeader>
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonial */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-center gap-1 mb-8">
                {[1,2,3,4,5].map((i) => (
                  <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <blockquote className="text-2xl text-center font-medium mb-6">
                "Rankingsb transformed our online presence. We went from page 3 to position 1 in just 3 months! Our phone is ringing off the hook."
              </blockquote>
              <p className="text-center text-muted-foreground">
                — Sarah Martinez, Owner, Santa Barbara Plumbing
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Rank Higher?</h2>
              <p className="text-primary-foreground/80 mb-8">
                Join 50+ local businesses who trust us with their SEO. Get your free audit today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" className="text-lg px-8">
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
                  Get Free Audit
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
