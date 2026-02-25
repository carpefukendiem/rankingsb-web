#!/usr/bin/env python3
"""
AFFILIATE INTEGRATION MODULE
Manages affiliate links and tracking for website platform conversions.
Supports: Base44, Wix, Squarespace, GoDaddy
"""

import os
import csv
import json
import logging
from datetime import datetime, timedelta
from typing import Dict, Optional, List
from urllib.parse import urlencode, parse_qs, urlparse, urlunparse

import yaml
from dotenv import load_dotenv

load_dotenv()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger('affiliate')


class AffiliateManager:
    """Manages affiliate program integrations and tracking."""
    
    # Affiliate platform configurations
    PLATFORMS = {
        'base44': {
            'name': 'Base44',
            'base_url': 'https://app.base44.com',
            'commission': 100,
            'cookie_days': 60,
            'tracking_param': 'ref'
        },
        'wix': {
            'name': 'Wix',
            'base_url': 'https://www.wix.com',
            'commission': 100,
            'cookie_days': 30,
            'tracking_param': 'ref'
        },
        'squarespace': {
            'name': 'Squarespace',
            'base_url': 'https://www.squarespace.com',
            'commission': 200,
            'cookie_days': 45,
            'tracking_param': 'ref'
        },
        'godaddy': {
            'name': 'GoDaddy',
            'base_url': 'https://www.godaddy.com',
            'commission': 50,
            'cookie_days': 45,
            'tracking_param': 'isc'
        },
        'bluehost': {
            'name': 'Bluehost',
            'base_url': 'https://www.bluehost.com',
            'commission': 65,
            'cookie_days': 90,
            'tracking_param': 'ref'
        },
        'hostgator': {
            'name': 'HostGator',
            'base_url': 'https://www.hostgator.com',
            'commission': 50,
            'cookie_days': 60,
            'tracking_param': 'ref'
        }
    }
    
    def __init__(self):
        self.config = self._load_config()
        self.affiliate_ids = {
            'base44': os.getenv('BASE44_AFFILIATE_ID'),
            'wix': os.getenv('WIX_AFFILIATE_ID'),
            'squarespace': os.getenv('SQUARESPACE_AFFILIATE_ID'),
            'godaddy': os.getenv('GODADDY_AFFILIATE_ID'),
            'bluehost': os.getenv('BLUEHOST_AFFILIATE_ID'),
            'hostgator': os.getenv('HOSTGATOR_AFFILIATE_ID')
        }
        
    def _load_config(self) -> Dict:
        """Load configuration from YAML file."""
        try:
            with open('config.yaml', 'r') as f:
                return yaml.safe_load(f)
        except Exception as e:
            logger.error(f"Error loading config: {e}")
            return {}
            
    def get_affiliate_link(self, platform: str, landing_page: str = None) -> Optional[str]:
        """Generate affiliate link for a platform."""
        platform = platform.lower()
        
        if platform not in self.PLATFORMS:
            logger.error(f"Unknown platform: {platform}")
            return None
            
        affiliate_id = self.affiliate_ids.get(platform)
        if not affiliate_id:
            logger.warning(f"No affiliate ID configured for {platform}")
            return None
            
        platform_config = self.PLATFORMS[platform]
        base_url = landing_page or platform_config['base_url']
        param = platform_config['tracking_param']
        
        # Build URL with tracking parameter
        parsed = urlparse(base_url)
        query_params = parse_qs(parsed.query)
        query_params[param] = affiliate_id
        
        new_query = urlencode(query_params, doseq=True)
        new_url = urlunparse((
            parsed.scheme,
            parsed.netloc,
            parsed.path,
            parsed.params,
            new_query,
            parsed.fragment
        ))
        
        return new_url
        
    def get_all_links(self) -> Dict[str, str]:
        """Get all configured affiliate links."""
        links = {}
        for platform in self.PLATFORMS:
            link = self.get_affiliate_link(platform)
            if link:
                links[platform] = link
        return links
        
    def get_recommended_platform(self, niche: str = None, budget: str = None) -> Dict:
        """Recommend best platform based on niche and budget."""
        recommendations = {
            'default': 'base44',
            'budget': 'godaddy',
            'professional': 'squarespace',
            'easy': 'wix',
            'ecommerce': 'squarespace',
            'trades': 'base44'
        }
        
        niche_map = {
            'plumber': 'trades',
            'electrician': 'trades',
            'landscaping': 'trades',
            'salon': 'professional',
            'cleaning': 'default',
            'autorepair': 'default',
            'dentist': 'professional'
        }
        
        rec_key = niche_map.get(niche, 'default')
        if budget == 'low':
            rec_key = 'budget'
            
        platform_key = recommendations.get(rec_key, 'default')
        platform = self.PLATFORMS.get(platform_key)
        
        if not platform:
            return None
            
        return {
            'platform': platform_key,
            'name': platform['name'],
            'commission': platform['commission'],
            'affiliate_link': self.get_affiliate_link(platform_key)
        }
        
    def log_conversion(self, lead_id: str, platform: str, business_name: str,
                      commission: float = None, notes: str = ''):
        """Log a successful conversion to CRM."""
        today = datetime.now().strftime('%Y-%m-%d')
        crm_path = f'data/crm/conversions_{today}.csv'
        
        if commission is None:
            platform_config = self.PLATFORMS.get(platform.lower(), {})
            commission = platform_config.get('commission', 0)
            
        conversion = {
            'timestamp': datetime.now().isoformat(),
            'lead_id': lead_id,
            'business_name': business_name,
            'platform': platform,
            'commission': commission,
            'affiliate_link_used': self.get_affiliate_link(platform) or '',
            'notes': notes,
            'paid': 'no'
        }
        
        file_exists = os.path.exists(crm_path)
        
        try:
            with open(crm_path, 'a', newline='', encoding='utf-8') as f:
                fieldnames = ['timestamp', 'lead_id', 'business_name', 'platform',
                             'commission', 'affiliate_link_used', 'notes', 'paid']
                writer = csv.DictWriter(f, fieldnames=fieldnames)
                
                if not file_exists:
                    writer.writeheader()
                    
                writer.writerow(conversion)
                
            logger.info(f"Logged conversion: {business_name} -> {platform} (${commission})")
            
        except Exception as e:
            logger.error(f"Error logging conversion: {e}")
            
    def get_conversion_report(self, days: int = 30) -> Dict:
        """Generate conversion report for the last N days."""
        total_conversions = 0
        total_commission = 0.0
        by_platform = {}
        
        for i in range(days):
            date = (datetime.now() - timedelta(days=i)).strftime('%Y-%m-%d')
            crm_path = f'data/crm/conversions_{date}.csv'
            
            if not os.path.exists(crm_path):
                continue
                
            try:
                with open(crm_path, 'r', newline='', encoding='utf-8') as f:
                    reader = csv.DictReader(f)
                    for row in reader:
                        total_conversions += 1
                        commission = float(row.get('commission', 0))
                        total_commission += commission
                        
                        platform = row.get('platform', 'unknown')
                        if platform not in by_platform:
                            by_platform[platform] = {'count': 0, 'commission': 0}
                        by_platform[platform]['count'] += 1
                        by_platform[platform]['commission'] += commission
                        
            except Exception as e:
                logger.error(f"Error reading {crm_path}: {e}")
                
        return {
            'period_days': days,
            'total_conversions': total_conversions,
            'total_commission': round(total_commission, 2),
            'by_platform': by_platform,
            'avg_conversion_value': round(total_commission / total_conversions, 2) if total_conversions > 0 else 0
        }


if __name__ == '__main__':
    # Test the affiliate module
    manager = AffiliateManager()
    
    print("=== Affiliate Links ===")
    links = manager.get_all_links()
    for platform, link in links.items():
        print(f"{platform}: {link}")
        
    print("\n=== Platform Recommendations ===")
    for niche in ['plumber', 'salon', 'autorepair']:
        rec = manager.get_recommended_platform(niche)
        print(f"{niche}: {rec['name']} (${rec['commission']} commission)")
