import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Phone, ArrowRight, Star } from "lucide-react"

export const metadata: Metadata = {
  title: "{{TITLE}} | {{BRAND}}",
  description: "{{DESCRIPTION}}",
}

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background" />
        <div className="container relative mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4">
              {{BADGE}}
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              {{HEADLINE}}
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              {{SUBHEADLINE}}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2 text-lg">
                <Phone className="w-5 h-5" />
                {{CTA_PRIMARY}}
              </Button>
              <Button size="lg" variant="outline" className="gap-2 text-lg">
                {{CTA_SECONDARY}}
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              {{TRUST_SIGNAL}}
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{{FEATURES_TITLE}}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {{FEATURES_SUBTITLE}}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { title: "{{FEATURE_1_TITLE}}", desc: "{{FEATURE_1_DESC}}" },
              { title: "{{FEATURE_2_TITLE}}", desc: "{{FEATURE_2_DESC}}" },
              { title: "{{FEATURE_3_TITLE}}", desc: "{{FEATURE_3_DESC}}" },
            ].map((feature, i) => (
              <Card key={i} className="border-0 shadow-lg">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <CheckCircle className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-1 mb-8">
              {[1,2,3,4,5].map((i) => (
                <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <blockquote className="text-2xl text-center font-medium mb-6">
              "{{TESTIMONIAL}}"
            </blockquote>
            <p className="text-center text-muted-foreground">
              — {{TESTIMONIAL_AUTHOR}}
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">{{CTA_TITLE}}</h2>
            <p className="text-primary-foreground/80 mb-8">
              {{CTA_DESCRIPTION}}
            </p>
            <Button size="lg" variant="secondary" className="text-lg px-8">
              {{CTA_BUTTON}}
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
