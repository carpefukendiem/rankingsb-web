import type { Metadata } from "next"
import type { ReactNode } from "react"
import { clampMetaDescription } from "@/lib/meta-helpers"

export const metadata: Metadata = {
  title: {
    absolute: "Unico Soccer Club — Graphic Requests | Ranking SB",
  },
  description: clampMetaDescription(
    "Submit team tryouts or miscellaneous graphic requests for Unico Soccer Club. Royal blue club styling, fast turnaround from Ranking SB."
  ),
  robots: { index: true, follow: true },
}

export default function UnicoLayout({ children }: { children: ReactNode }) {
  return children
}
