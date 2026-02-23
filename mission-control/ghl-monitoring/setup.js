#!/usr/bin/env node
/**
 * GHL Setup & Configuration Helper
 * Helps find the correct location ID for Rankingsb
 */

const https = require('https');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const API_KEY = 'pit-36c7d3ea-abe6-44b0-a0e3-0cf857094125';

function ask(question) {
  return new Promise(resolve => rl.question(question, resolve));
}

function apiRequest(hostname, path, method = 'GET') {
  return new Promise((resolve, reject) => {
    const options = {
      hostname,
      path,
      method,
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Version': '2021-07-28',
        'Content-Type': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(body) });
        } catch (e) {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
}

async function findLocation() {
  console.log('╔══════════════════════════════════════════════════╗');
  console.log('║     GHL Monitor Setup - Find Location ID         ║');
  console.log('╚══════════════════════════════════════════════════╝\n');

  console.log('🔍 Checking common GHL API endpoints...\n');

  const endpoints = [
    { host: 'services.leadconnectorhq.com', path: '/locations', name: 'Locations v1' },
    { host: 'services.leadconnectorhq.com', path: '/v2/locations', name: 'Locations v2' },
    { host: 'services.leadconnectorhq.com', path: '/companies', name: 'Companies' },
    { host: 'rest.gohighlevel.com', path: '/v1/locations', name: 'REST API Locations' }
  ];

  for (const ep of endpoints) {
    process.stdout.write(`Testing ${ep.name}... `);
    try {
      const res = await apiRequest(ep.host, ep.path);
      console.log(`Status: ${res.status}`);
      if (res.status === 200 && res.data) {
        console.log('✅ Success!');
        console.log('Response preview:', JSON.stringify(res.data, null, 2).substring(0, 500));
        console.log('');
      }
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }

  console.log('\n📋 Setup Instructions:');
  console.log('─────────────────────────────────────────────────────');
  console.log('1. Log into your GHL dashboard');
  console.log('2. Navigate to Settings > Business Profile');
  console.log('3. The Location ID should be visible there');
  console.log('   OR check the URL: app.gohighlevel.com/.../[LOCATION_ID]');
  console.log('');
  console.log('4. Alternatively, check Settings > API');
  console.log('─────────────────────────────────────────────────────\n');

  const locationId = await ask('Enter the Location ID for Rankingsb: ');
  
  if (locationId && locationId.trim()) {
    // Save to config
    const configPath = path.join(__dirname, 'config.json');
    let config = {};
    
    if (fs.existsSync(configPath)) {
      config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    }
    
    config.locationId = locationId.trim();
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    
    console.log(`\n✅ Location ID saved: ${locationId}`);
    console.log('Config file updated: config.json');
    
    // Update monitor script with location ID
    const monitorPath = path.join(__dirname, 'ghl-monitor.js');
    let monitorScript = fs.readFileSync(monitorPath, 'utf8');
    monitorScript = monitorScript.replace(
      /locationId: ['"].*?['"]/,
      `locationId: '${locationId.trim()}'`
    );
    fs.writeFileSync(monitorPath, monitorScript);
    console.log('✅ Monitor script updated');
    
  } else {
    console.log('⚠️ No location ID provided. You can add it later to config.json');
  }

  console.log('\n📝 Next steps:');
  console.log('   1. Run: npm test (to test the connection)');
  console.log('   2. Run: npm run monitor (to pull activities)');
  console.log('   3. Set up daily cron: ./run-daily.sh');
  
  rl.close();
}

findLocation();
