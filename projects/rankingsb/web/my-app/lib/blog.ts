/**
 * Blog data library — file-based backend
 *
 * HOW TO ADD A NEW BLOG POST:
 * 1. Create a new file in /content/blog/ named `your-slug.ts`
 * 2. Copy the structure from any existing post file
 * 3. Fill in your title, excerpt, date, category, content, etc.
 * 4. Add the slug to the BLOG_SLUGS array below
 * 5. Run `npm run build` and deploy
 *
 * No database needed — posts live as TypeScript files for full type safety.
 */

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  content: string        // HTML string — write with <h2>, <p>, <ul>, <strong> tags
  category: string
  date: string           // e.g. "Mar 1, 2026"
  author: string
  authorTitle?: string
  image: string          // Unsplash URL or /public image path
  readTime: string       // e.g. "8 min read"
  tags?: string[]
  relatedSlugs?: string[]
}

// ─── MASTER LIST OF ALL BLOG SLUGS ────────────────────────────────────────────
// Add your new slug here when you create a new post file
export const BLOG_SLUGS = [
  "santa-barbara-seo-guide",
  "ventura-county-seo-guide",
  "google-business-profile-guide",
  "google-maps-ranking",
  "get-more-reviews",
  "seo-vs-google-ads",
  "local-citation-sites",
  "electrician-seo-guide",
  "hvac-seasonal-seo",
]

// ─── POST DATA ─────────────────────────────────────────────────────────────────
const posts: Record<string, BlogPost> = {
  "santa-barbara-seo-guide": {
    slug: "santa-barbara-seo-guide",
    title: "The Ultimate Santa Barbara SEO Guide for Local Businesses (2026)",
    excerpt: "Everything you need to know to dominate local search in Santa Barbara — from Google Business Profile to local citations, content strategy, and beyond.",
    category: "Local SEO",
    date: "Feb 20, 2026",
    readTime: "12 min read",
    author: "Ruben",
    authorTitle: "Founder, Rankingsb",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=600&fit=crop",
    tags: ["Santa Barbara", "Local SEO", "Google Maps", "Small Business"],
    relatedSlugs: ["google-business-profile-guide", "google-maps-ranking", "get-more-reviews"],
    content: `
<p class="lead">Santa Barbara is one of the most competitive local markets in California. With 90,000+ residents, millions of annual tourists, and a thriving business community, ranking on page 1 of Google here can mean the difference between a packed appointment book and an empty phone.</p>

<p>This guide covers everything local businesses need to dominate search in Santa Barbara — from your Google Business Profile to local link building and content strategy.</p>

<h2>Why Local SEO Matters More in Santa Barbara</h2>
<p>Santa Barbara has some unique characteristics that make local SEO especially powerful here:</p>
<ul>
  <li><strong>Tourist economy:</strong> Millions of visitors search "restaurant near me," "spa Santa Barbara," and "things to do in Santa Barbara" every year — all local searches you can capture.</li>
  <li><strong>High-income demographic:</strong> With one of the highest median household incomes in California, customers here spend more and research more before choosing a business.</li>
  <li><strong>Mobile-first behavior:</strong> Over 65% of local searches happen on mobile. If your site is slow or hard to navigate on a phone, you lose.</li>
  <li><strong>Seasonal spikes:</strong> Summer and holiday traffic can triple search volume for restaurants, hotels, and tours — are you ready to capture it?</li>
</ul>

<h2>The 5 Pillars of Santa Barbara Local SEO</h2>

<h3>1. Google Business Profile Optimization</h3>
<p>Your GBP is your most important local SEO asset. It's what appears in the map pack — the 3 listings above organic results that get 44% of all clicks. Complete every field, add 20+ photos, post weekly, and respond to every review within 24 hours.</p>

<h3>2. On-Page SEO</h3>
<p>Every page on your website should target a specific keyword + location combination. "Plumber Santa Barbara" and "emergency plumber downtown Santa Barbara" are different keywords — build separate pages for each. Include your city name in your H1, title tag, meta description, and naturally throughout the content.</p>

<h3>3. Local Citations</h3>
<p>Citations are mentions of your business name, address, and phone number (NAP) on other websites — Yelp, Bing Places, Apple Maps, and 50+ local directories. Consistency is critical: one space difference in your address across listings can hurt your rankings.</p>

<h3>4. Reviews & Reputation</h3>
<p>Santa Barbara customers read reviews before choosing any local business. You need 50+ Google reviews with a 4.5+ average to compete in most industries. Build a system to ask every satisfied customer for a review — the results compound over time.</p>

<h3>5. Local Content Strategy</h3>
<p>Write blog posts and pages that speak specifically to Santa Barbara. Cover local events, reference local landmarks, write guides for your area. "Best restaurants near State Street" gets searched by locals and tourists alike. Be the authority on your neighborhood.</p>

<h2>Santa Barbara Neighborhoods to Target</h2>
<p>Don't just target "Santa Barbara" — go hyper-local with neighborhood-specific content:</p>
<ul>
  <li><strong>Downtown / State Street:</strong> High foot traffic, restaurants, retail, entertainment</li>
  <li><strong>Montecito:</strong> Luxury clientele, high-value services, celebrity-adjacent reputation</li>
  <li><strong>Goleta:</strong> UCSB area, tech workers, family services</li>
  <li><strong>Funk Zone:</strong> Trendy area, restaurants, wineries, hospitality</li>
  <li><strong>Isla Vista:</strong> Student population, budget-conscious, high volume</li>
  <li><strong>Carpinteria:</strong> Beach community, families, outdoor recreation</li>
</ul>

<h2>Quick Wins You Can Do Today</h2>
<ol>
  <li>Claim and verify your Google Business Profile if you haven't already</li>
  <li>Update your hours — especially holidays and seasonal changes</li>
  <li>Add 10 new photos to your GBP this week</li>
  <li>Text your last 10 customers and ask for a Google review</li>
  <li>Run your website through Google PageSpeed Insights and fix any critical issues</li>
  <li>Make sure your NAP (name, address, phone) is identical across your website, GBP, and Yelp</li>
</ol>

<h2>How Long Does SEO Take in Santa Barbara?</h2>
<p>In competitive niches like real estate, legal, and medical, expect 4-6 months before you see significant ranking improvements. In less competitive niches (specialty retail, unique services), you can see results in 60-90 days.</p>
<p>The key is consistency. SEO is not a one-time project — it's an ongoing investment that compounds over time. Businesses that started building their online presence 2 years ago are nearly impossible to displace now. Start today.</p>
    `,
  },

  "ventura-county-seo-guide": {
    slug: "ventura-county-seo-guide",
    title: "Ventura County SEO: How to Rank in Every City from Oxnard to Thousand Oaks",
    excerpt: "Ventura County has 850,000+ residents across 10 cities. Here's your complete guide to dominating local search across the entire county.",
    category: "Local SEO",
    date: "Feb 18, 2026",
    readTime: "10 min read",
    author: "Ruben",
    authorTitle: "Founder, Rankingsb",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=600&fit=crop",
    tags: ["Ventura County", "Local SEO", "Thousand Oaks", "Oxnard", "Camarillo"],
    relatedSlugs: ["santa-barbara-seo-guide", "google-maps-ranking", "local-citation-sites"],
    content: `
<p class="lead">Ventura County is a $26 billion economy with 850,000+ residents spread across 10 distinct cities. For a business serving the region, capturing local search across the county is a massive opportunity — and one that most businesses leave on the table.</p>

<h2>The Ventura County Market Opportunity</h2>
<p>Most businesses focus their SEO on just one city. But Ventura County customers don't stay in their city — they cross city lines constantly for services, restaurants, shopping, and experiences. A plumber based in Camarillo can and should rank in Thousand Oaks, Moorpark, and Simi Valley too.</p>
<p>The key is building individual landing pages for each city you serve, each with unique content, local references, and properly optimized metadata.</p>

<h2>City-by-City SEO Strategy</h2>

<h3>Oxnard (220,000 residents)</h3>
<p>Ventura County's largest city. High Hispanic population — bilingual content is a major differentiator here. Strong blue-collar market: home services, auto repair, and food businesses thrive. Target "cerca de mí" searches for a huge untapped audience.</p>

<h3>Thousand Oaks (130,000 residents)</h3>
<p>One of the wealthiest cities in California. Residents are highly educated, research extensively before buying, and spend more. Premium services dominate here — medical, legal, wealth management, luxury retail. Competitive but high-value.</p>

<h3>Simi Valley (125,000 residents)</h3>
<p>Family-oriented, suburban. Home services, schools, family restaurants, and children's activities perform extremely well. Often overlooked by competitors focusing on Thousand Oaks — less competition, solid search volume.</p>

<h3>Camarillo (70,000 residents)</h3>
<p>Rapidly growing. Strong retail (Premium Outlets drive tourism). Agricultural roots with a growing professional class. Excellent for retail SEO, restaurants, and service businesses targeting the growing residential base.</p>

<h3>Moorpark (40,000 residents)</h3>
<p>Affluent, suburban, growing. Less competition than Thousand Oaks but similar demographic. Great opportunity for home services, children's activities, and specialty retail.</p>

<h3>Ventura City (110,000 residents)</h3>
<p>The county seat. Strong tourism (Channel Islands, beaches), arts scene, and local business community. Excellent for hospitality, restaurants, outdoor recreation, and professional services.</p>

<h2>The Multi-City SEO Blueprint</h2>
<ol>
  <li><strong>Build a location page for every city you serve</strong> — unique content, local stats, and city-specific calls to action on each page.</li>
  <li><strong>Optimize your Google Business Profile service area</strong> — make sure all cities you serve are listed in your GBP service area settings.</li>
  <li><strong>Build citations in city-specific directories</strong> — Oxnard Chamber, Thousand Oaks Chamber, Camarillo Business Alliance, etc.</li>
  <li><strong>Get links from local media</strong> — Ventura County Star, VC Reporter, local blogs. Even one quality local link can move rankings significantly.</li>
  <li><strong>Use city names in your blog content</strong> — reference local events, landmarks, and news to build topical relevance for each area.</li>
</ol>

<h2>Common Ventura County SEO Mistakes</h2>
<ul>
  <li>Using one generic page to target all of Ventura County (too broad, ranks for nothing)</li>
  <li>Ignoring the Oxnard/Spanish-speaking market (huge untapped opportunity)</li>
  <li>Not claiming Google Business Profiles in each service area city</li>
  <li>Competing against Yelp and Angi on their own turf instead of owning local search</li>
</ul>
    `,
  },

  "google-business-profile-guide": {
    slug: "google-business-profile-guide",
    title: "The Complete Guide to Google Business Profile for Santa Barbara Businesses",
    excerpt: "Your Google Business Profile is the #1 factor in local rankings. Learn how to optimize it step-by-step to dominate the Local Pack.",
    category: "Google Business Profile",
    date: "Feb 15, 2026",
    readTime: "8 min read",
    author: "Ruben",
    authorTitle: "Founder, Rankingsb",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&h=600&fit=crop",
    tags: ["Google Business Profile", "Local SEO", "Google Maps", "GBP"],
    relatedSlugs: ["google-maps-ranking", "get-more-reviews", "local-citation-sites"],
    content: `
<p class="lead">Your Google Business Profile (GBP) is the single most important piece of digital real estate for a local business in Santa Barbara or Ventura County. It's what shows up in the Google Maps 3-Pack — and the 3-Pack gets 44% of all clicks on a local search page.</p>

<h2>What Is Google Business Profile?</h2>
<p>Google Business Profile (formerly Google My Business) is a free tool that lets you manage how your business appears on Google Search and Maps. When someone searches "plumber Santa Barbara" or "best dentist near me," your GBP listing determines whether you appear — and how prominently.</p>

<h2>Step 1: Claim and Verify Your Business</h2>
<p>Go to business.google.com and claim your listing. Google will verify you're the owner via postcard, phone, or email. Warning: Many businesses have unclaimed or duplicate listings. If you have a duplicate, request a merge from Google to consolidate your reviews and ranking authority.</p>

<h2>Step 2: Complete Every Field</h2>
<p>Google rewards completeness. Profiles that are 100% complete receive 7x more clicks than incomplete ones. Make sure you have:</p>
<ul>
  <li><strong>Business name:</strong> Your exact legal name — no keyword stuffing</li>
  <li><strong>Category:</strong> Your most specific primary category</li>
  <li><strong>Address:</strong> Must match your website and all directory listings exactly</li>
  <li><strong>Phone:</strong> Local 805 number ideally</li>
  <li><strong>Hours:</strong> Keep updated including holidays</li>
  <li><strong>Description:</strong> 200-300 words naturally including your services and city</li>
</ul>

<h2>Step 3: Upload Photos Consistently</h2>
<p>Businesses with photos receive 42% more requests for directions and 35% more website clicks. Aim for 20+ photos minimum, and add new ones monthly.</p>

<h2>Step 4: Generate Reviews Systematically</h2>
<p>Reviews are a major ranking AND conversion factor. Simply ask satisfied customers directly — "Would you mind leaving us a Google review? It takes 30 seconds." Then send them your direct review link.</p>

<h2>Step 5: Post Weekly</h2>
<p>Google Posts appear directly on your listing. Post about offers, new services, completed projects, or seasonal tips. Fresh activity signals an active, relevant business to Google's algorithm.</p>

<h2>Step 6: Use the Q&A Section</h2>
<p>The Questions & Answers section on your GBP is often ignored. Seed it yourself — ask and answer your own most common questions. This real estate appears prominently on your listing and helps searchers choose you.</p>
    `,
  },

  "google-maps-ranking": {
    slug: "google-maps-ranking",
    title: "How to Rank #1 on Google Maps in Santa Barbara (The 2026 Guide)",
    excerpt: "The Google Maps 3-Pack gets 44% of all clicks on a local search. Here's exactly how to get your business into the top 3.",
    category: "Google Business Profile",
    date: "Feb 10, 2026",
    readTime: "7 min read",
    author: "Ruben",
    authorTitle: "Founder, Rankingsb",
    image: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=1200&h=600&fit=crop",
    tags: ["Google Maps", "Local Pack", "Local SEO", "Rankings"],
    relatedSlugs: ["google-business-profile-guide", "get-more-reviews", "local-citation-sites"],
    content: `
<p class="lead">The Google Maps 3-Pack — the three map listings that appear above organic results — is the most valuable real estate in local search. If you're not in it, you're missing up to 44% of clicks before potential customers even see your website.</p>

<h2>How Google Decides Who Ranks in the 3-Pack</h2>
<p>Google uses three main factors to determine local rankings:</p>
<ul>
  <li><strong>Relevance:</strong> How well your GBP and website match what the searcher is looking for</li>
  <li><strong>Distance:</strong> How close your business is to the searcher (or the location they searched)</li>
  <li><strong>Prominence:</strong> How well-known your business is online — reviews, citations, links, website authority</li>
</ul>
<p>You can't change your physical location, but you can dramatically improve relevance and prominence.</p>

<h2>The 7 Factors That Move You Up the Map</h2>

<h3>1. Google Business Profile Completeness</h3>
<p>A 100% complete GBP with the right primary category is your foundation. Choose the most specific category available for your business type.</p>

<h3>2. Review Quantity and Quality</h3>
<p>Volume matters — 50+ reviews is the threshold where rankings start to climb noticeably. Quality matters too: detailed reviews that mention your services and location carry more weight than one-word reviews.</p>

<h3>3. Review Recency</h3>
<p>Fresh reviews signal an active business. A business with 100 reviews, 80 of which are from 3 years ago, can lose to a competitor with 30 reviews all from the last 6 months.</p>

<h3>4. Citation Consistency</h3>
<p>Your NAP (name, address, phone) must be identical across every directory — Yelp, Bing, Apple Maps, YellowPages, and 40+ others. One discrepancy can undermine your entire local presence.</p>

<h3>5. Website Local Signals</h3>
<p>Your website should mention your city and service naturally. Have a clear address in the footer. Embed a Google Map on your contact page. These signals reinforce to Google that you're a real local business.</p>

<h3>6. Engagement Signals</h3>
<p>When people click your listing, request directions, or call from GBP, Google notices. More engagement = higher rankings. This is why photos matter — they drive clicks.</p>

<h3>7. Local Links</h3>
<p>Links from local websites (Santa Barbara News-Press, Ventura County Star, local blogs, chamber sites) are gold. Even one quality local link can move your rankings significantly.</p>

<h2>The Proximity Problem</h2>
<p>Google heavily weights proximity — if a searcher is in Montecito, businesses in Montecito will rank above businesses in downtown Santa Barbara. This is why businesses with a physical presence in target neighborhoods have a natural advantage.</p>
<p>If you serve multiple areas, the best strategy is to show up in the map pack for your primary location and rank organically for surrounding cities using landing pages.</p>
    `,
  },

  "get-more-reviews": {
    slug: "get-more-reviews",
    title: "How to Get More Google Reviews (Without Begging or Paying for Them)",
    excerpt: "93% of customers read reviews before choosing a local business. Here's a proven system to generate a steady stream of authentic 5-star reviews.",
    category: "Reputation Management",
    date: "Feb 5, 2026",
    readTime: "6 min read",
    author: "Ruben",
    authorTitle: "Founder, Rankingsb",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=600&fit=crop",
    tags: ["Reviews", "Reputation", "Google Business Profile", "Trust"],
    relatedSlugs: ["google-business-profile-guide", "google-maps-ranking"],
    content: `
<p class="lead">Reviews are the single most under-utilized growth tool for local businesses. 93% of customers read reviews before making a decision — and Google factors review volume, recency, and rating directly into your map rankings.</p>

<h2>Why Most Businesses Fail at Reviews</h2>
<p>The #1 reason businesses have few reviews isn't that customers are unhappy. It's that <strong>happy customers don't think to leave reviews unless prompted.</strong> Unhappy customers, on the other hand, are naturally motivated. This creates a skewed sample — and the fix is simple: ask.</p>

<h2>The 5-Step Review Generation System</h2>

<h3>Step 1: Get Your Review Link</h3>
<p>Go to your Google Business Profile, click "Get more reviews," and copy your unique review link. Make it short using bit.ly or a custom domain redirect. This link skips all the friction and takes customers directly to the review form.</p>

<h3>Step 2: Ask at the Moment of Peak Happiness</h3>
<p>The best time to ask is immediately after a great experience — when the job is done, the meal is finished, or the service is complete. Don't wait days or weeks. Say: "If you're happy with everything today, it would mean a lot if you left us a quick Google review. Takes about 30 seconds."</p>

<h3>Step 3: Text the Link</h3>
<p>Most people will say yes in person, then forget. The solution: text them the link right away. "Hi [Name], it was great working with you! Here's that Google review link I mentioned: [link]" Texted review requests convert at 3-5x higher than emailed ones.</p>

<h3>Step 4: Automate with Your CRM</h3>
<p>If you use GoHighLevel, set up an automated review request sequence triggered when a job is marked complete. The system sends a text 2 hours after completion, then a follow-up 24 hours later if no review was left. This alone can generate 10-20 new reviews per month on autopilot.</p>

<h3>Step 5: Respond to Every Review</h3>
<p>Responding to reviews is a ranking signal AND a conversion signal for future customers. Respond to 5-star reviews with genuine gratitude and a mention of what you did. Respond to negative reviews professionally and offer to make it right. Never argue.</p>

<h2>What NOT to Do</h2>
<ul>
  <li><strong>Never buy reviews</strong> — Google detects them and can remove your entire listing</li>
  <li><strong>Never review-gate</strong> — don't filter to only send happy customers to Google (it violates Google's policies)</li>
  <li><strong>Never review-stuff</strong> — asking employees or family to leave reviews can be flagged</li>
  <li><strong>Never incentivize</strong> — offering discounts for reviews violates both Google and FTC guidelines</li>
</ul>

<h2>How Many Reviews Do You Need?</h2>
<p>To be competitive in most Santa Barbara industries: 25+ reviews puts you in the game. 50+ reviews at 4.5+ stars puts you in the top tier. 100+ reviews makes you nearly impossible to displace.</p>
    `,
  },

  "seo-vs-google-ads": {
    slug: "seo-vs-google-ads",
    title: "SEO vs Google Ads: Which Should Your Santa Barbara Business Choose?",
    excerpt: "Both drive traffic — but they work very differently. Here's an honest breakdown of when to use each, and why most businesses need both.",
    category: "Strategy",
    date: "Jan 28, 2026",
    readTime: "7 min read",
    author: "Ruben",
    authorTitle: "Founder, Rankingsb",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop",
    tags: ["Google Ads", "PPC", "SEO", "Strategy"],
    relatedSlugs: ["santa-barbara-seo-guide", "google-business-profile-guide"],
    content: `
<p class="lead">The most common question we get from new clients: "Should I run Google Ads or invest in SEO?" The honest answer: it depends on where you are in your business lifecycle. Here's the full breakdown.</p>

<h2>The Core Difference</h2>
<p><strong>SEO</strong> builds organic rankings over time. You don't pay per click — you earn visibility through relevance, authority, and optimization. Results take 3-6 months but are compounding and "free" once achieved.</p>
<p><strong>Google Ads</strong> buys immediate visibility. You appear at the top of search results the day you launch. But the moment you stop paying, you disappear completely.</p>

<h2>When Google Ads Makes More Sense</h2>
<ul>
  <li><strong>You need leads now</strong> — brand new business, slow season, or launching a new service</li>
  <li><strong>You're in an emergency-service industry</strong> — plumbers, locksmiths, emergency electricians. When someone's pipe bursts, they call the first result they see.</li>
  <li><strong>You're testing a new market</strong> — ads let you validate a new service offering before investing months into SEO</li>
  <li><strong>Your competitors dominate organically</strong> — sometimes you need to buy your way in while building organic authority</li>
</ul>

<h2>When SEO Makes More Sense</h2>
<ul>
  <li><strong>You have a 6+ month runway</strong> — SEO is an investment with delayed returns</li>
  <li><strong>Your keywords are expensive</strong> — "personal injury attorney Santa Barbara" can cost $25-50 per click. SEO makes that traffic free.</li>
  <li><strong>You're building a long-term asset</strong> — good SEO compounds. Year 3 traffic is dramatically higher than year 1 for the same investment.</li>
  <li><strong>You serve a research-heavy market</strong> — real estate, medical, legal. Customers research extensively and trust organic results more than ads.</li>
</ul>

<h2>Why Most Businesses Need Both</h2>
<p>The most effective strategy combines both channels:</p>
<ol>
  <li>Use Google Ads immediately for your highest-value keywords to generate revenue while SEO builds</li>
  <li>As SEO rankings improve, shift budget from Ads to organic — maintaining Ads only for keywords where the ROI still makes sense</li>
  <li>Use Ads data (which keywords convert, which landing pages work) to inform your SEO strategy</li>
</ol>
<p>At Rankingsb, we typically recommend starting with a combination of local SEO + Google Business Profile optimization for most small businesses in Santa Barbara. Ads work better as an amplifier once your organic foundation is built.</p>
    `,
  },

  "local-citation-sites": {
    slug: "local-citation-sites",
    title: "The 30 Most Important Citation Sites for Santa Barbara Businesses",
    excerpt: "Citations — mentions of your business name, address, and phone across the web — are a major local ranking factor. Here are the ones that matter most.",
    category: "Local SEO",
    date: "Jan 20, 2026",
    readTime: "5 min read",
    author: "Ruben",
    authorTitle: "Founder, Rankingsb",
    image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=1200&h=600&fit=crop",
    tags: ["Citations", "Local SEO", "Yelp", "Directories"],
    relatedSlugs: ["google-maps-ranking", "google-business-profile-guide"],
    content: `
<p class="lead">Citations — mentions of your business name, address, and phone number (NAP) on external websites — are one of the top local ranking factors Google uses to determine your position in local search results.</p>

<h2>Why Citations Matter</h2>
<p>Think of citations as votes of confidence from the web that say "this business exists at this address." The more consistent citations you have, the more confidence Google has in showing your business to searchers.</p>
<p>Consistency is critical. If your address appears as "Suite 150" in some places and "Ste. 150" in others, or your phone number uses different formatting, those inconsistencies dilute your citation authority.</p>

<h2>Tier 1: The Must-Haves (Do These First)</h2>
<ol>
  <li><strong>Google Business Profile</strong> — business.google.com</li>
  <li><strong>Bing Places</strong> — bingplaces.com</li>
  <li><strong>Apple Maps</strong> — mapsconnect.apple.com</li>
  <li><strong>Yelp</strong> — biz.yelp.com</li>
  <li><strong>Facebook Business</strong> — facebook.com/business</li>
  <li><strong>Better Business Bureau</strong> — bbb.org</li>
  <li><strong>Chamber of Commerce</strong> — Santa Barbara Chamber, Ventura Chamber</li>
</ol>

<h2>Tier 2: High-Authority General Directories</h2>
<ol start="8">
  <li>YellowPages.com</li>
  <li>Foursquare / Factual</li>
  <li>Manta.com</li>
  <li>Superpages.com</li>
  <li>CitySearch</li>
  <li>MerchantCircle</li>
  <li>Angi (formerly Angie's List)</li>
  <li>HomeAdvisor</li>
  <li>Thumbtack</li>
  <li>Nextdoor Business</li>
  <li>Alignable</li>
</ol>

<h2>Tier 3: Industry-Specific Directories</h2>
<p>Beyond general directories, get listed in directories specific to your industry. For example:</p>
<ul>
  <li><strong>Restaurants:</strong> OpenTable, Zomato, TripAdvisor, Grubhub</li>
  <li><strong>Medical/Dental:</strong> Healthgrades, Zocdoc, WebMD, Vitals</li>
  <li><strong>Legal:</strong> Avvo, Justia, FindLaw, Martindale-Hubbell</li>
  <li><strong>Home Services:</strong> Angi, HomeAdvisor, Houzz, BuildZoom</li>
  <li><strong>Beauty/Wellness:</strong> StyleSeat, Vagaro, MindBody</li>
</ul>

<h2>The NAP Consistency Rule</h2>
<p>Use exactly the same business name, address, and phone number on every listing. Decide on your "official" format before you start and stick to it:</p>
<ul>
  <li>Business name: "Rankingsb" (not "Ranking SB" or "RankingSB")</li>
  <li>Address: "10 E. Yanonali Street Suite 150, Santa Barbara, CA 93101"</li>
  <li>Phone: "(805) 307-7600" (keep formatting consistent)</li>
</ul>

<h2>How to Build Citations Efficiently</h2>
<p>Manual citation building is tedious. At Rankingsb, we use citation management tools to build and monitor citations across 40+ directories simultaneously — ensuring consistency and catching any incorrect listings that pop up. Most clients see ranking improvements within 30-60 days of a full citation audit and build.</p>
    `,
  },

  "electrician-seo-guide": {
    slug: "electrician-seo-guide",
    title: "SEO for Electricians in Santa Barbara & Ventura County: A Complete Guide",
    excerpt: "Electrical work is one of the most searched home service categories. Here's how to make sure your electrical business shows up first.",
    category: "Industry SEO",
    date: "Jan 15, 2026",
    readTime: "8 min read",
    author: "Ruben",
    authorTitle: "Founder, Rankingsb",
    image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=1200&h=600&fit=crop",
    tags: ["Electrician", "Industry SEO", "Home Services", "Local SEO"],
    relatedSlugs: ["google-business-profile-guide", "get-more-reviews", "local-citation-sites"],
    content: `
<p class="lead">Electrical services are searched over 40,000 times per month in the Santa Barbara/Ventura County area. Whether it's "electrician near me," "panel upgrade Santa Barbara," or "EV charger installation Thousand Oaks," customers go straight to Google when they need electrical work.</p>

<h2>The Electrical SEO Opportunity</h2>
<p>Electrical contracting is one of the most lucrative industries for local SEO because:</p>
<ul>
  <li>High average job values ($500-$10,000+)</li>
  <li>Emergency searches convert immediately — caller intent is as high as it gets</li>
  <li>Most electricians have terrible websites and weak online presence — the bar to outrank them is low</li>
  <li>EV charger installation is an exploding new keyword category nobody is targeting yet</li>
</ul>

<h2>The Keywords That Matter Most</h2>
<p>Build separate pages targeting each of these keyword groups:</p>
<ul>
  <li><strong>Emergency/urgent:</strong> "emergency electrician Santa Barbara," "24 hour electrician near me"</li>
  <li><strong>Panel services:</strong> "electrical panel upgrade Ventura," "panel replacement Santa Barbara"</li>
  <li><strong>EV charging:</strong> "EV charger installation Santa Barbara," "Tesla charger installation Thousand Oaks"</li>
  <li><strong>Residential:</strong> "residential electrician," "home rewiring," "outlet installation"</li>
  <li><strong>Commercial:</strong> "commercial electrician Santa Barbara," "office electrical contractor"</li>
  <li><strong>Location + service combos:</strong> "electrician Camarillo," "electrician Oxnard," "Goleta electrician"</li>
</ul>

<h2>The 5-Step Electrician SEO Plan</h2>

<h3>Step 1: Optimize Your Google Business Profile</h3>
<p>Set your primary category to "Electrician." Add secondary categories for your specialties. Upload photos of your trucks, crew, completed jobs, and before/after panel work. Get to 50+ reviews ASAP.</p>

<h3>Step 2: Build Service Pages</h3>
<p>Create individual pages for each service: residential, commercial, panel upgrades, EV chargers, generator installation, etc. Each page should target a specific keyword and include local city references.</p>

<h3>Step 3: Create Location Pages</h3>
<p>If you serve multiple cities, build a page for each: "Electrician in Thousand Oaks," "Electrician in Camarillo," etc. Real, unique content — not just swapped city names.</p>

<h3>Step 4: Build Citations</h3>
<p>Get listed on Angi, HomeAdvisor, Houzz, and BuildZoom in addition to the standard directories. These industry-specific sites carry extra weight for service contractors.</p>

<h3>Step 5: Get Reviews Mentioning Specific Services</h3>
<p>Reviews that say "They installed our EV charger in Thousand Oaks — great job!" are worth more than generic reviews because they reinforce your keyword relevance for that service and location.</p>

<h2>The EV Charger Opportunity</h2>
<p>EV charger installation searches have grown 300%+ in the last 2 years in California. Most electricians aren't targeting this keyword yet. A single well-optimized page for "EV charger installation [city]" can bring in significant leads for high-value jobs ($1,500-$3,000 each) with almost no competition.</p>
    `,
  },

  "hvac-seasonal-seo": {
    slug: "hvac-seasonal-seo",
    title: "HVAC Seasonal SEO: How to Capture Every AC Repair and Heating Search in the 805",
    excerpt: "HVAC businesses have massive seasonal traffic spikes. Here's how to be #1 when customers urgently need you — whether it's summer heat or a cold December night.",
    category: "Industry SEO",
    date: "Jan 10, 2026",
    readTime: "6 min read",
    author: "Ruben",
    authorTitle: "Founder, Rankingsb",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&h=600&fit=crop",
    tags: ["HVAC", "Seasonal SEO", "Industry SEO", "Home Services"],
    relatedSlugs: ["electrician-seo-guide", "google-maps-ranking", "get-more-reviews"],
    content: `
<p class="lead">HVAC is one of the most seasonal businesses in any market. In the Santa Barbara and Ventura County area, AC repair searches spike 400% in June-August. Heating searches spike November-January. If you're not ranking when the season hits, you're handing thousands of dollars to your competitors.</p>

<h2>The Seasonal Search Pattern</h2>
<p>Here's what the yearly HVAC search cycle looks like in the 805 area:</p>
<ul>
  <li><strong>March-April:</strong> AC tune-up and maintenance searches begin</li>
  <li><strong>May-June:</strong> "AC not cooling" and "air conditioning repair" spike</li>
  <li><strong>July-August:</strong> Peak season — emergency searches, installations, all at maximum volume</li>
  <li><strong>September:</strong> Furnace tune-up and heating prep searches begin</li>
  <li><strong>October-November:</strong> Heating repair and installation peak</li>
  <li><strong>December-January:</strong> Emergency heating calls, "heater not working" searches</li>
</ul>
<p>The key insight: <strong>you need to start your SEO push 2-3 months before the season hits.</strong> If you start optimizing for AC in July, you're too late. The businesses ranking in July started their SEO in April.</p>

<h2>The HVAC Keyword Strategy</h2>
<p>Build separate optimized pages for:</p>
<ul>
  <li>"AC repair [city]" — every city you serve</li>
  <li>"Air conditioning installation Santa Barbara"</li>
  <li>"Furnace repair [city]"</li>
  <li>"HVAC tune-up Santa Barbara"</li>
  <li>"Emergency HVAC repair 24 hour"</li>
  <li>"Mini split installation Ventura County"</li>
  <li>"Heat pump installation Santa Barbara"</li>
</ul>

<h2>Local HVAC SEO Tactics That Work</h2>

<h3>Emergency Keywords Are Gold</h3>
<p>"HVAC emergency near me" and "AC broken need help today" are some of the highest-converting searches in any industry. These searchers call immediately — they don't shop around. Being #1 for emergency searches alone can be worth $10,000+ per month in additional revenue during peak season.</p>

<h3>Brand Your Service Area</h3>
<p>Create a dedicated page for every city and ZIP code you serve. "HVAC repair Camarillo" and "air conditioning Thousand Oaks" are different searches from different customers — give each its own page.</p>

<h3>Content Calendar Around Seasons</h3>
<p>Publish blog posts on a seasonal schedule:</p>
<ul>
  <li>March: "5 Signs Your AC Needs a Tune-Up Before Summer"</li>
  <li>June: "What to Do When Your AC Stops Working in Summer"</li>
  <li>September: "Is Your Heater Ready for Winter? HVAC Checklist for Santa Barbara Homeowners"</li>
  <li>November: "Emergency Heating Repair vs. Replacement: How to Decide"</li>
</ul>
<p>These posts rank for informational queries and warm up readers to call you when they have a problem.</p>

<h2>Reviews During Peak Season</h2>
<p>Your busiest months are also your biggest review-generation opportunity. Set up an automated text that goes out to every completed job during summer — "Thanks for choosing us! If we helped you stay cool today, we'd love a Google review: [link]" — and watch your review count climb.</p>
    `,
  },
}

// ─── EXPORTED FUNCTIONS ────────────────────────────────────────────────────────

export function getAllPosts(): BlogPost[] {
  return BLOG_SLUGS
    .map(slug => posts[slug])
    .filter(Boolean)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string): BlogPost | null {
  return posts[slug] ?? null
}

export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  const post = posts[slug]
  if (!post?.relatedSlugs) return []
  return post.relatedSlugs
    .slice(0, limit)
    .map(s => posts[s])
    .filter(Boolean)
}

export function getPostsByCategory(category: string): BlogPost[] {
  return getAllPosts().filter(p => p.category === category)
}

export function getAllCategories(): string[] {
  return [...new Set(getAllPosts().map(p => p.category))]
}
