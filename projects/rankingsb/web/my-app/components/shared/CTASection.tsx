import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { CheckCircle, Phone, ArrowRight } from "lucide-react"
import Link from "next/link"

interface CTASectionProps {
  title?: string
  subtitle?: string
  bullets?: string[]
  formTitle?: string
}

export function CTASection({
  title = "Ready to Dominate Local Search?",
  subtitle = "Get a free SEO audit showing exactly why you're not ranking and how to fix it — delivered within 24 hours.",
  bullets = ["Complete technical SEO audit", "Competitor ranking analysis", "90-day roadmap to page 1", "No contracts or obligations"],
  formTitle = "Get Your Free Audit",
}: CTASectionProps) {
  return (
    <section className="py-20 bg-slate-900 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
              <p className="text-slate-300 mb-6 text-lg">{subtitle}</p>
              <ul className="space-y-3 mb-8">
                {bullets.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-300">
                    <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-4">
                <Link href="/free-audit">
                  <Button size="lg" className="bg-blue-500 hover:bg-blue-400 text-white shadow-lg shadow-blue-500/30">
                    <Phone className="w-4 h-4 mr-2" />
                    Get Free Audit
                  </Button>
                </Link>
                <a href="tel:8053077600">
                  <Button size="lg" variant="outline" className="border-slate-600 text-white hover:bg-slate-800">
                    Call (805) 307-7600
                  </Button>
                </a>
              </div>
            </div>
            <Card className="border-0 shadow-2xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-1 text-slate-900">{formTitle}</h3>
                <p className="text-slate-500 mb-6 text-sm">We'll deliver your audit within 24 hours</p>
                <form className="space-y-4">
                  <Input placeholder="Your Name" className="h-12" />
                  <Input placeholder="Business Name" className="h-12" />
                  <Input type="email" placeholder="Email Address" className="h-12" />
                  <Input type="tel" placeholder="(805) 555-0123" className="h-12" />
                  <Button className="w-full h-12 text-lg bg-blue-600 hover:bg-blue-700">
                    Send My Free Audit
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </form>
                <p className="text-xs text-slate-400 text-center mt-4">No spam. No contracts. No obligation.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
