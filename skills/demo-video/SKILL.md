# Demo Video Skill

Automatically generate demo videos of websites and AI-built features with AI voiceover and background music.

## Overview

This skill creates professional 30-60 second demo videos perfect for sharing on social media, in PRs, or documentation.

## Usage

```bash
# Generate a demo video for a website
/demovideo https://your-website.com

# Or run directly
node record-demo.js https://your-website.com
```

## Features

- 🎥 **Screen Recording**: Auto-captures full page scroll with smooth animations
- 🎙️ **AI Voiceover**: ElevenLabs-powered narration explaining the project
- 🎵 **Background Music**: Adds subtle background audio
- ✨ **Auto-Highlighting**: Detects and emphasizes key page elements
- 📱 **Mobile-Friendly**: Generates vertical format for social sharing
- 🚀 **One-Command**: Fully automated from URL to MP4

## How It Works

1. **Analyze**: Scrapes the website to understand content and features
2. **Script**: Generates a natural narration script using AI
3. **Record**: Uses Playwright to capture smooth scrolling footage
4. **Voice**: Converts script to speech with ElevenLabs
5. **Compose**: Combines video, voice, and music with ffmpeg
6. **Output**: Produces shareable MP4 file

## Requirements

- Node.js 18+
- ffmpeg installed
- Playwright browsers installed
- ElevenLabs API key (set in `.env`)

## Installation

```bash
cd /Users/rubenruiz/.openclaw/workspace/skills/demo-video
chmod +x install.sh
./install.sh
```

## Environment Variables

Create a `.env` file in the skill directory:

```env
ELEVENLABS_API_KEY=your_api_key_here
ELEVENLABS_VOICE_ID=your_preferred_voice_id
DEFAULT_MUSIC_PATH=./assets/background-music.mp3
OUTPUT_DIR=./output
```

## Output

Videos are saved to `./output/` with timestamped filenames:
```
output/demo-video-2024-02-24-15-30-45.mp4
```

## Customization

### Voice Options

Edit `generate-voiceover.js` to change voice settings:
- `voice_id`: Choose from ElevenLabs voices
- `model_id`: `eleven_monolingual_v1` or `eleven_multilingual_v2`
- `voice_settings`: Adjust stability, similarity, style

### Recording Settings

Edit `record-demo.js`:
- `viewport`: Screen resolution
- `duration`: Recording length
- `scrollSpeed`: How fast to scroll

### Video Composition

Edit `compose-video.js`:
- Music volume
- Voice volume
- Fade durations
- Output format

## File Structure

```
demo-video/
├── SKILL.md              # This documentation
├── record-demo.js        # Main recording orchestrator
├── generate-voiceover.js # ElevenLabs TTS integration
├── compose-video.js      # ffmpeg video composition
├── install.sh            # Setup script
├── package.json          # Dependencies
├── .env                  # API keys (not committed)
├── assets/               # Background music, etc.
└── output/               # Generated videos
```

## Integration with OpenClaw

Add to your OpenClaw commands to auto-generate demos after builds:

```javascript
// In your build completion handler
if (buildSuccess && process.env.AUTO_DEMO_VIDEOS === 'true') {
  const { generateDemo } = require('./skills/demo-video/record-demo');
  await generateDemo(deployedUrl);
}
```

## Examples

### Basic Website Demo
```bash
/demovideo https://myapp.com
```

### Specific Feature Demo
```bash
/demovideo https://myapp.com/pricing
```

### With Custom Output Name
```bash
node record-demo.js https://myapp.com --output my-demo.mp4
```

## Troubleshooting

**Playwright not found**: Run `npx playwright install`

**ffmpeg errors**: Ensure ffmpeg is installed: `brew install ffmpeg` (macOS) or `apt-get install ffmpeg` (Linux)

**ElevenLabs rate limit**: The script includes automatic retries with exponential backoff

**Video too long/short**: Adjust `TARGET_DURATION` in `record-demo.js`

## License

MIT - Part of OpenClaw Skills Collection
