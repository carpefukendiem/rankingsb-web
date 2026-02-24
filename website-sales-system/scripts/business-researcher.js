/**
 * Website Sales System - Business Research with Brave API
 * Finds real local businesses with contact info
 */

const fs = require('fs');
const path = require('path');

class BusinessResearcher {
  constructor() {
    this.apiKey = process.env.BRAVE_API_KEY;
    this.baseUrl = 'https://api.search.brave.com/res/v1/web/search';
    this.prospectsDir = path.join(__dirname, '..', 'prospects');
    this.ensureDirectories();
  }

  ensureDirectories() {
    if (!fs.existsSync(this.prospectsDir)) {
      fs.mkdirSync(this.prospectsDir, { recursive: true });
    }
  }

  /**
   * Search for businesses using Brave API
   */
  async searchBusinesses(query, location, count = 10) {
    const searchQuery = `${query} ${location} -site:facebook.com -site:yelp.com phone email`;
    
    try {
      const response = await fetch(`${this.baseUrl}?q=${encodeURIComponent(searchQuery)}&count=${count}&freshness=any`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'X-Subscription-Token': this.apiKey
        }
      });

      if (!response.ok) {
        throw new Error(`Brave API error: ${response.status}`);
      }

      const data = await response.json();
      return this.extractBusinesses(data.web?.results || []);
    } catch (error) {
      console.error('Search error:', error.message);
      return [];
    }
  }

  /**
   * Extract business info from search results
   */
  extractBusinesses(results) {
    const businesses = [];
    
    for (const result of results) {
      // Extract phone numbers
      const phoneMatch = result.description?.match(/\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
      const phone = phoneMatch ? phoneMatch[0] : null;
      
      // Extract emails
      const emailMatch = result.description?.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
      const email = emailMatch ? emailMatch[0] : null;
      
      // Check if has website
      const hasWebsite = result.url && !result.url.includes('yelp.com') && !result.url.includes('facebook.com');
      
      if (phone || email) {
        businesses.push({
          name: this.extractBusinessName(result.title),
          description: result.description?.substring(0, 200),
          url: result.url,
          phone,
          email,
          hasWebsite: !!hasWebsite,
          source: 'brave_search',
          foundAt: new Date().toISOString()
        });
      }
    }
    
    return businesses;
  }

  extractBusinessName(title) {
    // Extract business name from title (usually before "|" or "-" or first few words)
    return title?.split(/[|\-–]/)[0]?.trim() || title?.substring(0, 50);
  }

  /**
   * Research businesses in a city/category
   */
  async researchCategory(city, category, subcategory, count = 10) {
    const queries = {
      'Contractor': [`${subcategory} contractor ${city}`, `${subcategory} services ${city}`, `${subcategory} company ${city}`],
      'Home Services': [`${subcategory} ${city}`, `${subcategory} services ${city}`],
      'Restaurant': [`${subcategory} restaurant ${city}`, `${subcategory} ${city}`],
      'Retail': [`${subcategory} store ${city}`, `${subcategory} shop ${city}`],
      'Professional': [`${subcategory} ${city}`, `${subcategory} services ${city}`],
      'Medical': [`${subcategory} ${city}`, `${subcategory} clinic ${city}`],
      'Automotive': [`${subcategory} ${city}`, `${subcategory} shop ${city}`]
    };

    const searchQueries = queries[category] || queries['Professional'];
    const allBusinesses = [];

    for (const query of searchQueries) {
      if (allBusinesses.length >= count) break;
      
      const businesses = await this.searchBusinesses(query, city, count - allBusinesses.length);
      allBusinesses.push(...businesses);
      
      // Rate limit delay
      await this.delay(1000);
    }

    // Filter out businesses with websites (we want ones WITHOUT websites)
    return allBusinesses.filter(b => !b.hasWebsite);
  }

  /**
   * Run full research batch
   */
  async runBatch(targetCount = 100) {
    const targets = [
      { city: 'Santa Barbara', category: 'Contractor', subcategory: 'HVAC', count: 10 },
      { city: 'Santa Barbara', category: 'Contractor', subcategory: 'plumbing', count: 10 },
      { city: 'Ventura', category: 'Contractor', subcategory: 'electrical', count: 10 },
      { city: 'Ventura', category: 'Home Services', subcategory: 'landscaping', count: 10 },
      { city: 'Oxnard', category: 'Contractor', subcategory: 'roofing', count: 10 },
      { city: 'Camarillo', category: 'Home Services', subcategory: 'cleaning', count: 10 },
      { city: 'Santa Barbara', category: 'Restaurant', subcategory: 'Mexican', count: 8 },
      { city: 'Ventura', category: 'Restaurant', subcategory: 'Italian', count: 8 },
      { city: 'Santa Barbara', category: 'Automotive', subcategory: 'mechanic', count: 8 },
      { city: 'Ventura', category: 'Automotive', subcategory: 'auto repair', count: 8 }
    ];

    console.log(`🔍 Researching ${targetCount} businesses across SoCal...\n`);
    
    const allResults = [];
    
    for (const target of targets) {
      if (allResults.length >= targetCount) break;
      
      console.log(`Searching: ${target.subcategory} in ${target.city}...`);
      
      const businesses = await this.researchCategory(
        target.city,
        target.category,
        target.subcategory,
        target.count
      );
      
      // Enrich and save each business
      for (const business of businesses) {
        if (allResults.length >= targetCount) break;
        
        const enriched = {
          ...business,
          id: `biz_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          city: target.city,
          category: target.category,
          subcategory: target.subcategory,
          stage: 'Prospect Found',
          status: 'active',
          priority: this.calculatePriority(business),
          createdAt: new Date().toISOString()
        };
        
        this.saveBusiness(enriched);
        allResults.push(enriched);
        
        console.log(`  ✓ Found: ${enriched.name} (${enriched.phone || 'no phone'})`);
      }
      
      // Delay between cities to respect rate limits
      await this.delay(2000);
    }

    console.log(`\n✅ Research complete! Found ${allResults.length} businesses.`);
    return allResults;
  }

  calculatePriority(business) {
    // Higher priority if has both phone and email
    if (business.phone && business.email) return 1;
    if (business.phone) return 2;
    if (business.email) return 3;
    return 4;
  }

  saveBusiness(business) {
    const filepath = path.join(this.prospectsDir, `${business.id}.json`);
    fs.writeFileSync(filepath, JSON.stringify(business, null, 2));
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Get all researched businesses
   */
  getAllBusinesses() {
    const files = fs.readdirSync(this.prospectsDir);
    return files
      .filter(f => f.endsWith('.json') && f.startsWith('biz_'))
      .map(f => JSON.parse(fs.readFileSync(path.join(this.prospectsDir, f))));
  }

  /**
   * Get stats
   */
  getStats() {
    const businesses = this.getAllBusinesses();
    const today = new Date().toDateString();
    
    return {
      total: businesses.length,
      today: businesses.filter(b => new Date(b.createdAt).toDateString() === today).length,
      withPhone: businesses.filter(b => b.phone).length,
      withEmail: businesses.filter(b => b.email).length,
      byCity: businesses.reduce((acc, b) => {
        acc[b.city] = (acc[b.city] || 0) + 1;
        return acc;
      }, {}),
      byCategory: businesses.reduce((acc, b) => {
        acc[b.category] = (acc[b.category] || 0) + 1;
        return acc;
      }, {})
    };
  }
}

module.exports = BusinessResearcher;

// CLI usage
if (require.main === module) {
  const researcher = new BusinessResearcher();
  
  if (process.argv[2] === 'stats') {
    console.log(JSON.stringify(researcher.getStats(), null, 2));
  } else if (process.argv[2] === 'research') {
    const count = parseInt(process.argv[3]) || 100;
    researcher.runBatch(count).then(results => {
      console.log('\nFinal stats:', JSON.stringify(researcher.getStats(), null, 2));
    });
  } else {
    console.log('Usage: node business-researcher.js [stats|research [count]]');
  }
}
