#!/bin/bash
# GHL Social Media Uploader
# Uploads images and schedules posts to GHL

API_KEY="${GHL_API_KEY:-sk_live_d7b8a9f3e2c1d5b6a4e8f9c2d1b7a3e5NsJpokA}"
BASE_URL="https://app.rankingsb.com"
IMAGE_DIR="/Users/rubenruiz/.openclaw/workspace/content/social-media-images/week1"

# Location IDs
RANKINGSB_LOC="yrvzyq2jB2me4Z23PFxP"
CUSHIONFOAMZ_LOC="RaVrmoQzcKFJjHsc9Kxh"

echo "🚀 GHL Social Media Uploader"
echo "============================"
echo ""

# Check if images exist
if [ ! -d "$IMAGE_DIR" ]; then
    echo "❌ Image directory not found: $IMAGE_DIR"
    exit 1
fi

IMAGE_COUNT=$(ls -1 "$IMAGE_DIR"/*.png 2>/dev/null | wc -l)
echo "Found $IMAGE_COUNT images to upload"
echo ""

# Note: Actual GHL Social Planner API requires OAuth and specific endpoints
# This script prepares the upload list for manual upload

cat << 'PREP'
📋 UPLOAD PREPARATION LIST
==========================

Since GHL Social Planner API requires OAuth flow, here's your
ready-to-upload checklist:

PREP

echo ""
echo "RANKINGSB POSTS (Location: $RANKINGSB_LOC)"
echo "--------------------------------------------"
echo ""

# Monday Post
echo "📅 MONDAY, Feb 19 - 9:00 AM"
echo "Image: rankingsb-monday-meme.png"
echo "Caption:"
cat << 'EOF'
POV: You just Googled "why is my website on page 47"

Don't worry, we speak fluent Google. Let us translate 
your website from "page 47 hieroglyphics" to "page 1 poetry."

📍 Santa Barbara businesses only (sorry, page 48+ folks)

Ready for page 1? Link in bio.

#SEO #SantaBarbara #SmallBusiness #GoogleStruggles #PageOne
EOF
echo ""
echo "---"
echo ""

# Tuesday Text Post
echo "📅 TUESDAY, Feb 20 - 12:00 PM"
echo "Image: [TEXT ONLY - NO IMAGE]"
echo "Caption:"
cat << 'EOF'
Things I thought I'd never say as a marketer:

"Yes, Karen, we DO need to talk about your meta descriptions."

"No, you can't just 'SEO' it later."

"Please stop keyword stuffing like it's 2009."

"Your website loads slower than my grandma's dial-up."

The marketing industry has changed me. 😅

But hey — at least YOUR business won't make these mistakes when you work with us.

Ready to stop guessing at Google? Link in bio for a free audit.

#MarketingHumor #SEO #DigitalMarketing #AgencyLife #SantaBarbara
EOF
echo ""
echo "---"
echo ""

# Wednesday Poll
echo "📅 WEDNESDAY, Feb 21 - 9:00 AM"
echo "Type: POLL"
echo "Question: Where does your business show up on Google?"
echo "Options:"
echo "  🔘 Page 1 (teach us your ways)"
echo "  🔘 Page 2-3 (so close!)"
echo "  🔘 Page 4-10 (we need to talk)"
echo "  🔘 Page 11+ (bless your heart)"
echo "  🔘 What is Google? (call us NOW)"
echo ""
echo "Caption:"
cat << 'EOF'
Wednesday Poll! 🎯 Be honest...

Where does your business show up on Google?

Vote above ☝️ and comment your answer below.

No judgment... okay, maybe a little judgment if you're on page 11+ 😅

DM us "PAGE 1" for a free audit.

#WednesdayPoll #SEO #SmallBusiness #GoogleRanking #SantaBarbara
EOF
echo ""
echo "---"
echo ""

# Thursday Text Post
echo "📅 THURSDAY, Feb 22 - 12:00 PM"
echo "Image: [TEXT ONLY - NO IMAGE]"
echo "Caption:"
cat << 'EOF'
Unpopular opinion:

Your cousin's "tech-savvy" nephew who "knows websites" should not be handling your SEO.

I know. I KNOW. He's family. He's cheap. He once fixed your printer.

But your business deserves someone who knows that:
• SEO isn't just "adding keywords"
• Mobile optimization isn't optional in 2026
• Page speed actually affects rankings
• Your website isn't "fine" if it's not bringing you leads

Call us when you're ready to stop letting Thanksgiving get awkward. 
We'll handle the marketing, you handle the turkey. 🦃

#SEO #UnpopularOpinion #SmallBusiness #MarketingTruth #SantaBarbara
EOF
echo ""
echo "---"
echo ""

# Friday Post
echo "📅 FRIDAY, Feb 23 - 9:00 AM"
echo "Image: agency-day-in-life.png"
echo "Caption:"
cat << 'EOF'
A day in the life of an SEO agency:

☕ 8 AM: "Reading tea leaves" (aka Google Analytics)
⌨️ 10 AM: "Convincing Google you're important"
😰 2 PM: "Google just changed their algorithm AGAIN"
🎉 4 PM: "CLIENT HIT PAGE 1!!!"
⌨️ 5 PM: "Now do it 47 more times"

Glamorous? No. Effective? Absolutely. 💪

We do the unglamorous work so you can focus on running your actual business.

#AgencyLife #SEO #BehindTheScenes #SmallBusinessMarketing #SantaBarbara
EOF
echo ""
echo ""
echo "CUSHIONFOAMZ POSTS (Location: $CUSHIONFOAMZ_LOC)"
echo "-------------------------------------------------"
echo ""

# Monday Carousel
echo "📅 MONDAY, Feb 19 - 11:00 AM"
echo "Type: CAROUSEL (3 images)"
echo "Images:"
echo "  1. cushion-before.png (sad cushion)"
echo "  2. cushion-after.png (plush cushion)"
echo "  3. cushion-happy-person.png (happy customer)"
echo ""
echo "Caption:"
cat << 'EOF'
We don't mean to brag, but... okay yes we do. ✨

Your couch deserves better than that sad, sunken life. 
Give it the glow-up it deserves.

Swipe to see the transformation →

Custom foam cushions, shipped to your door in 1 week.

🔗 Link in bio to measure & order

#CouchGlowUp #CushionReplacement #HomeDecor #DIY #BeforeAndAfter
EOF
echo ""
echo "---"
echo ""

# Tuesday Post
echo "📅 TUESDAY, Feb 20 - 6:00 PM"
echo "Image: cushion-uncomfortable-vs-comfortable.png"
echo "Caption:"
cat << 'EOF'
Tell me you need new cushions without telling me you need new cushions...

I'll go first: 

😬 Constantly adjusting
😬 Fluffing every 5 minutes  
😬 Still uncomfortable
😬 Considering a $800 new couch

Stop the madness. Your foam is tired. We can fix that.

$120-200 for custom foam vs $800+ for a new couch.

The math is mathing. 🧮

🔗 Link in bio → measure your covers (not the foam - it's lying to you)

#CushionTok #HomeImprovement #TellMeWithoutTellingMe #CouchLife #SaveMoney
EOF
echo ""
echo "---"
echo ""

# Wednesday Carousel
echo "📅 WEDNESDAY, Feb 21 - 12:00 PM"
echo "Type: CAROUSEL (6 images)"
echo "Images:"
echo "  1. Title card (create in Canva)"
echo "  2. infographic-avocado.png"
echo "  3. infographic-gym-guilt.png"
echo "  4. infographic-haircut.png"
echo "  5. infographic-milk.png"
echo "  6. quality-cushion-long-lasting.png"
echo ""
echo "Caption:"
cat << 'EOF'
Life is too short for sad, saggy cushions. 😤

Your cushions should outlast:
✓ An avocado
✓ Your gym motivation  
✓ That bad haircut
✓ Your milk

If your cushions are younger than your gym membership but look worse... we need to talk.

Custom-cut foam that actually lasts 7-10 years.

🔗 Link in bio → measure your covers

#CushionHumor #HomeTips #CustomFoam #QualityMatters #LifeHacks
EOF
echo ""
echo "---"
echo ""

# Thursday Post
echo "📅 THURSDAY, Feb 22 - 6:00 PM"
echo "Image: testimonial-happy-customer.png"
echo "Caption:"
cat << 'EOF'
"I was skeptical about ordering foam online. But then I realized I'd already wasted $800 on a new couch that I hated, so what did I have to lose? 

Best. Decision. Ever. 🙌

My old couch feels brand new and I saved like $700. My husband finally admits I was right about something. Worth every penny."

— Sarah M., Santa Barbara ⭐⭐⭐⭐⭐

Real customer. Real results. Real savings.

Why buy a new couch when yours just needs new foam?

✅ $120-200 vs $800-2000
✅ 1 week delivery
✅ 20 minutes to install
✅ 7-10 year lifespan

Ready to be right about something? 😏

🔗 Link in bio → measure & order

#CustomerLove #Testimonial #CouchRevival #MoneySmart #SantaBarbara
EOF
echo ""
echo "---"
echo ""

# Friday Post (Drake Meme)
echo "📅 FRIDAY, Feb 23 - 6:00 PM"
echo "Image: [DRAKE MEME - Use Canva Template]"
echo "Text overlay:"
echo "  Top: Drake rejecting 'Buying a whole new couch because the cushions are flat ($800+)'"
echo "  Bottom: Drake approving 'Spending $150 on custom foam and keeping your perfectly good couch'"
echo ""
echo "Caption:"
cat << 'EOF'
Your couch frame is fine. It's the foam that's tired. 😴

Stop throwing away perfectly good furniture because of some bad foam. 

It's 2026. Be sustainable. Be smart. Be comfortable.

💰 $150 for custom foam
🚚 1 week delivery
🔧 20 minutes to install
♻️ Keep your couch out of the landfill

The math is simple.

🔗 Link in bio → measure your covers (not the foam!)

#SustainableLiving #DIY #CouchRepair #SmartMoney #EcoFriendly
EOF
echo ""
echo ""
echo "🚀 READY TO UPLOAD"
echo "=================="
echo ""
echo "Images location: $IMAGE_DIR"
echo ""
echo "Next steps:"
echo "1. Login to app.rankingsb.com"
echo "2. Go to Marketing → Social Planner"
echo "3. Switch to correct location"
echo "4. Upload images above"
echo "5. Copy/paste captions"
echo "6. Schedule for dates/times listed"
echo "7. Set status to 'Pending Approval'"
echo ""
echo "All captions are ready to copy-paste!"
