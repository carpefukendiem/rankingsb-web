#!/usr/bin/env node
/**
 * Website Sales System - Real Prospect Scraper
 * Uses web_search tool to find actual local businesses in SoCal
 */

const fs = require('fs');
const path = require('path');

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

// Search result cache to avoid re-searching
let searchCache = {};

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
    console.log(`📋 Loaded ${this.foundPhones.size} existing phone numbers`);
  }

  normalizePhone(phone) {
    return phone.replace(/\D/g, '');
  }

  /**
   * Search using cached results or external tool
   * This method is called by the main agent with web_search results
   */
  async searchWithResults(query, results) {
    searchCache[query] = results;
    return results;
  }

  /**
   * Get cached search results
   */
  getCachedResults(query) {
    return searchCache[query] || null;
  }

  /**
   * Extract business info from search result
   */
  extractBusinessInfo(result, city, category) {
    const title = this.cleanTitle(result.title || '');
    const description = result.description || '';
    const url = result.url || '';
    
    if (!title || title.length < 3) return null;
    
    // Extract phone number
    let phone = this.extractPhone(title) || 
                this.extractPhone(description);
    
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
    
    // Determine if has real website
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
    let businessName = title
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
    
    // Clean the text first - remove external content markers
    const cleanText = text
      .replace(/<<<EXTERNAL_UNTRUSTED_CONTENT[^>]*>>>/g, '')
      .replace(/<<<END_EXTERNAL_UNTRUSTED_CONTENT[^>]*>>>/g, '')
      .replace(/Source: Web Search/g, '')
      .replace(/<strong>/g, '')
      .replace(/<\/strong>/g, '');
    
    // Various phone patterns
    const patterns = [
      /\(\d{3}\)\s*\d{3}[-.]\d{4}/,           // (805) 555-1234
      /\(\d{3}\)\s*\d{3}\s*\d{4}/,            // (805) 555 1234
      /\d{3}[-.]\d{3}[-.]\d{4}/,              // 805-555-1234
      /\d{3}\s\d{3}[-.]\d{4}/,                // 805 555-1234
      /\+?1[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/, // +1 805-555-1234
    ];
    
    for (const pattern of patterns) {
      const match = cleanText.match(pattern);
      if (match) {
        return match[0];
      }
    }
    
    return null;
  }

  extractEmail(text) {
    if (!text) return null;
    const cleanText = text
      .replace(/<<<EXTERNAL_UNTRUSTED_CONTENT[^>]*>>>/g, '')
      .replace(/<<<END_EXTERNAL_UNTRUSTED_CONTENT[^>]*>>>/g, '');
    
    const match = cleanText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/i);
    return match ? match[0] : null;
  }

  extractAddress(text, city) {
    if (!text) return null;
    
    const cleanText = text
      .replace(/<<<EXTERNAL_UNTRUSTED_CONTENT[^>]*>>>/g, '')
      .replace(/<<<END_EXTERNAL_UNTRUSTED_CONTENT[^>]*>>>/g, '')
      .replace(/<strong>/g, '')
      .replace(/<\/strong>/g, '');
    
    // Look for street address patterns with city
    const patterns = [
      new RegExp(`\\d+\\s+[A-Za-z0-9\\s]+(?:St|Street|Ave|Avenue|Blvd|Boulevard|Rd|Road|Dr|Drive|Way|Ln|Lane|Ct|Court|Pl|Place)[.,]?\\s*(?:#\\s*\\d+)?,?\\s*${city}`, 'i'),
      new RegExp(`\\d+\\s+[A-Za-z0-9\\s]+,?\\s*${city}`, 'i'),
      /\d+\s+[A-Za-z0-9\s]+(?:St|Street|Ave|Avenue|Blvd|Boulevard|Rd|Road|Dr|Drive|Way|Ln|Lane)/i,
    ];
    
    for (const pattern of patterns) {
      const match = cleanText.match(pattern);
      if (match) {
        return match[0].trim();
      }
    }
    
    return null;
  }

  cleanTitle(title) {
    if (!title) return '';
    
    return title
      .replace(/<<<EXTERNAL_UNTRUSTED_CONTENT[^>]*>>>/g, '')
      .replace(/<<<END_EXTERNAL_UNTRUSTED_CONTENT[^>]*>>>/g, '')
      .replace(/Source: Web Search/g, '')
      .replace(/---/g, '')
      .replace(/<strong>/g, '')
      .replace(/<\/strong>/g, '')
      .trim()
      .split(/[|\-–]/)[0]
      .trim();
  }

  /**
   * Process search results and extract businesses
   */
  processSearchResults(results, city, category, maxResults = 3) {
    const businesses = [];
    
    for (const result of results) {
      const business = this.extractBusinessInfo(result, city, category);
      
      if (business) {
        businesses.push(business);
        
        const indicator = !business.hasWebsite ? '🔥' : (business.email ? '✉️' : '📞');
        console.log(`  ${indicator} ${business.businessName}`);
        console.log(`     Phone: ${business.phone}`);
        if (business.email) console.log(`     Email: ${business.email}`);
        if (business.address) console.log(`     Addr: ${business.address}`);
        
        if (businesses.length >= maxResults) break;
      }
    }
    
    return businesses;
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
    
    const headers = ['Business Name', 'Phone', 'Email', 'Address', 'City', 'Category', 'Has Website', 'Website URL', 'Stage', 'Created Date'];
    
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
    console.log(`\n📁 CSV Export: ${filepath}`);
    console.log(`   Total records: ${prospects.length}`);
    
    return filepath;
  }

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

  printStats() {
    const stats = this.getStats();
    console.log(`\n📊 Statistics:`);
    console.log(`   Total prospects: ${stats.total}`);
    console.log(`   Today's new: ${stats.today}`);
    console.log(`   With phone: ${stats.withPhone}`);
    console.log(`   With email: ${stats.withEmail}`);
    console.log(`   Without website (hot leads): ${stats.withoutWebsite}`);
    console.log(`   By category:`, stats.byCategory);
  }
}

module.exports = RealProspectScraper;

// CLI usage
if (require.main === module) {
  const scraper = new RealProspectScraper();
  
  const command = process.argv[2];
  
  if (command === 'stats') {
    scraper.printStats();
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
  } else {
    console.log('Usage: node prospect-scraper.js [stats|top [count]|export]');
    console.log('');
    console.log('To run scraping with web_search:');
    console.log('  Use the run-scraper.js script or call the scraper from an agent');
  }
}
