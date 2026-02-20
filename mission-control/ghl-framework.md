# GHL Framework — Automation Map
## Rankingsb Pipeline & Workflow System

**Purpose:** Automate lead nurturing from first contact to close  
**Platform:** GoHighLevel (app.rankingsb.com)  
**Status:** Core pipeline built, automation pending

---

## 🎯 PIPELINE ARCHITECTURE

### 9-Stage Sales Pipeline

```
┌─────────────────────────────────────────────────────────────────────┐
│  STAGE 1: TARGETED (Not Contact)                                    │
│  • Leads from research (Spike)                                      │
│  • Imported via API or manual                                       │
│  • Trigger: Auto-assigned to Sal                                    │
│  • Action: Appear in Sal's calling list                             │
├─────────────────────────────────────────────────────────────────────┤
│  STAGE 2: CONTACTED (No Response)                                   │
│  • Sal made contact, no answer                                      │
│  • Trigger: Auto-voicemail + email sent                             │
│  • Wait: 3 days → Move to callback queue                            │
├─────────────────────────────────────────────────────────────────────┤
│  STAGE 3: CONTACTED (Call Back)                                     │
│  • Prospect wants callback                                          │
│  • Trigger: Task created for Sal                                    │
│  • Reminder: 24 hours before scheduled time                         │
├─────────────────────────────────────────────────────────────────────┤
│  STAGE 4: AUDIT SCHEDULED                                           │
│  • Audit call booked                                                │
│  • Trigger: Calendar invite sent                                    │
│  • Reminder: 1 hour before + 15 min before                          │
│  • Auto: Audit report generated 30 min prior                        │
├─────────────────────────────────────────────────────────────────────┤
│  STAGE 5: AUDIT COMPLETED                                           │
│  • Audit call done, report delivered                                │
│  • Trigger: Follow-up email with proposal                           │
│  • Wait: 2 days → Check-in task                                     │
├─────────────────────────────────────────────────────────────────────┤
│  STAGE 6: PROPOSAL SENT                                             │
│  • Growth package proposal delivered                                │
│  • Trigger: Proposal email + SMS                                    │
│  • Auto: Video message (Loom) explaining offer                      │
│  • Wait: 3 days → Follow-up sequence                                │
├─────────────────────────────────────────────────────────────────────┤
│  STAGE 7: NEGOTIATING                                               │
│  • Objections being handled                                         │
│  • Trigger: Task for Sal to follow up                               │
│  • Auto: Case study email relevant to industry                      │
├─────────────────────────────────────────────────────────────────────┤
│  STAGE 8: CLOSED WON                                                │
│  • Deal signed! 🎉                                                  │
│  • Trigger: Slack/Discord notification                              │
│  • Auto: Onboarding sequence starts                                 │
│  • Auto: Welcome email + intake form                                │
│  • Auto: Invoice for setup fee sent                                 │
├─────────────────────────────────────────────────────────────────────┤
│  STAGE 9: CLOSED LOST                                               │
│  • Prospect said no                                                 │
│  • Trigger: 6-month nurture sequence                                │
│  • Auto: "Checking in" email at 3 months                            │
│  • Auto: Re-engagement at 6 months                                  │
└─────────────────────────────────────────────────────────────────────┘
```

---

## ⚡ AUTOMATION WORKFLOWS

### Workflow 1: New Lead Ingestion

**Trigger:** Contact added to "Targeted" stage  
**Actions:**
1. Assign to Sal (user: Sal Vasquez)
2. Tag with industry (e.g., "electrician", "hvac")
3. Add to "Week X" campaign
4. Send Slack notification: "🔥 New lead: [Business Name]"
5. Create task: "Call within 24 hours"

### Workflow 2: First Contact Attempt

**Trigger:** Stage moved to "Contacted (No Response)"  
**Actions:**
1. Send voicemail email template
2. Log call attempt (timestamp)
3. Schedule callback task (3 days later)
4. If no callback in 7 days → Move to "Nurture" list

### Workflow 3: Audit Scheduled

**Trigger:** Stage moved to "Audit Scheduled"  
**Actions:**
1. Send calendar invite (Sal + Prospect)
2. Generate audit report (via API to Johnny 5)
3. Send prep email: "What to expect on our call"
4. Reminder SMS: 1 hour before
5. Reminder call task: 15 min before

### Workflow 4: Hot Lead Alert

**Trigger:** Stage moved to "Audit Scheduled" OR "Proposal Sent"  
**Actions:**
1. Discord notification: "🔥 HOT LEAD: [Name] moved to [Stage]"
2. SMS to Ruben: "Hot lead alert: [Business Name] - [Phone]"
3. Create high-priority task

### Workflow 5: Deal Closed

**Trigger:** Stage moved to "Closed Won"  
**Actions:**
1. Discord/SMS celebration notification
2. Start onboarding workflow
3. Send welcome email with intake form
4. Create project in ClickUp/Notion (future)
5. Schedule kickoff call (5 days out)
6. Generate first invoice ($1,995 setup)

### Workflow 6: Nurture Sequence

**Trigger:** Stage moved to "Closed Lost"  
**Actions:**
1. Tag: "Nurture - [Industry]"
2. Send: "Thanks for considering us" email
3. Wait 3 months → "How's business?" check-in
4. Wait 6 months → "We'd love another shot" re-engagement
5. Continue monthly newsletter

---

## 📧 EMAIL SEQUENCES

### Sequence 1: New Lead Welcome

**Email 1** (Immediate): "Thanks for connecting"
```
Hi [Name],

Sal here from Rankingsb. Thanks for taking my call today.

As promised, I've started on your free SEO audit. I'll have it 
ready within 24 hours.

In the meantime, here's what other [industry] businesses in Santa 
Barbara are saying about working with us:

[Link to case studies/testimonials]

Talk soon,
Sal
```

**Email 2** (24 hours later): "Your audit is ready"
[See Audit Delivery template in lead-gen-system.md]

**Email 3** (3 days later): "Quick follow-up"
[See Follow-up template in lead-gen-system.md]

### Sequence 2: Post-Audit Nurture

**Email 1** (Day 1): "Thanks for your time"
**Email 2** (Day 4): "Questions about the proposal?"
**Email 3** (Day 7): "Case study: [Similar business]"
**Email 4** (Day 14): "Last follow-up"

### Sequence 3: Client Onboarding

**Email 1** (Immediate): "Welcome to Rankingsb!"
**Email 2** (Day 1): "Intake form + access requests"
**Email 3** (Day 3): "Kickoff call scheduled"
**Email 4** (Day 7): "First week update"
**Email 5** (Day 30): "Month 1 report"

---

## 🔔 SMART LISTS (Auto-Segmented)

### List 1: Hot Leads
**Criteria:** Stage = "Audit Scheduled" OR "Proposal Sent"  
**Purpose:** Daily priority calling list  
**Notification:** Real-time alerts to Discord/SMS

### List 2: Needs Follow-up
**Criteria:** Last activity > 3 days, Stage = "Contacted"  
**Purpose:** Re-engagement campaigns  
**Action:** Auto-add to callback queue

### List 3: Closing This Week
**Criteria:** Stage = "Negotiating", Updated within 7 days  
**Purpose:** Weekly sales review  
**Report:** Sent to Ruben every Friday

### List 4: Stale Leads
**Criteria:** Last activity > 30 days, Stage ≠ "Closed Won"  
**Purpose:** Re-activation campaigns  
**Action:** Move to nurture sequence

### List 5: Active Clients
**Criteria:** Stage = "Closed Won", Status = "Active"  
**Purpose:** Service delivery tracking  
**Report:** Monthly MRR dashboard

---

## 📊 REPORTING DASHBOARD

### Daily Report (Auto-generated 9 AM)
```
📊 RANKINGSB DAILY PIPELINE REPORT

New Leads: [X]
Calls Made: [X]
Audits Scheduled: [X]
Proposals Sent: [X]
Deals Closed: [X]

Pipeline Value: $[X]
Hot Leads: [X]
Follow-ups Needed: [X]

Today's Priorities:
1. [Hot lead name] - Audit at [time]
2. [Hot lead name] - Proposal follow-up
3. [Lead name] - First contact
```

### Weekly Report (Auto-generated Monday)
```
📈 WEEK IN REVIEW

Leads Added: [X]
Conversion Rate: [X]%
Revenue Closed: $[X]
Sal's Commission: $[X]

Pipeline Movement:
• Targeted → Contacted: [X]
• Contacted → Audit: [X]
• Audit → Proposal: [X]
• Proposal → Closed: [X]

This Week's Goals:
• [X] new leads
• [X] audits scheduled
• [X] deals closed
```

---

## 🔧 TECHNICAL SETUP

### Required GHL Configurations

#### 1. Custom Fields
| Field | Type | Purpose |
|-------|------|---------|
| Industry | Dropdown | Lead categorization |
| Lead Source | Text | Track where lead came from |
| Audit Scheduled Date | Date | Calendar integration |
| Proposal Sent Date | Date | Follow-up timing |
| Competitor Ranking | Number | Position in Google |

#### 2. Tags
- By Industry: `electrician`, `hvac`, `plumbing`, etc.
- By Status: `hot-lead`, `needs-followup`, `nurture`
- By Campaign: `week-1`, `week-2`, etc.
- By Source: `spike-research`, `referral`, `inbound`

#### 3. Integrations Needed

| Integration | Status | Purpose |
|-------------|--------|---------|
| CallRail | ⏳ Pending | Call tracking & recording |
| Slack/Discord | ✅ Active | Hot lead alerts |
| Zapier | ⏳ Optional | Advanced automation |
| Stripe | ⏳ Future | Auto-invoicing |
| Calendly | ⏳ Future | Self-scheduling audits |

#### 4. API Connections

**GHL → Johnny 5:**
- Pull: Pipeline changes, new contacts
- Push: Audit reports, email content

**GHL → Discord:**
- Hot lead alerts (webhook)
- Daily summary (cron)

**GHL → SMS (Twilio):**
- Hot lead alerts to Ruben
- Reminder texts to prospects

---

## 🎯 IMPLEMENTATION CHECKLIST

### Phase 1: Foundation ✅ COMPLETE
- [x] 9-stage pipeline built
- [x] Sal user account created
- [x] Basic tags configured
- [x] Hot lead alerts working

### Phase 2: Automation ⏳ IN PROGRESS
- [ ] Email sequences (5 templates)
- [ ] Workflow automation (6 workflows)
- [ ] Smart lists (5 lists)
- [ ] Daily reporting
- [ ] CallRail integration

### Phase 3: Optimization 🔄 FUTURE
- [ ] AI-powered lead scoring
- [ ] Predictive close probability
- [ ] Automated content personalization
- [ ] Advanced attribution tracking

---

## 📁 FILE LOCATIONS

| Resource | Location |
|----------|----------|
| This framework | `mission-control/ghl-framework.md` |
| Pipeline status | `mission-control/tasks/ghl-status.md` |
| GHL setup guide | `GHL-SETUP-GUIDE.md` |
| API integration | `scripts/ghl-sal-monitor.js` |

---

*Framework Version: 2026.2.20*  
*Last Updated: Feb 20, 2026*  
*Status: Phase 1 Complete, Phase 2 In Progress*
