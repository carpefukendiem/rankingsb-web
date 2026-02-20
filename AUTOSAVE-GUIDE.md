# AUTOSAVE SYSTEM - COMPLETE GUIDE
## Never Lose Work Again

**Status:** ✅ Ready to activate  
**Function:** Auto-commits all changes every 2 minutes  
**Result:** Zero data loss on unexpected session close

---

## 🚀 ACTIVATE NOW (30 seconds)

Run this command:

```bash
./make-autosave-default.sh
```

**What it does:**
1. ✅ Enables autosave in config
2. ✅ Creates shell hooks for auto-start
3. ✅ Adds to your shell profile
4. ✅ Starts the daemon now
5. ✅ Sets up git hooks

**Done.** Autosave is now your default.

---

## 📋 HOW IT WORKS

### Every 2 Minutes:
```
1. Check for file changes
2. git add -A (stage all changes)
3. git commit -m "Autosave: timestamp"
4. Log the save
```

### If Session Crashes:
- Latest commit = your work is saved
- Restart session → git log → find last commit
- All work preserved up to last 2-minute interval

---

## 🎮 CONTROLS

### Check Status
```bash
./autosave.sh status
```

### Start Autosave
```bash
./autosave.sh start
```

### Stop Autosave
```bash
./autosave.sh stop
```

### Force Immediate Save
```bash
./autosave.sh now
```

### View Recent Saves
```bash
./autosave.sh log
```

### Enable/Disable
```bash
./autosave.sh enable   # Turn on
./autosave.sh disable  # Turn off
```

### Edit Config
```bash
./autosave.sh config
```

---

## ⚙️ CONFIGURATION OPTIONS

Edit `.autosave-config`:

```bash
# Enable/disable
AUTOSAVE_ENABLED=true

# How often to save (seconds)
AUTOSAVE_INTERVAL=120  # 2 minutes

# Auto-push to GitHub (optional)
AUTO_PUSH_REMOTE="origin"
PUSH_AFTER_SAVES=5

# What to exclude
EXCLUDE_DIRS="node_modules .git"
```

---

## 📊 WHAT GETS SAVED

### Automatically Saved:
- ✅ All file edits
- ✅ New files created
- ✅ Deleted files
- ✅ Git commits you make manually
- ✅ Configuration changes

### Log Location:
```
~/.openclaw/workspace/.autosave.log
```

### Commit History:
```bash
git log --oneline
# Shows: "Autosave: 2026-02-20 04:15:23 - Workspace sync"
```

---

## 🔍 VERIFY IT'S WORKING

### 1. Check Status
```bash
./autosave.sh status
```
Should show: ✅ Autosave is RUNNING

### 2. Watch It Work
```bash
tail -f ~/.openclaw/workspace/.autosave.log
```
You'll see saves happening every 2 minutes

### 3. Test Crash Recovery
1. Edit a file
2. Wait 2+ minutes
3. Check: `git log -1`
4. See your autosave commit

---

## 🚨 EMERGENCY RECOVERY

### Session Crashed? Here's How to Recover:

**Step 1:** Re-enter workspace
```bash
cd ~/.openclaw/workspace
```

**Step 2:** Check last commits
```bash
git log --oneline -10
```

**Step 3:** See what was saved
```bash
git show HEAD  # Latest save
git diff HEAD~1  # What changed in last save
```

**Step 4:** Restore if needed
```bash
git checkout HEAD -- filename  # Restore specific file
git reset --hard HEAD  # Restore entire workspace to last save
```

---

## 💡 BEST PRACTICES

### Do:
- ✅ Let autosave run in background
- ✅ Use `./autosave.sh now` before important operations
- ✅ Check `./autosave.sh log` if unsure
- ✅ Keep `AUTOSAVE_ENABLED=true`

### Don't:
- ❌ Panic if you forget to save
- ❌ Turn off autosave unless necessary
- ❌ Worry about "too many commits" - we can clean up later

---

## 🔧 TROUBLESHOOTING

### "Autosave is not running"
```bash
./autosave.sh start
```

### "Permission denied"
```bash
chmod +x autosave.sh scripts/autosave-daemon.sh
```

### "Git not initialized"
```bash
git init
git add .
git commit -m "Initial commit"
./autosave.sh start
```

### "Want to stop autosave temporarily"
```bash
./autosave.sh stop
# Do your work
./autosave.sh start  # Restart when done
```

---

## 📈 ADVANCED: AUTO-PUSH TO GITHUB

**To also push to GitHub automatically:**

1. Set remote in config:
```bash
# Edit .autosave-config
AUTO_PUSH_REMOTE="origin"
PUSH_AFTER_SAVES=5  # Push every 5 saves (10 min)
```

2. Ensure GitHub access:
```bash
git remote -v  # Check origin is set
git push origin main  # Test manual push first
```

3. Autosave will now push automatically

---

## 🎯 SUMMARY

| Feature | Status |
|---------|--------|
| Auto-commit every 2 min | ✅ |
| Crash recovery | ✅ |
| Shell integration | ✅ |
| Git hooks | ✅ |
| Configurable | ✅ |
| Optional auto-push | ✅ |

**Your work is now bulletproof.**

Even if:
- Session crashes
- Power goes out
- Browser closes unexpectedly
- Computer restarts

**Your latest work is saved in git, ready to recover.**

---

**Activate now:**
```bash
./make-autosave-default.sh
```

*Then forget about it and work worry-free.* 💪
