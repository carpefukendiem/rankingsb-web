import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-bold mb-4">Rankingsb</h3>
            <p className="text-muted-foreground mb-4">
              Santa Barbara's premier SEO and digital marketing agency. 
              We help local businesses rank higher and get more customers.
            </p>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Rankingsb. All rights reserved.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/services/seo" className="hover:text-primary">SEO</Link></li>
              <li><Link href="/services/local-seo" className="hover:text-primary">Local SEO</Link></li>
              <li><Link href="/services/ppc" className="hover:text-primary">Google Ads</Link></li>
              <li><Link href="/services/web-design" className="hover:text-primary">Web Design</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>(805) 555-0123</li>
              <li>hello@rankingsb.com</li>
              <li>Santa Barbara, CA</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
