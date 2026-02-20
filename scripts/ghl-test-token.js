#!/usr/bin/env node
/**
 * GHL API v2 Test Script
 * Verifies new Private Integration token works
 * Usage: node scripts/ghl-test-token.js <your-new-token>
 */

const token = process.argv[2] || process.env.GHL_API_TOKEN;

if (!token) {
  console.error('❌ Error: No API token provided');
  console.log('Usage: node scripts/ghl-test-token.js <token>');
  console.log('   or: export GHL_API_TOKEN=<token> && node scripts/ghl-test-token.js');
  process.exit(1);
}

const BASE_URL = 'https://services.leadconnectorhq.com';
const RANKINGSB_LOCATION = 'yrvzyq2jB2me4Z23PFxP';

async function testEndpoint(name, url) {
  console.log(`\n📡 Testing: ${name}`);
  console.log(`   URL: ${url}`);
  
  try {
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Version': '2021-07-28'
      }
    });
    
    if (!response.ok) {
      const error = await response.text();
      console.log(`   ❌ FAILED: ${response.status} ${response.statusText}`);
      console.log(`   Error: ${error.substring(0, 200)}`);
      return null;
    }
    
    const data = await response.json();
    console.log(`   ✅ SUCCESS`);
    return data;
  } catch (err) {
    console.log(`   ❌ ERROR: ${err.message}`);
    return null;
  }
}

async function main() {
  console.log('🧪 GHL API v2 Token Test');
  console.log('========================');
  console.log(`Token: ${token.substring(0, 15)}...${token.substring(-5)}`);
  
  // Test 1: Get locations
  const locations = await testEndpoint(
    'List Locations',
    `${BASE_URL}/locations?limit=20`
  );
  
  if (locations) {
    console.log(`   Found ${locations.locations?.length || 0} locations`);
    locations.locations?.forEach(loc => {
      console.log(`   - ${loc.name} (${loc.id})`);
    });
  }
  
  // Test 2: Get users in Rankingsb
  const users = await testEndpoint(
    'List Users (Rankingsb)',
    `${BASE_URL}/users?locationId=${RANKINGSB_LOCATION}&limit=50`
  );
  
  if (users) {
    console.log(`   Found ${users.users?.length || 0} users`);
    users.users?.forEach(user => {
      console.log(`   - ${user.firstName} ${user.lastName} (${user.id})`);
      if (user.id === 'SFexIYGYlRvIcFtI0plP') {
        console.log(`     ⭐ This is SAL!`);
      }
    });
  }
  
  // Test 3: Get opportunities (pipeline)
  const opportunities = await testEndpoint(
    'List Opportunities (Pipeline)',
    `${BASE_URL}/opportunities?locationId=${RANKINGSB_LOCATION}&limit=100`
  );
  
  if (opportunities) {
    console.log(`   Found ${opportunities.opportunities?.length || 0} opportunities`);
    
    // Count by stage
    const stageCounts = {};
    opportunities.opportunities?.forEach(opp => {
      stageCounts[opp.pipelineStageId] = (stageCounts[opp.pipelineStageId] || 0) + 1;
    });
    
    console.log('   Stage breakdown:', stageCounts);
  }
  
  // Test 4: Get contacts
  const contacts = await testEndpoint(
    'List Contacts',
    `${BASE_URL}/contacts?locationId=${RANKINGSB_LOCATION}&limit=10`
  );
  
  if (contacts) {
    console.log(`   Found ${contacts.contacts?.length || 0} contacts`);
    contacts.contacts?.slice(0, 3).forEach(contact => {
      console.log(`   - ${contact.firstName} ${contact.lastName} (${contact.email || 'no email'})`);
    });
  }
  
  // Summary
  console.log('\n📊 Test Summary');
  console.log('===============');
  if (locations && users && opportunities && contacts) {
    console.log('✅ ALL TESTS PASSED — Token is working!');
    console.log('\n🎯 Next step: Run Sal monitoring');
    console.log('   node scripts/ghl-sal-monitor.js');
  } else {
    console.log('❌ Some tests failed — Check token and permissions');
    console.log('\n💡 Common fixes:');
    console.log('   1. Make sure token is from Private Integration (not old API key)');
    console.log('   2. Verify location IDs are whitelisted');
    console.log('   3. Check all required scopes are enabled');
  }
}

main().catch(console.error);
