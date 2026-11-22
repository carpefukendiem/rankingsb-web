import { MetadataRoute } from "next"

export const dynamic = "force-static"

/**
 * Served on rankingsb.com so Google can crawl paths and discover 301s.
 * No Host line, no Disallow. Sitemap points at the new host.
 * (Chose serve-exact over 301-to-sbmc robots, because sbmc robots.txt
 * has Disallow rules that must not apply to rankingsb.com crawl paths.)
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://www.sbmc.io/sitemap.xml",
  }
}
