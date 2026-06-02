import type { Metadata } from "next"
import { siteUrl } from "@/lib/site-url"

/** Self-referential canonical + matching openGraph.url for a path (e.g. `/contact`). */
export function pageCanonicalMetadata(path: string): Pick<Metadata, "alternates" | "openGraph"> {
  const canonical = siteUrl(path)
  return {
    alternates: { canonical },
    openGraph: { url: canonical },
  }
}
