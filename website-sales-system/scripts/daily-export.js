/**
 * Daily CSV Export for Ruben
 * Exports top 20 prospects with outreach suggestions
 */

const fs = require('fs');
const path = require('path');

class DailyExport {
  constructor() {
    this.prospectsDir = path.join(__dirname, '..', 'prospects');
    this.exportDir = path.join(__dirname, '..', 'exports');
    this.ensureDirectories();
  }

  ensureDirectories() {
    if (!fs.existsSync(this.exportDir)) {
      fs.mkdirSync(this.exportDir, { recursive: true });
    }
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

  /**
   * Generate outreach angle for a prospect
   */
  generateOutreachAngle(prospect) {
    const angles = [];
    
    if (!prospect.hasWebsite) {
      angles.push('NO WEBSITE - Immediate need for web presence');
    } else {
      angles.push('Has basic website - opportunity for upgrade/redesign');
    }
    
    if (prospect.category === 'Contractor') {
      angles.push('Contractors lose jobs without websites - homeowners research online first');
    } else if (prospect.category === 'Restaurant') {
      angles.push('Restaurants need online menus and reservation systems');
    } else if (prospect.category === 'Medical') {
      angles.push('Medical practices need patient portals and appointment booking');
    } else if (prospect.category === 'Professional') {
      angles.push('Professional services need credibility through web presence');
    } else if (prospect.category === 'Automotive') {
      angles.push('Auto shops benefit from online booking and review integration');
    } else if (prospect.category === 'Retail') {
      angles.push('Retail stores need online catalog and contact info');
    } else if (prospect.category === 'Home Services') {
      angles.push('Home service providers found via Google - need SEO-optimized sites');
    }
    
    if (!prospect.email) {
      angles.push('Phone only - call during business hours');
    } else {
      angles.push('Has email - can send mockup preview');
    }
    
    return angles.join('; ');
  }

  /**
   * Generate suggested script for prospect
   */
  generateScript(prospect) {
    const name = prospect.businessName || 'there';
    const hasWebsite = prospect.hasWebsite;
    
    if (!hasWebsite) {
      return `Hi, this is Ruben. I was looking for ${prospect.category.toLowerCase()} services in ${prospect.city} and noticed ${prospect.businessName} doesn't have a website. I help local businesses get online with professional $500 websites. Would you be interested in a free mockup?`;
    } else {
      return `Hi, this is Ruben. I came across ${prospect.businessName} online. I work with local ${prospect.category.toLowerCase()} businesses to modernize their web presence. I noticed your current site could benefit from a refresh. I create professional websites for $500 with a 7-day turnaround. Interested in seeing a mockup?`;
    }
  }

  /**
   * Export top prospects to CSV
   */
  exportTopProspects(count = 20) {
    console.log(`\n📊 Generating Daily Export - Top ${count} Prospects\n`);
    console.log('='.repeat(60));
    
    const prospects = this.getAllProspects();
    
    // Sort by priority (no website first, then by email, then date)
    const sorted = prospects
      .filter(p => p.stage === 'Prospect Found') // Only new prospects
      .sort((a, b) => {
        // No website = highest priority
        if (!a.hasWebsite && b.hasWebsite) return -1;
        if (a.hasWebsite && !b.hasWebsite) return 1;
        // Has email = higher priority
        if (a.email && !b.email) return -1;
        if (!a.email && b.email) return 1;
        // Newest first
        return new Date(b.createdAt) - new Date(a.createdAt);
      })
      .slice(0, count);

    if (sorted.length === 0) {
      console.log('❌ No prospects found. Run scraper first.');
      return null;
    }

    // Generate filename with date
    const date = new Date().toISOString().split('T')[0];
    const filename = `daily-top-${count}-${date}.csv`;
    const filepath = path.join(this.exportDir, filename);

    // CSV Headers
    const headers = [
      'Priority',
      'Business Name',
      'Phone',
      'Email',
      'Address',
      'City',
      'Category',
      'Has Website',
      'Current Website',
      'Why They\'re a Good Target',
      'Suggested Outreach Angle',
      'Call Script',
      'Prospect ID',
      'Date Found'
    ];

    // CSV Rows
    const rows = sorted.map((p, index) => {
      const priority = !p.hasWebsite ? '🔥 HOT' : (p.email ? '⚡ WARM' : '📞 COLD');
      const whyTarget = !p.hasWebsite 
        ? 'NO WEBSITE - Critical need for online presence' 
        : 'Has website but may need upgrade/redesign';
      
      return [
        priority,
        p.businessName || 'Unknown',
        p.phone || '',
        p.email || '',
        p.address || '',
        p.city || '',
        p.category || '',
        p.hasWebsite ? 'Yes' : 'No',
        p.website || '',
        whyTarget,
        this.generateOutreachAngle(p),
        this.generateScript(p),
        p.id,
        new Date(p.createdAt).toLocaleDateString()
      ];
    });

    // Escape and format CSV
    const escapeCSV = (value) => {
      const str = String(value || '');
      if (str.includes(',') || str.includes('"') || str.includes('\n')) {
        return `"${str.replace(/"/g, '""')}"`;
      }
      return str;
    };

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(escapeCSV).join(','))
    ].join('\n');

    fs.writeFileSync(filepath, csvContent);

    // Print summary
    console.log(`\n🔥 HOT LEADS (No Website): ${sorted.filter(p => !p.hasWebsite).length}`);
    console.log(`⚡ WARM LEADS (Has Email): ${sorted.filter(p => p.email && p.hasWebsite).length}`);
    console.log(`📞 COLD LEADS (Phone Only): ${sorted.filter(p => !p.email && p.hasWebsite).length}`);
    console.log('');

    sorted.forEach((p, i) => {
      const icon = !p.hasWebsite ? '🔥' : (p.email ? '⚡' : '📞');
      console.log(`${i + 1}. ${icon} ${p.businessName}`);
      console.log(`   📞 ${p.phone}${p.email ? ' | ✉️ ' + p.email : ''}`);
      console.log(`   📍 ${p.city} | ${p.category}`);
      if (!p.hasWebsite) {
        console.log(`   🔥 NO WEBSITE - Top priority!`);
      }
      console.log('');
    });

    console.log('='.repeat(60));
    console.log(`\n✅ Export saved: ${filepath}`);
    console.log(`\n📋 Next Steps:`);
    console.log(`   1. Open the CSV in Excel/Google Sheets`);
    console.log(`   2. Start with 🔥 HOT leads (no website)`);
    console.log(`   3. Use the suggested scripts as starting points`);
    console.log(`   4. Update prospect stage after outreach`);
    
    return { filepath, count: sorted.length, prospects: sorted };
  }

  /**
   * Export all prospects by category (for GHL import)
   */
  exportByCategory() {
    console.log('\n📊 Exporting Prospects by Category\n');
    
    const prospects = this.getAllProspects();
    
    // Group by category
    const byCategory = prospects.reduce((acc, p) => {
      const cat = p.category || 'Other';
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(p);
      return acc;
    }, {});

    const exports = [];

    for (const [category, catProspects] of Object.entries(byCategory)) {
      const filename = `website-sales-${category.toLowerCase().replace(/\s+/g, '-')}.csv`;
      const filepath = path.join(this.exportDir, filename);
      
      const headers = [
        'First Name', 'Last Name', 'Email', 'Phone', 'Company Name',
        'Address', 'City', 'State', 'Tags', 'Category',
        'Has Website', 'Website URL', 'Prospect ID', 'Stage', 'Priority'
      ];

      const rows = catProspects.map(p => [
        p.businessName?.split(' ')[0] || '',
        p.businessName?.split(' ').slice(1).join(' ') || '',
        p.email || '',
        p.phone || '',
        p.businessName || '',
        p.address || '',
        p.city || '',
        'CA',
        `website-sales,${(p.category || 'other').toLowerCase().replace(/\s+/g, '-')},socal`,
        p.category || '',
        p.hasWebsite ? 'Yes' : 'No',
        p.website || '',
        p.id || '',
        p.stage || 'Prospect Found',
        !p.hasWebsite ? 'Hot' : (p.email ? 'Warm' : 'Cold')
      ]);

      const escapeCSV = (value) => {
        const str = String(value || '');
        if (str.includes(',') || str.includes('"') || str.includes('\n')) {
          return `"${str.replace(/"/g, '""')}"`;
        }
        return str;
      };

      const csvContent = [
        headers.join(','),
        ...rows.map(row => row.map(escapeCSV).join(','))
      ].join('\n');

      fs.writeFileSync(filepath, csvContent);
      exports.push({ category, filename, count: catProspects.length, path: filepath });
      console.log(`✅ ${category}: ${catProspects.length} prospects → ${filename}`);
    }

    return exports;
  }
}

module.exports = DailyExport;

// CLI usage
if (require.main === module) {
  const exporter = new DailyExport();
  
  const command = process.argv[2];
  
  if (command === 'category') {
    exporter.exportByCategory();
  } else if (command === 'daily') {
    const count = parseInt(process.argv[3]) || 20;
    exporter.exportTopProspects(count);
  } else if (command === 'all') {
    exporter.exportTopProspects(20);
    exporter.exportByCategory();
  } else {
    console.log('Usage: node daily-export.js [daily [count]|category|all]');
    console.log('  daily [count]  - Export top prospects for today (default 20)');
    console.log('  category       - Export all prospects grouped by category');
    console.log('  all            - Do both exports');
  }
}
