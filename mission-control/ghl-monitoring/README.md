# 🎯 Sal's GHL Activity Monitor

Activity monitoring system for Sal at Rankingsb location using GoHighLevel API.

## 📁 Structure

```
ghl-monitoring/
├── ghl-monitor.js      # Main monitoring script
├── test-connection.js  # API connection tester
├── setup.js           # Setup helper (find location ID)
├── run-daily.sh       # Daily automation script
├── config.json        # Configuration file
├── package.json       # Node dependencies info
├── logs/              # Daily activity logs (JSON)
└── reports/           # Daily reports (Markdown)
```

## 🚀 Quick Start

### 1. Configure Location ID

The location ID needs to be found manually from GHL:

**Option A: Use setup helper**
```bash
node setup.js
```

**Option B: Manual setup**
1. Log into GHL → Settings → Business Profile
2. Copy the Location ID from URL or settings
3. Edit `config.json` and add: `"locationId": "your-location-id"`

### 2. Test Connection

```bash
npm test
# or
node test-connection.js
```

### 3. Run Monitor

```bash
npm run monitor
# or
node ghl-monitor.js
```

### 4. View Report

Check `reports/` folder for daily markdown reports.

## 📊 Tracked Activities

| Activity | Description |
|----------|-------------|
| 📞 Calls | Outbound/inbound calls with duration & status |
| 📅 Appointments | Scheduled appointments with contact info |
| 🔄 Pipeline | Contact stage movements, deal value changes |

## 🔄 Automation Setup

### Daily Cron Job (Recommended)

Add to crontab to run daily at 6 PM:

```bash
# Edit crontab
crontab -e

# Add this line (adjust path)
0 18 * * * /Users/rubenruiz/.openclaw/workspace/mission-control/ghl-monitoring/run-daily.sh
```

### Manual Run

```bash
./run-daily.sh
```

## 📄 Output Files

- **Logs**: `logs/YYYY-MM-DD.json` - Raw activity data
- **Reports**: `reports/report-YYYY-MM-DD.md` - Formatted report

## 🔧 Configuration

Edit `config.json`:

```json
{
  "apiKey": "pit-36c7d3ea-abe6-44b0-a0e3-0cf857094125",
  "locationId": "YOUR_LOCATION_ID_HERE",
  "locationName": "Rankingsb",
  "timezone": "America/Los_Angeles",
  "monitoredUser": "Sal",
  "reportEmail": "",
  "webhookUrl": ""
}
```

## 🐛 Troubleshooting

**403 Forbidden**: Location ID is missing or incorrect
**404 Not Found**: Endpoint doesn't exist (API may have changed)
**Empty Results**: No activities recorded for the day

## 📚 API Documentation

- GHL API v1: https://highlevel.stoplight.io/docs/integrations/
- GHL Private Integrations: https://highlevel.stoplight.io/docs/private-integrations/

---
*Last updated: 2026-02-23*
