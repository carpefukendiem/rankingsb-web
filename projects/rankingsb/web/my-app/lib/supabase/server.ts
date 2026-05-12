import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export async function createServerSupabase() {
  const cookieStore = await cookies()

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !anon) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are required.")
  }

  type CookieOpts = Parameters<typeof cookieStore.set>[2]

  return createServerClient(url, anon, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(nextCookies: { name: string; value: string; options?: CookieOpts }[]) {
        try {
          nextCookies.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options)
          })
        } catch {
          /* set from Server Components can noop */
        }
      },
    },
  })
}
