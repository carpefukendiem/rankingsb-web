# Website Sales System - Configuration
## $500 Website Sales Automation

---

## Pricing Structure

**Base Package: $500**
- Professional homepage mockup (custom logo + brand colors)
- 5 standard pages: Home, About, Services, Contact, Reviews
- 7-day delivery after payment
- $39/month hosting + minor updates

**Upsells:**
- Extra pages: $50 each
- Priority delivery (3-day): +$150
- Additional revisions: $75

---

## Target Geography
**Southern California Focus:**
- Santa Barbara County
- Ventura County
- Los Angeles County
- Orange County
- San Diego County

---

## Business Categories (Priority Order)
1. **Contractors** (HVAC, plumbing, electrical, roofing, solar)
2. **Home Services** (landscaping, cleaning, pest control)
3. **Restaurants** (local, independent)
4. **Retail** (local shops, boutiques)
5. **Professional Services** (accountants, lawyers, consultants)
6. **Medical** (dentists, chiropractors, therapists)
7. **Automotive** (mechanics, detailers, body shops)

---

## Stripe Configuration
- **Secret Key:** Stored in .env
- **Publishable Key:** pk_live_51T07I1EuKXuKfbciaPCunBYSqgyRF9W7wo0Z6c4pBiFudbETgdmjatmvOc3dlAN80FCCcoeI9uof5UKhKtzh6FWs00da0d0MdU
- **Payment Link IDs:** 
  - mk_1T07I7EuKXuKfbciRJp9zBcw
  - mk_1T07IHEuKXuKfbciiKrAIogv

---

## Mockup Domain
**Primary:** previews.rankingsb.com
**Structure:** previews.rankingsb.com/{business-slug}

---

## Outreach Channels (Priority)
1. **Email** (primary)
2. **SMS** (follow-up)
3. **WhatsApp** (if available)

---

## Daily Targets
- **100 outreaches per day**
- **100 new prospects researched per day**
- 5 mockups generated (for hot prospects)
- 10 follow-ups sent

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

## GHL Integration
- **Pipeline:** "Website Sales"
- **Stage on Payment:** "In Production"
- **Notification:** Discord + SMS to Ruben

---

## Team Handoff
When payment received:
1. Stripe webhook fires
2. Create GHL opportunity in "In Production" stage
3. Send Discord alert to #sales-alerts
4. SMS Ruben: "New $500 website order: [Business Name]"
5. Ruben builds remaining 4 pages + any upsells
6. Mark complete in GHL

---

*System built: February 23, 2026*
