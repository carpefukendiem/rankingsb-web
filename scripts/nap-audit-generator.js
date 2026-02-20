#!/usr/bin/env node
/**
 * NAP-Focused Prospecting Audit Generator
 * 
 * This script creates comprehensive audits for local business leads
 * with heavy emphasis on NAP (Name, Address, Phone) consistency
 * and citation analysis.
 * 
 * Usage:
 *   node scripts/nap-audit-generator.js <business-type> <location> [count]
 *   
 * Example:
 *   node scripts/nap-audit-generator.js "electrician" "Santa Barbara, CA" 20
 *   node scripts/nap-audit-generator.js "plumber" "Ventura, CA" 15
 */

import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// NAP Audit Template
const generateNAPAudit = (business) => {
  const auditId = `${business.type}-${business.location.replace(/[^a-zA-Z0-9]/g, '-')}-${Date.now()}`;
  
  return {
    id: auditId,
    business: business,
    generatedAt: new Date().toISOString(),
    
    // NAP Analysis Section (CRITICAL)
    napAnalysis: {
      summary: "[TO RESEARCH]",
      businessName: {
        website: "[EXTRACT FROM SITE]",
        gbp: "[CHECK GOOGLE BUSINESS PROFILE]",
        yelp: "[CHECK YELP]",
        bing: "[CHECK BING PLACES]",
        consistency: "[PASS/FAIL - Must be 100% identical]",
        issues: []
      },
      address: {
        website: "[EXACT ADDRESS FROM SITE]",
        gbp: "[GBP ADDRESS]",
        yelp: "[YELP ADDRESS]",
        bing: "[BING ADDRESS]",
        format: "[STANDARDIZED FORMAT]",
        consistency: "[PASS/FAIL]",
        issues: [],
        notes: "Check for: Suite numbers, abbreviations (St vs Street), ZIP+4"
      },
      phone: {
        website: "[PHONE FROM SITE]",
        gbp: "[GBP PHONE]",
        yelp: "[YELP PHONE]",
        bing: "[BING PHONE]",
        format: "[(XXX) XXX-XXXX]",
        consistency: "[PASS/FAIL]",
        clickToCall: "[CHECK IF CLICKABLE ON MOBILE]",
        issues: []
      },
      score: "[CALCULATE: 33% each for N, A, P - All must match exactly]",
      critical: "[YES/NO - If NO, this is Priority 1 fix]"
    },

    // Citation Analysis
    citations: {
      found: [],
      missing: [],
      inconsistent: [],
      score: 0,
      priorityDirectories: [
        { name: "Google Business Profile", found: false, url: "", napMatch: false },
        { name: "Yelp", found: false, url: "", napMatch: false },
        { name: "Bing Places", found: false, url: "", napMatch: false },
        { name: "Apple Business Connect", found: false, url: "", napMatch: false },
        { name: "Facebook Business", found: false, url: "", napMatch: false },
        { name: "BBB", found: false, url: "", napMatch: false },
        { name: "Angi", found: false, url: "", napMatch: false },
        { name: "HomeAdvisor", found: false, url: "", napMatch: false },
        { name: "Thumbtack", found: false, url: "", napMatch: false },
        { name: "Chamber of Commerce", found: false, url: "", napMatch: false }
      ]
    },

    // Website Audit
    website: {
      url: business.website || "[RESEARCH]",
      hasNAPOnHomepage: "[CHECK - Must be visible, not buried]",
      hasNAPOnContact: "[CHECK]",
      hasNAPInFooter: "[CHECK - Every page]",
      hasSchema: "[CHECK SOURCE FOR SCHEMA.ORG]",
      mobileFriendly: "[TEST ON MOBILE]",
      loadSpeed: "[TEST ON PAGESPEED]",
      ssl: "[CHECK HTTPS]",
      issues: []
    },

    // Google Business Profile Deep Dive
    gbp: {
      found: "[YES/NO]",
      url: "",
      categories: [],
      photos: { count: 0, quality: "[GOOD/FAIR/POOR]" },
      posts: { lastPost: "[DATE]", frequency: "[ACTIVE/INACTIVE]" },
      reviews: { count: 0, rating: 0, responseRate: "[CHECK IF RESPONDING]" },
      qanda: { count: 0, answered: 0 },
      services: [],
      attributes: [],
      issues: [],
      opportunities: []
    },

    // Competitor Gap Analysis
    competitors: {
      top3: [
        { name: "[COMPETITOR 1]", gbpReviews: 0, citations: 0, strengths: [] },
        { name: "[COMPETITOR 2]", gbpReviews: 0, citations: 0, strengths: [] },
        { name: "[COMPETITOR 3]", gbpReviews: 0, citations: 0, strengths: [] }
      ],
      gaps: []
    },

    // Research Checklist
    researchTasks: [
      "[ ] Search Google: business name + city",
      "[ ] Search Google: business phone number",
      "[ ] Search Google: business address",
      "[ ] Check Google Business Profile",
      "[ ] Check Yelp listing",
      "[ ] Check Bing Places",
      "[ ] Check Facebook Business Page",
      "[ ] Check BBB listing",
      "[ ] Check Angi/HomeAdvisor",
      "[ ] Run site: search for citations",
      "[ ] Check website NAP placement",
      "[ ] Verify schema markup",
      "[ ] Test click-to-call on mobile",
      "[ ] Check 3 top competitors",
      "[ ] Document all NAP variations found"
    ],

    // Sales Intelligence
    salesIntel: {
      painPoints: [],
      opportunities: [],
      estimatedValue: "[CALCULATE BASED ON NAP SCORE]",
      urgency: "[HIGH/MEDIUM/LOW]",
      pitchAngle: "[CRAFT BASED ON FINDINGS]",
      objectionPrep: []
    },

    // Action Items for Prospect
    actionItems: {
      critical: [],
      high: [],
      medium: [],
      low: []
    }
  };
};

// Generate leads for a specific industry/location
const generateLeads = (type, location, count = 20) => {
  const leads = [];
  
  // Research methods documented
  const researchMethods = `
HOW TO FIND THESE LEADS:
1. Google Maps: Search "${type} near ${location}" - extract top 20
2. Yelp: Search "${type} ${location}" - filter by rating/reviews
3. Angi/HomeAdvisor: Search by location and service type
4. Local Chamber of Commerce directory
5. Industry associations (e.g., NECA for electricians)
6. Facebook Business search
7. Nextdoor recommendations
8. Local newspaper business listings
9. Trade show exhibitor lists
10. Competitor client lists (check testimonials on competitor sites)

DATA TO COLLECT FOR EACH LEAD:
- Business Name (exact)
- Address (full, with suite/unit)
- Phone (main line)
- Website URL
- Google Business Profile URL
- Yelp URL
- Years in business
- Services offered
- Approximate review count
- Social media profiles
`;

  for (let i = 1; i <= count; i++) {
    leads.push({
      id: i,
      type: type,
      location: location,
      businessName: `[RESEARCH: ${type} business #${i} in ${location}]`,
      address: "[RESEARCH]",
      phone: "[RESEARCH]",
      website: "[RESEARCH]",
      gbpUrl: "[RESEARCH]",
      yelpUrl: "[RESEARCH]",
      notes: "",
      priority: i <= 5 ? "HOT" : i <= 10 ? "WARM" : "STANDARD"
    });
  }
  
  return { leads, researchMethods };
};

// Main execution
const main = () => {
  const args = process.argv.slice(2);
  
  if (args.length < 2) {
    console.log(`
NAP-Focused Prospecting Audit Generator

Usage:
  node scripts/nap-audit-generator.js <business-type> <location> [count]
  
Examples:
  node scripts/nap-audit-generator.js "electrician" "Santa Barbara, CA" 20
  node scripts/nap-audit-generator.js "plumber" "Ventura, CA" 15
  node scripts/nap-audit-generator.js "HVAC" "San Luis Obispo, CA" 10
  
The output will be a structured audit template for each lead,
heavily focused on NAP consistency analysis.
    `);
    process.exit(1);
  }
  
  const [businessType, location, countArg] = args;
  const count = parseInt(countArg) || 20;
  
  const outputDir = join(__dirname, '..', 'business', 'AgencyRankingsb', '03-clients', 'nap-audits', `${businessType}-${location.replace(/[^a-zA-Z0-9]/g, '-')}`);
  
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }
  
  // Generate leads list
  const { leads, researchMethods } = generateLeads(businessType, location, count);
  
  // Generate audit template for each lead
  const audits = leads.map(lead => generateNAPAudit(lead));
  
  // Create master file
  const masterContent = `# NAP-Focused Prospecting Campaign
**Business Type:** ${businessType}  
**Location:** ${location}  
**Generated:** ${new Date().toLocaleDateString()}  
**Total Leads:** ${count}

---

## 🔥 PRIORITY LEADS

${leads.filter(l => l.priority === 'HOT').map(l => `- **${l.id}.** ${l.businessName}`).join('\n')}

## 📋 RESEARCH METHODS

${researchMethods}

## 🎯 NAP AUDIT CHECKLIST

For each lead, verify:

### 1. Business Name Consistency
- [ ] Exact same spelling on website
- [ ] Exact same spelling on GBP
- [ ] Exact same spelling on Yelp
- [ ] Exact same spelling on all directories
- [ ] No variations (LLC, Inc, & vs and, etc.)

### 2. Address Consistency  
- [ ] Street number matches everywhere
- [ ] Street name identical (St vs Street)
- [ ] Suite/unit number present everywhere or nowhere
- [ ] City spelled identically
- [ ] State format identical (CA vs California)
- [ ] ZIP code identical (5-digit vs ZIP+4)

### 3. Phone Consistency
- [ ] Same number on all platforms
- [ ] Format: (805) 555-0123 (standard)
- [ ] Click-to-call enabled on mobile website
- [ ] No tracking numbers causing inconsistency

### 4. Citation Audit
- [ ] Google Business Profile claimed
- [ ] Yelp claimed and optimized
- [ ] Bing Places listed
- [ ] Apple Business Connect
- [ ] Facebook Business
- [ ] BBB (if applicable)
- [ ] Industry directories (Angi, HomeAdvisor, etc.)
- [ ] Local citations (Chamber, etc.)

### 5. Schema Markup Check
- [ ] LocalBusiness schema present
- [ ] NAP in schema matches visible NAP
- [ ] Address format in schema correct

---

## 📁 AUDIT FILES

${audits.map(a => `- [${a.id}.md](./${a.id}.md)`).join('\n')}

---

## 📊 SCORING SYSTEM

**NAP Score (0-100):**
- 100: Perfect NAP everywhere
- 80-99: Minor inconsistencies (abbreviations, formatting)
- 60-79: Moderate issues (missing from some platforms)
- 40-59: Major inconsistencies (different info on different sites)
- 0-39: Critical issues (wrong NAP, unclaimed listings, missing everywhere)

**Priority Matrix:**
- **HOT (1-5):** Score <60 (major NAP issues = easy sale)
- **WARM (6-10):** Score 60-79 (moderate issues)
- **STANDARD (11+):** Score 80+ (harder sale, focus on other angles)

---

## 💰 PRICING GUIDE

Based on NAP Score:
- Score 0-39: $997 setup (urgent fixes needed)
- Score 40-59: $797 setup (significant cleanup)
- Score 60-79: $597 setup (moderate optimization)
- Score 80-99: $397 setup (maintenance/optimization)
- Score 100: $297/month only (monitoring)

Monthly: $297 for all tiers (monitoring + ongoing citations)

---

## 🎯 SALES ANGLES BY NAP ISSUE

### If Business Name Inconsistent:
"I noticed your business appears differently across Google, Yelp, and your website. This confuses customers AND Google. Let's fix that."

### If Address Inconsistent:
"Your address shows 3 different variations online. Google doesn't know which is correct, so they're not showing you in local searches. This is costing you calls."

### If Phone Inconsistent:
"I found 2 different phone numbers for your business. Customers might be calling the wrong number, and Google penalizes inconsistent NAP."

### If Missing from GBP:
"You're not on Google Business Profile? That's like not existing for local customers. 46% of searches are local - you're invisible to them."

### If Missing Citations:
"You're only on 2 directories. Your competitors are on 20+. Every missing citation is a missed opportunity to rank higher."

---

*Campaign generated by NAP Audit Generator*  
*Focus: Name, Address, Phone consistency = Local SEO foundation*
`;

  writeFileSync(join(outputDir, 'CAMPAIGN-OVERVIEW.md'), masterContent);
  
  // Write individual audit files
  audits.forEach(audit => {
    const content = `# NAP Audit: ${audit.business.businessName}
**ID:** ${audit.id}  
**Type:** ${audit.business.type}  
**Location:** ${audit.business.location}  
**Priority:** ${audit.business.priority}  
**Generated:** ${new Date(audit.generatedAt).toLocaleDateString()}

---

## 🚨 NAP ANALYSIS (CRITICAL)

**Overall NAP Score:** ${audit.napAnalysis.score}/100  
**Critical Issues:** ${audit.napAnalysis.critical}

### Business Name
| Platform | Value | Status |
|----------|-------|--------|
| Website | ${audit.napAnalysis.businessName.website} | ${audit.napAnalysis.businessName.consistency} |
| Google Business | ${audit.napAnalysis.businessName.gbp} | ${audit.napAnalysis.businessName.consistency} |
| Yelp | ${audit.napAnalysis.businessName.yelp} | ${audit.napAnalysis.businessName.consistency} |
| Bing Places | ${audit.napAnalysis.businessName.bing} | ${audit.napAnalysis.businessName.consistency} |

**Issues Found:**
${audit.napAnalysis.businessName.issues.length > 0 ? audit.napAnalysis.businessName.issues.map(i => `- ${i}`).join('\n') : '- [ ] No issues found / TO RESEARCH'}

### Address
| Platform | Value | Status |
|----------|-------|--------|
| Website | ${audit.napAnalysis.address.website} | ${audit.napAnalysis.address.consistency} |
| Google Business | ${audit.napAnalysis.address.gbp} | ${audit.napAnalysis.address.consistency} |
| Yelp | ${audit.napAnalysis.address.yelp} | ${audit.napAnalysis.address.consistency} |
| Bing Places | ${audit.napAnalysis.address.bing} | ${audit.napAnalysis.address.consistency} |

**Standardized Format:** ${audit.napAnalysis.address.format}

**Issues Found:**
${audit.napAnalysis.address.issues.length > 0 ? audit.napAnalysis.address.issues.map(i => `- ${i}`).join('\n') : '- [ ] No issues found / TO RESEARCH'}

**Notes:** ${audit.napAnalysis.address.notes}

### Phone Number
| Platform | Value | Status |
|----------|-------|--------|
| Website | ${audit.napAnalysis.phone.website} | ${audit.napAnalysis.phone.consistency} |
| Google Business | ${audit.napAnalysis.phone.gbp} | ${audit.napAnalysis.phone.consistency} |
| Yelp | ${audit.napAnalysis.phone.yelp} | ${audit.napAnalysis.phone.consistency} |
| Bing Places | ${audit.napAnalysis.phone.bing} | ${audit.napAnalysis.phone.consistency} |

**Standardized Format:** ${audit.napAnalysis.phone.format}  
**Click-to-Call on Mobile:** ${audit.napAnalysis.phone.clickToCall}

**Issues Found:**
${audit.napAnalysis.phone.issues.length > 0 ? audit.napAnalysis.phone.issues.map(i => `- ${i}`).join('\n') : '- [ ] No issues found / TO RESEARCH'}

---

## 📍 CITATION ANALYSIS

**Citation Score:** ${audit.citations.score}/100

### Priority Directories Status
${audit.citations.priorityDirectories.map(d => `- [${d.found ? 'x' : ' '}] ${d.name}: ${d.found ? d.url : 'NOT FOUND'} ${d.napMatch ? '(NAP matches)' : '(NAP check needed)'}`).join('\n')}

### Found Citations
${audit.citations.found.length > 0 ? audit.citations.found.map(c => `- ${c}`).join('\n') : '- [ ] None found yet / TO RESEARCH'}

### Missing High-Value Citations
${audit.citations.missing.length > 0 ? audit.citations.missing.map(c => `- ${c}`).join('\n') : '- [ ] Analysis pending'}

### Inconsistent Citations (Wrong NAP)
${audit.citations.inconsistent.length > 0 ? audit.citations.inconsistent.map(c => `- ${c}`).join('\n') : '- [ ] None found yet / TO RESEARCH'}

---

## 🌐 WEBSITE ANALYSIS

**URL:** ${audit.website.url}

### NAP Placement
- [${audit.website.hasNAPOnHomepage === 'YES' ? 'x' : ' '}] NAP on homepage (visible, not buried)
- [${audit.website.hasNAPOnContact === 'YES' ? 'x' : ' '}] NAP on contact page
- [${audit.website.hasNAPInFooter === 'YES' ? 'x' : ' '}] NAP in footer (every page)

### Technical
- [${audit.website.hasSchema === 'YES' ? 'x' : ' '}] Schema.org markup present
- [${audit.website.mobileFriendly === 'YES' ? 'x' : ' '}] Mobile-friendly
- [${audit.website.ssl === 'YES' ? 'x' : ' '}] SSL/HTTPS enabled
- [ ] Page speed: ${audit.website.loadSpeed}

### Issues
${audit.website.issues.length > 0 ? audit.website.issues.map(i => `- ${i}`).join('\n') : '- [ ] Analysis pending'}

---

## 📊 GOOGLE BUSINESS PROFILE

**Found:** ${audit.gbp.found}  
**URL:** ${audit.gbp.url}

### Profile Health
- **Categories:** ${audit.gbp.categories.join(', ') || '[TO RESEARCH]'}
- **Photos:** ${audit.gbp.photos.count} (${audit.gbp.photos.quality} quality)
- **Posts:** Last post ${audit.gbp.posts.lastPost} (${audit.gbp.posts.frequency})
- **Reviews:** ${audit.gbp.reviews.count} reviews, ${audit.gbp.reviews.rating}★ avg
- **Review Response Rate:** ${audit.gbp.reviews.responseRate}
- **Q&A:** ${audit.gbp.qanda.count} questions, ${audit.gbp.qanda.answered} answered
- **Services Listed:** ${audit.gbp.services.join(', ') || '[TO RESEARCH]'}

### Issues
${audit.gbp.issues.length > 0 ? audit.gbp.issues.map(i => `- ${i}`).join('\n') : '- [ ] Analysis pending'}

### Opportunities
${audit.gbp.opportunities.length > 0 ? audit.gbp.opportunities.map(o => `- ${o}`).join('\n') : '- [ ] Analysis pending'}

---

## 🏆 COMPETITOR ANALYSIS

### Top 3 Competitors
${audit.competitors.top3.map((c, i) => `${i + 1}. **${c.name}**
   - GBP Reviews: ${c.gbpReviews}
   - Citations: ${c.citations}
   - Strengths: ${c.strengths.join(', ') || '[RESEARCH]'}`).join('\n')}

### Gaps to Exploit
${audit.competitors.gaps.length > 0 ? audit.competitors.gaps.map(g => `- ${g}`).join('\n') : '- [ ] Analysis pending'}

---

## ✅ RESEARCH CHECKLIST

${audit.researchTasks.map(t => t).join('\n')}

---

## 💡 SALES INTELLIGENCE

### Pain Points Identified
${audit.salesIntel.painPoints.length > 0 ? audit.salesIntel.painPoints.map(p => `- ${p}`).join('\n') : '- [ ] Research needed'}

### Opportunities
${audit.salesIntel.opportunities.length > 0 ? audit.salesIntel.opportunities.map(o => `- ${o}`).join('\n') : '- [ ] Research needed'}

### Estimated Value
${audit.salesIntel.estimatedValue}

### Urgency
${audit.salesIntel.urgency}

### Recommended Pitch Angle
${audit.salesIntel.pitchAngle}

### Objection Preparation
${audit.salesIntel.objectionPrep.length > 0 ? audit.salesIntel.objectionPrep.map(o => `- ${o}`).join('\n') : '- [ ] Research needed'}

---

## 🎯 ACTION ITEMS FOR PROSPECT

### Critical (Do This Week)
${audit.actionItems.critical.length > 0 ? audit.actionItems.critical.map(i => `- [ ] ${i}`).join('\n') : '- [ ] Audit completion needed'}

### High Priority (This Month)
${audit.actionItems.high.length > 0 ? audit.actionItems.high.map(i => `- [ ] ${i}`).join('\n') : '- [ ] Audit completion needed'}

### Medium Priority (Next 60 Days)
${audit.actionItems.medium.length > 0 ? audit.actionItems.medium.map(i => `- [ ] ${i}`).join('\n') : '- [ ] Audit completion needed'}

### Low Priority (Ongoing)
${audit.actionItems.low.length > 0 ? audit.actionItems.low.map(i => `- [ ] ${i}`).join('\n') : '- [ ] Audit completion needed'}

---

## 💰 RECOMMENDED PRICING

**Based on NAP Score:** [CALCULATE AFTER RESEARCH]

| Package | Setup | Monthly | Includes |
|---------|-------|---------|----------|
| Emergency NAP Fix | $997 | $297 | NAP standardization, GBP claim/fix, 10 citations |
| Local Foundation | $797 | $297 | NAP audit, GBP optimization, 15 citations, monitoring |
| Authority Builder | $597 | $297 | NAP verification, GBP + 20 citations, review system |
| Maintenance | $297 | $297 | Monitoring, updates, ongoing citations |

---

## 📝 CALL SCRIPT EXCERPTS

### Opening (NAP Issue Angle)
"Hi [Name], this is [Your Name] from Rankingsb. I was doing some research on [business type] in [location] and noticed something concerning about your online listings. Do you have 90 seconds?"

### Value Prop
"I found that your business information appears differently across Google, Yelp, and your website. This is confusing customers and hurting your Google rankings. We fix this—standardize your NAP across 20+ directories so you show up when people search '[service] near me.'"

### Close
"I'd like to run a full audit and show you exactly where the inconsistencies are. Takes 15 minutes. When's better—tomorrow at 2 or Thursday at 10?"

---

*Audit generated: ${new Date().toLocaleString()}*  
*Auditor: Johnny 5 / Rankingsb*  
*Next update: After research completion*
`;
    
    writeFileSync(join(outputDir, `${audit.id}.md`), content);
  });
  
  // Generate summary report
  const summaryContent = `# NAP Campaign Summary: ${businessType} in ${location}
**Generated:** ${new Date().toLocaleString()}

## 📊 Campaign Overview
- **Total Leads:** ${count}
- **HOT Leads (Priority 1-5):** 5
- **WARM Leads (Priority 6-10):** 5  
- **STANDARD Leads (Priority 11+):** ${count - 10}

## 📁 Files Generated
- Campaign overview: CAMPAIGN-OVERVIEW.md
- Individual audits: ${count} files (${audits.map(a => a.id + '.md').join(', ')})

## 🚀 Next Steps
1. Research each lead (use checklist in individual audits)
2. Prioritize by NAP issues found (lower score = higher priority)
3. Schedule calls with HOT leads first
4. Track results in CRM

## 💰 Revenue Potential
- If 20% close at $997 setup: $${Math.round(count * 0.2 * 997)}
- Monthly recurring at $297 × 20%: $${Math.round(count * 0.2 * 297)}/month
- Commission at 50%: $${Math.round(count * 0.2 * 997 * 0.5)} upfront + $${Math.round(count * 0.2 * 297 * 0.5)}/month

---

*Ready for Sal to start calling*
`;
  
  writeFileSync(join(outputDir, 'SUMMARY.md'), summaryContent);
  
  console.log(`✅ NAP Audit Campaign Generated`);
  console.log(`📁 Location: ${outputDir}`);
  console.log(`📊 Leads: ${count}`);
  console.log(`🔥 HOT Leads: 5`);
  console.log(`📄 Files created:`);
  console.log(`   - CAMPAIGN-OVERVIEW.md`);
  console.log(`   - SUMMARY.md`);
  console.log(`   - ${count} individual audit files`);
  console.log(`\n🎯 FOCUS: NAP (Name, Address, Phone) Consistency`);
  console.log(`   Every audit prioritizes NAP analysis for maximum local SEO impact`);
};

main();
