#!/usr/bin/env node
/**
 * Run the real prospect scraper with web_search tool
 * This script coordinates web searches and processes results
 */

const fs = require('fs');
const path = require('path');
const RealProspectScraper = require('./prospect-scraper');

// Target cities
const TARGET_CITIES = [
  'Santa Barbara', 'Goleta', 'Ventura', 'Oxnard', 'Pasadena', 
  'Los Angeles', 'Irvine', 'San Diego'
];

// Business types
const BUSINESS_TYPES = [
  { type: 'HVAC', category: 'Contractor' },
  { type: 'plumber', category: 'Contractor' },
  { type: 'electrician', category: 'Contractor' },
  { type: 'roofing', category: 'Contractor' },
  { type: 'dentist', category: 'Medical' },
  { type: 'restaurant', category: 'Restaurant' },
  { type: 'auto repair', category: 'Automotive' },
  { type: 'landscaping', category: 'Home Services' }
];

async function runScraper(targetCount = 100) {
  console.log('='.repeat(60));
  console.log('🚀 REAL PROSPECT SCRAPER - Using web_search tool');
  console.log('='.repeat(60));
  console.log(`Target: ${targetCount} real businesses`);
  console.log(`Cities: ${TARGET_CITIES.join(', ')}`);
  console.log(`Types: ${BUSINESS_TYPES.map(b => b.type).join(', ')}`);
  console.log('='.repeat(60));
  
  const scraper = new RealProspectScraper();
  const allProspects = [];
  
  // Generate all search queries
  const queries = [];
  for (const city of TARGET_CITIES) {
    for (const { type, category } of BUSINESS_TYPES) {
      queries.push({
        query: `${type} ${city} CA phone`,
        city,
        category,
        type
      });
      queries.push({
        query: `${type} ${city} contact`,
        city,
        category,
        type
      });
    }
  }
  
  // Shuffle for variety
  const shuffledQueries = queries.sort(() => 0.5 - Math.random());
  
  console.log(`\n📋 Generated ${shuffledQueries.length} search queries`);
  console.log('\nStarting searches...\n');
  
  // We need to use the web_search tool - results will be provided by the agent
  // Save query list for processing
  const queryFile = path.join(__dirname, '..', 'logs', 'pending-queries.json');
  fs.writeFileSync(queryFile, JSON.stringify(shuffledQueries, null, 2));
  
  console.log(`Saved ${shuffledQueries.length} queries to ${queryFile}`);
  console.log('Use the agent to execute web_search for each query and process results');
  
  return { scraper, queries: shuffledQueries, queryFile };
}

module.exports = { runScraper, TARGET_CITIES, BUSINESS_TYPES };

// CLI
if (require.main === module) {
  const count = parseInt(process.argv[2]) || 100;
  runScraper(count).then(result => {
    console.log('\n✅ Setup complete. Ready for web_search execution.');
    console.log(`Query file: ${result.queryFile}`);
  }).catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });
}
