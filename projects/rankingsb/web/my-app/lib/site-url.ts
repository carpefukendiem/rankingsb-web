/** Primary site origin — always use www for canonicals, sitemaps, and schema. */
export const SITE_URL = "https://www.rankingsb.com"

/** Build an absolute URL on the primary www host. */
export function siteUrl(path = ""): string {
  if (!path || path === "/") return SITE_URL
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`
}
