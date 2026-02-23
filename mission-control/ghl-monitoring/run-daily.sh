#!/bin/bash
# Sal's GHL Daily Monitor - Automation Script
# Place this in crontab: 0 18 * * * /path/to/ghl-monitoring/run-daily.sh

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
LOG_FILE="$SCRIPT_DIR/logs/cron-$(date +%Y-%m-%d).log"

echo "==========================================" >> "$LOG_FILE"
echo "GHL Monitor Started: $(date)" >> "$LOG_FILE"
echo "==========================================" >> "$LOG_FILE"

cd "$SCRIPT_DIR"
node ghl-monitor.js >> "$LOG_FILE" 2>&1

EXIT_CODE=$?

if [ $EXIT_CODE -eq 0 ]; then
    echo "✅ Monitor completed successfully" >> "$LOG_FILE"
else
    echo "❌ Monitor failed with exit code $EXIT_CODE" >> "$LOG_FILE"
fi

echo "Finished: $(date)" >> "$LOG_FILE"
echo "" >> "$LOG_FILE"

# Optional: Send notification (configure webhook or email)
# if command -v curl &> /dev/null; then
#     curl -X POST -H 'Content-type: application/json' \
#         --data '{"text":"Sal GHL daily report is ready"}' \
#         YOUR_WEBHOOK_URL_HERE
# fi

exit $EXIT_CODE
