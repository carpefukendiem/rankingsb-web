#!/usr/bin/env node
/**
 * Website Sales System - Real Prospect Scraper
 * Uses web_search tool to find actual local businesses in SoCal
 * Extracts real business names, phones, and addresses from search results
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Target cities for SoCal
const TARGET_CITIES = [
  'Santa Barbara', 'Goleta', 'Ventura', 'Oxnard', 'Pasadena', 
  'Los Angeles', 'Irvine', 'San Diego'
];

// Business types to search for
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

class RealProspectScraper {
  constructor() {
    this.prospectsDir = path.join(__dirname, '..', 'prospects');
    this.exportsDir = path.join(__dirname, '..', 'exports');
    this.ensureDirectories();
    this.foundPhones = new Set();
    this.loadExistingPhones();
  }

  ensureDirectories() {
    [this.prospectsDir, this.exportsDir].forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    });
  }

  loadExistingPhones() {
    const files = fs.readdirSync(this.prospectsDir).filter(f => f.endsWith('.json'));
    for (const file of files) {
      try {
        const prospect = JSON.parse(fs.readFileSync(path.join(this.prospectsDir, file)));
        if (prospect.phone) {
          this.foundPhones.add(this.normalizePhone(prospect.phone));
        }
      } catch (e) {}
    }
    console.log(`📋 Loaded ${this.foundPhones.size} existing phone numbers to avoid duplicates`);
  }

  normalizePhone(phone) {
    return phone.replace(/\D/g, '');
  }

  /**
   * Call web_search tool directly via openclaw CLI
   */
  async webSearch(query, count = 10) {
    try {
      // Use openclaw CLI to make web_search call
      const cmd = `openclaw web_search "${query.replace(/"/g, '\\"')}" --count ${count} --country US 2>/dev/null`;
      const result = execSync(cmd, { encoding: 'utf-8', timeout: 30000 });
      
      // Parse the JSON results from openclaw output
      // The output might have some text before/after JSON, so try to find it
      const jsonMatch = result.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      
      // Try parsing the whole output
      return JSON.parse(result);
    } catch (error) {
      console.error(`  ❌ web_search error: ${error.message}`);
      return null;
    }
  }

  /**
   * Search for businesses in a city
   */
  async searchCityBusinesses(city, businessType, count = 5) {
    const queries = [
      `${businessType} ${city} CA phone`,
      `${businessType} ${city} contact`,
      `${businessType} ${city} business`,
      `${businessType} near ${city} California`
    ];
    
    const allResults = [];
    
    for (const query of queries) {
      if (allResults.length >= count * 2) break;
      
      console.log(`  🔍 Searching: "${query}"`);
      const result = await this.webSearch(query, 10);
      
      if (result && result.results) {
        allResults.push(...result.results);
      }
      
      // Rate limiting - small delay between searches
      await this.delay(800);
    }
    
    return allResults;
  }

  /**
   * Extract business info from search result
   */
  extractBusinessInfo(result, city, category) {
    const title = this.cleanTitle(result.title || '');
    const description = result.description || '';
    const url = result.url || '';
    
    if (!title || title.length < 3) return null;
    
    // Extract phone number from title, description, or URL
    let phone = this.extractPhone(title) || 
                this.extractPhone(description) || 
                this.extractPhone(url);
    
    if (!phone) return null;
    
    const normalizedPhone = this.normalizePhone(phone);
    
    // Skip if already found
    if (this.foundPhones.has(normalizedPhone)) {
      return null;
    }
    
    // Mark as found
    this.foundPhones.add(normalizedPhone);
    
    // Extract email
    const email = this.extractEmail(title) || this.extractEmail(description);
    
    // Extract address
    const address = this.extractAddress(description, city);
    
    // Determine if has real website (not just a directory listing)
    const directorySites = [
      'yelp.com', 'facebook.com', 'yellowpages.com', 'bbb.org', 
      'mapquest.com', 'chamberofcommerce.com', 'angi.com', 
      'homeadvisor.com', 'thumbtack.com', 'porch.com', 
      'buildzoom.com', 'houzz.com', 'nextdoor.com',
      'manta.com', 'ezlocal.com', 'local.com', 'superpages.com',
      'citysearch.com', 'foursquare.com', 'tripadvisor.com'
    ];
    
    const hasRealWebsite = url && !directorySites.some(site => url.includes(site));
    
    // Get business name from title
    let businessName = title;
    // Remove common suffixes
    businessName = businessName
      .replace(/\s*[-|]\s*Yelp$/i, '')
      .replace(/\s*[-|]\s*Facebook$/i, '')
      .replace(/\s*[-|]\s*Google\s*Search$/i, '')
      .replace(/\s*[-|]\s*Home$/i, '')
      .replace(/\s*[-|]\s*Contact$/i, '')
      .replace(/\s*[-|]\s*About$/i, '')
      .replace(/\s*[-|]\s*Reviews$/i, '')
      .trim();
    
    return {
      businessName: businessName.substring(0, 100),
      phone,
      email,
      address,
      city,
      category,
      website: hasRealWebsite ? url : null,
      hasWebsite: hasRealWebsite,
      sourceUrl: url,
      description: description.substring(0, 200),
      priority: !hasRealWebsite ? 1 : (email ? 2 : 3),
      scrapedAt: new Date().toISOString()
    };
  }

  extractPhone(text) {
    if (!text) return null;
    
    // Various phone patterns
    const patterns = [
      /\(\d{3}\)\s*\d{3}[-.]\d{4}/,           // (805) 555-1234
      /\(\d{3}\)\s*\d{3}\s*\d{4}/,            // (805) 555 1234
      /\d{3}[-.]\d{3}[-.]\d{4}/,              // 805-555-1234
      /\d{3}\s\d{3}[-.]\d{4}/,                // 805 555-1234
      /\+?1[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/, // +1 805-555-1234
      /\d{3}[-.]?\d{3}[-.]?\d{4}/             // 8055551234 (loose)
    ];
    
    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match) {
        return match[0];
      }
    }
    
    return null;
  }

  extractEmail(text) {
    if (!text) return null;
    const match = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/i);
    return match ? match[0] : null;
  }

  extractAddress(text, city) {
    if (!text) return null;
    
    // Look for street address patterns
    const patterns = [
      new RegExp(`\\d+\\s+[A-Za-z]+\\s+(?:St|Street|Ave|Avenue|Blvd|Boulevard|Rd|Road|Dr|Drive|Way|Ln|Lane|Ct|Court|Pl|Place)[.,]?\\s*(?:#\\s*\\d+)?,?\\s*${city}`, 'i'),
      /\d+\s+[A-Za-z]+\s+(?:St|Street|Ave|Avenue|Blvd|Boulevard|Rd|Road|Dr|Drive|Way|Ln|Lane)[.,]?\s*(?:#\s*\d+)?/i,
      /\d+\s+[^,]+(?:CA|California)\s*\d{5}/i,
      new RegExp(`\\d+\\s+[^,]+${city}[^,]*,?\\s*(?:CA|California)?\\s*\\d{5}?`, 'i')
    ];
    
    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match) {
        return match[0].trim();
      }
    }
    
    return null;
  }

  cleanTitle(title) {
    if (!title) return '';
    
    // Remove content tags if present
    title = title
      .replace(/<<<EXTERNAL_UNTRUSTED_CONTENT[^>]*>>>/g, '')
      .replace(/<<<END_EXTERNAL_UNTRUSTED_CONTENT[^>]*>>>/g, '')
      .replace(/Source: Web Search/g, '')
      .replace(/---/g, '')
      .trim();
    
    // Extract first part before delimiter
    const parts = title.split(/[|\-–]/);
    return parts[0].trim();
  }

  /**
   * Generate prospects for a specific city and business type
   */
  async generateForCityAndType(city, businessType, category, targetCount = 3) {
    const businesses = [];
    
    console.log(`\n📍 ${city} - ${businessType.toUpperCase()}`);
    console.log('-'.repeat(50));
    
    const results = await this.searchCityBusinesses(city, businessType, targetCount);
    
    for (const result of results) {
      const business = this.extractBusinessInfo(result, city, category);
      
      if (business) {
        businesses.push(business);
        
        const indicator = !business.hasWebsite ? '🔥' : (business.email ? '✉️' : '📞');
        console.log(`  ${indicator} ${business.businessName}`);
        console.log(`     Phone: ${business.phone}`);
        if (business.email) console.log(`     Email: ${business.email}`);
        if (business.address) console.log(`     Addr: ${business.address}`);
        console.log(`     ${!business.hasWebsite ? 'NO WEBSITE - HOT LEAD!' : 'Has website'}`);
        
        if (businesses.length >= targetCount) break;
      }
    }
    
    console.log(`  Found ${businesses.length} unique prospects`);
    return businesses;
  }

  /**
   * Run full prospecting batch
   */
  async runBatch(targetCount = 100) {
    console.log(`\n🚀 Starting REAL prospect generation: ${targetCount} businesses`);
    console.log('='.repeat(60));
    console.log(`Target cities: ${TARGET_CITIES.join(', ')}`);
    console.log(`Business types: ${BUSINESS_TYPES.map(b => b.type).join(', ')}`);
    console.log('='.repeat(60));
    
    const allProspects = [];
    
    // Calculate distribution
    const totalCombinations = TARGET_CITIES.length * BUSINESS_TYPES.length;
    const perCombination = Math.ceil(targetCount / totalCombinations);
    
    console.log(`\nSearching ${totalCombinations} city/type combinations, ~${perCombination} each`);
    
    // Shuffle for variety
    const shuffledCities = [...TARGET_CITIES].sort(() => 0.5 - Math.random());
    const shuffledTypes = [...BUSINESS_TYPES].sort(() => 0.5 - Math.random());
    
    for (const city of shuffledCities) {
      if (allProspects.length >= targetCount) break;
      
      for (const { type, category } of shuffledTypes) {
        if (allProspects.length >= targetCount) break;
        
        const needed = Math.min(perCombination, targetCount - allProspects.length);
        const businesses = await this.generateForCityAndType(city, type, category, needed);
        
        // Save each prospect
        for (const business of businesses) {
          const prospect = this.saveProspect(business);
          allProspects.push(prospect);
        }
        
        // Delay between searches
        await this.delay(1000);
      }
      
      // Longer delay between cities
      await this.delay(2000);
    }
    
    console.log('\n' + '='.repeat(60));
    console.log(`✅ Batch complete! Found ${allProspects.length} new prospects`);
    
    const stats = this.getStats();
    console.log(`\n📊 Statistics:`);
    console.log(`   Total prospects: ${stats.total}`);
    console.log(`   With phone: ${stats.withPhone}`);
    console.log(`   With email: ${stats.withEmail}`);
    console.log(`   Without website (hot leads): ${stats.withoutWebsite}`);
    console.log(`   By category:`, stats.byCategory);
    
    return allProspects;
  }

  /**
   * Save prospect to file
   */
  saveProspect(business) {
    const id = `prospect_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const prospect = {
      id,
      ...business,
      stage: 'Prospect Found',
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    const filepath = path.join(this.prospectsDir, `${id}.json`);
    fs.writeFileSync(filepath, JSON.stringify(prospect, null, 2));
    
    return prospect;
  }

  /**
   * Create CSV export
   */
  createCSVExport(filename = null) {
    const prospects = this.getAllProspects();
    
    if (!filename) {
      const date = new Date().toISOString().split('T')[0];
      filename = `prospects-export-${date}.csv`;
    }
    
    const filepath = path.join(this.exportsDir, filename);
    
    // CSV header
    const headers = ['Business Name', 'Phone', 'Email', 'Address', 'City', 'Category', 'Has Website', 'Website URL', 'Stage', 'Created Date'];
    
    // CSV rows
    const rows = prospects.map(p => [
      `"${(p.businessName || '').replace(/"/g, '""')}"`,
      p.phone || '',
      p.email || '',
      `"${(p.address || '').replace(/"/g, '""')}"`,
      p.city || '',
      p.category || '',
      p.hasWebsite ? 'Yes' : 'No',
      p.website || '',
      p.stage || '',
      p.createdAt ? p.createdAt.split('T')[0] : ''
    ]);
    
    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    
    fs.writeFileSync(filepath, csv);
    console.log(`\n📁 CSV Export created: ${filepath}`);
    console.log(`   Total records: ${prospects.length}`);
    
    return filepath;
  }

  /**
   * Get all prospects
   */
  getAllProspects() {
    const files = fs.readdirSync(this.prospectsDir).filter(f => f.endsWith('.json'));
    return files.map(f => {
      try {
        return JSON.parse(fs.readFileSync(path.join(this.prospectsDir, f)));
      } catch (e) {
        return null;
      }
    }).filter(p => p !== null);
  }

  /**
   * Get statistics
   */
  getStats() {
    const prospects = this.getAllProspects();
    const today = new Date().toDateString();
    
    return {
      total: prospects.length,
      today: prospects.filter(p => new Date(p.createdAt).toDateString() === today).length,
      withPhone: prospects.filter(p => p.phone).length,
      withEmail: prospects.filter(p => p.email).length,
      withoutWebsite: prospects.filter(p => !p.hasWebsite).length,
      byCategory: prospects.reduce((acc, p) => {
        acc[p.category] = (acc[p.category] || 0) + 1;
        return acc;
      }, {}),
      byCity: prospects.reduce((acc, p) => {
        acc[p.city] = (acc[p.city] || 0) + 1;
        return acc;
      }, {}),
      hotLeads: prospects.filter(p => !p.hasWebsite && p.phone).length
    };
  }

  /**
   * Get top prospects for outreach
   */
  getTopProspects(count = 20) {
    return this.getAllProspects()
      .filter(p => p.stage === 'Prospect Found')
      .sort((a, b) => {
        if (!a.hasWebsite && b.hasWebsite) return -1;
        if (a.hasWebsite && !b.hasWebsite) return 1;
        if (a.email && !b.email) return -1;
        if (!a.email && b.email) return 1;
        return 0;
      })
      .slice(0, count);
  }

  /**
   * Generate report
   */
  generateReport() {
    const prospects = this.getAllProspects();
    
    return {
      totalProspects: prospects.length,
      todayNew: prospects.filter(p => {
        const created = new Date(p.createdAt);
        return created.toDateString() === new Date().toDateString();
      }).length,
      pipeline: {
        'Prospect Found': prospects.filter(p => p.stage === 'Prospect Found').length,
        'Mockup Created': prospects.filter(p => p.stage === 'Mockup Created').length,
        'Outreach Sent': prospects.filter(p => p.stage === 'Outreach Sent').length,
        'Engaged': prospects.filter(p => p.stage === 'Engaged').length,
        'Meeting Scheduled': prospects.filter(p => p.stage === 'Meeting Scheduled').length,
        'Proposal Sent': prospects.filter(p => p.stage === 'Proposal Sent').length,
        'Payment Received': prospects.filter(p => p.stage === 'Payment Received').length,
        'In Production': prospects.filter(p => p.stage === 'In Production').length,
        'Delivered': prospects.filter(p => p.stage === 'Delivered').length,
        'Hosting Active': prospects.filter(p => p.stage === 'Hosting Active').length
      },
      hotLeads: prospects.filter(p => !p.hasWebsite && p.phone).length,
      byCategory: prospects.reduce((acc, p) => {
        acc[p.category] = (acc[p.category] || 0) + 1;
        return acc;
      }, {})
    };
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

module.exports = RealProspectScraper;

// CLI usage
if (require.main === module) {
  const scraper = new RealProspectScraper();
  
  const command = process.argv[2];
  
  if (command === 'report') {
    console.log(JSON.stringify(scraper.generateReport(), null, 2));
  } else if (command === 'stats') {
    console.log(JSON.stringify(scraper.getStats(), null, 2));
  } else if (command === 'top') {
    const count = parseInt(process.argv[3]) || 20;
    const top = scraper.getTopProspects(count);
    console.log(`\n🔥 Top ${count} Prospects:\n`);
    top.forEach((p, i) => {
      const hot = !p.hasWebsite ? '🔥' : '';
      console.log(`${i + 1}. ${hot} ${p.businessName}`);
      console.log(`   Phone: ${p.phone} | City: ${p.city} | Category: ${p.category}`);
      if (p.email) console.log(`   Email: ${p.email}`);
      if (p.address) console.log(`   Address: ${p.address}`);
      console.log('');
    });
  } else if (command === 'export') {
    scraper.createCSVExport();
  } else if (command === 'scrape' || !command) {
    const count = parseInt(process.argv[3]) || 100;
    scraper.runBatch(count).then(() => {
      // Auto-create CSV export after scraping
      scraper.createCSVExport();
      process.exit(0);
    }).catch(err => {
      console.error('Error:', err);
      process.exit(1);
    });
  } else {
    console.log('Usage: node prospect-scraper.js [scrape [count]|report|stats|top [count]|export]');
  }
}
