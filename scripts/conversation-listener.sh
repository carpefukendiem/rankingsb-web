#!/bin/bash
#
# CushionFoamz Conversation Listener
# Tracks responses and monitors for follow-ups
# Usage: ./scripts/conversation-listener.sh
#

CAMPAIGN_DIR="business/cushionfoamz/01-marketing/reddit-campaigns"
LISTENER_FILE="$CAMPAIGN_DIR/conversation-listener.log"

echo "👂 CushionFoamz Conversation Listener"
echo "===================================="
echo ""

# Create listener log if doesn't exist
if [ ! -f "$LISTENER_FILE" ]; then
    echo "# Conversation Listener Log" > "$LISTENER_FILE"
    echo "# Tracks all CushionFoamz Reddit activity" >> "$LISTENER_FILE"
    echo "" >> "$LISTENER_FILE"
fi

# Show recent activity
echo "📊 RECENT ACTIVITY (Last 7 Days):"
echo "----------------------------------"
grep -E "(Posted|Upvoted|Replied)" "$LISTENER_FILE" 2>/dev/null | tail -10 || echo "No recent activity logged"

echo ""
echo "🎯 CONVERSATIONS TO MONITOR:"
echo "-----------------------------"

# Find all conversations marked as RESPONDED
for file in $CAMPAIGN_DIR/*.md; do
    if [ -f "$file" ]; then
        grep -B2 -A5 "Status:.*RESPONDED" "$file" 2>/dev/null | grep -E "(URL:|Posted by:)" | head -6
    fi
done

echo ""
echo "📝 LISTENER COMMANDS:"
echo "--------------------"
echo "Add to $LISTENER_FILE:"
echo ""
echo "$(date +%Y-%m-%d\ %H:%M) - Posted response to [conversation]"
echo "$(date +%Y-%m-%d\ %H:%M) - Got reply on [conversation] - responded"
echo "$(date +%Y-%m-%d\ %H:%M) - Got 3 upvotes on [conversation]"
echo ""
echo "🔄 Run this daily to check for replies and engagement"
