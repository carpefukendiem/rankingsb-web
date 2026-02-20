#!/bin/bash
# MAKE AUTOSAVE DEFAULT
# Configures Johnny 5 workspace to autosave by default

WORKSPACE="/Users/rubenruiz/.openclaw/workspace"
AUTOSAVE_SCRIPT="$WORKSPACE/autosave.sh"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo "🚀 Setting up AUTOSAVE as DEFAULT for Johnny 5 Workspace"
echo "=========================================================="
echo ""

# 1. Enable autosave in config
echo -e "${YELLOW}Step 1: Enabling autosave in config...${NC}"
sed -i '' 's/AUTOSAVE_ENABLED=.*/AUTOSAVE_ENABLED=true/' "$WORKSPACE/.autosave-config"
echo -e "${GREEN}✅ Autosave enabled${NC}"
echo ""

# 2. Create shell hook for automatic start
echo -e "${YELLOW}Step 2: Creating shell hook...${NC}"

HOOK_SCRIPT="$WORKSPACE/.autosave-hook.sh"
cat > "$HOOK_SCRIPT" << 'EOF'
#!/bin/bash
# Autosave hook - starts autosave when entering workspace

WORKSPACE="/Users/rubenruiz/.openclaw/workspace"
PID_FILE="$WORKSPACE/.autosave.pid"

# Check if autosave is already running
if [ ! -f "$PID_FILE" ] || ! ps -p "$(cat "$PID_FILE")" > /dev/null 2>&1; then
    # Check if enabled
    if grep -q "AUTOSAVE_ENABLED=true" "$WORKSPACE/.autosave-config" 2>/dev/null; then
        "$WORKSPACE/autosave.sh" start > /dev/null 2>&1
    fi
fi
EOF

chmod +x "$HOOK_SCRIPT"
echo -e "${GREEN}✅ Shell hook created${NC}"
echo ""

# 3. Add to shell profile for automatic start
echo -e "${YELLOW}Step 3: Adding to shell profile...${NC}"

SHELL_PROFILE=""
if [ -f "$HOME/.zshrc" ]; then
    SHELL_PROFILE="$HOME/.zshrc"
elif [ -f "$HOME/.bash_profile" ]; then
    SHELL_PROFILE="$HOME/.bash_profile"
elif [ -f "$HOME/.bashrc" ]; then
    SHELL_PROFILE="$HOME/.bashrc"
fi

if [ -n "$SHELL_PROFILE" ]; then
    # Check if already added
    if ! grep -q "AUTOSAVE_HOOK" "$SHELL_PROFILE" 2>/dev/null; then
        echo "" >> "$SHELL_PROFILE"
        echo "# Johnny 5 Workspace Autosave Hook" >> "$SHELL_PROFILE"
        echo "export AUTOSAVE_HOOK=1" >> "$SHELL_PROFILE"
        echo "if [ -f \"$WORKSPACE/.autosave-hook.sh\" ]; then" >> "$SHELL_PROFILE"
        echo "    source \"$WORKSPACE/.autosave-hook.sh\"" >> "$SHELL_PROFILE"
        echo "fi" >> "$SHELL_PROFILE"
        echo -e "${GREEN}✅ Added to $SHELL_PROFILE${NC}"
    else
        echo -e "${GREEN}✅ Already in shell profile${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  Could not find shell profile. Please add manually:${NC}"
    echo "source $HOOK_SCRIPT"
fi
echo ""

# 4. Create git post-commit hook (saves after each manual commit too)
echo -e "${YELLOW}Step 4: Setting up git hooks...${NC}"

mkdir -p "$WORKSPACE/.git/hooks"
cat > "$WORKSPACE/.git/hooks/post-commit" << 'EOF'
#!/bin/bash
# Post-commit hook - log manual commits

echo "[$(date '+%Y-%m-%d %H:%M:%S')] Manual commit detected" >> "$WORKSPACE/.autosave.log"
EOF

chmod +x "$WORKSPACE/.git/hooks/post-commit"
echo -e "${GREEN}✅ Git hooks configured${NC}"
echo ""

# 5. Start autosave now
echo -e "${YELLOW}Step 5: Starting autosave daemon...${NC}"
"$AUTOSAVE_SCRIPT" start
echo ""

# 6. Show status
echo -e "${YELLOW}Step 6: Status check...${NC}"
"$AUTOSAVE_SCRIPT" status
echo ""

# Summary
echo "=========================================================="
echo -e "${GREEN}🎉 AUTOSAVE IS NOW DEFAULT!${NC}"
echo ""
echo "What this means:"
echo "  • Your work is automatically saved every 2 minutes"
echo "  • All changes are committed to git automatically"
echo "  • If session crashes, latest work is preserved"
echo "  • Autosave starts automatically when you enter workspace"
echo ""
echo "Commands:"
echo "  ./autosave.sh status    - Check if running"
echo "  ./autosave.sh stop      - Stop autosave"
echo "  ./autosave.sh log       - View recent saves"
echo "  ./autosave.sh now       - Force immediate save"
echo ""
echo "Config: $WORKSPACE/.autosave-config"
echo "Log:    $WORKSPACE/.autosave.log"
echo ""
echo -e "${GREEN}✅ You can now work worry-free!${NC}"
