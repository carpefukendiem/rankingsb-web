#!/usr/bin/env node
/**
 * Simple Prospector - Uses web_search to find business leads
 * Run with: node simple-prospector.js
 * 
 * This script fetches search results and saves them to CSV
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

// Clean phone number to standard format
function cleanPhone(phone) {
  if (!phone) return '';
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  } else if (digits.length === 11 && digits.startsWith('1')) {
    return `(${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
  }
  return phone;
}

// Extract business name from title
function extractBusinessName(title) {
  if (!title) return 'Unknown';
  // Remove the external content markers and clean up
  const clean = title
    .replace(/<<<EXTERNAL_UNTRUSTED_CONTENT[^>]*>>>/g, '')
    .replace(/<<<END_EXTERNAL_UNTRUSTED_CONTENT[^>]*>>>/g, '')
    .replace(/Source: Web Search/g, '')
    .replace(/---/g, '')
    .trim();
  return clean.split(/[-|–—]/)[0]?.trim() || clean;
}

// Extract phone from description
function extractPhone(description) {
  if (!description) return '';
  // Remove HTML tags
  const text = description.replace(/<[^>]+>/g, ' ');
  // Phone patterns
  const patterns = [
    /\(\d{3}\)\s*\d{3}[-.\s]\d{4}/,
    /\d{3}[-.\s]\d{3}[-.\s]\d{4}/,
    /\d{3}\.\d{3}\.\d{4}/,
  ];
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) return cleanPhone(match[0]);
  }
  return '';
}

// Extract address from description
function extractAddress(description) {
  if (!description) return '';
  const text = description.replace(/<[^>]+>/g, ' ');
  
  // Address patterns
  const patterns = [
    /(\d+\s+[A-Za-z0-9\s]+(?:Street|St|Avenue|Ave|Road|Rd|Boulevard|Blvd|Lane|Ln|Drive|Dr|Way|Court|Ct|Ave)[:\s,]+[A-Za-z\s,]+(?:CA|California)[:\s]*\d{5})/i,
    /(\d+\s+[A-Za-z0-9\s]+(?:Santa Barbara|Goleta|Carpinteria)[:\s,]*CA[:\s]*\d{5})/i,
    /(\d+\s+[A-Za-z]+(?:\s+[A-Za-z]+){1,4}[:\s,]+CA[:\s,]*\d{5})/i,
  ];
  
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) return match[1].trim();
  }
  
  // Default to Santa Barbara if it's a local business
  if (text.toLowerCase().includes('santa barbara')) {
    return 'Santa Barbara, CA';
  }
  return '';
}

// Check if URL has a working website
async function checkWebsite(url) {
  return new Promise((resolve) => {
    const protocol = url.startsWith('https') ? https : http;
    const timeout = setTimeout(() => {
      resolve(false);
    }, 3000);
    
    try {
      const req = protocol.get(url, { timeout: 3000 }, (res) => {
        clearTimeout(timeout);
        resolve(res.statusCode >= 200 && res.statusCode < 400);
      });
      
      req.on('error', () => {
        clearTimeout(timeout);
        resolve(false);
      });
    } catch (e) {
      clearTimeout(timeout);
      resolve(false);
    }
  });
}

// Process search results and save to CSV
async function processResults(searchResults, query, outputFile) {
  console.log(`🔍 Processing ${searchResults.length} results for: "${query}"`);
  console.log('='.repeat(70));
  
  const prospects = [];
  
  for (let i = 0; i < searchResults.length; i++) {
    const result = searchResults[i];
    console.log(`\n[${i + 1}/${searchResults.length}] Processing...`);
    
    const businessName = extractBusinessName(result.title);
    const phone = extractPhone(result.description);
    const address = extractAddress(result.description);
    
    console.log(`   📍 ${businessName}`);
    
    // Check website
    process.stdout.write(`   🌐 Checking website... `);
    const hasWebsite = await checkWebsite(result.url);
    console.log(hasWebsite ? '✅ YES' : '❌ No');
    
    if (phone) console.log(`   📞 ${phone}`);
    if (address) console.log(`   📮 ${address}`);
    
    prospects.push({
      businessName,
      phone: phone || '',
      address: address || '',
      hasWebsite: hasWebsite ? 'Yes' : 'No',
      websiteUrl: hasWebsite ? result.url : '',
      source: result.url
    });
  }
  
  // Save to CSV
  const timestamp = new Date().toISOString().slice(0, 10);
  const csvFile = outputFile || path.join(outputDir, `prospects-${timestamp}.csv`);
  
  const csvHeader = 'Business Name,Phone,Address,Has Website,Website URL,Source\n';
  const csvRows = prospects.map(p => 
    `"${p.businessName}","${p.phone}","${p.address}","${p.hasWebsite}","${p.websiteUrl}","${p.source}"`
  ).join('\n');
  
  fs.writeFileSync(csvFile, csvHeader + csvRows);
  
  console.log('\n' + '='.repeat(70));
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

// Example usage with pre-fetched data
// To use: provide search results from web_search tool
async function main() {
  console.log(`
╔══════════════════════════════════════════════════════════════╗
║                  SIMPLE PROSPECTOR v1.0                       ║
╚══════════════════════════════════════════════════════════════╝

Usage:
  1. Run web_search tool separately to get results
  2. Pass results to this script

Example data structure expected:
[
  {
    "title": "Business Name",
    "url": "https://example.com",
    "description": "Snippet with phone (555) 123-4567"
  }
]

Run with sample data (plumbers in Santa Barbara):
`);

  // Sample data from actual search
  const sampleData = [
    {
      title: "Santa Barbara Plumber | Lewis Plumbing",
      url: "https://www.lewisplumbingsantabarbara.com/",
      description: "With services informed by the latest... call Lewis Plumbing at (805) 516-5590 or contact us online!"
    },
    {
      title: "Jerry the Plumber - Santa Barbara CA",
      url: "https://www.jerrytheplumber.net/",
      description: "For quick and reliable Santa Barbara plumbing service, give us a call at (805) 964-9841 or contact us"
    },
    {
      title: "Plumbing Santa Barbara: Luigi Crisa - Top Quality Service",
      url: "https://luigicrisaplumbing.com/",
      description: "Expert services for homes, businesses, and non-profits. Guaranteed repairs and installations. Call 805-453-4722 for a free estimate!"
    },
    {
      title: "Santa Barbara, CA Plumber | Roto-Rooter",
      url: "https://www.rotorooter.com/santabarbara/",
      description: "Call (805) 968-6845 for a plumber in Santa Barbara, CA. Roto-Rooter does plumbing & drain cleaning 24/7"
    },
    {
      title: "Wilson Plumbing - Full Service Plumber in Santa Barbara",
      url: "https://www.wilsonplumbingsantabarbara.com/",
      description: "Call Douglas E. Wilson Plumbing at 805-963-3454 or click here to send us a message. 215 Gray Ave, Santa Barbara, CA 93101"
    },
    {
      title: "Riviera plumbing LLC | plumbing in Santa Barbara",
      url: "https://rivieraplumbing.com/",
      description: "(805) 705-5913 - Providing top-tier plumbing solutions to homeowners in Santa Barbara, Montecito, Goleta, Carpinteria"
    },
    {
      title: "Anacapa Plumbing and Derooting Santa Barbara, CA",
      url: "https://anacapaplumbing.com/",
      description: "Santa Barbara's Top Rated Plumbing Pros. Call (805) 570-4041 - serving Santa Barbara, Montecito, Goleta & Carpinteria"
    }
  ];

  await processResults(sampleData, 'plumber Santa Barbara phone', 
    path.join(outputDir, 'plumbers-santa-barbara.csv'));
}

// Export for use as module
module.exports = { processResults, extractPhone, extractBusinessName, extractAddress };

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}
