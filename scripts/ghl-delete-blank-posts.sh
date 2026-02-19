#!/bin/bash
# Delete blank blog posts from GHL
# Uses the post IDs from publishing log

GHL_API_KEY="${GHL_API_KEY:-pit-0ab4c82b-c4b2-4493-b7e5-fd8e94343813}"
GHL_BASE_URL="https://services.leadconnectorhq.com"
LOCATION_ID="yrvzyq2jB2me4Z23PFxP"
BLOG_ID="G1q5FleYQWsPcZ49hrJY"

# Post IDs to delete (the blank ones)
POST_IDS=(
    "69978c0f18c76fa889d4f6b3"
    "69978c17af094a664877c8b5"
    "69978c19da7570aa92c637c8"
    "69978c1b685e626ed25d1446"
    "69978c1daf094a5a5c77c8f1"
    "69978c1e685e62f62c5d1467"
    "69978c1faf094a66cd77c90e"
    "69978c2118c76fc12bd4f73f"
    "69978c22da75708822c63814"
    "69978c24da757063b0c63834"
    "69978c2518c76f45efd4f771"
    "69978c27af094a62ca77c957"
    "69978c2ada75708989c6387e"
    "69978c2b18c76f0560d4f7ad"
    "69978c2dda757014dbc638a7"
    "69978c2e685e6290c25d1517"
)

echo "🗑️  Deleting blank blog posts..."
echo "================================"

for POST_ID in "${POST_IDS[@]}"; do
    echo "Deleting: $POST_ID"
    
    response=$(curl -s -X DELETE "${GHL_BASE_URL}/blogs/posts/${POST_ID}" \
        -H "Authorization: Bearer ${GHL_API_KEY}" \
        -H "Version: 2021-07-28" \
        -H "X-Location-Id: ${LOCATION_ID}" \
        -H "Content-Type: application/json" \
        -d "{\"locationId\": \"${LOCATION_ID}\", \"blogId\": \"${BLOG_ID}\"}" 2>&1)
    
    if [ $? -eq 0 ]; then
        echo "   ✅ Deleted"
    else
        echo "   ❌ Failed: $response"
    fi
    
    sleep 0.5
done

echo ""
echo "✅ Cleanup complete"
