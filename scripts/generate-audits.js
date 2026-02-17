#!/usr/bin/env node
/**
 * Rankingsb Audit Generator
 * Pre-fills audit templates for Sal's leads
 * Usage: node scripts/generate-audits.js [lead-number]
 */

const fs = require('fs');
const path = require('path');

// Lead data from 20-ELECTRICIAN-LEADS.md
const leads = [
  { id: 1, name: "Positively Electrical", city: "Santa Barbara", phone: "(805) 689-3687", priority: "HOT", notes: "Small residential focus, basic website" },
  { id: 2, name: "Anderson and Sons Electric", city: "Santa Barbara", phone: "(805) 967-0147", priority: "HOT", notes: "Family business, local service area" },
  { id: 3, name: "Republic Lighting Services", city: "Santa Barbara", phone: "(805) 682-6688", priority: "WARM", notes: "Been around since 1980, likely outdated online presence" },
  { id: 4, name: "Brady Electric", city: "Santa Barbara", phone: "(805) 682-4444", priority: "WARM", notes: "Serves multiple counties, may need local SEO focus" },
  { id: 5, name: "Blum & Sons Electrical", city: "Santa Barbara", phone: "(805) 682-3688", priority: "COLD", notes: "Commercial focus, may neglect residential SEO" },
  { id: 6, name: "Dunn Electric", city: "Santa Barbara", phone: "(805) 963-1677", priority: "WARM", notes: "Small operation, likely minimal web presence" },
  { id: 7, name: "Sullivan Electric", city: "Santa Barbara", phone: "(805) 689-1676", priority: "WARM", notes: "Local contractor, potential for optimization" },
  { id: 8, name: "Morrison Electric", city: "Santa Barbara", phone: "(805) 569-5656", priority: "WARM", notes: "Established but may lack digital marketing" },
  { id: 9, name: "Cal Coast Electric", city: "Goleta", phone: "(805) 683-3300", priority: "WARM", notes: "Local Goleta business, may not rank for SB searches" },
  { id: 10, name: "Coastal Electric", city: "Goleta", phone: "(805) 964-5818", priority: "HOT", notes: "Small outfit, likely minimal GBP optimization" },
  { id: 11, name: "Goleta Electric", city: "Goleta", phone: "(805) 681-0676", priority: "WARM", notes: "Hyper-local, may not expand reach digitally" },
  { id: 12, name: "Valley Electric", city: "Goleta", phone: "(805) 967-8752", priority: "WARM", notes: "Serves Santa Ynez Valley, may need better local targeting" },
  { id: 13, name: "Carpinteria Electric", city: "Carpinteria", phone: "(805) 684-2777", priority: "HOT", notes: "Small coastal town business, limited SEO" },
  { id: 14, name: "Summerland Electric", city: "Summerland", phone: "(805) 969-5156", priority: "WARM", notes: "Tiny community, likely no marketing focus" },
  { id: 15, name: "Coastal Power Solutions", city: "Carpinteria", phone: "(805) 566-1919", priority: "COLD", notes: "May focus on commercial, neglect residential" },
  { id: 16, name: "Ventura Electric Co.", city: "Ventura", phone: "(805) 644-9292", priority: "HOT", notes: "Older company, likely outdated web presence" },
  { id: 17, name: "Oxnard Electrical Services", city: "Oxnard", phone: "(805) 485-8528", priority: "WARM", notes: "Serving lower-income area, may not invest in SEO" },
  { id: 18, name: "Camarillo Electric", city: "Camarillo", phone: "(805) 482-5555", priority: "WARM", notes: "Suburban market, competition not as fierce" },
  { id: 19, name: "Thousand Oaks Electric", city: "Thousand Oaks", phone: "(805) 497-2222", priority: "WARM", notes: "Affluent area but many competitors" },
  { id: 20, name: "Simi Valley Electric", city: "Simi Valley", phone: "(805) 522-1111", priority: "WARM", notes: "Growing area, opportunity for new ranking" }
];

function generateAudit(lead) {
  const today = new Date().toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  });
  
  const cityLower = lead.city.toLowerCase().replace(/\s+/g, '-');
  const companySlug = lead.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  
  return `══════════════════════════════════════════════════════════════════
                    ${lead.name.toUpperCase()}
               LOCAL SEO AUDIT REPORT
                   Prepared by Rankingsb
══════════════════════════════════════════════════════════════════

AUDIT DATE: ${today}
PREPARED FOR: [CONTACT NAME - FILL IN]
INDUSTRY: Electrical / Electrician
LOCATION: ${lead.city}, CA

══════════════════════════════════════════════════════════════════
📊 YOUR CURRENT STATUS
══════════════════════════════════════════════════════════════════

GOOGLE RANKING for "electrician ${lead.city}":
□ Position #[___] (Page [___])
□ Not in top 50 (check)

GOOGLE MAPS VISIBILITY:
□ Shows up in Maps    □ Not visible (check)

WEBSITE MOBILE SPEED:
□ Fast (<3 sec)       □ Slow (>5 sec) (check at pagespeed.web.dev)

GOOGLE BUSINESS PROFILE:
□ Optimized           □ Needs work (check)

══════════════════════════════════════════════════════════════════
🔍 vs YOUR TOP 3 COMPETITORS
══════════════════════════════════════════════════════════════════

1. [Search "electrician ${lead.city}" - who ranks #1?]
   Position: #1 | Reviews: [___] | Photos: [___]

2. [Who ranks #2?]
   Position: #2 | Reviews: [___] | Photos: [___]

3. [Who ranks #3?]
   Position: #3 | Reviews: [___] | Photos: [___]

${lead.name} Current Position: #[___]

══════════════════════════════════════════════════════════════════
✅ WHAT'S WORKING
══════════════════════════════════════════════════════════════════

☑ [Find something positive - maybe they have a website?]
☑ [Check if they have any reviews]
☑ [Check if they have photos on GBP]

══════════════════════════════════════════════════════════════════
❌ TOP 3 CRITICAL ISSUES
══════════════════════════════════════════════════════════════════

1. Not Ranking in Top 3 for "electrician ${lead.city}"
   Impact: 75% of clicks go to top 3 results. You're missing calls.
   Severity: HIGH

2. ${getIssue2(lead.notes)}
   Impact: ${getImpact2(lead.notes)}
   Severity: HIGH / MEDIUM

3. ${getIssue3(lead.notes)}
   Impact: Competitors show up first when locals search.
   Severity: MEDIUM

══════════════════════════════════════════════════════════════════
⚡ QUICK WINS (Do These Today)
══════════════════════════════════════════════════════════════════

1. Add 5 photos to Google Business Profile
   Time: 5 minutes

2. Update business description with keywords
   Time: 10 minutes

3. Ask 3 customers for Google reviews
   Time: 15 minutes

══════════════════════════════════════════════════════════════════
💰 BUSINESS IMPACT
══════════════════════════════════════════════════════════════════

If ranking improved to top 3:
→ Potential ranking improvement: +5 to +15 positions
→ Estimated additional monthly calls: +5 to +15

At $500 average job value:
→ Potential new monthly revenue: $2,500 - $7,500
→ Potential new annual revenue: $30,000 - $90,000

══════════════════════════════════════════════════════════════════
📞 NEXT STEPS
══════════════════════════════════════════════════════════════════

Questions about this audit?

Sal Vasquez
Direct: 805-724-2788
Email: vasquez.salvador.jr@gmail.com

FREE 15-MINUTE REVIEW:
Schedule: [GHL CALENDAR LINK]

══════════════════════════════════════════════════════════════════
This audit was complimentary. No obligation.
══════════════════════════════════════════════════════════════════


══════════════════════════════════════════════════════════════════
SAL'S INTERNAL NOTES - DO NOT PRINT
══════════════════════════════════════════════════════════════════

PROSPECT INFO:
Name: [FILL IN]
Company: ${lead.name}
Phone: ${lead.phone}
Email: [FILL IN]
Date contacted: ${today}
Source: Lead List - Feb 16 (#${lead.id})
Priority: ${lead.priority}

RESEARCH NOTES:
• ${lead.notes}
• Website: [FILL IN]
• Current SEO status: [None / Basic / Advanced]
• Competitors: [FILL IN]

CALL SCRIPT:
"Hi, this is Sal with Rankingsb. I was researching electricians in 
${lead.city} and came across ${lead.name}. I searched 'electrician 
${lead.city}' and didn't see you in the top results. Are you getting 
enough calls from Google, or are customers going to your competitors?"

FOLLOW-UP PLAN:
□ Send audit via email: [DATE]
□ Schedule review call: [DATE]
□ Check in (if no response): [DATE + 3 days]

COMMISSION TRACKING:
Deal value: $1,995
Commission (50%): $997
Status: [Pending / Closed / Lost]

══════════════════════════════════════════════════════════════════
`;
}

function getIssue2(notes) {
  if (notes.includes('outdated')) return 'Outdated Online Presence';
  if (notes.includes('website')) return 'Basic Website Needs Optimization';
  if (notes.includes('GBP') || notes.includes('Google')) return 'Incomplete Google Business Profile';
  return 'Limited Local SEO Optimization';
}

function getImpact2(notes) {
  if (notes.includes('outdated')) return 'Customers judge by what they find online.';
  if (notes.includes('website')) return 'Website not optimized for local searches.';
  if (notes.includes('GBP') || notes.includes('Google')) return 'Incomplete profiles rank 30% lower.';
  return 'Not showing up when locals search for electricians.';
}

function getIssue3(notes) {
  if (notes.includes('commercial')) return 'Missing Residential Market Focus';
  if (notes.includes('multiple counties')) return 'Local SEO Not Targeted to Specific Cities';
  return 'Few or No Recent Google Reviews';
}

function saveAudit(lead, content) {
  const companySlug = lead.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const filename = `${String(lead.id).padStart(2, '0')}-${companySlug}-audit.txt`;
  const dir = path.join(__dirname, '..', 'business', 'AgencyRankingsb', '03-clients', 'audits');
  
  // Create directory if needed
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  const filepath = path.join(dir, filename);
  fs.writeFileSync(filepath, content, 'utf8');
  return filepath;
}

// Main
console.log('⚡ Rankingsb Audit Generator\n');

const arg = process.argv[2];

if (arg === 'all') {
  console.log('Generating audits for all 20 leads...\n');
  let generated = 0;
  
  // Generate HOT leads first
  const hotLeads = leads.filter(l => l.priority === 'HOT');
  console.log(`🔥 Generating ${hotLeads.length} HOT leads first...`);
  
  for (const lead of hotLeads) {
    const content = generateAudit(lead);
    const filepath = saveAudit(lead, content);
    console.log(`  ✓ #${lead.id} ${lead.name} (${lead.priority})`);
    generated++;
  }
  
  // Then WARM and COLD
  const otherLeads = leads.filter(l => l.priority !== 'HOT');
  console.log(`\n📝 Generating ${otherLeads.length} remaining leads...`);
  
  for (const lead of otherLeads) {
    const content = generateAudit(lead);
    const filepath = saveAudit(lead, content);
    console.log(`  ✓ #${lead.id} ${lead.name} (${lead.priority})`);
    generated++;
  }
  
  const dir = path.join(__dirname, '..', 'business', 'AgencyRankingsb', '03-clients', 'audits');
  console.log(`\n✅ Generated ${generated} audit templates`);
  console.log(`📁 Saved to: ${dir}`);
  console.log(`\n🎯 HOT leads to call first:`);
  hotLeads.forEach(l => console.log(`   ${l.id}. ${l.name} - ${l.phone}`));
  
} else if (arg) {
  const leadNum = parseInt(arg);
  const lead = leads.find(l => l.id === leadNum);
  
  if (!lead) {
    console.log(`❌ Lead #${arg} not found. Use 1-20.`);
    process.exit(1);
  }
  
  const content = generateAudit(lead);
  const filepath = saveAudit(lead, content);
  
  console.log(`✅ Generated audit for #${lead.id} ${lead.name}`);
  console.log(`📁 Saved to: ${filepath}`);
  console.log(`\n🔍 Lead Info:`);
  console.log(`   Phone: ${lead.phone}`);
  console.log(`   City: ${lead.city}`);
  console.log(`   Priority: ${lead.priority}`);
  console.log(`   Notes: ${lead.notes}`);
  
} else {
  console.log('Usage:');
  console.log('  node scripts/generate-audits.js all       # Generate all 20 audits');
  console.log('  node scripts/generate-audits.js 1         # Generate audit for lead #1');
  console.log('  node scripts/generate-audits.js 5         # Generate audit for lead #5');
  console.log('\nQuick reference - HOT leads (call first):');
  leads.filter(l => l.priority === 'HOT').forEach(l => {
    console.log(`  ${l.id}. ${l.name} (${l.city}) - ${l.phone}`);
  });
}
