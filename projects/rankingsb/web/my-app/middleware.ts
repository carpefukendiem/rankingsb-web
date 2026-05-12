import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

/** Neighborhood URLs removed intentionally — return 410 Gone (not soft-redirect). */
const GONE_LOCATION_PATHS = new Set([
  "/locations/eastside-seo",
  "/locations/westside-seo",
  "/locations/upper-state-seo",
  "/locations/lower-state-seo",
  "/locations/san-roque-seo",
  "/locations/riviera-seo",
])

export async function middleware(request: NextRequest) {
  if (GONE_LOCATION_PATHS.has(request.nextUrl.pathname)) {
    return new NextResponse(null, { status: 410, statusText: "Gone" })
  }

  const path = request.nextUrl.pathname

  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const isLogin = path === "/admin/login"
  const isUnauthorized = path === "/admin/unauthorized"

  if (path.startsWith("/admin")) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (url && anon) {
      const supabase = createServerClient(url, anon, {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(cookiesToSet: { name: string; value: string; options?: unknown }[]) {
            cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
            response = NextResponse.next({
              request: {
                headers: request.headers,
              },
            })
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options as Parameters<typeof response.cookies.set>[2])
            )
          },
        },
      })

      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user && !isLogin && !isUnauthorized) {
        const redirectUrl = request.nextUrl.clone()
        redirectUrl.pathname = "/admin/login"
        return NextResponse.redirect(redirectUrl)
      }

      if (user && isLogin) {
        const redirectUrl = request.nextUrl.clone()
        redirectUrl.pathname = "/admin/synclocal"
        return NextResponse.redirect(redirectUrl)
      }
    } else if (!isLogin && !isUnauthorized && path.startsWith("/admin")) {
      const redirectUrl = request.nextUrl.clone()
      redirectUrl.pathname = "/admin/login"
      return NextResponse.redirect(redirectUrl)
    }
  }

  return response
}

export const config = {
  matcher: [
    "/locations/eastside-seo",
    "/locations/westside-seo",
    "/locations/upper-state-seo",
    "/locations/lower-state-seo",
    "/locations/san-roque-seo",
    "/locations/riviera-seo",
    "/admin/:path*",
  ],
}
