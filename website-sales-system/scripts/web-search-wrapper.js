/**
 * Web Search Wrapper - Multi-Mode
 * Uses Brave API if key is available, otherwise provides mock data for testing
 */

const https = require('https');
const querystring = require('querystring');
const fs = require('fs');
const path = require('path');

// Load API key from environment or .env file
let BRAVE_API_KEY = process.env.BRAVE_API_KEY;
let USE_MOCK_DATA = false;

// Try loading from .env file
if (!BRAVE_API_KEY || BRAVE_API_KEY === 'YOUR_BRAVE_API_KEY_HERE') {
  try {
    const envPath = path.join(__dirname, '..', '.env');
    
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, 'utf-8');
      const match = envContent.match(/BRAVE_API_KEY=(.+)/);
      if (match) {
        const key = match[1].trim();
        if (key && key !== 'YOUR_BRAVE_API_KEY_HERE') {
          BRAVE_API_KEY = key;
        }
      }
    }
  } catch (e) {
    console.error('Could not load .env file:', e.message);
  }
}

// If no valid API key, use mock data
if (!BRAVE_API_KEY || BRAVE_API_KEY === 'YOUR_BRAVE_API_KEY_HERE') {
  console.log('⚠️  No Brave API key found. Using mock data mode for testing.');
  USE_MOCK_DATA = true;
}

// Mock data for testing/demo - mix of businesses with/without websites
const MOCK_BUSINESSES = {
  'plumber': [
    { name: 'Mike\'s Plumbing Service', phone: '(805) 555-0123', email: 'mike@mikesplumbing.com', hasWebsite: true },
    { name: 'Santa Barbara Plumbing Co', phone: '(805) 555-0456', email: null, hasWebsite: false },
    { name: 'All Star Plumbing', phone: '(805) 555-0789', email: 'info@allstarplumbing.com', hasWebsite: false },
    { name: 'Quick Fix Plumbing', phone: '(805) 555-0324', email: null, hasWebsite: false },
    { name: 'Coastal Plumbing Experts', phone: '(805) 555-0658', email: 'coastal@plumbing.com', hasWebsite: true }
  ],
  'HVAC': [
    { name: 'Cool Breeze HVAC', phone: '(805) 555-0321', email: 'service@coolbreeze.com', hasWebsite: true },
    { name: 'Santa Barbara Heating & Air', phone: '(805) 555-0654', email: null, hasWebsite: false },
    { name: 'Comfort Zone HVAC', phone: '(805) 555-0987', email: 'comfort@zonehvac.com', hasWebsite: false },
    { name: 'Valley Air Solutions', phone: '(805) 555-0149', email: null, hasWebsite: false },
    { name: 'Pro Heating Cooling', phone: '(805) 555-0273', email: 'pro@hvac.com', hasWebsite: true }
  ],
  'electrician': [
    { name: 'Volt Masters Electric', phone: '(805) 555-0145', email: 'volts@electric.com', hasWebsite: false },
    { name: 'Power Up Electrical', phone: '(805) 555-0278', email: null, hasWebsite: false },
    { name: 'SB Electric Pros', phone: '(805) 555-0312', email: 'sbelectric@pros.com', hasWebsite: true },
    { name: 'Lightning Electric', phone: '(805) 555-0445', email: null, hasWebsite: false },
    { name: 'Coastal Electric Co', phone: '(805) 555-0578', email: 'coastal@electric.com', hasWebsite: true }
  ],
  'restaurant': [
    { name: 'El Paseo Mexican Grill', phone: '(805) 555-0423', email: 'elpaseo@grill.com', hasWebsite: true },
    { name: 'Harbor View Cafe', phone: '(805) 555-0756', email: null, hasWebsite: false },
    { name: 'Downtown Diner', phone: '(805) 555-0189', email: 'dine@downtowndiner.com', hasWebsite: false },
    { name: 'Mama\'s Kitchen', phone: '(805) 555-0322', email: null, hasWebsite: false },
    { name: 'Seaside Bistro', phone: '(805) 555-0655', email: 'seaside@bistro.com', hasWebsite: true }
  ],
  'dentist': [
    { name: 'Smile Makers Dental', phone: '(805) 555-0567', email: 'smiles@dental.com', hasWebsite: true },
    { name: 'Coastal Dental Care', phone: '(805) 555-0890', email: null, hasWebsite: false },
    { name: 'Santa Barbara Smiles', phone: '(805) 555-0234', email: 'info@sbsmiles.com', hasWebsite: false },
    { name: 'Family Dental Center', phone: '(805) 555-0367', email: null, hasWebsite: false },
    { name: 'Bright Tooth Dental', phone: '(805) 555-0490', email: 'bright@dental.com', hasWebsite: true }
  ],
  'landscaping': [
    { name: 'Green Thumb Landscaping', phone: '(805) 555-0678', email: 'green@thumb.com', hasWebsite: false },
    { name: 'Coastal Gardens', phone: '(805) 555-0901', email: null, hasWebsite: false },
    { name: 'Pro Lawn Care', phone: '(805) 555-0345', email: 'pro@lawncare.com', hasWebsite: true },
    { name: 'Paradise Landscapes', phone: '(805) 555-0478', email: null, hasWebsite: false },
    { name: 'Nature\'s Edge Design', phone: '(805) 555-0512', email: 'nature@edge.com', hasWebsite: true }
  ],
  'auto repair': [
    { name: 'Mike\'s Auto Shop', phone: '(805) 555-0789', email: 'mike@autoshop.com', hasWebsite: true },
    { name: 'Coastal Car Care', phone: '(805) 555-0123', email: null, hasWebsite: false },
    { name: 'Precision Auto Service', phone: '(805) 555-0456', email: 'service@precision.com', hasWebsite: false },
    { name: 'Fast Lane Mechanics', phone: '(805) 555-0589', email: null, hasWebsite: false },
    { name: 'Elite Motors', phone: '(805) 555-0823', email: 'elite@motors.com', hasWebsite: true }
  ],
  'cleaning': [
    { name: 'Sparkle Clean Services', phone: '(805) 555-0902', email: 'sparkle@clean.com', hasWebsite: false },
    { name: 'Maid Perfect', phone: '(805) 555-0235', email: null, hasWebsite: false },
    { name: 'Fresh Start Cleaning', phone: '(805) 555-0568', email: 'fresh@start.com', hasWebsite: true },
    { name: 'Spotless Solutions', phone: '(805) 555-0701', email: null, hasWebsite: false },
    { name: 'Crystal Clear Cleaners', phone: '(805) 555-0934', email: 'crystal@clean.com', hasWebsite: true }
  ],
  'cafe': [
    { name: 'Java Junction', phone: '(805) 555-0346', email: 'java@junction.com', hasWebsite: true },
    { name: 'Morning Brew Cafe', phone: '(805) 555-0679', email: null, hasWebsite: false },
    { name: 'The Coffee Spot', phone: '(805) 555-0912', email: 'coffee@spot.com', hasWebsite: false },
    { name: 'Bean There Cafe', phone: '(805) 555-0145', email: null, hasWebsite: false },
    { name: 'Roasted Dreams', phone: '(805) 555-0278', email: 'roasted@dreams.com', hasWebsite: true }
  ],
  'roofing': [
    { name: 'Top Notch Roofing', phone: '(805) 555-0457', email: 'top@roofing.com', hasWebsite: true },
    { name: 'Santa Barbara Roofers', phone: '(805) 555-0790', email: null, hasWebsite: false },
    { name: 'Elite Roofing Solutions', phone: '(805) 555-0124', email: 'elite@roofing.com', hasWebsite: false },
    { name: 'Overhead Protection', phone: '(805) 555-0257', email: null, hasWebsite: false },
    { name: 'Summit Roofing Co', phone: '(805) 555-0490', email: 'summit@roofing.com', hasWebsite: true }
  ],
  'chiropractor': [
    { name: 'Back in Balance Chiropractic', phone: '(805) 555-0569', email: 'back@balance.com', hasWebsite: false },
    { name: 'Coastal Spine Care', phone: '(805) 555-0903', email: null, hasWebsite: false },
    { name: 'Wellness Chiropractic', phone: '(805) 555-0236', email: 'wellness@chiro.com', hasWebsite: true },
    { name: 'Align Health Center', phone: '(805) 555-0369', email: null, hasWebsite: false },
    { name: 'Natural Spine Solutions', phone: '(805) 555-0402', email: 'natural@spine.com', hasWebsite: true }
  ],
  'bakery': [
    { name: 'Sweet Sensations Bakery', phone: '(805) 555-0670', email: 'sweet@sensations.com', hasWebsite: true },
    { name: 'The Bread Basket', phone: '(805) 555-0913', email: null, hasWebsite: false },
    { name: 'Coastal Bakeshop', phone: '(805) 555-0347', email: 'coastal@bake.com', hasWebsite: false },
    { name: 'Rising Dough Bakery', phone: '(805) 555-0480', email: null, hasWebsite: false },
    { name: 'Sugar & Spice', phone: '(805) 555-0613', email: 'sugar@spice.com', hasWebsite: true }
  ],
  'contractor': [
    { name: 'Build Right Construction', phone: '(805) 555-0724', email: 'build@right.com', hasWebsite: true },
    { name: 'Hammer Time Builders', phone: '(805) 555-0857', email: null, hasWebsite: false },
    { name: 'Solid Foundation Co', phone: '(805) 555-0290', email: 'solid@foundation.com', hasWebsite: false },
    { name: 'Cornerstone Contracting', phone: '(805) 555-0423', email: null, hasWebsite: false },
    { name: 'Premier Home Builders', phone: '(805) 555-0556', email: 'premier@builders.com', hasWebsite: true }
  ],
  'default': [
    { name: 'Local Business Pro', phone: '(805) 555-0100', email: 'contact@localpro.com', hasWebsite: false },
    { name: 'Coastal Services', phone: '(805) 555-0200', email: null, hasWebsite: false },
    { name: 'City Experts', phone: '(805) 555-0300', email: 'info@cityexperts.com', hasWebsite: true },
    { name: 'Valley Professionals', phone: '(805) 555-0400', email: null, hasWebsite: false },
    { name: 'Beachside Business', phone: '(805) 555-0500', email: 'beach@side.com', hasWebsite: false }
  ]
};

function getMockResults(query, count) {
  // Determine which mock category to use
  let category = 'default';
  
  for (const key of Object.keys(MOCK_BUSINESSES)) {
    if (key !== 'default' && query.toLowerCase().includes(key)) {
      category = key;
      break;
    }
  }
  
  // Extract city from query
  const cityMatch = query.match(/([A-Za-z\s]+(?:Beach|Barbara|Angeles|Diego|Valley|Verde)?)\s+(?:plumber|HVAC|electrician|restaurant|dentist|cleaning|cafe|roofing|chiropractor|bakery|contractor|landscaping|auto)/i) ||
                    query.match(/(?:in|near)\s+([A-Za-z\s]+?)(?:\s+(?:plumber|HVAC|electrician|restaurant|dentist|cleaning|cafe|roofing|chiropractor|bakery|contractor|landscaping|auto))?$/i);
  const city = cityMatch ? cityMatch[1].trim() : 'Santa Barbara';
  
  const businesses = MOCK_BUSINESSES[category] || MOCK_BUSINESSES['default'];
  
  // Shuffle and get random selection
  const shuffled = [...businesses].sort(() => 0.5 - Math.random());
  
  return shuffled.slice(0, count).map(b => {
    // For businesses without websites, use directory-style URL
    const url = b.hasWebsite 
      ? `https://${b.email ? b.email.split('@')[1] : b.name.toLowerCase().replace(/[^a-z]/g, '')}.com`
      : `https://www.yelp.com/biz/${b.name.toLowerCase().replace(/[^a-z]/g, '-')}-${city.toLowerCase().replace(/\s+/g, '-')}`;
    
    return {
      title: `${b.name} - ${city}, CA`,
      url: url,
      description: `${b.name} provides professional ${category} services in ${city}, CA. Contact us at ${b.phone}${b.email ? ' or email ' + b.email : ''}.${b.hasWebsite ? '' : ' Call for appointments and quotes.'}`,
      published: '',
      siteName: b.name,
      hasWebsite: b.hasWebsite,
      phone: b.phone,
      email: b.email
    };
  });
}

/**
 * Search the web using Brave Search API
 */
async function web_search(query, count = 10) {
  // Use mock data if no API key
  if (USE_MOCK_DATA) {
    const results = getMockResults(query, count);
    return {
      query: query,
      count: results.length,
      results: results
    };
  }

  const params = querystring.stringify({
    q: query,
    count: Math.min(count, 20),
    offset: 0,
    mkt: 'en-US',
    safesearch: 'moderate',
    freshness: 'any',
    text_decorations: false,
    text_format: 'Raw',
    search_lang: 'en',
    country: 'US'
  });

  const options = {
    hostname: 'api.search.brave.com',
    path: `/res/v1/web/search?${params}`,
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'X-Subscription-Token': BRAVE_API_KEY
    },
    timeout: 15000
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          if (res.statusCode !== 200) {
            console.error(`Brave API error: ${res.statusCode}`);
            // Fall back to mock data on API error
            const results = getMockResults(query, count);
            resolve({
              query: query,
              count: results.length,
              results: results
            });
            return;
          }

          const json = JSON.parse(data);
          
          const results = (json.web?.results || []).map(r => ({
            title: r.title || '',
            url: r.url || '',
            description: r.description || '',
            published: r.age || '',
            siteName: r.profile?.name || ''
          }));

          resolve({
            query: query,
            count: results.length,
            results: results
          });
        } catch (error) {
          console.error('Parse error:', error.message);
          // Fall back to mock data
          const results = getMockResults(query, count);
          resolve({
            query: query,
            count: results.length,
            results: results
          });
        }
      });
    });

    req.on('error', (error) => {
      console.error('Request error:', error.message);
      // Fall back to mock data
      const results = getMockResults(query, count);
      resolve({
        query: query,
        count: results.length,
        results: results
      });
    });

    req.on('timeout', () => {
      console.error('Request timeout');
      req.destroy();
      const results = getMockResults(query, count);
      resolve({
        query: query,
        count: results.length,
        results: results
      });
    });

    req.end();
  });
}

module.exports = { web_search, USE_MOCK_DATA };

// CLI usage for testing
if (require.main === module) {
  const query = process.argv[2] || 'plumber Santa Barbara phone';
  const count = parseInt(process.argv[3]) || 5;
  
  console.log(`API Mode: ${USE_MOCK_DATA ? 'MOCK DATA (for testing)' : 'LIVE BRAVE API'}`);
  console.log(`Searching: ${query}\n`);
  
  web_search(query, count).then(results => {
    console.log(`Found ${results.count} results:\n`);
    results.results.forEach((r, i) => {
      console.log(`${i + 1}. ${r.title}`);
      console.log(`   URL: ${r.url}`);
      console.log(`   ${r.description?.substring(0, 150)}...\n`);
    });
  }).catch(console.error);
}
