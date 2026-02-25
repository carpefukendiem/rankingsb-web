#!/usr/bin/env node

/**
 * Video Composer - FIXED VERSION
 * 
 * Combines video, voiceover, and background music using ffmpeg
 * Adds transitions, volume mixing, and final rendering
 */

const { execSync } = require('child_process');
const fs = require('fs-extra');
const path = require('path');
require('dotenv').config();

const CONFIG = {
  MUSIC_VOLUME: 0.15,    // Background music volume (0-1)
  VOICE_VOLUME: 1.0,     // Voiceover volume (0-1)
  VIDEO_VOLUME: 0.3,     // Original video audio volume (0-1)
  FADE_IN_DURATION: 1,   // Seconds
  FADE_OUT_DURATION: 2,  // Seconds
  MUSIC_FADE_IN: 2,      // Seconds
  MUSIC_FADE_OUT: 3,     // Seconds
  OUTPUT_QUALITY: 23,    // CRF value (lower = higher quality, 23 is default)
  PRESET: 'medium',      // Encoding speed/compression tradeoff
  TEMP_DIR: './temp',
};

/**
 * Check if video has audio stream
 */
async function videoHasAudio(videoPath) {
  try {
    const cmd = `ffprobe -v error -select_streams a -show_entries stream=codec_type -of default=noprint_wrappers=1:nokey=1 "${videoPath}" | head -1`;
    const result = execSync(cmd, { encoding: 'utf8' }).trim();
    return result === 'audio';
  } catch (e) {
    return false;
  }
}

/**
 * Main composition function
 */
async function compose(options) {
  const {
    videoPath,
    audioPath,
    withMusic = true,
    outputPath,
    targetDuration = 45,
    timestamp,
  } = options;

  // Verify input files
  if (!await fs.pathExists(videoPath)) {
    throw new Error(`Video file not found: ${videoPath}`);
  }

  const steps = [];
  let currentVideo = videoPath;

  try {
    // Step 1: Trim/extend video to target duration
    console.log('   📏 Adjusting video duration...');
    currentVideo = await adjustDuration(currentVideo, targetDuration, timestamp);
    steps.push(currentVideo);

    // Step 2: Add voiceover if provided
    if (audioPath && await fs.pathExists(audioPath)) {
      console.log('   🎙️  Adding voiceover track...');
      currentVideo = await addVoiceover(currentVideo, audioPath, timestamp);
      steps.push(currentVideo);
    }

    // Step 3: Add background music
    if (withMusic) {
      console.log('   🎵 Adding background music...');
      const musicPath = await getMusicPath(targetDuration);
      if (musicPath) {
        const hasAudio = await videoHasAudio(currentVideo);
        currentVideo = await addBackgroundMusic(currentVideo, musicPath, timestamp, hasAudio);
        steps.push(currentVideo);
      }
    }

    // Step 4: Final encoding with fade effects
    console.log('   ✨ Applying final touches...');
    await finalizeVideo(currentVideo, outputPath);

    // Cleanup intermediate files
    for (const file of steps) {
      if (file !== videoPath && file !== outputPath) {
        try {
          await fs.remove(file);
        } catch (e) {
          // Ignore cleanup errors
        }
      }
    }

    return outputPath;

  } catch (error) {
    // Cleanup on error
    for (const file of steps) {
      if (file !== videoPath) {
        try {
          await fs.remove(file);
        } catch (e) {}
      }
    }
    throw error;
  }
}

/**
 * Adjust video duration to match target length
 */
async function adjustDuration(videoPath, targetDuration, timestamp) {
  const outputPath = path.join(CONFIG.TEMP_DIR, `duration-${timestamp}.mp4`);
  
  // Get current video duration
  const durationCmd = `ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${videoPath}"`;
  const currentDuration = parseFloat(execSync(durationCmd, { encoding: 'utf8' }).trim());
  
  if (currentDuration <= targetDuration + 2) {
    // Video is short enough, just copy
    const cmd = `ffmpeg -y -i "${videoPath}" -c copy "${outputPath}"`;
    execSync(cmd, { stdio: 'ignore' });
    return outputPath;
  }
  
  // Trim to target duration
  const cmd = `ffmpeg -y -i "${videoPath}" -t ${targetDuration} -c copy "${outputPath}"`;
  execSync(cmd, { stdio: 'ignore' });
  
  return outputPath;
}

/**
 * Add voiceover audio to video
 */
async function addVoiceover(videoPath, audioPath, timestamp) {
  const outputPath = path.join(CONFIG.TEMP_DIR, `voiceover-${timestamp}.mp4`);
  
  // Get audio duration
  const durationCmd = `ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${audioPath}"`;
  const audioDuration = parseFloat(execSync(durationCmd, { encoding: 'utf8' }).trim());
  
  // Check if video has audio
  const hasAudio = await videoHasAudio(videoPath);
  
  let cmd;
  if (hasAudio) {
    // Mix voiceover with existing video audio
    cmd = `ffmpeg -y \
      -i "${videoPath}" \
      -i "${audioPath}" \
      -filter_complex "
        [0:a]volume=${CONFIG.VIDEO_VOLUME}[video_audio];
        [1:a]volume=${CONFIG.VOICE_VOLUME},afade=t=in:ss=0:d=${CONFIG.FADE_IN_DURATION},afade=t=out:st=${audioDuration - CONFIG.FADE_OUT_DURATION}:d=${CONFIG.FADE_OUT_DURATION}[voiceover];
        [video_audio][voiceover]amix=inputs=2:duration=first:dropout_transition=2[audio_out]
      " \
      -map 0:v -map "[audio_out]" \
      -c:v copy \
      -c:a aac -b:a 192k \
      -shortest \
      "${outputPath}"`;
  } else {
    // No video audio, just use voiceover
    cmd = `ffmpeg -y \
      -i "${videoPath}" \
      -i "${audioPath}" \
      -filter_complex "
        [1:a]volume=${CONFIG.VOICE_VOLUME},afade=t=in:ss=0:d=${CONFIG.FADE_IN_DURATION},afade=t=out:st=${audioDuration - CONFIG.FADE_OUT_DURATION}:d=${CONFIG.FADE_OUT_DURATION}[audio_out]
      " \
      -map 0:v -map "[audio_out]" \
      -c:v copy \
      -c:a aac -b:a 192k \
      -shortest \
      "${outputPath}"`;
  }
  
  execSync(cmd, { stdio: 'ignore' });
  return outputPath;
}

/**
 * Add background music to video - FIXED
 */
async function addBackgroundMusic(videoPath, musicPath, timestamp, hasExistingAudio) {
  const outputPath = path.join(CONFIG.TEMP_DIR, `music-${timestamp}.mp4`);
  
  // Get video duration
  const durationCmd = `ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${videoPath}"`;
  const videoDuration = parseFloat(execSync(durationCmd, { encoding: 'utf8' }).trim());
  
  let cmd;
  
  if (hasExistingAudio) {
    // Mix music with existing audio
    cmd = `ffmpeg -y \
      -i "${videoPath}" \
      -i "${musicPath}" \
      -filter_complex "
        [1:a]aloop=loop=-1:size=2e+09,atrim=0:${videoDuration},
        afade=t=in:ss=0:d=${CONFIG.MUSIC_FADE_IN},
        afade=t=out:st=${videoDuration - CONFIG.MUSIC_FADE_OUT}:d=${CONFIG.MUSIC_FADE_OUT},
        volume=${CONFIG.MUSIC_VOLUME}[music];
        [0:a][music]amix=inputs=2:duration=first:dropout_transition=3[audio_out]
      " \
      -map 0:v -map "[audio_out]" \
      -c:v copy \
      -c:a aac -b:a 192k \
      -shortest \
      "${outputPath}"`;
  } else {
    // No existing audio, just add music
    cmd = `ffmpeg -y \
      -i "${videoPath}" \
      -i "${musicPath}" \
      -filter_complex "
        [1:a]aloop=loop=-1:size=2e+09,atrim=0:${videoDuration},
        afade=t=in:ss=0:d=${CONFIG.MUSIC_FADE_IN},
        afade=t=out:st=${videoDuration - CONFIG.MUSIC_FADE_OUT}:d=${CONFIG.MUSIC_FADE_OUT},
        volume=0.3[audio_out]
      " \
      -map 0:v -map "[audio_out]" \
      -c:v copy \
      -c:a aac -b:a 192k \
      -shortest \
      "${outputPath}"`;
  }
  
  execSync(cmd, { stdio: 'ignore' });
  return outputPath;
}

/**
 * Final encoding with fade effects and optimizations
 */
async function finalizeVideo(videoPath, outputPath) {
  // Get video duration for fade calculations
  const durationCmd = `ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${videoPath}"`;
  const duration = parseFloat(execSync(durationCmd, { encoding: 'utf8' }).trim());
  
  // Apply video fades and re-encode for quality
  const cmd = `ffmpeg -y \
    -i "${videoPath}" \
    -vf "fade=t=in:st=0:d=${CONFIG.FADE_IN_DURATION},fade=t=out:st=${duration - CONFIG.FADE_OUT_DURATION}:d=${CONFIG.FADE_OUT_DURATION},format=yuv420p" \
    -c:v libx264 -preset ${CONFIG.PRESET} -crf ${CONFIG.OUTPUT_QUALITY} \
    -c:a aac -b:a 192k \
    -movflags +faststart \
    "${outputPath}"`;
  
  execSync(cmd, { stdio: 'ignore' });
}

/**
 * Get path to background music
 * Creates a silent placeholder if no music is available
 */
async function getMusicPath(targetDuration) {
  const defaultMusic = process.env.DEFAULT_MUSIC_PATH || './assets/background-music.mp3';
  
  if (await fs.pathExists(defaultMusic)) {
    return defaultMusic;
  }
  
  // Check for any mp3 files in assets folder
  const assetsDir = './assets';
  if (await fs.pathExists(assetsDir)) {
    const files = await fs.readdir(assetsDir);
    const mp3File = files.find(f => f.endsWith('.mp3'));
    if (mp3File) {
      return path.join(assetsDir, mp3File);
    }
  }
  
  // Create silent audio track
  console.log('   ⚠️  No background music found, creating silent track...');
  const silentPath = path.join(CONFIG.TEMP_DIR, 'silent.mp3');
  const cmd = `ffmpeg -y -f lavfi -i anullsrc=r=44100:cl=mono -t ${targetDuration} -acodec libmp3lame -q:a 4 "${silentPath}"`;
  execSync(cmd, { stdio: 'ignore' });
  return silentPath;
}

module.exports = { compose, videoHasAudio };

// CLI usage
if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.length < 2) {
    console.log('Usage: node compose-video.js <video-path> <output-path> [audio-path]');
    process.exit(1);
  }
  
  const [videoPath, outputPath, audioPath] = args;
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  
  compose({
    videoPath,
    outputPath,
    audioPath,
    timestamp,
  }).then(() => {
    console.log('✓ Video composed successfully:', outputPath);
  }).catch(err => {
    console.error('✗ Error:', err.message);
    process.exit(1);
  });
}