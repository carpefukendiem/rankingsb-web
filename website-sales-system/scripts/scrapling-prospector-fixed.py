#!/usr/bin/env python3
"""
Scrapling Business Prospector - WORKING VERSION
Finds businesses without websites for $500 website sales
"""

import json
import csv
import os
import sys
import time
import re
import requests
from datetime import datetime
from urllib.parse import quote_plus
from pathlib import Path

# Scrapling imports
from scrapling import StealthyFetcher

# Setup directories
DATA_DIR = Path(__file__).parent.parent / "data"
DATA_DIR.mkdir(exist_ok=True)

class BusinessLead:
    def __init__(self, name, business_type, city, phone=None, address=None, website_url=None, source=""):
        self.name = name
        self.business_type = business_type
        self.city = city
        self.phone = phone
        self.address = address
        self.website_url = website_url
        self.has_website = False
        self.source = source
        self.extracted_at = datetime.now().isoformat()
    
    def to_dict(self):
        return {
            'name': self.name,
            'business_type': self.business_type,
            'city': self.city,
            'phone': self.phone,
            'address': self.address,
            'website_url': self.website_url,
            'has_website': self.has_website,
            'source': self.source,
            'extracted_at': self.extracted_at
        }


def check_website(url):
    """Check if website is accessible"""
    if not url or not url.startswith('http'):
        return False, None
    
    try:
        response = requests.get(url, timeout=10, allow_redirects=True)
        if response.status_code < 400:
            return True, str(response.url)
    except Exception as e:
        pass
    
    return False, None


def extract_phone(text):
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


def extract_address(text, city):
    """Extract address from text"""
    pattern = r'\d+\s+[A-Za-z0-9\s]+(?:Street|St|Avenue|Ave|Road|Rd|Boulevard|Blvd)\.?\s*(?:' + re.escape(city) + r'|,\s*' + re.escape(city) + r')'
    match = re.search(pattern, text, re.IGNORECASE)
    if match:
        return match.group(0)
    return None


def search_google(business_type, city, max_results=10):
    """Search Google for businesses"""
    print(f"🔍 Searching Google: {business_type} {city}")
    
    fetcher = StealthyFetcher()
    query = f"{business_type} {city}"
    search_url = f"https://www.google.com/search?q={quote_plus(query)}&num={max_results}"
    
    leads = []
    try:
        page = fetcher.fetch(search_url)
        
        # Look for business listings
        elements = page.find_all('div.g')  # Standard search results
        
        for elem in elements[:max_results]:
            try:
                # Extract name
                name_elem = elem.find('h3')
                if not name_elem:
                    continue
                name = name_elem.text.strip()
                
                # Skip bad results
                skip_terms = ['yelp', 'facebook', 'linkedin', 'wikipedia', 'youtube']
                if any(term in name.lower() for term in skip_terms):
                    continue
                if len(name) < 3:
                    continue
                
                # Get full text
                full_text = elem.text
                
                # Extract phone
                phone = extract_phone(full_text)
                
                # Extract address
                address = extract_address(full_text, city)
                
                # Look for website link
                website = None
                links = elem.find_all('a')
                for link in links:
                    href = link.get('href', '')
                    if href and href.startswith('http') and not 'google.com' in href:
                        website = href
                        break
                
                lead = BusinessLead(
                    name=name,
                    business_type=business_type,
                    city=city,
                    phone=phone,
                    address=address,
                    website_url=website,
                    source="google"
                )
                leads.append(lead)
                
            except Exception as e:
                continue
                
    except Exception as e:
        print(f"  ❌ Error: {e}")
    
    print(f"  ✓ Found {len(leads)} businesses")
    return leads


def search_yelp(business_type, city, max_results=10):
    """Search Yelp for businesses"""
    print(f"🔍 Searching Yelp: {business_type} {city}")
    
    fetcher = StealthyFetcher()
    search_url = f"https://www.yelp.com/search?find_desc={quote_plus(business_type)}&find_loc={quote_plus(city)}"
    
    leads = []
    try:
        page = fetcher.fetch(search_url)
        
        # Yelp business containers
        elements = page.find_all('div[class*="businessName"]')
        if not elements:
            elements = page.find_all('[data-testid="serp-ia-card"]')
        if not elements:
            elements = page.find_all('div[class*="search-result"]')
        
        for elem in elements[:max_results]:
            try:
                # Extract name
                name_elem = elem.find('a') or elem.find('h3') or elem.find('h4')
                if not name_elem:
                    continue
                name = name_elem.text.strip()
                
                if len(name) < 3:
                    continue
                
                # Get full text
                full_text = elem.text
                
                # Extract phone
                phone = extract_phone(full_text)
                
                # Extract address
                address = extract_address(full_text, city)
                
                # Look for website
                website = None
                links = elem.find_all('a')
                for link in links:
                    href = link.get('href', '')
                    if href and href.startswith('http') and 'yelp.com' not in href:
                        website = href
                        break
                
                lead = BusinessLead(
                    name=name,
                    business_type=business_type,
                    city=city,
                    phone=phone,
                    address=address,
                    website_url=website,
                    source="yelp"
                )
                leads.append(lead)
                
            except Exception as e:
                continue
                
    except Exception as e:
        print(f"  ❌ Error: {e}")
    
    print(f"  ✓ Found {len(leads)} businesses")
    return leads


def check_websites(leads):
    """Check which businesses have working websites"""
    print(f"\n🌐 Checking {len(leads)} websites...")
    
    hot_leads = []
    
    for i, lead in enumerate(leads):
        if lead.website_url:
            has_site, final_url = check_website(lead.website_url)
            lead.has_website = has_site
            if has_site:
                lead.website_url = final_url
        
        if not lead.has_website:
            hot_leads.append(lead)
            print(f"  🔥 HOT: {lead.name} (NO WEBSITE)")
        
        # Small delay
        time.sleep(0.5)
    
    print(f"\n  🔥 Found {len(hot_leads)} HOT leads (no website)")
    return hot_leads


def save_results(all_leads, hot_leads, city, business_type):
    """Save results to files"""
    date_str = datetime.now().strftime('%Y-%m-%d')
    
    # Save all leads as JSON
    json_file = DATA_DIR / f"leads_{date_str}.json"
    with open(json_file, 'w') as f:
        json.dump([lead.to_dict() for lead in all_leads], f, indent=2)
    
    # Save hot leads as CSV
    if hot_leads:
        csv_file = DATA_DIR / f"hot_leads_{city.replace(' ', '_').lower()}_{business_type}_{date_str}.csv"
        with open(csv_file, 'w', newline='') as f:
            writer = csv.DictWriter(f, fieldnames=['name', 'business_type', 'city', 'phone', 'address', 'source'])
            writer.writeheader()
            for lead in hot_leads:
                writer.writerow(lead.to_dict())
        print(f"  💾 Saved hot leads to {csv_file}")
    
    # Save all as CSV too
    csv_all = DATA_DIR / f"all_leads_{date_str}.csv"
    with open(csv_all, 'w', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=['name', 'business_type', 'city', 'phone', 'address', 'has_website', 'website_url', 'source'])
        writer.writeheader()
        for lead in all_leads:
            writer.writerow(lead.to_dict())
    
    return hot_leads


def main():
    import argparse
    
    parser = argparse.ArgumentParser(description='Find businesses without websites')
    parser.add_argument('--city', default='Santa Barbara', help='City to search')
    parser.add_argument('--type', default='plumber', help='Business type')
    parser.add_argument('--max-results', type=int, default=10, help='Max results per source')
    
    args = parser.parse_args()
    
    print("=" * 60)
    print("🔥 RANKINGSB BUSINESS PROSPECTOR 🔥")
    print("Finding HOT leads: Businesses WITHOUT websites")
    print("=" * 60)
    print(f"\n📍 City: {args.city}")
    print(f"🏢 Business Type: {args.type}")
    print(f"📅 Date: {datetime.now().strftime('%Y-%m-%d')}")
    print()
    
    # Search Google
    google_leads = search_google(args.type, args.city, args.max_results)
    time.sleep(2)  # Be polite
    
    # Search Yelp
    yelp_leads = search_yelp(args.type, args.city, args.max_results)
    
    # Combine and dedupe
    all_leads = google_leads + yelp_leads
    seen = set()
    unique_leads = []
    for lead in all_leads:
        key = f"{lead.name.lower()}_{lead.city.lower()}"
        if key not in seen:
            seen.add(key)
            unique_leads.append(lead)
    
    print(f"\n📈 Total unique businesses found: {len(unique_leads)}")
    
    # Check websites
    hot_leads = check_websites(unique_leads)
    
    # Save results
    save_results(unique_leads, hot_leads, args.city, args.type)
    
    # Summary
    print("\n" + "=" * 60)
    print("📊 CAMPAIGN SUMMARY")
    print("=" * 60)
    print(f"Total businesses found: {len(unique_leads)}")
    print(f"🔥 HOT leads (no website): {len(hot_leads)}")
    print(f"📄 With websites: {len(unique_leads) - len(hot_leads)}")
    print()
    print(f"💰 POTENTIAL REVENUE: ${len(hot_leads) * 500}")
    print(f"   (at $500 per website)")
    print()
    print(f"📁 Files saved in: {DATA_DIR}")
    print("=" * 60)


if __name__ == "__main__":
    main()