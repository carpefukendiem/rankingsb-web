#!/usr/bin/env node
/**
 * Test GHL API Connection & Get Location Info
 */

const https = require('https');

const API_KEY = 'pit-36c7d3ea-abe6-44b0-a0e3-0cf857094125';
const BASE_URL = 'services.leadconnectorhq.com';

function apiRequest(endpoint) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: BASE_URL,
      path: endpoint,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Version': '2021-07-28',
        'Content-Type': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve({
            status: res.statusCode,
            data: JSON.parse(body)
          });
        } catch (e) {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
}

async function testConnection() {
  console.log('🔍 Testing GHL API Connection...\n');
  console.log('API Key:', API_KEY.substring(0, 15) + '...');
  console.log('Base URL:', BASE_URL);
  console.log('');

  try {
    // Test 1: Get company/location (GHL uses /companies for agency view)
    console.log('📍 Testing Company endpoint...');
    const companyRes = await apiRequest('/companies');
    console.log('Status:', companyRes.status);
    console.log('Response:', JSON.stringify(companyRes.data, null, 2).substring(0, 500));
    console.log('');
    
    // Test 2: Try locations list
    console.log('📍 Fetching Locations v2...');
    const locationsRes = await apiRequest('/v2/locations');
    console.log('Status:', locationsRes.status);
    console.log('Response:', JSON.stringify(locationsRes.data, null, 2).substring(0, 500));
    
    if (locationsRes.data?.locations) {
      console.log('✅ Found', locationsRes.data.locations.length, 'location(s):');
      locationsRes.data.locations.forEach(loc => {
        console.log(`   - ID: ${loc.id}`);
        console.log(`     Name: ${loc.name}`);
        console.log(`     Address: ${loc.address || 'N/A'}`);
        console.log('');
      });
    }
    console.log('');

    // Test 3: Get calendars (need locationId)
    console.log('📅 Testing Calendars endpoint...');
    const calRes = await apiRequest('/calendars');
    console.log('Status:', calRes.status);
    console.log('Response:', JSON.stringify(calRes.data, null, 2).substring(0, 300));
    console.log('');

    // Test 4: Get contacts (limited)
    console.log('👥 Testing Contacts endpoint...');
    const contactRes = await apiRequest('/contacts?limit=5');
    console.log('Status:', contactRes.status);
    if (contactRes.data?.contacts) {
      console.log('Found', contactRes.data.contacts.length, 'contact(s)');
    } else {
      console.log('Response:', JSON.stringify(contactRes.data, null, 2).substring(0, 300));
    }
    console.log('');

    console.log('✅ Connection test complete!');

  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    process.exit(1);
  }
}

testConnection();
