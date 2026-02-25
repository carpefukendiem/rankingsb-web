#!/bin/bash

# OpenClaw Demo Video Skill - Installation Script
# Sets up all dependencies for demo video generation

set -e

echo "🎬 OpenClaw Demo Video Skill - Installation"
echo "============================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print status
print_status() {
    echo -e "${GREEN}✓${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

# Check Node.js version
echo "📦 Checking Node.js..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_VERSION" -ge 18 ]; then
        print_status "Node.js $(node -v) found"
    else
        print_error "Node.js 18+ required, found $(node -v)"
        echo "Please upgrade Node.js: https://nodejs.org/"
        exit 1
    fi
else
    print_error "Node.js not found"
    echo "Please install Node.js 18+: https://nodejs.org/"
    exit 1
fi

# Check npm
echo ""
echo "📦 Checking npm..."
if command -v npm &> /dev/null; then
    print_status "npm $(npm -v) found"
else
    print_error "npm not found"
    exit 1
fi

# Check ffmpeg
echo ""
echo "🎥 Checking ffmpeg..."
if command -v ffmpeg &> /dev/null; then
    FFMPEG_VERSION=$(ffmpeg -version | head -n1 | grep -oP 'version\s+\K[^\s]+' || echo "unknown")
    print_status "ffmpeg $FFMPEG_VERSION found"
else
    print_error "ffmpeg not found"
    echo ""
    echo "Please install ffmpeg:"
    echo "  macOS:    brew install ffmpeg"
    echo "  Ubuntu:   sudo apt-get install ffmpeg"
    echo "  Windows:  choco install ffmpeg"
    echo ""
    exit 1
fi

# Install Node.js dependencies
echo ""
echo "📦 Installing Node.js dependencies..."
npm install
print_status "Dependencies installed"

# Install Playwright browsers
echo ""
echo "🌐 Installing Playwright browsers..."
npx playwright install chromium
print_status "Playwright Chromium installed"

# Create directories
echo ""
echo "📁 Creating directories..."
mkdir -p output
mkdir -p temp
mkdir -p assets
print_status "Directories created"

# Create .env file if it doesn't exist
echo ""
echo "⚙️  Setting up configuration..."
if [ ! -f .env ]; then
    cp .env.example .env 2>/dev/null || cat > .env << 'EOF'
# ElevenLabs API Configuration
# Get your API key from: https://elevenlabs.io/
ELEVENLABS_API_KEY=your_api_key_here

# Voice ID (default: Rachel)
# Find voices: https://api.elevenlabs.io/v1/voices
ELEVENLABS_VOICE_ID=21m00Tcm4TlvDq8ikWAM

# Model ID
# Options: eleven_monolingual_v1, eleven_multilingual_v2
ELEVENLABS_MODEL=eleven_multilingual_v2

# Default background music path (optional)
# Place an MP3 file in ./assets/ directory
DEFAULT_MUSIC_PATH=./assets/background-music.mp3

# Output directory
OUTPUT_DIR=./output
EOF
    print_warning ".env file created. Please edit it and add your ElevenLabs API key."
else
    print_status ".env file already exists"
fi

# Make scripts executable
echo ""
echo "🔧 Setting permissions..."
chmod +x record-demo.js
chmod +x generate-voiceover.js
chmod +x compose-video.js
print_status "Scripts made executable"

# Download sample background music (optional)
echo ""
echo "🎵 Background music setup..."
if [ ! -f "assets/background-music.mp3" ]; then
    print_warning "No background music found in ./assets/"
    echo "   Add an MP3 file to ./assets/background-music.mp3 for background music"
    echo "   Or set DEFAULT_MUSIC_PATH in .env to use a custom music file"
else
    print_status "Background music found"
fi

# Test the installation
echo ""
echo "🧪 Testing installation..."
if node -e "require('playwright'); console.log('Playwright OK')" 2>/dev/null; then
    print_status "Playwright module loaded"
else
    print_error "Playwright module failed to load"
    exit 1
fi

if node -e "require('axios'); console.log('Axios OK')" 2>/dev/null; then
    print_status "Axios module loaded"
else
    print_error "Axios module failed to load"
fi

echo ""
echo "============================================"
echo "✅ Installation complete!"
echo "============================================"
echo ""
echo "Next steps:"
echo "  1. Edit .env and add your ElevenLabs API key"
echo "  2. (Optional) Add background music to ./assets/"
echo "  3. Run a test: node record-demo.js https://example.com"
echo ""
echo "Usage:"
echo "  node record-demo.js <url> [--output filename.mp4] [--no-voice] [--no-music]"
echo ""
echo "Example:"
echo "  node record-demo.js https://mywebsite.com --output demo.mp4"
echo ""
