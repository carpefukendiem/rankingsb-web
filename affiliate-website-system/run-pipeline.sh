#!/bin/bash
# Affiliate Website System - Full Pipeline Runner
# Runs all 4 stages: Scout → Builder → Outreach → Monitor

set -e  # Exit on error

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging function
log() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

success() {
    echo -e "${GREEN}[✓]${NC} $1"
}

warning() {
    echo -e "${YELLOW}[!]${NC} $1"
}

error() {
    echo -e "${RED}[✗]${NC} $1"
}

# Create necessary directories
mkdir -p data/leads data/crm logs builds templates

log "=== AFFILIATE WEBSITE SYSTEM PIPELINE ==="
log "Starting full pipeline execution...\n"

# Check Python environment
if ! command -v python3 &> /dev/null; then
    error "Python 3 is not installed"
    exit 1
fi

# Check if virtual environment exists, create if not
if [ ! -d "venv" ]; then
    log "Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
source venv/bin/activate

# Install dependencies
log "Installing dependencies..."
pip install -q -r requirements.txt
success "Dependencies installed"

echo ""

# ==============================================================================
# STAGE 1: SCOUT - Find Leads
# ==============================================================================
log "=== STAGE 1: SCOUT (Lead Finder) ==="

if [ "$1" == "--skip-scout" ]; then
    warning "Skipping Scout stage (using existing leads)"
else
    log "Searching for businesses without websites or poor PageSpeed scores..."
    
    # Run scout in batch mode
    python3 scripts/scout.py --batch 2>&1 | tee logs/scout_run.log
    
    if [ ${PIPESTATUS[0]} -eq 0 ]; then
        success "Scout stage complete"
        
        # Count new leads
        LEAD_FILES=$(find data/leads -name "leads_*.csv" -mtime -1 | wc -l)
        LEAD_COUNT=$(find data/leads -name "leads_*.csv" -mtime -1 -exec cat {} \; | wc -l)
        LEAD_COUNT=$((LEAD_COUNT - LEAD_FILES))  # Subtract header rows
        
        log "Found $LEAD_COUNT new leads across $LEAD_FILES files"
    else
        error "Scout stage failed - check logs/scout_run.log"
        exit 1
    fi
fi

echo ""

# ==============================================================================
# STAGE 2: BUILDER - Create Demo Websites
# ==============================================================================
log "=== STAGE 2: BUILDER (Demo Creator) ==="

# Find the most recent lead files
LATEST_CSV=$(find data/leads -name "leads_*.csv" -mtime -1 | sort -r | head -1)

if [ -z "$LATEST_CSV" ]; then
    warning "No recent lead files found"
    # Try any lead file
    LATEST_CSV=$(find data/leads -name "leads_*.csv" | sort -r | head -1)
fi

if [ -n "$LATEST_CSV" ]; then
    log "Building demo websites from: $LATEST_CSV"
    
    # Build demos for top 10 leads (adjust with --limit flag)
    BUILD_LIMIT=${BUILD_LIMIT:-10}
    python3 scripts/builder.py --input "$LATEST_CSV" --limit $BUILD_LIMIT 2>&1 | tee logs/builder_run.log
    
    if [ ${PIPESTATUS[0]} -eq 0 ]; then
        success "Builder stage complete"
        
        # Count demos built
        DEMO_COUNT=$(grep -c "demo_built" "$LATEST_CSV" 2>/dev/null || echo "0")
        log "Built $DEMO_COUNT demo websites"
    else
        warning "Builder stage had issues - check logs/builder_run.log"
    fi
else
    warning "No lead files found to process"
fi

echo ""

# ==============================================================================
# STAGE 3: OUTREACH - Send SMS
# ==============================================================================
log "=== STAGE 3: OUTREACH (SMS Sender) ==="

# Check if Twilio is configured
if [ -z "$TWILIO_ACCOUNT_SID" ] || [ -z "$TWILIO_AUTH_TOKEN" ]; then
    if grep -q "TWILIO_ACCOUNT_SID=your_" .env 2>/dev/null; then
        warning "Twilio not configured - skipping SMS outreach"
        warning "Edit .env file with your Twilio credentials to enable SMS"
    else
        log "Sending SMS to leads with demos..."
        
        # Use same CSV as builder
        if [ -n "$LATEST_CSV" ]; then
            SMS_LIMIT=${SMS_LIMIT:-50}
            python3 scripts/outreach.py --input "$LATEST_CSV" --limit $SMS_LIMIT 2>&1 | tee logs/outreach_run.log
            
            if [ ${PIPESTATUS[0]} -eq 0 ]; then
                success "Outreach stage complete"
            else
                warning "Outreach stage had issues - check logs/outreach_run.log"
            fi
        fi
    fi
else
    log "Twilio credentials found in environment"
    
    if [ -n "$LATEST_CSV" ]; then
        SMS_LIMIT=${SMS_LIMIT:-50}
        python3 scripts/outreach.py --input "$LATEST_CSV" --limit $SMS_LIMIT 2>&1 | tee logs/outreach_run.log
        
        if [ ${PIPESTATUS[0]} -eq 0 ]; then
            success "Outreach stage complete"
        else
            warning "Outreach stage had issues - check logs/outreach_run.log"
        fi
    fi
fi

echo ""

# ==============================================================================
# STAGE 4: CLOSER - Check Replies
# ==============================================================================
log "=== STAGE 4: CLOSER (Reply Handler) ==="

log "Checking for new SMS replies..."
python3 scripts/closer.py --check-replies 2>&1 | tee logs/closer_run.log

success "Closer stage complete"

echo ""

# ==============================================================================
# SUMMARY
# ==============================================================================
log "=== PIPELINE COMPLETE ==="

echo ""
echo "Summary:"
echo "--------"

# Count totals
TOTAL_LEADS=$(find data/leads -name "leads_*.csv" -exec cat {} \; 2>/dev/null | grep -v "^id," | wc -l)
TOTAL_DEMOS=$(find data/leads -name "leads_*.csv" -exec grep -l "demo_built" {} \; 2>/dev/null | wc -l)
TOTAL_SMS=$(find data/crm -name "sms_log_*.csv" -exec cat {} \; 2>/dev/null | grep -v "^timestamp," | wc -l)
TOTAL_REPLIES=$(find data/crm -name "replies_*.csv" -exec cat {} \; 2>/dev/null | grep -v "^timestamp," | wc -l)

echo "Total leads in system: $TOTAL_LEADS"
echo "Demos built: $TOTAL_DEMOS"
echo "SMS sent: $TOTAL_SMS"
echo "Replies received: $TOTAL_REPLIES"

echo ""
echo "Files created:"
echo "  - Lead files: data/leads/"
echo "  - CRM logs: data/crm/"
echo "  - Build logs: logs/"

echo ""
success "Pipeline finished successfully!"
echo ""
echo "Next steps:"
echo "  1. Check logs/ for detailed output"
echo "  2. Review leads in data/leads/"
echo "  3. Monitor replies with: python3 scripts/closer.py --check-replies"
echo "  4. Set up cron for automation (see README-AFFILIATE.md)"
echo ""

# Deactivate virtual environment
deactivate
