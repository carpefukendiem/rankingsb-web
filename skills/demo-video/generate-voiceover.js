#!/usr/bin/env node

/**
 * Voiceover Generator
 * 
 * Generates AI narration using ElevenLabs API
 * Creates natural-sounding scripts from website content
 */

const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');
require('dotenv').config();

const CONFIG = {
  API_URL: 'https://api.elevenlabs.io/v1',
  VOICE_ID: process.env.ELEVENLABS_VOICE_ID || '21m00Tcm4TlvDq8ikWAM', // Default: Rachel
  MODEL_ID: process.env.ELEVENLABS_MODEL || 'eleven_multilingual_v2',
  TEMP_DIR: './temp',
  MAX_RETRIES: 3,
  RETRY_DELAY: 2000,
};

/**
 * Generate a natural-sounding narration script from page information
 */
function generateScript(pageInfo) {
  const { title, description, headlines, hasHero, hasCTA } = pageInfo;
  
  // Extract key selling points from headlines
  const keyPoints = headlines
    .filter(h => !h.toLowerCase().includes('copyright') && !h.toLowerCase().includes('©'))
    .slice(0, 3);
  
  // Build script based on available content
  let script = '';
  
  // Opening hook
  const openings = [
    `Introducing ${title}.`,
    `Check out ${title}.`,
    `Here's ${title}.`,
    `Meet ${title}.`,
  ];
  script += openings[Math.floor(Math.random() * openings.length)] + ' ';
  
  // Description/summary
  if (description && description.length > 20) {
    // Clean up and truncate description
    const cleanDesc = description
      .replace(/\s+/g, ' ')
      .replace(/[^\w\s.,!?-]/g, '')
      .trim();
    
    const shortDesc = cleanDesc.split('.').slice(0, 2).join('. ') + '.';
    script += shortDesc + ' ';
  }
  
  // Feature highlights
  if (keyPoints.length > 0) {
    script += 'It features ';
    script += keyPoints.map((point, i) => {
      const clean = point
        .replace(/^\d+\.\s*/, '')
        .replace(/:$/, '')
        .toLowerCase();
      
      if (i === keyPoints.length - 1 && keyPoints.length > 1) {
        return `and ${clean}`;
      }
      return clean;
    }).join(', ');
    script += '. ';
  }
  
  // Call to action closing
  const closings = [
    'Built with AI in minutes.',
    'Created effortlessly with AI.',
    'AI-powered and ready to go.',
    'The future of development is here.',
  ];
  script += closings[Math.floor(Math.random() * closings.length)];
  
  // Clean up the script
  script = script
    .replace(/\s+/g, ' ')
    .replace(/\.\./g, '.')
    .replace(/\s+\./g, '.')
    .trim();
  
  return script;
}

/**
 * Generate speech from text using ElevenLabs API
 */
async function generateSpeech(text, timestamp) {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  
  if (!apiKey) {
    console.log('   ⚠️  No ElevenLabs API key found. Skipping voiceover.');
    console.log('   Set ELEVENLABS_API_KEY in .env file to enable voiceover.');
    return null;
  }
  
  const outputPath = path.join(CONFIG.TEMP_DIR, `voiceover-${timestamp}.mp3`);
  await fs.ensureDir(CONFIG.TEMP_DIR);
  
  let lastError;
  
  for (let attempt = 1; attempt <= CONFIG.MAX_RETRIES; attempt++) {
    try {
      console.log(`   🎤 Synthesizing speech (attempt ${attempt}/${CONFIG.MAX_RETRIES})...`);
      
      const response = await axios({
        method: 'POST',
        url: `${CONFIG.API_URL}/text-to-speech/${CONFIG.VOICE_ID}`,
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': apiKey,
        },
        data: {
          text: text,
          model_id: CONFIG.MODEL_ID,
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75,
            style: 0.3,
            use_speaker_boost: true,
          },
        },
        responseType: 'arraybuffer',
        timeout: 60000,
      });
      
      await fs.writeFile(outputPath, Buffer.from(response.data));
      
      // Verify the file was created
      const stats = await fs.stat(outputPath);
      if (stats.size < 1000) {
        throw new Error('Generated audio file is too small');
      }
      
      console.log(`   ✓ Audio saved: ${(stats.size / 1024).toFixed(1)} KB`);
      return outputPath;
      
    } catch (error) {
      lastError = error;
      
      if (error.response?.status === 429) {
        console.log('   ⏳ Rate limited. Waiting before retry...');
        await sleep(CONFIG.RETRY_DELAY * attempt);
      } else if (error.response?.status === 401) {
        console.error('   ✗ Invalid API key. Please check your ELEVENLABS_API_KEY.');
        return null;
      } else {
        console.log(`   ⚠️  Attempt ${attempt} failed: ${error.message}`);
        if (attempt < CONFIG.MAX_RETRIES) {
          await sleep(CONFIG.RETRY_DELAY);
        }
      }
    }
  }
  
  console.error('   ✗ Failed to generate voiceover after all retries');
  console.error(`   Error: ${lastError?.message}`);
  return null;
}

/**
 * Utility: Sleep function
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Get available voices from ElevenLabs
 */
async function listVoices() {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  
  if (!apiKey) {
    console.log('Set ELEVENLABS_API_KEY to list available voices');
    return [];
  }
  
  try {
    const response = await axios.get(`${CONFIG.API_URL}/voices`, {
      headers: { 'xi-api-key': apiKey }
    });
    
    return response.data.voices.map(v => ({
      id: v.voice_id,
      name: v.name,
      preview: v.preview_url,
    }));
  } catch (error) {
    console.error('Failed to list voices:', error.message);
    return [];
  }
}

// CLI usage
if (require.main === module) {
  const command = process.argv[2];
  
  if (command === 'voices') {
    listVoices().then(voices => {
      console.log('Available voices:');
      voices.forEach(v => {
        console.log(`  ${v.id}: ${v.name}`);
      });
    });
  } else if (command === 'test') {
    const testScript = generateScript({
      title: 'Test Project',
      description: 'This is a test project built with AI.',
      headlines: ['Feature One', 'Feature Two', 'Feature Three'],
      hasHero: true,
      hasCTA: true,
    });
    
    console.log('Generated script:');
    console.log(testScript);
    
    generateSpeech(testScript, Date.now()).then(path => {
      if (path) {
        console.log('Audio saved to:', path);
      }
    });
  } else {
    console.log('Usage:');
    console.log('  node generate-voiceover.js voices    # List available voices');
    console.log('  node generate-voiceover.js test      # Test script generation');
  }
}

module.exports = {
  generateScript,
  generateSpeech,
  listVoices,
};
