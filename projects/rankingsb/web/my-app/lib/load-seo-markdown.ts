import fs from "fs"
import path from "path"
import { parseContentMarkdown } from "@/lib/parse-content-md"

const ROOT = process.cwd()

export function getSeoBlogSlugs(): string[] {
  const dir = path.join(ROOT, "content", "blog")
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""))
}

export function loadSeoBlogPost(slug: string) {
  const p = path.join(ROOT, "content", "blog", `${slug}.md`)
  if (!fs.existsSync(p)) return null
  return parseContentMarkdown(fs.readFileSync(p, "utf8"))
}

export function loadIndustryMarkdown(slug: string) {
  const p = path.join(ROOT, "content", "industries", `${slug}.md`)
  if (!fs.existsSync(p)) return null
  return parseContentMarkdown(fs.readFileSync(p, "utf8"))
}

export function loadLocationMarkdown(slug: string) {
  const p = path.join(ROOT, "content", "locations", `${slug}.md`)
  if (!fs.existsSync(p)) return null
  return parseContentMarkdown(fs.readFileSync(p, "utf8"))
}
