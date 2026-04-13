# CURSOR PROMPT — Add 30 SEO Content Pieces to rankingsb.com

## CONTEXT
This prompt contains instructions to add 30 fully-written, SEO-optimized content pieces to the rankingsb.com website. The site is at https://www.rankingsb.com. The content is provided in 4 source files:
- `blog-posts-1-6.md`
- `blog-posts-7-12.md`
- `blog-posts-13-18.md`
- `service-industry-pages-19-25.md`
- `location-pages-26-30.md`

Each piece includes: URL slug, Title Tag, Meta Description, H1, and full body content with internal links.

---

## TASK: Add All 30 Content Pieces

For each piece below, create a new page/post with the exact URL slug, title tag, meta description, H1, and body content as written. All internal links use the `/path` format and should resolve to the correct site pages. Preserve all markdown formatting — H2s become `##`, H3s become `###`, bold, tables, and code blocks as appropriate for your CMS.

---

### BLOG POSTS (add to /blog/ directory)

| # | URL Slug | Title Tag |
|---|---|---|
| 1 | /blog/google-local-pack | How Google's Local Pack Works (And How to Get Into It) \| Rankingsb |
| 2 | /blog/long-tail-seo | Long-Tail SEO: Why "Best Plumber Santa Barbara" Beats "Plumber" \| Rankingsb |
| 3 | /blog/why-not-ranking-google | Why Your Santa Barbara Business Isn't Ranking on Google — 10 Real Reasons \| Rankingsb |
| 4 | /blog/local-seo-checklist-2026 | The 2026 Local SEO Checklist for Central Coast Businesses \| Rankingsb |
| 5 | /blog/seo-cost-santa-barbara | How Much Does SEO Cost in Santa Barbara? A Transparent Breakdown \| Rankingsb |
| 6 | /blog/google-reviews-vs-yelp | Google Reviews vs. Yelp vs. Bing: Which Matters Most for Local Rankings \| Rankingsb |
| 7 | /blog/schema-markup-local-businesses | Schema Markup for Local Businesses: A Beginner's Guide \| Rankingsb |
| 8 | /blog/respond-to-negative-reviews | How to Respond to Negative Reviews and Protect Your Reputation \| Rankingsb |
| 9 | /blog/seo-vs-google-ads-when-use-both | SEO vs. Google Ads: The Difference and When to Use Both \| Rankingsb |
| 10 | /blog/core-web-vitals | Website Speed & Core Web Vitals: How Page Load Kills Your Local Rankings \| Rankingsb |
| 11 | /blog/local-link-building | Local Link Building for Santa Barbara Businesses: Where to Start \| Rankingsb |
| 12 | /blog/near-me-searches | How to Dominate "Near Me" Searches on the Central Coast \| Rankingsb |
| 13 | /blog/seasonal-seo-santa-barbara | Seasonal SEO Strategy for Santa Barbara Businesses (Tourism, Events & More) \| Rankingsb |
| 14 | /blog/nap-consistency | What Is NAP Consistency and Why It Destroys Your Local Rankings \| Rankingsb |
| 15 | /blog/track-seo-results | How to Track Your Local SEO Results Without an Agency \| Rankingsb |
| 16 | /blog/instagram-vs-seo | Instagram vs. SEO: Where Should a Santa Barbara Business Focus First? \| Rankingsb |
| 17 | /blog/mobile-seo-local-businesses | The Complete Guide to Mobile SEO for Santa Barbara Local Businesses \| Rankingsb |
| 18 | /blog/how-long-does-seo-take | How Long Does SEO Take? Realistic Timelines for Central Coast Businesses \| Rankingsb |

### SERVICE / INDUSTRY PAGES (add to /industries/ directory)

| # | URL Slug | Title Tag |
|---|---|---|
| 19 | /industries/contractor-seo | Contractor SEO Santa Barbara — Get More Bids & Leads \| Rankingsb |
| 20 | /industries/landscaping-seo | Landscaping & Lawn Care SEO Santa Barbara \| Rankingsb |
| 21 | /industries/pet-services-seo | Pet Services SEO Santa Barbara (Groomers, Vets, Boarding) \| Rankingsb |
| 22 | /industries/spa-salon-seo | Spa & Beauty Salon SEO Santa Barbara \| Rankingsb |
| 23 | /industries/financial-advisor-seo | Financial Advisor & Accounting SEO Santa Barbara \| Rankingsb |
| 24 | /industries/home-services-seo | Home Services SEO Santa Barbara (Cleaning, Organizing, Handyman) \| Rankingsb |
| 25 | /industries/ecommerce-seo-central-coast | Ecommerce SEO for Central Coast Brands Selling Locally & Online \| Rankingsb |

### LOCATION PAGES (add to /locations/ directory)

| # | URL Slug | Title Tag |
|---|---|---|
| 26 | /locations/lompoc-seo | SEO Services Lompoc CA — Rank #1 on Google \| Rankingsb |
| 27 | /locations/santa-maria-seo | SEO Services Santa Maria CA \| Local SEO for Santa Barbara County's Largest City \| Rankingsb |
| 28 | /locations/san-luis-obispo-seo | SEO Services San Luis Obispo \| Expand Your Reach to SLO County \| Rankingsb |
| 29 | /locations/buellton-santa-ynez-valley-seo | SEO Services Buellton & Santa Ynez Valley — Wine Country Digital Marketing \| Rankingsb |
| 30 | /locations/port-hueneme-seo | SEO Services Port Hueneme & Oxnard Harbor — Serving Ventura's Coast \| Rankingsb |

---

## IMPLEMENTATION REQUIREMENTS

### For each page/post, set:
1. **URL/Slug** — exactly as listed above (no auto-generated variations)
2. **Title Tag (SEO title)** — exactly as written
3. **Meta Description** — exactly as written (check character limits; all are within 160 chars)
4. **H1** — exactly as written (may differ from title tag)
5. **Body content** — full content from source files, preserving heading hierarchy (H2, H3), bold, tables, and code blocks

### Canonical URL:
- All new pages should have a self-referencing canonical tag
- Do NOT set canonical to the homepage (a common default CMS behavior to check)

### Indexability:
- All pages must be set to **index, follow** (not noindex)
- Check that the site's existing pages show as "Canonicalised" pointing to rankingsb.com (without www) — new pages should follow the same pattern

### Internal links:
- All internal links in the content use relative paths (e.g., `/services/local-seo`, `/blog/google-local-pack`)
- Ensure these resolve correctly after publish
- No links should 404 — verify against existing site structure before/after publish

### Image placeholders:
- The content does not specify images
- Add a relevant featured image to each post/page using existing site image assets or a placeholder
- Recommended: add at least 1 image per blog post at the top or near the first section break

### Blog post metadata:
- Author: set to site default author
- Category: "Local SEO" for all blog posts (create if doesn't exist)
- Tags: add 2–3 relevant tags per post based on primary topics covered

### Industry pages metadata:
- Template: use the same template as existing `/industries/` pages
- Add to the industries navigation/hub page at `/industries` — each new page should be listed there with a brief description

### Location pages metadata:
- Template: use the same template as existing `/locations/` pages
- Add to the locations hub page at `/locations` — each new page should be listed there with city name and brief description

---

## QUALITY CHECKS AFTER PUBLISHING

Run these checks after all 30 pages are published:

- [ ] All 30 URLs return 200 status (no 404s, no redirects)
- [ ] All title tags render correctly in browser tab
- [ ] All meta descriptions appear in `<head>` source
- [ ] All H1s render as the first heading on the page
- [ ] All internal links resolve correctly (no 404s)
- [ ] Canonical tags are self-referencing on all new pages
- [ ] All pages are set to index, follow
- [ ] Blog posts appear in blog listing at /blog
- [ ] Industry pages appear in industries hub at /industries
- [ ] Location pages appear in locations hub at /locations
- [ ] Submit updated sitemap to Google Search Console after publish

---

## NOTES

- The content intentionally avoids duplicating any existing pages. Cross-reference the existing URL list before publishing if uncertain.
- All content references "Rankingsb" (no space) — this is the brand name as used throughout the existing site
- Phone number references use (805) 307-7600 — verify this matches the site's contact info
- The 90-day guarantee is referenced throughout — ensure any linked guarantee pages exist or update links accordingly
- `/free-audit` is linked frequently — ensure this page is live and the form is functional before publishing

---

## SCHEMA MARKUP IMPLEMENTATION (REQUIRED)

All 30 pages have validated JSON-LD schema blocks in `schema-all-30-pages.md`. For each page, implement as follows:

### Placement
Add the schema block inside a `<script type="application/ld+json">` tag in the `<head>` of each page — NOT in the body. Example:

```html
<head>
  ...
  <script type="application/ld+json">
  { ... schema block from schema-all-30-pages.md ... }
  </script>
</head>
```

### What each schema block contains (per page type)

**Blog posts (18 pages) — 5-node @graph:**
1. `WebPage` — page identity with @id, url, name, description
2. `Article` — headline, datePublished/Modified, author (Organization), publisher with logo
3. `BreadcrumbList` — with @id, full item path including position/name/item
4. `FAQPage` — 3 Q&As per post, directly from the post content
5. `LocalBusiness` (org) — sitewide identity node with phone, address, geo, sameAs, areaServed

**Industry/service pages (7 pages) — 5-node @graph:**
1. `WebPage`
2. `Service` — service name, provider reference to org, areaServed cities
3. `BreadcrumbList`
4. `FAQPage`
5. `LocalBusiness` (org)

**Location pages (5 pages) — 5-node @graph:**
1. `WebPage`
2. `LocalBusiness` (location-specific) — city name, state, lat/lng geo coordinates, parentOrganization reference
3. `BreadcrumbList`
4. `FAQPage`
5. `LocalBusiness` (org)

### Update datePublished and dateModified
The schema uses `2026-04-11` as the publish date. Set `datePublished` to the actual publish date for each page. Set `dateModified` to match `datePublished` on first publish; update it whenever a page is edited.

### Validation after implementation
After deploying, test each page using Google's Rich Results Test:
`https://search.google.com/test/rich-results`

Check that:
- [ ] FAQPage rich result is detected and shows Q&As
- [ ] BreadcrumbList is detected
- [ ] Article (for blog posts) or LocalBusiness is detected
- [ ] Zero errors (warnings about optional fields are acceptable)
- [ ] No "Invalid" or "Ineligible" results

Also check Google Search Console → Enhancements after indexing to confirm no structured data errors are reported at scale.

### Logo URL
The schema references `https://www.rankingsb.com/logo.png` — confirm this file exists at that exact path or update the URL in the schema to match the actual logo file path before publishing.
