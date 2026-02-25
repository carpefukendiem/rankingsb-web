# AFFILIATE WEBSITE SYSTEM - QUICK START

## 🎯 4-Stage Pipeline Overview

```
SCOUT → BUILDER → OUTREACH → CLOSER
(Find)  (Build)   (SMS)     (Reply)
```

## 📋 Pre-Flight Checklist

### 1. API Keys Needed

| Service | Purpose | Get Key At |
|---------|---------|------------|
| Google Maps | Find businesses | https://developers.google.com/maps |
| PageSpeed | Check website speed | https://developers.google.com/speed/docs/insights/v5/get-started |
| Vercel | Deploy demos | https://vercel.com/account/tokens |
| Twilio | Send SMS | https://console.twilio.com |

### 2. Affiliate Accounts

| Platform | Commission | Sign Up |
|----------|-----------|---------|
| Base44 | $100+ | https://base44.com/affiliates |
| Wix | $100+ | https://www.wix.com/affiliates |
| Squarespace | $200 | https://www.squarespace.com/affiliates |
| GoDaddy | $50+ | https://www.godaddy.com/affiliates |

## 🚀 Quick Start (5 minutes)

```bash
# 1. Setup
cd affiliate-website-system
./setup.sh

# 2. Configure
cp .env.example .env
# Edit .env with your API keys

# 3. Test Scout (find leads)
python3 scripts/scout.py --city "Phoenix, AZ" --niche plumber --limit 10

# 4. Test Builder (create demo)
python3 scripts/builder.py --input data/leads/leads_*.csv --limit 1

# 5. Test Outreach (send SMS - requires Twilio)
python3 scripts/outreach.py --input data/leads/leads_*.csv --limit 1

# 6. Run full pipeline
./run-pipeline.sh
```

## 📊 Expected Results

| Stage | Metric | Target |
|-------|--------|--------|
| Scout | Leads/day | 100 |
| Builder | Demos built | 10-20/day |
| Outreach | SMS sent | 50/day |
| Closer | Open rate | 40% |
| Closer | Click rate | 10% |
| Closer | Conversion | 25% |
| **Revenue** | **$150/day** | **$4,500/month** |

## 🔄 Automation Setup

### Cron Jobs (Linux/Mac)

```bash
# Edit crontab
crontab -e

# Add these lines:

# Run scout every morning at 9 AM
0 9 * * * cd /path/to/affiliate-website-system && ./venv/bin/python scripts/scout.py --batch >> logs/cron.log 2>&1

# Run builder at 10 AM
0 10 * * * cd /path/to/affiliate-website-system && ./venv/bin/python scripts/builder.py --input data/leads/$(ls -t data/leads/*.csv | head -1) --limit 10 >> logs/cron.log 2>&1

# Send SMS at 11 AM
0 11 * * * cd /path/to/affiliate-website-system && ./venv/bin/python scripts/outreach.py --input data/leads/$(ls -t data/leads/*.csv | head -1) --limit 50 >> logs/cron.log 2>&1

# Check replies every 15 minutes during business hours
*/15 8-18 * * 1-5 cd /path/to/affiliate-website-system && ./venv/bin/python scripts/closer.py --check-replies >> logs/cron.log 2>&1
```

### Twilio Webhook Setup

1. Go to Twilio Console → Phone Numbers → Manage → Active Numbers
2. Click your number
3. Under "Messaging", set webhook URL:
   ```
   https://your-server.com/webhook/sms-reply
   ```
4. Use the closer.py process_reply function in your webhook handler

## 📁 File Structure

```
affiliate-website-system/
├── scripts/
│   ├── scout.py          # Find leads
│   ├── builder.py        # Build demos
│   ├── outreach.py       # Send SMS
│   ├── closer.py         # Handle replies
│   └── affiliate.py      # Affiliate tracking
├── templates/            # Website templates
│   ├── plumber/
│   ├── electrician/
│   ├── salon/
│   └── generic/
├── data/
│   ├── leads/           # CSV exports
│   └── crm/             # Reply & conversion logs
├── logs/                # Execution logs
├── config.yaml          # Target configuration
├── .env                 # API keys (gitignored)
├── requirements.txt     # Dependencies
├── run-pipeline.sh     # Full pipeline runner
└── setup.sh            # Quick setup

```

## 🛠️ Configuration

### config.yaml

Edit to set your target markets:

```yaml
targets:
  cities:
    - name: "Your City, ST"
      state: "ST"
      timezone: "America/New_York"
      
  niches:
    - id: "your_niche"
      name: "Your Niche"
      template: "generic"
      keywords: ["keyword1", "keyword2"]

daily_leads: 100
max_sms_per_day: 50
```

### .env

Add your API keys:

```bash
GOOGLE_MAPS_API_KEY=your_key_here
PAGESPEED_API_KEY=your_key_here
VERCEL_TOKEN=your_token_here
TWILIO_ACCOUNT_SID=your_sid
TWILIO_AUTH_TOKEN=your_token
TWILIO_PHONE_NUMBER=+1234567890
DISCORD_WEBHOOK_URL=your_webhook_url
```

## 🧪 Testing

### Test Scout Only
```bash
python3 scripts/scout.py --city "Miami, FL" --niche plumber --limit 5
```

### Test Builder Only
```bash
python3 scripts/builder.py --name "Test Business" --phone "555-0100" --city "Miami" --niche plumber
```

### Test Outreach (Dry Run)
```bash
# Review the CSV first
cat data/leads/leads_Miami_FL_plumber_*.csv

# Then send (if Twilio configured)
python3 scripts/outreach.py --input data/leads/leads_Miami_FL_plumber_*.csv --limit 1
```

### Test Closer
```bash
python3 scripts/closer.py --from "+15550100" --message "I'm interested, tell me more"
```

## 📈 Monitoring

### Check Logs
```bash
# Real-time log tailing
tail -f logs/pipeline.log

# View specific stage logs
cat logs/scout_run.log
cat logs/builder_run.log
cat logs/outreach_run.log
```

### View CRM Data
```bash
# Today's leads
cat data/leads/leads_$(date +%Y-%m-%d).csv

# Today's SMS log
cat data/crm/sms_log_$(date +%Y-%m-%d).csv

# Today's replies
cat data/crm/replies_$(date +%Y-%m-%d).csv

# Conversions
cat data/crm/conversions_$(date +%Y-%m-%d).csv
```

### Conversion Report
```bash
python3 scripts/affiliate.py
```

## ⚠️ Compliance Notes

- **TCPA**: Only message 8 AM - 9 PM local time
- **Opt-out**: Honor STOP requests immediately
- **Data**: Encrypt stored phone numbers
- **Transparency**: Disclose affiliate relationship if asked

## 🆘 Troubleshooting

### "No module named 'scrapling'"
```bash
source venv/bin/activate
pip install -r requirements.txt
```

### "Google Maps API error"
- Check API key in .env
- Verify Places API is enabled in Google Cloud Console
- Check quota limits

### "Vercel deployment failed"
- Verify VERCEL_TOKEN in .env
- Ensure Vercel CLI is installed: `npm i -g vercel`
- Check team permissions

### "SMS not sending"
- Verify Twilio credentials
- Check phone number format (E.164: +1234567890)
- Verify Twilio number can send SMS

## 💡 Tips for Success

1. **Start Small**: Test with 10 leads before scaling to 100/day
2. **Quality Over Quantity**: Focus on niches with high website need
3. **Response Time**: Reply to inquiries within 15 minutes
4. **Follow Up**: Send a follow-up SMS after 3 days if no reply
5. **Track Everything**: Monitor which niches/cities convert best

## 📞 Support

For issues:
1. Check logs in `logs/`
2. Verify API keys are valid
3. Ensure rate limits not exceeded
4. Review error messages in CSV files

---

**Ready to start? Run: `./setup.sh`**
