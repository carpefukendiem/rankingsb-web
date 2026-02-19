# GHL Onboarding Pipeline & Automation Map
## Complete System Architecture

---

## 🔄 THE 9-STAGE PIPELINE

### Stage 1: Targeted (Not Contact)
**Trigger:** Lead imported from Spike research or manual entry

**Data Captured:**
- Business name, address, phone
- Website URL
- Industry/service type
- Review count/rating
- GBP status
- Priority score (High/Medium/Low)

**Automation:**
- Auto-assign to Sal (round-robin if multiple reps)
- Add to "New Leads" smart list
- Trigger notification to assigned rep

**Action Required:**
- Rep calls within 24 hours
- Log call outcome in GHL

---

### Stage 2: Contacted (No Response)
**Trigger:** Call made, no answer, voicemail left

**Automation:**
- Send follow-up email with audit (immediately)
- Schedule 3-day follow-up task
- Add to "Follow-Up Required" list

**Action Required:**
- Send voicemail + email
- Mark call outcome

---

### Stage 3: Contacted (Call Back)
**Trigger:** Prospect said "call me back" or requested info

**Automation:**
- Schedule callback task (specific date/time)
- Send promised materials immediately
- Add to "Hot Prospects" list

**Action Required:**
- Complete callback by scheduled time
- Update with conversation notes

---

### Stage 4: Audit Scheduled
**Trigger:** Appointment set for audit review

**Automation:**
- Send calendar invite (Google/Outlook)
- Send reminder 24 hours before
- Send reminder 1 hour before
- Prepare audit report automatically

**Action Required:**
- Conduct audit review call
- Present findings
- Make offer

---

### Stage 5: Audit Completed
**Trigger:** Audit call finished, no sale yet

**Automation:**
- Send proposal email (within 1 hour)
- Schedule 3-day follow-up task
- Add to "Proposal Sent" sequence
- Create deal opportunity ($1,995 value)

**Action Required:**
- Send custom proposal
- Follow up in 3 days

---

### Stage 6: Proposal Sent
**Trigger:** Proposal delivered to prospect

**Automation:**
- Day 3: Follow-up email
- Day 7: "Questions?" email
- Day 14: Case study email
- Day 30: "Should I close your file?" email

**Action Required:**
- Answer questions
- Handle objections
- Push for close

---

### Stage 7: Negotiating
**Trigger:** Prospect interested but has concerns/pricing questions

**Automation:**
- Send comparison sheet (us vs. competitors)
- Send payment plan options (if needed)
- Schedule decision deadline
- Add to "Hot Deals" list

**Action Required:**
- Negotiate terms
- Overcome objections
- Get agreement signed

---

### Stage 8: Closed Won
**Trigger:** Agreement signed, payment collected

**Automation:**
- Send welcome email with onboarding checklist
- Create client project in GHL
- Assign to fulfillment team
- Schedule kickoff call (within 48 hours)
- Trigger "New Client" celebration notification
- Move to "Active Clients" pipeline

**Action Required:**
- Collect payment
- Schedule kickoff
- Begin fulfillment

---

### Stage 9: Closed Lost
**Trigger:** Prospect declined or went silent

**Automation:**
- Send "Thanks for considering us" email
- Add to nurture campaign (monthly newsletter)
- Schedule 90-day re-engagement task
- Log loss reason for reporting

**Action Required:**
- Note why lost (price, timing, competition, etc.)
- Archive for future re-engagement

---

## 🤖 AUTOMATION WORKFLOWS

### Workflow 1: New Lead Intake

```
TRIGGER: New lead added to "Targeted" stage

ACTION 1: Assign to rep (round-robin)
  → Update "Assigned To" field
  → Send notification to rep

ACTION 2: Enrich lead data
  → Pull additional info from website
  → Check social media presence
  → Generate priority score

ACTION 3: Create tasks
  → "Call lead within 24 hours" (Due: +1 day)
  → "Research business" (Due: +2 hours)

ACTION 4: Add to smart list
  → "New Leads This Week"
  → Rep's personal pipeline view
```

### Workflow 2: Post-Call Follow-Up

```
TRIGGER: Call outcome marked "No Answer"

ACTION 1: Immediately
  → Send voicemail + email with audit
  → Log activity in timeline

ACTION 2: +3 Days
  → Send follow-up email: "Did you get my audit?"
  → Create task: "Call again"

ACTION 3: +7 Days
  → Send value-add: case study or tip
  → Create task: "Final follow-up call"

ACTION 4: +30 Days (if no response)
  → Send "Close your file?" email
  → Move to "Nurture" campaign
  → Mark as "Cold Lead"
```

### Workflow 3: Audit Scheduled

```
TRIGGER: Opportunity moved to "Audit Scheduled"

ACTION 1: Immediately
  → Send calendar invite
  → Generate audit report (auto-populate with lead data)
  → Send "What to expect" email

ACTION 2: -24 Hours
  → Send reminder email
  → Send reminder SMS (if opted in)

ACTION 3: -1 Hour
  → Send final reminder
  → Open audit report for rep review

ACTION 4: +1 Hour after scheduled time
  → IF not marked complete: Send "Missed you" email
  → Create task: "Reschedule audit"
```

### Workflow 4: Proposal Sent

```
TRIGGER: Opportunity moved to "Proposal Sent"

ACTION 1: Immediately
  → Send proposal via email
  → Create deal opportunity with value
  → Add to "Proposals This Week" report

ACTION 2: +3 Days
  → Send follow-up: "Questions about the proposal?"
  → Create task: "Call to check in"

ACTION 3: +7 Days
  → Send case study: "How [similar business] got results"

ACTION 4: +14 Days
  → Send FAQ: "Common questions about working with us"

ACTION 5: +30 Days
  → Send "Close your file?" email
  → Create task: "Re-engage in 90 days"
  → Move to "Closed Lost" if no response
```

### Workflow 5: New Client Onboarding

```
TRIGGER: Opportunity moved to "Closed Won"

ACTION 1: Immediately
  → Send welcome email with onboarding checklist
  → Create client project
  → Assign to fulfillment team
  → Send invoice (if not already paid)

ACTION 2: +24 Hours
  → Send kickoff meeting invite
  → Request access: Google Business Profile, website, analytics
  → Send intake questionnaire

ACTION 3: +48 Hours
  → Conduct kickoff call
  → Complete onboarding checklist
  → Begin fulfillment work

ACTION 4: +7 Days
  → First progress update
  → Share initial optimizations made

ACTION 5: +30 Days
  → First monthly report
  → Schedule monthly check-in call
```

### Workflow 6: Hot Lead Alerts

```
TRIGGER: Opportunity priority = "High" AND stage changes

ACTION 1: Immediately
  → Send Discord notification to #hot-leads
  → Send SMS to Ruben (if deal value > $2,000)
  → Log in activity feed

NOTIFICATION FORMAT:
🚨 HOT LEAD ALERT
Business: [Name]
Stage: [New Stage]
Value: $[Amount]
Rep: [Assigned To]
Action: [Required Action]
```

---

## 📊 SMART LISTS (Auto-Updated)

### For Sales Team

**"Today's Calls"**
- Criteria: Stage = "Targeted" OR "Contacted (Call Back)"
- Sorted by: Priority (High → Low), Assigned to (Current User)
- Columns: Business, Phone, Industry, Priority, Last Activity

**"Follow-Up Required"**
- Criteria: Stage = "Contacted (No Response)" AND Last Activity > 3 days
- Sorted by: Last Activity (oldest first)

**"Hot Prospects"**
- Criteria: Stage = "Audit Scheduled" OR "Negotiating"
- Sorted by: Deal Value (highest first)

**"Proposals Pending"**
- Criteria: Stage = "Proposal Sent"
- Sorted by: Date Entered Stage (oldest first)

### For Management

**"Pipeline Health"**
- Shows distribution across all stages
- Highlights bottlenecks

**"Rep Performance"**
- Calls made this week
- Audits scheduled
- Deals closed
- Conversion rates

**"Stale Leads"**
- No activity in 14+ days
- Needs intervention

---

## 🔔 NOTIFICATION RULES

### Rep Notifications

| Trigger | Channel | Timing |
|---------|---------|--------|
| New lead assigned | Email + In-app | Immediately |
| Call task due | In-app + SMS | Morning of |
| Opportunity moved to "Audit Scheduled" | Email | Immediately |
| Proposal not followed up (3 days) | In-app | Day 3 |

### Manager Notifications

| Trigger | Channel | Timing |
|---------|---------|--------|
| High-value deal ($2,000+) moved to "Closed Won" | Discord + SMS | Immediately |
| Deal in "Negotiating" for 7+ days | Discord daily | Daily until moved |
| Rep hasn't made calls today | Discord | 4 PM |
| New lead added (all) | Discord #new-leads | Immediately |

---

## 📈 REPORTING DASHBOARD

### Daily Sales Report (Auto-Generated 6 PM)

```
DAILY SALES REPORT — [Date]
============================

ACTIVITY
• Calls Made: [X]
• Conversations: [X]
• Audits Scheduled: [X]
• Proposals Sent: [X]
• Deals Closed: [X]

PIPELINE MOVEMENT
• New Leads: [X]
• Moved to Contacted: [X]
• Moved to Audit Scheduled: [X]
• Moved to Proposal Sent: [X]
• Moved to Closed Won: [X] ($[Value])

TOP PRIORITIES TOMORROW
1. [Lead Name] — Follow up on proposal
2. [Lead Name] — Conduct scheduled audit
3. [Lead Name] — Call back (requested)

BLOCKERS
• None / [List any issues]
```

### Weekly Pipeline Report (Mondays 8 AM)

```
WEEKLY PIPELINE — Week of [Date]
=================================

STAGE BREAKDOWN
Targeted: [X] leads
Contacted: [X] leads
Audit Scheduled: [X] leads
Proposal Sent: [X] leads
Negotiating: [X] leads

CONVERSION RATES
Call → Conversation: [X]%
Conversation → Audit: [X]%
Audit → Proposal: [X]%
Proposal → Close: [X]%

REVENUE
Deals Closed This Week: [X] ($[Value])
Pipeline Value: $[Value]

GOALS vs ACTUAL
Calls Goal: 200 | Actual: [X]
Closes Goal: 2 | Actual: [X]
```

---

## 🎨 CUSTOM FIELDS REQUIRED

### Lead/Opportunity Fields

| Field Name | Type | Purpose |
|------------|------|---------|
| Industry | Dropdown | Filter by niche |
| Priority Score | Dropdown | High/Medium/Low |
| Lead Source | Dropdown | Spike, Referral, Manual |
| Review Count | Number | GBP optimization priority |
| Current Rating | Number | Reputation management need |
| Website Quality | Dropdown | Poor/Fair/Good/Excellent |
| Competitor 1 | Text | Main competitor |
| Audit Completed | Date | Track audit cycle |
| Proposal Sent Date | Date | Track proposal aging |
| Loss Reason | Dropdown | Price/Timing/Competition/etc |

---

## 🔌 INTEGRATIONS NEEDED

### Current (Working)
- ✅ GHL Lead Forms (website)
- ✅ Discord Notifications (webhook)
- ✅ SMS via Twilio (for hot leads)

### Planned
- ⏳ CallRail (call tracking)
- ⏳ Zapier (additional automations)
- ⏳ Google Sheets (backup reporting)
- ⏳ Slack (alternative to Discord)

---

## ✅ SETUP CHECKLIST

### Phase 1: Pipeline (COMPLETE)
- ✅ Create 9-stage pipeline
- ✅ Set stage requirements
- ✅ Configure automation triggers

### Phase 2: Workflows (IN PROGRESS)
- ⏳ Build Workflow 1: New Lead Intake
- ⏳ Build Workflow 2: Post-Call Follow-Up
- ⏳ Build Workflow 3: Audit Scheduled
- ⏳ Build Workflow 4: Proposal Sent
- ⏳ Build Workflow 5: New Client Onboarding
- ⏳ Build Workflow 6: Hot Lead Alerts

### Phase 3: Smart Lists (PENDING)
- ⏳ Create "Today's Calls" list
- ⏳ Create "Follow-Up Required" list
- ⏳ Create "Hot Prospects" list
- ⏳ Create "Stale Leads" list

### Phase 4: Reporting (PENDING)
- ⏳ Configure daily sales report
- ⏳ Configure weekly pipeline report
- ⏳ Set up dashboard widgets

### Phase 5: Testing (PENDING)
- ⏳ Test each workflow with sample lead
- ⏳ Verify notifications working
- ⏳ Train Sal on system

---

*System Version: 2026.2.18*
*Status: Phase 1 Complete, Phase 2 In Progress*
