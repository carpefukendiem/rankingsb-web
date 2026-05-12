"use client"

import * as React from "react"

import { createBrowserSupabase } from "@/lib/supabase/client"

export function LoginPanel({ configOk }: { configOk: boolean }) {
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [msg, setMsg] = React.useState<string | null>(null)
  const [loading, setLoading] = React.useState(false)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setMsg(null)
    if (!configOk) return
    setLoading(true)
    try {
      const supabase = createBrowserSupabase()
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) {
        setMsg(error.message)
      } else {
        window.location.assign("/admin/synclocal")
      }
    } catch (err) {
      setMsg(err instanceof Error ? err.message : String(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="mx-auto mt-16 max-w-sm space-y-4 rounded-xl border bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950" onSubmit={submit}>
      <div>
        <h1 className="text-xl font-semibold">SyncLocal admin</h1>
        <p className="text-sm text-muted-foreground">Ranking SB internal console — citations & verification.</p>
      </div>
      {!configOk ? (
        <p className="text-sm text-amber-600">
          Missing Supabase public env vars locally. Populate NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in `.env.local` first.
        </p>
      ) : null}
      <label className="grid gap-1 text-sm">
        <span className="font-medium">Email</span>
        <input
          className="rounded border px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label className="grid gap-1 text-sm">
        <span className="font-medium">Password</span>
        <input
          className="rounded border px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      {msg ? <p className="text-sm text-red-600">{msg}</p> : null}
      <button
        disabled={loading || !configOk}
        className="w-full rounded bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
        type="submit"
      >
        {loading ? "Signing in..." : "Sign in"}
      </button>
    </form>
  )
}
