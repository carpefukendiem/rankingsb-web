# DROPBOX SYNC SETUP
## Auto-Sync Workspace to Dropbox
### February 16, 2026

---

## 🎯 SYNC STRATEGY

**Source:** `/Users/rubenruiz/.openclaw/workspace/`  
**Destination:** `~/Dropbox/Johnny5-Workspace/`

**What syncs:**
- ✅ All markdown files
- ✅ Content folder
- ✅ Business folders
- ✅ Dashboard files
- ✅ Git repository

**What doesn't sync:**
- ❌ Node modules
- ❌ Temp files
- ❌ Large binaries

---

## 📂 FOLDER STRUCTURE IN DROPBOX

```
Dropbox/
└── Johnny5-Workspace/
    ├── 📄 Dashboard Files/
    │   ├── dashboard.html
    │   ├── COMMAND-CENTER.md
    │   ├── TOKEN-TRACKER.md
    │   └── RUBEN-TODO-DASHBOARD.md
    │
    ├── 🏢 Rankingsb/
    │   ├── Sales/
    │   ├── Content/
    │   └── Clients/
    │
    ├── 🛋️ CushionFoamz/
    │   ├── Marketing/
    │   └── Content/
    │
    ├── 📝 Content Library/
    │   ├── SEO Articles/
    │   └── Templates/
    │
    └── ⚙️ System/
        ├── Setup Guides/
        └── Scripts/
```

---

## 🔄 SYNC METHOD 1: Symlink (RECOMMENDED)

### Create Symlinks:

```bash
# Create Dropbox folder
mkdir -p ~/Dropbox/Johnny5-Workspace

# Sync entire workspace
ln -s ~/.openclaw/workspace ~/Dropbox/Johnny5-Workspace/live-workspace

# Or sync specific folders
ln -s ~/.openclaw/workspace/content ~/Dropbox/Johnny5-Workspace/content
ln -s ~/.openclaw/workspace/business ~/Dropbox/Johnny5-Workspace/business
```

**How it works:**
- Changes in workspace → Auto-sync to Dropbox
- Changes in Dropbox → Sync back to workspace
- Real-time, automatic

---

## 🔄 SYNC METHOD 2: Rsync Script

### Create Sync Script:

```bash
# Create sync script
nano ~/sync-to-dropbox.sh
```

```bash
#!/bin/bash

# Sync workspace to Dropbox
rsync -avz --delete \
  --exclude='node_modules' \
  --exclude='.git' \
  --exclude='*.tmp' \
  ~/.openclaw/workspace/ \
  ~/Dropbox/Johnny5-Workspace/

echo "Synced at $(date)"
```

```bash
# Make executable
chmod +x ~/sync-to-dropbox.sh

# Run manually
~/sync-to-dropbox.sh

# Or schedule (every hour)
echo "0 * * * * ~/sync-to-dropbox.sh" | crontab -
```

---

## 🔄 SYNC METHOD 3: Dropbox CLI

### Install Dropbox CLI:

```bash
# Install dropbox-cli
brew install dropbox-cli

# Authenticate
dropbox-cli start
dropbox-cli autostart y
```

### Sync Specific Files:

```bash
# Add files to Dropbox
dropbox-cli add ~/.openclaw/workspace/*.md

# Or use selective sync
mkdir ~/Dropbox/Johnny5-Workspace
cp -r ~/.openclaw/workspace/* ~/Dropbox/Johnny5-Workspace/
```

---

## 🔄 SYNC METHOD 4: Git + Dropbox (BEST)

### Use Git for Version Control + Dropbox for Backup:

```bash
# Already done! Git is tracking everything

# Add Dropbox as remote backup
cd ~/.openclaw/workspace
git remote add dropbox ~/Dropbox/Johnny5-Workspace/git-backup

# Push to Dropbox
git push dropbox main

# Or use post-commit hook
nano .git/hooks/post-commit
```

```bash
#!/bin/bash
# Auto-push to Dropbox on every commit
git push dropbox main --quiet
```

```bash
chmod +x .git/hooks/post-commit
```

---

## 📱 ACCESS FROM ANYWHERE

### On Laptop:
1. Install Dropbox
2. Sync `Johnny5-Workspace` folder
3. Access all files locally
4. Changes sync back to iMac

### On Phone:
1. Dropbox mobile app
2. View/edit files
3. Voice notes → Transcribe → Save

### On Web:
1. dropbox.com
2. Access all workspace files
3. Download/upload as needed

---

## 🎤 VOICE NOTES WORKFLOW

### Save Voice Memos to Dropbox:

```
You (iPhone): Record voice memo → Save to Dropbox/Johnny5-Workspace/Voice-Notes/

Me (on iMac): 
  1. Detect new audio file
  2. Transcribe with Whisper
  3. Process request
  4. Save response
  5. Notify you
```

### Setup:

```bash
# Create voice notes folder
mkdir -p ~/Dropbox/Johnny5-Workspace/Voice-Notes

# Set up auto-transcription
# (Add to cron or use Hazel/Automator)
```

---

## 🚀 IMMEDIATE SYNC

### Run This Now:

```bash
# One-time full sync
cp -r ~/.openclaw/workspace ~/Dropbox/Johnny5-Workspace-$(date +%Y%m%d)

# Or better - use rsync for ongoing sync
rsync -av ~/.openclaw/workspace ~/Dropbox/Johnny5-Workspace
```

### Verify Sync:

```bash
# Check Dropbox folder
ls -la ~/Dropbox/Johnny5-Workspace/

# Should see all your files
```

---

## ✅ CHECKLIST

- [ ] Create Dropbox folder: `~/Dropbox/Johnny5-Workspace`
- [ ] Choose sync method (symlink recommended)
- [ ] Run initial sync
- [ ] Verify files appear in Dropbox
- [ ] Test access from phone/laptop
- [ ] Set up auto-sync (cron or Dropbox native)
- [ ] Create Voice-Notes subfolder

---

## 📊 CURRENT FILE COUNT

```
Total files to sync: ~50
Markdown files: ~25
Size: ~5 MB
Estimated sync time: 30 seconds
```

---

## 🎯 USAGE EXAMPLES

### You at Coffee Shop:
1. Edit file on laptop
2. Dropbox syncs to iMac
3. I process changes
4. Results sync back

### You on Phone:
1. Record voice note
2. Save to Dropbox/Voice-Notes
3. I transcribe & process
4. Response saved to Dropbox

### You Traveling:
1. Access all files via Dropbox
2. Make changes
3. Everything syncs home
4. Continue where you left off

---

## 💡 PRO TIPS

1. **Use selective sync** - Don't sync node_modules
2. **Enable LAN sync** - Faster transfers at home
3. **Version history** - Recover old versions
4. **Offline access** - Mark folders for offline
5. **Shared folders** - Collaborate with Sal

---

## 🔧 TROUBLESHOOTING

### "Sync not working"
```bash
# Check Dropbox status
dropbox-cli status

# Force sync
dropbox-cli sync
```

### "File conflicts"
```bash
# Dropbox creates "filename (conflicted copy)"
# Manually merge or choose version
```

### "Too much storage"
```bash
# Exclude large folders
dropbox-cli exclude add ~/Dropbox/Johnny5-Workspace/large-folder
```

---

## NEXT STEP

**Run this command to start sync:**

```bash
mkdir -p ~/Dropbox/Johnny5-Workspace && cp -r ~/.openclaw/workspace/* ~/Dropbox/Johnny5-Workspace/ && echo "Sync complete!"
```

**Then:** All files available on all devices!

---

*Sync guide created: February 16, 2026*