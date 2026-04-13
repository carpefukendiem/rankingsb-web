import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

/** Neighborhood URLs removed intentionally — return 410 Gone (not soft-redirect). */
const GONE_LOCATION_PATHS = new Set([
  "/locations/eastside-seo",
  "/locations/westside-seo",
  "/locations/upper-state-seo",
  "/locations/lower-state-seo",
  "/locations/san-roque-seo",
  "/locations/riviera-seo",
])

export function middleware(request: NextRequest) {
  if (GONE_LOCATION_PATHS.has(request.nextUrl.pathname)) {
    return new NextResponse(null, { status: 410, statusText: "Gone" })
  }
  return NextResponse.next()
}

export const config = {
  matcher: [
    "/locations/eastside-seo",
    "/locations/westside-seo",
    "/locations/upper-state-seo",
    "/locations/lower-state-seo",
    "/locations/san-roque-seo",
    "/locations/riviera-seo",
  ],
}
