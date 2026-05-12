import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import type { SupabaseClient, User } from "@supabase/supabase-js"

export type SynclocalRequestAuth = {
  supabase: SupabaseClient
  user: User
  agencyIds: string[]
}

export async function resolveSynclocalRequestAuth(): Promise<SynclocalRequestAuth | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !anon) return null

  const cookieStore = await cookies()
  type CookieOpts = Parameters<typeof cookieStore.set>[2]

  const supabase = createServerClient(url, anon, {
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
          /* may not be writable outside route handler */
        }
      },
    },
  })

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return null

  const { data: memberships } = await supabase.from("agency_members").select("agency_id").eq("user_id", user.id)

  const rows = memberships ?? []
  if (!rows.length) return null
  const agencyIds = [...new Set(rows.map((r) => r.agency_id as string))]
  return { supabase, user, agencyIds }
}

export function synclocalJsonError(message: string, status = 400) {
  return NextResponse.json({ success: false, error: message }, { status })
}
