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
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold">Rankingsb</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/services" className="text-sm font-medium hover:text-primary transition-colors">
              Services
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
            <Button variant="ghost" size="sm">
              (805) 555-0123
            </Button>
            <Button size="sm">
              <Phone className="w-4 h-4 mr-2" />
              Free Audit
            </Button>
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
              <Link href="/services" className="text-sm font-medium">
                Services
              </Link>
              <Link href="/about" className="text-sm font-medium">
                About
              </Link>
              <Link href="/case-studies" className="text-sm font-medium">
                Case Studies
              </Link>
              <Link href="/blog" className="text-sm font-medium">
                Blog
              </Link>
              <Button className="w-full mt-2">
                <Phone className="w-4 h-4 mr-2" />
                Free Audit
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
