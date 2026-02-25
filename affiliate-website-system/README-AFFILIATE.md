# Affiliate Website System
## Automated 4-Stage Pipeline for Website Platform Affiliate Marketing

### Overview
This system automates the process of finding local businesses without websites, building them demo sites, and converting them into paying customers through website platforms with affiliate programs.

### The Pipeline

```
┌─────────┐    ┌──────────┐    ┌──────────┐    ┌─────────┐
│  SCOUT  │───▶│  BUILDER │───▶│ OUTREACH │───▶│ CLOSER  │
│Find     │    │Create    │    │Send SMS  │    │Handle   │
│Leads    │    │Demo Site │    │with Link │    │Replies  │
└─────────┘    └──────────┘    └──────────┘    └─────────┘
```

### Stage Breakdown

#### Stage 1: SCOUT (Lead Finder)
- **Purpose**: Find businesses on Google Maps that need websites
- **Target**: 100 leads/day
- **Criteria**: No website OR PageSpeed score < 50
- **Output**: `data/leads_YYYY-MM-DD.csv`

#### Stage 2: BUILDER (Demo Creator)
- **Purpose**: Auto-generate demo websites for top leads
- **Process**: 
  - Pulls business data from CSV
  - Generates site using niche-specific templates
  - Deploys to Vercel subdomain
- **Output**: Live demo URL

#### Stage 3: OUTREACH (SMS Sender)
- **Purpose**: Send personalized SMS to business owners
- **Message**: "Hi [name], built your business a free website — [demo link]. $50/month if you want to keep it."
- **Target**: 40% open rate, 10% click rate

#### Stage 4: CLOSER (Reply Handler)
- **Purpose**: Handle incoming responses
- **Actions**:
  - Analyzes reply content
  - Generates 2-paragraph brief
  - Logs to CRM
  - Notifies via Discord/SMS

### Revenue Model

| Metric | Target | Result |
|--------|--------|--------|
| Leads/day | 100 | 100 |
| SMS Open Rate | 40% | 40 opens |
| Click Rate | 10% | 4 clicks |
| Conversion | 25% | 1 sale/day |
| CPA | $150 | **$150/day** |
| Monthly | - | **$4,500/month** |

### Affiliate Programs

1. **Base44** - Website builder with competitive CPA
2. **Wix** - $100+ per premium signup
3. **Squarespace** - Up to $200 per sale
4. **GoDaddy** - Domain + hosting commissions
5. **Email platforms** - Higher rates for bundled services

### Installation

```bash
# Clone and setup
cd affiliate-website-system
pip install -r requirements.txt

# Copy environment template
cp .env.example .env
# Edit .env with your credentials

# Configure targets
vim config.yaml

# Run full pipeline
./run-pipeline.sh
```

### Configuration

#### Environment Variables (.env)
```bash
# Google Maps / Scraping
GOOGLE_MAPS_API_KEY=your_key_here

# PageSpeed Insights
PAGESPEED_API_KEY=your_key_here

# Vercel Deployment
VERCEL_TOKEN=your_token_here
VERCEL_TEAM_ID=optional_team_id

# Twilio SMS
TWILIO_ACCOUNT_SID=your_sid
TWILIO_AUTH_TOKEN=your_token
TWILIO_PHONE_NUMBER=your_twilio_number

# Notifications
DISCORD_WEBHOOK_URL=your_webhook
NOTIFICATION_PHONE=your_phone

# Affiliate Tracking
BASE44_AFFILIATE_ID=your_id
WIX_AFFILIATE_ID=your_id
```

#### Target Configuration (config.yaml)
```yaml
targets:
  cities:
    - "Miami, FL"
    - "Phoenix, AZ"
    - "Las Vegas, NV"
  niches:
    - "plumber"
    - "electrician"
    - "landscaping"
    - "hair salon"
    - "auto repair"
  daily_leads: 100
  
pagespeed:
  threshold: 50
  
outreach:
  sms_template: "Hi {name}, built your business a free website — {link}. $50/month if you want to keep it."
  max_per_day: 100
```

### Usage

#### Run Individual Stages

```bash
# Stage 1: Scout for leads
python scripts/scout.py --city "Miami, FL" --niche "plumber" --limit 100

# Stage 2: Build demo for top lead
python scripts/builder.py --input data/leads_2024-01-15.csv

# Stage 3: Send SMS outreach
python scripts/outreach.py --lead-id <business_id>

# Stage 4: Process replies (run via webhook or cron)
python scripts/closer.py --check-replies
```

#### Run Full Pipeline
```bash
./run-pipeline.sh
```

### File Structure

```
affiliate-website-system/
├── scripts/
│   ├── scout.py          # Lead finder
│   ├── builder.py        # Demo creator
│   ├── outreach.py       # SMS sender
│   └── closer.py         # Reply handler
├── templates/
│   ├── plumber/          # Niche templates
│   ├── electrician/
│   ├── salon/
│   └── generic/
├── data/
│   ├── leads/            # CSV exports
│   └── crm/              # Reply logs
├── logs/
│   └── pipeline.log
├── config.yaml
├── requirements.txt
├── .env.example
├── run-pipeline.sh
└── README-AFFILIATE.md
```

### Database Schema

#### Leads Table (CSV)
```
id, name, phone, address, city, niche, website, pagespeed_score, 
gmaps_url, found_date, status, demo_url, sms_sent, sms_date
```

#### CRM Table (CSV)
```
lead_id, reply_text, reply_date, brief_summary, action_taken, 
affiliate_platform, converted, commission
```

### Automation

#### Cron Setup (crontab -e)
```bash
# Run scout every morning at 9 AM
0 9 * * * cd /path/to/affiliate-website-system && python scripts/scout.py >> logs/cron.log 2>&1

# Check replies every 15 minutes during business hours
*/15 8-18 * * 1-5 cd /path/to/affiliate-website-system && python scripts/closer.py --check-replies >> logs/cron.log 2>&1

# Full pipeline run daily at 10 AM
0 10 * * * cd /path/to/affiliate-website-system && ./run-pipeline.sh >> logs/cron.log 2>&1
```

### Compliance & Ethics

1. **TCPA Compliance**: Only message businesses during 8 AM - 9 PM local time
2. **Opt-out**: Honor STOP requests immediately
3. **Data Privacy**: Store minimal data, encrypt phone numbers
4. **Transparency**: Clear about affiliate relationship when asked

### Troubleshooting

#### Common Issues

**Scraping blocked?**
- Use rotating proxies
- Add delays between requests
- Check Google Maps API limits

**PageSpeed API quota exceeded?**
- Batch requests
- Cache results
- Use multiple API keys

**Vercel deployment failing?**
- Check token permissions
- Verify project settings
- Review build logs

**SMS not sending?**
- Verify Twilio credentials
- Check phone number format (E.164)
- Review Twilio error codes

### Support

For issues or questions:
1. Check logs in `logs/pipeline.log`
2. Review error messages in data files
3. Verify all API keys are valid
4. Ensure rate limits aren't exceeded

### License

MIT License - Use at your own risk. Ensure compliance with local laws and platform ToS.
