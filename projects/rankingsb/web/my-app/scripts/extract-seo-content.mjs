#!/usr/bin/env node
/**
 * One-time extraction from new-content source MD + schema file.
 * Run: node scripts/extract-seo-content.mjs
 */
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, "..")
// my-app → web → rankingsb → projects → rankingsb-web
const REPO = path.join(ROOT, "../../../..")
const NEW_CONTENT = path.join(REPO, "new-content-4:10:26")
const SCHEMA_SRC = path.join(REPO, "new-content-4:10:26-schema-mmarkup-and-prompt", "schema-all-30-pages.md")

function extractMeta(block, urlPrefix) {
  const urlLine = block.match(/\*\*URL:\*\*\s*`([^`]+)`/)
  const urlM = urlLine && urlLine[1].startsWith(urlPrefix) ? urlLine : null
  const titleM = block.match(/\*\*Title Tag:\*\*\s*(.+)/)
  const metaM = block.match(/\*\*Meta Description:\*\*\s*(.+)/)
  const h1M = block.match(/\*\*H1:\*\*\s*(.+)/)
  if (!urlM || !titleM || !metaM || !h1M) return null
  return {
    url: urlM[1],
    titleTag: titleM[1].trim(),
    metaDescription: metaM[1].trim(),
    h1: h1M[1].trim(),
  }
}

function extractBodyAfterH1(block) {
  const h1Idx = block.indexOf("**H1:**")
  if (h1Idx === -1) return ""
  const after = block.slice(h1Idx)
  const delim = after.indexOf("\n---\n")
  if (delim === -1) return ""
  let body = after.slice(delim + 5)
  const cut = body.search(/\n---\s*\n## /)
  if (cut !== -1) body = body.slice(0, cut)
  else {
    const cut2 = body.search(/\n---\s*$/)
    if (cut2 !== -1) body = body.slice(0, cut2)
  }
  return body.trim()
}

function parseSections(text, headerRe) {
  const parts = text.split(headerRe)
  const out = []
  for (let i = 1; i < parts.length; i++) {
    out.push(parts[i])
  }
  return out
}

function writeMarkdown(dir, slug, meta, body, extra = {}) {
  const fm = {
    titleTag: meta.titleTag,
    metaDescription: meta.metaDescription,
    h1: meta.h1,
    ...extra,
  }
  const yaml = Object.entries(fm)
    .map(([k, v]) => `${k}: ${JSON.stringify(v)}`)
    .join("\n")
  const content = `---\n${yaml}\n---\n\n${body}\n`
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, `${slug}.md`), content, "utf8")
}

// --- Blog ---
const blogFiles = [
  path.join(NEW_CONTENT, "blog-posts-1-6.md"),
  path.join(NEW_CONTENT, "blog-posts-7-12.md"),
  path.join(NEW_CONTENT, "blog-posts-13-18.md"),
]

const blogDir = path.join(ROOT, "content", "blog")
for (const bf of blogFiles) {
  if (!fs.existsSync(bf)) {
    console.error("Missing", bf)
    process.exit(1)
  }
  const text = fs.readFileSync(bf, "utf8")
  const sections = parseSections(text, /^## BLOG POST \d+\s*$/m)
  for (const block of sections) {
    const meta = extractMeta(block, "/blog/")
    if (!meta) continue
    const slug = meta.url.replace("/blog/", "")
    const body = extractBodyAfterH1(block)
    const readEstimate = Math.max(5, Math.round(body.split(/\s+/).length / 200))
    writeMarkdown(blogDir, slug, meta, body, {
      category: "Local SEO",
      date: "Apr 12, 2026",
      dateIso: "2026-04-12",
      readTime: `${readEstimate} min read`,
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop",
    })
    console.log("blog", slug)
  }
}

// --- Industries ---
const indFile = path.join(NEW_CONTENT, "service-industry-pages-19-25.md")
const indText = fs.readFileSync(indFile, "utf8")
const indSections = parseSections(indText, /^## PAGE \d+\s*$/m)
const indDir = path.join(ROOT, "content", "industries")
for (const block of indSections) {
    const meta = extractMeta(block, "/industries/")
  if (!meta) continue
  const slug = meta.url.replace("/industries/", "")
  const body = extractBodyAfterH1(block)
  writeMarkdown(indDir, slug, meta, body, {
    heroBadge: "Industry SEO · Santa Barbara & Ventura County",
  })
  console.log("industry", slug)
}

// --- Locations ---
const locFile = path.join(NEW_CONTENT, "location-pages-26-30.md")
const locText = fs.readFileSync(locFile, "utf8")
const locSections = parseSections(locText, /^## PAGE \d+\s*$/m)
const locDir = path.join(ROOT, "content", "locations")
for (const block of locSections) {
    const meta = extractMeta(block, "/locations/")
  if (!meta) continue
  const slug = meta.url.replace("/locations/", "")
  const body = extractBodyAfterH1(block)
  writeMarkdown(locDir, slug, meta, body, {
    heroBadge: "Local SEO",
  })
  console.log("location", slug)
}

// --- Schema JSON ---
const schemaText = fs.readFileSync(SCHEMA_SRC, "utf8")
const schemaMap = {}
const schemaParts = schemaText.split(/^## /m)
for (const part of schemaParts) {
  const lineEnd = part.indexOf("\n")
  if (lineEnd === -1) continue
  const key = part.slice(0, lineEnd).trim()
  if (!key.startsWith("/")) continue
  const jsonMatch = part.match(/```json\s*([\s\S]*?)```/)
  if (!jsonMatch) continue
  let jsonStr = jsonMatch[1].trim()
  jsonStr = jsonStr.replace(/https:\/\/www\.rankingsb\.com/g, "https://rankingsb.com")
  jsonStr = jsonStr.replace(/"2026-04-11"/g, '"2026-04-12"')
  try {
    schemaMap[key] = JSON.parse(jsonStr)
  } catch (e) {
    console.error("JSON parse failed for", key, e.message)
    process.exit(1)
  }
}

for (const k of Object.keys(schemaMap)) {
  schemaMap[k] = JSON.parse(
    JSON.stringify(schemaMap[k]).split("https://rankingsb.com/logo.png").join("https://rankingsb.com/logo-new.webp")
  )
}

const schemaOut = path.join(ROOT, "lib", "seo-graph-schemas.json")
fs.mkdirSync(path.dirname(schemaOut), { recursive: true })
fs.writeFileSync(schemaOut, JSON.stringify(schemaMap, null, 0), "utf8")
console.log("schemas", Object.keys(schemaMap).length, "→", schemaOut)
