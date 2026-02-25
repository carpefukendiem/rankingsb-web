# GHL Onboarding Pipeline — New Client Workflow
## From "Closed Won" to "Fully Activated"

**Purpose:** Automate new client onboarding for zero-touch handoff  
**Trigger:** Deal moved to "Closed Won" stage  
**Duration:** 14 days (setup + first month)

---

## 🎯 PIPELINE STAGES (Onboarding)

### Stage 1: Payment Received ⏱️ Day 0
**Trigger:** Stripe webhook confirms $500 payment

**Auto-Actions:**
1. Send Slack/Discord notification to Ruben
2. Create onboarding task in GHL
3. Send "Welcome" email to client
4. Generate intake form link
5. Schedule kickoff call (Calendly)

**Email to Client:**
```
Subject: 🎉 Welcome to Rankingsb! Let's get started.

Hi [Name],

Welcome to the Rankingsb family! We're excited to help [Business Name] 
get more customers online.

**WHAT HAPPENS NEXT:**

📞 1. Kickoff Call (15 min)
   Book here: [calendly-link]
   We'll confirm your services, colors, and content.

📝 2. Complete Intake Form (5 min)
   [form-link]
   This helps us build your site faster.

🚀 3. Website Build (5-7 days)
   We'll send you a preview link when it's ready.

🎉 4. Go Live!
   Your new website launches + we submit to Google.

**YOUR ACCOUNT:**
• Setup fee paid: $500 ✅
• Monthly hosting: $39/mo (starts Day 30)
• Support: support@rankingsb.com

Questions? Just reply to this email.

Let's do this!
The Rankingsb Team
```

---

### Stage 2: Intake Complete ⏱️ Day 1-3
**Trigger:** Client submits intake form

**Auto-Actions:**
1. Send confirmation email
2. Create design task for Ruben
3. Update client status to "In Design"

**Intake Form Fields:**
- Business name (confirm spelling)
- Services offered (checklist + custom)
- Business hours
- Address for map
- Phone/Email for contact page
- Brand colors (or "use logo colors")
- Logo file upload
- Photos of work/location/staff
- Social media links
- Special requests

---

### Stage 3: Design in Progress ⏱️ Day 3-7
**Trigger:** Ruben starts build

**Auto-Actions:**
1. Send "Build Started" email
2. Set internal deadline (Day 7)
3. Daily reminder to Ruben (if not complete by Day 6)

**Email to Client:**
```
Subject: We've started building [Business Name]'s website!

Hi [Name],

Great news — we've started building your website!

**TIMELINE:**
• Today: Design phase started
• Day 5: Preview link sent to you
• Day 7: Revisions complete
• Day 8: Site goes live!

**WHAT WE'RE BUILDING:**
✅ Homepage with your services
✅ About page with your story
✅ Services page (based on your intake)
✅ Gallery (using your photos)
✅ Contact page with form + map

You'll get a preview link in 3-4 days. Any questions before then, 
just reply!

— The Rankingsb Team
```

---

### Stage 4: Preview Ready ⏱️ Day 5-7
**Trigger:** Ruben sends preview link

**Auto-Actions:**
1. Send preview email with review instructions
2. Set 48-hour revision deadline
3. If no response in 48h → Send reminder

**Email to Client:**
```
Subject: Your website preview is ready! [Business Name]

Hi [Name],

Your website is ready for review! 🎉

🔗 PREVIEW YOUR SITE: [preview-link]

**WHAT TO LOOK FOR:**
• Spelling of business name
• Phone number accuracy
• Service descriptions
• Photo placement
• Color scheme

**REVISIONS:**
We include 1 round of revisions (up to 5 changes). 
Just reply to this email with your feedback by [date].

**APPROVAL:**
Love it? Just reply "APPROVED" and we'll push it live within 24 hours!

Questions? Call/text: (805) 307-7600

— The Rankingsb Team
```

---

### Stage 5: Revisions ⏱️ Day 7-8
**Trigger:** Client requests changes OR approves

**If Approved:**
- Move to "Launch Prep"
- Send "Launching Soon" email

**If Revisions Requested:**
- Send acknowledgment email
- Create revision task for Ruben
- Set 24-hour turnaround deadline

---

### Stage 6: Launch Prep ⏱️ Day 8
**Trigger:** Client approval received

**Auto-Actions:**
1. Purchase domain (if needed)
2. Set up hosting
3. Configure DNS
4. Install SSL certificate
5. Set up email forwarding (optional)
6. Submit to Google Search Console

**Email to Client:**
```
Subject: [Business Name] is going live tomorrow!

Hi [Name],

We're putting the finishing touches on your website. It goes live 
tomorrow!

**WHAT HAPPENS AT LAUNCH:**
✅ Site goes live at [domain-name].com
✅ SSL certificate installed (secure HTTPS)
✅ Google Search Console submission
✅ Mobile optimization verified
✅ Contact forms tested

**AFTER LAUNCH:**
• Your site will appear in Google within 3-7 days
• You'll receive a monthly ranking report
• Hosting ($39/mo) starts in 30 days

**QUESTIONS?**
Call/text: (805) 307-7600
Email: support@rankingsb.com

Excited to get you online!
— The Rankingsb Team
```

---

### Stage 7: LIVE! 🎉 ⏱️ Day 8-10
**Trigger:** Website published

**Auto-Actions:**
1. Send "You're Live!" email
2. Create monthly hosting subscription
3. Schedule 30-day check-in
4. Move to "Active Client" pipeline

**Email to Client:**
```
Subject: 🚀 [Business Name] is LIVE!

Hi [Name],

Your website is officially live!

🔗 YOUR WEBSITE: https://[domain-name].com

**QUICK WINS:**
1. Visit your site on your phone — it looks great!
2. Click the contact form — test it works
3. Search "[industry] [city]" on Google — you'll be there soon

**WHAT'S INCLUDED:**
✅ 5-page website (live)
✅ Mobile-friendly design
✅ Contact form
✅ Google Maps integration
✅ SSL security
✅ Monthly hosting & maintenance ($39/mo)

**NEXT:**
In 30 days, you'll receive your first ranking report showing how 
many people found you on Google.

**SUPPORT:**
Call/text: (805) 307-7600
Email: support@rankingsb.com

Thanks for trusting us with [Business Name]!
— The Rankingsb Team

P.S. Love your new site? Refer a friend and get $100 off your 
next month!
```

---

### Stage 8: 30-Day Check-in ⏱️ Day 30
**Trigger:** Automated 30 days after launch

**Auto-Actions:**
1. Send ranking report (if available)
2. Send satisfaction survey
3. Request Google review
4. Invoice monthly hosting ($39)

**Email to Client:**
```
Subject: [Business Name] — 30-Day Update + Ranking Report

Hi [Name],

It's been 30 days since [Business Name] went live! Here's your update:

**YOUR RANKINGS:**
• Google impressions: [X]
• Website visits: [X]
• Contact form submissions: [X]

**MONTHLY HOSTING:**
Your $39/mo hosting invoice: [stripe-link]

**QUICK QUESTIONS:**
1. Are you getting more calls since launch?
2. Any changes needed to the site?
3. Would you recommend us? (Google review link: [link])

**REFER A FRIEND:**
Know another business owner who needs a website? Send them our way — 
you'll get $100 off your next month.

Thanks for being a Rankingsb client!
— The Rankingsb Team
```

---

## 🤖 AUTOMATION MAP

```
Closed Won
    ↓
[Webhook Trigger]
    ↓
┌─────────────────────────────────────┐
│ Day 0: Payment Confirmation         │
│ • Slack alert to Ruben              │
│ • Welcome email to client           │
│ • Create onboarding task            │
│ • Generate intake form              │
└─────────────────────────────────────┘
    ↓
┌─────────────────────────────────────┐
│ Day 1-3: Intake Phase               │
│ • Reminder if not completed (Day 2) │
│ • Confirmation when submitted       │
└─────────────────────────────────────┘
    ↓
┌─────────────────────────────────────┐
│ Day 3-7: Build Phase                │
│ • "Build started" email             │
│ • Daily Ruben reminders (if needed) │
│ • Preview link delivery             │
└─────────────────────────────────────┘
    ↓
┌─────────────────────────────────────┐
│ Day 7-8: Revisions & Launch         │
│ • 48-hour reminder (if no response) │
│ • Revision acknowledgment           │
│ • Launch prep (domain, SSL, etc)    │
│ • LIVE notification                 │
└─────────────────────────────────────┘
    ↓
┌─────────────────────────────────────┐
│ Day 30+: Active Client              │
│ • Ranking report                    │
│ • Monthly hosting invoice           │
│ • Satisfaction survey               │
│ • Google review request             │
└─────────────────────────────────────┘
```

---

## 📋 RUBEN'S CHECKLIST (Per Client)

### Day 0 (Payment Received)
- [ ] Review Stripe notification
- [ ] Check intake form submission
- [ ] Book kickoff call (or confirm Calendly)

### Day 1-3 (Intake)
- [ ] Review intake form responses
- [ ] Download logo + photos
- [ ] Confirm brand colors

### Day 3-7 (Build)
- [ ] Create 5 pages
- [ ] Optimize for mobile
- [ ] Test contact forms
- [ ] Send preview link

### Day 7-8 (Launch)
- [ ] Process revisions (if any)
- [ ] Purchase domain (if needed)
- [ ] Configure hosting
- [ ] Install SSL
- [ ] Submit to Google
- [ ] Send "LIVE!" email

### Day 30 (Ongoing)
- [ ] Generate ranking report
- [ ] Send check-in email
- [ ] Invoice hosting

---

## 💰 REVENUE TRACKING

| Metric | Target | Notes |
|--------|--------|-------|
| Setup fee | $500 | One-time |
| Monthly hosting | $39 | Recurring |
| Build time | 7 days | Per site |
| Capacity | 10/mo | Ruben's limit |
| Monthly revenue | $5,000 | 10 setups |
| MRR | $390 | After month 1 |

---

*Created: Feb 25, 2026*  
*Purpose: Automate $500 website client onboarding*  
*Integration: GHL + Stripe + Calendly + Slack*
