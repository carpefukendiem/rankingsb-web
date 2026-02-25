/**
 * OpenClaw Integration Module
 * 
 * Import this in your OpenClaw scripts to automatically generate
 * demo videos after builds or deployments.
 * 
 * Usage:
 *   const demoVideo = require('./openclaw-integration');
 *   await demoVideo.generate('https://myapp.com');
 */

const path = require('path');
const { DemoRecorder } = require('./record-demo');

const DEFAULT_CONFIG = {
  outputDir: './output',
  autoAttachToPRs: false,
  autoUpload: false,
  withVoiceover: true,
  withMusic: true,
};

let config = { ...DEFAULT_CONFIG };

/**
 * Configure the integration
 */
function configure(options) {
  config = { ...config, ...options };
}

/**
 * Generate a demo video for a URL
 * 
 * @param {string} url - The website URL to record
 * @param {Object} options - Override options for this recording
 * @returns {Promise<string>} - Path to the generated video
 */
async function generate(url, options = {}) {
  const opts = { ...config, ...options };
  const recorder = new DemoRecorder(url, opts);
  
  console.log(`[OpenClaw Demo Video] Generating demo for ${url}`);
  
  try {
    const outputPath = await recorder.run();
    
    console.log(`[OpenClaw Demo Video] ✅ Generated: ${outputPath}`);
    
    // Hook for custom post-processing
    if (opts.onComplete) {
      await opts.onComplete(outputPath, url);
    }
    
    return outputPath;
  } catch (error) {
    console.error(`[OpenClaw Demo Video] ❌ Failed: ${error.message}`);
    throw error;
  }
}

/**
 * Express middleware for auto-generating demos on deploy
 */
function middleware(options = {}) {
  return async (req, res, next) => {
    // Attach generate function to request
    req.generateDemo = async (url) => generate(url, options);
    next();
  };
}

/**
 * GitHub Actions / CI Integration
 * Generates demo and outputs for GitHub Actions
 */
async function githubAction(url, options = {}) {
  try {
    const outputPath = await generate(url, options);
    
    // Output for GitHub Actions
    console.log(`::set-output name=video-path::${outputPath}`);
    console.log(`::set-output name=video-name::${path.basename(outputPath)}`);
    
    return outputPath;
  } catch (error) {
    console.log(`::error::Demo video generation failed: ${error.message}`);
    throw error;
  }
}

/**
 * Post-build hook for static site generators
 */
async function postBuild(buildOutputDir, baseUrl, options = {}) {
  const url = baseUrl || `file://${path.resolve(buildOutputDir)}/index.html`;
  return generate(url, options);
}

module.exports = {
  configure,
  generate,
  middleware,
  githubAction,
  postBuild,
};
