# SYSTEM OVERVIEW

## Affiliate Website System - Complete 4-Stage Pipeline

### Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      AFFILIATE WEBSITE SYSTEM                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  STAGE 1: SCOUT                    STAGE 2: BUILDER             │
│  ┌──────────────┐                  ┌──────────────┐             │
│  │ Google Maps  │                  │  Templates   │             │
│  │   Search     │──────────▶│  (niche-based)│             │
│  └──────────────┘                  └──────────────┘             │
│         │                                  │                     │
│         ▼                                  ▼                     │
│  ┌──────────────┐                  ┌──────────────┐             │
│  │ PageSpeed    │                  │   Vercel     │             │
│  │   Check      │                  │  Deploy      │             │
│  └──────────────┘                  └──────────────┘             │
│         │                                  │                     │
│         ▼                                  ▼                     │
│  ┌──────────────┐                  ┌──────────────┐             │
│  │ Leads CSV    │                  │  Live Demo   │             │
│  │ (ranked)     │                  │    URL       │             │
│  └──────────────┘                  └──────────────┘             │
│                                              │                   │
│  STAGE 3: OUTREACH ◀───────────────────────┘                   │
│  ┌──────────────┐                                               │
│  │   Twilio     │                                               │
│  │    SMS       │                                               │
│  └──────────────┘                                               │
│         │                                                        │
│         ▼                                                        │
│  ┌──────────────┐                                               │
│  │  Business    │                                               │
│  │   Owner      │                                               │
│  └──────────────┘                                               │
│         │                                                        │
│         ▼                                                        │
│  STAGE 4: CLOSER                                                │
│  ┌──────────────┐                                               │
│  │   Analyze    │                                               │
│  │   Reply      │                                               │
│  └──────────────┘                                               │
│         │                                                        │
│         ▼                                                        │
│  ┌──────────────┐     ┌──────────────┐     ┌──────────────┐    │
│  │   Discord    │     │     CRM      │     │   Convert    │    │
│  │ Notification │     │    Log       │     │  ($150 CPA)  │    │
│  └──────────────┘     └──────────────┘     └──────────────┘    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### File Structure

```
affiliate-website-system/
│
├── 📁 scripts/                    # Core pipeline scripts
│   ├── scout.py                   # STAGE 1: Lead finder
│   ├── builder.py                 # STAGE 2: Demo creator
│   ├── outreach.py                # STAGE 3: SMS sender
│   ├── closer.py                  # STAGE 4: Reply handler
│   ├── affiliate.py               # Affiliate tracking module
│   └── webhook_server.py          # Twilio webhook receiver
│
├── 📁 templates/                  # Website templates
│   ├── plumber/index.html         # Plumbing business template
│   ├── electrician/               # (ready for expansion)
│   ├── salon/                     # (ready for expansion)
│   ├── landscaping/               # (ready for expansion)
│   ├── autorepair/                # (ready for expansion)
│   └── generic/index.html         # Fallback template
│
├── 📁 data/                       # Data storage
│   ├── leads/                     # Scout output (CSV)
│   └── crm/                       # SMS logs, replies, conversions
│
├── 📁 logs/                       # Execution logs
│   ├── scout.log
│   ├── builder.log
│   ├── outreach.log
│   ├── closer.log
│   └── webhook.log
│
├── 📁 builds/                     # Temporary build files
│
├── config.yaml                    # Target cities/niches config
├── .env.example                   # API keys template
├── requirements.txt               # Python dependencies
├── run-pipeline.sh               # One-command runner
├── setup.sh                       # Quick setup script
├── README-AFFILIATE.md           # Full documentation
├── QUICKSTART.md                 # 5-minute start guide
└── SYSTEM.md                     # This file
```

### Revenue Model

| Metric | Target | Calculation |
|--------|--------|-------------|
| Daily Leads | 100 | Via Google Maps API |
| SMS Open Rate | 40% | 40 opens/day |
| Click Rate | 10% | 4 clicks/day |
| Conversion Rate | 25% | 1 sale/day |
| Commission per Sale | $150 | Affiliate CPA |
| **Daily Revenue** | **$150** | |
| **Monthly Revenue** | **$4,500** | 30 days |
| **Annual Revenue** | **$54,000** | |

### Supported Affiliate Programs

| Platform | Commission | Best For |
|----------|-----------|----------|
| Base44 | $100+ | Trades, simple sites |
| Wix | $100+ | Easy editing, small biz |
| Squarespace | $200 | Professional, design-focused |
| GoDaddy | $50+ | Budget-conscious |
| Bluehost | $65 | WordPress sites |

### API Integrations

| Service | Purpose | Rate Limits |
|---------|---------|-------------|
| Google Places API | Business search | 100 req/day free |
| PageSpeed Insights | Website scoring | 100 req/day free |
| Vercel REST API | Deploy demos | 6000 req/hour |
| Twilio SMS | Send messages | Per account |
| Discord Webhook | Notifications | 5 req/2 seconds |

### Data Flow

1. **Scout** outputs: `data/leads/leads_CITY_NICHE_DATE.csv`
   - Columns: id, name, phone, address, website, pagespeed_score, flag_reason, status, demo_url, sms_sent

2. **Builder** updates CSV with: `demo_url`, `status='demo_built'`

3. **Outreach** logs to: `data/crm/sms_log_DATE.csv`
   - Tracks: timestamp, business, phone, message, status

4. **Closer** logs to: `data/crm/replies_DATE.csv`
   - Tracks: reply text, analysis, brief, action needed

5. **Affiliate** logs to: `data/crm/conversions_DATE.csv`
   - Tracks: platform, commission, payout status

### Key Features

✅ **Automated Lead Scoring** - Ranks by PageSpeed score (worst first)
✅ **Smart Templating** - Niche-specific designs
✅ **One-Click Deploy** - Vercel subdomain in seconds
✅ **Compliance Ready** - Business hours only, opt-out handling
✅ **Full Analytics** - Conversion tracking by platform
✅ **Webhook Support** - Real-time reply processing
✅ **Discord Notifications** - Instant alerts on replies/sales

### Security Considerations

- API keys stored in `.env` (gitignored)
- Phone numbers encrypted at rest (recommended implementation)
- Rate limiting on all external APIs
- No PII logged to console
- Opt-out honored immediately

### Scaling Strategy

**Phase 1 (Testing):**
- 10 leads/day
- 1 city, 1 niche
- Manual review

**Phase 2 (Validation):**
- 50 leads/day
- 3 cities, 2 niches
- Automated pipeline

**Phase 3 (Scale):**
- 100+ leads/day
- 10+ cities, 5+ niches
- Full automation

### Performance Targets

| Metric | Target | Monitoring |
|--------|--------|------------|
| Scout runtime | < 5 min | logs/scout_run.log |
| Build time | < 2 min | logs/builder_run.log |
| SMS delivery | > 95% | data/crm/sms_log_*.csv |
| Reply processing | < 1 min | logs/webhook.log |
| Pipeline total | < 15 min | run-pipeline.sh output |

### Next Steps

1. ✅ Copy `.env.example` to `.env` and add API keys
2. ✅ Edit `config.yaml` with your target markets
3. ✅ Run `./setup.sh` to install dependencies
4. ✅ Test with: `python3 scripts/scout.py --city "Your City" --niche plumber --limit 5`
5. ✅ Full pipeline: `./run-pipeline.sh`

---

**Status**: ✅ Production Ready
**Version**: 1.0.0
**Last Updated**: 2024
