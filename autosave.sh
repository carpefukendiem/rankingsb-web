#!/bin/bash
# AUTOSAVE CONTROL SCRIPT
# Manage the autosave daemon

WORKSPACE="/Users/rubenruiz/.openclaw/workspace"
DAEMON_SCRIPT="$WORKSPACE/scripts/autosave-daemon.sh"
PID_FILE="$WORKSPACE/.autosave.pid"
CONFIG_FILE="$WORKSPACE/.autosave-config"

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

show_help() {
    echo "Johnny 5 Workspace Autosave Manager"
    echo ""
    echo "Usage: ./autosave.sh [command]"
    echo ""
    echo "Commands:"
    echo "  start       Start the autosave daemon"
    echo "  stop        Stop the autosave daemon"
    echo "  restart     Restart the autosave daemon"
    echo "  status      Check if autosave is running"
    echo "  log         View recent autosave log"
    echo "  enable      Enable autosave (set in config)"
    echo "  disable     Disable autosave (set in config)"
    echo "  now         Force immediate save"
    echo "  config      Edit autosave configuration"
    echo "  help        Show this help message"
    echo ""
}

start_autosave() {
    if [ -f "$PID_FILE" ]; then
        PID=$(cat "$PID_FILE")
        if ps -p "$PID" > /dev/null 2>&1; then
            echo -e "${YELLOW}⚠️  Autosave is already running (PID: $PID)${NC}"
            return 1
        fi
    fi
    
    # Check if enabled in config
    if [ -f "$CONFIG_FILE" ]; then
        ENABLED=$(grep "AUTOSAVE_ENABLED" "$CONFIG_FILE" | cut -d'=' -f2)
        if [ "$ENABLED" != "true" ]; then
            echo -e "${RED}❌ Autosave is disabled in config${NC}"
            echo "Run: ./autosave.sh enable"
            return 1
        fi
    fi
    
    # Start daemon
    nohup "$DAEMON_SCRIPT" > /dev/null 2>&1 &
    sleep 1
    
    if [ -f "$PID_FILE" ]; then
        PID=$(cat "$PID_FILE")
        echo -e "${GREEN}✅ Autosave daemon started (PID: $PID)${NC}"
        echo -e "${GREEN}💾 Saving every 2 minutes${NC}"
    else
        echo -e "${RED}❌ Failed to start autosave${NC}"
        return 1
    fi
}

stop_autosave() {
    if [ -f "$PID_FILE" ]; then
        PID=$(cat "$PID_FILE")
        if ps -p "$PID" > /dev/null 2>&1; then
            kill "$PID"
            rm -f "$PID_FILE"
            echo -e "${GREEN}✅ Autosave daemon stopped${NC}"
        else
            rm -f "$PID_FILE"
            echo -e "${YELLOW}⚠️  Autosave was not running${NC}"
        fi
    else
        echo -e "${YELLOW}⚠️  Autosave is not running${NC}"
    fi
}

show_status() {
    if [ -f "$PID_FILE" ]; then
        PID=$(cat "$PID_FILE")
        if ps -p "$PID" > /dev/null 2>&1; then
            echo -e "${GREEN}✅ Autosave is RUNNING (PID: $PID)${NC}"
            
            # Show last save time
            if [ -f "$WORKSPACE/.autosave.log" ]; then
                LAST_SAVE=$(tail -1 "$WORKSPACE/.autosave.log" | grep "Autosave successful" | tail -1)
                if [ -n "$LAST_SAVE" ]; then
                    echo -e "${GREEN}💾 Last save: $(echo "$LAST_SAVE" | cut -d']' -f1 | tr -d '[')${NC}"
                fi
            fi
        else
            echo -e "${RED}❌ Autosave is STOPPED (stale PID file)${NC}"
            rm -f "$PID_FILE"
        fi
    else
        echo -e "${RED}❌ Autosave is STOPPED${NC}"
    fi
}

show_log() {
    if [ -f "$WORKSPACE/.autosave.log" ]; then
        echo "Recent autosave activity:"
        echo "========================"
        tail -20 "$WORKSPACE/.autosave.log"
    else
        echo "No autosave log found"
    fi
}

enable_autosave() {
    if [ -f "$CONFIG_FILE" ]; then
        sed -i '' 's/AUTOSAVE_ENABLED=false/AUTOSAVE_ENABLED=true/' "$CONFIG_FILE"
        echo -e "${GREEN}✅ Autosave enabled${NC}"
        echo "Run: ./autosave.sh start"
    else
        echo "Config file not found"
    fi
}

disable_autosave() {
    if [ -f "$CONFIG_FILE" ]; then
        sed -i '' 's/AUTOSAVE_ENABLED=true/AUTOSAVE_ENABLED=false/' "$CONFIG_FILE"
        echo -e "${YELLOW}⚠️  Autosave disabled${NC}"
        stop_autosave
    else
        echo "Config file not found"
    fi
}

force_save() {
    echo "🔄 Forcing immediate save..."
    cd "$WORKSPACE" || exit 1
    git add -A
    git commit -m "Manual autosave: $(date '+%Y-%m-%d %H:%M:%S')"
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Saved successfully${NC}"
    else
        echo -e "${YELLOW}⚠️  Nothing to save or save failed${NC}"
    fi
}

edit_config() {
    if [ -f "$CONFIG_FILE" ]; then
        ${EDITOR:-nano} "$CONFIG_FILE"
    else
        echo "Config file not found"
    fi
}

# Main command handler
case "${1:-help}" in
    start)
        start_autosave
        ;;
    stop)
        stop_autosave
        ;;
    restart)
        stop_autosave
        sleep 1
        start_autosave
        ;;
    status)
        show_status
        ;;
    log)
        show_log
        ;;
    enable)
        enable_autosave
        ;;
    disable)
        disable_autosave
        ;;
    now|save)
        force_save
        ;;
    config)
        edit_config
        ;;
    help|--help|-h|*)
        show_help
        ;;
esac
