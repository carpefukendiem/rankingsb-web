#!/bin/bash
# GHL Blog Publisher - Production Script
# Usage: ./ghl-publish-all.sh

set -e

GHL_API_KEY="${GHL_API_KEY:-pit-0ab4c82b-c4b2-4493-b7e5-fd8e94343813}"
GHL_BASE_URL="https://services.leadconnectorhq.com"
LOCATION_ID="yrvzyq2jB2me4Z23PFxP"
BLOG_ID="${1:-}"  # Pass blogId as first argument

if [ -z "$BLOG_ID" ]; then
    echo "Usage: $0 <blogId>"
    echo "Example: $0 yrvzyq2jB2me4Z23PFxP"
    echo ""
    echo "Get your blogId from GHL: Marketing > Blog (check URL)"
    exit 1
fi

echo "🚀 GHL Blog Publisher"
echo "===================="
echo "Location: $LOCATION_ID"
echo "Blog ID: $BLOG_ID"
echo ""

# Article directory
ARTICLE_DIR="content/seo-articles"

if [ ! -d "$ARTICLE_DIR" ]; then
    echo "❌ Article directory not found: $ARTICLE_DIR"
    exit 1
fi

# Counter
PUBLISHED=0
FAILED=0

# Publish each article
for article in "$ARTICLE_DIR"/*.md; do
    if [ ! -f "$article" ]; then
        continue
    fi
    
    filename=$(basename "$article" .md)
    echo "📄 Publishing: $filename"
    
    # Extract title
    TITLE=$(grep "^# " "$article" | head -1 | sed 's/^# //')
    
    # Create slug
    SLUG=$(echo "$filename" | cut -c1-50)
    
    # Extract content (everything after first # line, convert to HTML)
    CONTENT=$(sed -n '/^# /,$p' "$article" | tail -n +2 | sed 's/^## /<h2>/g; s/^### /<h3>/g; s/^- /<li>/g; s/\*\*\([^*]*\)\*\*/<strong>\1<\/strong>/g' | tr '\n' ' ')
    
    # Build JSON
    JSON=$(cat <<EOF
{
    "locationId": "$LOCATION_ID",
    "blogId": "$BLOG_ID",
    "title": "$TITLE",
    "status": "PUBLISHED"
}
EOF
)
    
    # Publish
    response=$(curl -s -X POST "${GHL_BASE_URL}/blogs/posts" \
        -H "Authorization: Bearer ${GHL_API_KEY}" \
        -H "Content-Type: application/json" \
        -H "Version: 2021-07-28" \
        -H "X-Location-Id: ${LOCATION_ID}" \
        -d "$JSON" 2>&1)
    
    if echo "$response" | grep -q '"id"' || echo "$response" | grep -q '"postId"'; then
        echo "   ✅ Published"
        POST_ID=$(echo "$response" | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4)
        echo "   📝 Post ID: $POST_ID"
        echo "   🔗 URL: https://rankingsb.com/blog/$SLUG"
        echo ""
        PUBLISHED=$((PUBLISHED + 1))
    else
        echo "   ❌ Failed"
        echo "   Error: $response" | head -1
        echo ""
        FAILED=$((FAILED + 1))
    fi
    
    # Rate limiting - be nice to the API
    sleep 1
done

echo "===================="
echo "📊 Results:"
echo "   Published: $PUBLISHED"
echo "   Failed: $FAILED"
echo ""

if [ $FAILED -eq 0 ]; then
    echo "🎉 All articles published successfully!"
else
    echo "⚠️  Some articles failed. Check errors above."
fi
