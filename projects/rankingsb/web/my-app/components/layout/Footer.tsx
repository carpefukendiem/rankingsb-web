import Link from "next/link"
import { Phone, Mail, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/">
              <img
                src="/logo-new.webp"
                alt="Rankingsb Local SEO Agency Santa Barbara"
                className="h-14 w-auto object-contain mb-4"
              />
            </Link>
            <p className="text-slate-400 mb-6 text-sm leading-relaxed">
              Santa Barbara and Ventura County's premier local SEO agency.
              We help local businesses rank higher on Google and get more customers.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-3 text-slate-400">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
                <span>10 E. Yanonali Street Suite 150, Santa Barbara, CA 93101</span>
              </div>
              <div className="flex items-center gap-3 text-slate-400">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <a href="tel:8053077600" className="hover:text-white transition-colors">(805) 307-7600</a>
              </div>
              <div className="flex items-center gap-3 text-slate-400">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <a href="mailto:hello@rankingsb.com" className="hover:text-white transition-colors">hello@rankingsb.com</a>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Services</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/services" className="hover:text-white transition-colors font-medium">All Services →</Link></li>
              <li><Link href="/services/local-seo" className="hover:text-white transition-colors">Local SEO</Link></li>
              <li><Link href="/services/google-business-profile" className="hover:text-white transition-colors">Google Business Profile</Link></li>
              <li><Link href="/services/review-management" className="hover:text-white transition-colors">Review Management</Link></li>
              <li><Link href="/services/citation-building" className="hover:text-white transition-colors">Citation Building</Link></li>
              <li><Link href="/services/technical-seo" className="hover:text-white transition-colors">Technical SEO</Link></li>
              <li><Link href="/services/ppc-google-ads" className="hover:text-white transition-colors">Google Ads / PPC</Link></li>
              <li><Link href="/services/content-marketing" className="hover:text-white transition-colors">Content Marketing</Link></li>
              <li><Link href="/services/website-design" className="hover:text-white transition-colors">Website Design</Link></li>
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Industries</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/industries" className="hover:text-white transition-colors font-medium">All Industries →</Link></li>
              <li><Link href="/industries/electrician-seo" className="hover:text-white transition-colors">Electrician</Link></li>
              <li><Link href="/industries/hvac-seo" className="hover:text-white transition-colors">HVAC</Link></li>
              <li><Link href="/industries/plumber-seo" className="hover:text-white transition-colors">Plumber</Link></li>
              <li><Link href="/industries/roofing-seo" className="hover:text-white transition-colors">Roofing</Link></li>
              <li><Link href="/industries/dental-seo" className="hover:text-white transition-colors">Dental</Link></li>
              <li><Link href="/industries/attorney-seo" className="hover:text-white transition-colors">Attorney</Link></li>
              <li><Link href="/industries/real-estate-seo" className="hover:text-white transition-colors">Real Estate</Link></li>
              <li><Link href="/industries/restaurant-seo" className="hover:text-white transition-colors">Restaurant</Link></li>
              <li><Link href="/industries/winery-seo" className="hover:text-white transition-colors">Winery</Link></li>
              <li><Link href="/industries/medical-seo" className="hover:text-white transition-colors">Medical</Link></li>
            </ul>
          </div>

          {/* Locations + Company */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Locations</h4>
            <ul className="space-y-2 text-sm text-slate-400 mb-6">
              <li><Link href="/locations" className="hover:text-white transition-colors font-medium">All Locations →</Link></li>
              <li><Link href="/locations/santa-barbara-seo" className="hover:text-white transition-colors">Santa Barbara</Link></li>
              <li><Link href="/locations/goleta-seo" className="hover:text-white transition-colors">Goleta</Link></li>
              <li><Link href="/locations/montecito-seo" className="hover:text-white transition-colors">Montecito</Link></li>
              <li><Link href="/locations/ventura-seo" className="hover:text-white transition-colors">Ventura</Link></li>
              <li><Link href="/locations/oxnard-seo" className="hover:text-white transition-colors">Oxnard</Link></li>
              <li><Link href="/locations/thousand-oaks-seo" className="hover:text-white transition-colors">Thousand Oaks</Link></li>
              <li><Link href="/locations/camarillo-seo" className="hover:text-white transition-colors">Camarillo</Link></li>
            </ul>
            <h4 className="font-semibold mb-4 text-white">Company</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/case-studies" className="hover:text-white transition-colors">Case Studies</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/free-audit" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">Free Audit →</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} Rankingsb. All rights reserved. Serving Santa Barbara & Ventura Counties.</p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-slate-300 transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
