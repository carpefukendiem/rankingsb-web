#!/usr/bin/env python3
"""
Quick Calendar Event Creator using Google Calendar API
Requires: pip install google-auth-oauthlib google-auth-httplib2 google-api-python-client
"""

import os.path
import datetime
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

# If modifying these scopes, delete the token file
SCOPES = ['https://www.googleapis.com/auth/calendar']

def get_credentials():
    """Get or create credentials"""
    creds = None
    token_path = os.path.expanduser('~/.openclaw/.tokens/calendar-python-token.json')
    creds_path = os.path.expanduser('~/.openclaw/.tokens/calendar-credentials.json')
    
    # Create tokens directory if needed
    os.makedirs(os.path.dirname(token_path), exist_ok=True)
    
    # Load existing token
    if os.path.exists(token_path):
        creds = Credentials.from_authorized_user_file(token_path, SCOPES)
    
    # If no valid creds, get new ones
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            print("❌ No credentials found.")
            print("\nTo set up:")
            print("1. Go to https://console.cloud.google.com/")
            print("2. Create project → Enable Calendar API")
            print("3. Create OAuth 2.0 credentials")
            print("4. Download JSON to ~/.openclaw/.tokens/calendar-credentials.json")
            return None
        
        # Save token
        with open(token_path, 'w') as token:
            token.write(creds.to_json())
    
    return creds

def create_event(service, calendar_id, event_data):
    """Create a calendar event"""
    try:
        event = service.events().insert(calendarId=calendar_id, body=event_data).execute()
        print(f"✅ Created: {event_data['summary']}")
        return event
    except HttpError as e:
        print(f"❌ Error creating {event_data['summary']}: {e}")
        return None

def main():
    """Create all Ruben's calendar events"""
    
    creds = get_credentials()
    if not creds:
        return
    
    service = build('calendar', 'v3', credentials=creds)
    calendar_id = 'rubenstips@gmail.com'
    
    # Define timezone
    tz = 'America/Los_Angeles'
    
    # Daily recurring events
    daily_events = [
        {
            'summary': '💪 WORKOUT - No Excuses',
            'description': 'David Goggins mode. Discipline = income.\n\nFocus: Strength + cardio\nGoal: 45-60 min intense workout\nLocation: Gym or home',
            'start': {'dateTime': '2026-02-20T04:00:00', 'timeZone': tz},
            'end': {'dateTime': '2026-02-20T05:00:00', 'timeZone': tz},
            'recurrence': ['RRULE:FREQ=DAILY;UNTIL=20261231T235959Z'],
            'colorId': '11',
            'reminders': {
                'useDefault': False,
                'overrides': [{'method': 'popup', 'minutes': 10}]
            }
        },
        {
            'summary': '💰 Upwork - Apply to 10 Jobs',
            'description': 'Goal: 10 applications/day minimum\n\nTemplates: business/Ruben-Upwork-Cover-Letters.md\nLink: https://www.upwork.com/ab/find-work/\n\nTrack: node scripts/upwork-tracker.js add "Job" "Company" "URL" "Rate"',
            'start': {'dateTime': '2026-02-20T05:00:00', 'timeZone': tz},
            'end': {'dateTime': '2026-02-20T06:00:00', 'timeZone': tz},
            'recurrence': ['RRULE:FREQ=DAILY;UNTIL=20261231T235959Z'],
            'colorId': '9',
            'reminders': {
                'useDefault': False,
                'overrides': [{'method': 'popup', 'minutes': 5}]
            }
        },
        {
            'summary': '📱 CushionFoamz Marketing',
            'description': 'Post 1-2 Reddit responses + check social media\n\nResponses: CUSHIONFOAMZ-REDDIT-CONVERSATIONS.md\n\nLinks:\n- Reddit DIY: https://www.reddit.com/r/DIY/\n- Reddit Upholstery: https://www.reddit.com/r/upholstery/\n- CushionFoamz: https://cushionfoamz.com',
            'start': {'dateTime': '2026-02-20T06:00:00', 'timeZone': tz},
            'end': {'dateTime': '2026-02-20T06:30:00', 'timeZone': tz},
            'recurrence': ['RRULE:FREQ=DAILY;UNTIL=20261231T235959Z'],
            'colorId': '10',
            'reminders': {
                'useDefault': False,
                'overrides': [{'method': 'popup', 'minutes': 0}]
            }
        },
        {
            'summary': '🌙 Daily Review + Tomorrow Prep',
            'description': 'Set 3 priorities for next day\n\n- Review Johnny 5\'s daily output\n- Check calendar for tomorrow\n- Set 3 main priorities\n- Prepare materials needed',
            'start': {'dateTime': '2026-02-20T21:00:00', 'timeZone': tz},
            'end': {'dateTime': '2026-02-20T22:00:00', 'timeZone': tz},
            'recurrence': ['RRULE:FREQ=DAILY;UNTIL=20261231T235959Z'],
            'colorId': '8',
            'reminders': {
                'useDefault': False,
                'overrides': [{'method': 'popup', 'minutes': 15}]
            }
        }
    ]
    
    print("🚀 Creating daily recurring events...\n")
    for event in daily_events:
        create_event(service, calendar_id, event)
    
    # Weekly events (starting from specific dates)
    weekly_events = [
        {
            'summary': '🔥 Client Work / Sales Calls',
            'description': 'Focus: Closing deals, client calls, proposal reviews\n\nPriority: Revenue-generating activities',
            'start': {'dateTime': '2026-02-24T11:00:00', 'timeZone': tz},
            'end': {'dateTime': '2026-02-24T14:30:00', 'timeZone': tz},
            'recurrence': ['RRULE:FREQ=WEEKLY;BYDAY=MO;UNTIL=20261231T235959Z'],
            'colorId': '9'
        },
        {
            'summary': '⚡ Client Work / Project Delivery',
            'description': 'Focus: Delivering work, client updates, billing',
            'start': {'dateTime': '2026-02-25T10:00:00', 'timeZone': tz},
            'end': {'dateTime': '2026-02-25T14:30:00', 'timeZone': tz},
            'recurrence': ['RRULE:FREQ=WEEKLY;BYDAY=TU;UNTIL=20261231T235959Z'],
            'colorId': '9'
        },
        {
            'summary': '🎯 Prospecting / Cold Outreach',
            'description': 'Focus: Sending audits, follow-up calls, new lead gen\n\nLink: https://app.rankingsb.com/prospecting/add-prospect\n\nGoal: 5 audits sent, 5 follow-up calls',
            'start': {'dateTime': '2026-02-26T09:30:00', 'timeZone': tz},
            'end': {'dateTime': '2026-02-26T13:30:00', 'timeZone': tz},
            'recurrence': ['RRULE:FREQ=WEEKLY;BYDAY=WE;UNTIL=20261231T235959Z'],
            'colorId': '6'
        },
        {
            'summary': '📝 Content Creation / Long-term Assets',
            'description': 'Focus: Blog posts, social media, SEO content\n\n- Review Johnny 5 published content\n- Schedule social media posts\n- Plan next week\'s content',
            'start': {'dateTime': '2026-02-27T09:30:00', 'timeZone': tz},
            'end': {'dateTime': '2026-02-27T13:30:00', 'timeZone': tz},
            'recurrence': ['RRULE:FREQ=WEEKLY;BYDAY=TH;UNTIL=20261231T235959Z'],
            'colorId': '5'
        },
        {
            'summary': '📊 Week Review + Planning',
            'description': 'Review week\'s results with Johnny 5\n\n- Check Upwork tracker summary\n- Review CushionFoamz engagement\n- Update sales pipelines\n- Send invoices\n- Plan next week',
            'start': {'dateTime': '2026-02-21T09:30:00', 'timeZone': tz},
            'end': {'dateTime': '2026-02-21T11:30:00', 'timeZone': tz},
            'recurrence': ['RRULE:FREQ=WEEKLY;BYDAY=FR;UNTIL=20261231T235959Z'],
            'colorId': '7'
        }
    ]
    
    print("\n🚀 Creating weekly work blocks...\n")
    for event in weekly_events:
        create_event(service, calendar_id, event)
    
    print("\n🎉 All calendar events created successfully!")
    print("📅 Check your calendar: https://calendar.google.com")

if __name__ == '__main__':
    main()
