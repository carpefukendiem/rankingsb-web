/**
 * Import prospects to GHL - Pipeline per Niche
 * Creates dedicated pipelines for each category and imports prospects
 */

const fs = require('fs');
const path = require('path');

// GHL Configuration
const GHL_API_KEY = 'pit-2e5816e3-96f7-48ec-9caa-64fb68554766';
const GHL_LOCATION_ID = 'yrvzyq2jB2me4Z23PFxP';
const BASE_URL = 'https://rest.gohighlevel.com/v1';

// Niche to Pipeline mapping
const NICHE_PIPELINES = {
  'Contractor': { name: 'Website Sales - Contractors', stage: 'Prospect Found' },
  'Home Services': { name: 'Website Sales - Home Services', stage: 'Prospect Found' },
  'Restaurant': { name: 'Website Sales - Restaurants', stage: 'Prospect Found' },
  'Retail': { name: 'Website Sales - Retail', stage: 'Prospect Found' },
  'Professional': { name: 'Website Sales - Professional', stage: 'Prospect Found' },
  'Medical': { name: 'Website Sales - Medical', stage: 'Prospect Found' },
  'Automotive': { name: 'Website Sales - Automotive', stage: 'Prospect Found' },
  'Other': { name: 'Website Sales - Other', stage: 'Prospect Found' }
};

class GHLImporter {
  constructor() {
    this.prospectsDir = path.join(__dirname, '..', 'prospects');
    this.results = {
      total: 0,
      imported: 0,
      failed: 0,
      byNiche: {}
    };
  }

  getAllProspects() {
    const files = fs.readdirSync(this.prospectsDir);
    return files
      .filter(f => f.endsWith('.json'))
      .map(f => JSON.parse(fs.readFileSync(path.join(this.prospectsDir, f))));
  }

  async createPipeline(name) {
    try {
      const response = await fetch(`${BASE_URL}/pipelines`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GHL_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          locationId: GHL_LOCATION_ID,
          stages: [
            { name: 'Prospect Found', position: 1 },
            { name: 'Mockup Created', position: 2 },
            { name: 'Outreach Sent', position: 3 },
            { name: 'Engaged', position: 4 },
            { name: 'Meeting Scheduled', position: 5 },
            { name: 'Proposal Sent', position: 6 },
            { name: 'Payment Received', position: 7 },
            { name: 'In Production', position: 8 },
            { name: 'Delivered', position: 9 }
          ]
        })
      });

      if (!response.ok) {
        // Pipeline might already exist
        console.log(`Pipeline "${name}" may already exist or error: ${response.status}`);
        return null;
      }

      const data = await response.json();
      console.log(`✅ Created pipeline: ${name}`);
      return data.pipeline;
    } catch (error) {
      console.error(`❌ Error creating pipeline "${name}":`, error.message);
      return null;
    }
  }

  async importContact(prospect, pipelineId, stageId) {
    try {
      // Prepare contact data
      const contactData = {
        locationId: GHL_LOCATION_ID,
        firstName: prospect.businessName || 'Unknown Business',
        lastName: '',
        email: prospect.email || '',
        phone: prospect.phone || '',
        address1: prospect.address || '',
        city: prospect.city || '',
        state: 'CA',
        country: 'US',
        customField: {
          // Custom fields for website sales
          'business_category': prospect.category || '',
          'prospect_id': prospect.id || '',
          'query': prospect.query || '',
          'mockup_url': prospect.previewUrl || '',
          'lead_source': 'Website Sales System',
          'priority': String(prospect.priority || ''),
          'has_website': prospect.hasWebsite ? 'No' : 'Unknown'
        },
        tags: ['website-sales', prospect.category?.toLowerCase().replace(/\s+/g, '-') || 'other', 'socal-leads']
      };

      // Create or update contact
      const response = await fetch(`${BASE_URL}/contacts`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GHL_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(contactData)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const contact = await response.json();

      // Add to pipeline if we have a pipeline ID
      if (pipelineId && stageId) {
        await this.addToPipeline(contact.contact.id, pipelineId, stageId);
      }

      return contact.contact;
    } catch (error) {
      console.error(`❌ Failed to import ${prospect.id}:`, error.message);
      return null;
    }
  }

  async addToPipeline(contactId, pipelineId, stageId) {
    try {
      const response = await fetch(`${BASE_URL}/contacts/${contactId}/pipeline`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GHL_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          pipelineId: pipelineId,
          stageId: stageId
        })
      });

      if (!response.ok) {
        console.log(`Note: Could not add to pipeline stage: ${response.status}`);
      }
    } catch (error) {
      console.log(`Note: Pipeline assignment skipped: ${error.message}`);
    }
  }

  async getPipelines() {
    try {
      const response = await fetch(`${BASE_URL}/pipelines?locationId=${GHL_LOCATION_ID}`, {
        headers: {
          'Authorization': `Bearer ${GHL_API_KEY}`
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      return data.pipelines || [];
    } catch (error) {
      console.error('❌ Error fetching pipelines:', error.message);
      return [];
    }
  }

  async runImport() {
    console.log('🚀 Starting GHL Import - Pipeline per Niche\n');
    
    // Get all prospects
    const prospects = this.getAllProspects();
    console.log(`📊 Found ${prospects.length} prospects to import\n`);

    this.results.total = prospects.length;

    // Group by niche
    const byNiche = prospects.reduce((acc, p) => {
      const niche = p.category || 'Other';
      if (!acc[niche]) acc[niche] = [];
      acc[niche].push(p);
      return acc;
    }, {});

    // Get existing pipelines
    console.log('🔍 Checking existing pipelines...');
    const existingPipelines = await this.getPipelines();
    const pipelineMap = {};

    // Create or find pipeline for each niche
    for (const [niche, config] of Object.entries(NICHE_PIPELINES)) {
      const existing = existingPipelines.find(p => p.name === config.name);
      
      if (existing) {
        console.log(`✅ Pipeline exists: ${config.name}`);
        pipelineMap[niche] = {
          pipelineId: existing.id,
          stageId: existing.stages?.[0]?.id || null
        };
      } else {
        console.log(`🆕 Creating pipeline: ${config.name}`);
        const newPipeline = await this.createPipeline(config.name);
        if (newPipeline) {
          pipelineMap[niche] = {
            pipelineId: newPipeline.id,
            stageId: newPipeline.stages?.[0]?.id || null
          };
        }
      }
    }

    console.log('\n📥 Importing prospects...\n');

    // Import prospects
    for (const [niche, nicheProspects] of Object.entries(byNiche)) {
      console.log(`\n📂 Niche: ${niche} (${nicheProspects.length} prospects)`);
      
      const pipelineInfo = pipelineMap[niche] || pipelineMap['Other'];
      this.results.byNiche[niche] = { total: nicheProspects.length, imported: 0, failed: 0 };

      for (const prospect of nicheProspects) {
        const contact = await this.importContact(
          prospect,
          pipelineInfo?.pipelineId,
          pipelineInfo?.stageId
        );

        if (contact) {
          this.results.imported++;
          this.results.byNiche[niche].imported++;
          process.stdout.write('✅');
        } else {
          this.results.failed++;
          this.results.byNiche[niche].failed++;
          process.stdout.write('❌');
        }
      }
    }

    console.log('\n\n' + '='.repeat(60));
    console.log('📊 IMPORT SUMMARY');
    console.log('='.repeat(60));
    console.log(`Total Prospects: ${this.results.total}`);
    console.log(`Successfully Imported: ${this.results.imported}`);
    console.log(`Failed: ${this.results.failed}`);
    console.log('\nBy Niche:');
    for (const [niche, stats] of Object.entries(this.results.byNiche)) {
      console.log(`  ${niche}: ${stats.imported}/${stats.total} imported`);
    }
    console.log('='.repeat(60));

    return this.results;
  }
}

// Run import
const importer = new GHLImporter();
importer.runImport().then(results => {
  console.log('\n✅ Import complete!');
  process.exit(0);
}).catch(error => {
  console.error('\n❌ Import failed:', error);
  process.exit(1);
});
