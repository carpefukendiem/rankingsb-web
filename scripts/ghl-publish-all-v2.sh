#!/bin/bash
# Publish all Rankingsb articles with full HTML content

cd ~/.openclaw/workspace
export GHL_API_KEY="pit-0ab4c82b-c4b2-4493-b7e5-fd8e94343813"

# Skip BATCH-1-SUMMARY.md as it's not a real article
ARTICLES=(
    "content/seo-articles/appliance-repair-seo-santa-barbara.md"
    "content/seo-articles/appliance-repair-seo-ventura.md"
    "content/seo-articles/chiropractor-seo-santa-barbara.md"
    "content/seo-articles/dental-seo-santa-barbara.md"
    "content/seo-articles/hvac-seo-ventura.md"
    "content/seo-articles/medical-seo-santa-barbara.md"
    "content/seo-articles/personal-injury-lawyer-seo-santa-barbara.md"
    "content/seo-articles/plumbing-seo-santa-barbara.md"
    "content/seo-articles/plumbing-seo-ventura.md"
    "content/seo-articles/roofing-seo-santa-barbara.md"
    "content/seo-articles/roofing-seo-ventura.md"
    "content/seo-articles/solar-seo-santa-barbara.md"
    "content/seo-articles/solar-seo-ventura.md"
)

echo "🚀 Publishing all Rankingsb articles with full content..."
echo "=========================================================="
echo ""

SUCCESS=0
FAILED=0

for article in "${ARTICLES[@]}"; do
    if node scripts/ghl-publish-v2.js "$article"; then
        SUCCESS=$((SUCCESS + 1))
    else
        FAILED=$((FAILED + 1))
    fi
    echo "---"
done

echo ""
echo "=========================================================="
echo "📊 Results:"
echo "   ✅ Published: $SUCCESS"
echo "   ❌ Failed: $FAILED"
echo ""

if [ $FAILED -eq 0 ]; then
    echo "🎉 All articles published successfully!"
else
    echo "⚠️  Some articles failed. Check errors above."
fi
