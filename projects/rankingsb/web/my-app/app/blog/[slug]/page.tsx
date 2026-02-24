import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, User, Phone, ArrowRight, CheckCircle } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

// Blog posts data
const blogPosts: Record<string, {
  title: string
  excerpt: string
  content: string
  category: string
  date: string
  author: string
  image: string
  relatedPosts: string[]
}> = {
  "google-business-profile-guide": {
    title: "The Complete Guide to Google Business Profile for Santa Barbara Businesses",
    excerpt: "Your Google Business Profile is the #1 factor in local rankings. Learn how to optimize it step-by-step to dominate the Local Pack.",
    category: "Local SEO",
    date: "Feb 15, 2026",
    author: "Ranking SB",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&h=600&fit=crop",
    relatedPosts: ["google-maps-ranking", "get-more-reviews", "local-citation-sites"],
    content: "content"
  },
  "google-maps-ranking": {
    title: "Why Your Santa Barbara Business Isn't Showing Up on Google Maps",
    excerpt: "The 5 most common reasons local businesses fail to rank in the Local Pack — and how to fix them.",
    category: "Local SEO",
    date: "Feb 12, 2026",
    author: "Ranking SB",
    image: "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=1200&h=600&fit=crop",
    relatedPosts: ["google-business-profile-guide", "local-citation-sites", "seo-vs-google-ads"],
    content: "content"
  },
  "get-more-reviews": {
    title: "How to Get More 5-Star Reviews (Without Begging)",
    excerpt: "A systematic approach to review generation that actually works. Templates and scripts included.",
    category: "Reputation",
    date: "Feb 8, 2026",
    author: "Ranking SB",
    image: "https://images.unsplash.com/photo-1560472355-536de3962603?w=1200&h=600&fit=crop",
    relatedPosts: ["google-business-profile-guide", "google-maps-ranking"],
    content: "content"
  },
  "electrician-seo-guide": {
    title: "Electrician SEO: How to Rank #1 in Your Service Area",
    excerpt: "Specific strategies for electrical contractors to dominate local search and get more calls.",
    category: "Industry",
    date: "Feb 5, 2026",
    author: "Ranking SB",
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=1200&h=600&fit=crop",
    relatedPosts: ["hvac-seasonal-seo", "google-maps-ranking", "local-citation-sites"],
    content: "content"
  },
  "seo-vs-google-ads": {
    title: "The Real Cost of SEO vs. Google Ads for Local Businesses",
    excerpt: "Which delivers better ROI? A data-driven comparison with real numbers from Santa Barbara businesses.",
    category: "Strategy",
    date: "Feb 1, 2026",
    author: "Ranking SB",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop",
    relatedPosts: ["google-maps-ranking", "local-citation-sites"],
    content: "content"
  },
  "hvac-seasonal-seo": {
    title: "HVAC SEO: Preparing for Seasonal Demand Surges",
    excerpt: "How to optimize your online presence before peak season hits so you're ready when customers search.",
    category: "Industry",
    date: "Jan 28, 2026",
    author: "Ranking SB",
    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=1200&h=600&fit=crop",
    relatedPosts: ["electrician-seo-guide", "google-maps-ranking"],
    content: "content"
  },
  "local-citation-sites": {
    title: "10 Local Citation Sites Every Santa Barbara Business Needs",
    excerpt: "The essential business directories that boost your local rankings. Plus: submission checklist.",
    category: "Local SEO",
    date: "Jan 25, 2026",
    author: "Ranking SB",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop",
    relatedPosts: ["google-business-profile-guide", "google-maps-ranking"],
    content: "content"
  }
}

export async function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = blogPosts[slug]
  
  if (!post) {
    return {
      title: "Blog Post Not Found | Rankingsb"
    }
  }
  
  return {
    title: post.title + " | Rankingsb Blog",
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = blogPosts[slug]
  
  if (!post) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-blue-900/90 to-slate-900/95" />
        </div>
        
        <div className="container relative mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link href="/blog" className="inline-flex items-center text-white/80 hover:text-white mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>
            <Badge className="mb-4 bg-white/20 text-white border-white/30">{post.category}</Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              {post.title}
            </h1>
            <div className="flex items-center gap-6 text-white/80">
              <span className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                {post.date}
              </span>
              <span className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                {post.author}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-8">
              <h3 className="text-lg font-bold text-blue-900 mb-2">Full Article Coming Soon</h3>
              <p className="text-blue-800 mb-4">
                {post.excerpt}
              </p>
              <Link href="/free-audit">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Get Free SEO Audit
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Want to learn more about {post.category}?</h2>
          <p className="text-slate-600 mb-6">Get a free audit and personalized strategy for your business.</p>
          <Link href="/free-audit">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Phone className="w-5 h-5 mr-2" />
              Get Free Audit
            </Button>
          </Link>
        </div>
      </section>
    </main>
  )
}
