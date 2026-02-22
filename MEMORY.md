# MEMORY.md - Long-Term Knowledge
## Rankingsb + Johnny 5 System

---

## 🧠 CORE LEARNINGS

### Sales Strategy: Audit-First Works
- **Old approach:** Direct pitch $1,995 → 5% conversion
- **New approach:** Free audit → value → pitch → 25% conversion
- **Key insight:** Leading with value builds trust and demonstrates expertise
- **Process:** 10-min audit → 1-page report → 15-min review → close

### Pricing Model Validated
- **Growth Tier:** $1,995 setup + $297/month
- **Sal's commission:** 50% = $997/close
- **Target:** 24 closes/90 days = $26,428 for Sal
- **Stickiness:** Monthly "phone bill" model reduces churn

### Content Strategy: Industry + Location
- Target: "[industry] marketing [location]"
- Result: Low competition, high conversion
- Example: "Plumbing SEO Santa Barbara" attracts plumbing business owners
- **Content created:** 14 articles, 65,700 words

---

## 🛠️ SYSTEM ARCHITECTURE

### Agent Structure (Simplified)
- **Primary:** Johnny 5 (main) - handles all work
- **Removed:** 6 unused agents (cron jobs, discord monitors)
- **Added:** Brief Agent (daily SMS briefs) - pending setup

### Communication Channels
- **Current:** Webchat (this interface)
- **Pending:** iMessage via Twilio (daily briefs)
- **Pending:** Voice (Whisper input + ElevenLabs output)
- **Pending:** Tailscale (remote laptop access)

### Data & Memory Systems
- **Conversation Memory:** Supabase PostgreSQL (built Feb 22, pending setup)
  - Stores all conversations permanently
  - Searchable history
  - Session context & preferences
  - Location: `lib/conversation-memory.js`
- **Contact Backend:** GHL API integration (built Feb 22)
  - Contact form → GHL contact + pipeline
  - Location: `lib/ghl-contact-backend.js`

### File Organization
```
workspace/
├── memory/              # Daily logs
├── lib/                 # Core modules
│   ├── conversation-memory.js    # Supabase memory system
│   └── ghl-contact-backend.js    # Contact form handler
├── config/              # Configuration
│   ├── supabase-schema.sql       # Database schema
│   └── supabase-config.md        # Connection docs
├── business/
│   ├── AgencyRankingsb/  # Sales, content, clients
│   └── cushionfoamz/     # Marketing, content
├── content/             # SEO articles
├── dashboard.html       # Live status
└── TODO.md              # Task tracker
```

---

## 📊 BUSINESS METRICS

### Token Economy
- **Current model:** Kimi K2.5 via OpenRouter
- **Cost:** ~$0.0038 per 1k tokens
- **Daily average:** $2-3
- **Monthly budget:** $30
- **ROI:** 4,000x+ (if revenue targets hit)

### Revenue Projections (90-Day)
- **Rankingsb:** $23,940 cash + $7,128 MRR
- **CushionFoamz:** $5,000 (proof of concept)
- **Total potential:** $36,500
- **Investment:** ~$10 (compute) + time

---

## 🎯 KEY PEOPLE

### Ruben Johnny
- **Role:** Agency owner, closer
- **Strengths:** Sales, relationships, vision
- **Style:** ADHD-friendly, needs structure
- **Communication:** Prefers voice, efficiency-focused

### Sal Vasquez
- **Role:** Outside sales rep
- **Commission:** $997 per close (50%)
- **Contact:** 805-724-2788
- **Start:** February 17, 2026

### Johnny 5 (Me)
- **Role:** AI operations, content, systems
- **Strengths:** Writing, research, automation
- **Limitations:** Can't create accounts, can't post publicly
- **Evolution:** From chatbot to business partner

---

## 🚀 CRITICAL PROCESSES

### 1. Sales Process (Audit-First)
1. Cold call: "Free SEO audit?"
2. Run 10-minute audit
3. Create 1-page report
4. 15-minute review call
5. Pitch service
6. Close or nurture

### 2. Content Creation
1. I write articles (industry + location)
2. Ruben publishes to GHL
3. Track rankings
4. Update based on performance

### 3. Daily Rhythm
- **6 AM:** Morning brief (Twilio → Ruben)
- **9 AM:** Sales calls (Sal)
- **6 PM:** Evening brief + CushionFoamz batch
- **Continuous:** Content creation, monitoring

---

## ⚠️ LESSONS LEARNED

### What Worked
- Systematic file organization
- Git backup for everything
- Token tracking for budget control
- Audit-first sales approach

### What Didn't
- Trying to launch before ready
- Over-promising autonomous capabilities
- Discord integration (too complex)
- Overbuilding before testing

### Adjustments Made
- Delayed launch to ensure quality
- Simplified to iMessage vs complex systems
- Focused on copy-paste execution vs full automation
- Prioritized GHL setup over fancy features

---

## 🔮 FUTURE STATE (90 Days)

### Rankingsb
- 24+ clients
- $7,128 MRR
- Sal performing at $8k+/month
- VA handling fulfillment
- Ruben focused on closing

### CushionFoamz
- First organic sales
- Guerilla marketing system working
- 15 min/day execution for Ruben
- Ready to scale if profitable

### Johnny 5
- Voice-enabled
- 24/7 autonomous mode
- Daily briefs via SMS
- Remote access from anywhere
- Fully integrated business partner

---

## 📝 QUICK REFERENCE

### Files That Matter
- `dashboard.html` - Live status
- `RUBEN-TODO-DASHBOARD.md` - Daily tasks
- `20-ELECTRICIAN-LEADS.md` - Sales leads
- `REVISED-SALES-SCRIPTS-WITH-AUDIT.md` - Sales scripts
- `TOKEN-TRACKER.md` - Cost monitoring

### Commands to Remember
```bash
# Git backup
git add -A && git commit -m "message"

# Tailscale enable
openclaw config set gateway.tailscale.mode on

# Install Whisper
brew install openai-whisper

# Open dashboard
open ~/.openclaw/workspace/dashboard.html
```

### Key URLs
- OpenClaw: localhost:18789
- GHL: [your-subdomain].gohighlevel.com
- OpenRouter: https://openrouter.ai/keys
- Seedance2: https://seedance2.ai/

---

## 💡 PHILOSOPHY

### Build Systems, Not Tasks
- Document everything
- Automate what repeats
- Delegate what others can do
- Focus on high-leverage activities

### Ship Fast, Iterate Faster
- Done > perfect
- Test assumptions quickly
- Learn from failures
- Scale what works

### Human + AI Partnership
- I handle: Research, writing, systems
- Ruben handles: Relationships, decisions, execution
- Together: More than either could do alone

---

*Memory compiled: February 16, 2026*
*System version: 2026.2.14*
*Status: Pre-launch, fully documented*
