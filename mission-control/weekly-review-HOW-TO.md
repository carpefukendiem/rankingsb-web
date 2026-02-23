# Weekly Review - How To Guide

## Quick Start

1. **Copy the template** to a new file: `weekly-review-YYYY-MM-DD.md`
2. **Fill in your data** (see data sources below)
3. **Review and reflect** on the week
4. **Share** to Discord if desired

---

## Data Collection Guide

### 1. Week's Wins
- Review your calendar for the week
- Check your CRM/sales pipeline
- Review content calendar/published posts
- Ask yourself: "What am I proud of this week?"

### 2. Metrics Sources

#### Sales Metrics
- **Calls/Meetings:** Check your calendar or dialer logs
- **Closes:** CRM (HubSpot, Salesforce, etc.)
- **Revenue:** CRM or accounting software

#### Content Metrics
- **Posts Published:** Social media scheduling tool or manual count
- **Engagement:** Platform analytics (Twitter/X, LinkedIn, etc.)

#### Token Usage / Costs
Check these sources for AI spend:

| Provider | Where to Check |
|----------|---------------|
| OpenAI | https://platform.openai.com/usage |
| Anthropic (Claude) | https://console.anthropic.com/usage |
| Other tools | Their respective dashboards |

**Pro tip:** Set calendar reminders to check these dashboards weekly.

---

## Automation Options

### Option 1: Manual (Recommended to start)
- 10-15 minutes every Friday afternoon
- Copy template, fill in data
- Save to `memory/weekly-review-YYYY-MM-DD.md`

### Option 2: Semi-Automated
Create a script to pull data from APIs:
- Calendar API for meetings
- CRM API for sales data
- AI provider APIs for token usage

### Option 3: Agent-Assisted
Ask your OpenClaw agent to:
- Compile the review from your memory files
- Calculate metrics from weekly notes
- Format and send to Discord

**Example prompt:**
```
Generate this week's review using the template at mission-control/weekly-review-template.md.
Pull data from memory/2026-MM-DD.md files from this week.
```

---

## Discord Sharing

### Option A: Full Review Post
Use the `message` tool to send the complete review:
```bash
# Send full review to a Discord channel
openclaw message send --target #weekly-reviews --file weekly-review-YYYY-MM-DD.md
```

### Option B: Summary Format
For Discord, consider a condensed format:

```
📊 **Weekly Review - Week of MM/DD**

🏆 **Wins:**
• Closed [X] deals ($[X])
• Published [X] pieces of content
• [Other win]

📈 **Metrics:**
• Calls: X | Closes: X | Revenue: $X
• Content: X posts published
• AI Spend: $X

🎯 **Next Week:**
• [Priority 1]
• [Priority 2]
• [Priority 3]
```

---

## Schedule Recommendation

**When:** Every Friday, 4:00-4:30 PM PST  
**Duration:** 30 minutes max  
**Where:** Block it on your calendar!

---

## File Organization

```
workspace/
├── mission-control/
│   ├── weekly-review-template.md      # This template
│   ├── weekly-review-HOW-TO.md        # This file
│   └── archive/                       # Completed reviews
│       ├── weekly-review-2026-02-23.md
│       └── weekly-review-2026-02-16.md
└── memory/
    └── YYYY-MM-DD.md                  # Daily notes feed into reviews
```

---

## Tips for Success

1. **Be honest** - The review is for you, not an audience
2. **Focus on trends** - Week-to-week consistency matters more than any single week
3. **Celebrate wins** - Even small ones count
4. **Keep it short** - If it takes >30 min, simplify
5. **Use it to plan** - The "Next Week" section is the most important

---

## Template Customization

Feel free to modify the template to track:
- Different metrics (leads generated, demo calls, etc.)
- Specific KPIs for your business
- Personal goals (workouts, reading, etc.)
- Team metrics if applicable

---

*Last updated: 2026-02-23*
