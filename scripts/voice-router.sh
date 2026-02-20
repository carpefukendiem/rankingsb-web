#!/bin/bash
#
# Voice-to-Task Pipeline
# Converts voice input into structured tasks/actions
# Usage: ./scripts/voice-router.sh < audio.wav
#

# Step 1: Transcribe with Whisper
echo "🎤 Transcribing audio..."
TRANSCRIPT=$(whisper "$1" --model base --output_format txt 2>/dev/null | head -1)

if [ -z "$TRANSCRIPT" ]; then
  echo "❌ Transcription failed"
  exit 1
fi

echo "📝 Transcript: $TRANSCRIPT"
echo ""

# Step 2: Route to appropriate pipeline
echo "🔍 Analyzing intent..."

# Graphics requests
if echo "$TRANSCRIPT" | grep -qi "logo\|design\|image\|graphic\|social.*post"; then
  echo "📊 Routing to: GRAPHICS PIPELINE"
  echo "   Intent: Visual content creation"
  echo ""
  echo "🎨 Executing:"
  
  if echo "$TRANSCRIPT" | grep -qi "logo"; then
    echo "   → nano-banana \"modern minimalist logo, [description], [brand colors]\""
  elif echo "$TRANSCRIPT" | grep -qi "social\|instagram\|facebook"; then
    echo "   → ./scripts/generate-social.sh rankingsb --days=1"
  fi
  
  exit 0
fi

# Code requests  
if echo "$TRANSCRIPT" | grep -qi "build\|create.*page\|landing.*page\|website\|fix.*bug"; then
  echo "💻 Routing to: CODE PIPELINE"
  echo "   Intent: Development task"
  echo ""
  echo "🚀 Executing:"
  
  if echo "$TRANSCRIPT" | grep -qi "landing.*page\|new.*page"; then
    PAGE_NAME=$(echo "$TRANSCRIPT" | grep -oE "for [a-z-]+" | sed 's/for //' || echo "new-page")
    echo "   → ./scripts/new-landing.sh --name=\"$PAGE_NAME\" --template=service-v1"
  fi
  
  exit 0
fi

# Content requests
if echo "$TRANSCRIPT" | grep -qi "write\|blog\|article\|content"; then
  echo "✍️  Routing to: CONTENT PIPELINE"
  echo "   Intent: Written content creation"
  exit 0
fi

# Default: Create task
echo "📋 Routing to: TASK CREATION"
echo "   Creating task from transcript..."
echo ""
echo "📝 Task: $TRANSCRIPT"
echo "   Add to: RUBEN-TODO-DASHBOARD.md"
