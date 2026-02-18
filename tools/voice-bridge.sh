#!/bin/bash
# Johnny 5 Voice Bridge
# Connects voice input to OpenClaw responses

VOICE_INPUT_DIR="/Users/rubenruiz/.openclaw/workspace"

# Watch for new voice input files
while true; do
    # Find newest voice input file
    LATEST=$(find "$VOICE_INPUT_DIR" -name "voice_input_*.txt" -type f -mmin -1 2>/dev/null | head -1)
    
    if [ -n "$LATEST" ]; then
        echo "🎙️ Voice input detected: $LATEST"
        
        # Read the transcription
        TEXT=$(cat "$LATEST")
        echo "📝 Transcription: $TEXT"
        
        # Mark as processed
        mv "$LATEST" "${LATEST}.processed"
        
        # Send to OpenClaw (this will appear in chat)
        echo ""
        echo "💬 Johnny 5 is responding..."
        echo ""
        
        # The response happens through the chat interface
        # This script just announces it
    fi
    
    # Check every 2 seconds
    sleep 2
done
