# 📱 DUAL-CHANNEL HOT LEAD ALERTS
## Discord + iMessage | February 17, 2026

---

## 🎯 SETUP: HOT LEADS → BOTH CHANNELS

When a HOT lead arrives in GHL, you get notified on **BOTH**:
1. **Discord** — Full details, links, formatted message
2. **iMessage** — Quick mobile alert for immediate action

---

## 📱 WHY BOTH?

| Channel | Best For | When You See It |
|---------|----------|-----------------|
| **Discord** | Full lead details, GHL links, notes | When you check Discord |
| **iMessage** | Immediate buzz in your pocket | Instant notification |

**Use case:** iMessage buzzes → You see it's a hot lead → Open Discord for full details → Call within 30 minutes

---

## ⚡ CONFIGURATION

### Discord Channel (Already Working)
```
Channel: 1467983424936743026
Trigger: GHL webhook + score > 8
Format: Full details + links
```

### iMessage (Needs Setup)
```
Target: 805-258-9236 (your phone)
Trigger: Same GHL webhook
Format: Short, urgent, actionable
```

---

## 📝 MESSAGE FORMATS

### Discord Message (Full Details)
```
🔥 HOT LEAD ALERT

👤 Name: John Smith
🏢 Company: ABC Electric
📞 Phone: (805) 555-1234
📧 Email: john@abcelectric.com
🏙️ City: Santa Barbara
🏷️ Industry: Electrical
⭐ Score: 9/10 (HOT)

📝 NOTES:
Called at 9:15 AM, wants SEO audit, 
budget confirmed $2K+, decision maker

⚡ ACTION REQUIRED: Call within 30 minutes!

🔗 View in GHL: [Direct link]

— Johnny 5 (Alert Bot)
```

### iMessage (Short & Urgent)
```
🔥 HOT LEAD: John Smith @ ABC Electric
📞 (805) 555-1234 | SB | Electrical
⭐ Score: 9/10 | Budget: $2K+ confirmed

⚡ CALL WITHIN 30 MIN

Check Discord for full details.
```

---

## 🔧 IMPLEMENTATION OPTIONS

### Option A: Twilio iMessage (Recommended)

**Requirements:**
- Twilio account
- iMessage-enabled phone number
- Twilio API credentials

**Setup:**
```yaml
messaging:
  imessage:
    provider: twilio
    account_sid: "YOUR_TWILIO_SID"
    auth_token: "YOUR_TWILIO_TOKEN"
    from_number: "+1XXXXXXXXXX"  # Your Twilio number
```

**Cost:** ~$0.0075 per message (~$0.23/month for hot leads)

---

### Option B: OpenClaw Native iMessage

**Requirements:**
- macOS with Messages app
- OpenClaw running on your Mac
- Your Apple ID configured

**Setup:**
```bash
openclaw config set messaging.imessage.enabled true
openclaw config set messaging.imessage.target 8052589236
```

**Cost:** FREE (uses your existing iMessage)

**Limitation:** Only works if OpenClaw is running on your Mac

---

### Option C: Email-to-SMS Gateway

**If you don't have Twilio:**

Most carriers support email-to-SMS:
- AT&T: `number@txt.att.net`
- Verizon: `number@vtext.com`
- T-Mobile: `number@tmomail.net`

**Setup:**
```yaml
messaging:
  email_sms:
    target: "8052589236@txt.att.net"  # Replace with your carrier
    smtp_server: "your-email-server"
```

**Cost:** FREE (uses your existing email)

---

## 🚀 RECOMMENDED SETUP

**Best of both worlds:**

1. **Discord** — Primary channel (free, rich formatting, history)
2. **iMessage** — Urgent alerts only (hot leads, system failures)

**Configuration:**
```yaml
hot_lead_alerts:
  channels:
    - discord: "1467983424936743026"  # Full details
    - imessage: "8052589236"          # Urgent buzz
  
  discord_format: "full"      # Complete lead info
  imessage_format: "compact"  # Name + phone + urgency
  
  delay_between: 5_seconds    # Discord first, then iMessage
```

---

## 🧪 TESTING DUAL ALERTS

**Test command:**
```bash
# Simulate hot lead
openclaw trigger hot-lead-test \
  --name "Test Lead" \
  --company "Test Company" \
  --phone "805-555-TEST" \
  --score 9
```

**Expected result:**
1. Discord message appears instantly
2. iMessage arrives 5 seconds later
3. Phone buzzes with iMessage notification

---

## 📊 USAGE PROJECTION

**Hot leads per month:** ~20-30 (conservative)

| Channel | Messages/Month | Cost |
|---------|---------------|------|
| Discord | 30 | FREE |
| iMessage (Twilio) | 30 | ~$0.23 |
| **Total** | 60 | **~$0.23** |

**Negligible cost for the peace of mind.**

---

## ⚠️ WHAT YOU NEED TO PROVIDE

To activate iMessage alerts, I need **ONE** of:

**Option 1: Twilio**
- Account SID
- Auth Token  
- Twilio phone number

**Option 2: Email-to-SMS**
- Your carrier's SMS gateway domain
- Your email SMTP credentials

**Option 3: OpenClaw Native**
- Just enable in config (if running on your Mac)

---

## 🎯 TONIGHT'S ACTION

**Discord:** ✅ Already working
**iMessage:** ⬜ Needs your credentials

**Quick setup (2 minutes):**

1. Do you have Twilio?
   - YES → Paste Account SID + Auth Token
   - NO → Go to step 2

2. What's your carrier?
   - AT&T → Use `8052589236@txt.att.net`
   - Verizon → Use `8052589236@vtext.com`
   - T-Mobile → Use `8052589236@tmomail.net`
   - Other → Google "[carrier] email to SMS gateway"

3. I'll configure the dual-channel alerts

---

## 💡 ALTERNATIVE: MANUAL FOR NOW

If you don't want to set up Twilio tonight:

**Discord alerts:** ✅ Working immediately  
**iMessage:** You manually forward urgent Discord alerts to yourself

Then set up Twilio tomorrow when you have time.

---

**What's your preference?**

A) Set up iMessage now (need your Twilio or carrier info)  
B) Discord only tonight, add iMessage tomorrow  
C) Just tell me your carrier and I'll use email-to-SMS (free, instant)

⚡
