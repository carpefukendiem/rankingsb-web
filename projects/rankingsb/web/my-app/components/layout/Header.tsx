"use client"

import { Button } from "@/components/ui/button"
import { Phone, Menu, X, ChevronDown, MapPin, Wrench, FileText } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const services = [
  { href: "/services/local-seo", label: "Local SEO" },
  { href: "/services/google-business-profile", label: "Google Business Profile" },
  { href: "/services/review-management", label: "Review Management" },
  { href: "/services/citation-building", label: "Citation Building" },
  { href: "/services/technical-seo", label: "Technical SEO" },
  { href: "/services/ppc-google-ads", label: "Google Ads / PPC" },
  { href: "/services/content-marketing", label: "Content Marketing" },
  { href: "/services/website-design", label: "Website Design" },
]

const industries = [
  { href: "/industries/electrician-seo", label: "Electrician" },
  { href: "/industries/hvac-seo", label: "HVAC" },
  { href: "/industries/plumber-seo", label: "Plumber" },
  { href: "/industries/roofing-seo", label: "Roofing" },
  { href: "/industries/solar-seo", label: "Solar" },
  { href: "/industries/attorney-seo", label: "Attorney" },
  { href: "/industries/dental-seo", label: "Dental" },
  { href: "/industries/restaurant-seo", label: "Restaurant" },
  { href: "/industries/real-estate-seo", label: "Real Estate" },
  { href: "/industries/medical-seo", label: "Medical" },
  { href: "/industries/landscaping-seo", label: "Landscaping" },
  { href: "/industries/auto-mechanic-seo", label: "Auto Mechanic" },
  { href: "/industries/winery-seo", label: "Winery / Wine Bar" },
  { href: "/industries/gym-fitness-seo", label: "Gym & Fitness" },
]

const locations = [
  { href: "/locations/santa-barbara-seo", label: "Santa Barbara" },
  { href: "/locations/goleta-seo", label: "Goleta" },
  { href: "/locations/montecito-seo", label: "Montecito" },
  { href: "/locations/carpinteria-seo", label: "Carpinteria" },
  { href: "/locations/solvang-seo", label: "Solvang" },
  { href: "/locations/ventura-county-seo", label: "Ventura County" },
  { href: "/locations/ventura-seo", label: "Ventura" },
  { href: "/locations/oxnard-seo", label: "Oxnard" },
  { href: "/locations/thousand-oaks-seo", label: "Thousand Oaks" },
  { href: "/locations/camarillo-seo", label: "Camarillo" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  const handleMouseEnter = (menu: string) => setActiveDropdown(menu)
  const handleMouseLeave = () => setActiveDropdown(null)

  return (
    <header className="sticky top-0 z-50 w-full bg-slate-900 shadow-lg shadow-slate-900/20">
      <div className="container mx-auto px-4">
        <div className="flex h-18 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center py-2">
            <img
              src="/logo-new.webp"
              alt="Rankingsb Local SEO Agency Santa Barbara"
              className="object-contain"
              style={{ height: '80px', width: 'auto', maxWidth: '240px' }}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('services')}
              onMouseLeave={handleMouseLeave}
            >
              <Link href="/services" className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-slate-200 hover:text-white hover:bg-slate-800 rounded-md transition-colors">
                Services
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </Link>
              {activeDropdown === 'services' && (
                <div className="absolute top-full left-0 pt-1 z-50">
                  <div className="bg-white rounded-xl shadow-2xl border border-slate-100 p-4 w-64">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                      <Wrench className="w-3 h-3" /> Our Services
                    </p>
                    <div className="grid grid-cols-1 gap-0.5">
                      {services.map((s) => (
                        <Link key={s.href} href={s.href} className="px-3 py-2 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors">
                          {s.label}
                        </Link>
                      ))}
                    </div>
                    <div className="mt-3 pt-3 border-t">
                      <Link href="/services" className="text-xs text-blue-600 font-medium hover:text-blue-700">
                        View all services →
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Industries Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('industries')}
              onMouseLeave={handleMouseLeave}
            >
              <Link href="/industries" className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-slate-200 hover:text-white hover:bg-slate-800 rounded-md transition-colors">
                Industries
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </Link>
              {activeDropdown === 'industries' && (
                <div className="absolute top-full left-0 pt-1 z-50">
                  <div className="bg-white rounded-xl shadow-2xl border border-slate-100 p-4 w-64">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Industries We Serve</p>
                    <div className="grid grid-cols-1 gap-0.5">
                      {industries.map((s) => (
                        <Link key={s.href} href={s.href} className="px-3 py-2 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors">
                          {s.label}
                        </Link>
                      ))}
                    </div>
                    <div className="mt-3 pt-3 border-t">
                      <Link href="/industries" className="text-xs text-blue-600 font-medium hover:text-blue-700">
                        View all industries →
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Locations Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('locations')}
              onMouseLeave={handleMouseLeave}
            >
              <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-slate-200 hover:text-white hover:bg-slate-800 rounded-md transition-colors">
                <MapPin className="w-3.5 h-3.5" />
                Locations
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>
              {activeDropdown === 'locations' && (
                <div className="absolute top-full left-0 pt-1 z-50">
                  <div className="bg-white rounded-xl shadow-2xl border border-slate-100 p-4 w-64">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                      <MapPin className="w-3 h-3" /> Service Areas
                    </p>
                    <div className="grid grid-cols-1 gap-0.5">
                      {locations.map((s) => (
                        <Link key={s.href} href={s.href} className="px-3 py-2 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors">
                          {s.label}
                        </Link>
                      ))}
                    </div>
                    <div className="mt-3 pt-3 border-t">
                      <Link href="/locations" className="text-xs text-blue-600 font-medium hover:text-blue-700">
                        View all locations →
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link href="/about" className="px-3 py-2 text-sm font-medium text-slate-200 hover:text-white hover:bg-slate-800 rounded-md transition-colors">
              About
            </Link>
            <Link href="/blog" className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-slate-200 hover:text-white hover:bg-slate-800 rounded-md transition-colors">
              <FileText className="w-3.5 h-3.5" />
              Blog
            </Link>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <a href="tel:8053077600" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
              (805) 307-7600
            </a>
            <Link href="/free-audit">
              <Button size="sm" className="bg-blue-500 hover:bg-blue-400 text-white font-semibold px-4 shadow-lg shadow-blue-500/30">
                <Phone className="w-3.5 h-3.5 mr-1.5" />
                Free Audit
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-slate-700">
            <nav className="flex flex-col gap-1">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 py-2">Services</p>
              {services.slice(0, 4).map(s => (
                <Link key={s.href} href={s.href} onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-800 rounded-md">
                  {s.label}
                </Link>
              ))}
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 py-2 mt-2">Locations</p>
              {locations.slice(0, 4).map(s => (
                <Link key={s.href} href={s.href} onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-800 rounded-md">
                  {s.label}
                </Link>
              ))}
              <div className="pt-3 border-t border-slate-700 mt-2 flex flex-col gap-2">
                <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 text-sm text-slate-300 hover:text-white">About</Link>
                <Link href="/blog" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 text-sm text-slate-300 hover:text-white">Blog</Link>
                <a href="tel:8053077600" className="px-3 py-2 text-sm font-medium text-blue-400">(805) 307-7600</a>
                <Link href="/free-audit" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full bg-blue-500 hover:bg-blue-400 text-white">
                    <Phone className="w-4 h-4 mr-2" />
                    Get Free SEO Audit
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
