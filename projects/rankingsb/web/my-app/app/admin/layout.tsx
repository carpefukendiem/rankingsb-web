import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
}

export default function AdminShellLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
      <header className="border-b bg-white px-6 py-3 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-6">
          <div className="text-sm font-semibold tracking-wide text-muted-foreground">Admin</div>
          <nav className="flex flex-wrap gap-4 text-sm font-medium">
            <Link className="text-primary hover:underline" href="/admin/synclocal">
              SyncLocal
            </Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">{children}</main>
    </div>
  )
}
