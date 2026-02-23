import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <img 
                src="/logo.webp" 
                alt="Rankingsb Local SEO Agency" 
                className="h-16 w-16 rounded-full object-cover border-2 border-blue-100 shadow-sm"
                style={{ aspectRatio: '1/1' }}
              />
            </div>
            <p className="text-muted-foreground mb-4">
              Santa Barbara's premier SEO and digital marketing agency. 
              We help local businesses rank higher and get more customers.
            </p>
            <p className="text-sm font-medium text-slate-900">
              10 E. Yanonali Street Suite 150<br />
              Santa Barbara, CA 93101
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              © {new Date().getFullYear()} Rankingsb. All rights reserved.
            </p>
          </div>

          {/* Industries */}
          <div>
            <h4 className="font-semibold mb-4">Industries</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/industries/electrician-seo" className="hover:text-primary">Electrician SEO</Link></li>
              <li><Link href="/industries/hvac-seo" className="hover:text-primary">HVAC SEO</Link></li>
              <li><Link href="/industries/plumber-seo" className="hover:text-primary">Plumber SEO</Link></li>
              <li><Link href="/industries/roofing-seo" className="hover:text-primary">Roofing SEO</Link></li>
              <li><Link href="/industries/solar-seo" className="hover:text-primary">Solar SEO</Link></li>
              <li><Link href="/industries/attorney-seo" className="hover:text-primary">Attorney SEO</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="tel:8053077600" className="hover:text-primary">(805) 307-7600</a></li>
              <li><a href="mailto:hello@rankingsb.com" className="hover:text-primary">hello@rankingsb.com</a></li>
              <li><Link href="/free-audit" className="text-blue-600 hover:text-blue-700 font-medium">Get Free Audit →</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
