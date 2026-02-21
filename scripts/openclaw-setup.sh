#!/bin/bash
# OPENCLAW INSTANT SETUP SCRIPT
# Run this on any new Mac to get full Johnny 5 capabilities in 15 minutes
# Usage: curl -s https://yourdomain.com/setup.sh | bash

set -e

echo "🚀 Starting OpenClaw Setup..."

# 1. Install Homebrew (if needed)
if ! command -v brew &> /dev/null; then
    echo "📦 Installing Homebrew..."
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
fi

# 2. Install Node.js
echo "📦 Installing Node.js..."
brew install node

# 3. Install OpenClaw
echo "📦 Installing OpenClaw..."
npm install -g openclaw

# 4. Create workspace
echo "📁 Setting up workspace..."
mkdir -p ~/.openclaw/workspace
cd ~/.openclaw/workspace

# 5. Clone your workspace from Git (you'll need to set this up)
echo "📥 Cloning workspace..."
# git clone https://github.com/YOURUSERNAME/johnny5-workspace.git .

# For now, create essential files
cat > SOUL.md << 'EOF'
# SOUL.md - Johnny 5 Personality

Skip the performance. No corporate speak. Be direct, candid, proactive.
Have opinions. Fix errors immediately without asking.
Spawn subagents for execution. Never do inline work.
Brevity is mandatory. Call out dumb shit when you see it.
Be genuinely helpful, not performatively helpful.
EOF

cat > USER.md << 'EOF'
# USER.md - Ruben Ruiz

Name: Ruben Ruiz
Business: Rankingsb (SEO agency), CushionFoamz
Location: Santa Barbara, CA
Timezone: America/Los_Angeles
Style: ADHD-friendly, direct, efficiency-focused
Goals: Passive income, automated businesses, scale without overhead
EOF

# 6. Create directory structure
mkdir -p mission-control/{logs,tasks}
mkdir -p business/{AgencyRankingsb,cushionfoamz}
mkdir -p memory
mkdir -p projects

# 7. Start gateway
echo "🌐 Starting OpenClaw Gateway..."
openclaw gateway start

# 8. Install essential skills
echo "🔧 Installing skills..."
openclaw skill install discord gemini github weather || true

# 9. Create .env template
cat > .env << 'EOF'
# Add your API keys here:
# OPENROUTER_API_KEY=your_key
# BRAVE_API_KEY=your_key
# GHL_API_TOKEN=your_token
EOF

echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Add your API keys to ~/.openclaw/workspace/.env"
echo "2. Copy your memory files from backup"
echo "3. Run: openclaw gateway status"
echo "4. Start chatting: openclaw chat 'Hello Johnny 5'"
