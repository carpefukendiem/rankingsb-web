/**
 * Website Sales System - Prospect Scraper with Brave Search
 * Finds real local businesses in SoCal using Brave Search API
 */

const fs = require('fs');
const path = require('path');
const { web_search } = require('./web-search-wrapper');

// SoCal cities prioritized by population/business density
const TARGET_CITIES = [
  // Santa Barbara/Ventura
  'Santa Barbara', 'Goleta', 'Carpinteria', 'Ventura', 'Oxnard', 'Camarillo', 'Thousand Oaks',
  // LA County
  'Los Angeles', 'Pasadena', 'Glendale', 'Burbank', 'Santa Monica', 'Venice',
  'Marina del Rey', 'Culver City', 'Inglewood', 'Torrance', 'Long Beach',
  'Anaheim', 'Santa Ana', 'Irvine', 'Newport Beach', 'Huntington Beach',
  'Costa Mesa', 'Fullerton', 'Orange', 'Garden Grove', 'Westminster', 'Beverly Hills',
  // San Diego
  'San Diego', 'La Jolla', 'Chula Vista', 'Oceanside', 'Carlsbad', 'Encinitas', 'Escondido'
];

// Search queries for finding businesses
const SEARCH_QUERIES = [
  // Contractors
  { category: 'Contractor', query: '{city} HVAC contractor phone' },
  { category: 'Contractor', query: '{city} plumber phone number' },
  { category: 'Contractor', query: '{city} electrician contact' },
  { category: 'Contractor', query: '{city} roofing contractor' },
  { category: 'Contractor', query: '{city} solar installer phone' },
  { category: 'Contractor', query: '{city} landscaping service contact' },
  { category: 'Contractor', query: '{city} pest control phone' },
  { category: 'Contractor', query: '{city} general contractor' },
  // Home services
  { category: 'Home Services', query: '{city} house cleaning service' },
  { category: 'Home Services', query: '{city} carpet cleaning phone' },
  { category: 'Home Services', query: '{city} window cleaning company' },
  { category: 'Home Services', query: '{city} pressure washing service' },
  { category: 'Home Services', query: '{city} junk removal phone' },
  { category: 'Home Services', query: '{city} garage door repair' },
  { category: 'Home Services', query: '{city} moving company' },
  { category: 'Home Services', query: '{city} handyman service' },
  // Restaurants
  { category: 'Restaurant', query: '{city} restaurant contact' },
  { category: 'Restaurant', query: '{city} cafe phone number' },
  { category: 'Restaurant', query: '{city} bakery contact' },
  { category: 'Restaurant', query: '{city} food truck' },
  { category: 'Restaurant', query: '{city} catering service' },
  // Retail
  { category: 'Retail', query: '{city} boutique store' },
  { category: 'Retail', query: '{city} gift shop phone' },
  { category: 'Retail', query: '{city} furniture store contact' },
  { category: 'Retail', query: '{city} clothing store' },
  { category: 'Retail', query: '{city} specialty shop' },
  // Professional
  { category: 'Professional', query: '{city} accountant CPA' },
  { category: 'Professional', query: '{city} lawyer attorney phone' },
  { category: 'Professional', query: '{city} business consultant' },
  { category: 'Professional', query: '{city} insurance agent' },
  { category: 'Professional', query: '{city} financial advisor' },
  { category: 'Professional', query: '{city} real estate agent' },
  // Medical
  { category: 'Medical', query: '{city} dentist office phone' },
  { category: 'Medical', query: '{city} chiropractor contact' },
  { category: 'Medical', query: '{city} massage therapist' },
  { category: 'Medical', query: '{city} physical therapy' },
  { category: 'Medical', query: '{city} dermatologist' },
  { category: 'Medical', query: '{city} orthodontist' },
  // Automotive
  { category: 'Automotive', query: '{city} auto repair shop' },
  { category: 'Automotive', query: '{city} car detailing service' },
  { category: 'Automotive', query: '{city} mechanic shop phone' },
  { category: 'Automotive', query: '{city} auto body shop' },
  { category: 'Automotive', query: '{city} smog check station' },
  { category: 'Automotive', query: '{city} tire shop' }
];

class ProspectScraper {
  constructor() {
    this.prospectsDir = path.join(__dirname, '..', 'prospects');
    this.logsDir = path.join(__dirname, '..', 'logs');
    this.ensureDirectories();
    this.foundPhones = new Set();
    this.loadExistingPhones();
  }

  ensureDirectories() {
    if (!fs.existsSync(this.prospectsDir)) {
      fs.mkdirSync(this.prospectsDir, { recursive: true });
    }
    if (!fs.existsSync(this.logsDir)) {
      fs.mkdirSync(this.logsDir, { recursive: true });
    }
  }

  loadExistingPhones() {
    // Load existing prospect phone numbers to avoid duplicates
    const files = fs.readdirSync(this.prospectsDir).filter(f => f.endsWith('.json'));
    for (const file of files) {
      try {
        const prospect = JSON.parse(fs.readFileSync(path.join(this.prospectsDir, file)));
        if (prospect.phone) {
          this.foundPhones.add(this.normalizePhone(prospect.phone));
        }
      } catch (e) {}
    }
  }

  normalizePhone(phone) {
    return phone.replace(/\D/g, '');
  }

  /**
   * Search for businesses using Brave Search
   */
  async searchBusinesses(query, city, category) {
    try {
      console.log(`  🔍 Searching: ${query}...`);
      
      // Use Brave Search via web_search tool
      const results = await web_search(query, 10);
      
      if (!results || !results.results || results.results.length === 0) {
        return [];
      }

      const businesses = [];
      
      for (const result of results.results) {
        const business = this.extractBusinessInfo(result, city, category);
        if (business && business.phone && !this.foundPhones.has(this.normalizePhone(business.phone))) {
          this.foundPhones.add(this.normalizePhone(business.phone));
          businesses.push(business);
        }
      }
      
      return businesses;
    } catch (error) {
      console.error(`  ❌ Search error for "${query}":`, error.message);
      return [];
    }
  }

  /**
   * Extract business info from search result
   */
  extractBusinessInfo(result, city, category) {
    const title = this.cleanTitle(result.title);
    const description = result.description || '';
    const url = result.url || '';
    
    // Check if mock data has explicit hasWebsite flag
    const explicitHasWebsite = result.hasWebsite;
    
    // Extract phone number - first check explicit phone from mock, then parse
    let phone = result.phone || null;
    if (!phone) {
      const phoneMatch = description.match(/\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/) ||
                         title.match(/\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
      phone = phoneMatch ? phoneMatch[0] : null;
    }
    
    // Extract email - first check explicit email from mock, then parse
    let email = result.email || null;
    if (!email) {
      const emailMatch = description.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/) ||
                         description.match(/\b[A-Za-z0-9._%+-]+\s*@\s*[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/i);
      email = emailMatch ? emailMatch[0].replace(/\s/g, '') : null;
    }
    
    // Extract address
    const addressMatch = description.match(/\d+\s+[A-Za-z]+\s+(?:St|Street|Ave|Avenue|Blvd|Boulevard|Rd|Road|Dr|Drive|Way|Ln|Lane)[.,]?\s*(?:#?\s*\d+)?/i) ||
                         description.match(/\d+\s+[^,]+(?:Santa Barbara|Ventura|Oxnard|Camarillo|Los Angeles|San Diego|Pasadena|Glendale|Burbank|Santa Monica|Long Beach|Anaheim|Irvine|Newport Beach|Huntington Beach|Costa Mesa)/i);
    const address = addressMatch ? addressMatch[0] : null;
    
    // Check if has website (not Yelp, Facebook, YellowPages, etc.)
    // Use explicit flag if available (from mock data), otherwise detect from URL
    const directorySites = ['yelp.com', 'facebook.com', 'yellowpages.com', 'bbb.org', 'mapquest.com', 
                           'chamberofcommerce.com', 'angi.com', 'homeadvisor.com', 'thumbtack.com',
                           'porch.com', 'buildzoom.com', 'houzz.com', 'nextdoor.com'];
    
    let hasWebsite;
    if (typeof explicitHasWebsite === 'boolean') {
      hasWebsite = explicitHasWebsite;
    } else {
      hasWebsite = url && !directorySites.some(site => url.includes(site));
    }
    
    const websiteUrl = hasWebsite ? url : null;
    
    if (!phone) return null;
    
    return {
      businessName: title,
      phone,
      email,
      address,
      city,
      category,
      website: websiteUrl,
      hasWebsite: hasWebsite,
      sourceUrl: url,
      description: description.substring(0, 300),
      priority: !hasWebsite ? 1 : (email ? 2 : 3) // Priority: no website > has email > has website
    };
  }

  cleanTitle(title) {
    if (!title) return 'Unknown Business';
    // Remove content tags
    title = title.replace(/<<<EXTERNAL_UNTRUSTED_CONTENT[^>]*>>>/g, '');
    title = title.replace(/<<<END_EXTERNAL_UNTRUSTED_CONTENT[^>]*>>>/g, '');
    title = title.replace(/Source: Web Search/g, '');
    title = title.replace(/---/g, '');
    // Extract business name (usually before | or -)
    title = title.split(/[|\-–]/)[0].trim();
    // Clean up
    title = title.replace(/\s+/g, ' ').trim();
    return title.substring(0, 100);
  }

  /**
   * Generate prospects for a specific city/category
   */
  async generateForCity(city, count = 10) {
    const businesses = [];
    const queries = SEARCH_QUERIES.filter(q => 
      // Randomize which categories we search for variety
      Math.random() > 0.3
    );
    
    // Shuffle queries for variety
    const shuffled = queries.sort(() => 0.5 - Math.random());
    
    for (const item of shuffled) {
      if (businesses.length >= count) break;
      
      const query = item.query.replace('{city}', city);
      const results = await this.searchBusinesses(query, city, item.category);
      
      for (const business of results) {
        if (businesses.length >= count) break;
        businesses.push(business);
      }
      
      // Rate limiting - be nice to the API
      await this.delay(500);
    }
    
    return businesses;
  }

  /**
   * Run full prospecting batch
   */
  async runBatch(targetCount = 100) {
    console.log(`\n🚀 Starting prospect generation: ${targetCount} businesses\n`);
    console.log('='.repeat(60));
    
    const allProspects = [];
    const prospectsPerCity = Math.ceil(targetCount / TARGET_CITIES.length);
    
    // Shuffle cities for variety
    const shuffledCities = [...TARGET_CITIES].sort(() => 0.5 - Math.random());
    
    for (const city of shuffledCities) {
      if (allProspects.length >= targetCount) break;
      
      console.log(`\n📍 ${city}`);
      console.log('-'.repeat(40));
      
      const needed = Math.min(prospectsPerCity, targetCount - allProspects.length);
      const businesses = await this.generateForCity(city, needed);
      
      for (const business of businesses) {
        const prospect = this.saveProspect(business);
        allProspects.push(prospect);
        
        const indicator = !business.hasWebsite ? '🔥' : (business.email ? '✉️' : '📞');
        console.log(`  ${indicator} ${prospect.businessName}`);
        console.log(`     Phone: ${prospect.phone}${prospect.email ? ' | Email: ' + prospect.email : ''}${prospect.hasWebsite ? ' | Has Website' : ' | NO WEBSITE - HOT LEAD!'}`);
      }
      
      console.log(`  Found ${businesses.length} prospects in ${city}`);
      
      // Delay between cities
      await this.delay(1000);
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
      query: business.query || '',
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
   * Get prospects by stage
   */
  getProspectsByStage(stage) {
    return this.getAllProspects().filter(p => p.stage === stage);
  }

  /**
   * Update prospect
   */
  updateProspect(prospectId, updates) {
    const filepath = path.join(this.prospectsDir, `${prospectId}.json`);
    if (!fs.existsSync(filepath)) return null;
    
    const prospect = JSON.parse(fs.readFileSync(filepath));
    Object.assign(prospect, updates);
    prospect.updatedAt = new Date().toISOString();
    
    fs.writeFileSync(filepath, JSON.stringify(prospect, null, 2));
    return prospect;
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
   * Get top prospects for outreach (prioritizes no-website leads)
   */
  getTopProspects(count = 20) {
    const prospects = this.getAllProspects()
      .filter(p => p.stage === 'Prospect Found')
      .sort((a, b) => {
        // Sort by priority (no website = higher priority)
        if (!a.hasWebsite && b.hasWebsite) return -1;
        if (a.hasWebsite && !b.hasWebsite) return 1;
        // Then by email availability
        if (a.email && !b.email) return -1;
        if (!a.email && b.email) return 1;
        return 0;
      });
    
    return prospects.slice(0, count);
  }

  /**
   * Generate daily report
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

module.exports = ProspectScraper;

// CLI usage
if (require.main === module) {
  const scraper = new ProspectScraper();
  
  const command = process.argv[2];
  
  if (command === 'report') {
    console.log(JSON.stringify(scraper.generateReport(), null, 2));
  } else if (command === 'stats') {
    console.log(JSON.stringify(scraper.getStats(), null, 2));
  } else if (command === 'top') {
    const count = parseInt(process.argv[3]) || 20;
    const top = scraper.getTopProspects(count);
    console.log(`\n🔥 Top ${count} Prospects (prioritized by no-website, then email):\n`);
    top.forEach((p, i) => {
      const hot = !p.hasWebsite ? '🔥' : '';
      console.log(`${i + 1}. ${hot} ${p.businessName}`);
      console.log(`   Phone: ${p.phone} | City: ${p.city} | Category: ${p.category}`);
      if (p.email) console.log(`   Email: ${p.email}`);
      if (p.hasWebsite) console.log(`   Website: ${p.website}`);
      console.log('');
    });
  } else if (command === 'scrape') {
    const count = parseInt(process.argv[3]) || 100;
    scraper.runBatch(count).then(() => {
      process.exit(0);
    }).catch(err => {
      console.error('Error:', err);
      process.exit(1);
    });
  } else {
    console.log('Usage: node prospect-scraper.js [report|stats|top [count]|scrape [count]]');
  }
}
