# 🤖 DISCORD AUTOMATION SETUP GUIDE
## Free Daily Briefs + Alerts | February 17, 2026

---

## 🎯 WHY DISCORD?

| Feature | iMessage/Twilio | Discord |
|---------|-----------------|---------|
| **Cost** | $0.0075 per message | **FREE** |
| **Setup** | Twilio account + phone number | Just a webhook URL |
| **Testing** | Charges per test | Unlimited free tests |
| **Rich Content** | Plain text only | Images, links, formatting |
| **Reliability** | Carrier-dependent | 99.9% uptime |
| **History** | Limited | Full message history |

**Bottom line:** Discord is cheaper, easier, more reliable.

---

## ⚡ QUICK SETUP (5 Minutes)

### Step 1: Create Discord Server (If You Don't Have One)

1. Open Discord (app or web: discord.com)
2. Click **"+"** next to your servers (left sidebar)
3. Select **"Create My Own"**
4. Name it: **"Johnny 5 Command Center"**
5. Click **Create**

---

### Step 2: Create Channels

Create these text channels:

1. **#daily-briefs** — Morning/evening briefs
2. **#hot-leads** — Urgent lead alerts
3. **#system-alerts** — Errors, warnings
4. **#content-ready** — New articles, videos ready

**How:**
- Right-click your server name
- "Create Channel"
- Type name, select "Text Channel"
- Click Create

---

### Step 3: Create Webhooks

For each channel, create a webhook:

**#daily-briefs webhook:**
1. Click ⚙️ (Settings) next to #daily-briefs
2. Click **Integrations**
3. Click **Webhooks** → **New Webhook**
4. Name it: "Johnny 5 Daily Brief"
5. Copy the **Webhook URL**
6. Save it somewhere safe (we'll use it in Step 4)

**Repeat for:**
- #hot-leads → "Johnny 5 Lead Alert"
- #system-alerts → "Johnny 5 System"
- #content-ready → "Johnny 5 Content"

---

### Step 4: Configure OpenClaw

**Option A: Command Line**
```bash
openclaw config set messaging.discord.daily-briefs.webhook "YOUR_WEBHOOK_URL_HERE"
openclaw config set messaging.discord.hot-leads.webhook "YOUR_WEBHOOK_URL_HERE"
openclaw config set messaging.discord.system-alerts.webhook "YOUR_WEBHOOK_URL_HERE"
```

**Option B: Config File**

Add to `~/.openclaw/config.yaml`:

```yaml
messaging:
  discord:
    daily-briefs:
      webhook: "https://discord.com/api/webhooks/YOUR/WEBHOOK/URL"
      enabled: true
    hot-leads:
      webhook: "https://discord.com/api/webhooks/YOUR/WEBHOOK/URL"
      enabled: true
    system-alerts:
      webhook: "https://discord.com/api/webhooks/YOUR/WEBHOOK/URL"
      enabled: true
    content-ready:
      webhook: "https://discord.com/api/webhooks/YOUR/WEBHOOK/URL"
      enabled: true
```

---

### Step 5: Test It

**Send a test message:**

```bash
openclaw message send --channel discord --target daily-briefs "🌅 Morning test from Johnny 5! Discord automation is working."
```

**Or using webhook directly (if OpenClaw integration isn't ready):**

```bash
curl -X POST -H "Content-Type: application/json" \
  -d '{"content":"🤖 Test message from Johnny 5"}' \
  YOUR_WEBHOOK_URL_HERE
```

You should see the message appear in your Discord channel instantly.

---

## 🕐 AUTOMATION SCHEDULE

### Morning Brief (6:00 AM PST)
**Channel:** #daily-briefs
```yaml
cron:
  - name: "morning-brief"
    schedule: "0 6 * * *"  # 6 AM daily
    action: "generate_morning_brief"
    target: "discord:daily-briefs"
```

**Content:**
- 📅 Date + Weather
- 🎯 Top 3 priorities for today
- 📊 Token budget status
- 🔔 Any overnight alerts
- 💪 Motivational quote

---

### Evening Brief (6:00 PM PST)
**Channel:** #daily-briefs
```yaml
cron:
  - name: "evening-brief"
    schedule: "0 18 * * *"  # 6 PM daily
    action: "generate_evening_brief"
    target: "discord:daily-briefs"
```

**Content:**
- ✅ Day summary (what got done)
- 📈 Sal's progress (calls, closes)
- 🎯 Tomorrow's priorities
- 💬 CushionFoamz Reddit batch ready
- 💰 Token usage for the day

---

### Hot Lead Alert (Immediate)
**Channel:** #hot-leads
**Trigger:** GHL webhook

```yaml
webhooks:
  - name: "ghl-hot-lead"
    url: "/webhook/ghl-lead"
    action: "alert_hot_lead"
    target: "discord:hot-leads"
    filter: "lead_score > 8"
```

**Content:**
```
🔥 HOT LEAD ALERT

Name: [Lead Name]
Company: [Company]
Phone: [Phone]
Industry: [Industry]
Score: 9/10

Action: Call within 30 minutes
View in GHL: [Link]
```

---

### System Health (Every 6 hours)
**Channel:** #system-alerts
```yaml
cron:
  - name: "system-health"
    schedule: "0 */6 * * *"
    action: "check_system_health"
    target: "discord:system-alerts"
```

**Content:**
- Disk space status
- Git status (uncommitted changes)
- Token usage vs budget
- Any errors or warnings

---

### Content Ready (When Generated)
**Channel:** #content-ready
**Trigger:** Content generation completion

**Content:**
```
📄 NEW CONTENT READY

Title: [Article Title]
Word count: [X]
Location: [File path]
Status: Ready for review

Preview:
[First 200 words]
```

---

## 💰 COST COMPARISON

| Service | Monthly Cost (30 days) |
|---------|------------------------|
| Twilio SMS (2 briefs/day) | ~$4.50 |
| Discord Webhooks | **$0** |
| **Savings** | **$4.50/month** |

**Annual savings:** $54

Plus: Unlimited testing, richer formatting, full history.

---

## 🧪 TESTING CHECKLIST

- [ ] Create Discord server
- [ ] Create 4 channels
- [ ] Create 4 webhooks
- [ ] Copy webhook URLs
- [ ] Configure OpenClaw
- [ ] Send test message to #daily-briefs
- [ ] Verify message appears instantly
- [ ] Enable cron jobs
- [ ] Wait for 6 AM tomorrow's brief

---

## 🎨 DISCORD MESSAGE FORMATTING

Discord supports rich formatting:

```markdown
**Bold text**
*Italic text*
__Underlined__
`code`
```code block```
> Quote
- Bullet list
1. Numbered list
[Link text](URL)
```

**Emoji:** Discord has built-in emoji picker (Windows: `.`, Mac: `Ctrl+Cmd+Space`)

---

## 🚀 ALTERNATIVE: USE MY EXISTING DISCORD

If you already have a Discord server I use for #nightly-brief, we can add more channels there:

1. Create new channels on existing server
2. Create webhooks for new channels
3. Configure different targets
4. Done!

**Current setup:**
- #nightly-brief (already working)
- Can add: #daily-briefs, #hot-leads, #system-alerts

---

## ⏰ TIMELINE

**Tonight:**
- [ ] Create server + channels (5 min)
- [ ] Create webhooks (5 min)
- [ ] Send test message (2 min)
- [ ] Configure automation (5 min)

**Tomorrow:**
- [ ] 6:00 AM — First morning brief arrives
- [ ] Throughout day — Hot lead alerts (if any)
- [ ] 6:00 PM — Evening brief arrives

**Total setup time:** 17 minutes

---

## 📱 MOBILE APP

**Download Discord mobile app:**
- iOS: App Store
- Android: Google Play

**Enable notifications:**
1. Open Discord app
2. Go to your server
3. Tap #hot-leads channel
4. Tap bell icon → "All Messages"
5. Repeat for #daily-briefs

Now you'll get push notifications on your phone — just like SMS, but free.

---

## ✅ VERIFICATION COMMAND

Once set up, verify with:

```bash
# Test daily brief channel
openclaw message send --channel discord --target daily-briefs "✅ Discord automation configured successfully!"

# Test hot leads channel
openclaw message send --channel discord --target hot-leads "🔥 Hot lead alert test"

# Test system alerts
openclaw message send --channel discord --target system-alerts "⚠️ System alert test"
```

---

**Ready to set this up?** Create the Discord server and I'll guide you through each step. Or paste your webhook URLs here and I'll configure it immediately. ⚡
