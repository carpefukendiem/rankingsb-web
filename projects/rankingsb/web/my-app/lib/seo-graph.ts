import graphSchemas from "@/lib/seo-graph-schemas.json"
import { buildSiteWideJsonLdGraph } from "@/lib/local-business-schema"

export type SeoGraphSchema = {
  "@context": string
  "@graph": unknown[]
}

/** Site-wide ProfessionalService + WebSite graph (also in seo-graph-schemas.json at "/"). */
export function getSiteWideJsonLd(): SeoGraphSchema {
  const fromJson = (graphSchemas as Record<string, SeoGraphSchema>)["/"]
  return fromJson ?? buildSiteWideJsonLdGraph()
}

export function getJsonLdForPath(pathKey: string): SeoGraphSchema | null {
  const g = (graphSchemas as Record<string, SeoGraphSchema>)[pathKey]
  return g ?? null
}
