import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Award, Users, Target, Link2 } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title:
    "About Rankingsb | The 805 Growth Engine | Santa Barbara SEO & Web Agency",
  description:
    "Rankingsb builds complete local growth systems — custom websites, Google rankings, and automated lead follow-up — for 805 businesses. Local team. Real guarantees.",
}

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&h=1080&fit=crop"
            alt="Team collaboration"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-blue-900/90 to-slate-900/95" />
        </div>

        <div className="container relative mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-white/10 text-white border-white/20 backdrop-blur-sm">
              About Us
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              We&apos;re Not an Agency. We&apos;re Your Unfair Advantage in the 805.
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Custom websites, local SEO, and The Ranking App — one team, one system,
              built for neighbors we see at the grocery store.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-slate-600 mb-4 leading-relaxed">
                Most marketing agencies sell you services. We built a system.
              </p>
              <p className="text-slate-600 mb-4 leading-relaxed">
                Rankingsb started with a simple observation: local businesses in Santa
                Barbara and Ventura County were losing customers not because of the
                quality of their work, but because of their infrastructure. The
                competitor who ranks #1 on Google and follows up with every lead
                within 3 minutes gets the customer — every time. It doesn&apos;t
                matter who does better work.
              </p>
              <p className="text-slate-600 mb-4 leading-relaxed">
                So we built the infrastructure that makes our clients that
                competitor.
              </p>
              <p className="text-slate-600 mb-4 leading-relaxed">
                The 805 Growth Engine combines a custom-coded website built to rank,
                local SEO that produces calls not reports, and The Ranking App — our
                automated platform that follows up with every lead before the
                competition has even seen the notification.
              </p>
              <p className="text-slate-600 leading-relaxed">
                We&apos;re local. We&apos;re in the 805. Every business we help is a
                neighbor. That&apos;s not a tagline — it means our reputation lives
                or dies in the same market we&apos;re competing in. We can&apos;t
                afford to do mediocre work, and we don&apos;t.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop"
                alt="Business meeting"
                className="rounded-2xl shadow-xl w-full"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-1">100+</div>
                    <div className="text-sm text-slate-600">Businesses Helped</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-1">94%</div>
                    <div className="text-sm text-slate-600">Client Retention</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              Our Values
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What We Believe</h2>
            <p className="text-lg text-slate-600">
              The principles that guide everything we do.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: Target,
                title: "Results First",
                description:
                  "We measure success by calls, leads, and new customers — not reports. If it's not driving revenue for your business, we don't do it.",
                image:
                  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
              },
              {
                icon: Users,
                title: "Local Focus",
                description:
                  "We specialize in the 805. We know Santa Barbara and Ventura County — the competition, the neighborhoods, the search behavior, and the seasonal patterns. That local knowledge is built into everything we build.",
                image:
                  "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop",
              },
              {
                icon: Award,
                title: "Transparency",
                description:
                  "You'll always know what we're doing and why. No black box, no jargon-filled reports. You get plain-language updates showing what moved, what's next, and what it means for your business.",
                image:
                  "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=300&fit=crop",
              },
              {
                icon: Link2,
                title: "Full Ownership",
                description:
                  "We build the full system. One team owns the website, the SEO, The Ranking App, and the reporting. No finger-pointing between vendors. No gaps. The whole picture is ours to manage — and yours to own.",
                image:
                  "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=300&fit=crop",
              },
            ].map((value, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={value.image}
                    alt={value.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-8">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
                    <value.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-slate-600">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              Our Team
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet the Experts</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              A tight team of developers, SEO specialists, content writers, and
              automation engineers — all dedicated to 805 businesses. Small enough
              to move fast. Experienced enough to do it right.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face"
                alt="Ruben Ruiz"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-blue-100"
              />
              <h3 className="text-xl font-bold mb-1">Ruben Ruiz — Founder</h3>
              <p className="text-blue-600 text-sm mb-3">The 805 Growth Engine</p>
              <p className="text-slate-600 text-sm leading-relaxed">
                Ruben built the 805 Growth Engine because he was tired of seeing great
                local businesses lose to mediocre competitors who simply had better
                digital infrastructure. With backgrounds spanning web development,
                technical SEO, paid media, and CRM automation, Ruben runs the
                full-stack system that other agencies charge multiples to assemble
                from separate vendors.
              </p>
            </div>
            <div className="text-center flex flex-col justify-center">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=300&h=300&fit=crop"
                alt="Rankingsb team"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-blue-100"
              />
              <h3 className="text-xl font-bold mb-1">The Rankingsb Team</h3>
              <p className="text-blue-600 text-sm mb-3">Developers & specialists</p>
              <p className="text-slate-600 text-sm leading-relaxed">
                Developers, SEO specialists, writers, and automation engineers
                working as one unit — so your website, rankings, and lead follow-up
                never drift out of sync.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <Badge variant="secondary" className="mb-4">
                Our Office
              </Badge>
              <h2 className="text-3xl font-bold mb-6">Local to Santa Barbara</h2>
              <p className="text-slate-600 mb-4">
                We&apos;re based in Santa Barbara, California. We know the local
                market, the competition, and the unique challenges of ranking here.
              </p>
              <div className="flex items-start gap-3 mb-4">
                <MapPin className="w-5 h-5 text-blue-600 mt-1" />
                <div>
                  <div className="font-medium">Address</div>
                  <div className="text-slate-600">
                    10 E. Yanonali Street Suite 150
                    <br />
                    Santa Barbara, CA 93101
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3 mb-4">
                <Phone className="w-5 h-5 text-blue-600 mt-1" />
                <div>
                  <div className="font-medium">Phone</div>
                  <a
                    href="tel:8053077600"
                    className="text-slate-600 hover:text-blue-600"
                  >
                    (805) 307-7600
                  </a>
                </div>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl h-80">
              <img
                src="https://images.unsplash.com/photo-1599577908906-8d6c700342b5?w=800&h=600&fit=crop"
                alt="Santa Barbara coastline"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Work With Us
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Ready to stop competing on luck and start competing on infrastructure?
            Let&apos;s talk about what the 805 Growth Engine looks like for your
            business.
          </p>
          <Link href="/free-audit">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-100">
              <Phone className="w-5 h-5 mr-2" />
              Claim Your Free Growth Audit
            </Button>
          </Link>
        </div>
      </section>
    </main>
  )
}
