import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, User, Phone, Clock } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { legacyBlogPosts } from "./legacy-blog-posts"
import { getSeoBlogSlugs, loadSeoBlogPost } from "@/lib/load-seo-markdown"
import { getJsonLdForPath } from "@/lib/seo-graph"
import { ArticleMarkdown } from "@/components/seo/ArticleMarkdown"
import { JsonLdGraph } from "@/components/seo/JsonLdGraph"
import { blogSeoTags, pickRelatedSeoSlugs } from "@/lib/blog-seo-tags"
import BlogCTA from "@/components/BlogCTA"
import {
  blogPostBrowserTitle,
  blogPostMetaDescription,
  truncateMetaTitle,
} from "@/lib/meta-helpers"

const BASE = "https://rankingsb.com"

export async function generateStaticParams() {
  const seo = getSeoBlogSlugs().map((slug) => ({ slug }))
  const legacy = Object.keys(legacyBlogPosts).map((slug) => ({ slug }))
  return [...legacy, ...seo]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const legacy = legacyBlogPosts[slug]
  if (legacy) {
    const canonical = `${BASE}/blog/${slug}`
    return {
      title: { absolute: blogPostBrowserTitle(legacy.title) },
      description: blogPostMetaDescription(legacy.excerpt),
      alternates: { canonical },
      robots: { index: true, follow: true },
      openGraph: {
        title: blogPostBrowserTitle(legacy.title),
        description: blogPostMetaDescription(legacy.excerpt),
        images: [{ url: legacy.image }],
        type: "article",
        url: canonical,
      },
    }
  }
  const md = loadSeoBlogPost(slug)
  if (!md) return { title: "Blog Post Not Found | Ranking SB" }
  const { frontmatter } = md
  const canonical = `${BASE}/blog/${slug}`
  const titleAbs = truncateMetaTitle(frontmatter.titleTag, 70)
  const desc = blogPostMetaDescription(frontmatter.metaDescription)
  return {
    title: { absolute: titleAbs },
    description: desc,
    alternates: { canonical },
    robots: { index: true, follow: true },
    openGraph: {
      title: titleAbs,
      description: desc,
      images: [{ url: frontmatter.image }],
      type: "article",
      url: canonical,
    },
  }
}

function resolveRelatedCard(slug: string) {
  const leg = legacyBlogPosts[slug]
  if (leg) {
    return {
      slug,
      title: leg.title,
      category: leg.category,
      image: leg.image,
    }
  }
  const md = loadSeoBlogPost(slug)
  if (!md) return null
  return {
    slug,
    title: md.frontmatter.h1,
    category: md.frontmatter.category,
    image: md.frontmatter.image,
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  if (legacyBlogPosts[slug]) {
    const post = legacyBlogPosts[slug]
    const relatedData = post.relatedPosts
      .map((s) => {
        const leg = legacyBlogPosts[s]
        return leg ? { slug: s, ...leg } : null
      })
      .filter(Boolean) as Array<{ slug: string } & (typeof legacyBlogPosts)[string]>

    return (
      <main className="min-h-screen">
        <section className="relative py-20 lg:py-28 overflow-hidden">
          <div className="absolute inset-0">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-blue-900/90 to-slate-900/95" />
          </div>
          <div className="container relative mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Link href="/blog" className="inline-flex items-center text-white/80 hover:text-white mb-6 text-sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Link>
              <Badge className="mb-4 bg-white/20 text-white border-white/30">{post.category}</Badge>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-white/80 text-sm">
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {post.date}
                </span>
                <span className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {post.author}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {post.readTime}
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <BlogCTA variant="top" />
              {post.content}
              <BlogCTA variant="bottom" />
            </div>
          </div>
        </section>

        {relatedData.length > 0 && (
          <section className="py-16 bg-slate-50">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {relatedData.map((related) => (
                    <Link key={related.slug} href={`/blog/${related.slug}`}>
                      <Card className="border-0 shadow-md hover:shadow-xl transition-shadow h-full">
                        <div className="h-40 overflow-hidden rounded-t-lg">
                          <img
                            src={related.image}
                            alt={related.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <CardContent className="p-4">
                          <Badge variant="secondary" className="mb-2 text-xs">
                            {related.category}
                          </Badge>
                          <h3 className="font-bold text-sm leading-snug">{related.title}</h3>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        <section className="py-16 bg-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Dominate Local Search?</h2>
            <p className="text-blue-100 mb-6 max-w-xl mx-auto">
              Get a free SEO audit and personalized strategy for your Santa Barbara or Ventura County
              business.
            </p>
            <Link href="/free-audit">
              <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50">
                <Phone className="w-5 h-5 mr-2" />
                Get Free Audit
              </Button>
            </Link>
          </div>
        </section>
      </main>
    )
  }

  const md = loadSeoBlogPost(slug)
  if (!md) notFound()

  const { frontmatter, body } = md
  const schema = getJsonLdForPath(`/blog/${slug}`)
  const tags = blogSeoTags[slug] ?? []
  const relatedSlugs = pickRelatedSeoSlugs(slug)
  const relatedData = relatedSlugs.map(resolveRelatedCard).filter(Boolean) as Array<{
    slug: string
    title: string
    category: string
    image: string
  }>

  return (
    <main className="min-h-screen">
      {schema ? <JsonLdGraph data={schema} /> : null}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={frontmatter.image}
            alt={frontmatter.h1}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-blue-900/90 to-slate-900/95" />
        </div>
        <div className="container relative mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link href="/blog" className="inline-flex items-center text-white/80 hover:text-white mb-6 text-sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge className="bg-white/20 text-white border-white/30">{frontmatter.category}</Badge>
              {tags.map((t) => (
                <Badge key={t} variant="outline" className="border-white/40 text-white/90 text-xs">
                  {t}
                </Badge>
              ))}
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              {frontmatter.h1}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-white/80 text-sm">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {frontmatter.date}
              </span>
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Ranking SB Team
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {frontmatter.readTime}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <BlogCTA variant="top" />
            <ArticleMarkdown markdown={body} />
            <BlogCTA variant="bottom" />
          </div>
        </div>
      </section>

      {relatedData.length > 0 && (
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedData.map((related) => (
                  <Link key={related.slug} href={`/blog/${related.slug}`}>
                    <Card className="border-0 shadow-md hover:shadow-xl transition-shadow h-full">
                      <div className="h-40 overflow-hidden rounded-t-lg">
                        <img
                          src={related.image}
                          alt={related.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <Badge variant="secondary" className="mb-2 text-xs">
                          {related.category}
                        </Badge>
                        <h3 className="font-bold text-sm leading-snug">{related.title}</h3>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Dominate Local Search?</h2>
          <p className="text-blue-100 mb-6 max-w-xl mx-auto">
            Get a free SEO audit and personalized strategy for your Santa Barbara or Ventura County
            business.
          </p>
          <Link href="/free-audit">
            <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50">
              <Phone className="w-5 h-5 mr-2" />
              Get Free Audit
            </Button>
          </Link>
        </div>
      </section>
    </main>
  )
}
