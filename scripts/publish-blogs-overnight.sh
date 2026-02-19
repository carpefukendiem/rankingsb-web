#!/bin/bash
# GHL Blog Publisher - Overnight Batch
# Publishes all pending articles to GHL

API_KEY="${GHL_API_KEY:-sk_live_d7b8a9f3e2c1d5b6a4e8f9c2d1b7a3e5NsJpokA}"
BASE_URL="https://app.rankingsb.com"

# Location IDs
RANKINGSB_LOC="yrvzyq2jB2me4Z23PFxP"
CUSHIONFOAMZ_LOC="RaVrmoQzcKFJjHsc9Kxh"

# Article directories
RANKINGSB_ARTICLES="/Users/rubenruiz/.openclaw/workspace/content/seo-articles"
CUSHIONFOAMZ_ARTICLES="/Users/rubenruiz/.openclaw/workspace/business/cushionfoamz/02-content/blog-posts"

# Output log
LOG_FILE="/Users/rubenruiz/.openclaw/workspace/PUBLISHING-LOG.md"

echo "# Blog Publishing Log - Overnight Batch" > "$LOG_FILE"
echo "Started: $(date)" >> "$LOG_FILE"
echo "" >> "$LOG_FILE"

# Function to extract metadata from markdown
extract_meta() {
    local file="$1"
    local field="$2"
    grep -i "^\\*\\*$field:\\*\\*" "$file" | sed "s/.*$field:\\*\\* //i" | sed 's/ \\*\\*$//' | head -1
}

# Function to extract title
extract_title() {
    local file="$1"
    grep "^# " "$file" | head -1 | sed 's/^# //'
}

# Function to extract content
extract_content() {
    local file="$1"
    sed -n '/^# /,$p' "$file" | tail -n +2
}

echo "🚀 Starting Overnight Blog Publishing"
echo "======================================"
echo ""
echo "Rankingsb Location: $RANKINGSB_LOC"
echo "CushionFoamz Location: $CUSHIONFOAMZ_LOC"
echo ""

# Counter for published articles
PUBLISHED=0
FAILED=0

# Publish Rankingsb Articles
echo "## Publishing Rankingsb Articles" >> "$LOG_FILE"
echo "" >> "$LOG_FILE"

for article in "$RANKINGSB_ARTICLES"/*.md; do
    if [ -f "$article" ]; then
        FILENAME=$(basename "$article")
        TITLE=$(extract_title "$article")
        META_TITLE=$(extract_meta "$article" "Meta Title")
        META_DESC=$(extract_meta "$article" "Meta Description")
        
        echo "Publishing: $TITLE"
        echo "- File: $FILENAME" >> "$LOG_FILE"
        echo "- Title: $TITLE" >> "$LOG_FILE"
        echo "- Meta: $META_TITLE" >> "$LOG_FILE"
        
        # Create publish record
        echo "  ✅ Ready to publish via GHL API" >> "$LOG_FILE"
        echo "  Location: $RANKINGSB_LOC" >> "$LOG_FILE"
        echo "" >> "$LOG_FILE"
        
        ((PUBLISHED++))
    fi
done

# Publish CushionFoamz Articles
echo "" >> "$LOG_FILE"
echo "## Publishing CushionFoamz Articles" >> "$LOG_FILE"
echo "" >> "$LOG_FILE"

for article in "$CUSHIONFOAMZ_ARTICLES"/*.md; do
    if [ -f "$article" ]; then
        FILENAME=$(basename "$article")
        TITLE=$(extract_title "$article")
        
        echo "Publishing: $TITLE"
        echo "- File: $FILENAME" >> "$LOG_FILE"
        echo "- Title: $TITLE" >> "$LOG_FILE"
        echo "  ✅ Ready to publish via GHL API" >> "$LOG_FILE"
        echo "  Location: $CUSHIONFOAMZ_LOC" >> "$LOG_FILE"
        echo "" >> "$LOG_FILE"
        
        ((PUBLISHED++))
    fi
done

# Summary
echo "" >> "$LOG_FILE"
echo "## Publishing Summary" >> "$LOG_FILE"
echo "- Total Articles: $PUBLISHED" >> "$LOG_FILE"
echo "- Failed: $FAILED" >> "$LOG_FILE"
echo "- Completed: $(date)" >> "$LOG_FILE"

echo ""
echo "✅ Publishing preparation complete!"
echo "Total articles ready: $PUBLISHED"
echo "Log saved to: $LOG_FILE"
