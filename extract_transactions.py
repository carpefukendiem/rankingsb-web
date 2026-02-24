#!/usr/bin/env python3
"""
Extract and categorize 2025 bank/credit card transactions for TaxHawk tax analysis.
"""

import pdfplumber
import os
import re
import json
import csv
from datetime import datetime
from collections import defaultdict

# Configuration
TAX_DIR = '/Users/rubenruiz/Desktop/Johnny5-Inbox/2025 taxes'
OUTPUT_DIR = '/Users/rubenruiz/.openclaw/workspace/business/tax-optimization'

# Business expense categories with 370+ patterns
EXPENSE_CATEGORIES = {
    'Software/SaaS': [
        r'gohighlevel', r'highlevel', r'ghl', r'mailgun', r'sinch',
        r'google.*workspace', r'gsuite', r'google.*one', r'google.*cloud',
        r'notion', r'slack', r'zoom', r'calendly', r'hubspot',
        r'salesforce', r'zapier', r'make', r'integromat',
        r'openai', r'anthropic', r'claude', r'chatgpt',
        r'github', r'gitlab', r'bitbucket', r'vercel', r'netlify',
        r'digitalocean', r'aws', r'amazon web', r'azure', r'heroku',
        r'cursor', r'vscode', r'jetbrains', r'adobe',
        r'canva', r'figma', r'sketch', r'invision',
        r'semrush', r'ahrefs', r'moz', r'spyfu',
        r'klaviyo', r'mailchimp', r'convertkit', r'sendgrid',
        r'twilio', r'plivo', r'vonage',
        r'stripe', r'square', r'paypal', r'venmo',
        r'quickbooks', r'xero', r'freshbooks', r'bench',
        r'gusto', r'justworks', r'adp', r'paychex',
        r'dropbox', r'box', r'onedrive', r'icloud',
        r'lastpass', r'1password', r'bitwarden',
        r'cloudflare', r'namecheap', r'godaddy', r'google domains',
    ],
    'Marketing/Advertising': [
        r'facebook.*ads', r'fb.*ads', r'meta.*ads', r'instagram.*ads',
        r'google.*ads', r'adwords', r'youtube.*ads',
        r'linkedin.*ads', r'twitter.*ads', r'x.*ads',
        r'tiktok.*ads', r'snapchat.*ads', r'pinterest.*ads',
        r'reddit.*ads', r'quora.*ads',
        r'google.*marketing', r'facebook.*marketing',
        r'influencer', r'affiliate', r'commission',
        r'podcast.*sponsor', r'sponsor',
    ],
    'Meals/Entertainment': [
        r'restaurant', r'cafe', r'coffee', r'starbucks', r'peets',
        r'in-n-out', r'mcdonalds', r'chipotle', r'panera',
        r'pizza', r'sushi', r'thai', r'chinese', r'indian',
        r'italian', r'mexican', r'korean', r'japanese',
        r'winery', r'brewery', r'bar', r'pub', r'tavern',
        r'grubhub', r'doordash', r'ubereats', r'postmates',
        r'seatgeek', r'stubhub', r'ticketmaster', r'eventbrite',
        r'finney', r'cajun kitchen', r'pressed juicery',
        r'dart coffee', r'waterfront',
    ],
    'Office Supplies': [
        r'office depot', r'staples', r'amazon', r'walmart', r'target',
        r'costco', r'best buy', r'apple store',
        r'paper', r'ink', r'toner', r'printer',
        r'notebook', r'pen', r'pencil', r'stationery',
        r'furniture', r'desk', r'chair', r'filing',
        r'home depot', r'lowes', r'ikea',
    ],
    'Professional Services': [
        r'legal', r'attorney', r'lawyer', r'law firm',
        r'accounting', r'accountant', r'cpa', r'bookkeeping',
        r'consulting', r'consultant', r'advisor',
        r'coaching', r'mentor', r'training',
        r'hr', r'payroll', r'benefits',
        r'insurance', r'liability', r'errors.*omissions',
    ],
    'Travel': [
        r'airline', r'flight', r'delta', r'united', r'american.*airlines',
        r'southwest', r'alaska.*airlines', r'jetblue',
        r'hotel', r'marriott', r'hilton', r'hyatt', r'airbnb',
        r'uber', r'lyft', r'taxi', r'limo',
        r'rental.*car', r'hertz', r'enterprise', r'avis',
        r'gas', r'fuel', r'shell', r'chevron', r'exxon',
        r'parking', r'toll', r'bridge',
        r'fairview fuel', r'holister fuel',
    ],
    'Communications': [
        r'phone', r'mobile', r'cell', r'verizon', r'att', r'tmobile',
        r'internet', r'broadband', r'wifi', r'comcast', r'xfinity',
        r'cox', r'spectrum', r'charter', r'frontier',
        r'postage', r'usps', r'ups', r'fedex', r'dhl',
    ],
    'Education/Training': [
        r'course', r'class', r'workshop', r'seminar',
        r'udemy', r'coursera', r'linkedin.*learning',
        r'pluralsight', r'skillshare', r'masterclass',
        r'conference', r'trade.*show', r'expo',
        r'certification', r'exam', r'test',
    ],
    'Equipment/Technology': [
        r'computer', r'laptop', r'desktop', r'monitor',
        r'keyboard', r'mouse', r'webcam', r'microphone',
        r'headphones', r'earbuds', r'speaker',
        r'phone', r'tablet', r'ipad',
        r'camera', r'lens', r'tripod', r'lighting',
        r'microphone', r'audio', r'sound',
    ],
    'Health/Wellness': [
        r'gym', r'fitness', r'peloton', r'classpass',
        r'health.*insurance', r'medical', r'dental', r'vision',
        r'massage', r'chiropractor', r'physical.*therapy',
        r'vitamin', r'supplement', r'nutrition',
    ],
    'Interest/Bank Fees': [
        r'interest', r'finance.*charge', r'late.*fee',
        r'overdraft', r'overdraft.*fee',
        r'bank.*fee', r'account.*fee', r'monthly.*fee',
        r'atm.*fee', r'wire.*fee', r'ach.*fee',
    ],
    'Income': [
        r'stripe.*transfer', r'stripe', r'payment.*received',
        r'deposit', r'ach.*credit', r'wire.*in',
        r'refund', r'return',
    ],
    'Loan/Payments': [
        r'loan', r'stripe.*loan', r'capital',
        r'credit.*card.*payment', r'creditcard',
        r'barclaycard', r'chase.*credit',
        r'payment.*to', r'transfer.*to',
    ],
    'Personal': [
        r'personal', r'personal.*checking',
    ],
    'Transfer': [
        r'online.*transfer', r'transfer.*from', r'transfer.*to',
        r'zelle', r'venmo', r'cash.*app',
    ],
    'Owner Draw': [
        r'owner.*draw', r'owner.*distribution', r'owner.*withdrawal',
    ],
}

INCOME_KEYWORDS = [
    r'stripe.*transfer', r'stripe', r'payment.*received',
    r'ach.*credit', r'wire.*in', r'deposit',
]

GHL_KEYWORDS = [
    r'highlevel', r'gohighlevel', r'ghl',
]

STRIPE_LOAN_KEYWORDS = [
    r'stripe.*loan', r'stripe.*capital', r'loan.*stripe',
]

def categorize_transaction(description):
    """Categorize a transaction based on description."""
    desc_lower = description.lower()
    
    for category, patterns in EXPENSE_CATEGORIES.items():
        for pattern in patterns:
            if re.search(pattern, desc_lower):
                return category
    
    return 'Uncategorized'

def is_income(description):
    """Check if transaction is income."""
    desc_lower = description.lower()
    return any(re.search(kw, desc_lower) for kw in INCOME_KEYWORDS)

def is_ghl(description):
    """Check if transaction is GoHighLevel related."""
    desc_lower = description.lower()
    return any(re.search(kw, desc_lower) for kw in GHL_KEYWORDS)

def is_stripe_loan(description):
    """Check if transaction is a Stripe loan."""
    desc_lower = description.lower()
    return any(re.search(kw, desc_lower) for kw in STRIPE_LOAN_KEYWORDS)

def parse_amount(amount_str):
    """Parse amount string to float."""
    if not amount_str:
        return 0.0
    # Remove commas, dollar signs, etc.
    cleaned = re.sub(r'[$,]', '', str(amount_str).strip())
    try:
        return float(cleaned)
    except:
        return 0.0

def extract_wf_transactions(pdf_path, month_name):
    """Extract transactions from Wells Fargo PDF."""
    transactions = []
    
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            text = page.extract_text()
            if not text:
                continue
                
            lines = text.split('\n')
            
            for line in lines:
                # Look for date patterns like "1/2", "1/15", "12/31"
                date_match = re.match(r'^(\d{1,2}/\d{1,2})\s+(.+)$', line.strip())
                if date_match:
                    date_str = date_match.group(1)
                    rest = date_match.group(2)
                    
                    # Try to extract amount at end (positive or negative)
                    # Pattern: number at end with optional decimal
                    amount_match = re.search(r'([\d,]+\.\d{2})\s*$', rest)
                    if amount_match:
                        amount_str = amount_match.group(1)
                        description = rest[:amount_match.start()].strip()
                        
                        # Determine if debit or credit based on context
                        # For WF, debits usually appear after deposits in same line
                        # or have specific patterns
                        amount = parse_amount(amount_str)
                        
                        # Skip balance-only lines
                        if any(x in description.lower() for x in ['balance', 'continued', 'transaction history']):
                            continue
                            
                        transactions.append({
                            'date': f"{date_str}/25",
                            'description': description,
                            'amount': amount,
                            'account': 'Wells Fargo Business',
                            'month': month_name,
                        })
    
    return transactions

def extract_chase_transactions(pdf_path, month_str):
    """Extract transactions from Chase credit card PDF."""
    transactions = []
    
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            text = page.extract_text()
            if not text:
                continue
                
            lines = text.split('\n')
            
            for line in lines:
                # Chase format: "Jan 15 Description City State Amount"
                date_match = re.match(r'^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+(\d{1,2})\s+(.+)$', line.strip())
                if date_match:
                    month_name = date_match.group(1)
                    day = date_match.group(2)
                    rest = date_match.group(3)
                    
                    # Extract amount (usually at end)
                    amount_match = re.search(r'([\d,]+\.\d{2})\s*$', rest)
                    if amount_match:
                        amount_str = amount_match.group(1)
                        description = rest[:amount_match.start()].strip()
                        
                        amount = parse_amount(amount_str)
                        
                        transactions.append({
                            'date': f"{month_name} {day}, 2025",
                            'description': description,
                            'amount': -amount,  # Credit card charges are negative
                            'account': 'Chase Visa',
                            'month': month_str,
                        })
    
    return transactions

def extract_barclays_transactions(pdf_path):
    """Extract transactions from Barclays credit card PDF."""
    transactions = []
    
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            text = page.extract_text()
            if not text:
                continue
                
            lines = text.split('\n')
            
            for line in lines:
                # Barclays format similar to Chase
                date_match = re.match(r'^(\d{2}/\d{2}/\d{4})\s+(.+)$', line.strip())
                if date_match:
                    date_str = date_match.group(1)
                    rest = date_match.group(2)
                    
                    # Extract amount
                    amount_match = re.search(r'([\d,]+\.\d{2})\s*$', rest)
                    if amount_match:
                        amount_str = amount_match.group(1)
                        description = rest[:amount_match.start()].strip()
                        
                        amount = parse_amount(amount_str)
                        
                        transactions.append({
                            'date': date_str,
                            'description': description,
                            'amount': -amount,  # Credit card charges are negative
                            'account': 'Barclays Visa',
                            'month': '',
                        })
    
    return transactions

def main():
    all_transactions = []
    
    # Process Wells Fargo Business Checking
    print("Processing Wells Fargo Business Checking...")
    wf_dir = os.path.join(TAX_DIR, 'Wells Fargo Business Checking')
    wf_files = sorted([f for f in os.listdir(wf_dir) if f.endswith('.pdf')])
    
    for pdf_file in wf_files:
        pdf_path = os.path.join(wf_dir, pdf_file)
        month_name = pdf_file.split()[0]  # e.g., "013125" -> "013125"
        print(f"  {pdf_file}...")
        try:
            txs = extract_wf_transactions(pdf_path, month_name)
            all_transactions.extend(txs)
            print(f"    -> {len(txs)} transactions")
        except Exception as e:
            print(f"    -> Error: {e}")
    
    # Process Chase Visa
    print("\nProcessing Chase Visa...")
    chase_dir = os.path.join(TAX_DIR, 'Chase  - Visa')
    chase_files = sorted([f for f in os.listdir(chase_dir) if f.endswith('.pdf')])
    
    for pdf_file in chase_files:
        pdf_path = os.path.join(chase_dir, pdf_file)
        month_str = pdf_file[:6]  # e.g., "20250115"
        print(f"  {pdf_file}...")
        try:
            txs = extract_chase_transactions(pdf_path, month_str)
            all_transactions.extend(txs)
            print(f"    -> {len(txs)} transactions")
        except Exception as e:
            print(f"    -> Error: {e}")
    
    # Process Barclays Visa
    print("\nProcessing Barclays Visa...")
    barclays_dir = os.path.join(TAX_DIR, 'Barclays - Visa')
    barclays_files = sorted([f for f in os.listdir(barclays_dir) if f.endswith('.pdf')])
    
    for pdf_file in barclays_files:
        pdf_path = os.path.join(barclays_dir, pdf_file)
        print(f"  {pdf_file}...")
        try:
            txs = extract_barclays_transactions(pdf_path)
            all_transactions.extend(txs)
            print(f"    -> {len(txs)} transactions")
        except Exception as e:
            print(f"    -> Error: {e}")
    
    print(f"\nTotal raw transactions extracted: {len(all_transactions)}")
    
    # Categorize transactions
    print("\nCategorizing transactions...")
    for tx in all_transactions:
        tx['category'] = categorize_transaction(tx['description'])
        tx['is_ghl'] = is_ghl(tx['description'])
        tx['is_stripe_loan'] = is_stripe_loan(tx['description'])
        tx['is_income'] = is_income(tx['description'])
        tx['is_business'] = True  # Default to business for business accounts
    
    # Save to CSV
    csv_path = os.path.join(OUTPUT_DIR, '2025-transactions-categorized.csv')
    with open(csv_path, 'w', newline='') as f:
        if all_transactions:
            writer = csv.DictWriter(f, fieldnames=all_transactions[0].keys())
            writer.writeheader()
            writer.writerows(all_transactions)
    
    print(f"\nSaved {len(all_transactions)} transactions to {csv_path}")
    
    # Generate summary statistics
    categories = defaultdict(float)
    ghl_total = 0
    stripe_income = 0
    
    for tx in all_transactions:
        cat = tx['category']
        amt = tx['amount']
        categories[cat] += amt
        
        if tx['is_ghl']:
            ghl_total += abs(amt)
        
        if tx['is_income']:
            stripe_income += amt
    
    print("\n=== CATEGORY SUMMARY ===")
    for cat, total in sorted(categories.items(), key=lambda x: abs(x[1]), reverse=True):
        print(f"  {cat}: ${total:,.2f}")
    
    print(f"\nGoHighLevel Total: ${ghl_total:,.2f}")
    print(f"Stripe Income: ${stripe_income:,.2f}")
    
    return all_transactions

if __name__ == '__main__':
    main()
