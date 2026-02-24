# Website Sales System - Setup Guide

## Overview
Automated daily prospect generation system that finds 100 local SoCal businesses without websites and exports the top 20 hot leads for outreach.

## What's Working

### ✅ Core Features
- **Brave Search Integration** - Finds real businesses with phone/email (mock mode for demo)
- **Daily Automation** - Cron job runs at 8 AM PST daily
- **Smart Prioritization** - Businesses WITHOUT websites flagged as 🔥 HOT LEADS
- **CSV Export** - Daily export of top 20 prospects with call scripts
- **Category Exports** - Separate CSVs for GHL import by business category

### 📊 Current Status
- Cron job: **Active** (runs daily at 8 AM)
- API Mode: **Mock Data** (for testing/demo)
- Prospects stored: `/prospects/*.json`
- Daily exports: `/exports/daily-top-20-YYYY-MM-DD.csv`

## Quick Start

### 1. Test the System (No API Key Needed)
```bash
cd /Users/rubenruiz/.openclaw/workspace/website-sales-system

# Test with 5 prospects
node scripts/daily-automation.js test 5

# Generate 100 prospects now
node scripts/daily-automation.js run

# Export top 20 for today
node scripts/daily-export.js daily 20
```

### 2. View Daily Export
```bash
# Latest export is at
exports/daily-top-20-YYYY-MM-DD.csv

# Open in Excel/Sheets
open exports/daily-top-20-$(date +%Y-%m-%d).csv
```

### 3. Check Stats
```bash
node scripts/prospect-scraper.js stats
node scripts/prospect-scraper.js report
```

## To Enable LIVE Brave Search (Real Data)

### Step 1: Get Brave API Key
1. Go to https://api.search.brave.com/app/keys
2. Sign up for a free account (10,000 queries/month)
3. Create a new API key
4. Copy the key

### Step 2: Update .env File
Edit `.env` and replace:
```
BRAVE_API_KEY=YOUR_BRAVE_API_KEY_HERE
```
With your actual key:
```
BRAVE_API_KEY=BSAb9xxxxxYOUR_KEY_HERE
```

### Step 3: Test Live Search
```bash
node scripts/web-search-wrapper.js "plumber Santa Barbara phone" 3
```

Now the system will use real Brave Search instead of mock data!

## System Architecture

### File Structure
```
website-sales-system/
├── .env                          # API keys and config
├── config.md                     # Business rules and targets
├── run-daily.sh                  # Cron script (runs at 8 AM)
├── scripts/
│   ├── prospect-scraper.js       # Main scraper with Brave API
│   ├── web-search-wrapper.js     # API wrapper (live + mock modes)
│   ├── daily-automation.js       # Daily workflow orchestrator
│   ├── daily-export.js           # CSV export for Ruben
│   ├── business-researcher.js    # Additional enrichment
│   ├── export-csv.js             # GHL category exports
│   ├── mockup-generator.js       # Website mockup creator
│   ├── outreach-engine.js        # Email/SMS templates
│   └── system.js                 # Legacy orchestrator
├── prospects/                    # JSON files for each prospect
├── exports/                      # CSV exports
├── logs/                         # Daily automation logs
└── README.md                     # This file
```

### Daily Workflow (8 AM PST)
1. **Generate 100 Prospects** - Searches SoCal cities across categories
2. **Extract Contact Info** - Phone numbers, emails, addresses
3. **Detect Websites** - Flags businesses WITHOUT websites as 🔥 hot leads
4. **Export Top 20** - Creates CSV with call scripts and outreach angles
5. **Log Results** - Saves to `logs/cron-YYYY-MM-DD.log`

### Prospect Priority System
- 🔥 **HOT** - No website (immediate need) - PRIORITY 1
- ⚡ **WARM** - Has website + email (upgrade opportunity) - PRIORITY 2
- 📞 **COLD** - Has website, phone only - PRIORITY 3

### Data Points Collected
- Business name
- Phone number
- Email (if available)
- Address (if found)
- City
- Category (Contractor, Restaurant, etc.)
- Has website? (boolean)
- Website URL (if exists)
- Priority score
- Source URL

## CSV Export Format

The daily export includes:
- Priority (🔥 HOT / ⚡ WARM / 📞 COLD)
- Business Name
- Phone
- Email
- Address
- City
- Category
- Has Website (Yes/No)
- Current Website (if exists)
- Why They're a Good Target
- Suggested Outreach Angle
- Call Script
- Prospect ID
- Date Found

## Manual Commands

### Generate Prospects
```bash
# Generate N prospects
node scripts/prospect-scraper.js scrape 50

# Get top prospects
node scripts/prospect-scraper.js top 20

# View stats
node scripts/prospect-scraper.js stats
```

### Export Data
```bash
# Daily top 20
node scripts/daily-export.js daily 20

# Export by category (for GHL)
node scripts/daily-export.js category

# Do both
node scripts/daily-export.js all
```

### Update Prospect Stage
```javascript
const ProspectScraper = require('./scripts/prospect-scraper');
const scraper = new ProspectScraper();
scraper.updateProspect('prospect_xxx', { stage: 'Outreach Sent' });
```

## Target Geography
- Santa Barbara County (Santa Barbara, Goleta, Carpinteria)
- Ventura County (Ventura, Oxnard, Camarillo, Thousand Oaks)
- Los Angeles County (LA, Pasadena, Glendale, Burbank, Santa Monica, etc.)
- Orange County (Anaheim, Santa Ana, Irvine, Newport Beach, etc.)
- San Diego County (San Diego, La Jolla, Chula Vista, Oceanside, etc.)

## Business Categories
1. **Contractors** - HVAC, plumbing, electrical, roofing, solar
2. **Home Services** - Landscaping, cleaning, pest control
3. **Restaurants** - Local, independent eateries
4. **Retail** - Local shops, boutiques
5. **Professional Services** - Accountants, lawyers, consultants
6. **Medical** - Dentists, chiropractors, therapists
7. **Automotive** - Mechanics, detailers, body shops

## Cron Job
```
0 8 * * * /Users/rubenruiz/.openclaw/workspace/website-sales-system/run-daily.sh
```
Runs daily at 8:00 AM PST.

To modify:
```bash
crontab -e
```

## Logs
- Automation logs: `logs/cron-YYYY-MM-DD.log`
- Error logs: `logs/error-TIMESTAMP.log`
- Daily reports: `logs/report-YYYY-MM-DD.json`

## Troubleshooting

### No prospects being found
- Check if in mock mode (add real Brave API key for live data)
- Check logs: `tail -f logs/cron-$(date +%Y-%m-%d).log`
- Test search: `node scripts/web-search-wrapper.js "plumber Santa Barbara" 3`

### Duplicate prospects
- System tracks phone numbers to avoid duplicates
- Existing prospects loaded from `/prospects/*.json`

### Export is empty
- Run scraper first: `node scripts/daily-automation.js run`
- Check if prospects exist: `ls prospects/ | wc -l`

## Future Enhancements
- [ ] GHL API integration (auto-import contacts)
- [ ] Discord notifications for hot leads
- [ ] Email verification (check if emails are valid)
- [ ] Website screenshot capture (for businesses with poor sites)
- [ ] Mockup generator integration (auto-create preview sites)

## Pricing Context
- **Base Package**: $500 (5-page website, 7-day delivery)
- **Hosting**: $39/month recurring
- **Upsells**: Extra pages ($50), priority delivery (+$150)

## Support
For issues or questions, check the logs first:
```bash
tail -50 logs/cron-$(date +%Y-%m-%d).log
```
