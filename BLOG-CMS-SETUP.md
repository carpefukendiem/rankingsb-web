# Blog CMS for Rankingsb
## Markdown-Powered Blog System

---

## SOLUTION: MDX Blog with Next.js

**Why MDX:**
- Write in Markdown (simple, fast)
- Embed React components when needed
- SEO-friendly static generation
- Easy to manage in `/content/blog/`

---

## Setup Instructions

### 1. Install Dependencies

```bash
cd /Users/rubenruiz/.openclaw/workspace/projects/rankingsb/web/my-app
npm install @next/mdx @mdx-js/loader @mdx-js/react gray-matter
```

### 2. Create MDX Config

Create `next.config.mjs`:
```javascript
import createMDX from '@next/mdx'

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
}

export default withMDX(nextConfig)
```

### 3. Create Blog Structure

```
app/
├── blog/
│   ├── page.tsx              # Blog listing page
│   └── [slug]/
│       └── page.tsx          # Individual blog post
├── layout.tsx                # Root layout
└── mdx-components.tsx        # MDX styling components

content/
└── blog/
    ├── 2026-02-20-seo-tips.mdx
    ├── 2026-02-18-local-marketing.mdx
    └── metadata.json         # Blog index
```

### 4. Blog Post Format (MDX)

```mdx
---
title: "10 Local SEO Tips for Santa Barbara Businesses"
date: "2026-02-20"
author: "Rankingsb Team"
excerpt: "Discover proven strategies to rank higher in local Google searches..."
tags: ["SEO", "Local Business", "Santa Barbara"]
image: "/images/blog/seo-tips.jpg"
---

# 10 Local SEO Tips for Santa Barbara Businesses

Local SEO is critical for businesses that serve specific geographic areas...

## 1. Optimize Your Google Business Profile

Your Google Business Profile is the foundation of local SEO...

## 2. Build Local Citations

Consistency is key when it comes to NAP (Name, Address, Phone)...

<CallToAction text="Get Your Free SEO Audit" href="/free-audit" />
```

---

## How to Use It

### Adding a New Blog Post

1. Create a new `.mdx` file in `/content/blog/`
2. Name format: `YYYY-MM-DD-descriptive-title.mdx`
3. Add frontmatter (title, date, excerpt, tags)
4. Write content in Markdown
5. Save and deploy

### Blog Post Template

```mdx
---
title: "Your Title Here"
date: "2026-02-22"
author: "Rankingsb Team"
excerpt: "Brief description for preview cards"
tags: ["SEO", "Category1", "Category2"]
image: "/images/blog/your-image.jpg"
---

# Your Title Here

Introduction paragraph...

## Section Heading

Content here...

## Another Section

More content...

## Conclusion

Wrap up with CTA...

<CallToAction text="Get Free Audit" href="/free-audit" />
```

### Available Components

```mdx
<CallToAction text="Button Text" href="/link" />
<InfoBox type="tip">Helpful tip content</InfoBox>
<InfoBox type="warning">Warning content</InfoBox>
<Image src="/images/photo.jpg" alt="Description" />
<YouTube id="VIDEO_ID" />
```

---

## Alternative: Simple Markdown Blog

If MDX is too complex, use this simpler approach:

### Blog Index (JSON)
```json
{
  "posts": [
    {
      "slug": "seo-tips-santa-barbara",
      "title": "10 Local SEO Tips for Santa Barbara Businesses",
      "date": "2026-02-20",
      "excerpt": "Discover proven strategies...",
      "tags": ["SEO", "Local Business"]
    }
  ]
}
```

### Build Script
Create `scripts/build-blog.js`:
```javascript
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const blogDir = './content/blog';
const outputDir = './public/blog-data';

// Read all markdown files
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));

const posts = files.map(file => {
  const content = fs.readFileSync(path.join(blogDir, file), 'utf8');
  const { data, content: body } = matter(content);
  
  return {
    slug: file.replace('.md', ''),
    ...data,
    content: body
  };
});

// Sort by date
posts.sort((a, b) => new Date(b.date) - new Date(a.date));

// Write JSON
fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(
  path.join(outputDir, 'posts.json'),
  JSON.stringify(posts, null, 2)
);

console.log(`Built ${posts.length} blog posts`);
```

---

## Recommended: Contentlayer (Best Option)

Contentlayer is the modern standard for Next.js blogs:

### Install
```bash
npm install contentlayer next-contentlayer
```

### Config
Create `contentlayer.config.ts`:
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

### Usage in Components
```tsx
import { allPosts } from 'contentlayer/generated'

// Get all posts
const posts = allPosts.sort((a, b) => new Date(b.date) - new Date(a.date))

// Get single post
const post = allPosts.find((post) => post.slug === params.slug)
```

---

## File Locations

```
workspace/
├── content/
│   └── blog/                    # Your markdown blog posts
│       ├── 2026-02-20-seo-tips.mdx
│       └── 2026-02-18-marketing.mdx
├── projects/rankingsb/web/my-app/
│   ├── app/blog/
│   │   ├── page.tsx             # Blog listing
│   │   └── [slug]/page.tsx      # Single post
│   ├── contentlayer.config.ts   # Contentlayer config
│   └── next.config.mjs          # Next.js + MDX config
└── scripts/
    └── build-blog.js            # Optional build script
```

---

## Quick Start (Copy-Paste)

1. **Install:** `npm install contentlayer next-contentlayer`
2. **Create config:** Copy `contentlayer.config.ts` above
3. **Update next.config:** Add `withContentlayer`
4. **Create content folder:** `mkdir -p content/blog`
5. **Write first post:** Create `content/blog/hello.mdx`
6. **Build:** `npm run build` (generates types)
7. **Import:** `import { allPosts } from 'contentlayer/generated'`

---

*CMS Solution Created: February 22, 2026*  
*Recommendation: Use Contentlayer for best developer experience*
