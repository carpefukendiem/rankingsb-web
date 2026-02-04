# TEMPLATE — Lead Flow Engine (Electrician)

**Template location:** TEMPLATE — Lead Flow Engine (Electrician)
**Phone:** placeholder (swap per client)
**Mode:** two-way texting

## Goal
A repeatable GoHighLevel template you can clone for electrician clients:
- $999 setup + $399/mo (3‑month minimum)
- converts missed calls into booked estimates
- reduces lead leakage with follow-ups + reminders

---

## Build Sheet (v1)

### 1) Assets
- Pipeline stages (below)
- Tags (below)
- Custom fields (below)
- Workflows (below)
- Calendar (booking link already exists; keep template calendar generic)

### 2) Pipeline
Create pipeline: **Lead Flow — Electrician**
Stages:
1. New Lead
2. Contacted
3. Booked
4. Showed
5. Won
6. Lost
7. No‑Show
8. Reactivation

### 3) Tags
- lead_new
- lead_contacted
- appt_booked
- appt_no_show
- won
- lost
- reactivate_30d
- review_sent
- review_received

### 4) Custom fields (simple)
- Service Type (dropdown)
- City (text)
- Urgency (dropdown: today / this week / flexible)
- Budget Band (dropdown)
- Lead Source (text)
- Notes (text)

### 5) Workflows (core)
#### A) Missed Call Text‑Back
Trigger: missed call
Action: SMS: “Hey {{contact.name}}, sorry we missed you — want to book a quick estimate call? {{booking_link}}”
Wait: 10 min
If no reply: SMS reminder

#### B) New Lead Follow-up
Trigger: new lead created
Action: immediate SMS + email
Wait: 1 day → follow-up SMS
Wait: 2 days → final follow-up
Stop conditions: appointment booked / replied / status won/lost

#### C) Appointment reminders
24h reminder SMS + 2h reminder SMS
No-show workflow routes to reactivation

#### D) Review request
Trigger: moved to Won
Send SMS review request + 1 reminder

### 6) Conversation defaults
- Business hours
- Auto-assignment to owner

### 7) Reporting snapshot
Track weekly:
- New leads
- Booked
- Show rate
- Won

---

## Notes
This template is intentionally lean so monthly stays SaaS-like.
Add-ons (Ads Lite / SEO Fix Pack) are separate packages.
