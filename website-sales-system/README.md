# Website Sales System

**$500 Website Sales Automation for Southern California Local Businesses**

---

## Overview

This system automates the entire process of finding local businesses without websites, creating preview mockups, outreach, and closing deals for $500 website builds.

### The Workflow

1. **Prospect Research** — Find 20 businesses/day in SoCal without websites
2. **Mockup Generation** — Create custom homepage previews with their branding
3. **Outreach** — Send 100 messages/day (email, SMS, WhatsApp)
4. **Sales** — Handle objections, send payment links, close deals
5. **Handoff** — Notify team when payment received, build the site

---

## Pricing Structure

| Package | Price | Includes |
|---------|-------|----------|
| **Base** | $500 one-time | 5-page website, custom design, 7-day delivery |
| **Hosting** | $39/month | Hosting + minor updates |
| **Extra Pages** | $50 each | Additional pages beyond the 5 included |
| **Priority** | +$150 | 3-day delivery instead of 7 |

---

## System Components

### Core Scripts

| Script | Purpose |
|--------|---------|
| `scripts/system.js` | Main orchestrator — ties everything together |
| `scripts/prospect-scraper.js` | Find and manage prospects |
| `scripts/mockup-generator.js` | Create homepage previews |
| `scripts/outreach-engine.js` | Generate email/SMS/WhatsApp sequences |
| `scripts/payment-handler.js` | Stripe integration and order management |

### Data Directories

```
website-sales-system/
├── prospects/     # JSON files for each prospect
├── mockups/       # HTML preview files
├── orders/        # Order records
├── logs/          # Outreach activity logs
├── dashboard/     # Web dashboard
└── templates/     # Email/SMS templates
```

---

## Getting Started

### 1. Install Dependencies

```bash
cd website-sales-system
npm init -y
npm install stripe node-fetch
```

### 2. Configure Environment

Edit `.env` with your actual API keys:

```bash
# Required
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...

# Optional (for SMS/WhatsApp)
TWILIO_ACCOUNT_SID=...
TWILIO_AUTH_TOKEN=...
```

### 3. Run the System

```bash
# View stats
node scripts/system.js stats

# View dashboard data
node scripts/system.js dashboard

# Run full daily workflow
node scripts/system.js run
```

---

## Daily Targets

| Metric | Target |
|--------|--------|
| New prospects researched | 20 |
| Mockups created | 5 |
| Outreach messages sent | 100 |
| Expected responses | 10-15 |
| Expected meetings | 3-5 |
| Expected closes | 1-2 |

**Revenue target:** $500-1000/day

---

## Pipeline Stages

1. **Prospect Found** → Research complete
2. **Mockup Created** → Preview ready
3. **Outreach Sent** → Initial contact made
4. **Engaged** → Prospect responded
5. **Meeting Scheduled** → Call/demo booked
6. **Proposal Sent** → Payment link shared
7. **Payment Received** → Stripe webhook triggered
8. **In Production** → Handed to Ruben
9. **Delivered** → Site live
10. **Hosting Active** → $39/mo recurring

---

## Sales Scripts

### Initial Email

```
Subject: Your {businessName} deserves a professional website

Hi {contactName},

I came across {businessName} while searching for {category} businesses in {city}. I noticed you don't currently have a website, and I wanted to reach out because I think you're missing out on potential customers.

I've created a quick preview of what your website could look like:
👉 {previewUrl}

Here's what I'm offering:
✅ Professional 5-page website ($500 one-time)
✅ Custom design with your branding
✅ Mobile-friendly and fast
✅ 7-day delivery
✅ $39/month hosting included

No risk - you only pay when you're happy with the design.

Interested? Reply to this email or call me at 805-307-7600.

Best,
Ruben
```

### Phone Close

```
"Here's what I'm proposing: For $500, I'll build you a complete 5-page 
website based on that preview. You saw the quality - custom design, your 
branding, mobile-friendly. $39/month covers hosting and any small updates. 
I can have it live in 7 days."

"I'm sending you the secure payment link now. Once you complete it, I'll 
send you a quick questionnaire to gather your final details, and we'll be 
live in 7 days."
```

---

## Common Objections & Rebuttals

| Objection | Rebuttal |
|-----------|----------|
| "Too expensive" | "$500 is less than $2/day over the first year. One new customer typically covers that cost." |
| "Don't need a website" | "76% of people search online before choosing a {category}. Your competitors with websites are getting those calls." |
| "Already have Facebook" | "You don't own that platform. Plus, many people don't use Facebook or trust business pages there." |
| "Too busy" | "A website works 24/7 answering questions while you focus on the work. Setup takes 30 minutes." |
| "Need to think about it" | "I'll keep your preview active for 7 more days. I'll follow up next week." |

---

## Payment Links

- **Base Package ($500):** `https://buy.stripe.com/mk_1T07I7EuKXuKfbciRJp9zBcw`
- **With Upsells:** `https://buy.stripe.com/mk_1T07IHEuKXuKfbciiKrAIogv`

---

## Dashboard

Open `dashboard/index.html` in your browser to view:
- Total prospects and pipeline status
- Today's outreach progress
- Revenue stats
- Recent activity

Or integrate into main dashboard with:
```html
<a href="website-sales-system/dashboard/index.html" class="nav-button">
  🚀 Website Sales
</a>
```

---

## Automation

### Cron Job (Daily at 9 AM)

```bash
0 9 * * * cd /Users/rubenruiz/.openclaw/workspace/website-sales-system && node scripts/system.js run >> logs/cron.log 2>&1
```

### Stripe Webhook

Set up webhook endpoint to handle `checkout.session.completed` events:
```javascript
// POST /webhook/stripe
const result = paymentHandler.processWebhook(payload);
```

---

## Team Handoff

When payment received:
1. ✅ Stripe webhook fires
2. ✅ Discord alert sent to #sales-alerts
3. ✅ SMS sent to Ruben: "New $500 order: [Business Name]"
4. ✅ GHL opportunity created in "In Production" stage
5. Ruben builds remaining 4 pages + any upsells
6. Mark complete in GHL

---

## Target Geography

**Southern California:**
- Santa Barbara County
- Ventura County
- Los Angeles County
- Orange County
- San Diego County

---

## Business Categories (Priority)

1. **Contractors** (HVAC, plumbing, electrical, roofing, solar)
2. **Home Services** (landscaping, cleaning, pest control)
3. **Restaurants** (local, independent)
4. **Retail** (local shops, boutiques)
5. **Professional Services** (accountants, lawyers, consultants)
6. **Medical** (dentists, chiropractors, therapists)
7. **Automotive** (mechanics, detailers, body shops)

---

## Support

For issues or questions:
1. Check logs in `logs/` directory
2. Run `node scripts/system.js stats` for diagnostics
3. Review this README for common solutions

---

*System Version: 1.0*
*Built: February 23, 2026*
