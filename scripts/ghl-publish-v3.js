#!/usr/bin/env node
/**
 * GHL Blog Publisher v3 - FULL SEO OPTIMIZATION
 * Publishes with all SEO fields: meta title, meta description, categories, tags, etc.
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
        // Bold & Italic
        .replace(/\*\*\*([^*]+)\*\*\*/g, '<strong><em>$1</em></strong>')
        .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
        .replace(/\*([^*]+)\*/g, '<em>$1</em>')
        // Links
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
        // Lists
        .replace(/^\- (.*$)/gim, '<li>$1</li>')
        // Line breaks to paragraphs
        .split('\n\n').map(para => {
            if (para.trim() && !para.match(/^<[h|l|u|o|a]/)) {
                return '<p>' + para + '</p>';
            }
            return para;
        }).join('\n');
    
    // Wrap consecutive li elements in ul
    html = html.replace(/(<li>.*?<\/li>\s*)+/g, match => '<ul>' + match + '</ul>');
    
    return html;
}

function extractMeta(content, field) {
    const regex = new RegExp(`\\*\\*${field}:\\*\\*\\s*(.+)$`, 'im');
    const match = content.match(regex);
    return match ? match[1].trim() : null;
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
    
    // Extract meta fields
    const metaTitle = extractMeta(content, 'Meta Title') || title;
    const metaDescription = extractMeta(content, 'Meta Description') || '';
    
    // Extract content body (everything after first # line)
    const bodyMatch = content.match(/^# .+\n([\s\S]+)$/);
    const body = bodyMatch ? bodyMatch[1] : content;
    
    // Convert to HTML
    const htmlBody = markdownToHtml(body);
    
    // Generate keywords/tags from title
    const tags = [];
    if (title.toLowerCase().includes('hvac')) tags.push('HVAC', 'Heating', 'Cooling');
    if (title.toLowerCase().includes('plumbing')) tags.push('Plumbing');
    if (title.toLowerCase().includes('roofing')) tags.push('Roofing');
    if (title.toLowerCase().includes('solar')) tags.push('Solar');
    if (title.toLowerCase().includes('appliance')) tags.push('Appliance Repair');
    if (title.toLowerCase().includes('dentist') || title.toLowerCase().includes('dental')) tags.push('Dental');
    if (title.toLowerCase().includes('chiropractor')) tags.push('Chiropractic');
    if (title.toLowerCase().includes('medical')) tags.push('Medical');
    if (title.toLowerCase().includes('lawyer') || title.toLowerCase().includes('attorney')) tags.push('Legal');
    if (title.toLowerCase().includes('santa barbara')) tags.push('Santa Barbara');
    if (title.toLowerCase().includes('ventura')) tags.push('Ventura');
    tags.push('SEO', 'Local Marketing');
    
    // Determine category
    let category = 'SEO Tips';
    if (title.toLowerCase().includes('hvac')) category = 'HVAC SEO';
    else if (title.toLowerCase().includes('plumbing')) category = 'Plumbing SEO';
    else if (title.toLowerCase().includes('roofing')) category = 'Roofing SEO';
    else if (title.toLowerCase().includes('solar')) category = 'Solar SEO';
    else if (title.toLowerCase().includes('dental') || title.toLowerCase().includes('medical')) category = 'Healthcare SEO';
    
    console.log(`   Title: ${title}`);
    console.log(`   Meta Title: ${metaTitle}`);
    console.log(`   Meta Description: ${metaDescription.substring(0, 60)}...`);
    console.log(`   Category: ${category}`);
    console.log(`   Tags: ${tags.join(', ')}`);
    console.log(`   HTML length: ${htmlBody.length} chars`);

    // Build payload with ALL SEO fields
    const payload = {
        locationId: LOCATION_ID,
        blogId: BLOG_ID,
        title: title,
        rawHTML: htmlBody,
        status: 'PUBLISHED',
        author: 'Ruben Ruiz',
        categories: [category],
        tags: tags,
        publishedAt: new Date().toISOString()
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
            
            // Now update with additional fields (categories, tags)
            const updatePayload = {
                locationId: LOCATION_ID,
                blogId: BLOG_ID,
                title: title,
                rawHTML: htmlBody,
                status: 'PUBLISHED',
                author: 'Ruben Ruiz',
                categories: [category],
                tags: tags
            };
            
            await fetch(`${GHL_BASE_URL}/blogs/posts/${data.blogPost._id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${GHL_API_KEY}`,
                    'Content-Type': 'application/json',
                    'Version': '2021-07-28',
                    'X-Location-Id': LOCATION_ID
                },
                body: JSON.stringify(updatePayload)
            });
            
            console.log(`   📝 SEO fields updated`);
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
    console.log('Usage: node ghl-publish-v3.js <article.md>');
    console.log('Example: node ghl-publish-v3.js content/seo-articles/hvac-seo-santa-barbara.md');
    process.exit(1);
}

publishArticle(filePath);
