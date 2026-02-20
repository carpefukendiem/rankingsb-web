# CushionFoamz Daily Conversation Tracker
## Reddit Guerilla Marketing System

**Purpose:** Track active Reddit conversations for CushionFoamz responses  
**Updated:** Daily by Spike (research) + Ruben (responses)  
**Goal:** 3 quality responses per day

---

## 📁 FILE LOCATIONS (Quick Reference)

| File | Location | Purpose |
|------|----------|---------|
| **Latest Conversations** | `agents/spike/outputs/cushionfoamz/YYYY-MM-DD-conversations.md` | Spike's daily research |
| **All Conversations** | `business/cushionfoamz/01-marketing/reddit-campaigns/` | Archived by date |
| **Response Templates** | `business/cushionfoamz/03-guerilla/conversation-scripts/` | Copy-paste responses |
| **Daily Tracker** | `action-dashboard.html` | Visual tracker (this dashboard) |

---

## 🎯 TODAY'S TARGETS (Auto-Updated)

### High-Priority Subreddits
- r/DIY (couch repair, furniture fixes)
- r/HomeImprovement (outdoor cushions, seating)
- r/woodworking (bench cushions, built-ins)
- r/upholstery (foam replacement, restoration)
- r/ThriftStoreHauls (furniture restoration)
- r/Boating (marine cushions)
- r/RVLiving (RV cushions, small space)

### Search Queries Spike Runs
```
"sagging couch" OR "couch cushion" OR "sofa foam"
"outdoor cushion" OR "patio furniture" OR "deck seating"
"window seat cushion" OR "bench cushion" OR "breakfast nook"
"boat cushion" OR "marine foam" OR "cabin cushions"
"reupholster" OR "replace foam" OR "cushion replacement"
```

---

## 📊 RESPONSE TRACKING TEMPLATE

Use this format in daily conversation files:

```markdown
### Conversation #[N]
- **Subreddit:** r/[name]
- **URL:** [link]
- **Posted:** [time] ago
- **Engagement:** [upvotes] upvotes, [comments] comments
- **Status:** 🟡 NEW / 🟠 PENDING / 🟢 RESPONDED / ⚪ SKIP
- **Topic:** [brief description]

**Pre-written Response:**
```
[Copy-paste response here]
```

**Action:**
- [ ] Open URL
- [ ] Read full thread
- [ ] Post response (be helpful first)
- [ ] Mark as done below

**Posted by:** [Name] on [Date]
**Result:** [Upvotes/Reply/Ignore]
```

---

## 🔄 DAILY WORKFLOW

### Morning (8 AM - Spike Runs)
1. Spike searches Reddit for new conversations
2. Saves to: `agents/spike/outputs/cushionfoamz/YYYY-MM-DD-conversations.md`
3. Johnny 5 generates 3 pre-written responses
4. Updates `action-dashboard.html` conversation tracker

### Afternoon (2-3 PM - Ruben Executes)
1. Open `action-dashboard.html`
2. See "CushionFoamz Conversations" section
3. Click "Open Reddit" on each NEW conversation
4. Copy pre-written response
5. Post to Reddit (be helpful, not spammy)
6. Click "Mark Done"
7. Update conversation file with result

### Tracking
- Goal: 3 responses/day
- Target: 1-2 upvotes per response
- Avoid: Downvotes, deleted comments, bans

---

## 📝 RESPONSE GUIDELINES

### DO:
- Be genuinely helpful first
- Share personal experience ("I had the same issue...")
- Mention CushionFoamz casually as solution
- Include specific details (price, timeline, quality)
- Respond to follow-up questions
- Upvote the original post

### DON'T:
- Copy-paste same response everywhere
- Be overly promotional
- Post in irrelevant threads
- Ignore subreddit rules
- Post more than 1x per subreddit per day
- Use brand new Reddit accounts

### Tone Examples:

**Good:**
> "I had the same issue with my sagging couch! Ended up replacing just the foam inserts instead of buying a whole new sofa. Got custom ones from CushionFoamz for about $180 and it feels brand new. Way cheaper than replacement."

**Bad:**
> "Buy cushions from cushionfoamz.com! Best prices! Use code SAVE10!"

---

## 📈 SUCCESS METRICS

| Metric | Target | Track In |
|--------|--------|----------|
| Responses/day | 3 | action-dashboard.html |
| Upvotes/response | 2+ | Manual check |
| Website clicks | 5+/week | Google Analytics |
| Conversions | 1+/month | GHL pipeline |
| Subreddits active | 7 | This doc |

---

## 🚨 TROUBLESHOOTING

### Can't Find Conversations
- Spike API rate limit: Wait 1 hour, retry
- Try different search terms
- Check less popular subreddits
- Search by "new" not "hot"

### Responses Getting Downvoted
- Too promotional? Rewrite to be more helpful
- Wrong subreddit? Find better fit
- Bad timing? Post when thread is fresh

### No Website Traffic
- Add subtle URL mention (not just brand name)
- Include specific product page links
- Track with UTM codes

---

## 🔗 QUICK LINKS

- **Action Dashboard:** `action-dashboard.html` (visual tracker)
- **Spike Output:** `agents/spike/outputs/cushionfoamz/`
- **Response Scripts:** `business/cushionfoamz/03-guerilla/conversation-scripts/`
- **Campaign Archive:** `business/cushionfoamz/01-marketing/reddit-campaigns/`
- **Calendar Reminder:** "Post 3 Reddit responses - check action-dashboard.html"

---

*Last Updated: February 20, 2026*  
*Next Review: Weekly*
