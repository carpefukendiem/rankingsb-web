import Link from "next/link"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

export function ArticleMarkdown({ markdown }: { markdown: string }) {
  return (
    <div className="prose prose-slate max-w-none prose-headings:scroll-mt-24 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-slate-900 prose-table:text-sm prose-th:bg-slate-100 prose-th:px-3 prose-th:py-2 prose-td:border prose-td:border-slate-200 prose-td:px-3 prose-td:py-2">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a({ href, children, ...rest }) {
            if (href?.startsWith("/")) {
              return (
                <Link href={href} className="text-blue-600 hover:underline font-medium">
                  {children}
                </Link>
              )
            }
            return (
              <a href={href} className="text-blue-600 hover:underline" {...rest}>
                {children}
              </a>
            )
          },
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  )
}
