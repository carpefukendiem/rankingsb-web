# WHISPER VOICE SETUP GUIDE
## OpenAI Whisper + ElevenLabs TTS Configuration
### For: Ruben's iMac | February 16, 2026

---

## 🎯 WHAT WE'RE BUILDING

**Input:** You speak → Whisper transcribes → I understand  
**Output:** I respond → ElevenLabs speaks → You hear voice

**Result:** Natural voice conversation with Johnny 5

---

## STEP 1: INSTALL OPENAI WHISPER

### Option A: Homebrew (Easiest)

```bash
# Install Whisper via Homebrew
brew install openai-whisper

# Test installation
whisper --version
```

### Option B: Python pip

```bash
# Install Python dependencies
pip install openai-whisper

# Or with specific backend
pip install openai-whisper[faster-whisper]
```

### Option C: OpenClaw Native (If Available)

```bash
# Check if OpenClaw has audio extension
openclaw ext install audio

# Or enable if already installed
openclaw ext enable audio
```

---

## STEP 2: CONFIGURE WHISPER IN OPENC LAW

### Edit Config File:

```bash
nano ~/.openclaw/config.yaml
```

### Add This Section:

```yaml
audio:
  input:
    enabled: true
    provider: "whisper"
    model: "base"  # Options: tiny, base, small, medium, large
    language: "en"
    device: "microphone"
    
    # Trigger options:
    trigger: "push-to-talk"  # Hold key to speak
    # OR
    # trigger: "voice-activation"  # Auto-detect speech
    
    # Push-to-talk key (if using PTT)
    ptt_key: "right_option"  # Or "f13", "caps_lock"
    
    # Voice activation settings (if using VA)
    wake_word: "Hey Johnny"
    silence_timeout: 2.0  # Seconds of silence to stop recording
    
  output:
    enabled: true  # For TTS responses
```

---

## STEP 3: TEST WHISPER

### Create Test Script:

```bash
# Create test file
nano ~/test-whisper.sh
```

```bash
#!/bin/bash
echo "Recording... Speak now (5 seconds)"
ffmpeg -f avfoundation -i ":0" -t 5 ~/test-recording.wav

echo "Transcribing..."
whisper ~/test-recording.wav --model base --language en

echo "Done!"
```

### Run Test:

```bash
chmod +x ~/test-whisper.sh
~/test-whisper.sh
```

**If it works:** You'll see transcribed text  
**If not:** Check microphone permissions

---

## STEP 4: MAC MICROPHONE PERMISSIONS

### Grant Permissions:

1. **System Preferences → Security & Privacy → Privacy → Microphone**
2. **Check:** Terminal (or iTerm)
3. **Check:** OpenClaw (if applicable)
4. **Restart** Terminal after granting

### Test Mic:

```bash
# List audio devices
ffmpeg -f avfoundation -list_devices true -i ""

# Record 5 seconds
ffmpeg -f avfoundation -i ":0" -t 5 ~/test.wav

# Play back
afplay ~/test.wav
```

---

## STEP 5: INTEGRATE WITH OPENC LAW

### Option A: OpenClaw Audio Extension (Recommended)

Once whisper is installed, add to OpenClaw:

```yaml
# ~/.openclaw/config.yaml

skills:
  entries:
    audio:
      enabled: true
      whisper:
        model: "base"
        language: "en"
        device: "default"
```

### Option B: Custom Script Integration

Create voice input handler:

```bash
# ~/voice-to-openclaw.sh
#!/bin/bash

# Record audio
ffmpeg -f avfoundation -i ":0" -t 10 /tmp/voice-input.wav

# Transcribe
TRANSCRIPT=$(whisper /tmp/voice-input.wav --model base --language en --output_txt --fp16 False | head -1)

# Send to OpenClaw
openclaw chat send "$TRANSCRIPT"
```

---

## STEP 6: KEYBOARD SHORTCUT (OPTIONAL)

### Create Global Hotkey:

```bash
# Install skhd (hotkey daemon)
brew install koekeishiya/formulae/skhd

# Create config
nano ~/.skhdrc
```

```bash
# ~/.skhdrc
# Press Cmd+Shift+J to trigger voice

ctrl + shift + j : ~/voice-to-openclaw.sh
```

```bash
# Start skhd
skhd --start-service
```

---

## 🎙️ ELEVENLABS TTS CONFIGURATION

### Already in Your Config!

I can see in your OpenClaw config:
```yaml
skills:
  entries:
    sag:
      apiKey: "..."  # ElevenLabs API key present!
```

### Enable Voice Output:

Edit `~/.openclaw/config.yaml`:

```yaml
audio:
  output:
    enabled: true
    provider: "elevenlabs"
    api_key: "${skills.sag.apiKey}"  # Uses existing key
    voice: "Nova"  # Options below
    model: "eleven_turbo_v2"
    autoplay: true  # Speak all responses
    
  # Alternative: Only speak when requested
  # trigger_word: "speak"  # Say "speak" to hear voice
```

### Voice Options (ElevenLabs):

| Voice ID | Name | Style |
|----------|------|-------|
| Nova | Female | Warm, professional |
| Adam | Male | Natural, conversational |
| Bella | Female | Soft, approachable |
| Josh | Male | Deep, authoritative |
| Rachel | Female | Clear, energetic |
| Sam | Male | Young, casual |

**Recommendation:** Nova (warm, professional, easy to listen to)

---

## 🔧 COMPLETE CONFIGURATION

### Full Audio Section for ~/.openclaw/config.yaml:

```yaml
audio:
  # INPUT: You speak to me
  input:
    enabled: true
    provider: "whisper"
    model: "base"  # Good balance of speed/accuracy
    language: "en"
    device: "default"
    trigger: "push-to-talk"
    ptt_key: "right_option"  # Hold Right Option to speak
    
  # OUTPUT: I speak to you
  output:
    enabled: true
    provider: "elevenlabs"
    voice: "Nova"
    model: "eleven_turbo_v2"
    autoplay: true
    speed: 1.0  # Normal speed
    
  # Visual feedback
  feedback:
    show_waveform: true  # Show audio levels
    transcribe_inline: true  # Show text as you speak
```

---

## 🚀 USAGE

### Once Configured:

**To speak to me:**
1. Hold `Right Option` key
2. Speak clearly
3. Release key
4. Wait for transcription
5. I process and respond
6. I speak response (ElevenLabs voice)

**Example conversation:**
```
You: [Hold Option] "What's on my todo list?" [Release]
System: Transcribing...
Me: "You have 3 critical tasks today: 1. Launch Rankingsb at 9 AM..."
[ElevenLabs voice speaks response]
```

---

## 📋 INSTALLATION CHECKLIST

- [ ] Install Whisper (`brew install openai-whisper`)
- [ ] Test Whisper recording
- [ ] Grant microphone permissions
- [ ] Edit `~/.openclaw/config.yaml` with audio section
- [ ] Restart OpenClaw
- [ ] Test voice input
- [ ] Test voice output (ElevenLabs)
- [ ] Set up push-to-talk key
- [ ] Practice conversation

---

## 🐛 TROUBLESHOOTING

### "Microphone not found"
```bash
# List devices
ffmpeg -f avfoundation -list_devices true -i ""

# Use specific device
audio:
  device: ":0"  # Change to your device ID
```

### "Whisper not responding"
- Check model size (use "base" for speed)
- Check RAM usage (large models need 8GB+)
- Try faster-whisper backend

### "ElevenLabs not speaking"
- Verify API key in config
- Check internet connection
- Test with simple text: `sag "Hello, this is a test"`

### "Audio cuts off"
- Increase silence_timeout
- Speak clearly and pause between sentences
- Check microphone sensitivity

---

## 💡 PRO TIPS

1. **Start with "base" model** - Fast, good accuracy
2. **Use quiet environment** - Less background noise = better transcription
3. **Speak naturally** - Don't over-enunciate
4. **Pause between sentences** - Helps with processing
5. **Keep mic close** - 6-12 inches optimal

---

## 🎯 NEXT STEPS

**You do:**
1. Install Whisper: `brew install openai-whisper`
2. Edit config with audio section above
3. Grant mic permissions
4. Test recording

**I do:**
1. Enable Tailscale (next file)
2. Sync to Dropbox (next file)
3. Create Seedance prompts (next file)

**Then:** We test voice conversation!

---

*Setup guide created: February 16, 2026*  
*Status: Awaiting your installation*