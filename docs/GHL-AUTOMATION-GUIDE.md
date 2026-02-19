# GHL AUTOMATION SYSTEM — Complete Documentation
## Full Auto-Publishing for Rankingsb & CushionFoamz

---

## 🎯 WHAT YOU NOW HAVE

A complete automation system that can:
1. ✅ **Auto-publish blog posts** to GHL on schedule
2. ✅ **Auto-schedule social media posts** across all platforms
3. ✅ **Batch publish** entire content libraries
4. ✅ **Track everything** in a central dashboard

---

## 📁 SYSTEM COMPONENTS

### Core Scripts (in `/scripts/`)

| Script | Purpose | Usage |
|--------|---------|-------|
| `automation-controller.sh` | Master control panel | `./automation-controller.sh [command]` |
| `ghl-auto-publisher.sh` | Publish single blog post | `./ghl-auto-publisher.sh article.md location_id date` |
| `ghl-social-scheduler.sh` | Schedule social posts | `./ghl-social-scheduler.sh "content" "datetime" location platform` |
| `batch-publisher.sh` | Publish multiple articles | `./batch-publisher.sh business start_date` |

### Configuration (`/config/`)

| File | Purpose |
|------|---------|
| `ghl-automation.json` | Master configuration for both businesses |

### Content Directories

| Business | Articles | Location |
|----------|----------|----------|
| Rankingsb | 15 ready | `/content/seo-articles/` |
| CushionFoamz | 5 ready | `/business/cushionfoamz/02-content/blog-posts/` |

---

## 🚀 QUICK START

### Step 1: Check System Status
```bash
cd /Users/rubenruiz/.openclaw/workspace/scripts
./automation-controller.sh status
```

### Step 2: Run Setup Wizard
```bash
./automation-controller.sh setup
```
This will ask for:
- GHL Location IDs (found in GHL Settings)
- Social media account IDs (optional)

### Step 3: Test API Connectivity
```bash
./automation-controller.sh test rankingsb
./automation-controller.sh test cushionfoamz
```

### Step 4: Enable Live Mode
Edit the scripts to uncomment API calls:
```bash
# In ghl-auto-publisher.sh, uncomment lines 85-95
# In ghl-social-scheduler.sh, uncomment lines 55-65
```

### Step 5: Schedule Cron Jobs
```bash
./automation-controller.sh cron
# Then copy the cron jobs and install with: crontab -e
```

---

## 📅 PUBLISHING SCHEDULES

### Current Configuration

**Rankingsb:**
- Frequency: Twice weekly (Mondays & Thursdays)
- Time: 8:00 AM
- Platforms: LinkedIn, Facebook

**CushionFoamz:**
- Frequency: Weekly (Wednesdays)
- Time: 9:00 AM
- Platforms: Facebook, Instagram, Pinterest

### Staggered Release Strategy

**Week 1:**
- Monday: HVAC SEO article + social
- Wednesday: CushionFoamz article + social
- Thursday: Plumbing SEO article + social

**Week 2:**
- Monday: Roofing SEO article + social
- Wednesday: CushionFoamz article + social
- Thursday: Solar SEO article + social

**Week 3+:**
- Continue pattern with remaining content

---

## 🔧 COMMANDS REFERENCE

### Master Controller

```bash
# Check everything is working
./automation-controller.sh status

# Test API connection
./automation-controller.sh test rankingsb

# Setup wizard
./automation-controller.sh setup

# Show cron recommendations
./automation-controller.sh cron
```

### Single Article Publishing

```bash
# Publish one article
./ghl-auto-publisher.sh \
  /path/to/article.md \
  location_id \
  2026-02-20
```

### Social Media Scheduling

```bash
# Schedule social post
./ghl-social-scheduler.sh \
  "Check out our new blog post!" \
  "2026-02-20 09:00" \
  rankingsb \
  facebook
```

### Batch Publishing

```bash
# Publish all pending Rankingsb articles
./batch-publisher.sh rankingsb 2026-02-20

# Publish all pending CushionFoamz articles
./batch-publisher.sh cushionfoamz 2026-02-20
```

---

## 🎨 CUSTOMIZATION

### Change Publishing Frequency

Edit `/config/ghl-automation.json`:

```json
"default_schedule": {
  "rankingsb": {
    "frequency": "daily",  // Options: daily, weekly, twice_weekly
    "days": ["monday", "wednesday", "friday"],
    "time": "08:00"
  }
}
```

### Change Social Post Templates

Edit `/config/ghl-automation.json`:

```json
"post_templates": {
  "new_blog": "📝 NEW: {title}\n\n{excerpt}\n\n👉 {url}\n\n{hashtags}"
}
```

### Add More Hashtags

Edit `/config/ghl-automation.json`:

```json
"hashtag_sets": {
  "rankingsb": ["#SEO", "#Marketing", "#YourCustomTag"]
}
```

---

## 🔐 SECURITY

### API Key Storage
- API key is stored in scripts (not ideal for production)
- For production: Move to environment variables
```bash
export GHL_API_KEY="your-key-here"
# Then reference as $GHL_API_KEY in scripts
```

### Location IDs
- Never commit real location IDs to git
- Keep them in local config only
- Use setup wizard to configure

---

## 📊 MONITORING

### Logs
All activity logged to:
- `/mission-control/logs/automation.log`
- `/mission-control/logs/cron.log`

### Check Recent Activity
```bash
tail -50 /Users/rubenruiz/.openclaw/workspace/mission-control/logs/automation.log
```

### Success Metrics to Track
- Articles published per week
- Social posts scheduled
- Engagement rates
- Website traffic from social
- Lead generation from blog

---

## 🐛 TROUBLESHOOTING

### "API Key Invalid"
- Verify key in `ACCESS-CREDENTIALS.md`
- Check key hasn't expired in GHL
- Ensure key has correct permissions (blogs/post.write, social/post.write)

### "Location Not Found"
- Run setup wizard: `./automation-controller.sh setup`
- Verify location ID in GHL (Settings > Business Profile)
- Check location is active (not archived)

### "Rate Limited"
- GHL API has limits: 60 requests/minute
- Built-in delays in scripts prevent this
- If hit, wait 1 minute and retry

### "Social Account Not Connected"
- Connect accounts in GHL: Marketing > Social Planner > Settings
- Get account IDs from GHL
- Update in `/config/ghl-automation.json`

---

## 🚀 ADVANCED FEATURES

### Auto-Approval Workflow

Current: Manual approval required (safe default)
To enable auto-publishing:
1. Edit `/config/ghl-automation.json`
2. Set `"auto_publish": true`
3. Set `"approval_required": false`

⚠️ **Warning:** Only enable after extensive testing

### Multi-Platform Posting

One blog post → Multiple social posts:
```json
"social_media": {
  "auto_schedule": true,
  "schedule_delay_days": 1,
  "platforms": ["facebook", "instagram", "linkedin", "twitter"]
}
```

### Content Repurposing

Automatically create:
- Blog post (long-form)
- LinkedIn article (medium)
- Twitter thread (short snippets)
- Instagram carousel (key points)

Coming in v2.0

---

## 📈 EXPECTED RESULTS

### Time Savings

**Before Automation:**
- Writing: 3-4 hours/article
- Publishing: 30 min/article
- Social scheduling: 30 min/article
- **Total per article: 4-5 hours**

**After Automation:**
- Writing: 3-4 hours/article (still manual)
- Publishing: 0 min (automated)
- Social scheduling: 0 min (automated)
- **Total per article: 3-4 hours**
- **Time saved: 1 hour per article × 20 articles = 20 hours**

### Publishing Velocity

**Before:** 1-2 articles per week (when you have time)
**After:** 3-5 articles per week (consistent schedule)

### SEO Impact Timeline

- **Week 1-2:** Content published, Google indexes
- **Month 1:** Rankings improve for long-tail keywords
- **Month 3:** Significant organic traffic increase
- **Month 6:** Dominant positions for target keywords
- **Month 12:** 50+ articles = serious SEO authority

---

## ✅ PRE-LAUNCH CHECKLIST

Before enabling live mode:

- [ ] Run setup wizard
- [ ] Get GHL location IDs
- [ ] Test API connectivity
- [ ] Configure social account IDs
- [ ] Review publishing schedule
- [ ] Test with 1 article (dry run)
- [ ] Review auto-generated social posts
- [ ] Install cron jobs
- [ ] Set up monitoring
- [ ] Create backup plan

---

## 🎯 NEXT STEPS

1. **Right Now:** Run setup wizard
2. **Today:** Test with 1 article
3. **This Week:** Enable live mode, publish first batch
4. **Next Week:** Monitor results, adjust schedule
5. **Month 2:** Scale up, add more content

---

**Questions?** Check logs or run: `./automation-controller.sh help`

**System Status:** ✅ Ready for testing
