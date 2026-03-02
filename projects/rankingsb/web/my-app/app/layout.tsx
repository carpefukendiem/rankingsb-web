import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Rankingsb | Local SEO Agency Santa Barbara & Ventura County",
    template: "%s | Rankingsb",
  },
  description: "Santa Barbara and Ventura County's premier local SEO agency. We help local businesses rank higher on Google and get more customers. 90-day ranking guarantee.",
  keywords: ["SEO Santa Barbara", "local SEO", "digital marketing Santa Barbara", "SEO agency Ventura County", "Google ranking Santa Barbara"],
  authors: [{ name: "Rankingsb" }],
  metadataBase: new URL("https://rankingsb.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rankingsb.com",
    siteName: "Rankingsb",
    title: "Rankingsb | Local SEO Agency Santa Barbara & Ventura County",
    description: "Santa Barbara and Ventura County's premier local SEO agency. 90-day ranking guarantee.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rankingsb | Local SEO Agency Santa Barbara & Ventura County",
    description: "Get your local business to page 1 in 90 days. Free SEO audit.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  alternates: {
    canonical: "https://rankingsb.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            {/* LocalBusiness Schema for Rankingsb */}
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "LocalBusiness",
                  "@id": "https://rankingsb.com",
                  "name": "Rankingsb",
                  "description": "Santa Barbara and Ventura County's premier local SEO and digital marketing agency.",
                  "url": "https://rankingsb.com",
                  "telephone": "+18053077600",
                  "email": "hello@rankingsb.com",
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "10 E. Yanonali Street Suite 150",
                    "addressLocality": "Santa Barbara",
                    "addressRegion": "CA",
                    "postalCode": "93101",
                    "addressCountry": "US"
                  },
                  "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": "34.4208",
                    "longitude": "-119.6982"
                  },
                  "openingHoursSpecification": [
                    {
                      "@type": "OpeningHoursSpecification",
                      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
                      "opens": "09:00",
                      "closes": "18:00"
                    }
                  ],
                  "areaServed": [
                    "Santa Barbara, CA",
                    "Goleta, CA",
                    "Montecito, CA",
                    "Carpinteria, CA",
                    "Ventura, CA",
                    "Oxnard, CA",
                    "Thousand Oaks, CA",
                    "Camarillo, CA",
                    "Simi Valley, CA"
                  ],
                  "serviceType": ["Local SEO", "Google Business Profile Optimization", "Review Management", "PPC Advertising", "Website Design"],
                  "priceRange": "$$",
                  "sameAs": [
                    "https://www.facebook.com/rankingsb",
                    "https://www.linkedin.com/company/rankingsb"
                  ]
                })
              }}
            />
            <Header />
            {children}
            <Footer />
            <Toaster />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
