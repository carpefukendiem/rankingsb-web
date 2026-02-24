# Website Build Standards & Lessons Learned
## Version: 2026.2.24 | Quality Benchmark: 101 JJKB Site

---

## 🎯 THE GOLDEN RULE

**Every website must meet or exceed the 101 Jujutsu & Kickboxing site quality.**
- That site took multiple iterations but established the standard
- No shortcuts. No "we'll fix it later."
- If it wouldn't impress a paying client, don't ship it.

---

## 📋 PRE-BUILD CHECKLIST (Must Complete Before First Line of Code)

### Client Discovery
- [ ] Business name and full branding requirements
- [ ] Logo file (preferably PNG/SVG with transparent background)
- [ ] Color palette extracted FROM the logo (not guessed)
- [ ] Target audience defined
- [ ] Primary CTA (Call To Action) identified
- [ ] Competitor websites reviewed
- [ ] Must-have pages list

### Content Assets
- [ ] Real photos (not stock) - request client upload to `~/Desktop/Johnny5-Inbox/[client]/images/`
- [ ] If stock needed: Unsplash only, carefully curated
- [ ] If no photos: Generate AI images with Nano Banana Pro
- [ ] Real testimonials (never fake) - pull from GMB, Yelp, or request from client
- [ ] Contact information (phone, email, address, hours)

### Technical Requirements
- [ ] Domain name (or Vercel subdomain for staging)
- [ ] Hosting platform confirmed (Vercel default)
- [ ] CMS requirements identified (GHL, Ghost, Strapi, or static)
- [ ] Form backend (Supabase, Formspree, or GHL integration)

---

## 🎨 DESIGN STANDARDS

### Color Palette (Extract from Logo)
```
1. Upload logo to workspace
2. Analyze for exact hex codes
3. Primary: Main brand color (buttons, highlights)
4. Secondary: Supporting color (backgrounds, accents)
5. Accent: Call-to-action color (contrast with primary)
6. Text: Dark for light BG, light for dark BG
7. NEVER use generic gold/silver unless in logo
```

### Typography
- [ ] Headings: Bold, sans-serif (Oswald, Montserrat, or similar)
- [ ] Body: Clean, readable (Inter, Open Sans, or similar)
- [ ] Max 2 font families per site
- [ ] Minimum 16px body text

### Layout Requirements
- [ ] Hero section above the fold with clear value prop
- [ ] Logo in navbar (not just text - actual logo image)
- [ ] Sticky navigation with clear CTAs
- [ ] Mobile-responsive (test on mobile view)
- [ ] Max 3-4 sections above fold
- [ ] Clear visual hierarchy

---

## 🖼️ IMAGE STANDARDS

### Priority Order:
1. **Client-provided photos** (best)
2. **AI-generated images** (Nano Banana Pro) - unique, on-brand
3. **Unsplash** (curated, not generic)
4. **NEVER:** Generic stock photos that look "stock"

### Image Requirements:
- [ ] Hero image: High quality, relevant to business
- [ ] Each service/industry has its own image
- [ ] Team/about page has real photos (or professional AI)
- [ ] All images optimized (WebP preferred)
- [ ] No images with old logos/watermarks

### AI Image Prompts (Nano Banana Pro):
```
"Professional [industry] business in [location], modern and clean, 
warm natural lighting, photorealistic, high quality, commercial photography style"
```

---

## 📄 PAGE STRUCTURE (Minimum Requirements)

### Homepage Must Include:
1. Sticky navbar with logo + nav + CTA
2. Hero section with headline, subhead, CTA button, lead form
3. Social proof (stats, badges, trust indicators)
4. Services/programs section (grid layout)
5. Why choose us / Features section
6. Testimonials (REAL reviews only)
7. Final CTA section
8. Footer with full sitemap

### Industry/Service Pages Must Include:
1. Hero with industry-specific image
2. Problem statement (what pain does this solve)
3. Solution overview
4. Features/benefits
5. Case study or testimonial
6. CTA to contact/audit

### Blog Must Include:
1. Clickable post cards (entire card is link)
2. Featured image per post
3. Author name (client's business, never "Johnny 5")
4. Publication date
5. Category tags
6. Working individual post pages

---

## 🔗 INTERLINKING REQUIREMENTS

### Must Link:
- [ ] Every page links to homepage
- [ ] Service pages link to related services
- [ ] Blog posts link to relevant services
- [ ] Case studies link to industries
- [ ] All CTAs link to contact/audit page
- [ ] Footer has full sitemap
- [ ] Use relative links (`/services` not `https://...`)

### Navigation:
- [ ] Main nav on all pages
- [ ] Breadcrumbs on deep pages (optional but good)
- [ ] "Back to [parent]" links where appropriate

---

## ✅ QUALITY ASSURANCE CHECKLIST (Before Every Deploy)

### Functionality
- [ ] All links work (click every single one)
- [ ] Forms submit correctly
- [ ] Mobile responsive (resize browser to test)
- [ ] No console errors
- [ ] Page loads in < 3 seconds

### Content
- [ ] No "Lorem ipsum" placeholder text
- [ ] No fake testimonials
- [ ] No "Johnny 5" as author
- [ ] Phone numbers are real
- [ ] Addresses are real
- [ ] Hours are accurate

### Design
- [ ] Logo displays correctly (readable, sized properly)
- [ ] Colors match brand
- [ ] Images load and display properly
- [ ] Text is readable (contrast check)
- [ ] Spacing is consistent
- [ ] No broken layouts

### SEO Basics
- [ ] Page titles are descriptive
- [ ] Meta descriptions present
- [ ] Alt text on images
- [ ] Proper heading hierarchy (H1 → H2 → H3)

---

## 🚀 DEPLOYMENT PROCESS

### Pre-Deploy:
1. Run build locally (`npm run build` or `vercel build`)
2. Fix any build errors
3. Check all pages locally
4. Review on mobile viewport

### Deploy:
1. Push to Vercel (`vercel --prod`)
2. Verify live URL works
3. Click-test every page on live site
4. Test forms on live site
5. Send URL to client

### Post-Deploy:
1. Document URL in project files
2. Add to dashboard
3. Screenshot homepage for portfolio
4. Note any client feedback for iteration

---

## 📝 LESSONS FROM 101 JJKB & RANKINGSB REVISIONS

### What Worked:
- Multiple iteration cycles with client feedback
- Using client's actual logo and brand colors
- Real photos over stock images
- AI-generated images when client photos unavailable
- Comprehensive homepage with all key sections
- Real testimonials from GMB/reviews

### What Didn't:
- Starting with generic templates
- Using placeholder text
- Guessing brand colors instead of extracting from logo
- Too-small logos (unreadable text)
- Stock photos that look cheap
- Broken blog routing
- Missing interlinking

### Client Feedback Patterns:
1. Logo must be big enough to read
2. Colors must match brand exactly
3. No stock photos (looks cheap)
4. Real testimonials only
5. All pages must be accessible
6. Mobile must look good

---

## 🎯 SITE MAP REQUIREMENT

**Every website must have a SITEMAP.md file documenting:**
- All website pages (static pages)
- All blog posts
- All dynamic routes
- Page purposes
- Last updated date

**Purpose:** Client (and I) can see entire site structure at a glance

---

## 📊 CONTINUOUS IMPROVEMENT

### After Every Website Build:
1. **Document:** What worked? What didn't?
2. **Update:** This standards document
3. **Iterate:** Apply lessons to next build
4. **Archive:** Save screenshots for portfolio

### Review Monthly:
- Revisit this document
- Add new lessons learned
- Remove outdated practices
- Update tool recommendations

---

## 🛠️ TOOL STACK

### Design:
- **Images:** Nano Banana Pro (AI) > Unsplash > Client photos
- **Icons:** Lucide React or Heroicons
- **Colors:** Extract from logo, verify with WebAIM contrast checker

### Development:
- **Framework:** Next.js (default)
- **Styling:** Tailwind CSS
- **Hosting:** Vercel
- **Forms:** Supabase or GHL integration

### Content:
- **CMS:** GHL (if client uses it), Ghost, or Strapi
- **Blog:** GHL blog or integrated CMS
- **Reviews:** Real GMB/Yelp pulls

---

## ✅ FINAL CHECK BEFORE ANY WEBSITE BUILD

**Ask myself:**
1. Would I pay for this website?
2. Does it look like a $2,000+ site?
3. Is every image purposeful?
4. Is the copy compelling?
5. Would this convert visitors to leads?

**If any answer is "no" — fix it before shipping.**

---

*Document Version: 2026.2.24*
*Last Updated: After 101 JJKB site completion*
*Next Review: 2026.3.24*