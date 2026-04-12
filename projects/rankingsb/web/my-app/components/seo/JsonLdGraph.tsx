import type { SeoGraphSchema } from "@/lib/seo-graph"

export function JsonLdGraph({ data }: { data: SeoGraphSchema }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
