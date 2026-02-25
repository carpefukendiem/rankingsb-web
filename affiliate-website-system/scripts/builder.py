#!/usr/bin/env python3
"""
STAGE 2: BUILDER - Demo Website Creator
Auto-generates demo websites for leads and deploys to Vercel.
"""

import os
import re
import json
import csv
import shutil
import subprocess
import logging
from datetime import datetime
from pathlib import Path
from typing import Dict, Optional, List
from urllib.parse import quote_plus

import yaml
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('logs/builder.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger('builder')

# Ensure directories exist
os.makedirs('logs', exist_ok=True)
os.makedirs('data/leads', exist_ok=True)
os.makedirs('templates', exist_ok=True)


class WebsiteBuilder:
    """Builds and deploys demo websites for businesses."""
    
    def __init__(self):
        self.config = self._load_config()
        self.vercel_token = os.getenv('VERCEL_TOKEN')
        self.vercel_team = os.getenv('VERCEL_TEAM_ID')
        self.build_dir = Path('builds')
        self.build_dir.mkdir(exist_ok=True)
        
    def _load_config(self) -> Dict:
        """Load configuration from YAML file."""
        try:
            with open('config.yaml', 'r') as f:
                return yaml.safe_load(f)
        except Exception as e:
            logger.error(f"Error loading config: {e}")
            return {}
            
    def _sanitize_name(self, name: str) -> str:
        """Create URL-friendly name from business name."""
        # Remove special characters and convert to lowercase
        sanitized = re.sub(r'[^a-zA-Z0-9\s]', '', name)
        sanitized = sanitized.lower().replace(' ', '-')
        # Limit length
        return sanitized[:30]
        
    def _get_template(self, niche: str) -> str:
        """Get the appropriate template for a niche."""
        niche_config = None
        for n in self.config.get('targets', {}).get('niches', []):
            if n['id'] == niche:
                niche_config = n
                break
                
        template_name = niche_config['template'] if niche_config else 'generic'
        template_path = Path('templates') / template_name
        
        # If specific template doesn't exist, use generic
        if not template_path.exists():
            template_path = Path('templates') / 'generic'
            
        # If generic doesn't exist, create it
        if not template_path.exists():
            self._create_generic_template(template_path)
            
        return str(template_path)
        
    def _create_generic_template(self, template_path: Path):
        """Create a generic business website template."""
        template_path.mkdir(parents=True, exist_ok=True)
        
        # Create index.html
        html_content = '''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{business_name}} - {{niche_name}} in {{city}}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
        header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 80px 0; text-align: center; }
        header h1 { font-size: 3rem; margin-bottom: 20px; }
        header p { font-size: 1.3rem; opacity: 0.9; }
        .cta-section { background: #f8f9fa; padding: 60px 0; text-align: center; }
        .cta-button { display: inline-block; background: #667eea; color: white; padding: 15px 40px; text-decoration: none; border-radius: 50px; font-size: 1.2rem; font-weight: bold; transition: transform 0.3s; }
        .cta-button:hover { transform: scale(1.05); }
        .features { padding: 80px 0; }
        .features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 40px; margin-top: 40px; }
        .feature { text-align: center; padding: 30px; }
        .feature h3 { color: #667eea; margin-bottom: 15px; font-size: 1.5rem; }
        .contact { background: #2d3748; color: white; padding: 80px 0; }
        .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; }
        .contact-info h2 { margin-bottom: 30px; }
        .contact-info p { margin-bottom: 15px; font-size: 1.1rem; }
        .contact-form { background: white; padding: 40px; border-radius: 10px; }
        .form-group { margin-bottom: 20px; }
        .form-group label { display: block; margin-bottom: 5px; color: #333; }
        .form-group input, .form-group textarea { width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 5px; }
        .form-group textarea { resize: vertical; min-height: 120px; }
        .submit-btn { background: #667eea; color: white; padding: 15px 40px; border: none; border-radius: 5px; font-size: 1rem; cursor: pointer; width: 100%; }
        .submit-btn:hover { background: #5a67d8; }
        footer { background: #1a202c; color: white; text-align: center; padding: 30px 0; }
        @media (max-width: 768px) { 
            header h1 { font-size: 2rem; } 
            .contact-grid { grid-template-columns: 1fr; }
        }
    </style>
</head>
<body>
    <header>
        <div class="container">
            <h1>{{business_name}}</h1>
            <p>Professional {{niche_name}} Services in {{city}}</p>
        </div>
    </header>

    <section class="cta-section">
        <div class="container">
            <h2>Need {{niche_name}} Services?</h2>
            <p style="margin: 20px 0; font-size: 1.2rem;">We're here to help! Call us now for a free quote.</p>
            <a href="tel:{{phone}}" class="cta-button">Call {{phone}}</a>
        </div>
    </section>

    <section class="features">
        <div class="container">
            <h2 style="text-align: center; font-size: 2.5rem;">Why Choose Us?</h2>
            <div class="features-grid">
                <div class="feature">
                    <h3>✓ Professional Service</h3>
                    <p>Years of experience serving {{city}} and surrounding areas with top-quality {{niche_name}} services.</p>
                </div>
                <div class="feature">
                    <h3>✓ Fast Response</h3>
                    <p>Quick turnaround times and emergency services available when you need us most.</p>
                </div>
                <div class="feature">
                    <h3>✓ Fair Pricing</h3>
                    <p>Competitive rates with no hidden fees. Free estimates on all projects.</p>
                </div>
            </div>
        </div>
    </section>

    <section class="contact">
        <div class="container">
            <div class="contact-grid">
                <div class="contact-info">
                    <h2>Contact Us</h2>
                    <p><strong>{{business_name}}</strong></p>
                    <p>📍 {{address}}</p>
                    <p>📞 <a href="tel:{{phone}}" style="color: #667eea;">{{phone}}</a></p>
                    <p>🕐 Open Monday - Saturday</p>
                    <p>⭐ {{rating}} stars on Google</p>
                </div>
                <div class="contact-form">
                    <h3 style="color: #333; margin-bottom: 20px;">Send us a Message</h3>
                    <form id="contactForm">
                        <div class="form-group">
                            <label>Your Name</label>
                            <input type="text" name="name" required>
                        </div>
                        <div class="form-group">
                            <label>Phone Number</label>
                            <input type="tel" name="phone" required>
                        </div>
                        <div class="form-group">
                            <label>Message</label>
                            <textarea name="message" placeholder="How can we help you?" required></textarea>
                        </div>
                        <button type="submit" class="submit-btn">Send Message</button>
                    </form>
                </div>
            </div>
        </div>
    </section>

    <footer>
        <div class="container">
            <p>&copy; 2024 {{business_name}}. All rights reserved.</p>
            <p>{{niche_name}} services in {{city}}</p>
        </div>
    </footer>

    <script>
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will call you back shortly at the number provided.');
            this.reset();
        });
    </script>
</body>
</html>'''
        
        (template_path / 'index.html').write_text(html_content)
        logger.info(f"Created generic template at {template_path}")
        
    def _replace_placeholders(self, template_content: str, business: Dict) -> str:
        """Replace template placeholders with business data."""
        # Get niche display name
        niche_display = business.get('niche', 'business').title()
        for n in self.config.get('targets', {}).get('niches', []):
            if n['id'] == business.get('niche', ''):
                niche_display = n['name']
                break
                
        # Clean phone number
        phone = business.get('phone', '')
        phone_digits = re.sub(r'\D', '', phone)
        phone_link = phone_digits if len(phone_digits) >= 10 else '555-0100'
        
        # Build replacements
        replacements = {
            '{{business_name}}': business.get('name', 'Your Business'),
            '{{niche_name}}': niche_display,
            '{{niche}}': niche_display,
            '{{city}}': business.get('city', 'Your City'),
            '{{address}}': business.get('address', 'Local Service Area'),
            '{{phone}}': phone if phone else '(555) 123-4567',
            '{{phone_link}}': phone_link,
            '{{rating}}': str(business.get('rating', '5.0')),
            '{{gmaps_url}}': business.get('gmaps_url', '#'),
        }
        
        result = template_content
        for placeholder, value in replacements.items():
            result = result.replace(placeholder, str(value))
            
        return result
        
    def build_website(self, business: Dict) -> Optional[Path]:
        """
        Build a demo website for a business.
        Returns path to build directory.
        """
        business_name = business.get('name', 'business')
        niche = business.get('niche', 'generic')
        
        logger.info(f"Building website for {business_name}")
        
        try:
            # Create build directory
            safe_name = self._sanitize_name(business_name)
            build_path = self.build_dir / f"{safe_name}_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
            build_path.mkdir(parents=True, exist_ok=True)
            
            # Get template
            template_path = Path(self._get_template(niche))
            
            # Copy and process template files
            for template_file in template_path.glob('*'):
                if template_file.is_file():
                    content = template_file.read_text()
                    processed = self._replace_placeholders(content, business)
                    
                    output_file = build_path / template_file.name
                    output_file.write_text(processed)
                    
            logger.info(f"Built website at {build_path}")
            return build_path
            
        except Exception as e:
            logger.error(f"Error building website for {business_name}: {e}")
            return None
            
    def deploy_to_vercel(self, build_path: Path, business_name: str) -> Optional[str]:
        """
        Deploy website to Vercel.
        Returns deployed URL.
        """
        if not self.vercel_token:
            logger.error("No Vercel token configured")
            return None
            
        safe_name = self._sanitize_name(business_name)
        project_name = f"demo-{safe_name}-{datetime.now().strftime('%m%d')}"
        
        # Ensure project name is valid (alphanumeric and hyphens only, max 63 chars)
        project_name = re.sub(r'[^a-z0-9-]', '', project_name)[:63]
        
        logger.info(f"Deploying to Vercel as {project_name}")
        
        try:
            # Create vercel.json
            vercel_config = {
                "version": 2,
                "name": project_name,
                "builds": [{"src": "index.html", "use": "@vercel/static"}],
                "routes": [{"src": "/(.*)", "dest": "/index.html"}]
            }
            (build_path / 'vercel.json').write_text(json.dumps(vercel_config, indent=2))
            
            # Deploy using Vercel CLI
            env = os.environ.copy()
            env['VERCEL_TOKEN'] = self.vercel_token
            
            cmd = ['vercel', '--yes', '--token', self.vercel_token, '--prod']
            
            if self.vercel_team:
                cmd.extend(['--scope', self.vercel_team])
                
            result = subprocess.run(
                cmd,
                cwd=build_path,
                capture_output=True,
                text=True,
                env=env,
                timeout=120
            )
            
            if result.returncode == 0:
                # Extract URL from output
                output = result.stdout + result.stderr
                
                # Try to find the deployment URL
                url_match = re.search(r'(https?://[\w.-]+\.vercel\.app)', output)
                if url_match:
                    url = url_match.group(1)
                    logger.info(f"Deployed to {url}")
                    return url
                else:
                    # Construct URL from project name
                    url = f"https://{project_name}.vercel.app"
                    logger.info(f"Deployed to {url}")
                    return url
            else:
                logger.error(f"Vercel deploy failed: {result.stderr}")
                return None
                
        except subprocess.TimeoutExpired:
            logger.error("Vercel deploy timed out")
            return None
        except Exception as e:
            logger.error(f"Error deploying to Vercel: {e}")
            return None
            
    def update_lead_csv(self, csv_path: str, business_id: str, demo_url: str):
        """Update lead CSV with demo URL."""
        try:
            # Read CSV
            with open(csv_path, 'r', newline='', encoding='utf-8') as f:
                reader = csv.DictReader(f)
                rows = list(reader)
                fieldnames = reader.fieldnames
                
            # Update matching row
            for row in rows:
                if row.get('id') == business_id:
                    row['demo_url'] = demo_url
                    row['status'] = 'demo_built'
                    break
                    
            # Write back
            with open(csv_path, 'w', newline='', encoding='utf-8') as f:
                writer = csv.DictWriter(f, fieldnames=fieldnames)
                writer.writeheader()
                writer.writerows(rows)
                
            logger.info(f"Updated {csv_path} with demo URL")
            
        except Exception as e:
            logger.error(f"Error updating CSV: {e}")
            
    def process_lead(self, business: Dict, csv_path: Optional[str] = None) -> Optional[str]:
        """
        Full pipeline: build and deploy website for a lead.
        Returns demo URL.
        """
        # Build website
        build_path = self.build_website(business)
        if not build_path:
            return None
            
        # Deploy
        demo_url = self.deploy_to_vercel(build_path, business.get('name', 'business'))
        if demo_url and csv_path:
            self.update_lead_csv(csv_path, business.get('id', ''), demo_url)
            
        return demo_url
        
    def process_csv(self, csv_path: str, limit: int = 1):
        """
        Process leads from CSV file.
        Builds websites for top N leads without demos.
        """
        logger.info(f"Processing leads from {csv_path}")
        
        try:
            with open(csv_path, 'r', newline='', encoding='utf-8') as f:
                reader = csv.DictReader(f)
                leads = list(reader)
                
            # Filter to leads without demos
            to_process = [l for l in leads if not l.get('demo_url')][:limit]
            
            logger.info(f"Found {len(to_process)} leads to process")
            
            for lead in to_process:
                demo_url = self.process_lead(lead, csv_path)
                if demo_url:
                    print(f"✓ Built demo for {lead.get('name')}: {demo_url}")
                else:
                    print(f"✗ Failed to build demo for {lead.get('name')}")
                    
        except Exception as e:
            logger.error(f"Error processing CSV: {e}")


def main():
    """Main entry point for CLI usage."""
    import argparse
    
    parser = argparse.ArgumentParser(description='Build demo websites')
    parser.add_argument('--input', type=str, help='Path to leads CSV file')
    parser.add_argument('--name', type=str, help='Business name')
    parser.add_argument('--phone', type=str, help='Business phone')
    parser.add_argument('--address', type=str, help='Business address')
    parser.add_argument('--city', type=str, help='City')
    parser.add_argument('--niche', type=str, help='Business niche')
    parser.add_argument('--limit', type=int, default=1, help='Number of leads to process')
    
    args = parser.parse_args()
    
    builder = WebsiteBuilder()
    
    if args.input:
        # Process CSV file
        builder.process_csv(args.input, limit=args.limit)
    elif args.name:
        # Process single business
        business = {
            'id': f"manual_{datetime.now().strftime('%Y%m%d%H%M%S')}",
            'name': args.name,
            'phone': args.phone or '',
            'address': args.address or '',
            'city': args.city or '',
            'niche': args.niche or 'generic'
        }
        demo_url = builder.process_lead(business)
        if demo_url:
            print(f"✓ Demo deployed: {demo_url}")
        else:
            print("✗ Failed to deploy demo")
    else:
        parser.print_help()


if __name__ == '__main__':
    main()
