#!/usr/bin/env python3
"""
STAGE 1: SCOUT - Lead Finder
Searches Google Maps for businesses, flags those without websites or poor PageSpeed scores.
Outputs ranked CSV of leads.
"""

import os
import csv
import json
import time
import logging
from datetime import datetime
from typing import List, Dict, Optional, Tuple
from urllib.parse import quote_plus

import requests
import yaml
from dotenv import load_dotenv
from dateutil import parser as date_parser

# Load environment variables
load_dotenv()

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('logs/scout.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger('scout')

# Ensure logs directory exists
os.makedirs('logs', exist_ok=True)
os.makedirs('data/leads', exist_ok=True)


class PageSpeedChecker:
    """Checks website performance using Google PageSpeed Insights API."""
    
    def __init__(self, api_key: Optional[str] = None):
        self.api_key = api_key or os.getenv('PAGESPEED_API_KEY')
        self.endpoint = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed"
        
    def check_score(self, url: str, strategy: str = 'mobile') -> Optional[int]:
        """
        Get PageSpeed score for a URL.
        Returns score 0-100 or None if error/no website.
        """
        if not url or not url.startswith('http'):
            return None
            
        if not self.api_key:
            logger.warning("No PageSpeed API key configured, skipping score check")
            return None
            
        try:
            params = {
                'url': url,
                'key': self.api_key,
                'strategy': strategy,
                'category': 'PERFORMANCE'
            }
            
            response = requests.get(self.endpoint, params=params, timeout=30)
            
            if response.status_code == 200:
                data = response.json()
                score = data.get('lighthouseResult', {}).get('categories', {}).get('performance', {}).get('score')
                if score is not None:
                    return int(score * 100)  # Convert 0-1 to 0-100
            else:
                logger.warning(f"PageSpeed API error: {response.status_code}")
                
        except Exception as e:
            logger.error(f"Error checking PageSpeed for {url}: {e}")
            
        return None


class GoogleMapsScraper:
    """Scrapes Google Maps for business listings using Scrapling."""
    
    def __init__(self):
        self.api_key = os.getenv('GOOGLE_MAPS_API_KEY')
        self.places_endpoint = "https://maps.googleapis.com/maps/api/place/textsearch/json"
        self.details_endpoint = "https://maps.googleapis.com/maps/api/place/details/json"
        
    def search_businesses(self, query: str, location: str, radius: int = 50000, 
                          max_results: int = 100) -> List[Dict]:
        """
        Search for businesses using Google Places API.
        Returns list of business data dictionaries.
        """
        businesses = []
        next_page_token = None
        
        if not self.api_key:
            logger.error("No Google Maps API key configured")
            return businesses
            
        search_query = f"{query} in {location}"
        
        try:
            # Initial search
            params = {
                'query': search_query,
                'key': self.api_key,
                'radius': radius
            }
            
            logger.info(f"Searching: {search_query}")
            response = requests.get(self.places_endpoint, params=params, timeout=30)
            
            if response.status_code != 200:
                logger.error(f"Places API error: {response.status_code}")
                return businesses
                
            data = response.json()
            
            if data.get('status') != 'OK':
                logger.error(f"Places API status: {data.get('status')}")
                return businesses
                
            # Process results
            results = data.get('results', [])
            logger.info(f"Found {len(results)} initial results")
            
            for place in results[:max_results]:
                business = self._extract_business_data(place)
                if business:
                    businesses.append(business)
                    
            # Handle pagination
            next_page_token = data.get('next_page_token')
            page_count = 1
            
            while next_page_token and len(businesses) < max_results and page_count < 3:
                time.sleep(2)  # Required delay between page requests
                
                params = {
                    'pagetoken': next_page_token,
                    'key': self.api_key
                }
                
                response = requests.get(self.places_endpoint, params=params, timeout=30)
                data = response.json()
                
                if data.get('status') == 'OK':
                    results = data.get('results', [])
                    for place in results[:max_results - len(businesses)]:
                        business = self._extract_business_data(place)
                        if business:
                            businesses.append(business)
                            
                next_page_token = data.get('next_page_token')
                page_count += 1
                
        except Exception as e:
            logger.error(f"Error searching businesses: {e}")
            
        logger.info(f"Total businesses found: {len(businesses)}")
        return businesses
        
    def _extract_business_data(self, place: Dict) -> Optional[Dict]:
        """Extract relevant data from a Google Place result."""
        try:
            business = {
                'id': place.get('place_id', ''),
                'name': place.get('name', ''),
                'address': place.get('formatted_address', ''),
                'phone': '',
                'website': place.get('website', ''),
                'gmaps_url': f"https://www.google.com/maps/place/?q=place_id:{place.get('place_id', '')}",
                'rating': place.get('rating', 0),
                'review_count': place.get('user_ratings_total', 0),
                'types': ','.join(place.get('types', [])),
                'latitude': place.get('geometry', {}).get('location', {}).get('lat', ''),
                'longitude': place.get('geometry', {}).get('location', {}).get('lng', ''),
                'pagespeed_score': None,
                'found_date': datetime.now().isoformat(),
                'status': 'new'
            }
            
            # Get additional details if needed
            if not business['phone']:
                business['phone'] = self._get_phone_number(place.get('place_id', ''))
                
            return business
            
        except Exception as e:
            logger.error(f"Error extracting business data: {e}")
            return None
            
    def _get_phone_number(self, place_id: str) -> str:
        """Fetch phone number from Place Details API."""
        if not place_id or not self.api_key:
            return ''
            
        try:
            params = {
                'place_id': place_id,
                'key': self.api_key,
                'fields': 'formatted_phone_number'
            }
            
            response = requests.get(self.details_endpoint, params=params, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if data.get('status') == 'OK':
                    result = data.get('result', {})
                    return result.get('formatted_phone_number', '')
                    
        except Exception as e:
            logger.error(f"Error fetching phone: {e}")
            
        return ''


class LeadScout:
    """Main class for finding and ranking leads."""
    
    def __init__(self):
        self.config = self._load_config()
        self.gmaps = GoogleMapsScraper()
        self.pagespeed = PageSpeedChecker()
        
    def _load_config(self) -> Dict:
        """Load configuration from YAML file."""
        try:
            with open('config.yaml', 'r') as f:
                return yaml.safe_load(f)
        except Exception as e:
            logger.error(f"Error loading config: {e}")
            return {}
            
    def scout_city_niche(self, city: str, niche: str, limit: int = 100) -> List[Dict]:
        """
        Scout for leads in a specific city and niche.
        Returns ranked list of leads (worst/no website first).
        """
        logger.info(f"Scouting {niche} businesses in {city}")
        
        # Search for businesses
        businesses = self.gmaps.search_businesses(niche, city, max_results=limit)
        
        if not businesses:
            logger.warning(f"No businesses found for {niche} in {city}")
            return []
            
        # Check PageSpeed scores and flag leads
        leads = []
        threshold = self.config.get('pagespeed', {}).get('threshold', 50)
        
        for business in businesses:
            # Check if they have a website
            if business.get('website'):
                # Check PageSpeed score
                score = self.pagespeed.check_score(business['website'])
                business['pagespeed_score'] = score
                
                # Flag if score is below threshold
                if score is not None and score < threshold:
                    business['flag_reason'] = f'Low PageSpeed score: {score}'
                    leads.append(business)
            else:
                # No website - prime lead!
                business['pagespeed_score'] = 0
                business['flag_reason'] = 'No website'
                leads.append(business)
                
            # Small delay to avoid rate limits
            time.sleep(0.5)
            
        # Sort by PageSpeed score (lowest/no website first)
        leads.sort(key=lambda x: x.get('pagespeed_score', 999) or 999)
        
        logger.info(f"Found {len(leads)} qualified leads out of {len(businesses)} businesses")
        return leads
        
    def save_leads(self, leads: List[Dict], city: str, niche: str) -> str:
        """Save leads to CSV file."""
        timestamp = datetime.now().strftime('%Y-%m-%d')
        filename = f"data/leads/leads_{city.replace(' ', '_').replace(',', '')}_{niche}_{timestamp}.csv"
        
        if not leads:
            logger.warning("No leads to save")
            return ''
            
        fieldnames = [
            'id', 'name', 'phone', 'address', 'city', 'niche',
            'website', 'pagespeed_score', 'flag_reason', 'gmaps_url',
            'rating', 'review_count', 'found_date', 'status',
            'demo_url', 'sms_sent', 'sms_date', 'notes'
        ]
        
        try:
            with open(filename, 'w', newline='', encoding='utf-8') as f:
                writer = csv.DictWriter(f, fieldnames=fieldnames)
                writer.writeheader()
                
                for lead in leads:
                    # Add metadata
                    lead['city'] = city
                    lead['niche'] = niche
                    lead['demo_url'] = ''
                    lead['sms_sent'] = 'no'
                    lead['sms_date'] = ''
                    lead['notes'] = ''
                    
                    # Write only fields that exist in fieldnames
                    row = {k: lead.get(k, '') for k in fieldnames}
                    writer.writerow(row)
                    
            logger.info(f"Saved {len(leads)} leads to {filename}")
            return filename
            
        except Exception as e:
            logger.error(f"Error saving leads: {e}")
            return ''
            
    def run_batch(self, cities: List[str] = None, niches: List[str] = None, 
                  leads_per_combo: int = 20) -> List[str]:
        """
        Run scouting batch across multiple cities and niches.
        Returns list of saved CSV filenames.
        """
        config_targets = self.config.get('targets', {})
        
        if cities is None:
            cities = [c['name'] for c in config_targets.get('cities', [])]
        if niches is None:
            niches = [n['id'] for n in config_targets.get('niches', [])]
            
        saved_files = []
        total_leads = 0
        
        for city in cities:
            for niche in niches:
                try:
                    leads = self.scout_city_niche(city, niche, limit=leads_per_combo)
                    if leads:
                        filename = self.save_leads(leads, city, niche)
                        if filename:
                            saved_files.append(filename)
                            total_leads += len(leads)
                            
                    # Delay between searches to avoid rate limits
                    time.sleep(2)
                    
                except Exception as e:
                    logger.error(f"Error scouting {niche} in {city}: {e}")
                    continue
                    
        logger.info(f"Batch complete. Total leads: {total_leads}")
        return saved_files


def main():
    """Main entry point for CLI usage."""
    import argparse
    
    parser = argparse.ArgumentParser(description='Scout for website leads')
    parser.add_argument('--city', type=str, help='City to search (e.g., "Miami, FL")')
    parser.add_argument('--niche', type=str, help='Business niche (e.g., plumber)')
    parser.add_argument('--limit', type=int, default=100, help='Max leads to find')
    parser.add_argument('--batch', action='store_true', help='Run batch across all config targets')
    
    args = parser.parse_args()
    
    scout = LeadScout()
    
    if args.batch:
        # Run batch mode from config
        files = scout.run_batch()
        print(f"Saved {len(files)} lead files")
    elif args.city and args.niche:
        # Run single search
        leads = scout.scout_city_niche(args.city, args.niche, args.limit)
        filename = scout.save_leads(leads, args.city, args.niche)
        print(f"Saved {len(leads)} leads to {filename}")
    else:
        parser.print_help()


if __name__ == '__main__':
    main()
