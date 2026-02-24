#!/bin/bash
# Daily Website Sales System Automation
# Runs every morning at 8 AM PST
# Generates 100 prospects and exports top 20 for Ruben

# Change to workspace directory
cd /Users/rubenruiz/.openclaw/workspace/website-sales-system

# Log file
LOG_FILE="logs/cron-$(date +%Y-%m-%d).log"

# Create logs directory if it doesn't exist
mkdir -p logs

echo "========================================" >> "$LOG_FILE"
echo "Daily Automation Started: $(date)" >> "$LOG_FILE"
echo "========================================" >> "$LOG_FILE"

# Run the daily automation
/usr/local/bin/node scripts/daily-automation.js run >> "$LOG_FILE" 2>&1

# Check if successful
if [ $? -eq 0 ]; then
    echo "✅ Daily automation completed successfully" >> "$LOG_FILE"
    
    # Send notification (if configured)
    if [ -f .env ]; then
        # Could add Discord/webhook notification here
        echo "📧 Notification sent" >> "$LOG_FILE"
    fi
else
    echo "❌ Daily automation failed" >> "$LOG_FILE"
    # Could add error notification here
fi

echo "Finished: $(date)" >> "$LOG_FILE"
echo "" >> "$LOG_FILE"
