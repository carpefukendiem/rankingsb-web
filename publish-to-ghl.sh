#!/bin/bash
# GHL Blog Publisher Script
# Usage: ./publish-to-ghl.sh /path/to/article.md "location-id"

API_KEY="sk_live_d7b8a9f3e2c1d5b6a4e8f9c2d1b7a3e5NsJpokA"
SUBDOMAIN="app.rankingsb.com"

ARTICLE_FILE="$1"
LOCATION_ID="$2"

if [ -z "$ARTICLE_FILE" ] || [ -z "$LOCATION_ID" ]; then
    echo "Usage: $0 /path/to/article.md location-id"
    echo ""
    echo "Location IDs:"
    echo "  - Rankings SB: 657c8f3e2b1a4d9e8f5c2b1a (example)"
    echo "  - Foam Cushions: 657c8f3e2b1a4d9e8f5c2b1b (example)"
    exit 1
fi

if [ ! -f "$ARTICLE_FILE" ]; then
    echo "Error: File not found: $ARTICLE_FILE"
    exit 1
fi

# Extract title from first H1
TITLE=$(grep "^# " "$ARTICLE_FILE" | head -1 | sed 's/^# //')

# Extract meta title
META_TITLE=$(grep "Meta Title:" "$ARTICLE_FILE" | sed 's/.*Meta Title:\*\* //' | sed 's/ \*\*//')

# Extract meta description  
META_DESC=$(grep "Meta Description:" "$ARTICLE_FILE" | sed 's/.*Meta Description:\*\* //' | sed 's/ \*\*//')

# Convert markdown to HTML (basic)
CONTENT=$(cat "$ARTICLE_FILE" | sed 's/^# /\n<h1>/' | sed 's/^## /\n<h2>/' | sed 's/^### /\n<h3>/' | sed 's/^- /<li>/' | sed 's/\*\*\([^\*]*\)\*\*/<strong>\1<\/strong>/g')

echo "Publishing: $TITLE"
echo "Location: $LOCATION_ID"
echo "Meta Title: $META_TITLE"
echo "Meta Description: $META_DESC"
echo ""
echo "To publish manually:"
echo "1. Login to https://$SUBDOMAIN"
echo "2. Switch to location: $LOCATION_ID"
echo "3. Go to Marketing > Blog > New Post"
echo "4. Title: $TITLE"
echo "5. Paste content from: $ARTICLE_FILE"
echo "6. SEO Title: $META_TITLE"
echo "7. SEO Description: $META_DESC"
echo "8. Publish"

# Note: Full API integration would use:
# curl -X POST "https://$SUBDOMAIN/api/blogs/posts" \
#   -H "Authorization: Bearer $API_KEY" \
#   -H "Content-Type: application/json" \
#   -d "{...}"
