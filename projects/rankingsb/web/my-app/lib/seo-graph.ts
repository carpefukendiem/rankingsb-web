import graphSchemas from "@/lib/seo-graph-schemas.json"

export type SeoGraphSchema = {
  "@context": string
  "@graph": unknown[]
}

export function getJsonLdForPath(pathKey: string): SeoGraphSchema | null {
  const g = (graphSchemas as Record<string, SeoGraphSchema>)[pathKey]
  return g ?? null
}
