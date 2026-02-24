/**
 * Web Search Wrapper
 * Wraps the OpenClaw web_search tool for use in Node.js scripts
 */

const { execSync } = require('child_process');
const path = require('path');

/**
 * Search the web using Brave Search API via OpenClaw
 * @param {string} query - Search query
 * @param {number} count - Number of results (1-10)
 * @returns {Promise<Object>} - Search results
 */
async function web_search(query, count = 10) {
  // Sanitize query for shell
  const sanitizedQuery = query.replace(/"/g, '\\"');
  
  try {
    // Use OpenClaw CLI to perform web search
    const result = execSync(
      `openclaw web_search "${sanitizedQuery}" --count ${Math.min(count, 10)} --json`,
      {
        encoding: 'utf-8',
        timeout: 30000,
        cwd: '/Users/rubenruiz/.openclaw/workspace'
      }
    );
    
    const data = JSON.parse(result);
    
    // Format to match expected structure
    return {
      query: query,
      count: data.results?.length || 0,
      results: (data.results || []).map(r => ({
        title: cleanExternalContent(r.title),
        url: r.url,
        description: cleanExternalContent(r.description),
        published: r.published,
        siteName: r.siteName
      }))
    };
  } catch (error) {
    console.error('Web search error:', error.message);
    // Return empty results on error
    return {
      query: query,
      count: 0,
      results: []
    };
  }
}

/**
 * Clean external content tags from text
 */
function cleanExternalContent(text) {
  if (!text) return '';
  return text
    .replace(/<<<EXTERNAL_UNTRUSTED_CONTENT[^>]*>>>/g, '')
    .replace(/<<<END_EXTERNAL_UNTRUSTED_CONTENT[^>]*>>>/g, '')
    .replace(/Source: Web Search/g, '')
    .replace(/---/g, '')
    .replace(/\n/g, ' ')
    .trim();
}

module.exports = { web_search };

// CLI usage for testing
if (require.main === module) {
  const query = process.argv[2] || 'plumber Santa Barbara phone';
  const count = parseInt(process.argv[3]) || 5;
  
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
