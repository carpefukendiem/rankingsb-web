# Google Calendar Integration Guide
## Streamlined Daily Workflow

---

## 🎯 PURPOSE

Eliminate "getting your bearings" time. Every calendar event links directly to the **Action Dashboard** where you can immediately execute tasks.

---

## 📋 DAILY CALENDAR EVENTS TO CREATE

### 1. Morning Brief Review (8:00 AM)
**Title:** 📋 Review Daily Brief & Priorities

**Description:**
```
Morning routine — get aligned for the day.

🔗 ACTION DASHBOARD: file:///Users/rubenruiz/.openclaw/workspace/action-dashboard.html

📊 CHECK:
- [ ] Overnight activity log
- [ ] Today's checklist (in Action Dashboard)
- [ ] Sal's yesterday results
- [ ] CushionFoamz conversations (3 new daily)

📁 FILES:
- Dashboard: dashboard.html
- Action Dashboard: action-dashboard.html
- TODO List: RUBEN-TODO-DASHBOARD.md

⏱️ TIME: 10 minutes
```

**Duration:** 15 minutes  
**Recurrence:** Daily

---

### 2. Reddit Response Block (2:00 PM)
**Title:** 💬 CushionFoamz Reddit Responses

**Description:**
```
Post 3 guerilla marketing responses on Reddit.

🎯 GOAL: 3 quality responses
🔗 DIRECT LINK: file:///Users/rubenruiz/.openclaw/workspace/action-dashboard.html

📋 STEPS:
1. Open Action Dashboard
2. Scroll to "CushionFoamz Conversations"
3. Click "Open Reddit" on each NEW conversation
4. Copy pre-written response
5. Post (be helpful, not salesy)
6. Mark as Done

📁 CONVERSATION FILES:
- Latest: agents/spike/outputs/cushionfoamz/YYYY-MM-DD-conversations.md
- All: business/cushionfoamz/01-marketing/reddit-campaigns/
- System: CUSHIONFOAMZ-CONVERSATION-SYSTEM.md

⚠️ GUIDELINES:
- Be genuinely helpful first
- Mention CushionFoamz casually
- Include personal experience
- Respond to follow-ups

⏱️ TIME: 20-30 minutes
```

**Duration:** 30 minutes  
**Recurrence:** Daily  
**Color:** Blue (work block)

---

### 3. Upwork Application Block (5:00 PM)
**Title:** 💼 Apply to Upwork Jobs (Target: 5)

**Description:**
```
Submit 5 quality Upwork applications.

🎯 GOAL: 5 applications
🔗 ACTION DASHBOARD: file:///Users/rubenruiz/.openclaw/workspace/action-dashboard.html

📋 STEPS:
1. Open Action Dashboard
2. Click "Apply to Upwork Jobs"
3. Go to upwork.com
4. Use cover letter templates
5. Track in upwork-tracker.js

📁 TEMPLATES:
- Cover Letters: business/Ruben-Upwork-Cover-Letters.md
- Tracker: scripts/upwork-tracker.js

⏱️ TIME: 45-60 minutes
```

**Duration:** 1 hour  
**Recurrence:** Daily (weekdays)  
**Color:** Green (revenue)

---

### 4. Evening Wrap-up (6:00 PM)
**Title:** 🌙 Daily Review & Tomorrow Prep

**Description:**
```
End-of-day check-in and planning.

🔗 ACTION DASHBOARD: file:///Users/rubenruiz/.openclaw/workspace/action-dashboard.html

📋 CHECKLIST:
- [ ] Update TODO dashboard (mark completed)
- [ ] Check token usage
- [ ] Review tomorrow's calendar
- [ ] Set 3 priorities for tomorrow
- [ ] Review CushionFoamz responses performance

📁 FILES:
- TODO: RUBEN-TODO-DASHBOARD.md
- Token Tracker: TOKEN-TRACKER.md
- Activity Log: mission-control/logs/activity.log

⏱️ TIME: 15 minutes
```

**Duration:** 15 minutes  
**Recurrence:** Daily

---

## 🔗 QUICK LINK REFERENCE

Add these to EVERY calendar event description:

```
⚡ ACTION DASHBOARD (Start Here):
file:///Users/rubenruiz/.openclaw/workspace/action-dashboard.html

📊 Main Dashboard:
file:///Users/rubenruiz/.openclaw/workspace/dashboard.html

📝 TODO List:
file:///Users/rubenruiz/.openclaw/workspace/RUBEN-TODO-DASHBOARD.md
```

---

## 📱 GOOGLE CALENDAR SETUP STEPS

### Option 1: Manual Creation (Recommended)

1. Go to calendar.google.com
2. Create new event
3. Copy/paste title and description from above
4. Set recurrence (daily/weekly)
5. Save

### Option 2: Import via ICS File

I've created an ICS file you can import:

```bash
# Generate ICS file
node scripts/generate-calendar-ics.js

# Then import to Google Calendar:
# 1. Go to calendar.google.com
# 2. Click "+" next to "Other calendars"
# 3. Select "Import"
# 4. Upload: workspace-daily-routine.ics
```

### Option 3: Google Apps Script (Advanced)

For automatic updates, use the Apps Script in:
`scripts/calendar-setup-instructions.html`

---

## 🎨 CALENDAR COLOR CODING

| Color | Meaning | Events |
|-------|---------|--------|
| 🔵 Blue | Work Block | Reddit responses, content creation |
| 🟢 Green | Revenue | Upwork apps, sales calls, closing |
| 🟡 Yellow | Admin | Reviews, planning, email |
| 🔴 Red | Urgent | Deadlines, launches, critical tasks |
| 🟣 Purple | Learning | Research, skill building |

---

## 📊 DASHBOARD INTEGRATION

### Action Dashboard Features:

1. **Daily Checklist** — Auto-reset each day
2. **Conversation Tracker** — Shows 3 latest Reddit targets
3. **Quick Action Buttons** — One-click task execution
4. **Essential Files** — Direct links to all important docs

### How It Works:

```
Calendar Alert (2 PM) → Click Action Dashboard Link
                                    ↓
                    See "CushionFoamz Conversations"
                                    ↓
           Click "Open Reddit" → Copy Response → Post
                                    ↓
                         Mark as Done
                                    ↓
                         Move to next task
```

**NO MORE:** Hunting for files, wondering what to do, getting lost in folders  
**JUST:** Click → Execute → Done

---

## ✅ VERIFICATION CHECKLIST

After setup, verify:

- [ ] 4 daily recurring events created
- [ ] Each event has Action Dashboard link
- [ ] Each event has specific task instructions
- [ ] Recurrence set correctly (daily/weekdays)
- [ ] Colors match work type
- [ ] Notifications enabled (10 min before)
- [ ] Test one link: file:///Users/rubenruiz/.openclaw/workspace/action-dashboard.html

---

## 🚀 ALTERNATIVE: MAC REMINDERS APP

If you prefer Reminders over Calendar:

1. Create daily recurring reminders
2. Add Action Dashboard link to notes
3. Set location-based triggers (optional)
4. Use Siri: "Remind me to post Reddit responses every day at 2 PM"

---

*Streamlined workflow = Zero decision fatigue*  
*Updated: February 20, 2026*
