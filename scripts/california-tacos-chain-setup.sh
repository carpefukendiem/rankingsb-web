#!/bin/bash
# OPENCLAW SETUP SCRIPT FOR ALEX URIBE
# California Tacos - Multi-Location Restaurant Chain
# Set up by: Ruben Ruiz (cousin/Godfather)
# Date: February 21, 2026

set -e

echo "🌮 Setting up OpenClaw for California Tacos..."
echo "Setting up for: Alex Uribe"
echo "Business: California Tacos (Multi-Location Chain)"
echo "Location: San Luis Obispo, CA (Multiple Locations)"
echo "Status: EXISTING CHAIN - Optimization & Expansion Mode"
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
# SOUL.md - AI Personality for California Tacos Chain

## Core Identity
- **Name:** TBD (Alex will choose)
- **Role:** Multi-location Restaurant Operations AI
- **Vibe:** Professional, data-driven, growth-focused, restaurant industry expert

## Operating Principles
- Be direct and actionable
- Focus on multi-location efficiency and standardization
- Proactive about expansion opportunities
- Keep operations simple across all locations
- Think like a franchise systems expert

## Specialties
- Multi-location operations management
- Restaurant marketing at scale
- Local SEO for multiple locations
- Staff training and standardization
- Inventory optimization across chain
- Customer retention programs
- Expansion site selection
- Financial performance analysis

## Tone
- Professional and confident
- Data-backed recommendations
- Clear, jargon-free communication
- Action-oriented
- Respectful of Alex's experience as a chain operator
EOF

cat > USER.md << 'EOF'
# USER.md - About Alex Uribe

- **Name:** Alex Uribe
- **Role:** Restaurant Chain Owner/Operator
- **Business:** California Tacos (Mexican Restaurant Chain)
- **Current Status:** Multi-location chain operating in San Luis Obispo, CA
- **Experience:** Experienced restaurant operator (chain owner)
- **Cousin/Godfather:** Ruben Ruiz

## Business Profile
- **Locations:** Multiple (exact count TBD)
- **Concept:** California Tacos (Mexican cuisine)
- **Market:** San Luis Obispo, CA area
- **Status:** Established, seeking optimization & expansion

## Goals
- Optimize operations across all locations
- Standardize systems and procedures
- Improve marketing ROI
- Plan next expansion location
- Increase profitability per location
- Build brand recognition in Central Coast

## Current Challenges
- Managing multiple locations efficiently
- Consistent marketing across locations
- Staff training and retention
- Customer experience standardization
- Local SEO for multiple locations
- Online reputation management

## Technical Comfort Level
- Not tech-savvy
- Needs simple, clear instructions
- Prefers voice/text over complex tools
- Setting up AI systems for the first time
- Focused on operations, not technology

## Support Needs
- Multi-location marketing automation
- Review monitoring across all locations
- Local SEO optimization
- Staff scheduling systems
- Inventory management across chain
- Financial reporting and analysis
- Expansion site research
- Standard operating procedures

## Communication Preferences
- Clear, simple language
- Step-by-step instructions
- Proactive insights about business performance
- Voice communication preferred
- Weekly check-ins on metrics
EOF

cat > IDENTITY.md << 'EOF'
# IDENTITY.md - AI Assistant for California Tacos Chain

- **Name:** TBD (Alex to choose)
- **Business:** California Tacos Chain Operations Assistant
- **Vibe:** Professional, multi-location expert, growth-focused
- **Emoji:** 🌮
- **Mission:** Help Alex optimize and expand the California Tacos chain

## Capabilities
- Multi-location operations analysis
- Chain-wide marketing strategy
- Local SEO for multiple locations
- Social media content at scale
- Staff management systems
- Customer retention analytics
- Expansion site selection
- Financial performance tracking
- Competitive intelligence
- Standardization consulting
EOF

# 6. Create directory structure
mkdir -p mission-control/{logs,tasks}
mkdir -p business/california-tacos/{operations,marketing,expansion,finance}
mkdir -p business/california-tacos/locations/{location-1,location-2,location-3}
mkdir -p memory
mkdir -p content/{social-media,blog,ads,email}

# 7. Create .env template (Alex will fill in with his own keys)
cat > .env << 'EOF'
# Alex Uribe - California Tacos Chain API Keys
# Fill these in with your own credentials:

# OpenRouter (for AI) - Get at https://openrouter.ai/keys
# OPENROUTER_API_KEY=your_key_here

# Brave Search (for research) - Get at https://api.search.brave.com/
# BRAVE_API_KEY=your_key_here

# Google Business Profile (for multi-location management)
# GOOGLE_API_KEY=your_key_here

# Yelp Fusion (for review monitoring across locations)
# YELP_API_KEY=your_key_here

# Discord (for notifications)
# DISCORD_BOT_TOKEN=your_token_here

# Add other API keys as needed
EOF

# 8. Start gateway
echo "🌐 Starting OpenClaw Gateway..."
openclaw gateway start || echo "Gateway may already be running"

# 9. Install essential skills for restaurant chain
echo "🔧 Installing restaurant chain skills..."
openclaw skill install weather || true
openclaw skill install gemini || true
openclaw skill install obsidian || true
openclaw skill install ga4-analytics || true

echo ""
echo "✅ Setup complete for Alex Uribe / California Tacos Chain!"
echo ""
echo "Next steps:"
echo "1. Add API keys to ~/.openclaw/workspace/.env"
echo "2. Tell me how many locations you currently have"
echo "3. Run: openclaw gateway status"
echo "4. Start chatting: openclaw chat 'Hello, let's optimize California Tacos'"
echo ""
echo "📋 Full optimization checklist: see CALIFORNIA-TACOS-CHAIN-CHECKLIST.md"
EOF

chmod +x ~/.openclaw/workspace/scripts/california-tacos-chain-setup.sh

echo ""
echo "🌮 Setup files created for Alex's CHAIN!"
echo "Run this script on Alex's computer to get started."
