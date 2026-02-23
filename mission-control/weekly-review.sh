#!/bin/zsh
# weekly-review.sh - Helper script to compile weekly reviews
# Usage: ./weekly-review.sh [YYYY-MM-DD]
# If no date provided, assumes current week (most recent Friday)

REVIEW_DATE=${1:-$(date +%Y-%m-%d)}
WEEK_DIR="/Users/rubenruiz/.openclaw/workspace/mission-control"
MEMORY_DIR="/Users/rubenruiz/.openclaw/workspace/memory"
OUTPUT_FILE="$WEEK_DIR/weekly-review-$REVIEW_DATE.md"

echo "📝 Generating Weekly Review for week ending $REVIEW_DATE"
echo "   Output: $OUTPUT_FILE"
echo ""

# Calculate week range (Sunday to Saturday, or Monday to Friday depending on preference)
# Using Monday-Friday work week
echo "📅 Finding memory files for the week..."

# Get the Monday of this week (assuming REVIEW_DATE is Friday/Saturday)
if command -v gdate &> /dev/null; then
    # macOS with coreutils
    END_DATE=$(gdate -d "$REVIEW_DATE" +%s 2>/dev/null || date -j -f "%Y-%m-%d" "$REVIEW_DATE" +%s)
    START_DATE=$(gdate -d "$REVIEW_DATE - 4 days" +%Y-%m-%d 2>/dev/null || date -j -v-4d -f "%Y-%m-%d" "$REVIEW_DATE" +%Y-%m-%d)
else
    # macOS date command (BSD)
    START_DATE=$(date -j -v-4d -f "%Y-%m-%d" "$REVIEW_DATE" +%Y-%m-%d 2>/dev/null || echo "")
fi

echo "   Week range: $START_DATE to $REVIEW_DATE"
echo ""

# Check for memory files
echo "📂 Memory files found:"
found_files=()
for i in {0..6}; do
    check_date=$(date -j -v-${i}d -f "%Y-%m-%d" "$REVIEW_DATE" +%Y-%m-%d 2>/dev/null || echo "")
    if [[ -f "$MEMORY_DIR/$check_date.md" ]]; then
        echo "   ✅ $check_date.md"
        found_files+=("$MEMORY_DIR/$check_date.md")
    fi
done

if [[ ${#found_files[@]} -eq 0 ]]; then
    echo "   ⚠️  No memory files found for this week"
    echo "   Create daily notes in memory/YYYY-MM-DD.md for automatic compilation"
fi

echo ""
echo "🎯 Next steps:"
echo "   1. Copy template: cp $WEEK_DIR/weekly-review-template.md $OUTPUT_FILE"
echo "   2. Fill in metrics from your dashboards"
echo "   3. Review memory files above for wins and learnings"
echo "   4. Complete the review and save"
echo ""
echo "💡 To share to Discord:"
echo "   openclaw message send --target #channel --file $OUTPUT_FILE"
echo ""
echo "✨ Done!"
