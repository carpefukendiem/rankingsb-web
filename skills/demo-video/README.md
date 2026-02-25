# OpenClaw Demo Video Skill

🎬 Automatically generate demo videos of AI-built features with voiceover and music.

## Quick Start

```bash
# 1. Install dependencies
./install.sh

# 2. Set your ElevenLabs API key in .env

# 3. Generate a demo video
./demovideo https://your-website.com
```

## What It Does

1. **Analyzes** your website to understand content and features
2. **Records** smooth scrolling screen capture using Playwright
3. **Generates** AI voiceover script from page content
4. **Synthesizes** speech using ElevenLabs
5. **Composes** final video with background music using ffmpeg
6. **Outputs** shareable MP4 file (30-60 seconds)

## Features

- ✅ Auto-scrolls through entire page
- ✅ AI-generated narration explaining the project
- ✅ Background music with fade effects
- ✅ Smooth video transitions
- ✅ 30-60 second format perfect for sharing
- ✅ Works with any website URL

## Usage

```bash
# Basic usage
./demovideo https://example.com

# With custom output name
./demovideo https://example.com --output my-demo.mp4

# Without voiceover
./demovideo https://example.com --no-voice

# Without background music
./demovideo https://example.com --no-music

# Show browser during recording (debug mode)
./demovideo https://example.com --headed
```

## Requirements

- Node.js 18+
- ffmpeg
- ElevenLabs API key (for voiceover)

## Installation

```bash
cd /Users/rubenruiz/.openclaw/workspace/skills/demo-video
chmod +x install.sh
./install.sh
```

## Configuration

Edit `.env` file:

```env
ELEVENLABS_API_KEY=your_api_key_here
ELEVENLABS_VOICE_ID=21m00Tcm4TlvDq8ikWAM
DEFAULT_MUSIC_PATH=./assets/background-music.mp3
OUTPUT_DIR=./output
```

## Project Structure

```
demo-video/
├── demovideo              # CLI wrapper script
├── record-demo.js         # Main orchestrator
├── generate-voiceover.js  # ElevenLabs TTS
├── compose-video.js       # ffmpeg composition
├── install.sh             # Setup script
├── SKILL.md               # Full documentation
├── .env                   # Your API keys
├── assets/                # Background music
├── output/                # Generated videos
└── temp/                  # Temporary files
```

## OpenClaw Integration

Add to your build pipeline:

```javascript
// Auto-generate demo after deployment
const { DemoRecorder } = require('./skills/demo-video/record-demo');

async function onDeploySuccess(url) {
  const recorder = new DemoRecorder(url);
  const videoPath = await recorder.run();
  console.log(`Demo video: ${videoPath}`);
}
```

## License

MIT - Part of OpenClaw
