# AGENT REMOVAL & NEW AGENT SETUP
## Remove 6 Unused | Create 1 New (Brief Agent)

---

## 🗑️ AGENTS TO REMOVE (6 Total)

### AGENTS BEING REMOVED:
1. ❌ Cron: Morning Brief → Discord
2. ❌ Cron: Nightly Brief → Discord
3. ❌ Discord Guardian #1 (1468170930412064882)
4. ❌ Discord Guardian #2 (1467448139106746388)
5. ❌ Discord Guardian #3 (1467448186686673040)
6. ❌ Discord Guardian #4 (1467983424936743026)

### AGENTS STAYING:
1. ✅ Johnny 5 (Main) - YOU
2. ✅ NEW: Brief Agent (iMessage to 805-258-9236)

---

## 📋 STEP-BY-STEP: REMOVE AGENTS

### Method 1: OpenClaw Dashboard (Easiest)

1. **Login to OpenClaw**
   ```
   openclaw dashboard
   # or visit: http://localhost:PORT/dashboard
   ```

2. **Navigate to: Sessions/Agents**

3. **Find each agent by ID:**
   
   **Morning Brief Cron:**
   - ID: `agent:main:cron:e27da51c-d62a-4b09-afa4-dd51e8e7fd71`
   - Click "Stop" or "Delete"
   - Confirm
   
   **Nightly Brief Cron:**
   - ID: `agent:main:cron:3c393c80-cece-4c9c-895e-c3833f786094`
   - Click "Stop" or "Delete"
   - Confirm
   
   **Discord Guardian #1:**
   - ID: `agent:main:discord:channel:1468170930412064882`
   - Click "Stop" or "Delete"
   - Confirm
   
   **Discord Guardian #2:**
   - ID: `agent:main:discord:channel:1467448139106746388`
   - Click "Stop" or "Delete"
   - Confirm
   
   **Discord Guardian #3:**
   - ID: `agent:main:discord:channel:1467448186686673040`
   - Click "Stop" or "Delete"
   - Confirm
   
   **Discord Guardian #4:**
   - ID: `agent:main:discord:channel:1467983424936743026`
   - Click "Stop" or "Delete"
   - Confirm

### Method 2: Command Line

```bash
# List all sessions
openclaw sessions list

# Stop each session by ID
openclaw sessions stop agent:main:cron:e27da51c-d62a-4b09-afa4-dd51e8e7fd71
openclaw sessions stop agent:main:cron:3c393c80-cece-4c9c-895e-c3833f786094
openclaw sessions stop agent:main:discord:channel:1468170930412064882
openclaw sessions stop agent:main:discord:channel:1467448139106746388
openclaw sessions stop agent:main:discord:channel:1467448186686673040
openclaw sessions stop agent:main:discord:channel:1467983424936743026

# Verify they're stopped
openclaw sessions list
```

### Method 3: Config File Edit

1. **Edit OpenClaw config:**
   ```bash
   nano ~/.openclaw/config.yaml
   ```

2. **Find and delete these sections:**
   ```yaml
   # DELETE THESE SECTIONS:
   
   cron:
     - name: "Morning Brief"
       id: e27da51c-d62a-4b09-afa4-dd51e8e7fd71
       
     - name: "Nightly Brief"
       id: 3c393c80-cece-4c9c-895e-c3833f786094
   
   discord:
     - channel: 1468170930412064882
     - channel: 1467448139106746388
     - channel: 1467448186686673040
     - channel: 1467983424936743026
   ```

3. **Save and restart OpenClaw:**
   ```bash
   openclaw restart
   ```

---

## ✅ VERIFICATION: Agents Removed

**After removal, run:**
```bash
openclaw sessions list
```

**Should show ONLY:**
- Main session (you)
- NEW: Brief Agent (after we create it)

**Expected count: 2 agents (not 7)**

---

## 🤖 CREATE NEW AGENT: "BRIEF AGENT"

### Agent Purpose:
Send daily morning & evening briefs via iMessage to 805-258-9236

### Agent Configuration:

```yaml
agent:
  name: "Brief Agent"
  id: agent:main:brief-agent
  type: cron
  
  tasks:
    - name: "Morning Brief"
      schedule: "0 6 * * *"  # 6:00 AM PST
      action: "generate_and_send_morning_brief"
      target: "imessage:8052589236"
      
    - name: "Evening Brief"
      schedule: "0 18 * * *"  # 6:00 PM PST
      action: "generate_and_send_evening_brief"
      target: "imessage:8052589236"
      
  settings:
    model: "moonshotai/kimi-k2.5"
    max_tokens: 4000
    temperature: 0.7
```

### Setup Steps:

#### Step 1: Configure iMessage Integration

**Option A: Twilio (Recommended - You have account)**

1. **Login to Twilio:** https://www.twilio.com/console

2. **Get your credentials:**
   - Account SID (starts with AC...)
   - Auth Token
   - Twilio Phone Number

3. **Add to OpenClaw config:**
   ```yaml
   channels:
     imessage:
       provider: twilio
       account_sid: "YOUR_ACCOUNT_SID"
       auth_token: "YOUR_AUTH_TOKEN"
       from_number: "YOUR_TWILIO_NUMBER"
       to_number: "8052589236"
   ```

4. **Test:**
   ```bash
   openclaw message send --channel imessage --to 8052589236 "Test message"
   ```

**Option B: Native iMessage (Mac only)**

Requires Apple Script integration:
```bash
osascript -e 'tell application "Messages" to send "Test" to buddy "8052589236"'
```

Add to OpenClaw as custom channel.

#### Step 2: Create Brief Agent Session

```bash
# Create new agent session
openclaw agent create \
  --name "Brief Agent" \
  --type cron \
  --task morning-brief:0-6 \
  --task evening-brief:0-18 \
  --target imessage:8052589236
```

#### Step 3: Define Brief Templates

**Morning Brief Template:**
```
🌅 MORNING BRIEF - {{date}}

🌤️ Weather: {{weather}}

🎯 TODAY'S PRIORITIES:
1. {{priority_1}}
2. {{priority_2}}
3. {{priority_3}}

📊 OVERNIGHT:
• New leads: {{lead_count}}
• Token usage: {{token_usage}}
• System status: {{status}}

⚡ ACTION: {{main_action}}

Let's move the needle today.
```

**Evening Brief Template:**
```
🌙 EVENING BRIEF - {{date}}

✅ TODAY'S WINS:
• {{win_1}}
• {{win_2}}

📊 METRICS:
• Calls made: {{calls}}
• Conversations: {{conversations}}
• Token spend: ${{cost}}

🎯 TOMORROW:
1. {{tomorrow_1}}
2. {{tomorrow_2}}

📱 CUSHIONFOAMZ BATCH:
{{cushionfoamz_conversations}}

Rest up. Back at it tomorrow.
```

#### Step 4: Enable Agent

```bash
openclaw agent enable brief-agent
openclaw cron enable
```

---

## 💰 COST COMPARISON: Before vs After

### BEFORE (7 Agents):
| Agent | Daily Cost | Monthly |
|-------|------------|---------|
| Johnny 5 (Main) | $2.00 | $60 |
| Morning Brief | $0.15 | $4.50 |
| Nightly Brief | $0.15 | $4.50 |
| Discord #1-4 | $0.08 | $2.40 |
| **TOTAL** | **$2.38** | **$71.40** |

### AFTER (2 Agents):
| Agent | Daily Cost | Monthly |
|-------|------------|---------|
| Johnny 5 (Main) | $2.00 | $60 |
| Brief Agent | $0.16 | $4.80 |
| **TOTAL** | **$2.16** | **$64.80** |

**SAVINGS: $6.60/month**

**Benefit: Cleaner system, focused communication, iMessage delivery**

---

## 📱 BRIEF AGENT DELIVERY EXAMPLE

**Morning Brief (6:00 AM):**
```
🌅 MORNING BRIEF - Feb 16, 2026

🌤️ Santa Barbara: 56°F, sunny, high 62°

🎯 TODAY'S PRIORITIES:
1. Launch Rankingsb - Sal starts 9 AM
2. Post 5 CushionFoamz responses
3. Review Seedance video drafts

📊 OVERNIGHT:
• New leads: 0
• Token usage: $0.42 (under budget)
• System: All green ✅

⚡ ACTION: Text Sal confirm 9 AM kickoff

Let's move the needle today. ⚡
```

**Evening Brief (6:00 PM):**
```
🌙 EVENING BRIEF - Feb 16, 2026

✅ TODAY'S WINS:
• Sal made first calls
• Published article to GHL
• Joined 5 Reddit communities

📊 METRICS:
• Calls made: 45
• Conversations: 8
• Token spend: $0.89

🎯 TOMORROW:
1. Continue CushionFoamz guerilla
2. Order Seedance video #1
3. Review overnight leads

📱 CUSHIONFOAMZ BATCH:
1. r/DIY - Couch fix (link)
2. r/Boating - Marine foam (link)
3. [8 more...]

Reply DONE when posted.
```

---

## ✅ COMPLETE CHECKLIST

### Remove Old Agents:
- [ ] Stop Morning Brief cron
- [ ] Stop Nightly Brief cron
- [ ] Stop Discord Guardian #1
- [ ] Stop Discord Guardian #2
- [ ] Stop Discord Guardian #3
- [ ] Stop Discord Guardian #4
- [ ] Verify only 1 agent remaining (Main)

### Create New Brief Agent:
- [ ] Configure Twilio/iMessage
- [ ] Add credentials to OpenClaw
- [ ] Create Brief Agent session
- [ ] Define morning brief template
- [ ] Define evening brief template
- [ ] Test morning brief manually
- [ ] Test evening brief manually
- [ ] Enable cron jobs
- [ ] Verify delivery at 6 AM and 6 PM

---

## 🚀 IMMEDIATE ACTIONS

**Right now:**
1. Choose iMessage method (Twilio recommended)
2. Remove 6 old agents
3. Configure Brief Agent
4. Test first delivery

**Time required:** 20 minutes
**Result:** Clean 2-agent system, daily texts to your phone

**Ready to execute?**