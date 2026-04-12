export type ContentFrontmatter = Record<string, string>

export function parseContentMarkdown(raw: string): {
  frontmatter: ContentFrontmatter
  body: string
} {
  if (!raw.startsWith("---\n")) {
    return { frontmatter: {}, body: raw }
  }
  const end = raw.indexOf("\n---\n", 4)
  if (end === -1) {
    return { frontmatter: {}, body: raw }
  }
  const fmBlock = raw.slice(4, end)
  const body = raw.slice(end + 5)
  const frontmatter: ContentFrontmatter = {}
  for (const line of fmBlock.split("\n")) {
    const idx = line.indexOf(":")
    if (idx === -1) continue
    const key = line.slice(0, idx).trim()
    let val = line.slice(idx + 1).trim()
    if (val.startsWith('"') && val.endsWith('"')) {
      try {
        val = JSON.parse(val) as string
      } catch {
        /* keep raw */
      }
    }
    frontmatter[key] = val
  }
  return { frontmatter, body }
}
