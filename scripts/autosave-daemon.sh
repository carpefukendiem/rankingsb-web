#!/bin/bash
# AUTOSAVE DAEMON - Johnny 5 Workspace
# Automatically commits changes to git every 2 minutes
# Ensures no work is lost on unexpected session close

WORKSPACE="/Users/rubenruiz/.openclaw/workspace"
LOG_FILE="$WORKSPACE/.autosave.log"
PID_FILE="$WORKSPACE/.autosave.pid"

# Function to log with timestamp
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" >> "$LOG_FILE"
}

# Function to perform autosave
autosave() {
    cd "$WORKSPACE" || exit 1
    
    # Check if there are changes to commit
    if ! git diff --quiet HEAD || ! git diff --cached --quiet; then
        # Add all changes
        git add -A >> "$LOG_FILE" 2>&1
        
        # Commit with timestamp
        git commit -m "Autosave: $(date '+%Y-%m-%d %H:%M:%S') - Workspace sync" >> "$LOG_FILE" 2>&1
        
        if [ $? -eq 0 ]; then
            log "✅ Autosave successful"
        else
            log "❌ Autosave failed"
        fi
    fi
}

# Main loop
main() {
    # Save PID
    echo $$ > "$PID_FILE"
    
    log "🚀 Autosave daemon started"
    
    while true; do
        autosave
        # Sleep for 2 minutes
        sleep 120
    done
}

# Handle shutdown gracefully
cleanup() {
    log "🛑 Autosave daemon stopping"
    rm -f "$PID_FILE"
    # One final save
    autosave
    exit 0
}

trap cleanup SIGTERM SIGINT

# Start
main
