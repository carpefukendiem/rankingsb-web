#!/usr/bin/env python3
"""
Johnny 5 Voice Bridge
Simple, reliable voice communication for macOS
"""

import speech_recognition as sr
import os
import time
import sys
from datetime import datetime

# Configuration
TEMP_DIR = "/tmp/johnny-voice"
OUTPUT_FILE = os.path.expanduser("~/.openclaw/workspace/voice-input.txt")

def ensure_setup():
    """Ensure directories exist"""
    os.makedirs(TEMP_DIR, exist_ok=True)
    os.makedirs(os.path.dirname(OUTPUT_FILE), exist_ok=True)

def record_and_transcribe():
    """Record audio and transcribe to text"""
    recognizer = sr.Recognizer()
    
    print("\n🎤 Listening... (speak now)")
    print("   Press Ctrl+C to stop recording\n")
    
    with sr.Microphone() as source:
        # Adjust for ambient noise
        recognizer.adjust_for_ambient_noise(source, duration=0.5)
        
        try:
            # Listen until silence (2 seconds of silence = stop)
            audio = recognizer.listen(source, timeout=None, phrase_time_limit=30)
            
            print("📝 Transcribing...")
            
            # Use Google's speech recognition (requires internet)
            # For offline, use: recognizer.recognize_sphinx(audio)
            text = recognizer.recognize_google(audio)
            
            return text
            
        except sr.WaitTimeoutError:
            print("⏱️  No speech detected")
            return None
        except sr.UnknownValueError:
            print("❌ Could not understand audio")
            return None
        except sr.RequestError as e:
            print(f"❌ Speech recognition error: {e}")
            return None
        except KeyboardInterrupt:
            print("\n🛑 Stopped by user")
            return None

def send_to_johnny(text):
    """Send transcribed text to Johnny 5"""
    timestamp = datetime.now().isoformat()
    
    # Save to file
    with open(OUTPUT_FILE, 'w') as f:
        f.write(text)
    
    # Also log it
    log_file = os.path.expanduser("~/.openclaw/workspace/mission-control/logs/voice-messages.log")
    with open(log_file, 'a') as f:
        f.write(f"[{timestamp}] USER: {text}\n")
    
    print(f"\n✅ Sent to Johnny 5:")
    print(f"   \"{text}\"")
    print(f"\n📁 Saved to: {OUTPUT_FILE}")
    print("🤖 Johnny will respond with voice!\n")

def main_loop():
    """Main interaction loop"""
    ensure_setup()
    
    print("=" * 60)
    print("⚡ JOHNNY 5 VOICE BRIDGE")
    print("=" * 60)
    print("\n🎯 Press ENTER to start talking")
    print("   (Or press Ctrl+C to quit)\n")
    
    while True:
        try:
            input("⏳ ")  # Wait for Enter key
            
            text = record_and_transcribe()
            
            if text:
                send_to_johnny(text)
                print("-" * 60)
                print("🎯 Press ENTER to talk again\n")
            else:
                print("🎯 Press ENTER to try again\n")
                
        except KeyboardInterrupt:
            print("\n\n👋 Goodbye!")
            sys.exit(0)
        except Exception as e:
            print(f"\n❌ Error: {e}")
            print("🎯 Press ENTER to try again\n")

def check_dependencies():
    """Check if required packages are installed"""
    try:
        import speech_recognition
        return True
    except ImportError:
        return False

if __name__ == "__main__":
    if not check_dependencies():
        print("📦 Installing required packages...")
        print("   Run: pip3 install SpeechRecognition pyaudio")
        print("\n   Or: brew install portaudio && pip3 install SpeechRecognition pyaudio")
        sys.exit(1)
    
    main_loop()
