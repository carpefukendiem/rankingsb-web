#!/bin/bash
# GHL Auto-Publisher v1.0
# Automated blog post publishing for Rankingsb and CushionFoamz
# Usage: ./ghl-auto-publisher.sh /path/to/article.md [location_id] [publish_date]

# Configuration
API_KEY="sk_live_d7b8a9f3e2c1d5b6a4e8f9c2d1b7a3e5NsJpokA"
BASE_URL="https://app.rankingsb.com"
DEFAULT_LOCATION="main"  # Will need actual location ID

# Arguments
ARTICLE_FILE="$1"
LOCATION_ID="${2:-$DEFAULT_LOCATION}"
PUBLISH_DATE="${3:-$(date -u +%Y-%m-%d)}"  # Default to today

if [ -z "$ARTICLE_FILE" ]; then
    echo "❌ Usage: $0 /path/to/article.md [location_id] [YYYY-MM-DD]"
    echo "   Example: $0 content/article.md rankingsb 2026-02-20"
    exit 1
fi

if [ ! -f "$ARTICLE_FILE" ]; then
    echo "❌ File not found: $ARTICLE_FILE"
    exit 1
fi

echo "🚀 GHL Auto-Publisher Starting..."
echo "================================"
echo "File: $ARTICLE_FILE"
echo "Location: $LOCATION_ID"
echo "Publish Date: $PUBLISH_DATE"
echo ""

# Extract metadata from markdown
extract_meta() {
    local field="$1"
    grep -i "^\\*\\*$field:\\*\\*" "$ARTICLE_FILE" | sed "s/.*$field:\\*\\* //i" | sed 's/ \\*\\*$//' | head -1
}

# Extract content (everything after first # line)
extract_content() {
    sed -n '/^# /,$p' "$ARTICLE_FILE" | tail -n +2
}

# Convert markdown to HTML (basic)
markdown_to_html() {
    local md="$1"
    echo "$md" | \
    sed 's/^# \(.*\)/<h1>\1<\/h1>/' | \
    sed 's/^## \(.*\)/<h2>\1<\/h2>/' | \
    sed 's/^### \(.*\)/<h3>\1<\/h3>/' | \
    sed 's/\\*\\*\\([^\\*]*\\)\\*\\*/<strong>\1<\/strong>/g' | \
    sed 's/\\*\\([^\\*]*\\)\\*/<em>\1<\/em>/g' | \
    sed 's/^- \(.*\)/<li>\1<\/li>/' | \
    sed 's/\\[\\([^\\]]*\\)\\](\\([^\\)]*\\))/<a href="\2">\1<\/a>/g' | \
    awk '/^<li>/ {if (!list) {print "<ul>"; list=1}} !/^<li>/ {if (list) {print "</ul>"; list=0}} {print} END {if (list) print "</ul>"}' | \
    sed '/^$/!{:a;N;s/\\n/<p>/;ta}'
}

# Extract data
TITLE=$(grep "^# " "$ARTICLE_FILE" | head -1 | sed 's/^# //')
META_TITLE=$(extract_meta "Meta Title")
META_DESC=$(extract_meta "Meta Description")
SLUG=$(echo "$TITLE" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]/-/g' | sed 's/--*/-/g' | sed 's/^-//' | sed 's/-$//')

echo "📄 Extracted Metadata:"
echo "   Title: $TITLE"
echo "   Meta Title: $META_TITLE"
echo "   Meta Description: $META_DESC"
echo "   URL Slug: $SLUG"
echo ""

# Convert content to HTML
echo "🔄 Converting markdown to HTML..."
RAW_CONTENT=$(extract_content)
HTML_CONTENT=$(markdown_to_html "$RAW_CONTENT")

# Build JSON payload
JSON_PAYLOAD=$(cat <<EOF
{
  "title": "$TITLE",
  "slug": "$SLUG",
  "content": $(echo "$HTML_CONTENT" | jq -Rs .),
  "metaTitle": "$META_TITLE",
  "metaDescription": "$META_DESC",
  "status": "published",
  "publishedAt": "${PUBLISH_DATE}T08:00:00.000Z",
  "author": "Johnny 5",
  "tags": ["SEO", "Marketing"],
  "featuredImage": null
}
EOF
)

echo "📤 Payload prepared (preview):"
echo "$JSON_PAYLOAD" | head -20
echo "..."
echo ""

# API Call (commented out for safety - test mode)
echo "🔧 API Configuration:"
echo "   Endpoint: POST ${BASE_URL}/api/blogs/posts"
echo "   Location: $LOCATION_ID"
echo "   Authorization: Bearer ${API_KEY:0:20}..."
echo ""

echo "⚠️  TEST MODE: API call disabled for safety"
echo "   To enable publishing, uncomment the curl command below"
echo ""

# Actual API call (uncomment when ready):
# response=$(curl -s -X POST "${BASE_URL}/api/blogs/posts" \
#   -H "Authorization: Bearer ${API_KEY}" \
#   -H "Content-Type: application/json" \
#   -H "X-Location-Id: ${LOCATION_ID}" \
#   -d "$JSON_PAYLOAD" 2>&1)
# 
# if [ $? -eq 0 ]; then
#     echo "✅ Published successfully!"
#     echo "   Response: $response"
# else
#     echo "❌ Publish failed"
#     echo "   Error: $response"
# fi

echo "✅ Processing complete!"
echo ""
echo "Next steps:"
echo "1. Verify location ID in GHL"
echo "2. Uncomment API call in script"
echo "3. Test with one article"
echo "4. Batch process remaining articles"
