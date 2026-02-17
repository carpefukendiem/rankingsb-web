# 🎬 Seedance2 Automation Runbook
## Agent: Videobot-1 | CushionFoamz Video Generation

**Created:** February 17, 2026 - 12:30 AM  
**Status:** Ready for execution

---

## 📋 MISSION SUMMARY

Generate **12 marketing videos** for CushionFoamz:
- 4 video concepts
- 3 durations each (10s, 15s, 30s)
- Platform: seedance2.ai
- Output: business/cushionfoamz/videos/

---

## 🎥 VIDEO QUEUE

### Video Set 1: Couch Fix Transformation
| Duration | File | Status |
|----------|------|--------|
| 10s | cushionfoamz-couch-fix-10s.mp4 | ⬜ Pending |
| 15s | cushionfoamz-couch-fix-15s.mp4 | ⬜ Pending |
| 30s | cushionfoamz-couch-fix-30s.mp4 | ⬜ Pending |

### Video Set 2: How to Measure
| Duration | File | Status |
|----------|------|--------|
| 10s | cushionfoamz-how-to-measure-10s.mp4 | ⬜ Pending |
| 15s | cushionfoamz-how-to-measure-15s.mp4 | ⬜ Pending |
| 30s | cushionfoamz-how-to-measure-30s.mp4 | ⬜ Pending |

### Video Set 3: Boat Cushion Rescue
| Duration | File | Status |
|----------|------|--------|
| 10s | cushionfoamz-boat-rescue-10s.mp4 | ⬜ Pending |
| 15s | cushionfoamz-boat-rescue-15s.mp4 | ⬜ Pending |
| 30s | cushionfoamz-boat-rescue-30s.mp4 | ⬜ Pending |

### Video Set 4: Patio Glow-Up
| Duration | File | Status |
|----------|------|--------|
| 10s | cushionfoamz-patio-glowup-10s.mp4 | ⬜ Pending |
| 15s | cushionfoamz-patio-glowup-15s.mp4 | ⬜ Pending |
| 30s | cushionfoamz-patio-glowup-30s.mp4 | ⬜ Pending |

---

## 🔐 LOGIN CREDENTIALS

**URL:** https://seedance2.ai/  
**Email:** rubenstips@gmail.com  
**Plan:** Basic (year subscription)

---

## ⚡ EXECUTION STEPS

### Step 1: Read Prompts
```bash
ls business/cushionfoamz/video-prompts/
cat business/cushionfoamz/video-prompts/couch-fix-10s.txt
```

### Step 2: Open Browser Tabs
- Tab 1: Couch Fix videos
- Tab 2: How to Measure videos  
- Tab 3: Boat Rescue videos
- Tab 4: Patio Glow-up videos

### Step 3: For Each Video:
1. Click "Create New Video" or "+"
2. Paste prompt from .txt file
3. Select settings:
   - Aspect Ratio: 16:9
   - Duration: [10s/15s/30s]
   - Style: [Commercial/Tutorial/Lifestyle]
4. Click Generate
5. Wait 1-2 minutes
6. Download MP4
7. Save to: `business/cushionfoamz/videos/[filename]`

### Step 4: Batch Strategy
**Wave 1:** Submit all 4 × 10s videos (4 tabs, ~8 min)
**Wave 2:** Submit all 4 × 15s videos (4 tabs, ~8 min)
**Wave 3:** Submit all 4 × 30s videos (4 tabs, ~10 min)

**Total time:** ~30 minutes

---

## 📁 OUTPUT DIRECTORY

```
business/cushionfoamz/
├── video-prompts/          # Input prompts (ready ✓)
└── videos/                 # Output videos (create this)
    ├── cushionfoamz-couch-fix-10s.mp4
    ├── cushionfoamz-couch-fix-15s.mp4
    ├── cushionfoamz-couch-fix-30s.mp4
    ├── cushionfoamz-how-to-measure-10s.mp4
    ├── cushionfoamz-how-to-measure-15s.mp4
    ├── cushionfoamz-how-to-measure-30s.mp4
    ├── cushionfoamz-boat-rescue-10s.mp4
    ├── cushionfoamz-boat-rescue-15s.mp4
    ├── cushionfoamz-boat-rescue-30s.mp4
    ├── cushionfoamz-patio-glowup-10s.mp4
    ├── cushionfoamz-patio-glowup-15s.mp4
    └── cushionfoamz-patio-glowup-30s.mp4
```

---

## ✅ QUALITY CHECKLIST

For each video, verify:
- [ ] MP4 file downloaded successfully
- [ ] File size > 1MB (indicates actual video)
- [ ] Duration matches specification
- [ ] cushionfoamz.com URL visible in video
- [ ] Aspect ratio is 16:9

---

## 📊 PROGRESS TRACKER

| Wave | Videos | Status | Time |
|------|--------|--------|------|
| 10s versions | 4 | ⬜ | ___ |
| 15s versions | 4 | ⬜ | ___ |
| 30s versions | 4 | ⬜ | ___ |

**Started:** ___  
**Completed:** ___  
**Total Time:** ___

---

## 🎯 SUCCESS CRITERIA

- All 12 videos generated and downloaded
- Files organized in business/cushionfoamz/videos/
- 10s versions ready for TikTok/Reels
- 15s versions ready for Instagram/YouTube
- 30s versions ready for website/ads

---

**Agent:** Videobot-1  
**Mission:** Generate 12 CushionFoamz marketing videos  
**Priority:** HIGH  
**ETA:** 30 minutes from start

**Ready to execute!**
