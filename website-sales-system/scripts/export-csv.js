/**
 * Export prospects to CSV for GHL import
 * Creates CSV files organized by niche for easy import
 */

const fs = require('fs');
const path = require('path');

class CSVExporter {
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
    const files = fs.readdirSync(this.prospectsDir);
    return files
      .filter(f => f.endsWith('.json'))
      .map(f => JSON.parse(fs.readFileSync(path.join(this.prospectsDir, f))));
  }

  exportToCSV() {
    console.log('🚀 Starting CSV Export - Pipeline per Niche\n');
    
    const prospects = this.getAllProspects();
    console.log(`📊 Found ${prospects.length} prospects to export\n`);

    // Group by niche
    const byNiche = prospects.reduce((acc, p) => {
      const niche = p.category || 'Other';
      if (!acc[niche]) acc[niche] = [];
      acc[niche].push(p);
      return acc;
    }, {});

    const exports = [];

    // Export each niche as separate CSV
    for (const [niche, nicheProspects] of Object.entries(byNiche)) {
      const filename = `website-sales-${niche.toLowerCase().replace(/\s+/g, '-')}.csv`;
      const filepath = path.join(this.exportDir, filename);
      
      // CSV Header
      const headers = [
        'First Name',
        'Last Name',
        'Email',
        'Phone',
        'Company Name',
        'Address',
        'City',
        'State',
        'Country',
        'Tags',
        'Business Category',
        'Prospect ID',
        'Query',
        'Mockup URL',
        'Lead Source',
        'Priority',
        'Has Website',
        'Stage',
        'Pipeline'
      ];

      // CSV Rows
      const rows = nicheProspects.map(p => [
        p.businessName || 'Unknown Business',
        '',
        p.email || '',
        p.phone || '',
        p.businessName || '',
        p.address || '',
        p.city || '',
        'CA',
        'US',
        `website-sales,${(p.category || 'other').toLowerCase().replace(/\s+/g, '-')},socal-leads`,
        p.category || '',
        p.id || '',
        p.query || '',
        p.previewUrl || '',
        'Website Sales System',
        p.priority || '',
        p.hasWebsite ? 'Yes' : 'No',
        p.stage || 'Prospect Found',
        `Website Sales - ${niche}`
      ]);

      // Escape and format
      const escapeCSV = (value) => {
        if (typeof value === 'string' && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      };

      const csvContent = [
        headers.join(','),
        ...rows.map(row => row.map(escapeCSV).join(','))
      ].join('\n');

      fs.writeFileSync(filepath, csvContent);
      exports.push({ niche, filename, count: nicheProspects.length, path: filepath });
      console.log(`✅ Exported: ${filename} (${nicheProspects.length} prospects)`);
    }

    // Export all prospects as one master file
    const masterFilename = 'website-sales-all-prospects.csv';
    const masterPath = path.join(this.exportDir, masterFilename);
    
    const allHeaders = [
      'First Name',
      'Last Name',
      'Email',
      'Phone',
      'Company Name',
      'Address',
      'City',
      'State',
      'Country',
      'Tags',
      'Business Category',
      'Prospect ID',
      'Query',
      'Mockup URL',
      'Lead Source',
      'Priority',
      'Has Website',
      'Stage',
      'Pipeline'
    ];

    const allRows = prospects.map(p => [
      p.businessName || 'Unknown Business',
      '',
      p.email || '',
      p.phone || '',
      p.businessName || '',
      p.address || '',
      p.city || '',
      'CA',
      'US',
      `website-sales,${(p.category || 'other').toLowerCase().replace(/\s+/g, '-')},socal-leads`,
      p.category || '',
      p.id || '',
      p.query || '',
      p.previewUrl || '',
      'Website Sales System',
      p.priority || '',
      p.hasWebsite ? 'Yes' : 'No',
      p.stage || 'Prospect Found',
      `Website Sales - ${p.category || 'Other'}`
    ]);

    const escapeCSV = (value) => {
      if (typeof value === 'string' && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
        return `"${value.replace(/"/g, '""')}"`;
      }
      return value;
    };

    const masterContent = [
      allHeaders.join(','),
      ...allRows.map(row => row.map(escapeCSV).join(','))
    ].join('\n');

    fs.writeFileSync(masterPath, masterContent);

    console.log('\n' + '='.repeat(60));
    console.log('📊 EXPORT SUMMARY');
    console.log('='.repeat(60));
    console.log(`Total Prospects: ${prospects.length}\n`);
    
    for (const exp of exports) {
      console.log(`${exp.niche}: ${exp.count} prospects`);
      console.log(`  File: ${exp.path}`);
    }
    
    console.log(`\n📁 Master File: ${masterPath}`);
    console.log(`   (${prospects.length} total prospects)`);
    console.log('='.repeat(60));
    console.log('\n✅ Export complete! Ready for GHL import.');
    console.log('\n📥 To import into GHL:');
    console.log('1. Go to Contacts → Import');
    console.log('2. Upload the CSV files');
    console.log('3. Map fields appropriately');
    console.log('4. Create pipelines: Website Sales - [Niche]');
    console.log('5. Assign contacts to appropriate pipelines');

    return { exports, masterPath, total: prospects.length };
  }
}

// Run export
const exporter = new CSVExporter();
exporter.exportToCSV();
