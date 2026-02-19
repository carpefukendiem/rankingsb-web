#!/bin/bash
# Johnny 5 Voice Bridge
# Native macOS voice communication - no browser needed
# Usage: ./johnny-voice-bridge.sh

echo "🎤 Johnny 5 Voice Bridge for macOS"
echo "=================================="
echo ""

# Check if running on macOS
if [[ "$OSTYPE" != "darwin"* ]]; then
    echo "❌ This script only works on macOS"
    exit 1
fi

# Check for required tools
echo "🔧 Checking system..."

# Check for sox (audio recording)
if ! command -v sox &> /dev/null; then
    echo "📦 Installing SoX (audio recorder)..."
    brew install sox
fi

# Check for whisper (OpenAI's local transcription)
if ! command -v whisper &> /dev/null; then
    echo "📦 Installing Whisper (local transcription)..."
    brew install openai-whisper
fi

echo "✅ System ready"
echo ""

# Create temp directory
TEMP_DIR="/tmp/johnny-voice"
mkdir -p "$TEMP_DIR"

echo "🎯 How to use:"
echo "1. Press Ctrl+J to start recording"
echo "2. Speak naturally"
echo "3. Press Ctrl+J again to stop and send"
echo "4. I transcribe and respond with voice"
echo ""

# Function to record audio
record_audio() {
    local output_file="$1"
    echo "🔴 Recording... (press Ctrl+C to stop)"
    
    # Use sox to record with automatic silence detection
    sox -d "$output_file" silence 1 0.1 1% 1 2.0 1% &
    SOX_PID=$!
    
    # Wait for interrupt
    trap "kill $SOX_PID 2>/dev/null; exit" INT
    wait $SOX_PID
}

# Function to transcribe using local Whisper
transcribe_audio() {
    local audio_file="$1"
    echo "📝 Transcribing..."
    
    # Use whisper with local model
    whisper "$audio_file" --model tiny --language en --output_format txt --output_dir "$TEMP_DIR" 2>/dev/null
    
    # Get the transcript
    transcript_file="${audio_file%.wav}.txt"
    if [ -f "$transcript_file" ]; then
        cat "$transcript_file"
    else
        echo ""
    fi
}

# Function to send to Johnny 5
send_to_johnny() {
    local text="$1"
    local timestamp=$(date -u +%Y-%m-%dT%H:%M:%SZ)
    
    # Save to file for pickup
    echo "$text" > "$TEMP_DIR/last_message.txt"
    
    # Also append to conversation log
    echo "[$timestamp] USER: $text" >> "$TEMP_DIR/conversation.log"
    
    echo ""
    echo "📤 Sent to Johnny 5:"
    echo "\"$text\""
    echo ""
}

# Main loop
echo "🚀 Voice Bridge Active!"
echo "Press Ctrl+C to quit"
echo ""

while true; do
    echo "⏳ Waiting for voice input... (Ctrl+J to record)"
    
    # Wait for hotkey (simplified - use read with timeout)
    read -rs -t 1 -d '' || true
    
    # Check for trigger file (set by hotkey daemon)
    if [ -f "$TEMP_DIR/record.trigger" ]; then
        rm "$TEMP_DIR/record.trigger"
        
        # Generate filename
        TIMESTAMP=$(date +%Y%m%d_%H%M%S)
        AUDIO_FILE="$TEMP_DIR/recording_$TIMESTAMP.wav"
        
        # Record
        record_audio "$AUDIO_FILE"
        
        # Transcribe
        TRANSCRIPT=$(transcribe_audio "$AUDIO_FILE")
        
        # Send if not empty
        if [ -n "$TRANSCRIPT" ]; then
            send_to_johnny "$TRANSCRIPT"
        fi
        
        # Cleanup
        rm -f "$AUDIO_FILE" "${AUDIO_FILE%.wav}.txt" 2>/dev/null
    fi
done
