#!/usr/bin/env python3
"""
STAGE 4: CLOSER - Reply Handler
Processes SMS replies, generates briefs, logs to CRM, and sends notifications.
"""

import os
import csv
import json
import re
import logging
from datetime import datetime, timedelta
from typing import Dict, Optional, List

import yaml
import requests
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('logs/closer.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger('closer')

# Ensure directories exist
os.makedirs('logs', exist_ok=True)
os.makedirs('data/crm', exist_ok=True)


class ReplyHandler:
    """Handles incoming SMS replies and manages the closing process."""
    
    def __init__(self):
        self.config = self._load_config()
        self.discord_webhook = os.getenv('DISCORD_WEBHOOK_URL')
        self.notification_phone = os.getenv('NOTIFICATION_PHONE')
        self.openai_key = os.getenv('OPENAI_API_KEY')
        self.twilio_sid = os.getenv('TWILIO_ACCOUNT_SID')
        self.twilio_token = os.getenv('TWILIO_AUTH_TOKEN')
        
    def _load_config(self) -> Dict:
        """Load configuration from YAML file."""
        try:
            with open('config.yaml', 'r') as f:
                return yaml.safe_load(f)
        except Exception as e:
            logger.error(f"Error loading config: {e}")
            return {}
            
    def _find_original_message(self, from_number: str) -> Optional[Dict]:
        """
        Find the original outbound message that triggered this reply.
        Searches through recent SMS logs.
        """
        # Normalize phone number
        cleaned_number = re.sub(r'[^\d]', '', from_number)
        
        # Check last 7 days of logs
        for i in range(7):
            date = (datetime.now() - timedelta(days=i)).strftime('%Y-%m-%d')
            log_path = f"data/crm/sms_log_{date}.csv"
            
            if not os.path.exists(log_path):
                continue
                
            try:
                with open(log_path, 'r', newline='', encoding='utf-8') as f:
                    reader = csv.DictReader(f)
                    for row in reader:
                        # Compare phone numbers (fuzzy match)
                        log_phone = re.sub(r'[^\d]', '', row.get('phone', ''))
                        if log_phone == cleaned_number or log_phone.endswith(cleaned_number[-7:]):
                            return row
            except Exception as e:
                logger.error(f"Error reading log {log_path}: {e}")
                
        return None
        
    def _find_lead_by_phone(self, phone: str) -> Optional[Dict]:
        """Find lead data by phone number."""
        cleaned_number = re.sub(r'[^\d]', '', phone)
        
        # Search through all lead CSVs
        leads_dir = 'data/leads'
        if not os.path.exists(leads_dir):
            return None
            
        for filename in os.listdir(leads_dir):
            if not filename.endswith('.csv'):
                continue
                
            filepath = os.path.join(leads_dir, filename)
            try:
                with open(filepath, 'r', newline='', encoding='utf-8') as f:
                    reader = csv.DictReader(f)
                    for row in reader:
                        lead_phone = re.sub(r'[^\d]', '', row.get('phone', ''))
                        if lead_phone == cleaned_number or lead_phone.endswith(cleaned_number[-7:]):
                            return row
            except Exception as e:
                logger.error(f"Error reading leads file {filepath}: {e}")
                
        return None
        
    def _analyze_reply(self, reply_text: str, original_message: Optional[Dict] = None) -> Dict:
        """
        Analyze reply content and generate a brief.
        Uses OpenAI if available, otherwise rule-based.
        """
        reply_lower = reply_text.lower()
        
        analysis = {
            'intent': 'unknown',
            'sentiment': 'neutral',
            'interested': False,
            'wants_call': False,
            'questions': [],
            'objections': [],
            'action_needed': '',
            'brief': ''
        }
        
        # Rule-based analysis (fallback if no OpenAI)
        positive_words = ['interested', 'yes', 'sure', 'tell me', 'how much', 'pricing', 
                         'email', 'website', 'call me', 'talk', 'learn more', 'ok', 'okay']
        negative_words = ['stop', 'unsubscribe', 'no', 'not interested', 'remove', 
                         'spam', 'wrong number', 'don\'t text']
        question_words = ['?', 'how', 'what', 'when', 'where', 'why', 'who', 'which']
        
        # Check for opt-out
        if any(word in reply_lower for word in ['stop', 'unsubscribe', 'remove']):
            analysis['intent'] = 'opt_out'
            analysis['sentiment'] = 'negative'
            analysis['action_needed'] = 'Remove from list immediately'
            return analysis
            
        # Check interest level
        if any(word in reply_lower for word in positive_words):
            analysis['interested'] = True
            analysis['sentiment'] = 'positive'
            
        if any(word in reply_lower for word in negative_words):
            analysis['sentiment'] = 'negative'
            
        # Check for questions
        if '?' in reply_text or any(reply_lower.startswith(word) for word in question_words):
            analysis['questions'].append(reply_text)
            
        # Check for call request
        if any(phrase in reply_lower for phrase in ['call me', 'call us', 'talk', 'speak', 'phone']):
            analysis['wants_call'] = True
            analysis['intent'] = 'wants_call'
            
        # Determine action
        if analysis['interested']:
            if analysis['wants_call']:
                analysis['action_needed'] = 'Call immediately - hot lead'
            else:
                analysis['action_needed'] = 'Reply with pricing/details'
        elif analysis['questions']:
            analysis['action_needed'] = 'Answer questions, gauge interest'
        else:
            analysis['action_needed'] = 'Evaluate and respond appropriately'
            
        # Generate brief
        original = original_message.get('message', '') if original_message else 'Initial outreach SMS'
        analysis['brief'] = self._generate_brief(reply_text, original, analysis)
        
        return analysis
        
    def _generate_brief(self, reply: str, original: str, analysis: Dict) -> str:
        """Generate 2-paragraph brief about the reply."""
        
        paragraph1 = f"""REPLY RECEIVED: The business owner responded to our SMS outreach. 
Their message: \"{reply[:200]}{'...' if len(reply) > 200 else ''}\". 
Sentiment: {analysis['sentiment'].upper()}. 
Interest Level: {'HIGH' if analysis['interested'] else 'UNKNOWN/LOW'}."""

        paragraph2 = f"""WHAT THEY CARE ABOUT: {analysis['action_needed']}. 
"""
        
        if analysis['questions']:
            paragraph2 += f"They have questions that need answers. "
            
        if analysis['wants_call']:
            paragraph2 += "They specifically requested a phone call - this is a hot lead. "
            
        paragraph2 += f"RECOMMENDED ACTION: {analysis['action_needed']}. "
        
        if analysis['interested']:
            paragraph2 += "Lead with value proposition and try to schedule a quick call to discuss their website needs."
        else:
            paragraph2 += "Respond politely to their message and gauge their interest level before pushing for a call."
            
        return f"{paragraph1}\n\n{paragraph2}"
        
    def _log_to_crm(self, reply_data: Dict, analysis: Dict, original: Optional[Dict] = None):
        """Log reply and analysis to CRM."""
        today = datetime.now().strftime('%Y-%m-%d')
        crm_path = f"data/crm/replies_{today}.csv"
        
        log_entry = {
            'timestamp': datetime.now().isoformat(),
            'from_number': reply_data.get('from', ''),
            'business_name': reply_data.get('business_name', 'Unknown'),
            'reply_text': reply_data.get('body', ''),
            'original_message': original.get('message', '') if original else '',
            'original_sent': original.get('timestamp', '') if original else '',
            'intent': analysis.get('intent', ''),
            'sentiment': analysis.get('sentiment', ''),
            'interested': 'yes' if analysis.get('interested') else 'no',
            'wants_call': 'yes' if analysis.get('wants_call') else 'no',
            'action_needed': analysis.get('action_needed', ''),
            'brief': analysis.get('brief', ''),
            'demo_url': original.get('demo_url', '') if original else '',
            'status': 'new'
        }
        
        file_exists = os.path.exists(crm_path)
        
        try:
            with open(crm_path, 'a', newline='', encoding='utf-8') as f:
                fieldnames = ['timestamp', 'from_number', 'business_name', 'reply_text',
                             'original_message', 'original_sent', 'intent', 'sentiment',
                             'interested', 'wants_call', 'action_needed', 'brief',
                             'demo_url', 'status']
                writer = csv.DictWriter(f, fieldnames=fieldnames)
                
                if not file_exists:
                    writer.writeheader()
                    
                writer.writerow(log_entry)
                logger.info(f"Logged reply to CRM: {crm_path}")
                
        except Exception as e:
            logger.error(f"Error logging to CRM: {e}")
            
    def _send_discord_notification(self, reply_data: Dict, analysis: Dict, original: Optional[Dict] = None):
        """Send notification to Discord webhook."""
        if not self.discord_webhook:
            logger.warning("No Discord webhook configured")
            return
            
        business_name = reply_data.get('business_name', 'Unknown Business')
        emoji = "🔥" if analysis.get('interested') else "📩"
        
        embed = {
            "title": f"{emoji} New SMS Reply: {business_name}",
            "description": analysis.get('brief', ''),
            "color": 3066993 if analysis.get('interested') else 15158332,
            "fields": [
                {
                    "name": "Reply",
                    "value": reply_data.get('body', '')[:500] or "No text",
                    "inline": False
                },
                {
                    "name": "Intent",
                    "value": analysis.get('intent', 'unknown'),
                    "inline": True
                },
                {
                    "name": "Sentiment",
                    "value": analysis.get('sentiment', 'neutral'),
                    "inline": True
                },
                {
                    "name": "Action Required",
                    "value": analysis.get('action_needed', 'Review reply'),
                    "inline": False
                }
            ],
            "timestamp": datetime.now().isoformat()
        }
        
        if original and original.get('demo_url'):
            embed['fields'].append({
                "name": "Demo URL",
                "value": original['demo_url'],
                "inline": False
            })
            
        payload = {"embeds": [embed]}
        
        try:
            response = requests.post(
                self.discord_webhook,
                json=payload,
                timeout=10
            )
            
            if response.status_code == 204:
                logger.info("Discord notification sent")
            else:
                logger.error(f"Discord webhook failed: {response.status_code}")
                
        except Exception as e:
            logger.error(f"Error sending Discord notification: {e}")
            
    def _send_sms_notification(self, message: str):
        """Send SMS notification to admin phone."""
        if not self.notification_phone or not self.twilio_sid:
            return
            
        try:
            from twilio.rest import Client
            client = Client(self.twilio_sid, self.twilio_token)
            
            client.messages.create(
                body=message[:1600],
                from_=os.getenv('TWILIO_PHONE_NUMBER'),
                to=self.notification_phone
            )
            
            logger.info("SMS notification sent")
            
        except Exception as e:
            logger.error(f"Error sending SMS notification: {e}")
            
    def process_reply(self, from_number: str, message_body: str, 
                     message_sid: Optional[str] = None) -> Dict:
        """
        Process an incoming SMS reply.
        Main entry point for webhook handling.
        """
        logger.info(f"Processing reply from {from_number}")
        
        # Find original message
        original = self._find_original_message(from_number)
        
        # Find lead info
        lead = self._find_lead_by_phone(from_number)
        
        # Build reply data
        reply_data = {
            'from': from_number,
            'body': message_body,
            'sid': message_sid,
            'business_name': lead.get('name', 'Unknown') if lead else 'Unknown'
        }
        
        # Analyze reply
        analysis = self._analyze_reply(message_body, original)
        
        # Log to CRM
        self._log_to_crm(reply_data, analysis, original)
        
        # Send notifications
        config_notifications = self.config.get('notifications', {})
        
        if config_notifications.get('discord_on_reply', True):
            self._send_discord_notification(reply_data, analysis, original)
            
        if config_notifications.get('sms_on_sale', True) and analysis.get('interested'):
            self._send_sms_notification(
                f"Hot lead! {reply_data['business_name']} replied: {message_body[:100]}... "
                f"Action: {analysis['action_needed']}"
            )
            
        return {
            'success': True,
            'analysis': analysis,
            'lead': lead
        }
        
    def check_replies(self):
        """
        Check for new replies (simulated - in production, this would fetch from Twilio).
        For now, just lists pending replies in CRM.
        """
        today = datetime.now().strftime('%Y-%m-%d')
        crm_path = f"data/crm/replies_{today}.csv"
        
        if not os.path.exists(crm_path):
            print("No replies logged today yet.")
            return
            
        try:
            with open(crm_path, 'r', newline='', encoding='utf-8') as f:
                reader = csv.DictReader(f)
                replies = list(reader)
                
            if not replies:
                print("No replies today.")
                return
                
            print(f"\n=== Today's Replies ({len(replies)}) ===\n")
            
            for i, reply in enumerate(replies, 1):
                status = "🔥 HOT" if reply.get('interested') == 'yes' else "📩"
                print(f"{i}. {status} {reply.get('business_name', 'Unknown')}")
                print(f"   Reply: {reply.get('reply_text', '')[:80]}...")
                print(f"   Action: {reply.get('action_needed', 'Review')}")
                print()
                
        except Exception as e:
            logger.error(f"Error checking replies: {e}")


def main():
    """Main entry point for CLI usage."""
    import argparse
    
    parser = argparse.ArgumentParser(description='Handle SMS replies')
    parser.add_argument('--check-replies', action='store_true', 
                       help='Check for new replies')
    parser.add_argument('--from', dest='from_number', type=str,
                       help='Phone number that replied (for manual processing)')
    parser.add_argument('--message', type=str,
                       help='Reply message body (for manual processing)')
    parser.add_argument('--sid', type=str,
                       help='Twilio message SID (for manual processing)')
    
    args = parser.parse_args()
    
    handler = ReplyHandler()
    
    if args.check_replies:
        handler.check_replies()
    elif args.from_number and args.message:
        # Manual processing
        result = handler.process_reply(args.from_number, args.message, args.sid)
        print("✓ Reply processed")
        print(f"  Intent: {result['analysis']['intent']}")
        print(f"  Interested: {result['analysis']['interested']}")
        print(f"  Action: {result['analysis']['action_needed']}")
        print("\nBrief:")
        print(result['analysis']['brief'])
    else:
        parser.print_help()


if __name__ == '__main__':
    main()
