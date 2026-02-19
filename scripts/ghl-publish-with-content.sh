#!/bin/bash
# GHL Blog Publisher v2 - WITH HTML CONTENT
# Converts markdown to HTML and publishes to GHL

set -e

GHL_API_KEY="${GHL_API_KEY:-pit-0ab4c82b-c4b2-4493-b7e5-fd8e94343813}"
GHL_BASE_URL="https://services.leadconnectorhq.com"
LOCATION_ID="yrvzyq2jB2me4Z23PFxP"
BLOG_ID="G1q5FleYQWsPcZ49hrJY"

if [ -z "$1" ]; then
    echo "Usage: $0 <article.md>"
    echo "Example: $0 content/seo-articles/hvac-seo-santa-barbara.md"
    exit 1
fi

ARTICLE_FILE="$1"

if [ ! -f "$ARTICLE_FILE" ]; then
    echo "❌ File not found: $ARTICLE_FILE"
    exit 1
fi

echo "🚀 Publishing: $(basename "$ARTICLE_FILE")"

# Extract title (first H1)
TITLE=$(grep "^# " "$ARTICLE_FILE" | head -1 | sed 's/^# //')

# Extract meta description
META_DESC=$(grep "^\\*\\*Meta Description:\\*\\*" "$ARTICLE_FILE" | sed 's/.*Meta Description:\*\* //' | head -1)

# Create slug from filename
SLUG=$(basename "$ARTICLE_FILE" .md | cut -c1-60)

# Extract content (everything after first # line)
CONTENT=$(sed -n '/^# /,$p' "$ARTICLE_FILE" | tail -n +2)

# Convert markdown to HTML
HTML=$(echo "$CONTENT" | pandoc -f markdown -t html --wrap=none 2>/dev/null || echo "$CONTENT" | sed \
    -e 's/^## /<h2>/g; s/^### /<h3>/g; s/^#### /<h4>/g' \
    -e 's/^\*\*\(.*\)\*\*$/<strong>\1<\/strong>/g' \
    -e 's/\*\*\([^*]*\)\*\*/<strong>\1<\/strong>/g' \
    -e 's/^- /<li>/g' \
    -e 's/^\[\(.*\)\](\(.*\))$/<a href="\2">\1<\/a>/g' \
    -e 's/^$/<p><\/p>/g' \
    | tr '\n' ' ' \
    | sed 's/<h2>/<\/p><h2>/g; s/<h3>/<\/p><h3>/g; s/<\/li>/<\/li>/g')

# Wrap in basic HTML structure
FULL_HTML="<h1>$TITLE</h1>$HTML"

echo "   Title: $TITLE"
echo "   Slug: $SLUG"
echo "   HTML length: ${#FULL_HTML} chars"

# Escape HTML for JSON
ESCAPED_HTML=$(echo "$FULL_HTML" | sed 's/"/\\"/g; s/\n/ /g')

# Build JSON payload
JSON=$(cat <<EOF
{
    "locationId": "$LOCATION_ID",
    "blogId": "$BLOG_ID",
    "title": "$TITLE",
    "rawHTML": "$ESCAPED_HTML",
    "status": "PUBLISHED"
}
EOF
)

# Publish to GHL
response=$(curl -s -X POST "${GHL_BASE_URL}/blogs/posts" \
    -H "Authorization: Bearer ${GHL_API_KEY}" \
    -H "Content-Type: application/json" \
    -H "Version: 2021-07-28" \
    -H "X-Location-Id: ${LOCATION_ID}" \
    -d "$JSON" 2>&1)

# Check response
if echo "$response" | grep -q '"blogPost"' && echo "$response" | grep -q '"_id"'; then
    POST_ID=$(echo "$response" | grep -o '"_id":"[^"]*"' | head -1 | cut -d'"' -f4)
    echo "   ✅ Published: $POST_ID"
    echo "   🔗 https://rankingsb.com/blog/$SLUG"
    echo ""
    exit 0
else
    echo "   ❌ Failed"
    echo "   Error: $response" | head -c 200
    echo ""
    exit 1
fi
