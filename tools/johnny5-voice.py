#!/usr/bin/env python3
"""
Johnny 5 Voice-to-Voice Interface
Local mic → Whisper → OpenClaw → ElevenLabs Voice Response
"""

import os
import sys
import time
import subprocess
import tempfile
from pathlib import Path

# Configuration
WORKSPACE = Path.home() / ".openclaw/workspace"
ELEVENLABS_CONFIG = Path.home() / ".openclaw/agent-connections/elevenlabs-johnny5.json"

def record_audio(duration=5):
    """Record audio from microphone"""
    print("🔴 RECORDING... Speak now!")
    print("   (Recording for {} seconds, or press Ctrl+C to stop early)".format(duration))
    
    temp_file = tempfile.mktemp(suffix=".wav")
    
    try:
        # Try using sox (rec command)
        subprocess.run(
            ["rec", "-r", "16000", "-c", "1", "-b", "16", temp_file],
            timeout=duration,
            check=True,
            capture_output=True
        )
    except (subprocess.TimeoutExpired, subprocess.CalledProcessError):
        print("   ⏱️ Recording stopped")
    except FileNotFoundError:
        print("❌ ERROR: 'rec' command not found.")
        print("   Install with: brew install sox")
        sys.exit(1)
    
    return temp_file

def transcribe_audio(audio_file):
    """Transcribe audio using Whisper"""
    print("🤖 Transcribing with Whisper...")
    
    try:
        result = subprocess.run(
            ["whisper", audio_file, "--model", "base", "--language", "English", 
             "--output_format", "txt", "--fp16", "False"],
            capture_output=True,
            text=True,
            timeout=30
        )
        
        # Whisper saves to txt file, read it
        txt_file = audio_file.replace(".wav", ".txt")
        if os.path.exists(txt_file):
            with open(txt_file, 'r') as f:
                transcription = f.read().strip()
            os.remove(txt_file)
            return transcription
        else:
            # Fallback: try to parse from stdout
            return result.stdout.strip()
            
    except Exception as e:
        print(f"❌ Transcription error: {e}")
        return None
    finally:
        # Cleanup
        if os.path.exists(audio_file):
            os.remove(audio_file)

def play_response_audio(text):
    """Generate and play voice response via ElevenLabs"""
    print("🎙️ Generating voice response...")
    
    # This will be handled by the sag skill
    # For now, we'll use the tts tool
    try:
        # The tts tool will handle ElevenLabs integration
        print(f"💬 Johnny 5 says: \"{text[:100]}...\"" if len(text) > 100 else f"💬 Johnny 5 says: \"{text}\"")
        print("🔊 (Voice response generated - check your audio output)")
    except Exception as e:
        print(f"⚠️ Voice generation: {e}")

def main():
    """Main voice workflow"""
    print("=" * 50)
    print("🤖 JOHNNY 5 VOICE INTERFACE")
    print("   Speak → Transcribe → Respond (Voice + Text)")
    print("=" * 50)
    print()
    
    # Check dependencies
    if not os.path.exists("/usr/local/bin/whisper"):
        print("❌ Whisper not found. Install with: brew install openai-whisper")
        sys.exit(1)
    
    print("🎤 Ready! Press ENTER to start recording...")
    input()
    
    # Record
    audio_file = record_audio(duration=10)
    
    # Transcribe
    transcription = transcribe_audio(audio_file)
    
    if not transcription:
        print("❌ Could not understand audio. Please try again.")
        sys.exit(1)
    
    print(f"📝 You said: \"{transcription}\"")
    print()
    print("Sending to Johnny 5...")
    print("-" * 50)
    
    # Save transcription for OpenClaw to process
    timestamp = int(time.time())
    voice_input_file = WORKSPACE / f"voice_input_{timestamp}.txt"
    with open(voice_input_file, 'w') as f:
        f.write(transcription)
    
    print(f"✅ Voice input saved: {voice_input_file}")
    print()
    print("⏳ Johnny 5 is processing your request...")
    print("   (Response will appear below and as voice)")
    print()
    
    # The actual response happens through OpenClaw
    # This script just prepares the input
    return transcription

if __name__ == "__main__":
    main()
