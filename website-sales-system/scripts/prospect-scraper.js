/**
 * Website Sales System - Prospect Scraper
 * Finds local businesses in SoCal without websites
 */

const fs = require('fs');
const path = require('path');

// Search queries for finding businesses without websites
const SEARCH_QUERIES = [
  // Contractors
  '{city} HVAC contractor',
  '{city} plumber',
  '{city} electrician',
  '{city} roofing contractor',
  '{city} solar installer',
  '{city} landscaping service',
  '{city} pest control',
  // Home services
  '{city} house cleaning',
  '{city} carpet cleaning',
  '{city} window cleaning',
  '{city} pressure washing',
  // Restaurants
  '{city} restaurant',
  '{city} cafe',
  '{city} bakery',
  // Retail
  '{city} boutique',
  '{city} gift shop',
  '{city} furniture store',
  // Professional
  '{city} accountant',
  '{city} lawyer',
  '{city} consultant',
  // Medical
  '{city} dentist',
  '{city} chiropractor',
  '{city} massage therapist',
  // Automotive
  '{city} auto repair',
  '{city} car detailing',
  '{city} mechanic'
];

// SoCal cities prioritized by population/business density
const TARGET_CITIES = [
  // Santa Barbara/Ventura
  'Santa Barbara', 'Goleta', 'Carpinteria', 'Ventura', 'Oxnard', 'Camarillo',
  // LA County
  'Los Angeles', 'Pasadena', 'Glendale', 'Burbank', 'Santa Monica', 'Venice',
  'Marina del Rey', 'Culver City', 'Inglewood', 'Torrance', 'Long Beach',
  'Anaheim', 'Santa Ana', 'Irvine', 'Newport Beach', 'Huntington Beach',
  'Costa Mesa', 'Fullerton', 'Orange', 'Garden Grove', 'Westminster',
  // San Diego
  'San Diego', 'La Jolla', 'Chula Vista', 'Oceanside', 'Carlsbad', 'Encinitas'
];

class ProspectScraper {
  constructor() {
    this.prospectsDir = path.join(__dirname, '..', 'prospects');
    this.ensureDirectories();
  }

  ensureDirectories() {
    if (!fs.existsSync(this.prospectsDir)) {
      fs.mkdirSync(this.prospectsDir, { recursive: true });
    }
  }

  /**
   * Generate search queries for all city/category combinations
   */
  generateSearchQueries(limit = 100) {
    const queries = [];
    let count = 0;
    
    for (const city of TARGET_CITIES) {
      for (const query of SEARCH_QUERIES) {
        if (count >= limit) break;
        queries.push({
          city,
          query: query.replace('{city}', city),
          category: this.extractCategory(query),
          id: `prospect_${Date.now()}_${count}`
        });
        count++;
      }
      if (count >= limit) break;
    }
    
    return queries;
  }

  extractCategory(query) {
    const categories = {
      'HVAC': 'Contractor',
      'plumber': 'Contractor',
      'electrician': 'Contractor',
      'roofing': 'Contractor',
      'solar': 'Contractor',
      'landscaping': 'Home Services',
      'pest control': 'Home Services',
      'cleaning': 'Home Services',
      'restaurant': 'Restaurant',
      'cafe': 'Restaurant',
      'bakery': 'Restaurant',
      'boutique': 'Retail',
      'gift shop': 'Retail',
      'furniture': 'Retail',
      'accountant': 'Professional',
      'lawyer': 'Professional',
      'consultant': 'Professional',
      'dentist': 'Medical',
      'chiropractor': 'Medical',
      'massage': 'Medical',
      'auto repair': 'Automotive',
      'car detailing': 'Automotive',
      'mechanic': 'Automotive'
    };
    
    for (const [key, value] of Object.entries(categories)) {
      if (query.includes(key)) return value;
    }
    return 'Other';
  }

  /**
   * Save prospect to file
   */
  saveProspect(prospect) {
    const filename = `${prospect.id}.json`;
    const filepath = path.join(this.prospectsDir, filename);
    
    prospect.createdAt = new Date().toISOString();
    prospect.status = 'found';
    prospect.stage = 'Prospect Found';
    
    fs.writeFileSync(filepath, JSON.stringify(prospect, null, 2));
    return prospect;
  }

  /**
   * Get all prospects
   */
  getAllProspects() {
    const files = fs.readdirSync(this.prospectsDir);
    return files
      .filter(f => f.endsWith('.json'))
      .map(f => JSON.parse(fs.readFileSync(path.join(this.prospectsDir, f))));
  }

  /**
   * Get prospects by stage
   */
  getProspectsByStage(stage) {
    return this.getAllProspects().filter(p => p.stage === stage);
  }

  /**
   * Get prospects by status
   */
  getProspectsByStatus(status) {
    return this.getAllProspects().filter(p => p.status === status);
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
   * Get daily stats
   */
  getDailyStats() {
    const prospects = this.getAllProspects();
    const today = new Date().toDateString();
    
    return {
      total: prospects.length,
      today: prospects.filter(p => new Date(p.createdAt).toDateString() === today).length,
      byStage: prospects.reduce((acc, p) => {
        acc[p.stage] = (acc[p.stage] || 0) + 1;
        return acc;
      }, {})
    };
  }

  /**
   * Generate report for dashboard
   */
  generateReport() {
    const prospects = this.getAllProspects();
    
    return {
      totalProspects: prospects.length,
      todayNew: prospects.filter(p => {
        const created = new Date(p.createdAt);
        const now = new Date();
        return created.toDateString() === now.toDateString();
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
      revenue: prospects
        .filter(p => p.stage === 'Payment Received' || p.stage === 'In Production' || p.stage === 'Delivered' || p.stage === 'Hosting Active')
        .reduce((sum, p) => sum + (p.paymentAmount || 500), 0),
      byCategory: prospects.reduce((acc, p) => {
        acc[p.category] = (acc[p.category] || 0) + 1;
        return acc;
      }, {})
    };
  }
}

module.exports = ProspectScraper;

// CLI usage
if (require.main === module) {
  const scraper = new ProspectScraper();
  
  if (process.argv[2] === 'report') {
    console.log(JSON.stringify(scraper.generateReport(), null, 2));
  } else if (process.argv[2] === 'stats') {
    console.log(JSON.stringify(scraper.getDailyStats(), null, 2));
  } else {
    const queries = scraper.generateSearchQueries(100);
    console.log(`Generated ${queries.length} search queries`);
    console.log(JSON.stringify(queries.slice(0, 5), null, 2));
  }
}
