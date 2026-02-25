#!/usr/bin/env node
/**
 * Simple Prospector - Uses web_search to find business leads
 * No complex dependencies - just works
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// Create output directory if needed
const outputDir = path.join(__dirname, '..', 'output');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Simple phone regex patterns
const PHONE_PATTERNS = [
  /\(\d{3}\)\s*\d{3}[-.\s]\d{4}/,      // (805) 555-1234
  /\d{3}[-.\s]\d{3}[-.\s]\d{4}/,       // 805-555-1234
  /\+?1?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/, // various formats
  /\d{3}\.\d{3}\.\d{4}/,               // 805.555.1234
  /\d{10}/                              // 8055551234
];

// Extract phone from text
function extractPhone(text) {
  if (!text) return null;
  for (const pattern of PHONE_PATTERNS) {
    const match = text.match(pattern);
    if (match) return match[0];
  }
  return null;
}

// Clean phone number to standard format
function cleanPhone(phone) {
  if (!phone) return null;
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  } else if (digits.length === 11 && digits.startsWith('1')) {
    return `(${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
  }
  return phone;
}

// Extract business name from search result
function extractBusinessName(result) {
  // Try title first
  let name = result.title?.split(/[-|–—]/)[0]?.trim();
  if (name && name.length > 2) return name;
  
  // Try URL domain
  try {
    const url = new URL(result.url);
    const domain = url.hostname.replace(/^www\./, '').split('.')[0];
    name = domain.replace(/-/g, ' ').replace(/_/g, ' ');
    return name.charAt(0).toUpperCase() + name.slice(1);
  } catch (e) {
    return 'Unknown';
  }
}

// Extract address from snippet
function extractAddress(snippet) {
  if (!snippet) return null;
  
  // Common address patterns
  const patterns = [
    /(\d+\s+[A-Za-z0-9\s]+(?:Street|St|Avenue|Ave|Road|Rd|Boulevard|Blvd|Lane|Ln|Drive|Dr|Way|Court|Ct|Plaza|Plz|Circle|Cir)[,\s]+[A-Za-z\s]+(?:CA|California)[,\s]*\d{5})/i,
    /(\d+\s+[A-Za-z0-9\s]+(?:Santa Barbara|Goleta|Carpinteria)[,\s]*CA[,\s]*\d{5})/i,
    /(\d+\s+[A-Za-z0-9\s]+(?:Santa Barbara|Goleta|Carpinteria)[,\s]*\d{5})/i,
    /(\d+\s+[A-Za-z]+(?:\s+[A-Za-z]+){1,4}[,\s]+CA)/i,
  ];
  
  for (const pattern of patterns) {
    const match = snippet.match(pattern);
    if (match) return match[1];
  }
  
  // Try to find just "Santa Barbara, CA" with context
  const sbMatch = snippet.match(/([A-Za-z0-9\s]+Santa Barbara[,\s]*CA[^.]*)/i);
  if (sbMatch) return sbMatch[1].trim();
  
  return null;
}

// Check if URL has a working website
async function checkWebsite(url) {
  return new Promise((resolve) => {
    const protocol = url.startsWith('https') ? https : http;
    const timeout = setTimeout(() => {
      resolve({ hasWebsite: false, status: 'timeout' });
    }, 5000);
    
    try {
      const req = protocol.get(url, { timeout: 5000 }, (res) => {
        clearTimeout(timeout);
        const hasWebsite = res.statusCode >= 200 && res.statusCode < 400;
        resolve({ 
          hasWebsite, 
          status: res.statusCode,
          finalUrl: res.headers.location || url
        });
      });
      
      req.on('error', () => {
        clearTimeout(timeout);
        resolve({ hasWebsite: false, status: 'error' });
      });
      
      req.on('timeout', () => {
        req.destroy();
        resolve({ hasWebsite: false, status: 'timeout' });
      });
    } catch (e) {
      clearTimeout(timeout);
      resolve({ hasWebsite: false, status: 'error' });
    }
  });
}

// Find domain from search result
function extractDomain(result) {
  try {
    const url = new URL(result.url);
    return url.hostname.replace(/^www\./, '');
  } catch (e) {
    return null;
  }
}

// Call web_search tool via OpenClaw CLI
async function webSearch(query, count = 10) {
  return new Promise((resolve, reject) => {
    const { execSync } = require('child_process');
    try {
      const result = execSync(
        `openclaw web_search "${query.replace(/"/g, '\\"')}" --count ${count} --country US`,
        { encoding: 'utf-8', timeout: 30000 }
      );
      
      // Parse the JSON result from the output
      const lines = result.split('\n');
      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.startsWith('[') || trimmed.startsWith('{')) {
          try {
            const data = JSON.parse(trimmed);
            resolve(data);
            return;
          } catch (e) {
            // Continue trying
          }
        }
      }
      
      // If we get here, try the whole output
      try {
        const data = JSON.parse(result);
        resolve(data);
      } catch (e) {
        reject(new Error('Could not parse search results'));
      }
    } catch (e) {
      reject(e);
    }
  });
}

// Main prospecting function
async function prospect(options) {
  const { query, count = 10, outputFile } = options;
  
  console.log(`🔍 Searching for: "${query}"`);
  console.log('=' .repeat(60));
  
  let searchResults;
  try {
    searchResults = await webSearch(query, count);
  } catch (e) {
    console.error('❌ Search failed:', e.message);
    process.exit(1);
  }
  
  if (!Array.isArray(searchResults) || searchResults.length === 0) {
    console.error('❌ No results found');
    process.exit(1);
  }
  
  console.log(`✅ Found ${searchResults.length} results\n`);
  
  const prospects = [];
  
  for (let i = 0; i < searchResults.length; i++) {
    const result = searchResults[i];
    console.log(`\n[${i + 1}/${searchResults.length}] Processing...`);
    
    const businessName = extractBusinessName(result);
    const phone = cleanPhone(extractPhone(result.snippet || result.title));
    const address = extractAddress(result.snippet);
    const domain = extractDomain(result);
    
    console.log(`   📍 ${businessName}`);
    
    // Check for website
    let hasWebsite = false;
    let websiteUrl = '';
    if (domain) {
      process.stdout.write(`   🌐 Checking website... `);
      const check = await checkWebsite(`https://${domain}`);
      if (check.hasWebsite) {
        hasWebsite = true;
        websiteUrl = `https://${domain}`;
        console.log('✅ YES');
      } else {
        // Try http
        const checkHttp = await checkWebsite(`http://${domain}`);
        if (checkHttp.hasWebsite) {
          hasWebsite = true;
          websiteUrl = `http://${domain}`;
          console.log('✅ YES (http)');
        } else {
          console.log('❌ No');
        }
      }
    }
    
    if (phone) {
      console.log(`   📞 ${phone}`);
    }
    if (address) {
      console.log(`   📮 ${address}`);
    }
    
    prospects.push({
      businessName,
      phone: phone || '',
      address: address || '',
      hasWebsite: hasWebsite ? 'Yes' : 'No',
      websiteUrl,
      source: result.url
    });
  }
  
  // Save to CSV
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  const csvFile = outputFile || path.join(outputDir, `prospects-${timestamp}.csv`);
  
  const csvHeader = 'Business Name,Phone,Address,Has Website,Website URL,Source\n';
  const csvRows = prospects.map(p => 
    `"${p.businessName}","${p.phone}","${p.address}","${p.hasWebsite}","${p.websiteUrl}","${p.source}"`
  ).join('\n');
  
  fs.writeFileSync(csvFile, csvHeader + csvRows);
  
  console.log('\n' + '='.repeat(60));
  console.log(`✅ Saved ${prospects.length} prospects to:`);
  console.log(`   ${csvFile}\n`);
  
  // Summary
  const withPhone = prospects.filter(p => p.phone).length;
  const withWebsite = prospects.filter(p => p.hasWebsite === 'Yes').length;
  
  console.log('📊 SUMMARY:');
  console.log(`   Total prospects: ${prospects.length}`);
  console.log(`   With phone: ${withPhone}`);
  console.log(`   With website: ${withWebsite}`);
  
  return prospects;
}

// CLI usage
if (require.main === module) {
  const query = process.argv[2] || 'plumber Santa Barbara phone';
  const count = parseInt(process.argv[3]) || 10;
  
  prospect({ query, count }).catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });
}

module.exports = { prospect, webSearch };
