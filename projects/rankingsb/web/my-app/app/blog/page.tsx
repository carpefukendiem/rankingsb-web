import { Metadata } from "next"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, Clock, Tag } from "lucide-react"
import Link from "next/link"
import { getAllPosts, getAllCategories } from "@/lib/blog"

export const metadata: Metadata = {
  title: "Local SEO Blog | Santa Barbara & Ventura County Marketing Tips | Rankingsb",
  description: "Expert local SEO tips, strategies, and insights for Santa Barbara and Ventura County businesses. Learn how to rank higher on Google and get more customers.",
  keywords: ["local SEO blog", "Santa Barbara SEO tips", "Ventura County marketing", "Google ranking tips"],
}

export default function BlogPage() {
  const posts = getAllPosts()
  const categories = getAllCategories()
  const [featured, ...rest] = posts

  return (
    <main className="min-h-screen bg-slate-50">

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="bg-slate-900 pt-16 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{background: "radial-gradient(ellipse at 60% 50%, #3b82f6 0%, transparent 70%)"}} />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-2xl">
            <Badge className="mb-4 bg-blue-500/20 text-blue-300 border-blue-500/30 hover:bg-blue-500/20">
              The Rankingsb Blog
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Local SEO Insights for<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Santa Barbara &amp; Ventura County
              </span>
            </h1>
            <p className="text-slate-400 text-lg">
              Practical guides, tactics, and strategies to help 805 businesses rank higher and grow faster.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">

        {/* ── Featured Post ─────────────────────────────────────── */}
        {featured && (
          <div className="mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-4">Featured Article</p>
            <Link href={`/blog/${featured.slug}`} className="group block">
              <div className="grid md:grid-cols-2 gap-0 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow bg-white">
                <div className="relative h-64 md:h-auto overflow-hidden">
                  <img
                    src={featured.image}
                    alt={featured.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent md:bg-gradient-to-r" />
                  <span className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {featured.category}
                  </span>
                </div>
                <div className="p-8 md:p-10 flex flex-col justify-center">
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors leading-tight">
                    {featured.title}
                  </h2>
                  <p className="text-slate-600 mb-6 leading-relaxed">{featured.excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-slate-500 mb-6">
                    <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{featured.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{featured.readTime}</span>
                  </div>
                  <div className="flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-3 transition-all">
                    Read the full guide <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-12">

          {/* ── Post Grid ──────────────────────────────────────── */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold text-slate-900 mb-6">All Articles</h2>
            <div className="space-y-6">
              {rest.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                  <article className="flex gap-5 bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-slate-100 p-0">
                    <div className="w-36 shrink-0 overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 min-h-[130px]"
                      />
                    </div>
                    <div className="py-4 pr-4 flex flex-col justify-center">
                      <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-1">
                        {post.category}
                      </span>
                      <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-1 leading-snug line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-sm text-slate-500 line-clamp-2 mb-2">{post.excerpt}</p>
                      <div className="flex items-center gap-3 text-xs text-slate-400">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{post.date}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>

          {/* ── Sidebar ────────────────────────────────────────── */}
          <aside className="space-y-8">

            {/* Categories */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Tag className="w-4 h-4 text-blue-600" /> Categories
              </h3>
              <div className="space-y-2">
                {categories.map(cat => {
                  const count = posts.filter(p => p.category === cat).length
                  return (
                    <div key={cat} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                      <span className="text-sm text-slate-700">{cat}</span>
                      <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">{count}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Free Audit CTA */}
            <div className="bg-gradient-to-br from-slate-900 to-blue-900 rounded-xl p-6 text-white">
              <h3 className="font-bold text-lg mb-2">Is Your Business Invisible on Google?</h3>
              <p className="text-slate-300 text-sm mb-4">
                Get a free SEO audit showing exactly where you rank and what it'll take to reach page 1.
              </p>
              <Link href="/free-audit">
                <Button className="w-full bg-blue-500 hover:bg-blue-400 text-white">
                  Get Free SEO Audit
                </Button>
              </Link>
            </div>

            {/* Recent Posts */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
              <h3 className="font-bold text-slate-900 mb-4">Recent Posts</h3>
              <div className="space-y-4">
                {posts.slice(0, 4).map(post => (
                  <Link key={post.slug} href={`/blog/${post.slug}`} className="group flex gap-3">
                    <img src={post.image} alt={post.title} className="w-14 h-14 object-cover rounded-lg shrink-0" />
                    <div>
                      <p className="text-xs text-blue-600 font-medium mb-0.5">{post.category}</p>
                      <p className="text-sm font-medium text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                        {post.title}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

          </aside>
        </div>
      </div>
    </main>
  )
}
