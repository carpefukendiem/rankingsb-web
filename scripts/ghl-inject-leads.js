#!/usr/bin/env node
/**
 * GHL Lead Injector
 * Pushes 20 electrician leads into GoHighLevel pipeline
 * 
 * Usage: node scripts/ghl-inject-leads.js <ghl-api-key> <location-id>
 */

const https = require('https');

// Lead data from 20-ELECTRICIAN-LEADS.md
const leads = [
  { id: 1, firstName: "", lastName: "", company: "Positively Electrical", city: "Santa Barbara", phone: "+18056893687", email: "", priority: "HOT", tags: ["Lead - New", "Electrical", "Santa Barbara", "HOT", "Audit Ready"], notes: "Small residential focus, basic website" },
  { id: 2, firstName: "", lastName: "", company: "Anderson and Sons Electric", city: "Santa Barbara", phone: "+18059670147", email: "", priority: "HOT", tags: ["Lead - New", "Electrical", "Santa Barbara", "HOT", "Audit Ready"], notes: "Family business, local service area" },
  { id: 3, firstName: "", lastName: "", company: "Republic Lighting Services", city: "Santa Barbara", phone: "+18056826688", email: "", priority: "WARM", tags: ["Lead - New", "Electrical", "Santa Barbara", "WARM", "Audit Ready"], notes: "Been around since 1980, likely outdated online presence" },
  { id: 4, firstName: "", lastName: "", company: "Brady Electric", city: "Santa Barbara", phone: "+18056824444", email: "", priority: "WARM", tags: ["Lead - New", "Electrical", "Santa Barbara", "WARM", "Audit Ready"], notes: "Serves multiple counties, may need local SEO focus" },
  { id: 5, firstName: "", lastName: "", company: "Blum & Sons Electrical", city: "Santa Barbara", phone: "+18056823688", email: "", priority: "COLD", tags: ["Lead - New", "Electrical", "Santa Barbara", "COLD", "Audit Ready"], notes: "Commercial focus, may neglect residential SEO" },
  { id: 6, firstName: "", lastName: "", company: "Dunn Electric", city: "Santa Barbara", phone: "+18059631677", email: "", priority: "WARM", tags: ["Lead - New", "Electrical", "Santa Barbara", "WARM", "Audit Ready"], notes: "Small operation, likely minimal web presence" },
  { id: 7, firstName: "", lastName: "", company: "Sullivan Electric", city: "Santa Barbara", phone: "+18056891676", email: "", priority: "WARM", tags: ["Lead - New", "Electrical", "Santa Barbara", "WARM", "Audit Ready"], notes: "Local contractor, potential for optimization" },
  { id: 8, firstName: "", lastName: "", company: "Morrison Electric", city: "Santa Barbara", phone: "+18055695656", email: "", priority: "WARM", tags: ["Lead - New", "Electrical", "Santa Barbara", "WARM", "Audit Ready"], notes: "Established but may lack digital marketing" },
  { id: 9, firstName: "", lastName: "", company: "Cal Coast Electric", city: "Goleta", phone: "+18056833300", email: "", priority: "WARM", tags: ["Lead - New", "Electrical", "Goleta", "WARM", "Audit Ready"], notes: "Local Goleta business, may not rank for SB searches" },
  { id: 10, firstName: "", lastName: "", company: "Coastal Electric", city: "Goleta", phone: "+18059645818", email: "", priority: "HOT", tags: ["Lead - New", "Electrical", "Goleta", "HOT", "Audit Ready"], notes: "Small outfit, likely minimal GBP optimization" },
  { id: 11, firstName: "", lastName: "", company: "Goleta Electric", city: "Goleta", phone: "+18056810676", email: "", priority: "WARM", tags: ["Lead - New", "Electrical", "Goleta", "WARM", "Audit Ready"], notes: "Hyper-local, may not expand reach digitally" },
  { id: 12, firstName: "", lastName: "", company: "Valley Electric", city: "Goleta", phone: "+18059678752", email: "", priority: "WARM", tags: ["Lead - New", "Electrical", "Goleta", "WARM", "Audit Ready"], notes: "Serves Santa Ynez Valley, may need better local targeting" },
  { id: 13, firstName: "", lastName: "", company: "Carpinteria Electric", city: "Carpinteria", phone: "+18056842777", email: "", priority: "HOT", tags: ["Lead - New", "Electrical", "Carpinteria", "HOT", "Audit Ready"], notes: "Small coastal town business, limited SEO" },
  { id: 14, firstName: "", lastName: "", company: "Summerland Electric", city: "Summerland", phone: "+18059695156", email: "", priority: "WARM", tags: ["Lead - New", "Electrical", "Summerland", "WARM", "Audit Ready"], notes: "Tiny community, likely no marketing focus" },
  { id: 15, firstName: "", lastName: "", company: "Coastal Power Solutions", city: "Carpinteria", phone: "+18055661919", email: "", priority: "COLD", tags: ["Lead - New", "Electrical", "Carpinteria", "COLD", "Audit Ready"], notes: "May focus on commercial, neglect residential" },
  { id: 16, firstName: "", lastName: "", company: "Ventura Electric Co.", city: "Ventura", phone: "+18056449292", email: "", priority: "HOT", tags: ["Lead - New", "Electrical", "Ventura", "HOT", "Audit Ready"], notes: "Older company, likely outdated web presence" },
  { id: 17, firstName: "", lastName: "", company: "Oxnard Electrical Services", city: "Oxnard", phone: "+18054858528", email: "", priority: "WARM", tags: ["Lead - New", "Electrical", "Oxnard", "WARM", "Audit Ready"], notes: "Serving lower-income area, may not invest in SEO" },
  { id: 18, firstName: "", lastName: "", company: "Camarillo Electric", city: "Camarillo", phone: "+18054825555", email: "", priority: "WARM", tags: ["Lead - New", "Electrical", "Camarillo", "WARM", "Audit Ready"], notes: "Suburban market, competition not as fierce" },
  { id: 19, firstName: "", lastName: "", company: "Thousand Oaks Electric", city: "Thousand Oaks", phone: "+18054972222", email: "", priority: "WARM", tags: ["Lead - New", "Electrical", "Thousand Oaks", "WARM", "Audit Ready"], notes: "Affluent area but many competitors" },
  { id: 20, firstName: "", lastName: "", company: "Simi Valley Electric", city: "Simi Valley", phone: "+18055221111", email: "", priority: "WARM", tags: ["Lead - New", "Electrical", "Simi Valley", "WARM", "Audit Ready"], notes: "Growing area, opportunity for new ranking" }
];

class GHLClient {
  constructor(apiKey, locationId) {
    this.apiKey = apiKey;
    this.locationId = locationId;
    this.baseUrl = 'services.leadconnectorhq.com';
  }

  async request(method, path, data = null) {
    return new Promise((resolve, reject) => {
      const options = {
        hostname: this.baseUrl,
        port: 443,
        path: path,
        method: method,
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
          'Version': '2021-07-28'
        }
      };

      const req = https.request(options, (res) => {
        let responseData = '';
        res.on('data', (chunk) => responseData += chunk);
        res.on('end', () => {
          try {
            const parsed = JSON.parse(responseData);
            if (res.statusCode >= 200 && res.statusCode < 300) {
              resolve(parsed);
            } else {
              reject(new Error(`HTTP ${res.statusCode}: ${parsed.message || responseData}`));
            }
          } catch (e) {
            resolve(responseData);
          }
        });
      });

      req.on('error', reject);
      if (data) req.write(JSON.stringify(data));
      req.end();
    });
  }

  async createContact(lead) {
    const contactData = {
      locationId: this.locationId,
      firstName: lead.firstName || lead.company.split(' ')[0],
      lastName: lead.lastName || "Contact",
      name: lead.company,
      email: lead.email || `lead${lead.id}@placeholder.com`,
      phone: lead.phone,
      companyName: lead.company,
      tags: lead.tags,
      customFields: [
        { id: "city", field_value: lead.city },
        { id: "priority", field_value: lead.priority },
        { id: "lead_notes", field_value: lead.notes },
        { id: "lead_source", field_value: "Audit Generator - Feb 17" }
      ],
      source: "Audit Generator Script"
    };

    return this.request('POST', '/contacts/', contactData);
  }

  async createOpportunity(contactId, lead) {
    const oppData = {
      locationId: this.locationId,
      name: `${lead.company} - SEO Audit Opportunity`,
      status: "open",
      stageId: "lead", // Will use default "Lead" stage
      contactId: contactId,
      monetaryValue: 1995,
      customFields: [
        { id: "city", field_value: lead.city },
        { id: "priority", field_value: lead.priority }
      ]
    };

    return this.request('POST', '/opportunities/', oppData);
  }
}

async function main() {
  const apiKey = process.argv[2];
  const locationId = process.argv[3];

  if (!apiKey || !locationId) {
    console.log('⚡ GHL Lead Injector\n');
    console.log('Usage: node scripts/ghl-inject-leads.js <api-key> <location-id>');
    console.log('\nExample:');
    console.log('  node scripts/ghl-inject-leads.js eyJhbG... 1234567890');
    console.log('\nTo get your credentials:');
    console.log('  1. Go to app.rankingsb.com → Settings → Company → API');
    console.log('  2. Copy API Key and Location ID');
    process.exit(1);
  }

  console.log('⚡ GHL Lead Injector');
  console.log(`Location: ${locationId}`);
  console.log(`Leads to inject: ${leads.length}\n`);

  const ghl = new GHLClient(apiKey, locationId);
  
  const results = {
    created: [],
    failed: []
  };

  // Process HOT leads first
  const hotLeads = leads.filter(l => l.priority === 'HOT');
  const otherLeads = leads.filter(l => l.priority !== 'HOT');
  const orderedLeads = [...hotLeads, ...otherLeads];

  console.log(`🔥 Injecting ${hotLeads.length} HOT leads first...\n`);

  for (let i = 0; i < orderedLeads.length; i++) {
    const lead = orderedLeads[i];
    const num = i + 1;
    
    process.stdout.write(`  [${num}/${orderedLeads.length}] ${lead.company} (${lead.priority})... `);
    
    try {
      // Create contact
      const contact = await ghl.createContact(lead);
      
      // Create opportunity (if contact succeeded)
      if (contact && contact.contact && contact.contact.id) {
        try {
          await ghl.createOpportunity(contact.contact.id, lead);
          process.stdout.write(`✓ Contact + Opportunity\n`);
          results.created.push({ ...lead, contactId: contact.contact.id });
        } catch (oppErr) {
          process.stdout.write(`⚠ Contact only (opp failed: ${oppErr.message})\n`);
          results.created.push({ ...lead, contactId: contact.contact.id, warning: oppErr.message });
        }
      } else {
        process.stdout.write(`⚠ Contact created (no ID returned)\n`);
        results.created.push(lead);
      }
      
      // Small delay to avoid rate limits
      await new Promise(r => setTimeout(r, 500));
      
    } catch (err) {
      process.stdout.write(`✗ ${err.message}\n`);
      results.failed.push({ ...lead, error: err.message });
    }
  }

  console.log(`\n✅ Injection Complete`);
  console.log(`   Created: ${results.created.length}/${leads.length}`);
  console.log(`   Failed:  ${results.failed.length}/${leads.length}`);
  
  if (results.failed.length > 0) {
    console.log(`\n❌ Failed leads:`);
    results.failed.forEach(l => console.log(`   - ${l.company}: ${l.error}`));
  }

  // Summary for HOT leads
  console.log(`\n🔥 HOT Leads Created:`);
  results.created.filter(l => l.priority === 'HOT').forEach(l => {
    console.log(`   ✓ ${l.company} - ${l.phone}`);
  });

  console.log(`\n📞 Sal's first 5 calls are ready in GHL!`);
  console.log(`   Tell Sal to check his Opportunities pipeline.`);
}

main().catch(err => {
  console.error('Fatal error:', err.message);
  process.exit(1);
});
