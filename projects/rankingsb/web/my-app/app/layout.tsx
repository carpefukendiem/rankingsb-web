import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { buildSiteWideJsonLdGraph } from "@/lib/local-business-schema";
import { SITE_URL } from "@/lib/site-url";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Ranking SB | Local SEO Agency Santa Barbara & Ventura County",
    template: "%s | Ranking SB — The 805 Growth Engine",
  },
  description:
    "The 805 Growth Engine: custom websites, local SEO, and The Ranking App for Santa Barbara & Ventura County businesses. 90-day delivery and leads guarantees.",
  keywords: ["SEO Santa Barbara", "local SEO", "digital marketing Santa Barbara", "SEO agency Ventura County", "Google ranking Santa Barbara"],
  authors: [{ name: "Ranking SB" }],
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Ranking SB",
    title: "Ranking SB | The 805 Growth Engine | Santa Barbara & Ventura County",
    description:
      "Custom websites, local SEO, and The Ranking App — built and running in 90 days for 805 businesses.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ranking SB | The 805 Growth Engine",
    description:
      "Website, SEO, and automation for 805 businesses. Claim your free Growth Audit.",
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
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.png", sizes: "157x157", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.png",
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
            <SiteChrome
              ldJsonExtra={
                <script
                  type="application/ld+json"
                  dangerouslySetInnerHTML={{
                    __html: JSON.stringify(buildSiteWideJsonLdGraph()),
                  }}
                />
              }
            >
              {children}
              <Toaster />
            </SiteChrome>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
