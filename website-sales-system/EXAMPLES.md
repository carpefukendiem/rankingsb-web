# Scrapling Prospector - Example Commands

Complete command reference for finding $500 website sales prospects.

## 🚀 Quick Start Commands

### Test Installation
```bash
cd /Users/rubenruiz/.openclaw/workspace/website-sales-system
python test-setup.py
```

### Quick Test (Single Search)
```bash
# Test with one city and one business type
python scripts/scrapling-prospector.py --city "Santa Barbara" --type "plumbing" --max-results 5
```

### Full Campaign (All Cities & Types)
```bash
# Complete run - finds 100+ businesses
python scripts/scrapling-prospector.py
```

## 📋 Daily Usage Patterns

### Morning Prospecting Session
```bash
# Run at 9 AM - find fresh leads
./run-prospector.sh

# Or with runner script options
./run-prospector.sh --deep
```

### Quick Afternoon Check
```bash
# Fast scan for quick updates
./run-prospector.sh --quick
```

### Deep Dive for Specific Market
```bash
# Deep scan specific niche
./run-prospector.sh --deep --city "Los Angeles" --type "dentist"
```

## 🎯 Targeted Searches by City

### Santa Barbara Area
```bash
python scripts/scrapling-prospector.py --city "Santa Barbara"
python scripts/scrapling-prospector.py --city "Goleta"
python scripts/scrapling-prospector.py --city "Santa Barbara" --type "HVAC"
python scripts/scrapling-prospector.py --city "Goleta" --type "landscaping"
```

### Ventura County
```bash
python scripts/scrapling-prospector.py --city "Ventura"
python scripts/scrapling-prospector.py --city "Oxnard"
python scripts/scrapling-prospector.py --city "Ventura" --type "plumbing"
python scripts/scrapling-prospector.py --city "Oxnard" --type "auto repair"
```

### Los Angeles Area
```bash
python scripts/scrapling-prospector.py --city "Los Angeles"
python scripts/scrapling-prospector.py --city "Pasadena"
python scripts/scrapling-prospector.py --city "Long Beach"
python scripts/scrapling-prospector.py --city "Los Angeles" --type "dentist"
python scripts/scrapling-prospector.py --city "Pasadena" --type "restaurant"
```

### Orange County
```bash
python scripts/scrapling-prospector.py --city "Irvine"
python scripts/scrapling-prospector.py --city "Huntington Beach"
python scripts/scrapling-prospector.py --city "Irvine" --type "cleaning services"
```

### San Diego
```bash
python scripts/scrapling-prospector.py --city "San Diego"
python scripts/scrapling-prospector.py --city "San Diego" --type "electrician"
```

## 🔧 Targeted Searches by Business Type

### High-Value Targets
```bash
# HVAC - high budget clients
python scripts/scrapling-prospector.py --type "HVAC"

# Dentists - professional services
python scripts/scrapling-prospector.py --type "dentist"

# Roofing - seasonal demand
python scripts/scrapling-prospector.py --type "roofing"

# Electricians - essential services
python scripts/scrapling-prospector.py --type "electrician"
```

### Quick Wins
```bash
# Restaurants - many need websites
python scripts/scrapling-prospector.py --type "restaurant"

# Auto Repair - local focus
python scripts/scrapling-prospector.py --type "auto repair"

# Cleaning Services - growing market
python scripts/scrapling-prospector.py --type "cleaning services"

# Landscaping - seasonal
python scripts/scrapling-prospector.py --type "landscaping"

# Plumbing - always needed
python scripts/scrapling-prospector.py --type "plumbing"
```

## 📊 Data Export Options

### Export Only Hot Leads (Default)
```bash
python scripts/scrapling-prospector.py
# Creates: data/hot_leads_YYYY-MM-DD.csv
```

### Export All Leads (With + Without Websites)
```bash
python scripts/scrapling-prospector.py --all-leads
# Creates: data/all_leads_YYYY-MM-DD.csv
```

### Export Both
```bash
python scripts/scrapling-prospector.py --all-leads
# Creates both hot_leads_*.csv and all_leads_*.csv
```

## ⚡ Speed/Depth Control

### Quick Scan (Testing)
```bash
# 5 results per search - fast
python scripts/scrapling-prospector.py --max-results 5
./run-prospector.sh --quick
```

### Standard Scan (Recommended)
```bash
# 10 results per search - balanced
python scripts/scrapling-prospector.py --max-results 10
./run-prospector.sh
```

### Deep Scan (Maximum Leads)
```bash
# 30 results per search - thorough
python scripts/scrapling-prospector.py --max-results 30
./run-prospector.sh --deep
```

## 📈 Batch Operations

### Run Multiple Cities Sequentially
```bash
#!/bin/bash
# run-multiple.sh
CITIES=("Santa Barbara" "Ventura" "Los Angeles" "San Diego")
for city in "${CITIES[@]}"; do
    echo "Processing $city..."
    python scripts/scrapling-prospector.py --city "$city"
    sleep 60  # Wait between cities
done
```

### Run Multiple Types Sequentially
```bash
#!/bin/bash
# run-types.sh
TYPES=("HVAC" "plumbing" "dentist" "restaurant")
for type in "${TYPES[@]}"; do
    echo "Processing $type..."
    python scripts/scrapling-prospector.py --type "$type"
    sleep 60
done
```

## 🔍 Viewing Results

### List Today's Files
```bash
ls -la data/*$(date +%Y-%m-%d)*
```

### View Hot Leads
```bash
# View CSV (formatted)
column -s, -t data/hot_leads_*.csv | head -20

# View raw CSV
cat data/hot_leads_*.csv

# Count hot leads
wc -l data/hot_leads_*.csv
```

### View JSON Data
```bash
# Pretty print JSON
python -m json.tool data/leads_*.json | less

# Count total leads
python -c "import json; print(len(json.load(open('data/leads_$(date +%Y-%m-%d).json'))))"
```

### Filter Specific Results
```bash
# Find all HVAC leads
grep "HVAC" data/hot_leads_*.csv

# Find leads in specific city
grep "Santa Barbara" data/hot_leads_*.csv

# Find leads with phone numbers
grep -E '\([0-9]{3}\)' data/hot_leads_*.csv
```

## 🔄 Automation

### Daily Cron Job (Mac/Linux)
```bash
# Edit crontab
crontab -e

# Add for daily 9 AM run
0 9 * * * cd /Users/rubenruiz/.openclaw/workspace/website-sales-system && /usr/bin/python3 scripts/scrapling-prospector.py >> logs/cron.log 2>&1

# Add for twice daily (9 AM and 3 PM)
0 9,15 * * * cd /Users/rubenruiz/.openclaw/workspace/website-sales-system && /usr/bin/python3 scripts/scrapling-prospector.py >> logs/cron.log 2>&1
```

### Weekly Deep Scan
```bash
# Sundays at 10 AM - comprehensive scan
0 10 * * 0 cd /Users/rubenruiz/.openclaw/workspace/website-sales-system && /usr/bin/python3 scripts/scrapling-prospector.py --max-results 30 >> logs/weekly.log 2>&1
```

## 📊 Analysis Commands

### Count Leads by City
```bash
cat data/hot_leads_*.csv | cut -d',' -f3 | sort | uniq -c | sort -rn
```

### Count Leads by Business Type
```bash
cat data/hot_leads_*.csv | cut -d',' -f2 | sort | uniq -c | sort -rn
```

### Calculate Potential Revenue
```bash
# Count hot leads and multiply by $500
count=$(tail -n +2 data/hot_leads_*.csv | wc -l)
echo "Hot leads: $count"
echo "Potential revenue: \$((count * 500))"
```

### Compare Days
```bash
# Yesterday vs Today
yesterday=$(date -v-1d +%Y-%m-%d)
today=$(date +%Y-%m-%d)
echo "Yesterday: $(wc -l < data/hot_leads_$yesterday.csv)"
echo "Today: $(wc -l < data/hot_leads_$today.csv)"
```

## 🛠️ Troubleshooting Commands

### Test Network/Dependencies
```bash
# Test Python imports
python -c "import scrapling; import aiohttp; print('OK')"

# Test network
curl -I https://www.google.com

# Check disk space
df -h
```

### Clean Old Data
```bash
# Remove data older than 30 days
find data/ -name "*.csv" -mtime +30 -delete
find data/ -name "*.json" -mtime +30 -delete
find logs/ -name "*.log" -mtime +30 -delete
```

### Restart Fresh
```bash
# Backup and clear
mkdir -p backup
cp data/* backup/
rm data/*
python scripts/scrapling-prospector.py
```

## 📝 Recommended Daily Workflow

```bash
# 1. Morning setup
cd /Users/rubenruiz/.openclaw/workspace/website-sales-system

# 2. Check yesterday's results
echo "Yesterday's hot leads:"
wc -l data/hot_leads_$(date -v-1d +%Y-%m-%d).csv

# 3. Run prospector
./run-prospector.sh

# 4. Review today's results
echo "Today's hot leads:"
column -s, -t data/hot_leads_$(date +%Y-%m-%d).csv | head -10

# 5. Export to CRM (manual or scripted)
# cp data/hot_leads_$(date +%Y-%m-%d).csv ~/CRM/imports/
```

## 💡 Power User Tips

1. **Combine searches**: Run multiple targeted searches instead of one big one
2. **Morning is best**: Google results are fresher in the morning
3. **Rotate cities**: Don't always search the same cities - mix it up
4. **Save the best**: Copy top leads to a separate "priority.csv" file
5. **Track conversions**: Add a "contacted" column to track your outreach

---

**Remember: Each hot lead is a potential $500 sale!**
