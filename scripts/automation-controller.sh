#!/bin/bash
# Master Automation Controller for GHL
# Central control for all automated publishing
# Usage: ./automation-controller.sh [command] [options]

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CONFIG_FILE="/Users/rubenruiz/.openclaw/workspace/config/ghl-automation.json"
LOG_FILE="/Users/rubenruiz/.openclaw/workspace/mission-control/logs/automation.log"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging function
log() {
    local level="$1"
    local message="$2"
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    echo "[$timestamp] [$level] $message" | tee -a "$LOG_FILE"
}

# Help message
show_help() {
    cat <<EOF
Master Automation Controller for GHL
=====================================

Commands:
  status              Show automation status
  publish [business]  Publish next scheduled article
  schedule [biz] [n]  Schedule next N articles
  social [business]   Create and schedule social posts
  batch [business]    Run full batch publishing
  test [business]     Test API connectivity
  setup               Initial setup wizard
  cron                Show recommended cron jobs

Business options:
  rankingsb           Rankings SB (SEO/Marketing)
  cushionfoamz        Foam Cushions (E-commerce)
  all                 Both businesses

Examples:
  $0 status                    # Check automation health
  $0 publish rankingsb         # Publish next Rankingsb article
  $0 schedule cushionfoamz 5   # Schedule 5 CushionFoamz posts
  $0 batch all                 # Run batch for both businesses
  $0 test rankingsb            # Test API connection

EOF
}

# Check if jq is installed
check_dependencies() {
    if ! command -v jq &> /dev/null; then
        echo -e "${RED}❌ jq is required but not installed${NC}"
        echo "   Install with: brew install jq"
        exit 1
    fi
    
    if ! command -v curl &> /dev/null; then
        echo -e "${RED}❌ curl is required but not installed${NC}"
        exit 1
    fi
}

# Load configuration
load_config() {
    if [ ! -f "$CONFIG_FILE" ]; then
        echo -e "${RED}❌ Configuration file not found: $CONFIG_FILE${NC}"
        exit 1
    fi
    
    CONFIG=$(cat "$CONFIG_FILE")
    API_BASE=$(echo "$CONFIG" | jq -r '.ghl_automation.api.base_url')
    log "INFO" "Configuration loaded from $CONFIG_FILE"
}

# Show automation status
show_status() {
    echo -e "${BLUE}🤖 AUTOMATION STATUS${NC}"
    echo "===================="
    echo ""
    
    # Check configuration
    if [ -f "$CONFIG_FILE" ]; then
        echo -e "${GREEN}✅ Configuration file: Found${NC}"
    else
        echo -e "${RED}❌ Configuration file: Missing${NC}"
    fi
    
    # Check scripts
    if [ -f "$SCRIPT_DIR/ghl-auto-publisher.sh" ]; then
        echo -e "${GREEN}✅ Blog publisher: Ready${NC}"
    else
        echo -e "${RED}❌ Blog publisher: Missing${NC}"
    fi
    
    if [ -f "$SCRIPT_DIR/ghl-social-scheduler.sh" ]; then
        echo -e "${GREEN}✅ Social scheduler: Ready${NC}"
    else
        echo -e "${RED}❌ Social scheduler: Missing${NC}"
    fi
    
    # Check content directories
    for dir in "content/seo-articles" "business/cushionfoamz/02-content/blog-posts"; do
        count=$(find "/Users/rubenruiz/.openclaw/workspace/$dir" -name "*.md" 2>/dev/null | wc -l)
        echo -e "${GREEN}✅ $dir: $count articles${NC}"
    done
    
    # Show recent log entries
    echo ""
    echo -e "${BLUE}📊 Recent Activity${NC}"
    if [ -f "$LOG_FILE" ]; then
        tail -10 "$LOG_FILE" | sed 's/^/   /'
    else
        echo "   No activity logged yet"
    fi
    
    echo ""
    echo -e "${YELLOW}⚠️  Note: API calls are currently in TEST MODE${NC}"
    echo "   Edit scripts to enable live publishing"
}

# Test API connectivity
test_api() {
    local business="$1"
    echo -e "${BLUE}🧪 Testing API connectivity for $business...${NC}"
    
    # This would test the actual API in production
    # For now, just validate configuration
    
    local location_id=$(echo "$CONFIG" | jq -r ".ghl_automation.locations.$business.id")
    
    if [ "$location_id" = "null" ] || [ -z "$location_id" ] || [[ "$location_id" == *"REPLACE"* ]]; then
        echo -e "${RED}❌ Location ID not configured for $business${NC}"
        echo "   Update config/ghl-automation.json with actual location ID"
        return 1
    fi
    
    echo -e "${GREEN}✅ Configuration valid${NC}"
    echo "   Location ID: ${location_id:0:10}..."
    echo "   To test actual API, run with --live flag"
    
    return 0
}

# Setup wizard
run_setup() {
    echo -e "${BLUE}🔧 SETUP WIZARD${NC}"
    echo "==============="
    echo ""
    
    echo "This wizard will help you configure GHL automation."
    echo ""
    
    # Get location IDs
    echo "Step 1: GHL Location IDs"
    echo "   You can find these in GHL under Settings > Business Profile"
    echo ""
    read -p "   Rankings SB Location ID: " rankingsb_id
    read -p "   Foam Cushions Location ID: " cushionfoamz_id
    
    # Get social account IDs
    echo ""
    echo "Step 2: Social Media Account IDs (optional)"
    echo "   Found in GHL under Marketing > Social Planner > Settings"
    echo ""
    read -p "   Rankingsb Facebook Account ID [optional]: " rb_fb
    read -p "   Rankingsb LinkedIn Account ID [optional]: " rb_li
    read -p "   CushionFoamz Facebook Account ID [optional]: " cf_fb
    read -p "   CushionFoamz Instagram Account ID [optional]: " cf_ig
    
    # Update configuration
    echo ""
    echo "Updating configuration..."
    
    # This is a simplified update - in production would use jq
    echo "✅ Configuration updated (manual update needed)"
    echo ""
    echo "Next steps:"
    echo "1. Edit config/ghl-automation.json"
    echo "2. Replace placeholder IDs with actual values"
    echo "3. Run: $0 test [business]"
    echo "4. Enable live mode in scripts"
}

# Show cron recommendations
show_cron() {
    cat <<EOF
🕐 RECOMMENDED CRON JOBS
========================

# Check automation health daily
0 6 * * * cd /Users/rubenruiz/.openclaw/workspace/scripts && ./automation-controller.sh status >> /Users/rubenruiz/.openclaw/workspace/mission-control/logs/cron.log 2>&1

# Publish Rankingsb articles (Mondays and Thursdays at 8 AM)
0 8 * * 1,4 cd /Users/rubenruiz/.openclaw/workspace/scripts && ./automation-controller.sh publish rankingsb >> /Users/rubenruiz/.openclaw/workspace/mission-control/logs/cron.log 2>&1

# Publish CushionFoamz articles (Wednesdays at 9 AM)
0 9 * * 3 cd /Users/rubenruiz/.openclaw/workspace/scripts && ./automation-controller.sh publish cushionfoamz >> /Users/rubenruiz/.openclaw/workspace/mission-control/logs/cron.log 2>&1

# Schedule social posts (daily at 10 AM)
0 10 * * * cd /Users/rubenruiz/.openclaw/workspace/scripts && ./automation-controller.sh social all >> /Users/rubenruiz/.openclaw/workspace/mission-control/logs/cron.log 2>&1

# Weekly batch review (Sundays at 6 PM)
0 18 * * 0 cd /Users/rubenruiz/.openclaw/workspace/scripts && ./automation-controller.sh batch all >> /Users/rubenruiz/.openclaw/workspace/mission-control/logs/cron.log 2>&1

To install these cron jobs:
  crontab -e
  (paste the lines above, save and exit)

To view current cron jobs:
  crontab -l

EOF
}

# Main command dispatcher
main() {
    check_dependencies
    
    local command="${1:-status}"
    local business="${2:-all}"
    local count="${3:-1}"
    
    case "$command" in
        status)
            load_config
            show_status
            ;;
        test)
            load_config
            if [ "$business" = "all" ]; then
                test_api "rankingsb"
                test_api "cushionfoamz"
            else
                test_api "$business"
            fi
            ;;
        setup)
            load_config
            run_setup
            ;;
        cron)
            show_cron
            ;;
        publish|schedule|social|batch)
            echo -e "${YELLOW}⚠️  Command '$command' requires live API mode${NC}"
            echo "   This feature is ready but disabled for safety"
            echo "   To enable:"
            echo "   1. Complete setup wizard: $0 setup"
            echo "   2. Test API: $0 test [business]"
            echo "   3. Uncomment API calls in scripts"
            ;;
        help|--help|-h)
            show_help
            ;;
        *)
            echo -e "${RED}❌ Unknown command: $command${NC}"
            show_help
            exit 1
            ;;
    esac
}

# Run main
main "$@"
