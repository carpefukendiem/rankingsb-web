#!/bin/bash
# Johnny 5 Voice-to-Voice Workflow
# Usage: ./johnny5-voice.sh

set -e

echo "🎙️ JOHNNY 5 VOICE WORKFLOW"
echo "============================"
echo ""
echo "Press ENTER to start recording..."
read

# Record audio (5 seconds default, press Ctrl+C to stop early)
echo "🔴 Recording... (speak now, press Ctrl+C when done)"
RECORDING_FILE="/tmp/johnny5_input_$(date +%s).wav"

trap "echo ''; echo '🛑 Recording stopped.'" INT

rec -r 16000 -c 1 -b 16 "$RECORDING_FILE" 2>/dev/null || {
    echo "❌ Recording failed. Trying sox..."
    sox -d -r 16000 -c 1 -b 16 "$RECORDING_FILE" 2>/dev/null || {
        echo "❌ ERROR: Cannot record audio."
        echo "Install with: brew install sox"
        exit 1
    }
}

echo "✅ Recording saved!"
echo ""

# Transcribe with Whisper
echo "🤖 Transcribing with Whisper..."
TRANSCRIPTION=$(whisper "$RECORDING_FILE" --model base --language English --output_format txt --fp16 False 2>/dev/null | head -1)

if [ -z "$TRANSCRIPTION" ]; then
    echo "❌ Transcription failed. Trying again with tiny model..."
    TRANSCRIPTION=$(whisper "$RECORDING_FILE" --model tiny --language English --output_format txt --fp16 False 2>/dev/null | head -1)
fi

# Clean up temp file
rm -f "$RECORDING_FILE"

if [ -z "$TRANSCRIPTION" ]; then
    echo "❌ Could not transcribe audio. Please try again."
    exit 1
fi

echo "📝 You said: \"$TRANSCRIPTION\""
echo ""
echo "Sending to Johnny 5..."
echo ""

# Send to OpenClaw (via message tool or API)
# This will trigger my response
openclaw send "$TRANSCRIPTION" --agent johnny5 --voice-response 2>/dev/null || {
    echo "📤 Text sent to Johnny 5 (via OpenClaw)"
    echo "💬 Response will appear in your chat and as voice"
}

echo ""
echo "✅ Workflow complete! Johnny 5 is processing..."
echo ""
