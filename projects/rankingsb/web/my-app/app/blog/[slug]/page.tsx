import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, Clock, Phone, ArrowRight } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getPostBySlug, getRelatedPosts, getAllPosts } from "@/lib/blog"

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
      type: "article",
    },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const related = getRelatedPosts(slug, 3)
  const allPosts = getAllPosts()
  const currentIndex = allPosts.findIndex(p => p.slug === slug)
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null

  return (
    <main className="min-h-screen bg-white">

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="relative h-[420px] md:h-[520px] overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-slate-900/20" />
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-12">
            <Link href="/blog" className="inline-flex items-center gap-2 text-slate-300 hover:text-white text-sm mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Blog
            </Link>
            <div className="max-w-3xl">
              <Badge className="mb-4 bg-blue-600 text-white hover:bg-blue-600 border-0">
                {post.category}
              </Badge>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-5 text-slate-300 text-sm">
                <span className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold text-white">
                    {post.author[0]}
                  </div>
                  <span>{post.author}</span>
                  {post.authorTitle && <span className="text-slate-400">· {post.authorTitle}</span>}
                </span>
                <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{post.date}</span>
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{post.readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Content ────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-[1fr_340px] gap-12 max-w-6xl mx-auto">

          {/* Article body */}
          <article>
            {/* Lead excerpt */}
            <p className="text-xl text-slate-600 border-l-4 border-blue-500 pl-5 mb-8 leading-relaxed italic">
              {post.excerpt}
            </p>

            {/* Main content */}
            <div
              className="
                prose prose-slate prose-lg max-w-none
                prose-headings:font-bold prose-headings:text-slate-900
                prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:border-b prose-h2:border-slate-100 prose-h2:pb-2
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-blue-800
                prose-p:text-slate-700 prose-p:leading-relaxed
                prose-li:text-slate-700
                prose-strong:text-slate-900
                prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                prose-ul:space-y-1 prose-ol:space-y-1
              "
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags */}
            {post.tags && (
              <div className="mt-10 pt-6 border-t border-slate-100">
                <p className="text-sm font-semibold text-slate-500 mb-3">Tagged:</p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <span key={tag} className="text-sm bg-slate-100 text-slate-600 px-3 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Prev/Next navigation */}
            <div className="mt-10 grid sm:grid-cols-2 gap-4 border-t border-slate-100 pt-8">
              {prevPost && (
                <Link href={`/blog/${prevPost.slug}`} className="group p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all">
                  <p className="text-xs text-slate-400 mb-1 flex items-center gap-1"><ArrowLeft className="w-3 h-3" /> Previous</p>
                  <p className="text-sm font-semibold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {prevPost.title}
                  </p>
                </Link>
              )}
              {nextPost && (
                <Link href={`/blog/${nextPost.slug}`} className="group p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all sm:text-right ml-auto w-full">
                  <p className="text-xs text-slate-400 mb-1 flex items-center gap-1 sm:justify-end">Next <ArrowRight className="w-3 h-3" /></p>
                  <p className="text-sm font-semibold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {nextPost.title}
                  </p>
                </Link>
              )}
            </div>
          </article>

          {/* ── Sidebar ──────────────────────────────────────────── */}
          <aside className="space-y-6">
            <div className="sticky top-24 space-y-6">

              {/* CTA */}
              <div className="bg-gradient-to-br from-slate-900 to-blue-900 rounded-2xl p-6 text-white shadow-xl">
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4">
                  <Phone className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-lg font-bold mb-2">Ready to Rank Higher?</h3>
                <p className="text-slate-300 text-sm mb-5">
                  Get a free SEO audit for your Santa Barbara or Ventura County business — no commitment, just clarity.
                </p>
                <Link href="/free-audit">
                  <Button className="w-full bg-blue-500 hover:bg-blue-400 text-white mb-3">
                    Get Free SEO Audit
                  </Button>
                </Link>
                <a href="tel:8053077600">
                  <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                    Call (805) 307-7600
                  </Button>
                </a>
              </div>

              {/* Author card */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-lg font-bold text-white shrink-0">
                    {post.author[0]}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">{post.author}</p>
                    {post.authorTitle && <p className="text-xs text-slate-500">{post.authorTitle}</p>}
                  </div>
                </div>
                <p className="text-xs text-slate-600">
                  Local SEO specialist serving Santa Barbara and Ventura County businesses. Helping local companies rank higher and grow faster since 2019.
                </p>
              </div>

              {/* Related posts */}
              {related.length > 0 && (
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                  <h3 className="font-bold text-slate-900 text-sm mb-4">Related Articles</h3>
                  <div className="space-y-4">
                    {related.map(rp => (
                      <Link key={rp.slug} href={`/blog/${rp.slug}`} className="group flex gap-3">
                        <img src={rp.image} alt={rp.title} className="w-14 h-14 object-cover rounded-lg shrink-0" />
                        <div>
                          <p className="text-xs text-blue-600 mb-0.5">{rp.category}</p>
                          <p className="text-sm font-medium text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                            {rp.title}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>

      {/* ── Bottom CTA ─────────────────────────────────────────── */}
      <section className="bg-slate-900 py-16 mt-8">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Want Results Like This for Your Business?
          </h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">
            Let&apos;s build your local search presence the right way. Free audit, no pressure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/free-audit">
              <Button size="lg" className="bg-blue-500 hover:bg-blue-400 text-white px-8">
                Get Your Free SEO Audit
              </Button>
            </Link>
            <Link href="/blog">
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 px-8">
                Read More Articles
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}
