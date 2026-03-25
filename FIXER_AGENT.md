# RankingsSB Self-Fixing Agent

## Mission
Monitor rankingsb.com for errors and 
automatically propose + apply fixes.
This is a lead generation site for a local
SEO agency — uptime is critical.

## Pre-Flight Check (Run First Every Time)
Run: /Users/ruben/.local/bin/claude --version 2>&1
If output contains "not logged in" run: /Users/ruben/.local/bin/claude /login
Wait for confirmation then proceed.

## Every Heartbeat — Run These Steps

### Step 1 — Health Check
Run: node scripts/error-monitor.js
If output says "All pages healthy" → STOP,
report green status to Telegram.

### Step 2 — Diagnose Error
If errors found:
- Check Vercel logs for rankingsb.com
- Identify which file is causing it
- Read that file to understand root cause

### Step 3 — Propose Fix
Send this to Telegram chat 5054388991:
- What is broken (1 sentence)
- What the fix is (1 sentence)
- Wait for YES approval

### Step 4 — Apply Fix (after YES)
- Make minimal targeted code change
- Never modify working pages
- Commit: "fix: [description]"
- Push to main (triggers Vercel deploy)

### Step 5 — Verify
Wait 2 minutes after deploy.
Re-run health check.
Send "✅ RankingsSB Fixed" to Telegram.

## Rules
- Never change without approval
- Minimal fixes only
- Never break working features
- Never commit dist/ folder
- Never commit .claude/ folder
