# Blog CMS - How to Publish Posts
## Complete Guide for Ruben

---

## 📁 CURRENT STATUS

**The blog system is DOCUMENTED but NOT YET SET UP.**

I created the documentation (`BLOG-CMS-SETUP.md`) but the actual CMS needs to be installed.

---

## 🚀 QUICK SETUP (5 Minutes)

### Step 1: Install Dependencies
```bash
cd /Users/rubenruiz/.openclaw/workspace/projects/rankingsb/web/my-app
npm install contentlayer next-contentlayer
```

### Step 2: Create Content Folder
```bash
mkdir -p content/blog
```

### Step 3: Create Config File
Create `contentlayer.config.ts` in the project root:
```typescript
import { defineDocumentType, makeSource } from 'contentlayer/source-files'

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    author: { type: 'string', required: true },
    excerpt: { type: 'string', required: true },
    tags: { type: 'list', of: { type: 'string' } },
    image: { type: 'string' },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.sourceFileName.replace('.mdx', ''),
    },
  },
}))

export default makeSource({
  contentDirPath: 'content/blog',
  documentTypes: [Post],
})
```

### Step 4: Update Next Config
Replace `next.config.js` with:
```javascript
import { withContentlayer } from 'next-contentlayer'

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
}

export default withContentlayer(nextConfig)
```

### Step 5: Create Blog Post Template
Create `contentlayer.config.ts` (already done above)

---

## 📝 HOW TO PUBLISH A BLOG POST

### Method: Write Markdown File

**1. Create a new file:**
```
content/blog/YYYY-MM-DD-your-title.mdx
```

**Example:**
```
content/blog/2026-02-23-seo-tips-santa-barbara.mdx
```

**2. Add Frontmatter:**
```mdx
---
title: "10 SEO Tips for Santa Barbara Businesses"
date: "2026-02-23"
author: "Johnny 5"
excerpt: "Learn how to rank higher on Google with these proven local SEO strategies."
tags: ["SEO", "Santa Barbara", "Local Business"]
image: "/images/blog/seo-tips.jpg"
---
```

**3. Write Content:**
```mdx
# 10 SEO Tips for Santa Barbara Businesses

Santa Barbara is a competitive market. Here's how to stand out...

## 1. Optimize Your Google Business Profile

Your GBP is the #1 ranking factor...

## 2. Get Local Reviews

Reviews signal trust to Google...

<CallToAction text="Get Your Free Audit" href="/free-audit" />
```

**4. Save & Deploy:**
- Save the file
- Run: `npm run build`
- Deploy: `vercel --prod`

---

## 🎨 CURRENT BLOG PAGE DESIGN

**Your blog page IS already designed and looks great:**

- **Hero:** Dark gradient with title "Local SEO Insights"
- **Featured Post:** Large card with image + content
- **Blog Grid:** 6-post grid with category badges
- **Categories:** Tag cloud for browsing
- **CTA:** Blue section with "Get Free Audit"

**File:** `app/blog/page.tsx`

**Screenshot preview:**
- Clean, modern design
- White cards on light gray background
- Blue accents for CTAs
- Professional typography

---

## ✨ ENHANCED BLOG FEATURES (Add These)

### 1. Individual Blog Post Page
Create `app/blog/[slug]/page.tsx` for full articles

### 2. Blog Post Images
Add hero images to `/public/images/blog/`

### 3. Author Bios
Add author photos and bios

### 4. Related Posts
Show related articles at bottom

### 5. Social Sharing
Add share buttons (Twitter, LinkedIn, Facebook)

### 6. Newsletter Signup
Email capture in sidebar

---

## 🚀 WANT ME TO SET THIS UP NOW?

I can:
1. **Install the CMS** (5 minutes)
2. **Create individual blog post pages** (10 minutes)  
3. **Write 5 starter blog posts** (20 minutes)
4. **Deploy the updated site** (2 minutes)

**Just say: "Set up the blog CMS now"**

---

## 📊 BLOG CONTENT IDEAS

**Ready to write:**
1. "Why Your Santa Barbara Business Isn't Showing Up on Google Maps"
2. "How to Get More 5-Star Reviews (Without Begging)"
3. "The Real Cost of SEO vs Google Ads for Local Businesses"
4. "10 Local Citation Sites Every Santa Barbara Business Needs"
5. "Electrician SEO: How to Rank #1 in Your Service Area"

**All optimized for local SEO keywords.**

---

## 📁 FILES

| File | Purpose |
|------|---------|
| `BLOG-CMS-SETUP.md` | Full technical documentation |
| `app/blog/page.tsx` | Blog listing page (DESIGNED ✓) |
| `content/blog/` | Where you write posts (NEEDS SETUP) |
| `app/blog/[slug]/page.tsx` | Individual post pages (NEEDS CREATION) |

---

**Current Status:** Blog looks great, just needs CMS setup to publish posts.

**Next Step:** Say "set up blog CMS" and I'll install everything in 10 minutes.
