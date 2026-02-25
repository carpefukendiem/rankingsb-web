#!/usr/bin/env python3
"""
Scrapling Business Prospector for Rankingsb Website Sales
===========================================================

Finds businesses without websites in SoCal cities - HOT leads for $500 website sales.
Uses Scrapling's StealthyFetcher to bypass detection and search Google/Yelp.

Author: Rankingsb Sales Team
Target: 100+ businesses/day without websites
"""

import json
import csv
import os
import sys
import time
import re
import asyncio
import aiohttp
from datetime import datetime
from urllib.parse import quote_plus, urljoin
from pathlib import Path
from typing import List, Dict, Optional, Set
from dataclasses import dataclass, asdict

# Scrapling imports
from scrapling import StealthyFetcher, Fetcher

# Configuration
CITIES = [
    "Santa Barbara", "Goleta", "Ventura", "Oxnard", "Pasadena",
    "Los Angeles", "Irvine", "San Diego", "Huntington Beach", "Long Beach"
]

BUSINESS_TYPES = [
    "HVAC", "plumbing", "electrician", "roofing", "dentist",
    "restaurant", "auto repair", "landscaping", "cleaning services"
]

# Output paths
DATA_DIR = Path("/Users/rubenruiz/.openclaw/workspace/website-sales-system/data")
LOGS_DIR = Path("/Users/rubenruiz/.openclaw/workspace/website-sales-system/logs")

@dataclass
class BusinessLead:
    """Represents a business lead"""
    name: str
    business_type: str
    city: str
    phone: Optional[str] = None
    address: Optional[str] = None
    email: Optional[str] = None
    has_website: bool = False
    website_url: Optional[str] = None
    source: str = ""  # google or yelp
    search_query: str = ""
    extracted_at: str = ""
    
    def to_dict(self) -> Dict:
        return asdict(self)
    
    def is_hot_lead(self) -> bool:
        """A hot lead is a business without a website"""
        return not self.has_website


class WebsiteChecker:
    """Checks if a business has a website"""
    
    def __init__(self, timeout: int = 10):
        self.timeout = timeout
        self.session: Optional[aiohttp.ClientSession] = None
    
    async def __aenter__(self):
        self.session = aiohttp.ClientSession(
            timeout=aiohttp.ClientTimeout(total=self.timeout),
            headers={
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        )
        return self
    
    async def __aexit__(self, exc_type, exc_val, exc_tb):
        if self.session:
            await self.session.close()
    
    async def check_url(self, url: str) -> tuple[bool, Optional[str]]:
        """Check if URL is accessible. Returns (is_valid, final_url)"""
        if not url or not url.startswith('http'):
            return False, None
        
        try:
            async with self.session.get(url, allow_redirects=True) as response:
                if response.status < 400:
                    return True, str(response.url)
        except Exception:
            pass
        return False, None
    
    async def check_business_website(self, business: BusinessLead) -> BusinessLead:
        """Check if business has a working website"""
        if not business.website_url:
            business.has_website = False
            return business
        
        is_valid, final_url = await self.check_url(business.website_url)
        business.has_website = is_valid
        if is_valid:
            business.website_url = final_url
        
        return business


class GoogleScraper:
    """Scrapes business data from Google search results"""
    
    def __init__(self, delay: float = 2.0):
        self.fetcher = StealthyFetcher()
        self.delay = delay
    
    def _extract_phone(self, text: str) -> Optional[str]:
        """Extract phone number from text"""
        # US phone patterns
        patterns = [
            r'\(\d{3}\)\s*\d{3}[\s-]\d{4}',  # (555) 123-4567
            r'\d{3}[\s-]\d{3}[\s-]\d{4}',     # 555-123-4567
            r'\+1[\s-]?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{4}',  # +1 (555) 123-4567
        ]
        for pattern in patterns:
            match = re.search(pattern, text)
            if match:
                return match.group(0)
        return None
    
    def _extract_email(self, text: str) -> Optional[str]:
        """Extract email from text"""
        pattern = r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}'
        match = re.search(pattern, text)
        return match.group(0) if match else None
    
    def _extract_address(self, text: str, city: str) -> Optional[str]:
        """Extract street address from text"""
        # Look for patterns like "123 Main St" or "456 Oak Avenue"
        patterns = [
            r'\d+\s+[A-Za-z0-9\s]+(?:Street|St|Avenue|Ave|Road|Rd|Boulevard|Blvd|Lane|Ln|Drive|Dr|Way|Court|Ct|Plaza|Plz|Suite|Ste)\.?\s*[\w\s,]*' + re.escape(city),
            r'\d+\s+[A-Za-z0-9\s,]+' + re.escape(city),
        ]
        for pattern in patterns:
            match = re.search(pattern, text, re.IGNORECASE)
            if match:
                return match.group(0)
        return None
    
    def search(self, business_type: str, city: str, max_results: int = 20) -> List[BusinessLead]:
        """Search Google for businesses"""
        query = f"{business_type} {city}"
        search_url = f"https://www.google.com/search?q={quote_plus(query)}&num={max_results}"
        
        print(f"🔍 Searching Google: {query}")
        
        leads = []
        try:
            # Use StealthyFetcher to get the page
            page = self.fetcher.get(search_url, stealthy=True)
            
            # Try multiple selectors for business listings
            # Google Local Pack / Business listings
            selectors = [
                'div[data-attrid="kc:/local:place"]',
                'div.g',  # Standard search results
                'div.VkpGBb',  # Local pack results
                'div.dbg0pd',  # Business names
                'div[role="main"] div[data-hveid]',
            ]
            
            for selector in selectors:
                elements = page.find_all(selector)
                for elem in elements:
                    try:
                        # Extract business name
                        name_elem = elem.find('h3') or elem.find('span', attrs={'role': 'heading'}) or elem
                        name = name_elem.text.strip() if name_elem else None
                        
                        if not name or len(name) < 2:
                            continue
                        
                        # Skip non-business results
                        skip_terms = ['yelp', 'facebook', 'linkedin', 'wikipedia', 'youtube', 'twitter']
                        if any(term in name.lower() for term in skip_terms):
                            continue
                        
                        # Get all text content
                        full_text = elem.text
                        
                        # Extract phone
                        phone = self._extract_phone(full_text)
                        
                        # Extract email
                        email = self._extract_email(full_text)
                        
                        # Extract address
                        address = self._extract_address(full_text, city)
                        
                        # Look for website link
                        website_url = None
                        for link in elem.find_all('a', href=True):
                            href = link['href']
                            if href.startswith('http') and not any(x in href for x in ['google', 'yelp', 'facebook.com/business']):
                                website_url = href
                                break
                        
                        lead = BusinessLead(
                            name=name,
                            business_type=business_type,
                            city=city,
                            phone=phone,
                            address=address,
                            email=email,
                            website_url=website_url,
                            source="google",
                            search_query=query,
                            extracted_at=datetime.now().isoformat()
                        )
                        
                        leads.append(lead)
                        
                    except Exception as e:
                        continue
            
            # Also extract from knowledge panels
            knowledge_panels = page.find_all('div', attrs={'data-attrid': True})
            for panel in knowledge_panels:
                try:
                    # Try to find business name in panel
                    name_elem = panel.find('h2') or panel.find('span', {'role': 'heading'})
                    if name_elem:
                        name = name_elem.text.strip()
                        if name and len(name) > 2:
                            full_text = panel.text
                            phone = self._extract_phone(full_text)
                            email = self._extract_email(full_text)
                            address = self._extract_address(full_text, city)
                            
                            # Check if already in leads
                            if not any(l.name == name for l in leads):
                                lead = BusinessLead(
                                    name=name,
                                    business_type=business_type,
                                    city=city,
                                    phone=phone,
                                    address=address,
                                    email=email,
                                    source="google_knowledge",
                                    search_query=query,
                                    extracted_at=datetime.now().isoformat()
                                )
                                leads.append(lead)
                except Exception:
                    continue
            
        except Exception as e:
            print(f"  ❌ Error searching Google: {e}")
        
        # Remove duplicates by name
        seen = set()
        unique_leads = []
        for lead in leads:
            key = lead.name.lower()
            if key not in seen:
                seen.add(key)
                unique_leads.append(lead)
        
        print(f"  ✓ Found {len(unique_leads)} unique businesses")
        time.sleep(self.delay)
        return unique_leads


class YelpScraper:
    """Scrapes business data from Yelp search results"""
    
    def __init__(self, delay: float = 2.0):
        self.fetcher = StealthyFetcher()
        self.delay = delay
    
    def _extract_phone(self, text: str) -> Optional[str]:
        """Extract phone number from text"""
        patterns = [
            r'\(\d{3}\)\s*\d{3}[\s-]\d{4}',
            r'\d{3}[\s-]\d{3}[\s-]\d{4}',
        ]
        for pattern in patterns:
            match = re.search(pattern, text)
            if match:
                return match.group(0)
        return None
    
    def search(self, business_type: str, city: str, max_results: int = 20) -> List[BusinessLead]:
        """Search Yelp for businesses"""
        query = f"{business_type} {city}"
        search_url = f"https://www.yelp.com/search?find_desc={quote_plus(business_type)}&find_loc={quote_plus(city)}"
        
        print(f"🔍 Searching Yelp: {query}")
        
        leads = []
        try:
            page = self.fetcher.get(search_url, stealthy=True)
            
            # Yelp business containers
            selectors = [
                'div[class*="businessName"]',
                'div[class*="search-result"]',
                'li[class*="border-color"]',
                '[data-testid="serp-ia-card"]',
            ]
            
            for selector in selectors:
                elements = page.find_all(selector)
                for elem in elements:
                    try:
                        # Extract business name
                        name_elem = elem.find('a', href=re.compile('/biz/')) or \
                                   elem.find('span', class_=re.compile('businessName')) or \
                                   elem.find('h3') or \
                                   elem.find('a')
                        
                        if not name_elem:
                            continue
                            
                        name = name_elem.text.strip()
                        if not name or len(name) < 2:
                            continue
                        
                        # Skip promoted/sponsored
                        if 'sponsored' in elem.text.lower() or 'ad' in elem.text.lower():
                            continue
                        
                        # Get all text
                        full_text = elem.text
                        
                        # Extract phone
                        phone = self._extract_phone(full_text)
                        
                        # Try to find address
                        address = None
                        address_elem = elem.find('address') or elem.find('p', string=re.compile(r'\d+.*' + re.escape(city)))
                        if address_elem:
                            address = address_elem.text.strip()
                        
                        # Look for website link
                        website_url = None
                        for link in elem.find_all('a', href=True):
                            href = link['href']
                            if href.startswith('http') and 'yelp.com' not in href:
                                website_url = href
                                break
                        
                        lead = BusinessLead(
                            name=name,
                            business_type=business_type,
                            city=city,
                            phone=phone,
                            address=address,
                            website_url=website_url,
                            source="yelp",
                            search_query=query,
                            extracted_at=datetime.now().isoformat()
                        )
                        
                        leads.append(lead)
                        
                    except Exception:
                        continue
            
        except Exception as e:
            print(f"  ❌ Error searching Yelp: {e}")
        
        # Remove duplicates
        seen = set()
        unique_leads = []
        for lead in leads:
            key = lead.name.lower()
            if key not in seen:
                seen.add(key)
                unique_leads.append(lead)
        
        print(f"  ✓ Found {len(unique_leads)} unique businesses")
        time.sleep(self.delay)
        return unique_leads


class Prospector:
    """Main prospecting engine"""
    
    def __init__(self):
        self.google = GoogleScraper()
        self.yelp = YelpScraper()
        self.today = datetime.now().strftime("%Y-%m-%d")
        
        # Ensure directories exist
        DATA_DIR.mkdir(parents=True, exist_ok=True)
        LOGS_DIR.mkdir(parents=True, exist_ok=True)
    
    async def check_websites_batch(self, leads: List[BusinessLead]) -> List[BusinessLead]:
        """Check websites for a batch of leads"""
        print(f"\n🌐 Checking {len(leads)} websites...")
        
        async with WebsiteChecker() as checker:
            tasks = [checker.check_business_website(lead) for lead in leads]
            results = await asyncio.gather(*tasks)
        
        hot_count = sum(1 for r in results if not r.has_website)
        print(f"  🔥 Found {hot_count} HOT leads (no website)")
        
        return list(results)
    
    def save_to_json(self, leads: List[BusinessLead], filename: Optional[str] = None):
        """Save leads to JSON file"""
        if not filename:
            filename = DATA_DIR / f"leads_{self.today}.json"
        
        data = [lead.to_dict() for lead in leads]
        
        # Append to existing file if it exists
        if Path(filename).exists():
            with open(filename, 'r') as f:
                existing = json.load(f)
            data = existing + data
        
        with open(filename, 'w') as f:
            json.dump(data, f, indent=2)
        
        print(f"  💾 Saved {len(data)} total leads to {filename}")
    
    def export_to_csv(self, leads: List[BusinessLead], hot_only: bool = True):
        """Export leads to CSV"""
        if hot_only:
            leads = [l for l in leads if not l.has_website]
            filename = DATA_DIR / f"hot_leads_{self.today}.csv"
        else:
            filename = DATA_DIR / f"all_leads_{self.today}.csv"
        
        if not leads:
            print(f"  ⚠️ No leads to export")
            return
        
        fieldnames = ['name', 'business_type', 'city', 'phone', 'address', 'email', 
                     'has_website', 'website_url', 'source', 'search_query', 'extracted_at']
        
        # Check if file exists for append mode
        file_exists = Path(filename).exists()
        
        with open(filename, 'a' if file_exists else 'w', newline='') as f:
            writer = csv.DictWriter(f, fieldnames=fieldnames)
            if not file_exists:
                writer.writeheader()
            for lead in leads:
                writer.writerow(lead.to_dict())
        
        print(f"  📊 Exported {len(leads)} leads to {filename}")
    
    async def run(self, cities: List[str] = None, business_types: List[str] = None, 
                  max_per_search: int = 10):
        """Run full prospecting campaign"""
        cities = cities or CITIES
        business_types = business_types or BUSINESS_TYPES
        
        print("="*60)
        print("🔥 RANKINGSB BUSINESS PROSPECTOR 🔥")
        print("Finding HOT leads: Businesses WITHOUT websites")
        print("="*60)
        print(f"\n📍 Cities: {len(cities)}")
        print(f"🏢 Business Types: {len(business_types)}")
        print(f"📅 Date: {self.today}\n")
        
        all_leads: List[BusinessLead] = []
        
        # Search for each city/business type combination
        for city in cities:
            for biz_type in business_types:
                print(f"\n🎯 [{city}] + [{biz_type}]")
                
                # Search Google
                try:
                    google_leads = self.google.search(biz_type, city, max_per_search)
                    all_leads.extend(google_leads)
                except Exception as e:
                    print(f"  Google error: {e}")
                
                # Search Yelp
                try:
                    yelp_leads = self.yelp.search(biz_type, city, max_per_search)
                    all_leads.extend(yelp_leads)
                except Exception as e:
                    print(f"  Yelp error: {e}")
        
        # Remove duplicates across all sources
        seen = set()
        unique_leads = []
        for lead in all_leads:
            key = f"{lead.name.lower()}|{lead.city.lower()}"
            if key not in seen:
                seen.add(key)
                unique_leads.append(lead)
        
        print(f"\n📈 Total unique businesses found: {len(unique_leads)}")
        
        # Check websites
        checked_leads = await self.check_websites_batch(unique_leads)
        
        # Save results
        self.save_to_json(checked_leads)
        self.export_to_csv(checked_leads, hot_only=True)
        
        # Summary
        hot_leads = [l for l in checked_leads if not l.has_website]
        print(f"\n{'='*60}")
        print("📊 CAMPAIGN SUMMARY")
        print(f"{'='*60}")
        print(f"Total businesses found: {len(checked_leads)}")
        print(f"🔥 HOT leads (no website): {len(hot_leads)}")
        print(f"📄 With websites: {len(checked_leads) - len(hot_leads)}")
        print(f"\n💰 POTENTIAL REVENUE: ${len(hot_leads) * 500:,}")
        print(f"   (at $500 per website)")
        print(f"\n📁 Files saved in: {DATA_DIR}")
        print(f"{'='*60}\n")
        
        return checked_leads


def main():
    """Main entry point"""
    import argparse
    
    parser = argparse.ArgumentParser(
        description='Rankingsb Business Prospector - Find businesses without websites',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python scrapling-prospector.py                    # Run full campaign
  python scrapling-prospector.py --city "Santa Barbara" --type "plumbing"
  python scrapling-prospector.py --max-results 5    # Quick test run
        """
    )
    
    parser.add_argument('--city', type=str, help='Single city to search')
    parser.add_argument('--type', '--business-type', type=str, help='Single business type')
    parser.add_argument('--max-results', type=int, default=10, help='Max results per search (default: 10)')
    parser.add_argument('--all-leads', action='store_true', help='Export all leads, not just hot ones')
    
    args = parser.parse_args()
    
    # Setup cities and types
    cities = [args.city] if args.city else CITIES
    business_types = [args.type] if args.type else BUSINESS_TYPES
    
    # Run prospector
    prospector = Prospector()
    leads = asyncio.run(prospector.run(
        cities=cities,
        business_types=business_types,
        max_per_search=args.max_results
    ))
    
    # Export all leads if requested
    if args.all_leads:
        prospector.export_to_csv(leads, hot_only=False)
    
    return len([l for l in leads if not l.has_website])


if __name__ == "__main__":
    hot_count = main()
    sys.exit(0 if hot_count > 0 else 1)
