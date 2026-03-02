import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Calendar, User, Phone, Clock } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Local SEO Blog | Santa Barbara & Ventura County Marketing Tips | Rankingsb",
  description: "Expert local SEO tips, strategies, and insights for Santa Barbara and Ventura County businesses. Learn how to rank higher on Google and get more customers.",
  keywords: ["local SEO blog", "Santa Barbara SEO tips", "Ventura County marketing", "Google ranking tips"],
}

const blogPosts = [
  {
    title: "The Complete Local SEO Guide for Santa Barbara Businesses in 2026",
    excerpt: "Everything Santa Barbara businesses need to know about local SEO — from Google Business Profile to link building in the 805.",
    category: "Local SEO",
    date: "Mar 1, 2026",
    readTime: "12 min",
    author: "Rankingsb Team",
    href: "/blog/santa-barbara-seo-guide",
    image: "https://images.unsplash.com/photo-1619468129361-605ebea04b44?w=600&h=400&fit=crop",
    featured: true,
  },
  {
    title: "Local SEO for Ventura County Businesses: The 2026 Guide",
    excerpt: "How Ventura, Oxnard, Thousand Oaks, and Camarillo businesses can dominate local search and get more customers.",
    category: "Local SEO",
    date: "Feb 28, 2026",
    readTime: "10 min",
    author: "Rankingsb Team",
    href: "/blog/ventura-county-seo-guide",
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=400&fit=crop",
    featured: true,
  },
  {
    title: "The Complete Guide to Google Business Profile for Santa Barbara Businesses",
    excerpt: "Your Google Business Profile is the #1 factor in local rankings. Learn how to optimize it step-by-step.",
    category: "Local SEO",
    date: "Feb 15, 2026",
    readTime: "8 min",
    author: "Rankingsb Team",
    href: "/blog/google-business-profile-guide",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&h=400&fit=crop",
  },
  {
    title: "Why Your Santa Barbara Business Isn't Showing Up on Google Maps",
    excerpt: "The 5 most common reasons local businesses fail to rank in the Local Pack — and how to fix them.",
    category: "Local SEO",
    date: "Feb 12, 2026",
    readTime: "6 min",
    author: "Rankingsb Team",
    href: "/blog/google-maps-ranking",
    image: "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=600&h=400&fit=crop"
  },
  {
    title: "How to Get More 5-Star Reviews (Without Begging)",
    excerpt: "A systematic approach to review generation that actually works. Templates and scripts included.",
    category: "Reputation",
    date: "Feb 8, 2026",
    readTime: "7 min",
    author: "Rankingsb Team",
    href: "/blog/get-more-reviews",
    image: "https://images.unsplash.com/photo-1560472355-536de3962603?w=600&h=400&fit=crop"
  },
  {
    title: "Electrician SEO: How to Rank #1 in Santa Barbara and Ventura County",
    excerpt: "Specific local SEO strategies for electrical contractors to dominate Google search and get more service calls.",
    category: "Industry",
    date: "Feb 5, 2026",
    readTime: "8 min",
    author: "Rankingsb Team",
    href: "/blog/electrician-seo-guide",
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&h=400&fit=crop"
  },
  {
    title: "SEO vs. Google Ads: Which Is Right for Your Santa Barbara Business?",
    excerpt: "A data-driven comparison of long-term SEO vs. paid ads — with real cost estimates for the Santa Barbara market.",
    category: "Strategy",
    date: "Feb 1, 2026",
    readTime: "9 min",
    author: "Rankingsb Team",
    href: "/blog/seo-vs-google-ads",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop"
  },
  {
    title: "HVAC SEO: Preparing for Seasonal Demand Surges in Santa Barbara",
    excerpt: "How to optimize your HVAC company's online presence before peak season so your phone rings when it matters most.",
    category: "Industry",
    date: "Jan 28, 2026",
    readTime: "7 min",
    author: "Rankingsb Team",
    href: "/blog/hvac-seasonal-seo",
    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&h=400&fit=crop"
  },
  {
    title: "10 Local Citation Sites Every Santa Barbara Business Needs",
    excerpt: "The essential business directories that boost your local rankings. Plus: submission checklist.",
    category: "Local SEO",
    date: "Jan 25, 2026",
    readTime: "5 min",
    author: "Rankingsb Team",
    href: "/blog/local-citation-sites",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop"
  },
]

const categories = ["All", "Local SEO", "Reputation", "Industry", "Strategy"]

export default function BlogPage() {
  const featured = blogPosts.filter(p => p.featured)
  const regular = blogPosts.filter(p => !p.featured)

  return (
    <main className="min-h-screen">
      <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">SEO Insights</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Local SEO Tips for<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                805 Businesses
              </span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Actionable local SEO strategies, guides, and insights specifically for businesses in
              Santa Barbara and Ventura County.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featured.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold mb-8">Latest Guides</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {featured.map((post, i) => (
                  <Link key={i} href={post.href}>
                    <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden h-full group">
                      <div className="h-56 overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <Badge variant="secondary" className="text-xs">{post.category}</Badge>
                          <span className="text-xs text-slate-500 flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                        </div>
                        <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors leading-snug">{post.title}</h3>
                        <p className="text-slate-600 text-sm mb-4">{post.excerpt}</p>
                        <div className="flex items-center justify-between text-xs text-slate-500">
                          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{post.date}</span>
                          <span className="text-blue-600 font-medium flex items-center gap-1">Read Guide <ArrowRight className="w-3 h-3" /></span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* All Posts */}
      <section className="py-8 pb-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-8">All Articles</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regular.map((post, i) => (
                <Link key={i} href={post.href}>
                  <Card className="border-0 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden h-full group">
                    <div className="h-40 overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="secondary" className="text-xs">{post.category}</Badge>
                        <span className="text-xs text-slate-500">{post.readTime ?? '6 min'}</span>
                      </div>
                      <h3 className="font-bold mb-2 group-hover:text-blue-600 transition-colors leading-snug">{post.title}</h3>
                      <p className="text-slate-600 text-xs mb-3 line-clamp-2">{post.excerpt}</p>
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span>{post.date}</span>
                        <span className="text-blue-600 font-medium">Read →</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Want Personalized SEO Advice?</h2>
          <p className="text-blue-100 mb-6 max-w-xl mx-auto">These guides are general. A free audit gives you a specific plan for your business in Santa Barbara or Ventura County.</p>
          <Link href="/free-audit">
            <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50">
              <Phone className="w-5 h-5 mr-2" />
              Get Free SEO Audit
            </Button>
          </Link>
        </div>
      </section>
    </main>
  )
}
