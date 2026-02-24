"use client"

import { Button } from "@/components/ui/button"
import { Phone, Menu, X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo - Larger with padding for visibility */}
          <Link href="/" className="flex items-center py-3">
            <img 
              src="/logo-new.webp" 
              alt="Rankingsb Local SEO Agency Santa Barbara"
              className="object-contain"
              style={{ height: '80px', width: 'auto', maxWidth: '200px' }}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/services" className="text-sm font-medium hover:text-primary transition-colors">
              Services
            </Link>
            <Link href="/industries" className="text-sm font-medium hover:text-primary transition-colors">
              Industries
            </Link>
            <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
              About
            </Link>
            <Link href="/case-studies" className="text-sm font-medium hover:text-primary transition-colors">
              Case Studies
            </Link>
            <Link href="/blog" className="text-sm font-medium hover:text-primary transition-colors">
              Blog
            </Link>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" size="sm" className="text-slate-700">
              (805) 307-7600
            </Button>
            <Link href="/free-audit">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                <Phone className="w-4 h-4 mr-2" />
                Free Audit
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col gap-4">
              <Link href="/" className="text-sm font-medium">Home</Link>
              <Link href="/free-audit" className="text-sm font-medium text-blue-600">Free Audit</Link>
              <Link href="/industries/electrician-seo" className="text-sm font-medium">Electrician SEO</Link>
              <Link href="/industries/hvac-seo" className="text-sm font-medium">HVAC SEO</Link>
              <Link href="/industries/plumber-seo" className="text-sm font-medium">Plumber SEO</Link>
              <Link href="/industries/roofing-seo" className="text-sm font-medium">Roofing SEO</Link>
              <Link href="/industries/solar-seo" className="text-sm font-medium">Solar SEO</Link>
              <Link href="/industries/attorney-seo" className="text-sm font-medium">Attorney SEO</Link>
              <Button className="w-full mt-2 bg-blue-600 text-white">
                <Phone className="w-4 h-4 mr-2" />
                (805) 307-7600
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
