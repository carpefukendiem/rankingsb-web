# GHL Automation Framework

**Status:** 🟢 LIVE — Deployed Feb 17, 2026  
**Platform:** GoHighLevel (GHL)  
**Agency:** Rankingsb  

---

## Framework Overview

A clean, reusable set of GHL snapshots, automations, and SOPs for client onboarding + retention.

**Goal:** Reduce manual work, improve client experience, scale without chaos.

---

## Pipeline Structure

### 9-Stage Sales Pipeline (Rankingsb)

| Stage | Purpose | Automation |
|-------|---------|------------|
| 1. Cold Lead | Database, uncontacted | None |
| 2. Contacted | Call attempted | SMS reminder if no response (24h) |
| 3. Engaged | Conversation started | Move to "Audit Scheduled" on booking |
| 4. Audit Scheduled | Meeting booked | GHL calendar → pipeline sync |
| 5. Audit Completed | Review call done | Auto-tag: "Audit Done" |
| 6. Proposal Sent | Pricing delivered | Follow-up sequence (3 touches) |
| 7. Negotiating | Objections handled | Task for rep to follow up |
| 8. Closed Won | 🎉 New client! | Onboarding automation triggers |
| 9. Closed Lost | Nurture for later | Move to long-term nurture |

---

## Core Automations (v1)

### 1. Missed Call Text-Back
**Trigger:** Incoming call, no answer  
**Action:** SMS sent immediately  
```
"Hi [Name], sorry we missed you! This is [Rep] from Rankingsb. 
Wanted to chat about your free audit. Call back or reply here. 
— [Rep], 805-XXX-XXXX"
```

### 2. New Lead Instant Response
**Trigger:** Form submitted / Lead created  
**Actions:**
1. SMS: "Thanks [Name]! [Rep] will call you within 24 hours..."
2. Internal notification (Discord + SMS to Ruben)
3. Task assigned to sales rep

### 3. Appointment Reminders
**Trigger:** 24 hours before booked call  
**Action:** SMS + Email reminder

### 4. No-Show Reactivation
**Trigger:** Meeting marked "no-show"  
**Action:** SMS: "Missed you! Reschedule here: [link]"

### 5. Review Request Sequence
**Trigger:** Client closed 30 days  
**Action:** 3-email sequence requesting Google review

---

## User Roles

### Sales Rep (Sal)
- **Access:** Pipeline only (no admin)
- **Permissions:** Add/edit leads, move stages, log calls
- **View:** Own leads only

### Admin (Ruben)
- **Access:** Full account
- **Permissions:** All pipelines, settings, billing
- **View:** All data, reports

---

## Intake Flow

### Calendar Booking (Primary)
1. Prospects visit: `link.rankingsb.com/widget/booking/RqgaExQNQEtVAr22AxVz`
2. Micro-qualifier fields:
   - Business type (dropdown)
   - City/location (text)
   - Current monthly revenue (range)
3. Calendar shows available slots
4. Booking → GHL → Pipeline (Stage 4: Audit Scheduled)

### Manual Lead Entry (Sales Rep)
1. Rep adds lead to GHL
2. Assigns to self
3. Sets stage: "Cold Lead" or "Contacted"
4. Logs first call attempt

---

## Snapshot Structure

### Reusable Elements (Per Client)
- Pipeline stages (customizable)
- Tags: `audit-completed`, `hot-lead`, `nurture`
- Custom fields: `industry`, `lead_source`, `audit_date`
- Automations: Triggered by tags/stages

### Snapshot Export
**Location:** GHL → Settings → Snapshots → Export  
**Use:** Rapid deployment for new sub-accounts

---

## Notifications & Alerts

### Discord Integration
- **Channel:** #hot-leads
- **Triggers:** 
  - New lead created
  - Stage changed to "Audit Scheduled"
  - Stage changed to "Closed Won"

### SMS Alerts (Ruben)
- **Triggers:**
  - Hot lead (high-value prospect)
  - Deal closed
  - Urgent follow-up needed

---

## SOP: Adding a New Client

1. **Create sub-account** (if new client)
2. **Import snapshot** (pipeline + automations)
3. **Customize:**
   - Update business name/logo
   - Set custom fields
   - Configure calendar booking link
4. **Add users** (client contacts)
5. **Test:** Submit test lead, verify automation
6. **Go live:** Hand off to sales rep

---

## Content Publishing Workflow

### Blog Posts (SEO Articles)
**Status:** 20 articles prepared, awaiting publication
**Location:** `content/seo-articles/`

**Publishing Options:**
1. **API (Preferred):** Requires `blogs/post.write` OAuth scope
2. **Browser Automation:** Using Chrome extension for bulk upload
3. **Manual:** Copy-paste into GHL blog editor

**Planned Content Calendar:**
- Week 1: 5 articles (HVAC, Plumbing, Roofing focus)
- Week 2: 5 articles (Solar, Appliance Repair)
- Week 3: 5 articles (Medical/Dental)
- Week 4: 5 articles (Legal/Professional services)

### Social Media
**Status:** 10 posts + 12 images generated
**Location:** `content/social-media-images/week1/`
**Action:** Upload to GHL Social Planner

---

## Maintenance Tasks

### Weekly
- [ ] Review pipeline for stalled leads
- [ ] Check automation logs for errors
- [ ] Tag cleanup (remove outdated tags)
- [ ] Publish 2-3 blog articles

### Monthly
- [ ] Snapshot backup (export)
- [ ] Performance review (conversion rates)
- [ ] Automation optimization

---

## Troubleshooting

**Lead not triggering automation:**
→ Check tag assignment → Verify trigger conditions

**SMS not sending:**
→ Verify phone number format → Check Twilio credits

**Calendar not syncing:**
→ Re-authenticate Google Calendar → Check webhook settings

---

## Next Improvements

- [ ] Advanced nurture sequences (6-month)
- [ ] Zapier integration (external tools)
- [ ] Custom dashboard for Ruben
- [ ] Automated reporting (weekly email)
- [ ] Blog publishing API integration (OAuth scope: blogs/post.write)

---

*Last updated: February 19, 2026 — Week 2 Active*
