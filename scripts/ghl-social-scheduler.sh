#!/bin/bash
# GHL Social Media Auto-Scheduler v1.0
# Schedule posts to all connected social platforms
# Usage: ./ghl-social-scheduler.sh "Post content" [YYYY-MM-DD HH:MM] [location_id]

# Configuration
API_KEY="sk_live_d7b8a9f3e2c1d5b6a4e8f9c2d1b7a3e5NsJpokA"
BASE_URL="https://app.rankingsb.com"

# Arguments
CONTENT="$1"
SCHEDULE_TIME="${2:-$(date -u -d '+1 hour' +'%Y-%m-%d %H:%M')}"  # Default: 1 hour from now
LOCATION_ID="${3:-main}"
PLATFORM="${4:-all}"  # all, facebook, instagram, linkedin, twitter

if [ -z "$CONTENT" ]; then
    echo "❌ Usage: $0 \"Your post content\" [\"YYYY-MM-DD HH:MM\"] [location_id] [platform]"
    echo "   Example: $0 \"Check out our new blog post!\" \"2026-02-20 14:00\" rankingsb facebook"
    exit 1
fi

echo "🚀 GHL Social Media Scheduler Starting..."
echo "=========================================="
echo "Content: ${CONTENT:0:60}..."
echo "Schedule: $SCHEDULE_TIME"
echo "Location: $LOCATION_ID"
echo "Platform: $PLATFORM"
echo ""

# Convert schedule time to ISO 8601
SCHEDULE_ISO=$(date -u -d "$SCHEDULE_TIME" +'%Y-%m-%dT%H:%M:%S.000Z' 2>/dev/null || echo "invalid")

if [ "$SCHEDULE_ISO" = "invalid" ]; then
    echo "❌ Invalid date format. Use: YYYY-MM-DD HH:MM"
    exit 1
fi

echo "📅 Scheduled for: $SCHEDULE_ISO"
echo ""

# Get social accounts for location (in production, this would be an API call)
# For now, we'll use placeholder account IDs
declare -A PLATFORM_ACCOUNTS[
facebook]="facebook_account_id"
instagram]="instagram_account_id"
linkedin]="linkedin_account_id"
twitter]="twitter_account_id"
)

# Build JSON payload for social post
build_payload() {
    local platform="$1"
    local account_id="${PLATFORM_ACCOUNTS[$platform]}"
    
    cat <<EOF
{
  "postType": "post",
  "accounts": ["$account_id"],
  "content": [
    {
      "type": "text",
      "text": $(echo "$CONTENT" | jq -Rs .)
    }
  ],
  "schedule": {
    "date": "$SCHEDULE_ISO"
  },
  "status": "scheduled"
}
EOF
}

echo "📤 Preparing social posts..."
echo ""

# Determine which platforms to post to
if [ "$PLATFORM" = "all" ]; then
    TARGET_PLATFORMS=("facebook" "instagram" "linkedin")
else
    TARGET_PLATFORMS=("$PLATFORM")
fi

# Preview posts
for platform in "${TARGET_PLATFORMS[@]}"; do
    echo "📱 $platform:"
    echo "   Account: ${PLATFORM_ACCOUNTS[$platform]}"
    echo "   Content: ${CONTENT:0:50}..."
    echo "   Schedule: $SCHEDULE_ISO"
    echo ""
done

echo "🔧 API Configuration:"
echo "   Endpoint: POST ${BASE_URL}/api/social-media-posting/${LOCATION_ID}/posts"
echo "   Authorization: Bearer ${API_KEY:0:20}..."
echo ""

echo "⚠️  TEST MODE: API calls disabled for safety"
echo "   To enable scheduling, uncomment the curl commands below"
echo ""

# Actual API calls (uncomment when ready):
# for platform in "${TARGET_PLATFORMS[@]}"; do
#     payload=$(build_payload "$platform")
#     
#     response=$(curl -s -X POST "${BASE_URL}/api/social-media-posting/${LOCATION_ID}/posts" \
#       -H "Authorization: Bearer ${API_KEY}" \
#       -H "Content-Type: application/json" \
#       -d "$payload" 2>&1)
#     
#     if [ $? -eq 0 ]; then
#         echo "✅ $platform: Scheduled successfully"
#     else
#         echo "❌ $platform: Failed"
#         echo "   Error: $response"
#     fi
# done

echo "✅ Scheduling complete!"
echo ""
echo "Next steps:"
echo "1. Get actual social account IDs from GHL"
echo "2. Uncomment API calls in script"
echo "3. Test with one post"
echo "4. Schedule batch posts"
PLATFORM_ACCOUNTS[
