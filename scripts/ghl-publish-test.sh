#!/bin/bash
# GHL Blog Publisher - Test Script
# Usage: ./ghl-publish-test.sh

set -e

GHL_API_KEY="${GHL_API_KEY:-pit-02f417f4-8dcd-4794-a8ce-bdc507a926bb}"
GHL_BASE_URL="https://services.leadconnectorhq.com"
LOCATION_ID="yrvzyq2jB2me4Z23PFxP"

ARTICLE_FILE="$1"

if [ -z "$ARTICLE_FILE" ]; then
    echo "Usage: $0 /path/to/article.md"
    exit 1
fi

if [ ! -f "$ARTICLE_FILE" ]; then
    echo "❌ File not found: $ARTICLE_FILE"
    exit 1
fi

echo "🚀 Publishing to GHL..."
echo "File: $ARTICLE_FILE"
echo ""

# Extract title (first H1)
TITLE=$(grep "^# " "$ARTICLE_FILE" | head -1 | sed 's/^# //')

# Extract meta title
META_TITLE=$(grep "^\\*\\*Meta Title:\\*\\*" "$ARTICLE_FILE" | sed 's/.*Meta Title:\*\* //' | head -1)
[ -z "$META_TITLE" ] && META_TITLE="$TITLE"

# Extract meta description  
META_DESC=$(grep "^\\*\\*Meta Description:\\*\\*" "$ARTICLE_FILE" | sed 's/.*Meta Description:\*\* //' | head -1)

# Create slug from title
SLUG=$(echo "$TITLE" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]/-/g' | sed 's/--*/-/g' | sed 's/^-//' | sed 's/-$//' | cut -c1-60)

# Extract content (everything after first # line)
CONTENT=$(sed -n '/^# /,$p' "$ARTICLE_FILE" | tail -n +2)

# Convert markdown to simple HTML
HTML=$(echo "$CONTENT" | sed 's/^## /\n<h2>/g; s/^### /\n<h3>/g; s/^- /<li>/g; s/$/<\/p>/g' | sed 's/<\/p><\/h2>/<\/h2>/g; s/<\/p><\/h3>/<\/h3>/g' | sed 's/<li>\(.*\)$/<li>\1<\/li>/g' | sed 's/^\*\*\(.*\)\*\*$/<strong>\1<\/strong>/g')

# Build JSON payload
JSON=$(cat <<EOF
{
  "title": "$TITLE",
  "slug": "$SLUG",
  "content": $(echo "$HTML" | jq -Rs .),
  "metaTitle": "$META_TITLE",
  "metaDescription": "$META_DESC",
  "status": "published",
  "author": "Rankingsb Team"
}
EOF
)

echo "Title: $TITLE"
echo "Slug: $SLUG"
echo ""

# Publish to GHL
response=$(curl -s -X POST "${GHL_BASE_URL}/blogs/posts" \
  -H "Authorization: Bearer ${GHL_API_KEY}" \
  -H "Content-Type: application/json" \
  -H "Version: 2021-07-28" \
  -H "Accept: application/json" \
  -d "$JSON" 2>&1)

# Check if successful
if echo "$response" | grep -q '"id"' || echo "$response" | grep -q '"post"'; then
    echo "✅ Published successfully!"
    POST_ID=$(echo "$response" | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4)
    echo "Post ID: $POST_ID"
    echo ""
    echo "🔗 Live URL: https://rankingsb.com/blog/$SLUG"
    echo ""
    echo "Full response:"
    echo "$response" | jq . 2>/dev/null || echo "$response"
else
    echo "❌ Publish failed"
    echo "Response: $response" | jq . 2>/dev/null || echo "$response"
    exit 1
fi
