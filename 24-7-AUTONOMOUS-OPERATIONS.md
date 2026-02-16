# 24/7 AUTONOMOUS OPERATIONS
## Task Definitions & Implementation Guide
### Mix: Cron Jobs (Scheduled) + Webhooks (Event-Driven)

---

## 🎯 SYSTEM ARCHITECTURE

**HYBRID APPROACH (Best of Both Worlds):**

### Option A: Cron Jobs (Time-Based)
- Scheduled tasks run at specific times
- Predictable, reliable
- Good for: Daily briefs, content batches, regular monitoring

### Option C: Webhooks (Event-Based)  
- Triggered by external events
- Real-time response
- Good for: Lead alerts, urgent responses, immediate actions

**COMBINED:** You get scheduled consistency + real-time responsiveness

---

## 📋 TASK DEFINITIONS

### TIER 1: HOURLY TASKS (Lightweight, Quick)

#### Task 1: Keyword Monitoring
```yaml
Name: CushionFoamz Reddit Monitor
Frequency: Every 2 hours (12x/day)
Trigger: Cron
Runtime: 30 seconds
Cost: ~$0.01/run

Actions:
  1. Search Reddit API for keywords:
     - "cushion foam"
     - "couch cushion replacement"
     - "replace sofa foam"
     - "boat cushion foam"
     - "outdoor cushion replacement"
  2. Filter: Posts < 24 hours old, >5 upvotes, no brand mentions
  3. Score: Relevance 1-10
  4. Queue: Top 3 to "Today's Conversations" list
  5. Alert: If high-relevance (8+), send immediate SMS

Output: Updated list in CUSHIONFOAMZ-CONVERSATIONS.md
```

#### Task 2: Lead Alert Monitor
```yaml
Name: Rankingsb Lead Alert
Frequency: Every hour (24x/day)
Trigger: Webhook + Cron backup
Runtime: 15 seconds
Cost: ~$0.005/run

Actions:
  1. Check GHL for new form submissions
  2. If new lead: Score hot/warm/cold
  3. If HOT (emergency service, high budget, urgent timeline):
     - Send immediate SMS to Ruben: "🔥 HOT LEAD: [Name] - [Company] - Call ASAP"
  4. If WARM: Add to daily digest
  5. If COLD: Queue for Sal's list

Output: SMS for hot leads, daily list for others
```

#### Task 3: System Health Check
```yaml
Name: System Monitor
Frequency: Every 6 hours (4x/day)
Trigger: Cron
Runtime: 10 seconds
Cost: ~$0.003/run

Actions:
  1. Check disk space
  2. Check Git status (uncommitted changes)
  3. Check token usage vs budget
  4. If issues: Send alert SMS
  5. Update dashboard.html with current metrics

Output: Dashboard update, SMS if issues
```

---

### TIER 2: TWICE DAILY TASKS (Moderate Workload)

#### Task 4: Morning Brief Generation
```yaml
Name: Morning Brief to Ruben
Frequency: Daily 6:00 AM PST
Trigger: Cron
Runtime: 2 minutes
Cost: ~$0.08/run
Delivery: iMessage to 805-258-9236

Actions:
  1. Check weather for Santa Barbara
  2. Check overnight lead volume
  3. Check Sal's previous day activity
  4. Check token usage
  5. Review active projects status
  6. Generate brief:
     - Date/weather
     - Top 3 priorities for day
     - Overnight alerts
     - Token budget status
     - Motivational quote

Output: SMS/iMessage to 805-258-9236
```

#### Task 5: Evening Wrap-Up
```yaml
Name: Evening Brief to Ruben
Frequency: Daily 6:00 PM PST
Trigger: Cron
Runtime: 2 minutes
Cost: ~$0.08/run
Delivery: iMessage to 805-258-9236

Actions:
  1. Summarize day's accomplishments
  2. Check CushionFoamz conversation opportunities
  3. Write 10-15 pre-written responses
  4. Format for "Paint by Numbers" delivery
  5. Send SMS with:
     - Day summary
     - Tomorrow's priorities
     - CushionFoamz conversation batch

Output: SMS/iMessage with daily batch + responses
```

---

### TIER 3: DAILY TASKS (Heavy Workload)

#### Task 6: Content Generation Batch
```yaml
Name: Daily Content Creation
Frequency: Daily 2:00 AM PST (while you sleep)
Trigger: Cron
Runtime: 30 minutes
Cost: ~$1.20/run

Actions:
  1. Check content calendar
  2. Generate 1-2 SEO articles:
     - Research keywords
     - Write 2,000+ word article
     - Add meta tags
     - Save to content/ folder
  3. Commit to Git
  4. Update content tracker
  5. SMS notification: "📄 2 new articles ready for review"

Output: New articles in content/ folder, Git commit, SMS
```

#### Task 7: Competitor & Market Research
```yaml
Name: Market Intelligence
Frequency: Daily 3:00 AM PST
Trigger: Cron
Runtime: 20 minutes
Cost: ~$0.80/run

Actions:
  1. Check Rankingsb competitor rankings
  2. Check CushionFoamz competitor activity
  3. Search for new keyword opportunities
  4. Find trending topics in target industries
  5. Update research/ folder
  6. Flag urgent opportunities

Output: Research report, SMS if urgent findings
```

#### Task 8: Analytics & Reporting
```yaml
Name: Daily Analytics
Frequency: Daily 11:30 PM PST
Trigger: Cron
Runtime: 10 minutes
Cost: ~$0.40/run

Actions:
  1. Compile token usage for day
  2. Update TOKEN-TRACKER.md
  3. Update COMMAND-CENTER.md dashboard
  4. Calculate ROI metrics
  5. Update PROJECTS.md
  6. Commit all changes to Git
  7. SMS summary: "📊 Day complete. $X spent, Y tokens used."

Output: Updated dashboard files, Git commit, SMS
```

---

### TIER 4: WEEKLY TASKS (Deep Work)

#### Task 9: Weekly Strategy Review
```yaml
Name: Weekly Strategic Analysis
Frequency: Sundays 8:00 AM PST
Trigger: Cron
Runtime: 45 minutes
Cost: ~$1.80/run

Actions:
  1. Review week's performance metrics
  2. Analyze what's working/not working
  3. Write strategic recommendations
  4. Adjust next week's priorities
  5. Update 90-day sprint tracker
  6. Send comprehensive report via SMS/email

Output: Weekly strategy report, updated plans
```

#### Task 10: Content Batch Creation
```yaml
Name: Weekly Content Sprint
Frequency: Sundays 2:00 PM PST
Trigger: Cron
Runtime: 2 hours
Cost: ~$4.50/run

Actions:
  1. Write 5-7 SEO articles for week ahead
  2. Create email sequences
  3. Generate social media content
  4. Build sales enablement materials
  5. Queue for your review

Output: Week's content ready, SMS: "📚 Content batch ready for review"
```

---

## 🔧 IMPLEMENTATION STEPS

### Step 1: Configure OpenClaw Cron

Add to your OpenClaw config (usually `~/.openclaw/config.yaml`):

```yaml
cron_jobs:
  - name: "morning-brief"
    schedule: "0 6 * * *"  # 6 AM daily
    action: "generate_morning_brief"
    target: "imessage:8052589236"
    
  - name: "evening-brief"
    schedule: "0 18 * * *"  # 6 PM daily
    action: "generate_evening_brief"
    target: "imessage:8052589236"
    
  - name: "content-generation"
    schedule: "0 2 * * *"  # 2 AM daily
    action: "create_content_batch"
    
  - name: "reddit-monitor"
    schedule: "0 */2 * * *"  # Every 2 hours
    action: "monitor_cushionfoamz_keywords"
    
  - name: "lead-check"
    schedule: "0 * * * *"  # Every hour
    action: "check_ghl_leads"
    
  - name: "health-check"
    schedule: "0 */6 * * *"  # Every 6 hours
    action: "system_health_check"
    
  - name: "daily-analytics"
    schedule: "30 23 * * *"  # 11:30 PM daily
    action: "compile_daily_analytics"
    
  - name: "weekly-strategy"
    schedule: "0 8 * * 0"  # Sundays 8 AM
    action: "weekly_strategy_review"
    
  - name: "weekly-content"
    schedule: "0 14 * * 0"  # Sundays 2 PM
    action: "weekly_content_sprint"
```

### Step 2: Configure Webhooks (For Real-Time)

For GHL lead alerts, set up webhook:
1. Go to GoHighLevel → Settings → Webhooks
2. Create webhook: "New Lead Alert"
3. URL: `https://your-openclaw-endpoint/webhook/new-lead`
4. Trigger: Form submission
5. Action: Send SMS to 805-258-9236

### Step 3: Test Each Job

Run manually first:
```bash
openclaw cron run morning-brief --test
openclaw cron run reddit-monitor --test
```

### Step 4: Enable Autonomous Mode

```bash
openclaw cron enable
```

---

## 📱 DELIVERY METHODS

### iMessage (Your Phone: 805-258-9236)
- Morning brief: Daily 6 AM
- Evening brief: Daily 6 PM
- Hot lead alerts: Immediate
- System alerts: As needed

### Dashboard Files (Auto-Updated)
- COMMAND-CENTER.md: Every 6 hours
- TOKEN-TRACKER.md: Every hour
- PROJECTS.md: Daily

### Email (Backup)
- Weekly reports
- Content batches for review
- Git commit summaries

---

## 💰 COST PROJECTION

| Task | Frequency | Cost/Run | Monthly Cost |
|------|-----------|----------|--------------|
| Hourly monitoring | 168x/week | $0.01 | $0.72 |
| Twice daily briefs | 60x/month | $0.08 | $4.80 |
| Daily content | 30x/month | $1.20 | $36.00 |
| Daily research | 30x/month | $0.80 | $24.00 |
| Daily analytics | 30x/month | $0.40 | $12.00 |
| Weekly strategy | 4x/month | $1.80 | $7.20 |
| Weekly content | 4x/month | $4.50 | $18.00 |
| **TOTAL** | - | - | **$102.72/month** |

**Within your $30/day ($900/month) budget ✅**

---

## 🚀 ACTIVATION CHECKLIST

- [ ] Configure cron jobs in OpenClaw
- [ ] Set up iMessage integration (phone: 805-258-9236)
- [ ] Configure GHL webhooks
- [ ] Test each cron job manually
- [ ] Enable autonomous mode
- [ ] Monitor first 24 hours
- [ ] Adjust frequencies if needed

---

**This system runs 24/7 with minimal intervention. You get daily briefs via text, hot lead alerts immediately, and content created while you sleep.**

*Ready to activate?*