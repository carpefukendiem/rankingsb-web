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
    default: "Rankingsb | SEO & Digital Marketing Agency Santa Barbara",
    template: "%s | Rankingsb",
  },
  description: "Santa Barbara's premier SEO and digital marketing agency. We help local businesses rank higher on Google and attract more customers.",
  keywords: ["SEO", "digital marketing", "Santa Barbara", "local SEO", "Google ranking"],
  authors: [{ name: "Rankingsb" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rankingsb.com",
    siteName: "Rankingsb",
    title: "Rankingsb | SEO & Digital Marketing Agency",
    description: "Santa Barbara's premier SEO and digital marketing agency",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rankingsb | SEO & Digital Marketing Agency",
    description: "Santa Barbara's premier SEO and digital marketing agency",
  },
  robots: {
    index: true,
    follow: true,
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
