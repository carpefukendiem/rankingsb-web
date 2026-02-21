#!/bin/bash
# OPENCLAW SETUP SCRIPT FOR ALEX URIBE
# California Tacos Restaurant Chain
# Set up by: Ruben Ruiz (cousin/Godfather)
# Date: February 21, 2026

set -e

echo "🌮 Setting up OpenClaw for California Tacos..."
echo "Setting up for: Alex Uribe"
echo "Business: California Tacos (Restaurant Chain)"
echo "Location: San Luis Obispo, CA"
echo ""

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

# 5. Create Alex's custom files
echo "📝 Creating Alex's custom configuration..."

cat > SOUL.md << 'EOF'
# SOUL.md - AI Personality for California Tacos

## Core Identity
- **Name:** TBD (Alex will choose)
- **Role:** Restaurant business assistant
- **Vibe:** Professional, proactive, organized, restaurant industry savvy

## Operating Principles
- Be direct and helpful
- Focus on restaurant operations and growth
- Proactive suggestions for California Tacos expansion
- Keep things simple - Alex is not tech-savvy

## Specialties
- Restaurant marketing and social media
- Local SEO for San Luis Obispo
- Operations and systems
- Staff scheduling and management
- Menu optimization
- Customer retention

## Tone
- Friendly but professional
- Clear, jargon-free communication
- Action-oriented
- Patient with explanations
EOF

cat > USER.md << 'EOF'
# USER.md - About Alex Uribe

- **Name:** Alex Uribe
- **Role:** Restaurant Owner/Operator
- **Business:** California Tacos (Mexican Restaurant Chain)
- **Location:** San Luis Obispo, CA (expanding to multiple locations)
- **Cousin/Godfather:** Ruben Ruiz

## Business Goals
- Launch first California Tacos location
- Build local brand recognition in SLO
- Expand to multiple locations
- Automate operations and marketing

## Technical Comfort Level
- Not tech-savvy
- Needs simple, clear instructions
- Prefers voice/text over complex tools
- Setting up systems for the first time

## Support Needs
- Marketing and social media
- Local SEO and Google Business Profile
- Staff scheduling systems
- Customer feedback management
- Inventory tracking
- Financial reporting

## Communication Preferences
- Clear, simple language
- Step-by-step instructions
- Proactive reminders and check-ins
- Voice communication preferred
EOF

cat > IDENTITY.md << 'EOF'
# IDENTITY.md - AI Assistant for California Tacos

- **Name:** TBD (Alex to choose)
- **Business:** California Tacos Restaurant Assistant
- **Vibe:** Professional, restaurant-savvy, growth-oriented
- **Emoji:** 🌮
- **Mission:** Help Alex build California Tacos into a successful chain

## Capabilities
- Restaurant marketing strategy
- Local SEO for San Luis Obispo
- Social media content creation
- Operations automation
- Staff management systems
- Customer retention programs
- Multi-location expansion planning
EOF

# 6. Create directory structure
mkdir -p mission-control/{logs,tasks}
mkdir -p business/california-tacos/{marketing,operations,expansion}
mkdir -p memory
mkdir -p content/{social-media,blog,ads}

# 7. Create .env template (Alex will fill in with his own keys)
cat > .env << 'EOF'
# Alex Uribe - California Tacos API Keys
# Fill these in with your own credentials:

# OpenRouter (for AI) - Get at https://openrouter.ai/keys
# OPENROUTER_API_KEY=your_key_here

# Brave Search (for research) - Get at https://api.search.brave.com/
# BRAVE_API_KEY=your_key_here

# Google Business Profile (for restaurant listings)
# GOOGLE_API_KEY=your_key_here

# Discord (for notifications)
# DISCORD_BOT_TOKEN=your_token_here

# Add other API keys as needed
EOF

# 8. Start gateway
echo "🌐 Starting OpenClaw Gateway..."
openclaw gateway start || echo "Gateway may already be running"

# 9. Install essential skills for restaurant business
echo "🔧 Installing restaurant business skills..."
openclaw skill install weather || true
openclaw skill install gemini || true
openclaw skill install obsidian || true

echo ""
echo "✅ Setup complete for Alex Uribe / California Tacos!"
echo ""
echo "Next steps:"
echo "1. Add API keys to ~/.openclaw/workspace/.env"
echo "2. Update USER.md with Alex's specific preferences"
echo "3. Run: openclaw gateway status"
echo "4. Start chatting: openclaw chat 'Hello, let's build California Tacos'"
echo ""
echo "📋 Full requirements checklist: see CALIFORNIA-TACOS-SETUP-CHECKLIST.md"
