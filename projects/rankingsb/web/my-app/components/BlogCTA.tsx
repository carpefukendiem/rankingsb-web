import Link from "next/link"

interface BlogCTAProps {
  variant: "top" | "bottom"
}

export default function BlogCTA({ variant }: BlogCTAProps) {
  if (variant === "top") {
    return (
      <div className="my-10 rounded-xl border border-teal-200 bg-teal-50 overflow-hidden">
        <div className="flex flex-col gap-3 p-8 items-start max-sm:p-5">
          <p className="text-base leading-relaxed text-teal-900 max-w-lg m-0">
            While you&apos;re reading this — your competitors might already be doing
            it. See exactly where your business stands with a free Growth Audit
            delivered in 24 hours.
          </p>
          <Link
            href="/free-audit"
            className="inline-block bg-[#1D9E75] hover:bg-[#0F6E56] text-white font-semibold text-sm px-6 py-3 rounded-lg no-underline transition-colors mt-1 max-sm:w-full max-sm:text-center"
          >
            Claim Your Free Growth Audit →
          </Link>
          <span className="text-xs text-teal-800 m-0">
            No obligation. Delivered in 24 hours.
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className="my-10 rounded-xl bg-[#042C53] overflow-hidden">
      <div className="flex flex-col gap-3 p-8 items-start max-sm:p-5">
        <p className="text-xs font-semibold uppercase tracking-widest text-teal-400 m-0">
          Ready to put this into practice?
        </p>
        <p className="text-lg leading-snug text-white max-w-lg m-0">
          The 805 Growth Engine does everything covered in this article — and the
          free audit shows you exactly what needs to happen first.
        </p>
        <Link
          href="/free-audit"
          className="inline-block bg-[#1D9E75] hover:bg-[#0F6E56] text-white font-semibold text-sm px-6 py-3 rounded-lg no-underline transition-colors mt-1 max-sm:w-full max-sm:text-center"
        >
          Get Your Free Growth Audit — 24hr Delivery →
        </Link>
        <p className="text-xs text-teal-300 m-0">
          Free for every 805 business. No sales call unless you want one.
        </p>
      </div>
    </div>
  )
}
