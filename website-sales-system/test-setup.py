#!/usr/bin/env python3
"""
Quick test script to verify Scrapling Prospector setup
"""

import sys
from pathlib import Path

def check_imports():
    """Check all required imports"""
    print("🔍 Checking dependencies...")
    
    errors = []
    
    try:
        import scrapling
        print(f"  ✓ scrapling {scrapling.__version__}")
    except ImportError as e:
        errors.append(f"✗ scrapling: {e}")
    
    try:
        import aiohttp
        print(f"  ✓ aiohttp")
    except ImportError as e:
        errors.append(f"✗ aiohttp: {e}")
    
    if errors:
        print("\n❌ Missing dependencies:")
        for err in errors:
            print(f"  {err}")
        print("\nInstall with: pip install -r requirements-scrapling.txt")
        return False
    
    print("\n✅ All dependencies installed!")
    return True

def check_directories():
    """Check required directories exist"""
    print("\n📁 Checking directories...")
    
    base = Path("/Users/rubenruiz/.openclaw/workspace/website-sales-system")
    dirs = [base / "data", base / "logs"]
    
    for d in dirs:
        if d.exists():
            print(f"  ✓ {d.name}/")
        else:
            d.mkdir(parents=True, exist_ok=True)
            print(f"  ✓ {d.name}/ (created)")
    
    return True

def test_scraper_import():
    """Test that scraper script can be imported"""
    print("\n🧪 Testing scraper script...")
    
    sys.path.insert(0, str(Path(__file__).parent / "scripts"))
    
    try:
        # Import key classes (don't run actual scraping)
        from scrapling_prospector import BusinessLead, Prospector, WebsiteChecker
        print("  ✓ Main classes importable")
        
        # Test data class creation
        lead = BusinessLead(
            name="Test Business",
            business_type="plumbing",
            city="Santa Barbara",
            phone="(555) 123-4567",
            has_website=False
        )
        print(f"  ✓ BusinessLead dataclass works")
        print(f"     Example: {lead.name} - Hot Lead: {lead.is_hot_lead()}")
        
        return True
    except Exception as e:
        print(f"  ✗ Import error: {e}")
        return False

def main():
    print("="*50)
    print("🔥 Rankingsb Prospector Setup Test")
    print("="*50)
    
    all_passed = True
    
    all_passed &= check_imports()
    all_passed &= check_directories()
    all_passed &= test_scraper_import()
    
    print("\n" + "="*50)
    if all_passed:
        print("✅ Setup complete! Ready to find HOT leads.")
        print("\nNext steps:")
        print("  1. Run: python scripts/scrapling-prospector.py --city \"Santa Barbara\" --type \"plumbing\"")
        print("  2. Check results in: data/hot_leads_*.csv")
        print("  3. Start calling those $500 prospects!")
    else:
        print("❌ Setup incomplete. Fix errors above.")
    print("="*50)
    
    return 0 if all_passed else 1

if __name__ == "__main__":
    sys.exit(main())
