#!/bin/bash
# Discord Automation Test Script
# Verifies webhook connectivity and sends test messages

echo "🤖 Discord Automation Test"
echo "=========================="
echo ""

# Check if webhook URLs are configured
DAILY_BRIEF_WEBHOOK=$(openclaw config get messaging.discord.daily-briefs.webhook 2>/dev/null || echo "")
HOT_LEADS_WEBHOOK=$(openclaw config get messaging.discord.hot-leads.webhook 2>/dev/null || echo "")
SYSTEM_ALERTS_WEBHOOK=$(openclaw config get messaging.discord.system-alerts.webhook 2>/dev/null || echo "")

if [ -z "$DAILY_BRIEF_WEBHOOK" ]; then
    echo "❌ Daily brief webhook not configured"
    echo "   Run: openclaw config set messaging.discord.daily-briefs.webhook 'YOUR_URL'"
    echo ""
else
    echo "✅ Daily brief webhook configured"
    
    # Send test message
    echo "   Sending test to #daily-briefs..."
    curl -X POST -H "Content-Type: application/json" \
        -d '{"content":"🌅 **Morning Brief Test**\n\nDiscord automation is working! Johnny 5 will send your daily briefs here.\n\n⏰ Schedule: 6:00 AM and 6:00 PM PST"}' \
        "$DAILY_BRIEF_WEBHOOK" > /dev/null 2>&1
    
    if [ $? -eq 0 ]; then
        echo "   ✅ Test message sent successfully"
    else
        echo "   ❌ Failed to send test message"
    fi
    echo ""
fi

if [ -z "$HOT_LEADS_WEBHOOK" ]; then
    echo "❌ Hot leads webhook not configured"
    echo "   Run: openclaw config set messaging.discord.hot-leads.webhook 'YOUR_URL'"
    echo ""
else
    echo "✅ Hot leads webhook configured"
    
    echo "   Sending test to #hot-leads..."
    curl -X POST -H "Content-Type: application/json" \
        -d '{"content":"🔥 **Hot Lead Alert Test**\n\n**Name:** John Smith\n**Company:** ABC Electric\n**Phone:** (805) 555-1234\n**Score:** 9/10\n\nAction: Call within 30 minutes"}' \
        "$HOT_LEADS_WEBHOOK" > /dev/null 2>&1
    
    if [ $? -eq 0 ]; then
        echo "   ✅ Test message sent successfully"
    else
        echo "   ❌ Failed to send test message"
    fi
    echo ""
fi

if [ -z "$SYSTEM_ALERTS_WEBHOOK" ]; then
    echo "❌ System alerts webhook not configured"
    echo "   Run: openclaw config set messaging.discord.system-alerts.webhook 'YOUR_URL'"
    echo ""
else
    echo "✅ System alerts webhook configured"
    
    echo "   Sending test to #system-alerts..."
    curl -X POST -H "Content-Type: application/json" \
        -d '{"content":"⚙️ **System Check Test**\n\nAll systems operational.\nToken usage: Normal\nGit status: Clean\nDisk space: OK"}' \
        "$SYSTEM_ALERTS_WEBHOOK" > /dev/null 2>&1
    
    if [ $? -eq 0 ]; then
        echo "   ✅ Test message sent successfully"
    else
        echo "   ❌ Failed to send test message"
    fi
    echo ""
fi

echo "=========================="
echo ""
echo "Next steps:"
echo "1. Check your Discord channels for test messages"
echo "2. If messages appear, automation is ready!"
echo "3. Enable cron jobs with: openclaw cron enable"
echo ""
echo "Need help? Check DISCORD-AUTOMATION-SETUP.md"
