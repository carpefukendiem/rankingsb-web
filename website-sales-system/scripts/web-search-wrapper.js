/**
 * Web Search Wrapper
 * Uses Brave Search API directly
 */

const https = require('https');
const querystring = require('querystring');

// Load API key from environment or .env file
let BRAVE_API_KEY = process.env.BRAVE_API_KEY;

// If not in environment, try loading from .env file
if (!BRAVE_API_KEY || BRAVE_API_KEY === 'YOUR_BRAVE_API_KEY_HERE') {
  try {
    const fs = require('fs');
    const path = require('path');
    const envPath = path.join(__dirname, '..', '.env');
    
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, 'utf-8');
      const match = envContent.match(/BRAVE_API_KEY=(.+)/);
      if (match) {
        BRAVE_API_KEY = match[1].trim();
      }
    }
  } catch (e) {
    console.error('Could not load .env file:', e.message);
  }
}

/**
 * Search the web using Brave Search API
 * @param {string} query - Search query
 * @param {number} count - Number of results (1-20)
 * @returns {Promise<Object>} - Search results
 */
async function web_search(query, count = 10) {
  if (!BRAVE_API_KEY || BRAVE_API_KEY === 'YOUR_BRAVE_API_KEY_HERE') {
    console.error('❌ BRAVE_API_KEY not configured. Add it to .env file');
    return {
      query: query,
      count: 0,
      results: []
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
      'Accept-Encoding': 'gzip',
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
            console.error('Response:', data.substring(0, 500));
            resolve({
              query: query,
              count: 0,
              results: []
            });
            return;
          }

          const json = JSON.parse(data);
          
          // Format results
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
          resolve({
            query: query,
            count: 0,
            results: []
          });
        }
      });
    });

    req.on('error', (error) => {
      console.error('Request error:', error.message);
      resolve({
        query: query,
        count: 0,
        results: []
      });
    });

    req.on('timeout', () => {
      console.error('Request timeout');
      req.destroy();
      resolve({
        query: query,
        count: 0,
        results: []
      });
    });

    req.end();
  });
}

module.exports = { web_search };

// CLI usage for testing
if (require.main === module) {
  const query = process.argv[2] || 'plumber Santa Barbara phone';
  const count = parseInt(process.argv[3]) || 5;
  
  console.log(`API Key configured: ${BRAVE_API_KEY ? 'Yes' : 'No'}`);
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
