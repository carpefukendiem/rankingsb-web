#!/usr/bin/env node
/**
 * Seedance2 Video Generator
 * Automates seedance2.ai to create marketing videos
 * 
 * This is a wrapper script - actual browser automation uses OpenClaw's browser tool
 * Usage: node scripts/seedance-generate.js
 */

const fs = require('fs');
const path = require('path');

// Video prompts with multiple durations
const videoConfigs = [
  {
    id: 'couch-fix',
    name: 'Couch Fix Transformation',
    basePrompt: `A dynamic split-screen marketing video showing furniture transformation.

LEFT SIDE - BEFORE:
Close-up of sad, sagging couch cushion with dim lighting. Flattened foam visible. Person sits down and cushion compresses completely.

RIGHT SIDE - AFTER:  
Same couch with plump, new cushion. Bright lighting. Person sits and cushion springs back up. Text overlay: "Like new!"

CENTER: Arrow pointing left to right. Text: "Custom foam from cushionfoamz.com"

Style: Marketing video, bright colors, energetic, professional product photography aesthetic.`,
    durations: [10, 15, 30],
    style: 'Commercial/Product',
    aspectRatio: '16:9'
  },
  {
    id: 'how-to-measure',
    name: 'How to Measure Cushions',
    basePrompt: `Educational tutorial video showing hands measuring a couch cushion.

SCENE: Overhead camera angle looking down at rectangular cushion.

ACTION:
1. Hands enter frame holding measuring tape
2. Measure LENGTH (left to right) - text overlay "Length"
3. Measure WIDTH (front to back) - text overlay "Width"  
4. Measure THICKNESS/HEIGHT - text overlay "Thickness"
5. Hands write down dimensions on notepad
6. Text appears: "Enter at cushionfoamz.com"

Close-up shots, clear lighting, instructional graphics, arrows showing dimensions.

Style: Educational content, clean aesthetic, instructional video.`,
    durations: [10, 15, 30],
    style: 'Tutorial/Educational',
    aspectRatio: '16:9'
  },
  {
    id: 'boat-rescue',
    name: 'Boat Cushion Rescue',
    basePrompt: `Marine lifestyle video showing boat cushion transformation on a sunny day.

BEFORE:
Weathered boat cushions on deck. Cracks in vinyl, faded colors, water stains visible. Close-up of water-soaked regular foam inside. Text: "Regular foam fails"

TRANSITION:
Hand removes old cushion, shows measuring tape.

AFTER:
Fresh marine-grade foam being inserted into cover. Zipping up. Cushion placed back on boat seat. Person relaxing. Boat in background on water.
Text overlay: "Marine-grade foam at cushionfoamz.com"

Nautical atmosphere, blue water, sunshine, premium feel.

Style: Marine lifestyle, luxury boating, product showcase, cinematic.`,
    durations: [10, 15, 30],
    style: 'Lifestyle/Marine',
    aspectRatio: '16:9'
  },
  {
    id: 'patio-glowup',
    name: 'Outdoor Patio Glow-Up',
    basePrompt: `Bright lifestyle video showing backyard patio furniture transformation.

BEFORE:
Faded outdoor cushions on patio furniture. Dull colors, stains, flat cushions. Overcast lighting. Uninviting backyard.

TRANSITION:
Quick montage: Measuring cushions → Ordering online → Package arriving → Unboxing new weather-resistant foam.

AFTER:
Vibrant patio setup with new plump cushions. String lights. Person enjoying lemonade. Summertime vibes.
Text: "Patio season ready! cushionfoamz.com"

Golden hour lighting, warm colors, inviting backyard oasis feel.

Style: Home & garden lifestyle, summer vibes, transformation reveal.`,
    durations: [10, 15, 30],
    style: 'Lifestyle/Home',
    aspectRatio: '16:9'
  }
];

// Additional short-form hooks for 15s and 30s
const durationModifiers = {
  10: (base) => base + '\n\nFOCUS: Single powerful before/after shot. Quick hook and immediate payoff. No extra scenes.',
  15: (base) => base + '\n\nFOCUS: Before/after with brief transition. Hook → Problem → Solution → CTA. One quick establishing shot.',
  30: (base) => base + '\n\nFOCUS: Full narrative arc. Hook → Problem → Agitation → Solution → Proof → CTA. Multiple angles, lifestyle shots included.'
};

function generateAllPrompts() {
  const allPrompts = [];
  
  for (const config of videoConfigs) {
    for (const duration of config.durations) {
      allPrompts.push({
        id: `${config.id}-${duration}s`,
        name: `${config.name} (${duration}s)`,
        prompt: durationModifiers[duration](config.basePrompt),
        duration: duration,
        style: config.style,
        aspectRatio: config.aspectRatio,
        filename: `cushionfoamz-${config.id}-${duration}s.mp4`
      });
    }
  }
  
  return allPrompts;
}

function savePromptsToFile() {
  const prompts = generateAllPrompts();
  const outputDir = path.join(__dirname, '..', 'business', 'cushionfoamz', 'video-prompts');
  
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  const manifest = {
    generated: new Date().toISOString(),
    totalVideos: prompts.length,
    videos: prompts
  };
  
  fs.writeFileSync(
    path.join(outputDir, 'seedance-manifest.json'),
    JSON.stringify(manifest, null, 2)
  );
  
  // Save individual prompt files
  for (const prompt of prompts) {
    const content = `# ${prompt.name}
## ID: ${prompt.id}
## Duration: ${prompt.duration} seconds
## Style: ${prompt.style}
## Aspect Ratio: ${prompt.aspectRatio}

${prompt.prompt}

---
Expected output: ${prompt.filename}
`;
    fs.writeFileSync(
      path.join(outputDir, `${prompt.id}.txt`),
      content
    );
  }
  
  console.log(`✅ Generated ${prompts.length} video prompts`);
  console.log(`📁 Saved to: ${outputDir}`);
  
  return prompts;
}

function printQuickReference() {
  const prompts = generateAllPrompts();
  
  console.log('\n⚡ SEEDANCE2 BATCH SUBMISSION GUIDE\n');
  console.log('URL: https://seedance2.ai/\n');
  console.log('Open 4 browser tabs and submit simultaneously:\n');
  
  const grouped = {};
  for (const p of prompts) {
    const baseId = p.id.split('-').slice(0, -1).join('-');
    if (!grouped[baseId]) grouped[baseId] = [];
    grouped[baseId].push(p);
  }
  
  let tabNum = 1;
  for (const [baseId, variants] of Object.entries(grouped)) {
    const main = variants.find(v => v.duration === 10) || variants[0];
    console.log(`Tab ${tabNum}: ${main.name.split(' (')[0]}`);
    console.log(`  Duration: Start with 10s version`);
    console.log(`  Style: ${main.style}`);
    console.log(`  File: business/cushionfoamz/video-prompts/${main.id}.txt`);
    console.log('');
    tabNum++;
  }
  
  console.log('Total videos to generate: 12');
  console.log('  - 4 concepts × 3 durations (10s, 15s, 30s)');
  console.log('\nEstimated time: 20-30 minutes total');
}

// Main
console.log('🎬 Seedance2 Video Prompt Generator\n');

const command = process.argv[2];

if (command === 'generate' || command === 'all') {
  const prompts = savePromptsToFile();
  console.log('\n✅ All prompts generated!');
  console.log('Next: Use browser automation or manual submission');
} else if (command === 'reference' || command === 'ref') {
  printQuickReference();
} else if (command === 'list') {
  const prompts = generateAllPrompts();
  console.log('\nAll video configurations:');
  prompts.forEach((p, i) => {
    console.log(`  ${i + 1}. ${p.name} → ${p.filename}`);
  });
} else {
  console.log('Usage:');
  console.log('  node scripts/seedance-generate.js generate  # Generate all prompt files');
  console.log('  node scripts/seedance-generate.js reference # Print submission guide');
  console.log('  node scripts/seedance-generate.js list      # List all videos');
  console.log('\nDefault: Generating prompts...\n');
  savePromptsToFile();
  printQuickReference();
}
