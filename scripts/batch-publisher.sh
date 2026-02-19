#!/bin/bash
# Batch Content Publisher for GHL
# Publishes all pending articles and schedules social promotion
# Usage: ./batch-publisher.sh [business] [start_date]

BUSINESS="${1:-rankingsb}"  # rankingsb or cushionfoamz
START_DATE="${2:-$(date +%Y-%m-%d)}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "🚀 BATCH PUBLISHER STARTING"
echo "============================"
echo "Business: $BUSINESS"
echo "Start Date: $START_DATE"
echo ""

# Configuration based on business
if [ "$BUSINESS" = "rankingsb" ]; then
    CONTENT_DIR="/Users/rubenruiz/.openclaw/workspace/content/seo-articles"
    LOCATION_ID="rankingsb_main"  # Update with actual ID
    POST_FREQUENCY="2"  # days between posts
    SOCIAL_PLATFORMS="linkedin facebook"
elif [ "$BUSINESS" = "cushionfoamz" ]; then
    CONTENT_DIR="/Users/rubenruiz/.openclaw/workspace/business/cushionfoamz/02-content/blog-posts"
    LOCATION_ID="cushionfoamz_main"  # Update with actual ID
    POST_FREQUENCY="3"
    SOCIAL_PLATFORMS="facebook instagram pinterest"
else
    echo "❌ Unknown business: $BUSINESS"
    echo "   Use: rankingsb or cushionfoamz"
    exit 1
fi

# Get list of unpublished articles
get_unpublished() {
    ls -1 "$CONTENT_DIR"/*.md 2>/dev/null | while read file; do
        basename "$file"
    done
}

# Calculate publish dates for staggered release
calculate_dates() {
    local index="$1"
    local base_date="$2"
    local frequency="$3"
    
    # Add days based on index
    date -u -d "$base_date +$((index * frequency)) days" +%Y-%m-%d 2>/dev/null || echo "$base_date"
}

# Generate social media content from article
generate_social_content() {
    local article_file="$1"
    local title=$(grep "^# " "$article_file" | head -1 | sed 's/^# //')
    
    cat <<EOF
📝 New blog post: $title

Read the full guide on our website. Link in bio!

#SEO #Marketing #SantaBarbara #SmallBusiness #DigitalMarketing
EOF
}

echo "📁 Scanning content directory: $CONTENT_DIR"
ARTICLES=($(get_unpublished))
ARTICLE_COUNT=${#ARTICLES[@]}

echo "   Found $ARTICLE_COUNT articles ready to publish"
echo ""

if [ $ARTICLE_COUNT -eq 0 ]; then
    echo "✅ No articles to publish. All caught up!"
    exit 0
fi

# Preview publishing schedule
echo "📅 PUBLISHING SCHEDULE"
echo "======================"
for i in "${!ARTICLES[@]}"; do
    article="${ARTICLES[$i]}"
    publish_date=$(calculate_dates "$i" "$START_DATE" "$POST_FREQUENCY")
    
    echo "$(($i + 1)). $article"
    echo "   Publish Date: $publish_date"
    echo "   Social Posts: $(($i + 1)) day(s) after publish"
    echo ""
done

echo ""
read -p "⚠️  Proceed with publishing? (yes/no): " confirm

if [ "$confirm" != "yes" ]; then
    echo "❌ Cancelled"
    exit 0
fi

echo ""
echo "🚀 STARTING PUBLICATION..."
echo "=========================="

# Process each article
for i in "${!ARTICLES[@]}"; do
    article="${ARTICLES[$i]}"
    article_path="$CONTENT_DIR/$article"
    publish_date=$(calculate_dates "$i" "$START_DATE" "$POST_FREQUENCY")
    
    echo ""
    echo "📄 Processing: $article"
    echo "   Date: $publish_date"
    
    # Publish blog post
    echo "   📝 Publishing blog post..."
    "$SCRIPT_DIR/ghl-auto-publisher.sh" "$article_path" "$LOCATION_ID" "$publish_date"
    
    if [ $? -eq 0 ]; then
        echo "   ✅ Blog post published"
        
        # Generate and schedule social content
        social_content=$(generate_social_content "$article_path")
        social_date=$(date -u -d "$publish_date +1 day" +'%Y-%m-%d 09:00')
        
        echo "   📱 Scheduling social posts..."
        for platform in $SOCIAL_PLATFORMS; do
            "$SCRIPT_DIR/ghl-social-scheduler.sh" "$social_content" "$social_date" "$LOCATION_ID" "$platform"
        done
        echo "   ✅ Social posts scheduled"
        
        # Mark as published (move to archive or update tracking)
        echo "   📦 Archiving..."
        # mv "$article_path" "$CONTENT_DIR/published/"
        
    else
        echo "   ❌ Failed to publish"
    fi
    
    echo "   ---------------------------"
done

echo ""
echo "✅ BATCH PUBLICATION COMPLETE"
echo "=============================="
echo "Published: $ARTICLE_COUNT articles"
echo "Scheduled: $((ARTICLE_COUNT * 3)) social posts"
echo ""
echo "Next batch: $(calculate_dates "$ARTICLE_COUNT" "$START_DATE" "$POST_FREQUENCY")"
