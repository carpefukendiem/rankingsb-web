# 🎙️ JOHNNY 5 VOICE WORKFLOW — Quick Start Guide

## WHAT YOU GET
✅ Talk to your Mac microphone  
✅ Automatic speech-to-text (Whisper)  
✅ I process your request  
✅ I respond with BOTH voice + text  

---

## 🚀 HOW TO USE

### Option 1: Simple Command
```bash
johnny5-voice
```

### Option 2: Direct Python
```bash
cd ~/.openclaw/workspace/tools
python3 johnny5-voice.py
```

### Option 3: Alias (Add to ~/.zshrc)
```bash
echo 'alias j5v="python3 ~/.openclaw/workspace/tools/johnny5-voice.py"' >> ~/.zshrc
source ~/.zshrc

# Then just type:
j5v
```

---

## 🎯 WORKFLOW

**Step 1:** Run command  
**Step 2:** Press ENTER when ready  
**Step 3:** Speak into your mic (up to 10 seconds)  
**Step 4:** Press Ctrl+C to stop recording early  
**Step 5:** Whisper transcribes your speech  
**Step 6:** I see the text and respond  
**Step 7:** You hear my voice + see text on screen  

---

## 🧪 TEST IT NOW

**Run:** `johnny5-voice`  

**Say:** "Hey Johnny, what's my schedule today?"  

**I'll respond with:**
- 🔊 Voice (via ElevenLabs)
- 💬 Text (in terminal/chat)

---

## 📁 FILES CREATED

```
~/.openclaw/workspace/tools/
├── johnny5-voice.sh       # Bash version
├── johnny5-voice.py       # Python version (recommended)
└── VOICE-WORKFLOW.md      # This guide

~/.bin/johnny5-voice       # Quick command alias
```

---

## 🔧 REQUIREMENTS

✅ Whisper (installed): `brew install openai-whisper`  
✅ Sox (for recording): `brew install sox`  
✅ Microphone access (grant when prompted)  
✅ ElevenLabs connected (already done!)  

---

## 💡 EXAMPLE COMMANDS TO TRY

**Business Tasks:**
- "Inject the 20 HVAC leads into GHL"
- "What did Spike find today?"
- "Give me my morning brief"

**CushionFoamz:**
- "Find me Reddit threads about cushions"
- "Draft a response for r/DIY"

**General:**
- "What's on my todo list?"
- "Update my activity log"
- "Create a new pipeline for roofers"

---

## 🎙️ VOICE RESPONSE

After you speak:
1. Text appears in chat/terminal
2. Voice plays automatically (ElevenLabs)
3. You can respond with voice again, or type

**Voice characteristics:**
- Johnny 5 personality (enthusiastic, helpful)
- Slight robotic charm
- "Number 5 is alive!" energy

---

## ⚡ ONE-TIME SETUP

Add this to your ~/.zshrc for easy access:

```bash
# Johnny 5 Voice Shortcut
export PATH="$HOME/.bin:$PATH"
alias j5="johnny5-voice"
alias j5v="johnny5-voice"
```

Then reload:
```bash
source ~/.zshrc
```

**Now just type:** `j5v` anywhere! 🎉

---

## 🐛 TROUBLESHOOTING

**"Recording failed":**
```bash
brew install sox
# Grant microphone access in System Preferences
```

**"Whisper not found":**
```bash
brew install openai-whisper
```

**"No voice response":**
- Check ElevenLabs connection: `~/.openclaw/agent-connections/elevenlabs-johnny5.json`
- Verify agent ID is correct
- Check internet connection

---

## 🎯 NEXT LEVEL

**Want continuous conversation?**
- Run `johnny5-voice` in a loop
- Each turn captures new speech
- Maintains conversation context

**Want hands-free?**
- Use voice activation word ("Hey Johnny")
- Requires additional setup with voice detection

---

**Ready to test? Run: `johnny5-voice` and say hello!** 🤖⚡
