# GHL Location Credentials
## GoHighLevel API Configuration

**Last Updated:** February 18, 2026
**Security:** This file contains sensitive API credentials. Do not commit to public repos.

---

## Location IDs

| Business | Location ID | GHL Subdomain | Status |
|----------|-------------|---------------|--------|
| **Rankingsb** | `yrvzyq2jB2me4Z23PFxP` | app.rankingsb.com | ✅ Active |
| **CushionFoamz** | `RaVrmoQzcKFJjHsc9Kxh` | app.rankingsb.com | ✅ Active |

---

## API Configuration

```bash
# Base Configuration
GHL_BASE_URL="https://app.rankingsb.com"
GHL_API_VERSION="v1"

# Location IDs (for scripts)
export RANKINGSB_LOCATION_ID="yrvzyq2jB2me4Z23PFxP"
export CUSHIONFOAMZ_LOCATION_ID="RaVrmoQzcKFJjHsc9Kxh"
```

---

## Usage in Scripts

```bash
# Publish to Rankingsb
./publish-to-ghl.sh article.md $RANKINGSB_LOCATION_ID

# Publish to CushionFoamz
./publish-to-ghl.sh article.md $CUSHIONFOAMZ_LOCATION_ID
```

---

## Quick Reference

**Rankingsb:**
- Location ID: `yrvzyq2jB2me4Z23PFxP`
- Website: www.rankingsb.com
- Focus: SEO services for local businesses

**CushionFoamz:**
- Location ID: `RaVrmoQzcKFJjHsc9Kxh`
- Website: www.cushionfoamz.com
- Focus: Custom foam cushion replacement

---

*File: ACCESS-CREDENTIALS.md*
