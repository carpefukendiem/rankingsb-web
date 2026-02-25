#!/usr/bin/env node

/**
 * Demo Video Recorder
 * 
 * Main orchestrator that:
 * 1. Analyzes the target website
 * 2. Records screen capture with Playwright
 * 3. Generates AI voiceover script
 * 4. Composes final video with ffmpeg
 */

const { chromium } = require('playwright');
const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');
require('dotenv').config();

// Configuration
const CONFIG = {
  TARGET_DURATION: 45, // Target video length in seconds
  VIEWPORT: { width: 1920, height: 1080 },
  SCROLL_SPEED: 800, // pixels per second
  OUTPUT_DIR: process.env.OUTPUT_DIR || './output',
  TEMP_DIR: './temp',
  FPS: 30,
  VIDEO_CODEC: 'libx264',
  PRESET: 'medium', // ffmpeg preset
};

class DemoRecorder {
  constructor(url, options = {}) {
    this.url = url;
    this.options = {
      outputName: options.outputName || null,
      headless: options.headless !== false,
      withVoiceover: options.withVoiceover !== false,
      withMusic: options.withMusic !== false,
      ...options
    };
    
    this.timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
    this.outputFile = this.options.outputName || `demo-video-${this.timestamp}.mp4`;
    this.outputPath = path.join(CONFIG.OUTPUT_DIR, this.outputFile);
    
    this.tempFiles = [];
    this.pageInfo = null;
  }

  async init() {
    console.log('🎬 OpenClaw Demo Video Generator');
    console.log(`🌐 Target: ${this.url}`);
    console.log('');

    // Ensure directories exist
    await fs.ensureDir(CONFIG.OUTPUT_DIR);
    await fs.ensureDir(CONFIG.TEMP_DIR);
    
    // Verify ffmpeg is available
    try {
      execSync('ffmpeg -version', { stdio: 'ignore' });
    } catch (e) {
      throw new Error('ffmpeg not found. Please install ffmpeg first.');
    }
  }

  async analyzePage() {
    console.log('🔍 Analyzing website...');
    
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
      viewport: CONFIG.VIEWPORT,
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    });
    const page = await context.newPage();

    try {
      await page.goto(this.url, { waitUntil: 'networkidle', timeout: 30000 });
      
      // Extract page information
      this.pageInfo = await page.evaluate(() => {
        const title = document.title || 'Untitled Project';
        const description = document.querySelector('meta[name="description"]')?.content || 
                           document.querySelector('meta[property="og:description"]')?.content ||
                           'An amazing project built with AI';
        
        // Find key features/headlines
        const headlines = Array.from(document.querySelectorAll('h1, h2, h3'))
          .map(h => h.textContent.trim())
          .filter(t => t.length > 10 && t.length < 100)
          .slice(0, 5);

        // Get page dimensions for scrolling
        const bodyHeight = document.body.scrollHeight;
        
        return {
          title,
          description,
          headlines,
          bodyHeight,
          url: window.location.href,
          hasHero: !!document.querySelector('header, .hero, [class*="hero"], [class*="banner"]'),
          hasCTA: !!document.querySelector('button, .cta, [class*="cta"], [class*="button"]')
        };
      });

      console.log(`   ✓ Title: ${this.pageInfo.title}`);
      console.log(`   ✓ Found ${this.pageInfo.headlines.length} key sections`);
      console.log(`   ✓ Page height: ${this.pageInfo.bodyHeight}px`);
      
    } catch (error) {
      console.error('   ✗ Failed to analyze page:', error.message);
      throw error;
    } finally {
      await browser.close();
    }
  }

  async recordScreen() {
    console.log('\n🎥 Recording screen capture...');
    
    const rawVideoPath = path.join(CONFIG.TEMP_DIR, `raw-${this.timestamp}.mp4`);
    this.tempFiles.push(rawVideoPath);

    const browser = await chromium.launch({ 
      headless: this.options.headless 
    });
    
    const context = await browser.newContext({
      viewport: CONFIG.VIEWPORT,
      recordVideo: {
        dir: CONFIG.TEMP_DIR,
        size: CONFIG.VIEWPORT
      }
    });

    const page = await context.newPage();

    try {
      await page.goto(this.url, { waitUntil: 'networkidle', timeout: 30000 });
      
      // Wait for animations to settle
      await page.waitForTimeout(1000);
      
      // Calculate scroll parameters
      const scrollDuration = Math.min(CONFIG.TARGET_DURATION, Math.max(15, this.pageInfo.bodyHeight / CONFIG.SCROLL_SPEED));
      const scrollSteps = Math.floor(scrollDuration * 2); // 2 steps per second
      const scrollIncrement = Math.floor(this.pageInfo.bodyHeight / scrollSteps);
      
      console.log(`   ⏱️  Recording ${scrollDuration.toFixed(1)}s of scrolling...`);
      
      // Smooth scroll through the page
      let currentScroll = 0;
      const scrollInterval = setInterval(async () => {
        currentScroll += scrollIncrement;
        if (currentScroll >= this.pageInfo.bodyHeight) {
          clearInterval(scrollInterval);
        } else {
          await page.evaluate((pos) => window.scrollTo({ top: pos, behavior: 'smooth' }), currentScroll);
        }
      }, 500);

      // Record for calculated duration
      await page.waitForTimeout(scrollDuration * 1000);
      clearInterval(scrollInterval);

      // Pause at end
      await page.waitForTimeout(1000);

    } catch (error) {
      console.error('   ✗ Recording error:', error.message);
    } finally {
      await context.close();
      await browser.close();
    }

    // Find the recorded video file
    const videoFiles = await fs.readdir(CONFIG.TEMP_DIR);
    const videoFile = videoFiles.find(f => f.endsWith('.webm') || f.endsWith('.mp4'));
    
    if (!videoFile) {
      throw new Error('No video file was recorded');
    }

    const recordedPath = path.join(CONFIG.TEMP_DIR, videoFile);
    
    // Convert to proper format with ffmpeg
    console.log('   🔄 Converting video format...');
    const convertCmd = `ffmpeg -y -i "${recordedPath}" -c:v ${CONFIG.VIDEO_CODEC} -preset ${CONFIG.PRESET} -pix_fmt yuv420p -r ${CONFIG.FPS} "${rawVideoPath}"`;
    
    try {
      execSync(convertCmd, { stdio: 'ignore' });
      await fs.remove(recordedPath); // Remove original webm
      console.log('   ✓ Video recorded successfully');
    } catch (e) {
      // If conversion fails, use the original
      await fs.move(recordedPath, rawVideoPath);
    }

    return rawVideoPath;
  }

  async generateVoiceover() {
    if (!this.options.withVoiceover) {
      return null;
    }

    console.log('\n🎙️  Generating AI voiceover...');
    
    const voiceover = require('./generate-voiceover');
    const script = voiceover.generateScript(this.pageInfo);
    
    console.log('   📝 Generated script:');
    console.log(`   "${script.substring(0, 100)}..."`);
    
    const audioPath = await voiceover.generateSpeech(script, this.timestamp);
    
    if (audioPath) {
      this.tempFiles.push(audioPath);
      console.log('   ✓ Voiceover generated');
    }
    
    return audioPath;
  }

  async composeVideo(videoPath, audioPath) {
    console.log('\n🎞️  Composing final video...');
    
    const composer = require('./compose-video');
    
    const result = await composer.compose({
      videoPath,
      audioPath,
      withMusic: this.options.withMusic,
      outputPath: this.outputPath,
      targetDuration: CONFIG.TARGET_DURATION,
      timestamp: this.timestamp
    });

    if (result) {
      console.log('   ✓ Video composition complete');
    }

    return result;
  }

  async cleanup() {
    console.log('\n🧹 Cleaning up temporary files...');
    
    for (const file of this.tempFiles) {
      try {
        if (await fs.pathExists(file)) {
          await fs.remove(file);
        }
      } catch (e) {
        // Ignore cleanup errors
      }
    }
    
    console.log('   ✓ Cleanup complete');
  }

  async run() {
    const startTime = Date.now();
    
    try {
      await this.init();
      await this.analyzePage();
      
      const videoPath = await this.recordScreen();
      const audioPath = await this.generateVoiceover();
      const finalPath = await this.composeVideo(videoPath, audioPath);
      
      await this.cleanup();
      
      const duration = ((Date.now() - startTime) / 1000).toFixed(1);
      
      console.log('\n' + '='.repeat(50));
      console.log('✅ Demo video generated successfully!');
      console.log('='.repeat(50));
      console.log(`📁 Output: ${finalPath}`);
      console.log(`⏱️  Time: ${duration}s`);
      console.log(`📊 Size: ${(fs.statSync(finalPath).size / 1024 / 1024).toFixed(2)} MB`);
      console.log('='.repeat(50));
      
      return finalPath;
      
    } catch (error) {
      console.error('\n❌ Error:', error.message);
      await this.cleanup();
      throw error;
    }
  }
}

// Main execution
async function main() {
  const url = process.argv[2];
  
  if (!url) {
    console.log('Usage: node record-demo.js <url> [--output filename.mp4]');
    console.log('');
    console.log('Example:');
    console.log('  node record-demo.js https://example.com');
    console.log('  node record-demo.js https://example.com --output my-demo.mp4');
    process.exit(1);
  }

  const options = {};
  
  // Parse arguments
  const args = process.argv.slice(3);
  const outputIndex = args.indexOf('--output');
  if (outputIndex !== -1 && args[outputIndex + 1]) {
    options.outputName = args[outputIndex + 1];
  }
  
  if (args.includes('--no-voice')) {
    options.withVoiceover = false;
  }
  
  if (args.includes('--no-music')) {
    options.withMusic = false;
  }

  const recorder = new DemoRecorder(url, options);
  await recorder.run();
}

// Export for programmatic use
module.exports = { DemoRecorder };

// Run if called directly
if (require.main === module) {
  main().catch(err => {
    console.error(err);
    process.exit(1);
  });
}
