# 🔥 Scrapling Business Prospector for Rankingsb

**Find $500 website sales prospects automatically**

This system uses Scrapling's StealthyFetcher to search Google and Yelp for local businesses in Southern California, identifies which ones DON'T have websites (HOT LEADS), and exports them to CSV for your sales team.

## 🎯 What It Does

1. **Searches** Google & Yelp for local businesses by type and city
2. **Extracts** business name, phone, address, email
3. **Checks** if they have a working website
4. **Identifies** HOT leads (businesses without websites)
5. **Exports** daily CSV files with all leads

## 💰 Target Metrics

- **Goal**: 100+ businesses/day without websites
- **Potential Revenue**: $500 per website sale
- **ROI**: One sale = entire system pays for itself

## 📋 Target Markets

**Cities:**
- Santa Barbara, Goleta, Ventura, Oxnard, Pasadena
- Los Angeles, Irvine, San Diego, Huntington Beach, Long Beach

**Business Types:**
- HVAC, Plumbing, Electrician, Roofing
- Dentist, Restaurant, Auto Repair
- Landscaping, Cleaning Services

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd /Users/rubenruiz/.openclaw/workspace/website-sales-system

# Create virtual environment (recommended)
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install requirements
pip install -r requirements-scrapling.txt
```

### 2. Run the Prospector

```bash
# Full campaign (all cities, all business types)
python scripts/scrapling-prospector.py

# Quick test - one city, one business type
python scripts/scrapling-prospector.py --city "Santa Barbara" --type "plumbing"

# Custom configuration
python scripts/scrapling-prospector.py --max-results 20
```

### 3. View Results

```bash
# Check data directory for results
ls data/

# View hot leads (businesses without websites)
cat data/hot_leads_YYYY-MM-DD.csv

# View all leads (JSON format)
cat data/leads_YYYY-MM-DD.json
```

## 📁 Project Structure

```
website-sales-system/
├── scripts/
│   └── scrapling-prospector.py    # Main scraper
├── data/                           # Output files
│   ├── leads_YYYY-MM-DD.json      # All leads (JSON)
│   ├── hot_leads_YYYY-MM-DD.csv   # Hot leads only (CSV)
│   └── all_leads_YYYY-MM-DD.csv   # All leads (CSV)
├── logs/                           # Log files
├── requirements-scrapling.txt      # Python dependencies
└── README-SCRAPLING.md            # This file
```

## 🔧 Configuration

### Modify Target Cities

Edit `scripts/scrapling-prospector.py` and update the `CITIES` list:

```python
CITIES = [
    "Santa Barbara", "Goleta", "Ventura", 
    # Add your cities here
]
```

### Modify Business Types

Edit `scripts/scrapling-prospector.py` and update the `BUSINESS_TYPES` list:

```python
BUSINESS_TYPES = [
    "HVAC", "plumbing", "electrician",
    # Add your business types here
]
```

### Adjust Search Depth

Use `--max-results` to control results per search:

```bash
# Fast scan - fewer results
python scripts/scrapling-prospector.py --max-results 5

# Deep scan - more results (slower)
python scripts/scrapling-prospector.py --max-results 30
```

## 📊 Understanding Output

### Hot Leads CSV

The `hot_leads_YYYY-MM-DD.csv` contains businesses WITHOUT websites:

| Column | Description |
|--------|-------------|
| `name` | Business name |
| `business_type` | Type of business |
| `city` | Location city |
| `phone` | Phone number (if found) |
| `address` | Street address (if found) |
| `email` | Email (if found) |
| `has_website` | Always FALSE for hot leads |
| `source` | google or yelp |
| `search_query` | Search used to find them |

### Lead Quality Indicators

🔥 **HOT LEAD** = No website found
- Highest priority for sales outreach
- These businesses NEED your $500 website

📄 **Has Website** = Already has a website
- Lower priority, but could be outdated
- Potential for redesign/upgrades

## 💡 Sales Tips

### Cold Calling Script

```
Hi [Business Name], this is [Your Name] from Rankingsb. 

I was searching for [business type] in [city] and noticed you don't 
have a website yet. Are you looking to get online?

We specialize in affordable websites for local businesses - 
just $500 for a complete, professional site. Would you be 
interested in a quick 5-minute call to see if it makes sense?
```

### Email Template

```
Subject: [Business Name] - Let's Get You Online

Hi there,

I found your business while searching for [business type] in [city]. 
I noticed you don't have a website yet - and I think that's costing you customers.

Did you know 97% of people search online before choosing a local business?

At Rankingsb, we build professional websites for local businesses like yours 
for just $500 - no monthly fees, no hidden costs.

Want to see what your website could look like? Reply and I'll send you 
a free mockup.

Best,
[Your Name]
Rankingsb Website Solutions
```

## ⚙️ Advanced Usage

### Run Specific Searches

```bash
# Only restaurants in Santa Barbara
python scripts/scrapling-prospector.py --city "Santa Barbara" --type "restaurant"

# Multiple specific searches
python scripts/scrapling-prospector.py --city "Los Angeles" --type "HVAC"
python scripts/scrapling-prospector.py --city "San Diego" --type "dentist"
```

### Export All Leads (Not Just Hot)

```bash
python scripts/scrapling-prospector.py --all-leads
```

### Daily Automation (Mac/Linux)

Add to crontab for daily runs:

```bash
# Edit crontab
crontab -e

# Add this line to run daily at 9 AM
0 9 * * * cd /Users/rubenruiz/.openclaw/workspace/website-sales-system && /usr/bin/python3 scripts/scrapling-prospector.py >> logs/cron.log 2>&1
```

## 🔍 How It Works

1. **StealthyFetcher** mimics real browser behavior to avoid detection
2. Searches Google for `"[business type] [city]"`
3. Extracts business listings from search results
4. Checks if each business has a working website (HTTP request)
5. Saves businesses without websites as HOT leads
6. Exports to CSV for easy import into CRM/sales tools

## 🛠️ Troubleshooting

### "No module named 'scrapling'"

```bash
pip install scrapling
# or
pip install -r requirements-scrapling.txt
```

### No results found

- Check your internet connection
- Google may be rate-limiting - wait a few minutes
- Try reducing `--max-results` to 5 for testing

### False positives (has website but marked as hot)

- Some websites block automated checks
- Manual verification recommended for best leads

### Rate limiting

- Add delays between searches: edit `delay=3.0` in scraper
- Use fewer `--max-results`
- Space out your searches

## 📈 Scaling Up

To find 100+ leads per day:

1. **Run multiple city/type combinations**
2. **Increase max-results**: `--max-results 20`
3. **Add more cities** to the CITIES list
4. **Add more business types** to BUSINESS_TYPES
5. **Run 2-3 times per day** at different times

## 🎓 Pro Tips

1. **Prioritize by business type**: HVAC and dentists typically have bigger budgets
2. **Call within 24 hours**: Fresh leads convert better
3. **Mention you found them**: "I was searching for plumbers in Santa Barbara..."
4. **Focus on value**: Emphasize lost customers without a website
5. **Follow up**: Most sales happen on the 2nd or 3rd contact

## 📞 Support

For issues or questions:
1. Check logs in `logs/` directory
2. Review data files in `data/` directory
3. Test with single city/type first

---

**Happy Prospecting! 🚀**

*Built with Scrapling for stealthy, effective web scraping.*
