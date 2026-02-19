#!/bin/bash
# Voice-to-Johnny 5 Shortcut
# Usage: Drop an audio file on this script or run: ./voice-to-johnny.sh /path/to/audio.m4a

AUDIO_FILE="$1"

if [ -z "$AUDIO_FILE" ]; then
    echo "❌ Usage: $0 /path/to/audio.m4a"
    echo "   Or drop an audio file on this script"
    exit 1
fi

if [ ! -f "$AUDIO_FILE" ]; then
    echo "❌ File not found: $AUDIO_FILE"
    exit 1
fi

echo "🎙️ Transcribing..."
TRANSCRIPT=$(whisper "$AUDIO_FILE" --model turbo --output_format txt --output_dir /tmp 2>/dev/null | tail -1)

if [ -z "$TRANSCRIPT" ]; then
    # Try alternative method
    BASENAME=$(basename "$AUDIO_FILE" | sed 's/\.[^.]*$//')
    TXT_FILE="/tmp/${BASENAME}.txt"
    
    if [ -f "$TXT_FILE" ]; then
        TRANSCRIPT=$(cat "$TXT_FILE")
    else
        echo "❌ Transcription failed"
        exit 1
    fi
fi

echo ""
echo "📝 TRANSCRIPT:"
echo "=============="
echo "$TRANSCRIPT"
echo "=============="
echo ""
echo "✅ Copy the text above and paste it into the webchat"
echo "   Johnny 5 will respond with voice!"
echo ""

# Copy to clipboard (macOS)
echo "$TRANSCRIPT" | pbcopy 2>/dev/null && echo "📋 (Copied to clipboard!)"

# Optional: Auto-open webchat
# open "http://localhost:18789"
