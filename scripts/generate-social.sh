#!/bin/bash
#
# Social Media Content Generator
# Usage: ./scripts/generate-social.sh rankingsb --days=7 --platforms=instagram,linkedin
#

BRAND="${1:-rankingsb}"
DAYS="${2:-7}"
PLATFORMS="${3:-instagram,linkedin,facebook}"

echo "📱 Generating social content for $BRAND"
echo "   Days: $DAYS"
echo "   Platforms: $PLATFORMS"
echo ""

OUTPUT_DIR="creative/generated/$(date +%Y-%m-%d)-$BRAND-social"
mkdir -p "$OUTPUT_DIR"

# Generate content ideas
cat > "$OUTPUT_DIR/content-plan.md" << EOF
# Social Media Content Plan - $BRAND
**Generated:** $(date)
**Period:** $DAYS days
**Platforms:** $PLATFORMS

## Content Themes

### Week Focus
- [ ] Educational (SEO tips, industry insights)
- [ ] Social Proof (case studies, testimonials)
- [ ] Behind the Scenes (team, process)
- [ ] Promotional (offers, services)
- [ ] Engagement (questions, polls)

## Daily Posts

EOF

# Generate post templates
for i in $(seq 1 $DAYS); do
  cat >> "$OUTPUT_DIR/content-plan.md" << EOF
### Day $i

**Platform:** ${PLATFORMS//,/ | }
**Type:** [Carousel | Single Image | Story | Reel]
**Hook:** [Write attention-grabbing first line]
**Body:**
[Main content - 2-3 sentences]
[Benefit or value proposition]
[Call to action]

**Hashtags:**
#LocalSEO #SmallBusiness #[Industry] #[Location]

**Visual:**
- [ ] Generate with Nano Banana
- [ ] Apply brand colors
- [ ] Add logo
- [ ] Export all sizes

---

EOF
done

echo "✅ Content plan created: $OUTPUT_DIR/content-plan.md"
echo ""
echo "🎨 Next steps:"
echo "   1. Review and customize content plan"
echo "   2. Generate images: nano-banana \"[description]\""
echo "   3. Apply brand: Use templates/ dir"
echo "   4. Schedule: Upload to Buffer or GHL"
