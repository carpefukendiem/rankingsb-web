#!/bin/bash
# Quick runner script for Scrapling Business Prospector
# Usage: ./run-prospector.sh [options]

cd "$(dirname "$0")"

# Default settings
MAX_RESULTS=10
ALL_LEADS=false

# Parse arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    --quick)
      MAX_RESULTS=5
      shift
      ;;
    --deep)
      MAX_RESULTS=30
      shift
      ;;
    --all-leads)
      ALL_LEADS=true
      shift
      ;;
    --city)
      CITY="$2"
      shift 2
      ;;
    --type)
      TYPE="$2"
      shift 2
      ;;
    --help)
      echo "Rankingsb Business Prospector Runner"
      echo ""
      echo "Usage: ./run-prospector.sh [options]"
      echo ""
      echo "Options:"
      echo "  --quick       Fast scan (5 results per search)"
      echo "  --deep        Deep scan (30 results per search)"
      echo "  --all-leads   Export all leads, not just hot ones"
      echo "  --city CITY   Search specific city only"
      echo "  --type TYPE   Search specific business type only"
      echo "  --help        Show this help"
      echo ""
      echo "Examples:"
      echo "  ./run-prospector.sh                    # Full campaign"
      echo "  ./run-prospector.sh --quick            # Quick test"
      echo "  ./run-prospector.sh --city \"Santa Barbara\" --type \"plumbing\""
      exit 0
      ;;
    *)
      echo "Unknown option: $1"
      echo "Run with --help for usage"
      exit 1
      ;;
  esac
done

# Build command
CMD="python3 scripts/scrapling-prospector.py --max-results $MAX_RESULTS"

if [ "$ALL_LEADS" = true ]; then
  CMD="$CMD --all-leads"
fi

if [ -n "$CITY" ]; then
  CMD="$CMD --city \"$CITY\""
fi

if [ -n "$TYPE" ]; then
  CMD="$CMD --type \"$TYPE\""
fi

# Run
echo "🚀 Starting Rankingsb Business Prospector"
echo "Command: $CMD"
echo ""
eval $CMD
