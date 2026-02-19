#!/usr/bin/env node
/**
 * GHL Blog Publisher with Full Content
 * Converts markdown to HTML and publishes to GoHighLevel
 */

const fs = require('fs');
const path = require('path');

const GHL_API_KEY = process.env.GHL_API_KEY || 'pit-0ab4c82b-c4b2-4493-b7e5-fd8e94343813';
const GHL_BASE_URL = 'https://services.leadconnectorhq.com';
const LOCATION_ID = 'yrvzyq2jB2me4Z23PFxP';
const BLOG_ID = 'G1q5FleYQWsPcZ49hrJY';

// Simple markdown to HTML converter
function markdownToHtml(markdown) {
    let html = markdown
        // Headers
        .replace(/^#### (.*$)/gim, '<h4>$1</h4>')
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        // Bold
        .replace(/\*\*\*([^*]+)\*\*\*/g, '<strong><em>$1</em></strong>')
        .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
        .replace(/\*([^*]+)\*/g, '<em>$1</em>')
        // Links
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
        // Lists
        .replace(/^\- (.*$)/gim, '<li>$1</li>')
        // Paragraphs (wrap lines that aren't tags)
        .split('\n').map(line => {
            if (line.trim() && !line.match(/^<[h|l|u|o]/)) {
                return '<p>' + line + '</p>';
            }
            return line;
        }).join('\n');
    
    // Wrap consecutive li elements in ul
    html = html.replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>');
    
    return html;
}

async function publishArticle(filePath) {
    if (!fs.existsSync(filePath)) {
        console.error(`❌ File not found: ${filePath}`);
        process.exit(1);
    }

    console.log(`🚀 Publishing: ${path.basename(filePath)}`);

    const content = fs.readFileSync(filePath, 'utf8');
    
    // Extract title (first H1)
    const titleMatch = content.match(/^# (.+)$/m);
    const title = titleMatch ? titleMatch[1] : 'Untitled';
    
    // Extract content (everything after first # line)
    const bodyMatch = content.match(/^# .+\n([\s\S]+)$/);
    const body = bodyMatch ? bodyMatch[1] : content;
    
    // Convert to HTML
    const htmlBody = markdownToHtml(body);
    const fullHtml = `<h1>${title}</h1>${htmlBody}`;
    
    console.log(`   Title: ${title}`);
    console.log(`   HTML length: ${fullHtml.length} chars`);

    // Build payload
    const payload = {
        locationId: LOCATION_ID,
        blogId: BLOG_ID,
        title: title,
        rawHTML: fullHtml,
        status: 'PUBLISHED'
    };

    try {
        const response = await fetch(`${GHL_BASE_URL}/blogs/posts`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${GHL_API_KEY}`,
                'Content-Type': 'application/json',
                'Version': '2021-07-28',
                'X-Location-Id': LOCATION_ID
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (data.blogPost && data.blogPost._id) {
            console.log(`   ✅ Published: ${data.blogPost._id}`);
            console.log(`   🔗 https://rankingsb.com/blog/${data.blogPost.urlSlug}`);
            console.log('');
            return { success: true, id: data.blogPost._id, slug: data.blogPost.urlSlug };
        } else {
            console.log(`   ❌ Failed:`, data);
            return { success: false, error: data };
        }
    } catch (error) {
        console.log(`   ❌ Error:`, error.message);
        return { success: false, error: error.message };
    }
}

// Main
const filePath = process.argv[2];
if (!filePath) {
    console.log('Usage: node ghl-publish-v2.js <article.md>');
    console.log('Example: node ghl-publish-v2.js content/seo-articles/hvac-seo-santa-barbara.md');
    process.exit(1);
}

publishArticle(filePath);
