# OpenClaw Setup Guide — New Machine
## Complete Installation & Configuration
**For:** Setting up OpenClaw on a new computer with all current capabilities

---

## 🚀 PHASE 1: INSTALLATION (15 minutes)

### Step 1: Install Node.js
```bash
# macOS with Homebrew
brew install node

# Or download from https://nodejs.org (v20+)
node --version  # Should show v20+
```

### Step 2: Install OpenClaw
```bash
# Install globally
npm install -g openclaw

# Verify installation
openclaw --version
```

### Step 3: Initialize Workspace
```bash
# Create workspace directory
mkdir -p ~/.openclaw/workspace
cd ~/.openclaw/workspace

# Initialize OpenClaw
openclaw init

# This creates:
# - workspace structure
# - config files
# - basic templates
```

---

## ⚙️ PHASE 2: CONFIGURATION (20 minutes)

### Step 4: Configure Gateway
```bash
# Start the gateway (required for all operations)
openclaw gateway start

# Verify it's running
openclaw gateway status
```

### Step 5: Set Up Environment Variables
Create `~/.openclaw/workspace/.env`:
```bash
# API Keys (add your own)
OPENROUTER_API_KEY=your_key_here
GHL_API_TOKEN=your_token_here
BRAVE_API_KEY=your_key_here
ELEVENLABS_API_KEY=your_key_here

# Discord Webhook (for notifications)
DISCORD_WEBHOOK_URL=your_webhook_url

# Other configs
WORKSPACE_PATH=/Users/YOURNAME/.openclaw/workspace
```

### Step 6: Install Skills
```bash
# Install all the skills we use
openclaw skill install 1password
openclaw skill install apple-notes
openclaw skill install apple-reminders
openclaw skill install blogwatcher
openclaw skill install coding-agent
openclaw skill install discord
openclaw skill install gemini
openclaw skill install gh-issues
openclaw skill install github
openclaw skill install gog
openclaw skill install healthcheck
openclaw skill install himalaya
openclaw skill install imsg
openclaw skill install mcporter
openclaw skill install nano-banana-pro
openclaw skill install nano-pdf
openclaw skill install obsidian
openclaw skill install openai-whisper
openclaw skill install openai-whisper-api
openclaw skill install openhue
openclaw skill install oracle
openclaw skill install ordercli
openclaw skill install peekaboo
openclaw skill install sag
openclaw skill install skill-creator
openclaw skill install songsee
openclaw skill install sonoscli
openclaw skill install summarize
openclaw skill install things-mac
openclaw skill install video-frames
openclaw skill install weather
openclaw skill install dropbox
openclaw skill install ga4-analytics
openclaw skill install gmail-client-PM
openclaw skill install gmail-oauth
openclaw skill install gsc
openclaw skill install marketing-mode
openclaw skill install phone-voice
```

---

## 📁 PHASE 3: WORKSPACE SETUP (15 minutes)

### Step 7: Clone Your Workspace (If migrating)
```bash
cd ~/.openclaw/workspace

# Option A: Git clone (if you have a repo)
git clone https://github.com/YOURUSERNAME/openclaw-workspace.git .

# Option B: Copy from backup
cp -r /path/to/backup/workspace/* .
```

### Step 8: Create Essential Files
```bash
# Create core files if starting fresh
touch MEMORY.md
touch SOUL.md
touch USER.md
touch TOOLS.md
touch AGENTS.md
touch HEARTBEAT.md

# Create directory structure
mkdir -p mission-control/logs
mkdir -p mission-control/tasks
mkdir -p business/AgencyRankingsb
mkdir -p business/cushionfoamz
mkdir -p content/social-media-images
mkdir -p memory
mkdir -p scripts
mkdir -p projects/rankingsb/web
mkdir -p agents/spike/outputs
```

### Step 9: Copy Configuration Files
From your current machine, copy:
- `SOUL.md` (your AI personality)
- `USER.md` (your preferences)
- `IDENTITY.md` (AI identity)
- `BOOTSTRAP.md` (if exists)
- `MEMORY.md` (recent memories)
- `creative/assets/` (brand files)
- `business/` (all business docs)
- `mission-control/` (system docs)

---

## 🤖 PHASE 4: AI CONFIGURATION (10 minutes)

### Step 10: Configure Default Model
```bash
# Set default model (Kimi K2.5 via OpenRouter)
openclaw config set default.model moonshot/kimi-k2.5

# Set API key
openclaw config set openrouter.api_key $OPENROUTER_API_KEY
```

### Step 11: Test Basic Functionality
```bash
# Test web search
openclaw search "test query"

# Test file operations
openclaw exec "ls -la"

# Test AI response
openclaw chat "Hello, confirm you're working"
```

---

## 🔧 PHASE 5: ADVANCED SETUP (20 minutes)

### Step 12: Configure Git
```bash
cd ~/.openclaw/workspace
git init
git remote add origin https://github.com/YOURUSERNAME/openclaw-workspace.git

# Create .gitignore
cat > .gitignore << 'EOF'
.env
node_modules/
*.log
.DS_Store
.vercel
dist/
build/
EOF

git add .
git commit -m "Initial workspace setup"
git push -u origin main
```

### Step 13: Set Up Cron Jobs
```bash
# Edit crontab
crontab -e

# Add these lines:
# Morning brief at 8 AM
0 8 * * * cd ~/.openclaw/workspace && openclaw exec "openclaw-agent morning-brief"

# Nightly build at 11 PM
0 23 * * * cd ~/.openclaw/workspace && openclaw exec "openclaw-agent nightly-build"

# Activity log check every 3 hours
0 */3 * * * cd ~/.openclaw/workspace && openclaw exec "echo '$(date): Check-in' >> mission-control/logs/activity.log"
```

### Step 14: Configure Discord Integration
```bash
# Set Discord webhook
openclaw config set discord.webhook_url $DISCORD_WEBHOOK_URL

# Test notification
openclaw notify "OpenClaw setup complete on new machine"
```

### Step 15: Install Additional Tools
```bash
# Homebrew packages
brew install gh
brew install git
brew install node
brew install watchman

# npm packages
npm install -g vercel
npm install -g typescript
npm install -g @anthropic-ai/claude-code
```

---

## ✅ PHASE 6: VERIFICATION (10 minutes)

### Run Complete Test
```bash
# Create test file
openclaw exec "echo 'Test' > test.txt"

# Read it back
openclaw exec "cat test.txt"

# Web search
openclaw search "OpenClaw AI"

# Git operations
openclaw exec "git status"

# AI conversation
openclaw chat "What's my name?"  # Should know from USER.md
```

### Verify All Skills
```bash
# List installed skills
openclaw skill list

# Test a few key ones
openclaw skill test weather
openclaw skill test github
openclaw skill test gog
```

---

## 📋 POST-SETUP CHECKLIST

- [ ] Node.js v20+ installed
- [ ] OpenClaw CLI installed
- [ ] Gateway running
- [ ] .env file configured
- [ ] All skills installed
- [ ] Workspace cloned/created
- [ ] Core files (SOUL.md, USER.md, etc.) in place
- [ ] Git configured and pushed
- [ ] Cron jobs set up
- [ ] Discord integration working
- [ ] AI model configured
- [ ] Tested basic operations
- [ ] Tested advanced operations

---

## 🚀 QUICK START (After Setup)

```bash
# Daily workflow
cd ~/.openclaw/workspace
openclaw gateway start

# Check dashboard
open dashboard.html

# View activity log
open mission-control/logs/activity.log

# Start working
openclaw chat "Good morning, what's on the agenda?"
```

---

## 🆘 TROUBLESHOOTING

### Gateway Won't Start
```bash
# Kill existing processes
pkill -f openclaw

# Restart
openclaw gateway restart
```

### Skills Not Working
```bash
# Reinstall skill
openclaw skill remove SKILLNAME
openclaw skill install SKILLNAME
```

### AI Not Responding
```bash
# Check API key
openclaw config get openrouter.api_key

# Test connection
openclaw chat "test"
```

### Permission Errors
```bash
# Fix permissions
chmod -R 755 ~/.openclaw
```

---

## 📞 SUPPORT

- **OpenClaw Docs:** https://docs.openclaw.ai
- **Community:** https://discord.com/invite/clawd
- **GitHub:** https://github.com/openclaw/openclaw

---

**Total Setup Time:** ~90 minutes  
**Result:** Fully functional OpenClaw with all current capabilities

*Guide Version: 2026.2.21*  
*For:** Advanced setup matching current production environment*
