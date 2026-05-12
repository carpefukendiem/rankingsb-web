"use client"

import { usePathname } from "next/navigation"

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"

export function SiteChrome({
  ldJsonExtra,
  children,
}: Readonly<{ ldJsonExtra: React.ReactNode; children: React.ReactNode }>) {
  const pathname = usePathname()
  const isAdmin = pathname?.startsWith("/admin") ?? false

  return (
    <>
      {ldJsonExtra}
      {isAdmin ? (
        <div className="min-h-screen">{children}</div>
      ) : (
        <>
          <Header />
          {children}
          <Footer />
        </>
      )}
    </>
  )
}
