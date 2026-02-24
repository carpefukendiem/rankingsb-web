import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Calendar, User, Phone } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Blog | Rankingsb Santa Barbara",
  description: "Local SEO tips, strategies, and insights for Santa Barbara businesses. Learn how to rank higher on Google.",
}

const blogPosts = [
  {
    title: "Why Your Santa Barbara Business Isn't Showing Up on Google Maps",
    excerpt: "The 5 most common reasons local businesses fail to rank in the Local Pack — and how to fix them.",
    category: "Local SEO",
    date: "Feb 12, 2026",
    author: "Ranking SB",
    href: "/blog/google-maps-ranking",
    image: "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=600&h=400&fit=crop"
  },
  {
    title: "How to Get More 5-Star Reviews (Without Begging)",
    excerpt: "A systematic approach to review generation that actually works. Templates and scripts included.",
    category: "Reputation",
    date: "Feb 8, 2026",
    author: "Ranking SB",
    href: "/blog/get-more-reviews",
    image: "https://images.unsplash.com/photo-1560472355-536de3962603?w=600&h=400&fit=crop"
  },
  {
    title: "Electrician SEO: How to Rank #1 in Your Service Area",
    excerpt: "Specific strategies for electrical contractors to dominate local search and get more calls.",
    category: "Industry",
    date: "Feb 5, 2026",
    author: "Ranking SB",
    href: "/blog/electrician-seo-guide",
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&h=400&fit=crop"
  },
  {
    title: "The Real Cost of SEO vs. Google Ads for Local Businesses",
    excerpt: "Which delivers better ROI? A data-driven comparison with real numbers from Santa Barbara businesses.",
    category: "Strategy",
    date: "Feb 1, 2026",
    author: "Ranking SB",
    href: "/blog/seo-vs-google-ads",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop"
  },
  {
    title: "HVAC SEO: Preparing for Seasonal Demand Surges",
    excerpt: "How to optimize your online presence before peak season hits so you're ready when customers search.",
    category: "Industry",
    date: "Jan 28, 2026",
    author: "Ranking SB",
    href: "/blog/hvac-seasonal-seo",
    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&h=400&fit=crop"
  },
  {
    title: "10 Local Citation Sites Every Santa Barbara Business Needs",
    excerpt: "The essential business directories that boost your local rankings. Plus: submission checklist.",
    category: "Local SEO",
    date: "Jan 25, 2026",
    author: "Ranking SB",
    href: "/blog/local-citation-sites",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop"
  }
]

export default function BlogPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative py-20 lg:py-28 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-white/10 text-white border-white/20">Blog</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Local SEO Insights
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Tips, strategies, and case studies to help your Santa Barbara 
              business rank higher on Google.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link href="/blog/google-business-profile-guide">
              <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 group">
                <div className="grid md:grid-cols-2">
                  <div className="h-64 md:h-auto overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=600&fit=crop"
                      alt="Google Business Profile optimization guide"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <CardContent className="p-8">
                    <Badge className="mb-4">Featured</Badge>
                    <h2 className="text-2xl font-bold mb-4 group-hover:text-blue-600 transition-colors">
                      The Complete Guide to Google Business Profile for Santa Barbara Businesses
                    </h2>
                    <p className="text-slate-600 mb-4">
                      Your Google Business Profile is the #1 factor in local rankings. 
                      Learn how to optimize it step-by-step to dominate the Local Pack.
                    </p>
                    <div className="flex items-center gap-4 text-sm text-slate-500 mb-6">
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        Feb 15, 2026
                      </span>
                      <span className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        Ranking SB
                      </span>
                    </div>
                    <Button variant="outline">
                      Read More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </div>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {blogPosts.map((post, i) => (
              <Link key={i} href={post.href} className="group">
                <Card className="h-full hover:shadow-2xl transition-all duration-300 overflow-hidden">
                  {/* Image */}
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <CardContent className="p-6">
                    <Badge variant="secondary" className="mb-3">{post.category}</Badge>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors">{post.title}</h3>
                    <p className="text-slate-600 mb-4 text-sm">{post.excerpt}</p>
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {post.date}
                      </span>
                      <span className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        {post.author}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Browse by Category</h2>
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {["Local SEO", "Google Business Profile", "Reputation Management", "Content Strategy", "Industry Guides", "Case Studies"].map((cat, i) => (
              <Badge key={i} variant="outline" className="text-lg px-4 py-2 cursor-pointer hover:bg-slate-100 transition-colors">
                {cat}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Want Results Like These?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Get a free audit showing exactly how to rank higher in Santa Barbara.
          </p>
          <Link href="/free-audit">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-100">
              <Phone className="w-5 h-5 mr-2" />
              Get Free Audit
            </Button>
          </Link>
        </div>
      </section>
    </main>
  )
}
