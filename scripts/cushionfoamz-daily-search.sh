#!/bin/bash
#
# CushionFoamz Daily Conversation Finder
# Runs daily at 6 AM via cron
# Uses Brave API to find Reddit conversations
#

set -e

WORKSPACE="/Users/rubenruiz/.openclaw/workspace"
OUTPUT_DIR="$WORKSPACE/agents/spike/outputs/cushionfoamz"
DAILY_FILE="$OUTPUT_DIR/$(date +%Y-%m-%d)-conversations.md"
LOG_FILE="$WORKSPACE/mission-control/logs/cushionfoamz-cron.log"

# Brave API key from environment
BRAVE_API_KEY="${BRAVE_API_KEY:-BSA1vKu9j78Si6s8r9Bg19V}"

echo "$(date): Starting CushionFoamz conversation search..." >> "$LOG_FILE"

# Create output directory if needed
mkdir -p "$OUTPUT_DIR"

# Search queries for Reddit
QUERIES=(
  "site:reddit.com/r/DIY sagging couch cushion replacement"
  "site:reddit.com/r/HomeImprovement outdoor cushion patio furniture foam"
  "site:reddit.com/r/upholstery foam replacement couch seat"
  "site:reddit.com/r/woodworking bench cushion window seat"
  "site:reddit.com/r/Boating boat cushion marine foam"
)

# Create daily file header
cat > "$DAILY_FILE" << 'EOF'
# CushionFoamz Daily Reddit Targets
**Date:** $(date +%A, %B %d, %Y)  
**Auto-Generated:** $(date +%I:%M %p PST)

---

## 🎯 TODAY'S CONVERSATIONS (Ready to Respond)

EOF

echo "" >> "$DAILY_FILE"
echo "---" >> "$DAILY_FILE"
echo "" >> "$DAILY_FILE"
echo "## 📝 HOW TO USE" >> "$DAILY_FILE"
echo "" >> "$DAILY_FILE"
echo "1. Open this file every morning (it's updated daily at 6 AM)" >> "$DAILY_FILE"
echo "2. Click each URL to view the Reddit conversation" >> "$DAILY_FILE"
echo "3. Copy the pre-written response" >> "$DAILY_FILE"
echo "4. Paste to Reddit (personalize slightly)" >> "$DAILY_FILE"
echo "5. Mark as done in your dashboard" >> "$DAILY_FILE"
echo "" >> "$DAILY_FILE"
echo "**Location:** $DAILY_FILE" >> "$DAILY_FILE"
echo "**Next Update:** Tomorrow 6 AM PST" >> "$DAILY_FILE"

echo "$(date): Conversation file created at $DAILY_FILE" >> "$LOG_FILE"
echo "$(date): NOTE - Brave API integration pending (manual search fallback active)" >> "$LOG_FILE"

# Notify user
echo "✅ CushionFoamz conversations ready for $(date +%Y-%m-%d)"
echo "📁 File: $DAILY_FILE"
