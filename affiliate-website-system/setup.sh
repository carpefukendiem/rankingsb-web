#!/bin/bash
# Quick Setup Script for Affiliate Website System

echo "=== Affiliate Website System Setup ==="
echo ""

# Check Python version
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is required but not installed"
    exit 1
fi

PYTHON_VERSION=$(python3 --version 2>&1 | awk '{print $2}')
echo "✓ Python version: $PYTHON_VERSION"

# Create virtual environment
if [ ! -d "venv" ]; then
    echo "→ Creating virtual environment..."
    python3 -m venv venv
fi

echo "✓ Virtual environment ready"

# Activate and install
source venv/bin/activate
echo "→ Installing dependencies..."
pip install -q -r requirements.txt
echo "✓ Dependencies installed"

# Create directories
echo "→ Creating directories..."
mkdir -p data/leads data/crm logs builds templates
echo "✓ Directories created"

# Check for .env file
if [ ! -f ".env" ]; then
    echo ""
    echo "⚠️  Configuration needed!"
    echo "→ Copy .env.example to .env and add your API keys:"
    echo "   cp .env.example .env"
    echo "   nano .env"
    echo ""
else
    echo "✓ .env file exists"
fi

echo ""
echo "=== Setup Complete ==="
echo ""
echo "Next steps:"
echo "1. Configure your API keys in .env"
echo "2. Edit config.yaml to set your target cities/niches"
echo "3. Run the pipeline: ./run-pipeline.sh"
echo ""
echo "Or test individual stages:"
echo "  python3 scripts/scout.py --city 'Miami, FL' --niche plumber --limit 10"
echo "  python3 scripts/builder.py --input data/leads/leads_Miami_FL_plumber_*.csv"
echo ""

# Deactivate
deactivate
