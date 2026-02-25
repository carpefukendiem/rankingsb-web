#!/usr/bin/env python3
"""
STAGE 3: OUTREACH - SMS Sender
Sends personalized SMS messages to leads with demo website links.
Tracks clicks and responses.
"""

import os
import csv
import re
import logging
from datetime import datetime, timedelta
from typing import Dict, Optional, List

import yaml
import phonenumbers
from dotenv import load_dotenv
from twilio.rest import Client as TwilioClient
from twilio.base.exceptions import TwilioRestException

# Load environment variables
load_dotenv()

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('logs/outreach.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger('outreach')

# Ensure directories exist
os.makedirs('logs', exist_ok=True)
os.makedirs('data/crm', exist_ok=True)


class SMSSender:
    """Handles SMS outreach via Twilio."""
    
    def __init__(self):
        self.config = self._load_config()
        self.twilio_sid = os.getenv('TWILIO_ACCOUNT_SID')
        self.twilio_token = os.getenv('TWILIO_AUTH_TOKEN')
        self.twilio_number = os.getenv('TWILIO_PHONE_NUMBER')
        
        self.client = None
        if self.twilio_sid and self.twilio_token:
            self.client = TwilioClient(self.twilio_sid, self.twilio_token)
            
    def _load_config(self) -> Dict:
        """Load configuration from YAML file."""
        try:
            with open('config.yaml', 'r') as f:
                return yaml.safe_load(f)
        except Exception as e:
            logger.error(f"Error loading config: {e}")
            return {}
            
    def _format_phone(self, phone: str, country: str = 'US') -> Optional[str]:
        """
        Format phone number to E.164 format for Twilio.
        Returns None if invalid.
        """
        if not phone:
            return None
            
        try:
            # Clean the number
            cleaned = re.sub(r'[^\d+]', '', phone)
            
            # Parse with phonenumbers library
            parsed = phonenumbers.parse(cleaned, country)
            
            if phonenumbers.is_valid_number(parsed):
                return phonenumbers.format_number(parsed, phonenumbers.PhoneNumberFormat.E164)
            else:
                logger.warning(f"Invalid phone number: {phone}")
                return None
                
        except Exception as e:
            logger.warning(f"Error parsing phone number {phone}: {e}")
            return None
            
    def _format_message(self, template: str, business: Dict) -> str:
        """Format SMS message with business data."""
        # Get first name if possible
        name = business.get('name', 'there')
        first_name = name.split()[0] if name else 'there'
        
        # Shorten name if needed
        if len(first_name) > 15:
            first_name = first_name[:12] + '...'
            
        replacements = {
            '{name}': first_name,
            '{business_name}': name,
            '{link}': business.get('demo_url', ''),
            '{city}': business.get('city', ''),
            '{niche}': business.get('niche', 'business')
        }
        
        message = template
        for key, value in replacements.items():
            message = message.replace(key, str(value))
            
        return message
        
    def _check_business_hours(self, timezone: str = 'America/New_York') -> bool:
        """Check if current time is within business hours."""
        outreach_config = self.config.get('outreach', {})
        
        if not outreach_config.get('business_hours_only', True):
            return True
            
        # Get current hour in target timezone
        import pytz
        try:
            tz = pytz.timezone(timezone)
            now = datetime.now(tz)
            
            start_hour = outreach_config.get('business_hours', {}).get('start', 9)
            end_hour = outreach_config.get('business_hours', {}).get('end', 18)
            
            # Check if weekday
            if now.weekday() >= 5:  # Saturday = 5, Sunday = 6
                return False
                
            # Check business hours
            return start_hour <= now.hour < end_hour
            
        except Exception as e:
            logger.error(f"Error checking business hours: {e}")
            # Default to allowing send if we can't determine
            return True
            
    def _is_within_rate_limit(self) -> bool:
        """Check if we're within daily SMS rate limit."""
        max_sms = self.config.get('max_sms_per_day', 50)
        
        # Count SMS sent today from CRM log
        today = datetime.now().strftime('%Y-%m-%d')
        sent_today = 0
        
        crm_path = f"data/crm/sms_log_{today}.csv"
        if os.path.exists(crm_path):
            try:
                with open(crm_path, 'r', newline='') as f:
                    reader = csv.DictReader(f)
                    sent_today = sum(1 for _ in reader)
            except Exception:
                pass
                
        return sent_today < max_sms
        
    def _log_sms(self, business: Dict, message: str, status: str, error: str = None):
        """Log SMS to CRM."""
        today = datetime.now().strftime('%Y-%m-%d')
        crm_path = f"data/crm/sms_log_{today}.csv"
        
        log_entry = {
            'timestamp': datetime.now().isoformat(),
            'business_id': business.get('id', ''),
            'business_name': business.get('name', ''),
            'phone': business.get('phone', ''),
            'message': message,
            'status': status,
            'error': error or '',
            'demo_url': business.get('demo_url', '')
        }
        
        file_exists = os.path.exists(crm_path)
        
        try:
            with open(crm_path, 'a', newline='', encoding='utf-8') as f:
                fieldnames = ['timestamp', 'business_id', 'business_name', 'phone', 
                             'message', 'status', 'error', 'demo_url']
                writer = csv.DictWriter(f, fieldnames=fieldnames)
                
                if not file_exists:
                    writer.writeheader()
                    
                writer.writerow(log_entry)
                
        except Exception as e:
            logger.error(f"Error logging SMS: {e}")
            
    def _update_lead_status(self, csv_path: str, business_id: str, status: str):
        """Update lead CSV with SMS status."""
        try:
            with open(csv_path, 'r', newline='', encoding='utf-8') as f:
                reader = csv.DictReader(f)
                rows = list(reader)
                fieldnames = reader.fieldnames
                
            for row in rows:
                if row.get('id') == business_id:
                    row['sms_sent'] = status
                    row['sms_date'] = datetime.now().isoformat()
                    if status == 'sent':
                        row['status'] = 'contacted'
                    break
                    
            with open(csv_path, 'w', newline='', encoding='utf-8') as f:
                writer = csv.DictWriter(f, fieldnames=fieldnames)
                writer.writeheader()
                writer.writerows(rows)
                
        except Exception as e:
            logger.error(f"Error updating lead status: {e}")
            
    def send_sms(self, business: Dict, csv_path: Optional[str] = None,
                 custom_message: Optional[str] = None) -> bool:
        """
        Send SMS to a business.
        Returns True if sent successfully.
        """
        # Validate Twilio setup
        if not self.client:
            logger.error("Twilio not configured")
            self._log_sms(business, '', 'failed', 'Twilio not configured')
            return False
            
        # Check rate limit
        if not self._is_within_rate_limit():
            logger.warning("Daily SMS limit reached")
            return False
            
        # Check business hours
        # Get timezone from city config
        city = business.get('city', '')
        timezone = 'America/New_York'
        for c in self.config.get('targets', {}).get('cities', []):
            if c['name'] == city:
                timezone = c.get('timezone', 'America/New_York')
                break
                
        if not self._check_business_hours(timezone):
            logger.warning("Outside business hours, skipping send")
            return False
            
        # Validate phone
        phone = self._format_phone(business.get('phone', ''))
        if not phone:
            logger.error(f"Invalid phone number for {business.get('name')}")
            self._log_sms(business, '', 'failed', 'Invalid phone number')
            return False
            
        # Check if demo exists
        demo_url = business.get('demo_url', '')
        if not demo_url:
            logger.error(f"No demo URL for {business.get('name')}")
            return False
            
        # Format message
        template = custom_message or self.config.get('outreach', {}).get('sms_template')
        message = self._format_message(template, business)
        
        # Ensure under 160 chars (single SMS)
        if len(message) > 160:
            logger.warning(f"Message too long ({len(message)} chars), truncating")
            message = message[:157] + '...'
            
        logger.info(f"Sending SMS to {business.get('name')} at {phone}")
        logger.debug(f"Message: {message}")
        
        try:
            # Send via Twilio
            twilio_message = self.client.messages.create(
                body=message,
                from_=self.twilio_number,
                to=phone,
                status_callback='https://demo.twilio.com/welcome/sms/reply/'  # Optional webhook
            )
            
            logger.info(f"SMS sent successfully: {twilio_message.sid}")
            
            # Log success
            self._log_sms(business, message, 'sent')
            
            # Update CSV
            if csv_path:
                self._update_lead_status(csv_path, business.get('id', ''), 'sent')
                
            return True
            
        except TwilioRestException as e:
            logger.error(f"Twilio error: {e}")
            self._log_sms(business, message, 'failed', str(e))
            return False
            
        except Exception as e:
            logger.error(f"Error sending SMS: {e}")
            self._log_sms(business, message, 'failed', str(e))
            return False
            
    def process_csv(self, csv_path: str, limit: int = 50):
        """
        Process leads from CSV and send SMS to those with demos.
        """
        logger.info(f"Processing leads from {csv_path}")
        
        try:
            with open(csv_path, 'r', newline='', encoding='utf-8') as f:
                reader = csv.DictReader(f)
                leads = list(reader)
                
            # Filter to leads with demos but no SMS sent
            to_contact = [
                l for l in leads 
                if l.get('demo_url') and l.get('sms_sent') != 'sent'
            ][:limit]
            
            logger.info(f"Found {len(to_contact)} leads to contact")
            
            sent_count = 0
            for lead in to_contact:
                if self.send_sms(lead, csv_path):
                    print(f"✓ SMS sent to {lead.get('name')}")
                    sent_count += 1
                else:
                    print(f"✗ Failed to send SMS to {lead.get('name')}")
                    
            print(f"\nSent {sent_count}/{len(to_contact)} messages")
            
        except Exception as e:
            logger.error(f"Error processing CSV: {e}")


def main():
    """Main entry point for CLI usage."""
    import argparse
    
    parser = argparse.ArgumentParser(description='Send SMS outreach')
    parser.add_argument('--input', type=str, help='Path to leads CSV file')
    parser.add_argument('--lead-id', type=str, help='Specific lead ID to contact')
    parser.add_argument('--phone', type=str, help='Phone number to send to')
    parser.add_argument('--message', type=str, help='Custom message')
    parser.add_argument('--limit', type=int, default=50, help='Max messages to send')
    
    args = parser.parse_args()
    
    sender = SMSSender()
    
    if args.input:
        # Process CSV file
        sender.process_csv(args.input, limit=args.limit)
    elif args.phone:
        # Send to specific number
        business = {
            'id': f"manual_{datetime.now().strftime('%Y%m%d%H%M%S')}",
            'name': 'Test Business',
            'phone': args.phone,
            'demo_url': 'https://example.com/demo'
        }
        success = sender.send_sms(business, custom_message=args.message)
        if success:
            print("✓ SMS sent successfully")
        else:
            print("✗ Failed to send SMS")
    else:
        parser.print_help()


if __name__ == '__main__':
    main()
