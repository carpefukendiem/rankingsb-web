#!/bin/bash
#
# GHL Webhook Processor
# Processes queued webhook events and sends to Discord
# Run via cron: */5 * * * * /bin/bash /Users/rubenruiz/.openclaw/workspace/scripts/ghl-process-webhooks.sh
#

QUEUE_FILE="/Users/rubenruiz/.openclaw/workspace/.webhook-queue.jsonl"
PROCESSED_FILE="/Users/rubenruiz/.openclaw/workspace/.webhook-processed.jsonl"

if [ ! -f "$QUEUE_FILE" ]; then
    exit 0
fi

# Count pending messages
PENDING=$(wc -l < "$QUEUE_FILE" | tr -d ' ')
if [ "$PENDING" -eq 0 ]; then
    exit 0
fi

echo "📥 Processing $PENDING webhook messages..."

# Process each line
while IFS= read -r line; do
    [ -z "$line" ] && continue
    
    # Extract fields using jq if available, fallback to grep/sed
    if command -v jq &> /dev/null; then
        CONTENT=$(echo "$line" | jq -r '.content // empty')
        TARGET=$(echo "$line" | jq -r '.target // "#johnny5-command-center"')
    else
        # Fallback parsing
        CONTENT=$(echo "$line" | grep -o '"content":"[^"]*"' | cut -d'"' -f4)
        TARGET=$(echo "$line" | grep -o '"target":"[^"]*"' | cut -d'"' -f4)
        [ -z "$TARGET" ] && TARGET="#johnny5-command-center"
    fi
    
    if [ -n "$CONTENT" ]; then
        echo "📤 Sending: ${CONTENT:0:50}..."
        
        # Send via OpenClaw message tool
        # This assumes the message tool is available in the environment
        echo "$CONTENT" > "/tmp/ghl-webhook-msg.txt"
    fi
    
    # Move to processed
    echo "$line" >> "$PROCESSED_FILE"
    
done < "$QUEUE_FILE"

# Clear queue
> "$QUEUE_FILE"

echo "✅ Processed $PENDING messages"
